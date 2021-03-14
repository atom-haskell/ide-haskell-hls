"use strict";
const atom_languageclient_1 = require("atom-languageclient");
const adapters_1 = require("./adapters");
const config_1 = require("./config");
const severityToDiagnosticType = {
    info: 'Info',
    error: 'Error',
    warning: 'Warning',
};
class HLSLanguageClient extends atom_languageclient_1.AutoLanguageClient {
    constructor() {
        super(...arguments);
        this.renderer = { render: null };
        this.config = config_1.config;
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
    getRootConfigurationKey() {
        return 'ide-haskell-hls';
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
        let la;
        function getRelevantMessages(editor, range) {
            const messages = la.getMessages();
            const path = editor.getPath();
            return messages
                .filter((x) => x.location.file === path &&
                range.intersectsWith(x.location.position))
                .map((x) => {
                var _a;
                return ({
                    filePath: x.location.file,
                    providerName: (_a = x.linterName) !== null && _a !== void 0 ? _a : 'hls',
                    range: x.location.position,
                    text: x.excerpt,
                    type: severityToDiagnosticType[x.severity],
                });
            });
        }
        this.upi = service({
            name: 'hls',
            actions: {
                priority: 50,
                eventTypes: [
                    "context",
                    "keyboard",
                    "mouse",
                    "selection",
                ],
                handler: async (editor, range, type) => {
                    const msgs = getRelevantMessages(editor, range);
                    if (type === "keyboard" && !msgs.length)
                        return undefined;
                    const acts = await this.getCodeActions(editor, range, msgs);
                    if (!acts)
                        return undefined;
                    return Promise.all(acts.map(async (x) => ({
                        title: await x.getTitle(),
                        apply: () => x.apply(),
                    })));
                },
            },
        });
        la = new adapters_1.LinterAdapter(this.upi);
        this.consumeLinterV2(() => la);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSw2REFBd0Q7QUFHeEQseUNBQTBEO0FBRTFELHFDQUFpQztBQUVqQyxNQUFNLHdCQUF3QixHQUFHO0lBQy9CLElBQUksRUFBRSxNQUFNO0lBQ1osS0FBSyxFQUFFLE9BQU87SUFDZCxPQUFPLEVBQUUsU0FBUztDQUNWLENBQUE7QUFFVixNQUFNLGlCQUFrQixTQUFRLHdDQUFrQjtJQUFsRDs7UUFFVSxhQUFRLEdBQUcsRUFBRSxNQUFNLEVBQUUsSUFBd0MsRUFBRSxDQUFBO1FBQ2hFLFdBQU0sR0FBRyxlQUFNLENBQUE7SUF5RnhCLENBQUM7SUF4RkMsZ0JBQWdCO1FBQ2QsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUE7SUFDM0IsQ0FBQztJQUNELGVBQWU7UUFDYixPQUFPLFNBQVMsQ0FBQTtJQUNsQixDQUFDO0lBQ0QsYUFBYTtRQUNYLE9BQU8seUJBQXlCLENBQUE7SUFDbEMsQ0FBQztJQUNELHVCQUF1QjtRQUNyQixPQUFPLGlCQUFpQixDQUFBO0lBQzFCLENBQUM7SUFFRCxrQkFBa0IsQ0FBQyxXQUFnQjtRQUNqQyxPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUMsaUNBQWlDLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUMvRCxHQUFHLEVBQUUsV0FBVztTQUNqQixDQUFDLENBQUE7SUFDSixDQUFDO0lBRUQsdUJBQXVCLENBQUMsUUFBeUI7UUFDL0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQTtJQUN4QyxDQUFDO0lBRUQsVUFBVSxDQUFDLE9BQTZCO1FBQ3RDLElBQUksRUFBaUIsQ0FBQTtRQUNyQixTQUFTLG1CQUFtQixDQUFDLE1BQWtCLEVBQUUsS0FBWTtZQUMzRCxNQUFNLFFBQVEsR0FBRyxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUE7WUFDakMsTUFBTSxJ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O2FBQ0Y7U0FDRjtRQUNELE9BQU8sSUFBSSxDQUFBO0lBQ2IsQ0FBQztDQUNGO0FBRUQsaUJBQVMsSUFBSSxpQkFBaUIsRUFBRSxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXV0b0xhbmd1YWdlQ2xpZW50IH0gZnJvbSAnYXRvbS1sYW5ndWFnZWNsaWVudCdcbmltcG9ydCB7IFRleHRFZGl0b3IsIFBvaW50LCBSYW5nZSB9IGZyb20gJ2F0b20nXG5pbXBvcnQgKiBhcyBVUEkgZnJvbSAnYXRvbS1oYXNrZWxsLXVwaSdcbmltcG9ydCB7IGRhdGF0aXBBZGFwdGVyLCBMaW50ZXJBZGFwdGVyIH0gZnJvbSAnLi9hZGFwdGVycydcbmltcG9ydCB0eXBlIHsgTWFya2Rvd25TZXJ2aWNlIH0gZnJvbSAnYXRvbS1pZGUtYmFzZSdcbmltcG9ydCB7IGNvbmZpZyB9IGZyb20gJy4vY29uZmlnJ1xuXG5jb25zdCBzZXZlcml0eVRvRGlhZ25vc3RpY1R5cGUgPSB7XG4gIGluZm86ICdJbmZvJyxcbiAgZXJyb3I6ICdFcnJvcicsXG4gIHdhcm5pbmc6ICdXYXJuaW5nJyxcbn0gYXMgY29uc3RcblxuY2xhc3MgSExTTGFuZ3VhZ2VDbGllbnQgZXh0ZW5kcyBBdXRvTGFuZ3VhZ2VDbGllbnQge1xuICBwcml2YXRlIHVwaT86IFVQSS5JVVBJSW5zdGFuY2VcbiAgcHJpdmF0ZSByZW5kZXJlciA9IHsgcmVuZGVyOiBudWxsIGFzIE1hcmtkb3duU2VydmljZVsncmVuZGVyJ10gfCBudWxsIH1cbiAgcHVibGljIGNvbmZpZyA9IGNvbmZpZ1xuICBnZXRHcmFtbWFyU2NvcGVzKCkge1xuICAgIHJldHVybiBbJ3NvdXJjZS5oYXNrZWxsJ11cbiAgfVxuICBnZXRMYW5ndWFnZU5hbWUoKSB7XG4gICAgcmV0dXJuICdIYXNrZWxsJ1xuICB9XG4gIGdldFNlcnZlck5hbWUoKSB7XG4gICAgcmV0dXJuICdoYXNrZWxsLWxhbmd1YWdlLXNlcnZlcidcbiAgfVxuICBnZXRSb290Q29uZmlndXJhdGlvbktleSgpIHtcbiAgICByZXR1cm4gJ2lkZS1oYXNrZWxsLWhscydcbiAgfVxuXG4gIHN0YXJ0U2VydmVyUHJvY2Vzcyhwcm9qZWN0UGF0aDogYW55KSB7XG4gICAgcmV0dXJuIHN1cGVyLnNwYXduKCdoYXNrZWxsLWxhbmd1YWdlLXNlcnZlci13cmFwcGVyJywgWyctLWxzcCddLCB7XG4gICAgICBjd2Q6IHByb2plY3RQYXRoLFxuICAgIH0pXG4gIH1cblxuICBjb25zdW1lTWFya2Rvd25SZW5kZXJlcihyZW5kZXJlcjogTWFya2Rvd25TZXJ2aWNlKSB7XG4gICAgdGhpcy5yZW5kZXJlci5yZW5kZXIgPSByZW5kZXJlci5yZW5kZXJcbiAgfVxuXG4gIGNvbnN1bWVVUEkoc2VydmljZTogVVBJLklVUElSZWdpc3RyYXRpb24pIHtcbiAgICBsZXQgbGE6IExpbnRlckFkYXB0ZXJcbiAgICBmdW5jdGlvbiBnZXRSZWxldmFudE1lc3NhZ2VzKGVkaXRvcjogVGV4dEVkaXRvciwgcmFuZ2U6IFJhbmdlKSB7XG4gICAgICBjb25zdCBtZXNzYWdlcyA9IGxhLmdldE1lc3NhZ2VzKClcbiAgICAgIGNvbnN0IHBhdGggPSBlZGl0b3IuZ2V0UGF0aCgpXG4gICAgICByZXR1cm4gbWVzc2FnZXNcbiAgICAgICAgLmZpbHRlcihcbiAgICAgICAgICAoeCkgPT5cbiAgICAgICAgICAgIHgubG9jYXRpb24uZmlsZSA9PT0gcGF0aCAmJlxuICAgICAgICAgICAgcmFuZ2UuaW50ZXJzZWN0c1dpdGgoeC5sb2NhdGlvbi5wb3NpdGlvbiksXG4gICAgICAgIClcbiAgICAgICAgLm1hcCgoeCkgPT4gKHtcbiAgICAgICAgICBmaWxlUGF0aDogeC5sb2NhdGlvbi5maWxlLFxuICAgICAgICAgIHByb3ZpZGVyTmFtZTogeC5saW50ZXJOYW1lID8/ICdobHMnLFxuICAgICAgICAgIHJhbmdlOiB4LmxvY2F0aW9uLnBvc2l0aW9uLFxuICAgICAgICAgIHRleHQ6IHguZXhjZXJwdCxcbiAgICAgICAgICB0eXBlOiBzZXZlcml0eVRvRGlhZ25vc3RpY1R5cGVbeC5zZXZlcml0eV0sXG4gICAgICAgIH0pKVxuICAgIH1cbiAgICB0aGlzLnVwaSA9IHNlcnZpY2Uoe1xuICAgICAgbmFtZTogJ2hscycsXG4gICAgICBhY3Rpb25zOiB7XG4gICAgICAgIHByaW9yaXR5OiA1MCxcbiAgICAgICAgZXZlbnRUeXBlczogW1xuICAgICAgICAgIFVQSS5URXZlbnRSYW5nZVR5cGUuY29udGV4dCxcbiAgICAgICAgICBVUEkuVEV2ZW50UmFuZ2VUeXBlLmtleWJvYXJkLFxuICAgICAgICAgIFVQSS5URXZlbnRSYW5nZVR5cGUubW91c2UsXG4gICAgICAgICAgVVBJLlRFdmVudFJhbmdlVHlwZS5zZWxlY3Rpb24sXG4gICAgICAgIF0sXG4gICAgICAgIGhhbmRsZXI6IGFzeW5jIChlZGl0b3IsIHJhbmdlLCB0eXBlKSA9PiB7XG4gICAgICAgICAgY29uc3QgbXNncyA9IGdldFJlbGV2YW50TWVzc2FnZXMoZWRpdG9yLCByYW5nZSlcbiAgICAgICAgICBpZiAodHlwZSA9PT0gVVBJLlRFdmVudFJhbmdlVHlwZS5rZXlib2FyZCAmJiAhbXNncy5sZW5ndGgpXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkXG4gICAgICAgICAgY29uc3QgYWN0cyA9IGF3YWl0IHRoaXMuZ2V0Q29kZUFjdGlvbnMoZWRpdG9yLCByYW5nZSwgbXNncylcbiAgICAgICAgICBpZiAoIWFjdHMpIHJldHVybiB1bmRlZmluZWRcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoXG4gICAgICAgICAgICBhY3RzLm1hcChhc3luYyAoeCkgPT4gKHtcbiAgICAgICAgICAgICAgdGl0bGU6IGF3YWl0IHguZ2V0VGl0bGUoKSxcbiAgICAgICAgICAgICAgYXBwbHk6ICgpID0+IHguYXBwbHkoKSxcbiAgICAgICAgICAgIH0pKSxcbiAgICAgICAgICApXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0pXG4gICAgbGEgPSBuZXcgTGludGVyQWRhcHRlcih0aGlzLnVwaSlcbiAgICB0aGlzLmNvbnN1bWVMaW50ZXJWMigoKSA9PiBsYSlcbiAgICB0aGlzLmNvbnN1bWVEYXRhdGlwKGRhdGF0aXBBZGFwdGVyKHNlcnZpY2UsIHRoaXMudXBpLCB0aGlzLnJlbmRlcmVyKSlcbiAgICByZXR1cm4gdGhpcy51cGlcbiAgfVxuICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vIG92ZXJyaWRlcyAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gIGFzeW5jIGdldERhdGF0aXAoZWRpdG9yOiBUZXh0RWRpdG9yLCBwb2ludDogUG9pbnQpIHtcbiAgICAvLyBITFMgbGlrZXMgdG8gcmV0dXJuIGVtcHR5IGRhdGF0aXBzOyB0aGlzIHRyaWVzIHRvIGZpbHRlciB0aG9zZSBvdXRcbiAgICBjb25zdCBkYXRhdGlwID0gYXdhaXQgc3VwZXIuZ2V0RGF0YXRpcChlZGl0b3IsIHBvaW50KVxuICAgIGlmIChkYXRhdGlwKSB7XG4gICAgICBpZiAoJ2NvbXBvbmVudCcgaW4gZGF0YXRpcCkge1xuICAgICAgICByZXR1cm4gZGF0YXRpcFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGF0YXRpcC5tYXJrZWRTdHJpbmdzID0gZGF0YXRpcC5tYXJrZWRTdHJpbmdzLmZpbHRlcigoeCkgPT4geC52YWx1ZSlcbiAgICAgICAgaWYgKGRhdGF0aXAubWFya2VkU3RyaW5ncy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgcmV0dXJuIGRhdGF0aXBcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbFxuICB9XG59XG5cbmV4cG9ydCA9IG5ldyBITFNMYW5ndWFnZUNsaWVudCgpXG4iXX0=