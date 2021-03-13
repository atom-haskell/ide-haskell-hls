import { AutoLanguageClient } from 'atom-languageclient'
import { TextEditor, Point } from 'atom'

class HLSLanguageClient extends AutoLanguageClient {
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
