import { Emitter, Disposable } from 'atom'
import * as UPI from 'atom-haskell-upi'
import type * as AtomIDE from 'atom-ide-base'
import type * as Linter from 'atom/linter'
import type { MarkdownService } from 'atom-ide-base'

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

export function datatipAdapter(
  register: UPI.IUPIRegistration,
  upi: UPI.IUPIInstance,
  renderer: { render: MarkdownService['render'] | null },
): AtomIDE.DatatipService {
  async function renderMarkedString(str: AtomIDE.MarkedString) {
    if (renderer.render) {
      return { html: await renderer.render(str.value, 'source.haskell') }
    } else {
      return { text: str.value }
    }
  }
  async function renderMarkedStrings(strs: AtomIDE.MarkedString[]) {
    return await Promise.all(strs.map(renderMarkedString))
  }
  return {
    addModifierProvider() {
      // not implemented
      return new Disposable(() => {
        /*noop*/
      })
    },
    addProvider(provider) {
      const providerUpi = register({
        name: 'hls',
        tooltip: {
          priority: 100,
          eventTypes: [
            UPI.TEventRangeType.mouse,
            UPI.TEventRangeType.selection,
          ],
          handler: async function (
            editor,
            range,
          ): Promise<UPI.ITooltipData | undefined> {
            const datatip = await provider.datatip(editor, range.start)
            // tslint:disable-next-line: triple-equals
            if (datatip != undefined && 'markedStrings' in datatip) {
              return {
                persistent: datatip.pinnable,
                range: datatip.range,
                text: await renderMarkedStrings(datatip.markedStrings),
              }
            }
            return undefined
          },
        },
      })
      return providerUpi
    },
    createPinnedDataTip(tip, editor) {
      if ('markedStrings' in tip) {
        renderMarkedStrings(tip.markedStrings)
          .then((text) => {
            upi.showTooltip({
              editor,
              tooltip: {
                persistent: tip.pinnable,
                range: tip.range,
                text,
              },
            })
          })
          .catch((e: Error) => {
            console.error(e)
            atom.notifications.addError(e.name, {
              stack: e.stack,
              detail: e.message,
            })
          })
      }
      return new Disposable(() => {
        /* noop */
      })
    },
  }
}
