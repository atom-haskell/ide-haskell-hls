import { Emitter, Disposable } from 'atom'
import * as UPI from 'atom-haskell-upi'
import type * as AtomIDE from 'atom-ide-base'
import type * as Linter from 'atom/linter'
import type { MarkdownService } from 'atom-ide-base'

export function linterAdapter(
  upi: UPI.IUPIInstance,
): Parameters<Linter.IndieProvider>[0] {
  return function (config: Linter.Config) {
    let messages: Linter.Message[] = []
    const emitter = new Emitter()
    const delegate: Linter.IndieDelegate = {
      name: 'hls',
      clearMessages() {
        messages = []
        upi.setMessages([])
        emitter.emit('did-update')
      },
      getMessages() {
        return messages
      },
      dispose() {
        emitter.emit('did-destroy')
        emitter.dispose()
        upi.dispose()
      },
      onDidDestroy(callback) {
        return emitter.on('did-destroy', callback)
      },
      onDidUpdate(callback) {
        return emitter.on('did-update', callback)
      },
      setAllMessages(msgs) {
        messages = msgs
        upi.setMessages(
          messages.map((msg) => ({
            message: msg.excerpt,
            position: msg.location.position.start,
            uri: msg.location.file,
            severity: msg.severity,
          })),
        )
      },
      setMessages(uri, msgs) {
        messages = messages.filter((x) => x.location.file !== uri).concat(msgs)
        upi.setMessages(
          messages.map((msg) => ({
            message: { highlighter: 'hint.message.haskell', text: msg.excerpt },
            position: msg.location.position.start,
            uri: msg.location.file,
            severity: msg.severity,
          })),
        )
      },
    }
    return delegate
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
          priority: provider.priority,
          eventTypes: [UPI.TEventRangeType.mouse],
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
