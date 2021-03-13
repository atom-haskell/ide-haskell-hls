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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSw2REFBd0Q7QUFHeEQsTUFBTSxpQkFBa0IsU0FBUSx3Q0FBa0I7SUFDaEQsZ0JBQWdCO1FBQ2QsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUE7SUFDM0IsQ0FBQztJQUNELGVBQWU7UUFDYixPQUFPLFNBQVMsQ0FBQTtJQUNsQixDQUFDO0lBQ0QsYUFBYTtRQUNYLE9BQU8seUJBQXlCLENBQUE7SUFDbEMsQ0FBQztJQUVELGtCQUFrQixDQUFDLFdBQWdCO1FBQ2pDLE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQyxpQ0FBaUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQy9ELEdBQUcsRUFBRSxXQUFXO1NBQ2pCLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFFRCxLQUFLLENBQUMsVUFBVSxDQUFDLE1BQWtCLEVBQUUsS0FBWTtRQUUvQyxNQUFNLE9BQU8sR0FBRyxNQUFNLEtBQUssQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFBO1FBQ3JELElBQUksT0FBTyxFQUFFO1lBQ1gsSUFBSSxXQUFXLElBQUksT0FBTyxFQUFFO2dCQUMxQixPQUFPLE9BQU8sQ0FBQTthQUNmO2lCQUFNO2dCQUNMLE9BQU8sQ0FBQyxhQUFhLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQTtnQkFDcEUsSUFBSSxPQUFPLENBQUMsYUFBYSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7b0JBQ3BDLE9BQU8sT0FBTyxDQUFBO2lCQUNmO2FBQ0Y7U0FDRjtRQUNELE9BQU8sSUFBSSxDQUFBO0lBQ2IsQ0FBQztDQUNGO0FBRUQsaUJBQVMsSUFBSSxpQkFBaUIsRUFBRSxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXV0b0xhbmd1YWdlQ2xpZW50IH0gZnJvbSAnYXRvbS1sYW5ndWFnZWNsaWVudCdcbmltcG9ydCB7IFRleHRFZGl0b3IsIFBvaW50IH0gZnJvbSAnYXRvbSdcblxuY2xhc3MgSExTTGFuZ3VhZ2VDbGllbnQgZXh0ZW5kcyBBdXRvTGFuZ3VhZ2VDbGllbnQge1xuICBnZXRHcmFtbWFyU2NvcGVzKCkge1xuICAgIHJldHVybiBbJ3NvdXJjZS5oYXNrZWxsJ11cbiAgfVxuICBnZXRMYW5ndWFnZU5hbWUoKSB7XG4gICAgcmV0dXJuICdIYXNrZWxsJ1xuICB9XG4gIGdldFNlcnZlck5hbWUoKSB7XG4gICAgcmV0dXJuICdoYXNrZWxsLWxhbmd1YWdlLXNlcnZlcidcbiAgfVxuXG4gIHN0YXJ0U2VydmVyUHJvY2Vzcyhwcm9qZWN0UGF0aDogYW55KSB7XG4gICAgcmV0dXJuIHN1cGVyLnNwYXduKCdoYXNrZWxsLWxhbmd1YWdlLXNlcnZlci13cmFwcGVyJywgWyctLWxzcCddLCB7XG4gICAgICBjd2Q6IHByb2plY3RQYXRoLFxuICAgIH0pXG4gIH1cbiAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLyBvdmVycmlkZXMgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICBhc3luYyBnZXREYXRhdGlwKGVkaXRvcjogVGV4dEVkaXRvciwgcG9pbnQ6IFBvaW50KSB7XG4gICAgLy8gSExTIGxpa2VzIHRvIHJldHVybiBlbXB0eSBkYXRhdGlwczsgdGhpcyB0cmllcyB0byBmaWx0ZXIgdGhvc2Ugb3V0XG4gICAgY29uc3QgZGF0YXRpcCA9IGF3YWl0IHN1cGVyLmdldERhdGF0aXAoZWRpdG9yLCBwb2ludClcbiAgICBpZiAoZGF0YXRpcCkge1xuICAgICAgaWYgKCdjb21wb25lbnQnIGluIGRhdGF0aXApIHtcbiAgICAgICAgcmV0dXJuIGRhdGF0aXBcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRhdGF0aXAubWFya2VkU3RyaW5ncyA9IGRhdGF0aXAubWFya2VkU3RyaW5ncy5maWx0ZXIoKHgpID0+IHgudmFsdWUpXG4gICAgICAgIGlmIChkYXRhdGlwLm1hcmtlZFN0cmluZ3MubGVuZ3RoID4gMCkge1xuICAgICAgICAgIHJldHVybiBkYXRhdGlwXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGxcbiAgfVxufVxuXG5leHBvcnQgPSBuZXcgSExTTGFuZ3VhZ2VDbGllbnQoKVxuIl19