import EventSource from 'eventsource';

class SSEHandler {
  private eventSource: EventSource;

  public constructor(url: string) {
    this.eventSource = new EventSource(url);
    this.registerEvents();
  }

  private registerEvents(): void {
    this.eventSource.addEventListener('message', this.handleMessage);
    this.eventSource.addEventListener('open', this.handleOpen);
    this.eventSource.addEventListener('error', this.handleError);
  }

  private handleMessage(event: MessageEvent): void {
    const data = JSON.parse(event.data);
    console.log(data);
  }

  private handleOpen(): void {}

  private handleError(error: Event): void {
    if (this.eventSource.readyState === EventSource.CLOSED) {
      console.log('Connection closed');
    } else {
      console.error('An error occurred:', error);
    }
  }
}

export default SSEHandler;
