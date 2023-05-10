import EventSource from 'eventsource';
import * as misc from '../lib/utils/misc';
import constants from '../config/env';

class SSEHandler {
  public eventSource: EventSource;
  public current_block: number;
  public start_block: number;
  public orders: any[];
  public fulfilled: number;
  public fulfilled_record: string[];
  public outstanding: number;
  public dropped: number;
  public drop_record: string[];

  constructor(url: string) {
    this.eventSource = new EventSource(url);
    this.dropped = 0;
    this.fulfilled = 0;
    this.fulfilled_record = [];
    this.outstanding = 0;
    this.orders = new Array(constants.BLOCK_TOLERANCE as number).fill(null).map(() => []);
    this.drop_record = [];
  }

  public registerEvents(): void {
    this.eventSource.addEventListener('message', this.handleMessage);
    this.eventSource.addEventListener('open', this.handleOpen);
    this.eventSource.addEventListener('error', this.handleError);
  }

  private handleMessage = (event: MessageEvent): void => {
    // standardise into IOrder format
    const data: IOrder = {
      hash: JSON.parse(event.data).hash,
      timestamp: Date.now(),
      blocks_elapsed: 0,
      received_in: this.current_block,
    };

    this.updateOrderRecord(data);
  };

  // called whenever we receive a new block from websockets stream (infura)
  public findMatches = (block_txs: string[]) => {
    let order_hash_records: string[] = this.orders.flat().map((o) => o.hash);
    let order_blocks_elapsed_records = this.orders.flat().map((o) => o.blocks_elapsed);

    // We find all the existing orders that have been matched on-chain
    // - We record the specific bucket that the order is in as well as the index in that bucket
    let result: any[] = block_txs.reduce((acc: any, hash, idx) => {
      let matchedIdx = order_hash_records.indexOf(hash);

      if (matchedIdx !== -1) {
        let blocks_elapsed = order_blocks_elapsed_records[matchedIdx];

        acc.push({
          hash: order_hash_records[matchedIdx],
          blocks_elapsed,
          inner_idx: this.orders[blocks_elapsed].findIndex((o: IOrder) => o.hash === hash),
        });
      }

      return acc;
    }, []);

    // we organise the matched results into tuples corresponding to respective buckets
    let structured_result = Object.values(
      misc.groupBy(result, (r) => {
        return r.blocks_elapsed;
      })
    );

    // we map over the tuples (each bucket containing fulfilled orders) and remove them in-place from the the respective buckets
    structured_result.map((bucket_changes) => {
      let outer_idx = bucket_changes[0].blocks_elapsed;
      this.fulfilled_record.push(...bucket_changes.map((order: IOrder) => order.hash));

      // We remove multiple values in-place by descending splice algorithm
      misc.removeByIndices(
        this.orders[outer_idx],
        bucket_changes.map((o) => o.inner_idx)
      );

      this.fulfilled += bucket_changes.length;
      this.outstanding -= bucket_changes.length;
    });
  };

  public handleNewBlock() {
    this.orders.unshift([]);
    let to_discard: IOrder[] = this.orders.pop();
    this.dropped += to_discard.length;
    this.outstanding -= to_discard.length;

    this.orders = this.orders.map((bucket) =>
      bucket.map((order: IOrder) => {
        order.blocks_elapsed++;
        return order;
      })
    );

    if (to_discard.length > 0) {
      /* temporary record (for figuring out BLOCK_TOLERANCE param tuning) */
      this.drop_record.push(...to_discard.map((order: IOrder) => order.hash));
    }

    console.log('fulfilled:', this.fulfilled);
    console.log('fulfilled_record:', this.fulfilled_record);
    console.log('outstanding [20 block tolerance]:', this.outstanding);
    console.log('dropped:', this.dropped);
    console.log('dropped tx hash record:', this.drop_record);

    if (this.fulfilled > 500 || this.dropped > 500) {
      this.flushOrders();
    }
  }

  public flushOrders() {
    this.orders = new Array(constants.BLOCK_TOLERANCE as number).fill(null).map(() => []);
    this.dropped = 0;
    this.drop_record = [];
    this.fulfilled_record = [];
  }

  public updateOrderRecord(order: IOrder) {
    this.outstanding++;
    this.orders[0].push(order);
  }

  private handleOpen = (): void => {
    console.log('Connection opened');
  };

  private handleError = (error: Event): void => {
    if (this.eventSource.readyState === EventSource.CLOSED) {
      console.log('Connection closed');
    } else {
      console.error('An error occurred:', error);
    }
  };
}

export default SSEHandler;
