"use strict";
const atom_languageclient_1 = require("atom-languageclient");
const adapters_1 = require("./adapters");
class HLSLanguageClient extends atom_languageclient_1.AutoLanguageClient {
    constructor() {
        super(...arguments);
        this.renderer = { render: null };
    }
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
    consumeMarkdownRenderer(renderer) {
        this.renderer.render = renderer.render;
    }
    consumeUPI(service) {
        this.upi = service({
            name: 'hls',
        });
        this.consumeLinterV2(adapters_1.linterAdapter(this.upi, this.provideCodeActions()));
        this.consumeDatatip(adapters_1.datatipAdapter(service, this.upi, this.renderer));
        return this.upi;
    }
    async getDatatip(editor, point) {
        const datatip = await super.getDatatip(editor, point);
        if (datatip) {
            if ('component' in datatip) {
                return datatip;
            }
            else {
                datatip.markedStrings = datatip.markedStrings.filter((x) => x.value);
                if (datatip.markedStrings.length > 0) {
                    return datatip;
                }
            }
        }
        return null;
    }
}
module.exports = new HLSLanguageClient();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSw2REFBd0Q7QUFHeEQseUNBQTBEO0FBRzFELE1BQU0saUJBQWtCLFNBQVEsd0NBQWtCO0lBQWxEOztRQUVVLGFBQVEsR0FBRyxFQUFFLE1BQU0sRUFBRSxJQUF3QyxFQUFFLENBQUE7SUE2Q3pFLENBQUM7SUE1Q0MsZ0JBQWdCO1FBQ2QsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUE7SUFDM0IsQ0FBQztJQUNELGVBQWU7UUFDYixPQUFPLFNBQVMsQ0FBQTtJQUNsQixDQUFDO0lBQ0QsYUFBYTtRQUNYLE9BQU8seUJBQXlCLENBQUE7SUFDbEMsQ0FBQztJQUVELGtCQUFrQixDQUFDLFdBQWdCO1FBQ2pDLE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQyxpQ0FBaUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQy9ELEdBQUcsRUFBRSxXQUFXO1NBQ2pCLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFFRCx1QkFBdUIsQ0FBQyxRQUF5QjtRQUMvQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFBO0lBQ3hDLENBQUM7SUFFRCxVQUFVLENBQUMsT0FBNkI7UUFDdEMsSUFBSSxDQUFDLEdBQUcsR0FBRyxPQUFPLENBQUM7WUFDakIsSUFBSSxFQUFFLEtBQUs7U0FDWixDQUFDLENBQUE7UUFDRixJQUFJLENBQUMsZUFBZSxDQUFDLHdCQUFhLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxDQUFDLENBQUE7UUFDeEUsSUFBSSxDQUFDLGNBQWMsQ0FBQyx5QkFBYyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFBO1FBQ3JFLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQTtJQUNqQixDQUFDO0lBRUQsS0FBSyxDQUFDLFVBQVUsQ0FBQyxNQUFrQixFQUFFLEtBQVk7UUFFL0MsTUFBTSxPQUFPLEdBQUcsTUFBTSxLQUFLLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQTtRQUNyRCxJQUFJLE9BQU8sRUFBRTtZQUNYLElBQUksV0FBVyxJQUFJLE9BQU8sRUFBRTtnQkFDMUIsT0FBTyxPQUFPLENBQUE7YUFDZjtpQkFBTTtnQkFDTCxPQUFPLENBQUMsYUFBYSxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUE7Z0JBQ3BFLElBQUksT0FBTyxDQUFDLGFBQWEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO29CQUNwQyxPQUFPLE9BQU8sQ0FBQTtpQkFDZjthQUNGO1NBQ0Y7UUFDRCxPQUFPLElBQUksQ0FBQTtJQUNiLENBQUM7Q0FDRjtBQUVELGlCQUFTLElBQUksaUJBQWlCLEVBQUUsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEF1dG9MYW5ndWFnZUNsaWVudCB9IGZyb20gJ2F0b20tbGFuZ3VhZ2VjbGllbnQnXG5pbXBvcnQgeyBUZXh0RWRpdG9yLCBQb2ludCB9IGZyb20gJ2F0b20nXG5pbXBvcnQgKiBhcyBVUEkgZnJvbSAnYXRvbS1oYXNrZWxsLXVwaSdcbmltcG9ydCB7IGRhdGF0aXBBZGFwdGVyLCBsaW50ZXJBZGFwdGVyIH0gZnJvbSAnLi9hZGFwdGVycydcbmltcG9ydCB0eXBlIHsgTWFya2Rvd25TZXJ2aWNlIH0gZnJvbSAnYXRvbS1pZGUtYmFzZSdcblxuY2xhc3MgSExTTGFuZ3VhZ2VDbGllbnQgZXh0ZW5kcyBBdXRvTGFuZ3VhZ2VDbGllbnQge1xuICBwcml2YXRlIHVwaT86IFVQSS5JVVBJSW5zdGFuY2VcbiAgcHJpdmF0ZSByZW5kZXJlciA9IHsgcmVuZGVyOiBudWxsIGFzIE1hcmtkb3duU2VydmljZVsncmVuZGVyJ10gfCBudWxsIH1cbiAgZ2V0R3JhbW1hclNjb3BlcygpIHtcbiAgICByZXR1cm4gWydzb3VyY2UuaGFza2VsbCddXG4gIH1cbiAgZ2V0TGFuZ3VhZ2VOYW1lKCkge1xuICAgIHJldHVybiAnSGFza2VsbCdcbiAgfVxuICBnZXRTZXJ2ZXJOYW1lKCkge1xuICAgIHJldHVybiAnaGFza2VsbC1sYW5ndWFnZS1zZXJ2ZXInXG4gIH1cblxuICBzdGFydFNlcnZlclByb2Nlc3MocHJvamVjdFBhdGg6IGFueSkge1xuICAgIHJldHVybiBzdXBlci5zcGF3bignaGFza2VsbC1sYW5ndWFnZS1zZXJ2ZXItd3JhcHBlcicsIFsnLS1sc3AnXSwge1xuICAgICAgY3dkOiBwcm9qZWN0UGF0aCxcbiAgICB9KVxuICB9XG5cbiAgY29uc3VtZU1hcmtkb3duUmVuZGVyZXIocmVuZGVyZXI6IE1hcmtkb3duU2VydmljZSkge1xuICAgIHRoaXMucmVuZGVyZXIucmVuZGVyID0gcmVuZGVyZXIucmVuZGVyXG4gIH1cblxuICBjb25zdW1lVVBJKHNlcnZpY2U6IFVQSS5JVVBJUmVnaXN0cmF0aW9uKSB7XG4gICAgdGhpcy51cGkgPSBzZXJ2aWNlKHtcbiAgICAgIG5hbWU6ICdobHMnLFxuICAgIH0pXG4gICAgdGhpcy5jb25zdW1lTGludGVyVjIobGludGVyQWRhcHRlcih0aGlzLnVwaSwgdGhpcy5wcm92aWRlQ29kZUFjdGlvbnMoKSkpXG4gICAgdGhpcy5jb25zdW1lRGF0YXRpcChkYXRhdGlwQWRhcHRlcihzZXJ2aWNlLCB0aGlzLnVwaSwgdGhpcy5yZW5kZXJlcikpXG4gICAgcmV0dXJuIHRoaXMudXBpXG4gIH1cbiAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLyBvdmVycmlkZXMgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICBhc3luYyBnZXREYXRhdGlwKGVkaXRvcjogVGV4dEVkaXRvciwgcG9pbnQ6IFBvaW50KSB7XG4gICAgLy8gSExTIGxpa2VzIHRvIHJldHVybiBlbXB0eSBkYXRhdGlwczsgdGhpcyB0cmllcyB0byBmaWx0ZXIgdGhvc2Ugb3V0XG4gICAgY29uc3QgZGF0YXRpcCA9IGF3YWl0IHN1cGVyLmdldERhdGF0aXAoZWRpdG9yLCBwb2ludClcbiAgICBpZiAoZGF0YXRpcCkge1xuICAgICAgaWYgKCdjb21wb25lbnQnIGluIGRhdGF0aXApIHtcbiAgICAgICAgcmV0dXJuIGRhdGF0aXBcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRhdGF0aXAubWFya2VkU3RyaW5ncyA9IGRhdGF0aXAubWFya2VkU3RyaW5ncy5maWx0ZXIoKHgpID0+IHgudmFsdWUpXG4gICAgICAgIGlmIChkYXRhdGlwLm1hcmtlZFN0cmluZ3MubGVuZ3RoID4gMCkge1xuICAgICAgICAgIHJldHVybiBkYXRhdGlwXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGxcbiAgfVxufVxuXG5leHBvcnQgPSBuZXcgSExTTGFuZ3VhZ2VDbGllbnQoKVxuIl19