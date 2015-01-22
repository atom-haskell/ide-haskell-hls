"use strict";
const atom_languageclient_1 = require("atom-languageclient");
class HLSLanguageClient extends atom_languageclient_1.AutoLanguageClient {
    getGrammarScopes() {
        return ['source.haskell'];
    }
    getLanguageName() {
        return 'Haskell';
    }
    getServerName() {
        return 'haskell-language-server';
    }
    startServerProcess(projectPath) {
        return super.spawn('haskell-language-server-wrapper', ['--lsp'], {
            cwd: projectPath,
        });
    }
}
module.exports = new HLSLanguageClient();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSw2REFBd0Q7QUFFeEQsTUFBTSxpQkFBa0IsU0FBUSx3Q0FBa0I7SUFDaEQsZ0JBQWdCO1FBQ2QsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUE7SUFDM0IsQ0FBQztJQUNELGVBQWU7UUFDYixPQUFPLFNBQVMsQ0FBQTtJQUNsQixDQUFDO0lBQ0QsYUFBYTtRQUNYLE9BQU8seUJBQXlCLENBQUE7SUFDbEMsQ0FBQztJQUVELGtCQUFrQixDQUFDLFdBQWdCO1FBQ2pDLE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQyxpQ0FBaUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQy9ELEdBQUcsRUFBRSxXQUFXO1NBQ2pCLENBQUMsQ0FBQTtJQUNKLENBQUM7Q0FDRjtBQUVELGlCQUFTLElBQUksaUJBQWlCLEVBQUUsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEF1dG9MYW5ndWFnZUNsaWVudCB9IGZyb20gJ2F0b20tbGFuZ3VhZ2VjbGllbnQnXG5cbmNsYXNzIEhMU0xhbmd1YWdlQ2xpZW50IGV4dGVuZHMgQXV0b0xhbmd1YWdlQ2xpZW50IHtcbiAgZ2V0R3JhbW1hclNjb3BlcygpIHtcbiAgICByZXR1cm4gWydzb3VyY2UuaGFza2VsbCddXG4gIH1cbiAgZ2V0TGFuZ3VhZ2VOYW1lKCkge1xuICAgIHJldHVybiAnSGFza2VsbCdcbiAgfVxuICBnZXRTZXJ2ZXJOYW1lKCkge1xuICAgIHJldHVybiAnaGFza2VsbC1sYW5ndWFnZS1zZXJ2ZXInXG4gIH1cblxuICBzdGFydFNlcnZlclByb2Nlc3MocHJvamVjdFBhdGg6IGFueSkge1xuICAgIHJldHVybiBzdXBlci5zcGF3bignaGFza2VsbC1sYW5ndWFnZS1zZXJ2ZXItd3JhcHBlcicsIFsnLS1sc3AnXSwge1xuICAgICAgY3dkOiBwcm9qZWN0UGF0aCxcbiAgICB9KVxuICB9XG59XG5cbmV4cG9ydCA9IG5ldyBITFNMYW5ndWFnZUNsaWVudCgpXG4iXX0=