import { AutoLanguageClient } from 'atom-languageclient'

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
}

export = new HLSLanguageClient()
