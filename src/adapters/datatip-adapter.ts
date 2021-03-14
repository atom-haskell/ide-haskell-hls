import { Disposable } from 'atom'
import * as UPI from 'atom-haskell-upi'
import type * as AtomIDE from 'atom-ide-base'

export function datatipAdapter(
  register: UPI.IUPIRegistration,
  upi: UPI.IUPIInstance,
  renderer: { render: any },
): AtomIDE.DatatipService {
  async function renderMarkedString(
    str: AtomIDE.MarkedString,
  ): Promise<UPI.TMessage> {
    if (renderer.render) {
      return {
        html: await renderer.render(str.value, 'source.haskell', {
          ALLOW_UNKNOWN_PROTOCOLS: true,
        }),
      }
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
