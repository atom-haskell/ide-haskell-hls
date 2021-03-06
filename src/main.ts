import { AutoLanguageClient } from 'atom-languageclient'
import {
  TextEditor,
  Point,
  Range,
  CompositeDisposable,
  ConfigValues,
} from 'atom'
import * as UPI from 'atom-haskell-upi'
import { busyAdapter, datatipAdapter, LinterAdapter } from './adapters'
import type { MarkdownService } from 'atom-ide-base'
import { config } from './config'

const severityToDiagnosticType = {
  info: 'Info',
  error: 'Error',
  warning: 'Warning',
} as const

class HLSLanguageClient extends AutoLanguageClient {
  private upi?: UPI.IUPIInstance
  private renderer = {
    render: null as
      | null
      | ((source: string, text: string, config: object) => Promise<string>),
  }
  private disposables = new CompositeDisposable()
  private linterAdapter?: LinterAdapter
  public config = config

  activate() {
    require('atom-package-deps')
      .install('ide-haskell-hls')
      .catch((e: Error) =>
        atom.notifications.addFatalError(e.toString(), {
          stack: e.stack,
          detail: e.message,
        }),
      )
    super.activate()
    this.disposables.add(
      atom.commands.add('atom-workspace', {
        'ide-haskell-hls:restart-all-severs': () => {
          this.linterAdapter?.clearMessages()
          this.restartAllServers().catch((e) => {
            atom.notifications.addError(e)
          })
        },
        'ide-haskell-hls:clear-messages': () => {
          this.linterAdapter?.clearMessages()
        },
      }),
    )
  }

  async deactivate() {
    this.disposables.dispose()
    super.deactivate()
  }

  getGrammarScopes() {
    return ['source.haskell']
  }
  getLanguageName() {
    return 'Haskell'
  }
  getServerName() {
    return 'haskell-language-server'
  }
  getRootConfigurationKey() {
    return 'ide-haskell-hls'
  }
  mapConfigurationObject(obj: ConfigValues['ide-haskell-hls']) {
    return { haskell: obj.haskell }
  }

  startServerProcess(projectPath: string) {
    return super.spawn(
      atom.config.get('ide-haskell-hls.binaryPath'),
      ['--lsp'],
      {
        cwd: projectPath,
      },
    )
  }

  consumeMarkdownRenderer(renderer: MarkdownService) {
    this.renderer.render = renderer.render as any
  }

  consumeUPI(service: UPI.IUPIRegistration) {
    const getRelevantMessages = (editor: TextEditor, range: Range) => {
      if (!this.linterAdapter) return []
      const messages = this.linterAdapter.getMessages()
      const path = editor.getPath()
      return messages
        .filter(
          (x) =>
            x.location.file === path &&
            range.intersectsWith(x.location.position),
        )
        .map((x) => ({
          filePath: x.location.file,
          providerName: x.linterName ?? 'hls',
          range: x.location.position,
          text: x.excerpt,
          type: severityToDiagnosticType[x.severity],
        }))
    }
    this.upi = service({
      name: 'hls',
      actions: {
        priority: 50,
        eventTypes: [
          UPI.TEventRangeType.context,
          UPI.TEventRangeType.keyboard,
          UPI.TEventRangeType.mouse,
          UPI.TEventRangeType.selection,
        ],
        handler: async (editor, range, type) => {
          const msgs = getRelevantMessages(editor, range)
          if (type === UPI.TEventRangeType.keyboard && !msgs.length)
            return undefined
          const acts = await this.getCodeActions(editor, range, msgs)
          if (!acts) return undefined
          return Promise.all(
            acts.map(async (x) => ({
              title: await x.getTitle(),
              apply: () => x.apply(),
            })),
          )
        },
      },
    })
    const la = (this.linterAdapter = new LinterAdapter(this.upi))
    this.consumeLinterV2(() => la)
    this.consumeDatatip(datatipAdapter(service, this.upi, this.renderer))
    this.consumeBusySignal(busyAdapter(this.upi))
    this.disposables.add(this.upi)
    return this.upi
  }
  //////////////////////////// overrides ///////////////////////////////
  async getDatatip(editor: TextEditor, point: Point) {
    // HLS likes to return empty datatips; this tries to filter those out
    const datatip = await super.getDatatip(editor, point)
    if (datatip) {
      if ('component' in datatip) {
        return datatip
      } else {
        datatip.markedStrings = datatip.markedStrings.filter((x) => x.value)
        if (datatip.markedStrings.length > 0) {
          return datatip
        }
      }
    }
    return null
  }
}

export = new HLSLanguageClient()
