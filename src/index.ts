import sseClient from './instances/sse-client';
import Provider from './instances/provider';
import WebSocketsClient from './instances/ws-client';
import constants from './config/env';
import * as convert from './lib/utils/conversions';

async function main() {
  let init = true;
  /* initialise JSON-RPC provider class for infura queries */
  const provider = Provider.init(constants.INFURA_URL);
  /* initialise Infura WebSocket stream */
  const streaming = new WebSocketsClient(constants.INFURA_WS);
  /* initialise SSE client to stream private OF */
  const mevshare = new sseClient('https://mev-share.flashbots.net/');

  streaming.blockHandler = async (res: string) => {
    let data = JSON.parse(res);

    /* if messsage is not a block subscription update - return early */
    if (data?.id) {
      return;
    }

    let block_number = convert.decimal(data.params.result.number);
    mevshare.current_block = block_number;

    const latest_block_txs = await provider.getSlimBodyBlockTransactions(block_number);

    /* only start MEV-Share polling when we receive our first block data messages */
    if (init) {
      mevshare.registerEvents();
      mevshare.start_block = block_number;
      init = false;
    }

    // console.log(mevshare.orders);

    /* mutate order array (splice dropped orders - currently set to 20 block limit) */
    mevshare.handleNewBlock();

    mevshare.findMatches(latest_block_txs);
  };

  streaming.instance.on('message', streaming.blockHandler);
}

main();
