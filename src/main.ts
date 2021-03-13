import { AutoLanguageClient } from 'atom-languageclient'
import { TextEditor, Point } from 'atom'
import * as UPI from 'atom-haskell-upi'
import { datatipAdapter, linterAdapter } from './adapters'
import type { MarkdownService } from 'atom-ide-base'

class HLSLanguageClient extends AutoLanguageClient {
  private upi?: UPI.IUPIInstance
  private renderer = { render: null as MarkdownService['render'] | null }
  getGrammarScopes() {
    return ['source.haskell']
  }
  getLanguageName() {
    return 'Haskell'
  }
  getServerName() {
    return 'haskell-language-server'
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
    this.upi = service({
      name: 'hls',
    })
    this.consumeLinterV2(linterAdapter(this.upi, this.provideCodeActions()))
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
