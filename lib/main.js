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
        this.renderer = {
            render: null,
        };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSw2REFBd0Q7QUFHeEQseUNBQTBEO0FBRTFELHFDQUFpQztBQUVqQyxNQUFNLHdCQUF3QixHQUFHO0lBQy9CLElBQUksRUFBRSxNQUFNO0lBQ1osS0FBSyxFQUFFLE9BQU87SUFDZCxPQUFPLEVBQUUsU0FBUztDQUNWLENBQUE7QUFFVixNQUFNLGlCQUFrQixTQUFRLHdDQUFrQjtJQUFsRDs7UUFFVSxhQUFRLEdBQUc7WUFDakIsTUFBTSxFQUFFLElBRStEO1NBQ3hFLENBQUE7UUFDTSxXQUFNLEdBQUcsZUFBTSxDQUFBO0lBeUZ4QixDQUFDO0lBeEZDLGdCQUFnQjtRQUNkLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBO0lBQzNCLENBQUM7SUFDRCxlQUFlO1FBQ2IsT0FBTyxTQUFTLENBQUE7SUFDbEIsQ0FBQztJQUNELGFBQWE7UUFDWCxPQUFPLHlCQUF5QixDQUFBO0lBQ2xDLENBQUM7SUFDRCx1QkFBdUI7UUFDckIsT0FBTyxpQkFBaUIsQ0FBQTtJQUMxQixDQUFDO0lBRUQsa0JBQWtCLENBQUMsV0FBZ0I7UUFDakMsT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFDLGlDQUFpQyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDL0QsR0FBRyxFQUFFLFdBQVc7U0FDakIsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUVELHVCQUF1QixDQUFDLFFBQXlCO1FBQy9DLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxNQUFhLENBQUE7SUFDL0MsQ0FBQztJQUVELFVBQVUsQ0FBQyxPQUE2QjtRQUN0QyxJQUFJLEVBQWlCLENBQUE7UUFDckIsU0FBUyxtQkFBbUIsQ0FBQyxNQUFrQixFQUFFLEtBQVk7WUFDM0QsTUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFBO1lBQ2pDLE1BQU0s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ZjthQUNGO1NBQ0Y7UUFDRCxPQUFPLElBQUksQ0FBQTtJQUNiLENBQUM7Q0FDRjtBQUVELGlCQUFTLElBQUksaUJBQWlCLEVBQUUsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEF1dG9MYW5ndWFnZUNsaWVudCB9IGZyb20gJ2F0b20tbGFuZ3VhZ2VjbGllbnQnXG5pbXBvcnQgeyBUZXh0RWRpdG9yLCBQb2ludCwgUmFuZ2UgfSBmcm9tICdhdG9tJ1xuaW1wb3J0ICogYXMgVVBJIGZyb20gJ2F0b20taGFza2VsbC11cGknXG5pbXBvcnQgeyBkYXRhdGlwQWRhcHRlciwgTGludGVyQWRhcHRlciB9IGZyb20gJy4vYWRhcHRlcnMnXG5pbXBvcnQgdHlwZSB7IE1hcmtkb3duU2VydmljZSB9IGZyb20gJ2F0b20taWRlLWJhc2UnXG5pbXBvcnQgeyBjb25maWcgfSBmcm9tICcuL2NvbmZpZydcblxuY29uc3Qgc2V2ZXJpdHlUb0RpYWdub3N0aWNUeXBlID0ge1xuICBpbmZvOiAnSW5mbycsXG4gIGVycm9yOiAnRXJyb3InLFxuICB3YXJuaW5nOiAnV2FybmluZycsXG59IGFzIGNvbnN0XG5cbmNsYXNzIEhMU0xhbmd1YWdlQ2xpZW50IGV4dGVuZHMgQXV0b0xhbmd1YWdlQ2xpZW50IHtcbiAgcHJpdmF0ZSB1cGk/OiBVUEkuSVVQSUluc3RhbmNlXG4gIHByaXZhdGUgcmVuZGVyZXIgPSB7XG4gICAgcmVuZGVyOiBudWxsIGFzXG4gICAgICB8IG51bGxcbiAgICAgIHwgKChzb3VyY2U6IHN0cmluZywgdGV4dDogc3RyaW5nLCBjb25maWc6IG9iamVjdCkgPT4gUHJvbWlzZTxzdHJpbmc+KSxcbiAgfVxuICBwdWJsaWMgY29uZmlnID0gY29uZmlnXG4gIGdldEdyYW1tYXJTY29wZXMoKSB7XG4gICAgcmV0dXJuIFsnc291cmNlLmhhc2tlbGwnXVxuICB9XG4gIGdldExhbmd1YWdlTmFtZSgpIHtcbiAgICByZXR1cm4gJ0hhc2tlbGwnXG4gIH1cbiAgZ2V0U2VydmVyTmFtZSgpIHtcbiAgICByZXR1cm4gJ2hhc2tlbGwtbGFuZ3VhZ2Utc2VydmVyJ1xuICB9XG4gIGdldFJvb3RDb25maWd1cmF0aW9uS2V5KCkge1xuICAgIHJldHVybiAnaWRlLWhhc2tlbGwtaGxzJ1xuICB9XG5cbiAgc3RhcnRTZXJ2ZXJQcm9jZXNzKHByb2plY3RQYXRoOiBhbnkpIHtcbiAgICByZXR1cm4gc3VwZXIuc3Bhd24oJ2hhc2tlbGwtbGFuZ3VhZ2Utc2VydmVyLXdyYXBwZXInLCBbJy0tbHNwJ10sIHtcbiAgICAgIGN3ZDogcHJvamVjdFBhdGgsXG4gICAgfSlcbiAgfVxuXG4gIGNvbnN1bWVNYXJrZG93blJlbmRlcmVyKHJlbmRlcmVyOiBNYXJrZG93blNlcnZpY2UpIHtcbiAgICB0aGlzLnJlbmRlcmVyLnJlbmRlciA9IHJlbmRlcmVyLnJlbmRlciBhcyBhbnlcbiAgfVxuXG4gIGNvbnN1bWVVUEkoc2VydmljZTogVVBJLklVUElSZWdpc3RyYXRpb24pIHtcbiAgICBsZXQgbGE6IExpbnRlckFkYXB0ZXJcbiAgICBmdW5jdGlvbiBnZXRSZWxldmFudE1lc3NhZ2VzKGVkaXRvcjogVGV4dEVkaXRvciwgcmFuZ2U6IFJhbmdlKSB7XG4gICAgICBjb25zdCBtZXNzYWdlcyA9IGxhLmdldE1lc3NhZ2VzKClcbiAgICAgIGNvbnN0IHBhdGggPSBlZGl0b3IuZ2V0UGF0aCgpXG4gICAgICByZXR1cm4gbWVzc2FnZXNcbiAgICAgICAgLmZpbHRlcihcbiAgICAgICAgICAoeCkgPT5cbiAgICAgICAgICAgIHgubG9jYXRpb24uZmlsZSA9PT0gcGF0aCAmJlxuICAgICAgICAgICAgcmFuZ2UuaW50ZXJzZWN0c1dpdGgoeC5sb2NhdGlvbi5wb3NpdGlvbiksXG4gICAgICAgIClcbiAgICAgICAgLm1hcCgoeCkgPT4gKHtcbiAgICAgICAgICBmaWxlUGF0aDogeC5sb2NhdGlvbi5maWxlLFxuICAgICAgICAgIHByb3ZpZGVyTmFtZTogeC5saW50ZXJOYW1lID8/ICdobHMnLFxuICAgICAgICAgIHJhbmdlOiB4LmxvY2F0aW9uLnBvc2l0aW9uLFxuICAgICAgICAgIHRleHQ6IHguZXhjZXJwdCxcbiAgICAgICAgICB0eXBlOiBzZXZlcml0eVRvRGlhZ25vc3RpY1R5cGVbeC5zZXZlcml0eV0sXG4gICAgICAgIH0pKVxuICAgIH1cbiAgICB0aGlzLnVwaSA9IHNlcnZpY2Uoe1xuICAgICAgbmFtZTogJ2hscycsXG4gICAgICBhY3Rpb25zOiB7XG4gICAgICAgIHByaW9yaXR5OiA1MCxcbiAgICAgICAgZXZlbnRUeXBlczogW1xuICAgICAgICAgIFVQSS5URXZlbnRSYW5nZVR5cGUuY29udGV4dCxcbiAgICAgICAgICBVUEkuVEV2ZW50UmFuZ2VUeXBlLmtleWJvYXJkLFxuICAgICAgICAgIFVQSS5URXZlbnRSYW5nZVR5cGUubW91c2UsXG4gICAgICAgICAgVVBJLlRFdmVudFJhbmdlVHlwZS5zZWxlY3Rpb24sXG4gICAgICAgIF0sXG4gICAgICAgIGhhbmRsZXI6IGFzeW5jIChlZGl0b3IsIHJhbmdlLCB0eXBlKSA9PiB7XG4gICAgICAgICAgY29uc3QgbXNncyA9IGdldFJlbGV2YW50TWVzc2FnZXMoZWRpdG9yLCByYW5nZSlcbiAgICAgICAgICBpZiAodHlwZSA9PT0gVVBJLlRFdmVudFJhbmdlVHlwZS5rZXlib2FyZCAmJiAhbXNncy5sZW5ndGgpXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkXG4gICAgICAgICAgY29uc3QgYWN0cyA9IGF3YWl0IHRoaXMuZ2V0Q29kZUFjdGlvbnMoZWRpdG9yLCByYW5nZSwgbXNncylcbiAgICAgICAgICBpZiAoIWFjdHMpIHJldHVybiB1bmRlZmluZWRcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoXG4gICAgICAgICAgICBhY3RzLm1hcChhc3luYyAoeCkgPT4gKHtcbiAgICAgICAgICAgICAgdGl0bGU6IGF3YWl0IHguZ2V0VGl0bGUoKSxcbiAgICAgICAgICAgICAgYXBwbHk6ICgpID0+IHguYXBwbHkoKSxcbiAgICAgICAgICAgIH0pKSxcbiAgICAgICAgICApXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0pXG4gICAgbGEgPSBuZXcgTGludGVyQWRhcHRlcih0aGlzLnVwaSlcbiAgICB0aGlzLmNvbnN1bWVMaW50ZXJWMigoKSA9PiBsYSlcbiAgICB0aGlzLmNvbnN1bWVEYXRhdGlwKGRhdGF0aXBBZGFwdGVyKHNlcnZpY2UsIHRoaXMudXBpLCB0aGlzLnJlbmRlcmVyKSlcbiAgICByZXR1cm4gdGhpcy51cGlcbiAgfVxuICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vIG92ZXJyaWRlcyAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gIGFzeW5jIGdldERhdGF0aXAoZWRpdG9yOiBUZXh0RWRpdG9yLCBwb2ludDogUG9pbnQpIHtcbiAgICAvLyBITFMgbGlrZXMgdG8gcmV0dXJuIGVtcHR5IGRhdGF0aXBzOyB0aGlzIHRyaWVzIHRvIGZpbHRlciB0aG9zZSBvdXRcbiAgICBjb25zdCBkYXRhdGlwID0gYXdhaXQgc3VwZXIuZ2V0RGF0YXRpcChlZGl0b3IsIHBvaW50KVxuICAgIGlmIChkYXRhdGlwKSB7XG4gICAgICBpZiAoJ2NvbXBvbmVudCcgaW4gZGF0YXRpcCkge1xuICAgICAgICByZXR1cm4gZGF0YXRpcFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGF0YXRpcC5tYXJrZWRTdHJpbmdzID0gZGF0YXRpcC5tYXJrZWRTdHJpbmdzLmZpbHRlcigoeCkgPT4geC52YWx1ZSlcbiAgICAgICAgaWYgKGRhdGF0aXAubWFya2VkU3RyaW5ncy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgcmV0dXJuIGRhdGF0aXBcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbFxuICB9XG59XG5cbmV4cG9ydCA9IG5ldyBITFNMYW5ndWFnZUNsaWVudCgpXG4iXX0=