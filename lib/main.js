"use strict";
const atom_languageclient_1 = require("atom-languageclient");
const atom_1 = require("atom");
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
        this.disposables = new atom_1.CompositeDisposable();
        this.config = config_1.config;
    }
    activate() {
        super.activate();
        this.disposables.add(atom.commands.add('atom-workspace', {
            'ide-haskell-hls:restart-all-severs': () => {
                var _a;
                (_a = this.linterAdapter) === null || _a === void 0 ? void 0 : _a.clearMessages();
                this.restartAllServers().catch((e) => {
                    atom.notifications.addError(e);
                });
            },
            'ide-haskell-hls:clear-messages': () => {
                var _a;
                (_a = this.linterAdapter) === null || _a === void 0 ? void 0 : _a.clearMessages();
            },
        }));
    }
    async deactivate() {
        this.disposables.dispose();
        super.deactivate();
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
        const getRelevantMessages = (editor, range) => {
            if (!this.linterAdapter)
                return [];
            const messages = this.linterAdapter.getMessages();
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
        };
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
        const la = new adapters_1.LinterAdapter(this.upi);
        this.linterAdapter = this.linterAdapter;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSw2REFBd0Q7QUFDeEQsK0JBQW9FO0FBRXBFLHlDQUEwRDtBQUUxRCxxQ0FBaUM7QUFFakMsTUFBTSx3QkFBd0IsR0FBRztJQUMvQixJQUFJLEVBQUUsTUFBTTtJQUNaLEtBQUssRUFBRSxPQUFPO0lBQ2QsT0FBTyxFQUFFLFNBQVM7Q0FDVixDQUFBO0FBRVYsTUFBTSxpQkFBa0IsU0FBUSx3Q0FBa0I7SUFBbEQ7O1FBRVUsYUFBUSxHQUFHO1lBQ2pCLE1BQU0sRUFBRSxJQUUrRDtTQUN4RSxDQUFBO1FBQ08sZ0JBQVcsR0FBRyxJQUFJLDBCQUFtQixFQUFFLENBQUE7UUFFeEMsV0FBTSxHQUFHLGVBQU0sQ0FBQTtJQWlIeEIsQ0FBQztJQS9HQyxRQUFRO1FBQ04sS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFBO1FBQ2hCLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUNsQixJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRTtZQUNsQyxvQ0FBb0MsRUFBRSxHQUFHLEVBQUU7O2dCQUN6QyxNQUFBLElBQUksQ0FBQyxhQUFhLDBDQUFFLGFBQWEsRUFBRSxDQUFBO2dCQUNuQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtvQkFDbkMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUE7Z0JBQ2hDLENBQUMsQ0FBQyxDQUFBO1lBQ0osQ0FBQztZQUNELGdDQUFnQyxFQUFFLEdBQUcsRUFBRTs7Z0JBQ3JDLE1BQUEsSUFBSSxDQUFDLGFBQWEsMENBQUUsYUFBYSxFQUFFLENBQUE7WUFDckMsQ0FBQztTQUNGLENBQUMsQ0FDSCxDQUFBO0lBQ0gsQ0FBQztJQUVELEtBQUssQ0FBQyxVQUFVO1FBQ2QsSUFBSSxDQUFD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QUMsQ0FDSixDQUFBO2dCQUNILENBQUM7YUFDRjtTQUNGLENBQUMsQ0FBQTtRQUNGLE1BQU0sRUFBRSxHQUFHLElBQUksd0JBQWEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDdEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFBO1FBQ3ZDLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUE7UUFDOUIsSUFBSSxDQUFDLGNBQWMsQ0FBQyx5QkFBYyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFBO1FBQ3JFLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQTtJQUNqQixDQUFDO0lBRUQsS0FBSyxDQUFDLFVBQVUsQ0FBQyxNQUFrQixFQUFFLEtBQVk7UUFFL0MsTUFBTSxPQUFPLEdBQUcsTUFBTSxLQUFLLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQTtRQUNyRCxJQUFJLE9BQU8sRUFBRTtZQUNYLElBQUksV0FBVyxJQUFJLE9BQU8sRUFBRTtnQkFDMUIsT0FBTyxPQUFPLENBQUE7YUFDZjtpQkFBTTtnQkFDTCxPQUFPLENBQUMsYUFBYSxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUE7Z0JBQ3BFLElBQUksT0FBTyxDQUFDLGFBQWEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO29CQUNwQyxPQUFPLE9BQU8sQ0FBQTtpQkFDZjthQUNGO1NBQ0Y7UUFDRCxPQUFPLElBQUksQ0FBQTtJQUNiLENBQUM7Q0FDRjtBQUVELGlCQUFTLElBQUksaUJBQWlCLEVBQUUsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEF1dG9MYW5ndWFnZUNsaWVudCB9IGZyb20gJ2F0b20tbGFuZ3VhZ2VjbGllbnQnXG5pbXBvcnQgeyBUZXh0RWRpdG9yLCBQb2ludCwgUmFuZ2UsIENvbXBvc2l0ZURpc3Bvc2FibGUgfSBmcm9tICdhdG9tJ1xuaW1wb3J0ICogYXMgVVBJIGZyb20gJ2F0b20taGFza2VsbC11cGknXG5pbXBvcnQgeyBkYXRhdGlwQWRhcHRlciwgTGludGVyQWRhcHRlciB9IGZyb20gJy4vYWRhcHRlcnMnXG5pbXBvcnQgdHlwZSB7IE1hcmtkb3duU2VydmljZSB9IGZyb20gJ2F0b20taWRlLWJhc2UnXG5pbXBvcnQgeyBjb25maWcgfSBmcm9tICcuL2NvbmZpZydcblxuY29uc3Qgc2V2ZXJpdHlUb0RpYWdub3N0aWNUeXBlID0ge1xuICBpbmZvOiAnSW5mbycsXG4gIGVycm9yOiAnRXJyb3InLFxuICB3YXJuaW5nOiAnV2FybmluZycsXG59IGFzIGNvbnN0XG5cbmNsYXNzIEhMU0xhbmd1YWdlQ2xpZW50IGV4dGVuZHMgQXV0b0xhbmd1YWdlQ2xpZW50IHtcbiAgcHJpdmF0ZSB1cGk/OiBVUEkuSVVQSUluc3RhbmNlXG4gIHByaXZhdGUgcmVuZGVyZXIgPSB7XG4gICAgcmVuZGVyOiBudWxsIGFzXG4gICAgICB8IG51bGxcbiAgICAgIHwgKChzb3VyY2U6IHN0cmluZywgdGV4dDogc3RyaW5nLCBjb25maWc6IG9iamVjdCkgPT4gUHJvbWlzZTxzdHJpbmc+KSxcbiAgfVxuICBwcml2YXRlIGRpc3Bvc2FibGVzID0gbmV3IENvbXBvc2l0ZURpc3Bvc2FibGUoKVxuICBwcml2YXRlIGxpbnRlckFkYXB0ZXI/OiBMaW50ZXJBZGFwdGVyXG4gIHB1YmxpYyBjb25maWcgPSBjb25maWdcblxuICBhY3RpdmF0ZSgpIHtcbiAgICBzdXBlci5hY3RpdmF0ZSgpXG4gICAgdGhpcy5kaXNwb3NhYmxlcy5hZGQoXG4gICAgICBhdG9tLmNvbW1hbmRzLmFkZCgnYXRvbS13b3Jrc3BhY2UnLCB7XG4gICAgICAgICdpZGUtaGFza2VsbC1obHM6cmVzdGFydC1hbGwtc2V2ZXJzJzogKCkgPT4ge1xuICAgICAgICAgIHRoaXMubGludGVyQWRhcHRlcj8uY2xlYXJNZXNzYWdlcygpXG4gICAgICAgICAgdGhpcy5yZXN0YXJ0QWxsU2VydmVycygpLmNhdGNoKChlKSA9PiB7XG4gICAgICAgICAgICBhdG9tLm5vdGlmaWNhdGlvbnMuYWRkRXJyb3IoZSlcbiAgICAgICAgICB9KVxuICAgICAgICB9LFxuICAgICAgICAnaWRlLWhhc2tlbGwtaGxzOmNsZWFyLW1lc3NhZ2VzJzogKCkgPT4ge1xuICAgICAgICAgIHRoaXMubGludGVyQWRhcHRlcj8uY2xlYXJNZXNzYWdlcygpXG4gICAgICAgIH0sXG4gICAgICB9KSxcbiAgICApXG4gIH1cblxuICBhc3luYyBkZWFjdGl2YXRlKCkge1xuICAgIHRoaXMuZGlzcG9zYWJsZXMuZGlzcG9zZSgpXG4gICAgc3VwZXIuZGVhY3RpdmF0ZSgpXG4gIH1cblxuICBnZXRHcmFtbWFyU2NvcGVzKCkge1xuICAgIHJldHVybiBbJ3NvdXJjZS5oYXNrZWxsJ11cbiAgfVxuICBnZXRMYW5ndWFnZU5hbWUoKSB7XG4gICAgcmV0dXJuICdIYXNrZWxsJ1xuICB9XG4gIGdldFNlcnZlck5hbWUoKSB7XG4gICAgcmV0dXJuICdoYXNrZWxsLWxhbmd1YWdlLXNlcnZlcidcbiAgfVxuICBnZXRSb290Q29uZmlndXJhdGlvbktleSgpIHtcbiAgICByZXR1cm4gJ2lkZS1oYXNrZWxsLWhscydcbiAgfVxuXG4gIHN0YXJ0U2VydmVyUHJvY2Vzcyhwcm9qZWN0UGF0aDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHN1cGVyLnNwYXduKCdoYXNrZWxsLWxhbmd1YWdlLXNlcnZlci13cmFwcGVyJywgWyctLWxzcCddLCB7XG4gICAgICBjd2Q6IHByb2plY3RQYXRoLFxuICAgIH0pXG4gIH1cblxuICBjb25zdW1lTWFya2Rvd25SZW5kZXJlcihyZW5kZXJlcjogTWFya2Rvd25TZXJ2aWNlKSB7XG4gICAgdGhpcy5yZW5kZXJlci5yZW5kZXIgPSByZW5kZXJlci5yZW5kZXIgYXMgYW55XG4gIH1cblxuICBjb25zdW1lVVBJKHNlcnZpY2U6IFVQSS5JVVBJUmVnaXN0cmF0aW9uKSB7XG4gICAgY29uc3QgZ2V0UmVsZXZhbnRNZXNzYWdlcyA9IChlZGl0b3I6IFRleHRFZGl0b3IsIHJhbmdlOiBSYW5nZSkgPT4ge1xuICAgICAgaWYgKCF0aGlzLmxpbnRlckFkYXB0ZXIpIHJldHVybiBbXVxuICAgICAgY29uc3QgbWVzc2FnZXMgPSB0aGlzLmxpbnRlckFkYXB0ZXIuZ2V0TWVzc2FnZXMoKVxuICAgICAgY29uc3QgcGF0aCA9IGVkaXRvci5nZXRQYXRoKClcbiAgICAgIHJldHVybiBtZXNzYWdlc1xuICAgICAgICAuZmlsdGVyKFxuICAgICAgICAgICh4KSA9PlxuICAgICAgICAgICAgeC5sb2NhdGlvbi5maWxlID09PSBwYXRoICYmXG4gICAgICAgICAgICByYW5nZS5pbnRlcnNlY3RzV2l0aCh4LmxvY2F0aW9uLnBvc2l0aW9uKSxcbiAgICAgICAgKVxuICAgICAgICAubWFwKCh4KSA9PiAoe1xuICAgICAgICAgIGZpbGVQYXRoOiB4LmxvY2F0aW9uLmZpbGUsXG4gICAgICAgICAgcHJvdmlkZXJOYW1lOiB4LmxpbnRlck5hbWUgPz8gJ2hscycsXG4gICAgICAgICAgcmFuZ2U6IHgubG9jYXRpb24ucG9zaXRpb24sXG4gICAgICAgICAgdGV4dDogeC5leGNlcnB0LFxuICAgICAgICAgIHR5cGU6IHNldmVyaXR5VG9EaWFnbm9zdGljVHlwZVt4LnNldmVyaXR5XSxcbiAgICAgICAgfSkpXG4gICAgfVxuICAgIHRoaXMudXBpID0gc2VydmljZSh7XG4gICAgICBuYW1lOiAnaGxzJyxcbiAgICAgIGFjdGlvbnM6IHtcbiAgICAgICAgcHJpb3JpdHk6IDUwLFxuICAgICAgICBldmVudFR5cGVzOiBbXG4gICAgICAgICAgVVBJLlRFdmVudFJhbmdlVHlwZS5jb250ZXh0LFxuICAgICAgICAgIFVQSS5URXZlbnRSYW5nZVR5cGUua2V5Ym9hcmQsXG4gICAgICAgICAgVVBJLlRFdmVudFJhbmdlVHlwZS5tb3VzZSxcbiAgICAgICAgICBVUEkuVEV2ZW50UmFuZ2VUeXBlLnNlbGVjdGlvbixcbiAgICAgICAgXSxcbiAgICAgICAgaGFuZGxlcjogYXN5bmMgKGVkaXRvciwgcmFuZ2UsIHR5cGUpID0+IHtcbiAgICAgICAgICBjb25zdCBtc2dzID0gZ2V0UmVsZXZhbnRNZXNzYWdlcyhlZGl0b3IsIHJhbmdlKVxuICAgICAgICAgIGlmICh0eXBlID09PSBVUEkuVEV2ZW50UmFuZ2VUeXBlLmtleWJvYXJkICYmICFtc2dzLmxlbmd0aClcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWRcbiAgICAgICAgICBjb25zdCBhY3RzID0gYXdhaXQgdGhpcy5nZXRDb2RlQWN0aW9ucyhlZGl0b3IsIHJhbmdlLCBtc2dzKVxuICAgICAgICAgIGlmICghYWN0cykgcmV0dXJuIHVuZGVmaW5lZFxuICAgICAgICAgIHJldHVybiBQcm9taXNlLmFsbChcbiAgICAgICAgICAgIGFjdHMubWFwKGFzeW5jICh4KSA9PiAoe1xuICAgICAgICAgICAgICB0aXRsZTogYXdhaXQgeC5nZXRUaXRsZSgpLFxuICAgICAgICAgICAgICBhcHBseTogKCkgPT4geC5hcHBseSgpLFxuICAgICAgICAgICAgfSkpLFxuICAgICAgICAgIClcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSlcbiAgICBjb25zdCBsYSA9IG5ldyBMaW50ZXJBZGFwdGVyKHRoaXMudXBpKVxuICAgIHRoaXMubGludGVyQWRhcHRlciA9IHRoaXMubGludGVyQWRhcHRlclxuICAgIHRoaXMuY29uc3VtZUxpbnRlclYyKCgpID0+IGxhKVxuICAgIHRoaXMuY29uc3VtZURhdGF0aXAoZGF0YXRpcEFkYXB0ZXIoc2VydmljZSwgdGhpcy51cGksIHRoaXMucmVuZGVyZXIpKVxuICAgIHJldHVybiB0aGlzLnVwaVxuICB9XG4gIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8gb3ZlcnJpZGVzIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgYXN5bmMgZ2V0RGF0YXRpcChlZGl0b3I6IFRleHRFZGl0b3IsIHBvaW50OiBQb2ludCkge1xuICAgIC8vIEhMUyBsaWtlcyB0byByZXR1cm4gZW1wdHkgZGF0YXRpcHM7IHRoaXMgdHJpZXMgdG8gZmlsdGVyIHRob3NlIG91dFxuICAgIGNvbnN0IGRhdGF0aXAgPSBhd2FpdCBzdXBlci5nZXREYXRhdGlwKGVkaXRvciwgcG9pbnQpXG4gICAgaWYgKGRhdGF0aXApIHtcbiAgICAgIGlmICgnY29tcG9uZW50JyBpbiBkYXRhdGlwKSB7XG4gICAgICAgIHJldHVybiBkYXRhdGlwXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkYXRhdGlwLm1hcmtlZFN0cmluZ3MgPSBkYXRhdGlwLm1hcmtlZFN0cmluZ3MuZmlsdGVyKCh4KSA9PiB4LnZhbHVlKVxuICAgICAgICBpZiAoZGF0YXRpcC5tYXJrZWRTdHJpbmdzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICByZXR1cm4gZGF0YXRpcFxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsXG4gIH1cbn1cblxuZXhwb3J0ID0gbmV3IEhMU0xhbmd1YWdlQ2xpZW50KClcbiJdfQ==