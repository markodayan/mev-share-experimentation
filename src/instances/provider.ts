import HttpClient from '../lib/abstract/http';

import constants from '../config/env';
import * as convert from '../lib/utils/conversions';

class Provider extends HttpClient {
  private static instance: Provider;
  protected readonly config: any;

  private constructor(url: string) {
    super(url);
    this.config = constants.httpConfig;
  }

  public static init(url: string): Provider {
    if (!this.instance) {
      this.instance = new Provider(url);
    }

    return this.instance;
  }

  private async getBlockByNumber(num: number | string, verbose: boolean): Promise<IRawBlock | IRawSlimBlock> {
    if (isNaN(num as number) || num === '') {
      throw new Error('User supplied invalid string as block number');
    }

    if (+num < 0) {
      throw new Error('User supplied block number that does not exist');
    }

    const res = await this.instance.post(
      '',
      {
        jsonrpc: '2.0',
        method: 'eth_getBlockByNumber',
        params: [convert.hexify(num), verbose],
        id: 0,
      },
      this.config
    );

    if (res.data.error?.code) {
      throw new Error(res.data.error.code);
    }

    return res.data.result;
  }

  private async getLatestBlock(verbose: boolean): Promise<IRawBlock | IRawSlimBlock> {
    const res = await this.instance.post(
      '',
      {
        jsonrpc: '2.0',
        method: 'eth_getBlockByNumber',
        params: ['latest', verbose],
        id: 0,
      },
      this.config
    );

    return res.data.result;
  }

  // Block Methods //

  public async getFullBodyBlock(num: number): Promise<IRawBlock> {
    return await this.getBlockByNumber(num, true);
  }

  public async getLatestFullBodyBlock(num: number): Promise<IRawBlock> {
    return await this.getLatestBlock(true);
  }

  public async getSlimBodyBlock(num: number): Promise<IRawSlimBlock> {
    return (await this.getBlockByNumber(num, false)) as IRawSlimBlock;
  }

  public async getLatestSlimBodyBlock(num: number): Promise<IRawSlimBlock> {
    return (await this.getLatestBlock(false)) as IRawSlimBlock;
  }

  public async getFullBodyBlockTransactions(num: number): Promise<RawTransactions> {
    const { transactions } = await this.getFullBodyBlock(num);
    return transactions as RawTransactions;
  }

  public async getSlimBodyBlockTransactions(num: number): Promise<string[]> {
    const { transactions } = await this.getSlimBodyBlock(num);
    return transactions as string[];
  }
}

export default Provider;
