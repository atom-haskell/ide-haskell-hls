import * as UPI from 'atom-haskell-upi'

export function busyAdapter(upi: UPI.IUPIInstance | undefined) {
  return {
    dispose() {
      if (upi) upi.setStatus({ status: 'ready', detail: '' })
      upi = undefined
    },
    reportBusy(title: string) {
      if (upi) upi.setStatus({ status: 'progress', detail: title })
      return {
        setTitle: (title: string) => {
          if (upi) upi.setStatus({ status: 'progress', detail: title })
        },
        dispose: () => {
          if (upi) upi.setStatus({ status: 'ready', detail: '' })
        },
      }
    },
    async reportBusyWhile<T>(title: string, f: () => Promise<T>): Promise<T> {
      if (upi) upi.setStatus({ status: 'progress', detail: title })
      const res = await f()
      if (upi) upi.setStatus({ status: 'ready', detail: '' })
      return res
    },
  }
}
