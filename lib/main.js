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
    mapConfigurationObject(obj) {
        return { haskell: obj.haskell };
    }
    startServerProcess(projectPath) {
        return super.spawn(atom.config.get('ide-haskell-hls.binaryPath'), ['--lsp'], {
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
        const la = (this.linterAdapter = new adapters_1.LinterAdapter(this.upi));
        this.consumeLinterV2(() => la);
        this.consumeDatatip(adapters_1.datatipAdapter(service, this.upi, this.renderer));
        this.consumeBusySignal(adapters_1.busyAdapter(this.upi));
        this.disposables.add(this.upi);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSw2REFBd0Q7QUFDeEQsK0JBTWE7QUFFYix5Q0FBdUU7QUFFdkUscUNBQWlDO0FBRWpDLE1BQU0sd0JBQXdCLEdBQUc7SUFDL0IsSUFBSSxFQUFFLE1BQU07SUFDWixLQUFLLEVBQUUsT0FBTztJQUNkLE9BQU8sRUFBRSxTQUFTO0NBQ1YsQ0FBQTtBQUVWLE1BQU0saUJBQWtCLFNBQVEsd0NBQWtCO0lBQWxEOztRQUVVLGFBQVEsR0FBRztZQUNqQixNQUFNLEVBQUUsSUFFK0Q7U0FDeEUsQ0FBQTtRQUNPLGdCQUFXLEdBQUcsSUFBSSwwQkFBbUIsRUFBRSxDQUFBO1FBRXhDLFdBQU0sR0FBRyxlQUFNLENBQUE7SUFpSXhCLENBQUM7SUEvSEMsUUFBUTtRQUNOLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQzthQUN6QixPQUFPLENBQUMsaUJBQWlCLENBQUM7YUFDMUIsS0FBSyxDQUFDLENBQUMsQ0FBUSxFQUFFLEVBQUUsQ0FDbEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO1lBQzdDLEtBQUssRUFBRSxDQUFDLENBQUMsS0FBSztZQUNkLE1BQU0sRUFBRSxDQUFDLENBQUMsT0FBTztTQUNsQixDQUFDLENBQ0gsQ0FBQTtRQUNILEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQTtRQUNoQixJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FDbEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUU7WUFDbEMsb0NBQW9DLEVBQUUsR0FBRyxFQUFFOztnQkFDekMsTUFBQSxJQUFJLENBQUMsYUFBYSwwQ0FBRSxhQUFhLEVBQUUsQ0FBQTtnQkFDbkMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7b0JB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TUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFBO1FBQ3JELElBQUksT0FBTyxFQUFFO1lBQ1gsSUFBSSxXQUFXLElBQUksT0FBTyxFQUFFO2dCQUMxQixPQUFPLE9BQU8sQ0FBQTthQUNmO2lCQUFNO2dCQUNMLE9BQU8sQ0FBQyxhQUFhLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQTtnQkFDcEUsSUFBSSxPQUFPLENBQUMsYUFBYSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7b0JBQ3BDLE9BQU8sT0FBTyxDQUFBO2lCQUNmO2FBQ0Y7U0FDRjtRQUNELE9BQU8sSUFBSSxDQUFBO0lBQ2IsQ0FBQztDQUNGO0FBRUQsaUJBQVMsSUFBSSxpQkFBaUIsRUFBRSxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXV0b0xhbmd1YWdlQ2xpZW50IH0gZnJvbSAnYXRvbS1sYW5ndWFnZWNsaWVudCdcbmltcG9ydCB7XG4gIFRleHRFZGl0b3IsXG4gIFBvaW50LFxuICBSYW5nZSxcbiAgQ29tcG9zaXRlRGlzcG9zYWJsZSxcbiAgQ29uZmlnVmFsdWVzLFxufSBmcm9tICdhdG9tJ1xuaW1wb3J0ICogYXMgVVBJIGZyb20gJ2F0b20taGFza2VsbC11cGknXG5pbXBvcnQgeyBidXN5QWRhcHRlciwgZGF0YXRpcEFkYXB0ZXIsIExpbnRlckFkYXB0ZXIgfSBmcm9tICcuL2FkYXB0ZXJzJ1xuaW1wb3J0IHR5cGUgeyBNYXJrZG93blNlcnZpY2UgfSBmcm9tICdhdG9tLWlkZS1iYXNlJ1xuaW1wb3J0IHsgY29uZmlnIH0gZnJvbSAnLi9jb25maWcnXG5cbmNvbnN0IHNldmVyaXR5VG9EaWFnbm9zdGljVHlwZSA9IHtcbiAgaW5mbzogJ0luZm8nLFxuICBlcnJvcjogJ0Vycm9yJyxcbiAgd2FybmluZzogJ1dhcm5pbmcnLFxufSBhcyBjb25zdFxuXG5jbGFzcyBITFNMYW5ndWFnZUNsaWVudCBleHRlbmRzIEF1dG9MYW5ndWFnZUNsaWVudCB7XG4gIHByaXZhdGUgdXBpPzogVVBJLklVUElJbnN0YW5jZVxuICBwcml2YXRlIHJlbmRlcmVyID0ge1xuICAgIHJlbmRlcjogbnVsbCBhc1xuICAgICAgfCBudWxsXG4gICAgICB8ICgoc291cmNlOiBzdHJpbmcsIHRleHQ6IHN0cmluZywgY29uZmlnOiBvYmplY3QpID0+IFByb21pc2U8c3RyaW5nPiksXG4gIH1cbiAgcHJpdmF0ZSBkaXNwb3NhYmxlcyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKClcbiAgcHJpdmF0ZSBsaW50ZXJBZGFwdGVyPzogTGludGVyQWRhcHRlclxuICBwdWJsaWMgY29uZmlnID0gY29uZmlnXG5cbiAgYWN0aXZhdGUoKSB7XG4gICAgcmVxdWlyZSgnYXRvbS1wYWNrYWdlLWRlcHMnKVxuICAgICAgLmluc3RhbGwoJ2lkZS1oYXNrZWxsLWhscycpXG4gICAgICAuY2F0Y2goKGU6IEVycm9yKSA9PlxuICAgICAgICBhdG9tLm5vdGlmaWNhdGlvbnMuYWRkRmF0YWxFcnJvcihlLnRvU3RyaW5nKCksIHtcbiAgICAgICAgICBzdGFjazogZS5zdGFjayxcbiAgICAgICAgICBkZXRhaWw6IGUubWVzc2FnZSxcbiAgICAgICAgfSksXG4gICAgICApXG4gICAgc3VwZXIuYWN0aXZhdGUoKVxuICAgIHRoaXMuZGlzcG9zYWJsZXMuYWRkKFxuICAgICAgYXRvbS5jb21tYW5kcy5hZGQoJ2F0b20td29ya3NwYWNlJywge1xuICAgICAgICAnaWRlLWhhc2tlbGwtaGxzOnJlc3RhcnQtYWxsLXNldmVycyc6ICgpID0+IHtcbiAgICAgICAgICB0aGlzLmxpbnRlckFkYXB0ZXI/LmNsZWFyTWVzc2FnZXMoKVxuICAgICAgICAgIHRoaXMucmVzdGFydEFsbFNlcnZlcnMoKS5jYXRjaCgoZSkgPT4ge1xuICAgICAgICAgICAgYXRvbS5ub3RpZmljYXRpb25zLmFkZEVycm9yKGUpXG4gICAgICAgICAgfSlcbiAgICAgICAgfSxcbiAgICAgICAgJ2lkZS1oYXNrZWxsLWhsczpjbGVhci1tZXNzYWdlcyc6ICgpID0+IHtcbiAgICAgICAgICB0aGlzLmxpbnRlckFkYXB0ZXI/LmNsZWFyTWVzc2FnZXMoKVxuICAgICAgICB9LFxuICAgICAgfSksXG4gICAgKVxuICB9XG5cbiAgYXN5bmMgZGVhY3RpdmF0ZSgpIHtcbiAgICB0aGlzLmRpc3Bvc2FibGVzLmRpc3Bvc2UoKVxuICAgIHN1cGVyLmRlYWN0aXZhdGUoKVxuICB9XG5cbiAgZ2V0R3JhbW1hclNjb3BlcygpIHtcbiAgICByZXR1cm4gWydzb3VyY2UuaGFza2VsbCddXG4gIH1cbiAgZ2V0TGFuZ3VhZ2VOYW1lKCkge1xuICAgIHJldHVybiAnSGFza2VsbCdcbiAgfVxuICBnZXRTZXJ2ZXJOYW1lKCkge1xuICAgIHJldHVybiAnaGFza2VsbC1sYW5ndWFnZS1zZXJ2ZXInXG4gIH1cbiAgZ2V0Um9vdENvbmZpZ3VyYXRpb25LZXkoKSB7XG4gICAgcmV0dXJuICdpZGUtaGFza2VsbC1obHMnXG4gIH1cbiAgbWFwQ29uZmlndXJhdGlvbk9iamVjdChvYmo6IENvbmZpZ1ZhbHVlc1snaWRlLWhhc2tlbGwtaGxzJ10pIHtcbiAgICByZXR1cm4geyBoYXNrZWxsOiBvYmouaGFza2VsbCB9XG4gIH1cblxuICBzdGFydFNlcnZlclByb2Nlc3MocHJvamVjdFBhdGg6IHN0cmluZykge1xuICAgIHJldHVybiBzdXBlci5zcGF3bihcbiAgICAgIGF0b20uY29uZmlnLmdldCgnaWRlLWhhc2tlbGwtaGxzLmJpbmFyeVBhdGgnKSxcbiAgICAgIFsnLS1sc3AnXSxcbiAgICAgIHtcbiAgICAgICAgY3dkOiBwcm9qZWN0UGF0aCxcbiAgICAgIH0sXG4gICAgKVxuICB9XG5cbiAgY29uc3VtZU1hcmtkb3duUmVuZGVyZXIocmVuZGVyZXI6IE1hcmtkb3duU2VydmljZSkge1xuICAgIHRoaXMucmVuZGVyZXIucmVuZGVyID0gcmVuZGVyZXIucmVuZGVyIGFzIGFueVxuICB9XG5cbiAgY29uc3VtZVVQSShzZXJ2aWNlOiBVUEkuSVVQSVJlZ2lzdHJhdGlvbikge1xuICAgIGNvbnN0IGdldFJlbGV2YW50TWVzc2FnZXMgPSAoZWRpdG9yOiBUZXh0RWRpdG9yLCByYW5nZTogUmFuZ2UpID0+IHtcbiAgICAgIGlmICghdGhpcy5saW50ZXJBZGFwdGVyKSByZXR1cm4gW11cbiAgICAgIGNvbnN0IG1lc3NhZ2VzID0gdGhpcy5saW50ZXJBZGFwdGVyLmdldE1lc3NhZ2VzKClcbiAgICAgIGNvbnN0IHBhdGggPSBlZGl0b3IuZ2V0UGF0aCgpXG4gICAgICByZXR1cm4gbWVzc2FnZXNcbiAgICAgICAgLmZpbHRlcihcbiAgICAgICAgICAoeCkgPT5cbiAgICAgICAgICAgIHgubG9jYXRpb24uZmlsZSA9PT0gcGF0aCAmJlxuICAgICAgICAgICAgcmFuZ2UuaW50ZXJzZWN0c1dpdGgoeC5sb2NhdGlvbi5wb3NpdGlvbiksXG4gICAgICAgIClcbiAgICAgICAgLm1hcCgoeCkgPT4gKHtcbiAgICAgICAgICBmaWxlUGF0aDogeC5sb2NhdGlvbi5maWxlLFxuICAgICAgICAgIHByb3ZpZGVyTmFtZTogeC5saW50ZXJOYW1lID8/ICdobHMnLFxuICAgICAgICAgIHJhbmdlOiB4LmxvY2F0aW9uLnBvc2l0aW9uLFxuICAgICAgICAgIHRleHQ6IHguZXhjZXJwdCxcbiAgICAgICAgICB0eXBlOiBzZXZlcml0eVRvRGlhZ25vc3RpY1R5cGVbeC5zZXZlcml0eV0sXG4gICAgICAgIH0pKVxuICAgIH1cbiAgICB0aGlzLnVwaSA9IHNlcnZpY2Uoe1xuICAgICAgbmFtZTogJ2hscycsXG4gICAgICBhY3Rpb25zOiB7XG4gICAgICAgIHByaW9yaXR5OiA1MCxcbiAgICAgICAgZXZlbnRUeXBlczogW1xuICAgICAgICAgIFVQSS5URXZlbnRSYW5nZVR5cGUuY29udGV4dCxcbiAgICAgICAgICBVUEkuVEV2ZW50UmFuZ2VUeXBlLmtleWJvYXJkLFxuICAgICAgICAgIFVQSS5URXZlbnRSYW5nZVR5cGUubW91c2UsXG4gICAgICAgICAgVVBJLlRFdmVudFJhbmdlVHlwZS5zZWxlY3Rpb24sXG4gICAgICAgIF0sXG4gICAgICAgIGhhbmRsZXI6IGFzeW5jIChlZGl0b3IsIHJhbmdlLCB0eXBlKSA9PiB7XG4gICAgICAgICAgY29uc3QgbXNncyA9IGdldFJlbGV2YW50TWVzc2FnZXMoZWRpdG9yLCByYW5nZSlcbiAgICAgICAgICBpZiAodHlwZSA9PT0gVVBJLlRFdmVudFJhbmdlVHlwZS5rZXlib2FyZCAmJiAhbXNncy5sZW5ndGgpXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkXG4gICAgICAgICAgY29uc3QgYWN0cyA9IGF3YWl0IHRoaXMuZ2V0Q29kZUFjdGlvbnMoZWRpdG9yLCByYW5nZSwgbXNncylcbiAgICAgICAgICBpZiAoIWFjdHMpIHJldHVybiB1bmRlZmluZWRcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoXG4gICAgICAgICAgICBhY3RzLm1hcChhc3luYyAoeCkgPT4gKHtcbiAgICAgICAgICAgICAgdGl0bGU6IGF3YWl0IHguZ2V0VGl0bGUoKSxcbiAgICAgICAgICAgICAgYXBwbHk6ICgpID0+IHguYXBwbHkoKSxcbiAgICAgICAgICAgIH0pKSxcbiAgICAgICAgICApXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0pXG4gICAgY29uc3QgbGEgPSAodGhpcy5saW50ZXJBZGFwdGVyID0gbmV3IExpbnRlckFkYXB0ZXIodGhpcy51cGkpKVxuICAgIHRoaXMuY29uc3VtZUxpbnRlclYyKCgpID0+IGxhKVxuICAgIHRoaXMuY29uc3VtZURhdGF0aXAoZGF0YXRpcEFkYXB0ZXIoc2VydmljZSwgdGhpcy51cGksIHRoaXMucmVuZGVyZXIpKVxuICAgIHRoaXMuY29uc3VtZUJ1c3lTaWduYWwoYnVzeUFkYXB0ZXIodGhpcy51cGkpKVxuICAgIHRoaXMuZGlzcG9zYWJsZXMuYWRkKHRoaXMudXBpKVxuICAgIHJldHVybiB0aGlzLnVwaVxuICB9XG4gIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8gb3ZlcnJpZGVzIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgYXN5bmMgZ2V0RGF0YXRpcChlZGl0b3I6IFRleHRFZGl0b3IsIHBvaW50OiBQb2ludCkge1xuICAgIC8vIEhMUyBsaWtlcyB0byByZXR1cm4gZW1wdHkgZGF0YXRpcHM7IHRoaXMgdHJpZXMgdG8gZmlsdGVyIHRob3NlIG91dFxuICAgIGNvbnN0IGRhdGF0aXAgPSBhd2FpdCBzdXBlci5nZXREYXRhdGlwKGVkaXRvciwgcG9pbnQpXG4gICAgaWYgKGRhdGF0aXApIHtcbiAgICAgIGlmICgnY29tcG9uZW50JyBpbiBkYXRhdGlwKSB7XG4gICAgICAgIHJldHVybiBkYXRhdGlwXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkYXRhdGlwLm1hcmtlZFN0cmluZ3MgPSBkYXRhdGlwLm1hcmtlZFN0cmluZ3MuZmlsdGVyKCh4KSA9PiB4LnZhbHVlKVxuICAgICAgICBpZiAoZGF0YXRpcC5tYXJrZWRTdHJpbmdzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICByZXR1cm4gZGF0YXRpcFxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsXG4gIH1cbn1cblxuZXhwb3J0ID0gbmV3IEhMU0xhbmd1YWdlQ2xpZW50KClcbiJdfQ==