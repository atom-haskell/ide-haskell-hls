import { Emitter } from 'atom'
import * as UPI from 'atom-haskell-upi'
import type * as Linter from 'atom/linter'

export class LinterAdapter implements Linter.IndieDelegate {
  public name = 'hls'
  private emitter = new Emitter()
  private messages: Linter.Message[] = []
  constructor(private upi: UPI.IUPIInstance) {}
  dispose() {
    this.emitter.emit('did-destroy')
    this.emitter.dispose()
    this.upi.dispose()
  }
  clearMessages() {
    this.messages = []
    this.updateMessages()
  }
  getMessages() {
    return this.messages
  }
  onDidDestroy(callback: (value?: any) => void) {
    return this.emitter.on('did-destroy', callback)
  }
  onDidUpdate(callback: (value?: any) => void) {
    return this.emitter.on('did-update', callback)
  }
  setAllMessages(msgs: Linter.Message[]) {
    this.messages = msgs
    this.updateMessages()
  }
  setMessages(uri: string, msgs: ConcatArray<Linter.Message>) {
    this.messages = this.messages
      .filter((x) => x.location.file !== uri)
      .concat(msgs)
    this.updateMessages()
  }
  private updateMessages() {
    this.upi.setMessages(this.messages.map(convertMessages))
    this.emitter.emit('did-update')
  }
}

function convertMessages(msg: Linter.Message): UPI.IResultItem {
  return {
    message: { highlighter: 'hint.message.haskell', text: msg.excerpt },
    position: msg.location.position.start,
    uri: msg.location.file,
    severity: msg.severity === 'info' ? 'lint' : msg.severity,
  }
}
