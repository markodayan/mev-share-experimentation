import WebSocket from 'ws';

class WebSocketsClient {
  public instance: WebSocket;
  public blockHandler: any;

  public initWebSockets(url: string) {
    this.instance = new WebSocket(url);

    this.instance.on('open', () => {
      this.instance.send('{"jsonrpc":"2.0","method":"eth_subscribe","params":["newHeads"], "id":1}');
    });
  }

  constructor(url: string) {
    this.initWebSockets(url);
  }
}

export default WebSocketsClient;
