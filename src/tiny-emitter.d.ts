declare module "tiny-emitter/instance" {
  import TinyEmitter from "tiny-emitter";
  const emitter: TinyEmitter;
  export default emitter;
}

declare module "tiny-emitter" {
  export default class TinyEmitter {
    on(event: string, callback: (...args: any[]) => void, ctx?: any): this;
    once(event: string, callback: (...args: any[]) => void, ctx?: any): this;
    off(event: string, callback?: (...args: any[]) => void): this;
    emit(event: string, ...args: any[]): this;
  }
}