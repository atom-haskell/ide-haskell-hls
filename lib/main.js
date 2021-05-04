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
        require('atom-package-deps')
            .install('ide-haskell-hls')
            .catch((e) => atom.notifications.addFatalError(e.toString(), {
            stack: e.stack,
            detail: e.message,
        }));
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
        this.consumeBusySignal({
            dispose: () => {
                var _a;
                (_a = this.upi) === null || _a === void 0 ? void 0 : _a.setStatus({ status: 'ready', detail: '' });
            },
            reportBusy: (title, _options) => {
                var _a;
                (_a = this.upi) === null || _a === void 0 ? void 0 : _a.setStatus({ status: 'progress', detail: title });
                return {
                    setTitle: (title) => {
                        var _a;
                        (_a = this.upi) === null || _a === void 0 ? void 0 : _a.setStatus({ status: 'progress', detail: title });
                    },
                    dispose: () => {
                        var _a;
                        (_a = this.upi) === null || _a === void 0 ? void 0 : _a.setStatus({ status: 'ready', detail: '' });
                    },
                };
            },
            reportBusyWhile: async (title, f, _options) => {
                var _a, _b;
                (_a = this.upi) === null || _a === void 0 ? void 0 : _a.setStatus({ status: 'progress', detail: title });
                const res = await f();
                (_b = this.upi) === null || _b === void 0 ? void 0 : _b.setStatus({ status: 'ready', detail: '' });
                return res;
            },
        });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSw2REFBd0Q7QUFDeEQsK0JBQW9FO0FBRXBFLHlDQUEwRDtBQUUxRCxxQ0FBaUM7QUFFakMsTUFBTSx3QkFBd0IsR0FBRztJQUMvQixJQUFJLEVBQUUsTUFBTTtJQUNaLEtBQUssRUFBRSxPQUFPO0lBQ2QsT0FBTyxFQUFFLFNBQVM7Q0FDVixDQUFBO0FBRVYsTUFBTSxpQkFBa0IsU0FBUSx3Q0FBa0I7SUFBbEQ7O1FBRVUsYUFBUSxHQUFHO1lBQ2pCLE1BQU0sRUFBRSxJQUUrRDtTQUN4RSxDQUFBO1FBQ08sZ0JBQVcsR0FBRyxJQUFJLDBCQUFtQixFQUFFLENBQUE7UUFFeEMsV0FBTSxHQUFHLGVBQU0sQ0FBQTtJQStJeEIsQ0FBQztJQTdJQyxRQUFRO1FBQ04sT0FBTyxDQUFDLG1CQUFtQixDQUFDO2FBQ3pCLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQzthQUMxQixLQUFLLENBQUMsQ0FBQyxDQUFRLEVBQUUsRUFBRSxDQUNsQixJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUU7WUFDN0MsS0FBSyxFQUFFLENBQUMsQ0FBQyxLQUFLO1lBQ2QsTUFBTSxFQUFFLENBQUMsQ0FBQyxPQUFPO1NBQ2xCLENBQUMsQ0FDSCxDQUFBO1FBQ0gsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFBO1FBQ2hCLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUNsQixJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRTtZQUNsQyxvQ0FBb0MsRUFBRSxHQUFHLEVBQUU7O2dCQUN6QyxNQUFBLElBQUksQ0FBQyxhQUFhLDBDQUFFLGFBQWEsRUFBRSxDQUFBO2dCQUNuQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtv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Q0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQTtnQkFDcEUsSUFBSSxPQUFPLENBQUMsYUFBYSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7b0JBQ3BDLE9BQU8sT0FBTyxDQUFBO2lCQUNmO2FBQ0Y7U0FDRjtRQUNELE9BQU8sSUFBSSxDQUFBO0lBQ2IsQ0FBQztDQUNGO0FBRUQsaUJBQVMsSUFBSSxpQkFBaUIsRUFBRSxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXV0b0xhbmd1YWdlQ2xpZW50IH0gZnJvbSAnYXRvbS1sYW5ndWFnZWNsaWVudCdcbmltcG9ydCB7IFRleHRFZGl0b3IsIFBvaW50LCBSYW5nZSwgQ29tcG9zaXRlRGlzcG9zYWJsZSB9IGZyb20gJ2F0b20nXG5pbXBvcnQgKiBhcyBVUEkgZnJvbSAnYXRvbS1oYXNrZWxsLXVwaSdcbmltcG9ydCB7IGRhdGF0aXBBZGFwdGVyLCBMaW50ZXJBZGFwdGVyIH0gZnJvbSAnLi9hZGFwdGVycydcbmltcG9ydCB0eXBlIHsgTWFya2Rvd25TZXJ2aWNlIH0gZnJvbSAnYXRvbS1pZGUtYmFzZSdcbmltcG9ydCB7IGNvbmZpZyB9IGZyb20gJy4vY29uZmlnJ1xuXG5jb25zdCBzZXZlcml0eVRvRGlhZ25vc3RpY1R5cGUgPSB7XG4gIGluZm86ICdJbmZvJyxcbiAgZXJyb3I6ICdFcnJvcicsXG4gIHdhcm5pbmc6ICdXYXJuaW5nJyxcbn0gYXMgY29uc3RcblxuY2xhc3MgSExTTGFuZ3VhZ2VDbGllbnQgZXh0ZW5kcyBBdXRvTGFuZ3VhZ2VDbGllbnQge1xuICBwcml2YXRlIHVwaT86IFVQSS5JVVBJSW5zdGFuY2VcbiAgcHJpdmF0ZSByZW5kZXJlciA9IHtcbiAgICByZW5kZXI6IG51bGwgYXNcbiAgICAgIHwgbnVsbFxuICAgICAgfCAoKHNvdXJjZTogc3RyaW5nLCB0ZXh0OiBzdHJpbmcsIGNvbmZpZzogb2JqZWN0KSA9PiBQcm9taXNlPHN0cmluZz4pLFxuICB9XG4gIHByaXZhdGUgZGlzcG9zYWJsZXMgPSBuZXcgQ29tcG9zaXRlRGlzcG9zYWJsZSgpXG4gIHByaXZhdGUgbGludGVyQWRhcHRlcj86IExpbnRlckFkYXB0ZXJcbiAgcHVibGljIGNvbmZpZyA9IGNvbmZpZ1xuXG4gIGFjdGl2YXRlKCkge1xuICAgIHJlcXVpcmUoJ2F0b20tcGFja2FnZS1kZXBzJylcbiAgICAgIC5pbnN0YWxsKCdpZGUtaGFza2VsbC1obHMnKVxuICAgICAgLmNhdGNoKChlOiBFcnJvcikgPT5cbiAgICAgICAgYXRvbS5ub3RpZmljYXRpb25zLmFkZEZhdGFsRXJyb3IoZS50b1N0cmluZygpLCB7XG4gICAgICAgICAgc3RhY2s6IGUuc3RhY2ssXG4gICAgICAgICAgZGV0YWlsOiBlLm1lc3NhZ2UsXG4gICAgICAgIH0pLFxuICAgICAgKVxuICAgIHN1cGVyLmFjdGl2YXRlKClcbiAgICB0aGlzLmRpc3Bvc2FibGVzLmFkZChcbiAgICAgIGF0b20uY29tbWFuZHMuYWRkKCdhdG9tLXdvcmtzcGFjZScsIHtcbiAgICAgICAgJ2lkZS1oYXNrZWxsLWhsczpyZXN0YXJ0LWFsbC1zZXZlcnMnOiAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5saW50ZXJBZGFwdGVyPy5jbGVhck1lc3NhZ2VzKClcbiAgICAgICAgICB0aGlzLnJlc3RhcnRBbGxTZXJ2ZXJzKCkuY2F0Y2goKGUpID0+IHtcbiAgICAgICAgICAgIGF0b20ubm90aWZpY2F0aW9ucy5hZGRFcnJvcihlKVxuICAgICAgICAgIH0pXG4gICAgICAgIH0sXG4gICAgICAgICdpZGUtaGFza2VsbC1obHM6Y2xlYXItbWVzc2FnZXMnOiAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5saW50ZXJBZGFwdGVyPy5jbGVhck1lc3NhZ2VzKClcbiAgICAgICAgfSxcbiAgICAgIH0pLFxuICAgIClcbiAgfVxuXG4gIGFzeW5jIGRlYWN0aXZhdGUoKSB7XG4gICAgdGhpcy5kaXNwb3NhYmxlcy5kaXNwb3NlKClcbiAgICBzdXBlci5kZWFjdGl2YXRlKClcbiAgfVxuXG4gIGdldEdyYW1tYXJTY29wZXMoKSB7XG4gICAgcmV0dXJuIFsnc291cmNlLmhhc2tlbGwnXVxuICB9XG4gIGdldExhbmd1YWdlTmFtZSgpIHtcbiAgICByZXR1cm4gJ0hhc2tlbGwnXG4gIH1cbiAgZ2V0U2VydmVyTmFtZSgpIHtcbiAgICByZXR1cm4gJ2hhc2tlbGwtbGFuZ3VhZ2Utc2VydmVyJ1xuICB9XG4gIGdldFJvb3RDb25maWd1cmF0aW9uS2V5KCkge1xuICAgIHJldHVybiAnaWRlLWhhc2tlbGwtaGxzJ1xuICB9XG5cbiAgc3RhcnRTZXJ2ZXJQcm9jZXNzKHByb2plY3RQYXRoOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gc3VwZXIuc3Bhd24oJ2hhc2tlbGwtbGFuZ3VhZ2Utc2VydmVyLXdyYXBwZXInLCBbJy0tbHNwJ10sIHtcbiAgICAgIGN3ZDogcHJvamVjdFBhdGgsXG4gICAgfSlcbiAgfVxuXG4gIGNvbnN1bWVNYXJrZG93blJlbmRlcmVyKHJlbmRlcmVyOiBNYXJrZG93blNlcnZpY2UpIHtcbiAgICB0aGlzLnJlbmRlcmVyLnJlbmRlciA9IHJlbmRlcmVyLnJlbmRlciBhcyBhbnlcbiAgfVxuXG4gIGNvbnN1bWVVUEkoc2VydmljZTogVVBJLklVUElSZWdpc3RyYXRpb24pIHtcbiAgICBjb25zdCBnZXRSZWxldmFudE1lc3NhZ2VzID0gKGVkaXRvcjogVGV4dEVkaXRvciwgcmFuZ2U6IFJhbmdlKSA9PiB7XG4gICAgICBpZiAoIXRoaXMubGludGVyQWRhcHRlcikgcmV0dXJuIFtdXG4gICAgICBjb25zdCBtZXNzYWdlcyA9IHRoaXMubGludGVyQWRhcHRlci5nZXRNZXNzYWdlcygpXG4gICAgICBjb25zdCBwYXRoID0gZWRpdG9yLmdldFBhdGgoKVxuICAgICAgcmV0dXJuIG1lc3NhZ2VzXG4gICAgICAgIC5maWx0ZXIoXG4gICAgICAgICAgKHgpID0+XG4gICAgICAgICAgICB4LmxvY2F0aW9uLmZpbGUgPT09IHBhdGggJiZcbiAgICAgICAgICAgIHJhbmdlLmludGVyc2VjdHNXaXRoKHgubG9jYXRpb24ucG9zaXRpb24pLFxuICAgICAgICApXG4gICAgICAgIC5tYXAoKHgpID0+ICh7XG4gICAgICAgICAgZmlsZVBhdGg6IHgubG9jYXRpb24uZmlsZSxcbiAgICAgICAgICBwcm92aWRlck5hbWU6IHgubGludGVyTmFtZSA/PyAnaGxzJyxcbiAgICAgICAgICByYW5nZTogeC5sb2NhdGlvbi5wb3NpdGlvbixcbiAgICAgICAgICB0ZXh0OiB4LmV4Y2VycHQsXG4gICAgICAgICAgdHlwZTogc2V2ZXJpdHlUb0RpYWdub3N0aWNUeXBlW3guc2V2ZXJpdHldLFxuICAgICAgICB9KSlcbiAgICB9XG4gICAgdGhpcy51cGkgPSBzZXJ2aWNlKHtcbiAgICAgIG5hbWU6ICdobHMnLFxuICAgICAgYWN0aW9uczoge1xuICAgICAgICBwcmlvcml0eTogNTAsXG4gICAgICAgIGV2ZW50VHlwZXM6IFtcbiAgICAgICAgICBVUEkuVEV2ZW50UmFuZ2VUeXBlLmNvbnRleHQsXG4gICAgICAgICAgVVBJLlRFdmVudFJhbmdlVHlwZS5rZXlib2FyZCxcbiAgICAgICAgICBVUEkuVEV2ZW50UmFuZ2VUeXBlLm1vdXNlLFxuICAgICAgICAgIFVQSS5URXZlbnRSYW5nZVR5cGUuc2VsZWN0aW9uLFxuICAgICAgICBdLFxuICAgICAgICBoYW5kbGVyOiBhc3luYyAoZWRpdG9yLCByYW5nZSwgdHlwZSkgPT4ge1xuICAgICAgICAgIGNvbnN0IG1zZ3MgPSBnZXRSZWxldmFudE1lc3NhZ2VzKGVkaXRvciwgcmFuZ2UpXG4gICAgICAgICAgaWYgKHR5cGUgPT09IFVQSS5URXZlbnRSYW5nZVR5cGUua2V5Ym9hcmQgJiYgIW1zZ3MubGVuZ3RoKVxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZFxuICAgICAgICAgIGNvbnN0IGFjdHMgPSBhd2FpdCB0aGlzLmdldENvZGVBY3Rpb25zKGVkaXRvciwgcmFuZ2UsIG1zZ3MpXG4gICAgICAgICAgaWYgKCFhY3RzKSByZXR1cm4gdW5kZWZpbmVkXG4gICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFxuICAgICAgICAgICAgYWN0cy5tYXAoYXN5bmMgKHgpID0+ICh7XG4gICAgICAgICAgICAgIHRpdGxlOiBhd2FpdCB4LmdldFRpdGxlKCksXG4gICAgICAgICAgICAgIGFwcGx5OiAoKSA9PiB4LmFwcGx5KCksXG4gICAgICAgICAgICB9KSksXG4gICAgICAgICAgKVxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9KVxuICAgIGNvbnN0IGxhID0gbmV3IExpbnRlckFkYXB0ZXIodGhpcy51cGkpXG4gICAgdGhpcy5saW50ZXJBZGFwdGVyID0gdGhpcy5saW50ZXJBZGFwdGVyXG4gICAgdGhpcy5jb25zdW1lTGludGVyVjIoKCkgPT4gbGEpXG4gICAgdGhpcy5jb25zdW1lRGF0YXRpcChkYXRhdGlwQWRhcHRlcihzZXJ2aWNlLCB0aGlzLnVwaSwgdGhpcy5yZW5kZXJlcikpXG4gICAgdGhpcy5jb25zdW1lQnVzeVNpZ25hbCh7XG4gICAgICBkaXNwb3NlOiAoKSA9PiB7XG4gICAgICAgIHRoaXMudXBpPy5zZXRTdGF0dXMoeyBzdGF0dXM6ICdyZWFkeScsIGRldGFpbDogJycgfSlcbiAgICAgIH0sXG4gICAgICByZXBvcnRCdXN5OiAodGl0bGUsIF9vcHRpb25zPykgPT4ge1xuICAgICAgICB0aGlzLnVwaT8uc2V0U3RhdHVzKHsgc3RhdHVzOiAncHJvZ3Jlc3MnLCBkZXRhaWw6IHRpdGxlIH0pXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgc2V0VGl0bGU6ICh0aXRsZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy51cGk/LnNldFN0YXR1cyh7IHN0YXR1czogJ3Byb2dyZXNzJywgZGV0YWlsOiB0aXRsZSB9KVxuICAgICAgICAgIH0sXG4gICAgICAgICAgZGlzcG9zZTogKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy51cGk/LnNldFN0YXR1cyh7IHN0YXR1czogJ3JlYWR5JywgZGV0YWlsOiAnJyB9KVxuICAgICAgICAgIH0sXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICByZXBvcnRCdXN5V2hpbGU6IGFzeW5jICh0aXRsZSwgZiwgX29wdGlvbnM/KSA9PiB7XG4gICAgICAgIHRoaXMudXBpPy5zZXRTdGF0dXMoeyBzdGF0dXM6ICdwcm9ncmVzcycsIGRldGFpbDogdGl0bGUgfSlcbiAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgZigpXG4gICAgICAgIHRoaXMudXBpPy5zZXRTdGF0dXMoeyBzdGF0dXM6ICdyZWFkeScsIGRldGFpbDogJycgfSlcbiAgICAgICAgcmV0dXJuIHJlc1xuICAgICAgfSxcbiAgICB9KVxuICAgIHJldHVybiB0aGlzLnVwaVxuICB9XG4gIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8gb3ZlcnJpZGVzIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgYXN5bmMgZ2V0RGF0YXRpcChlZGl0b3I6IFRleHRFZGl0b3IsIHBvaW50OiBQb2ludCkge1xuICAgIC8vIEhMUyBsaWtlcyB0byByZXR1cm4gZW1wdHkgZGF0YXRpcHM7IHRoaXMgdHJpZXMgdG8gZmlsdGVyIHRob3NlIG91dFxuICAgIGNvbnN0IGRhdGF0aXAgPSBhd2FpdCBzdXBlci5nZXREYXRhdGlwKGVkaXRvciwgcG9pbnQpXG4gICAgaWYgKGRhdGF0aXApIHtcbiAgICAgIGlmICgnY29tcG9uZW50JyBpbiBkYXRhdGlwKSB7XG4gICAgICAgIHJldHVybiBkYXRhdGlwXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkYXRhdGlwLm1hcmtlZFN0cmluZ3MgPSBkYXRhdGlwLm1hcmtlZFN0cmluZ3MuZmlsdGVyKCh4KSA9PiB4LnZhbHVlKVxuICAgICAgICBpZiAoZGF0YXRpcC5tYXJrZWRTdHJpbmdzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICByZXR1cm4gZGF0YXRpcFxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsXG4gIH1cbn1cblxuZXhwb3J0ID0gbmV3IEhMU0xhbmd1YWdlQ2xpZW50KClcbiJdfQ==