console.log('fuck');
export default class Messager {
  ws: WebSocket | null = null;

  constructor(url: string) {
    this.ws = new WebSocket(url);
  }


}