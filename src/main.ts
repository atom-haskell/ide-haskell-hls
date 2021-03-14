import { AutoLanguageClient } from 'atom-languageclient'
import { TextEditor, Point, Range } from 'atom'
import * as UPI from 'atom-haskell-upi'
import { datatipAdapter, LinterAdapter } from './adapters'
import type { MarkdownService } from 'atom-ide-base'
import { config } from './config'

const severityToDiagnosticType = {
  info: 'Info',
  error: 'Error',
  warning: 'Warning',
} as const

class HLSLanguageClient extends AutoLanguageClient {
  private upi?: UPI.IUPIInstance
  private renderer = { render: null as MarkdownService['render'] | null }
  public config = config
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

  startServerProcess(projectPath: any) {
    return super.spawn('haskell-language-server-wrapper', ['--lsp'], {
      cwd: projectPath,
    })
  }

  consumeMarkdownRenderer(renderer: MarkdownService) {
    this.renderer.render = renderer.render
  }

  consumeUPI(service: UPI.IUPIRegistration) {
    let la: LinterAdapter
    function getRelevantMessages(editor: TextEditor, range: Range) {
      const messages = la.getMessages()
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
    la = new LinterAdapter(this.upi)
    this.consumeLinterV2(() => la)
    this.consumeDatatip(datatipAdapter(service, this.upi, this.renderer))
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
