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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSw2REFBd0Q7QUFDeEQsK0JBQW9FO0FBRXBFLHlDQUF1RTtBQUV2RSxxQ0FBaUM7QUFFakMsTUFBTSx3QkFBd0IsR0FBRztJQUMvQixJQUFJLEVBQUUsTUFBTTtJQUNaLEtBQUssRUFBRSxPQUFPO0lBQ2QsT0FBTyxFQUFFLFNBQVM7Q0FDVixDQUFBO0FBRVYsTUFBTSxpQkFBa0IsU0FBUSx3Q0FBa0I7SUFBbEQ7O1FBRVUsYUFBUSxHQUFHO1lBQ2pCLE1BQU0sRUFBRSxJQUUrRDtTQUN4RSxDQUFBO1FBQ08sZ0JBQVcsR0FBRyxJQUFJLDBCQUFtQixFQUFFLENBQUE7UUFFeEMsV0FBTSxHQUFHLGVBQU0sQ0FBQTtJQTBIeEIsQ0FBQztJQXhIQyxRQUFRO1FBQ04sT0FBTyxDQUFDLG1CQUFtQixDQUFDO2FBQ3pCLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQzthQUMxQixLQUFLLENBQUMsQ0FBQyxDQUFRLEVBQUUsRUFBRSxDQUNsQixJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUU7WUFDN0MsS0FBSyxFQUFFLENBQUMsQ0FBQyxLQUFLO1lBQ2QsTUFBTSxFQUFFLENBQUMsQ0FBQyxPQUFPO1NBQ2xCLENBQUMsQ0FDSCxDQUFBO1FBQ0gsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFBO1FBQ2hCLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUNsQixJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRTtZQUNsQyxvQ0FBb0MsRUFBRSxHQUFHLEVBQUU7O2dCQUN6QyxNQUFBLElBQUksQ0FBQyxhQUFhLDBDQUFFLGFBQWEsRUFBRSxDQUFBO2dCQUNuQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtvQkFDbkMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUE7Z0JBQ2hDLENBQUMsQ0FBQyxDQUFBO1lBQ0osQ0FBQztZQUNELGdDQUFnQyxFQUFFLEdBQUcsRUFBRTs7Z0JBQ3JDLE1BQUEsSUFBSSxDQUFDLGFBQWEsMENBQUUsYUFBYSxFQUFFLENBQUE7WUFDckMsQ0FBQztTQUNGLENBQUMsQ0FDSCxDQUFBO0lBQ0gsQ0FBQztJQUVELEtBQUssQ0FBQyxVQUFVO1FBQ2QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtRQUMxQixLQUFLLENBQUMsVUFBVSxFQUFFLENBQUE7SUFDcEIsQ0FBQztJQUVELGdCQUFnQjtRQUNkLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBO0lBQzNCLENBQUM7SUFDRCxlQUFlO1FBQ2IsT0FBTyxTQUFTLENBQUE7SUFDbEIsQ0FBQztJQUNELGFBQWE7UUFDWCxPQUFPLHlCQUF5QixDQUFBO0lBQ2xDLENBQUM7SUFDRCx1QkFBdUI7UUFDckIsT0FBTyxpQkFBaUIsQ0FBQTtJQUMxQixDQUFDO0lBRUQsa0JBQWtCLENBQUMsV0FBbUI7UUFDcEMsT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFDLGlDQUFpQyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDL0QsR0FBRyxFQUFFLFdBQVc7U0FDakIsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUVELHVCQUF1QixDQUFDLFFBQXlCO1FBQy9DLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxNQUFhLENBQUE7SUFDL0MsQ0FBQztJQUVELFVBQVUsQ0FBQyxPQUE2QjtRQUN0QyxNQUFNLG1CQUFtQixHQUFHLENBQUMsTUFBa0IsRUFBRSxLQUFZLEVBQUUsRUFBRTtZQUMvRCxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWE7Z0JBQUUsT0FBTyxFQUFFLENBQUE7WUFDbEMsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQTtZQUNqRCxNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUE7WUFDN0IsT0FBTyxRQUFRO2lCQUNaLE1BQU0sQ0FDTCxDQUFDLENBQUMsRUFBRSxFQUFFLENBQ0osQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEtBQUssSUFBSTtnQkFDeEIsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUM1QztpQkFDQSxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTs7Z0JBQUMsT0FBQSxDQUFDO29CQUNYLFFBQVEsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUk7b0JBQ3pCLFlBQVksRUFBRSxNQUFBLENBQUMsQ0FBQyxVQUFVLG1DQUFJLEtBQUs7b0JBQ25DLEtBQUssRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVE7b0JBQzFCLElBQUksRUFBRSxDQUFDLENBQUMsT0FBTztvQkFDZixJQUFJLEVBQUUsd0JBQXdCLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQztpQkFDM0MsQ0FBQyxDQUFBO2FBQUEsQ0FBQyxDQUFBO1FBQ1AsQ0FBQyxDQUFBO1FBQ0QsSUFBSSxDQUFDLEdBQUcsR0FBRyxPQUFPLENBQUM7WUFDakIsSUFBSSxFQUFFLEtBQUs7WUFDWCxPQUFPLEVBQUU7Z0JBQ1AsUUFBUSxFQUFFLEVBQUU7Z0JBQ1osVUFBVSxFQUFFOzs7OztpQkFLWDtnQkFDRCxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEVBQUU7b0JBQ3JDLE1BQU0sSUFBSSxHQUFHLG1CQUFtQixDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQTtvQkFDL0MsSUFBSSxJQUFJLGVBQWlDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTTt3QkFDdkQsT0FBTyxTQUFTLENBQUE7b0JBQ2xCLE1BQU0sSUFBSSxHQUFHLE1BQU0sSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFBO29CQUMzRCxJQUFJLENBQUMsSUFBSTt3QkFBRSxPQUFPLFNBQVMsQ0FBQTtvQkFDM0IsT0FBTyxPQUFPLENBQUMsR0FBRyxDQUNoQixJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7d0JBQ3JCLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQyxRQUFRLEVBQUU7d0JBQ3pCLEtBQUssRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFO3FCQUN2QixDQUFDLENBQUMsQ0FDSixDQUFBO2dCQUNILENBQUM7YUFDRjtTQUNGLENBQUMsQ0FBQTtRQUNGLE1BQU0sRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLHdCQUFhLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7UUFDN0QsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQTtRQUM5QixJQUFJLENBQUMsY0FBYyxDQUFDLHlCQUFjLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUE7UUFDckUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLHNCQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7UUFDN0MsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQzlCLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQTtJQUNqQixDQUFDO0lBRUQsS0FBSyxDQUFDLFVBQVUsQ0FBQyxNQUFrQixFQUFFLEtBQVk7UUFFL0MsTUFBTSxPQUFPLEdBQUcsTUFBTSxLQUFLLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQTtRQUNyRCxJQUFJLE9BQU8sRUFBRTtZQUNYLElBQUksV0FBVyxJQUFJLE9BQU8sRUFBRTtnQkFDMUIsT0FBTyxPQUFPLENBQUE7YUFDZjtpQkFBTTtnQkFDTCxPQUFPLENBQUMsYUFBYSxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUE7Z0JBQ3BFLElBQUksT0FBTyxDQUFDLGFBQWEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO29CQUNwQyxPQUFPLE9BQU8sQ0FBQTtpQkFDZjthQUNGO1NBQ0Y7UUFDRCxPQUFPLElBQUksQ0FBQTtJQUNiLENBQUM7Q0FDRjtBQUVELGlCQUFTLElBQUksaUJBQWlCLEVBQUUsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEF1dG9MYW5ndWFnZUNsaWVudCB9IGZyb20gJ2F0b20tbGFuZ3VhZ2VjbGllbnQnXG5pbXBvcnQgeyBUZXh0RWRpdG9yLCBQb2ludCwgUmFuZ2UsIENvbXBvc2l0ZURpc3Bvc2FibGUgfSBmcm9tICdhdG9tJ1xuaW1wb3J0ICogYXMgVVBJIGZyb20gJ2F0b20taGFza2VsbC11cGknXG5pbXBvcnQgeyBidXN5QWRhcHRlciwgZGF0YXRpcEFkYXB0ZXIsIExpbnRlckFkYXB0ZXIgfSBmcm9tICcuL2FkYXB0ZXJzJ1xuaW1wb3J0IHR5cGUgeyBNYXJrZG93blNlcnZpY2UgfSBmcm9tICdhdG9tLWlkZS1iYXNlJ1xuaW1wb3J0IHsgY29uZmlnIH0gZnJvbSAnLi9jb25maWcnXG5cbmNvbnN0IHNldmVyaXR5VG9EaWFnbm9zdGljVHlwZSA9IHtcbiAgaW5mbzogJ0luZm8nLFxuICBlcnJvcjogJ0Vycm9yJyxcbiAgd2FybmluZzogJ1dhcm5pbmcnLFxufSBhcyBjb25zdFxuXG5jbGFzcyBITFNMYW5ndWFnZUNsaWVudCBleHRlbmRzIEF1dG9MYW5ndWFnZUNsaWVudCB7XG4gIHByaXZhdGUgdXBpPzogVVBJLklVUElJbnN0YW5jZVxuICBwcml2YXRlIHJlbmRlcmVyID0ge1xuICAgIHJlbmRlcjogbnVsbCBhc1xuICAgICAgfCBudWxsXG4gICAgICB8ICgoc291cmNlOiBzdHJpbmcsIHRleHQ6IHN0cmluZywgY29uZmlnOiBvYmplY3QpID0+IFByb21pc2U8c3RyaW5nPiksXG4gIH1cbiAgcHJpdmF0ZSBkaXNwb3NhYmxlcyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKClcbiAgcHJpdmF0ZSBsaW50ZXJBZGFwdGVyPzogTGludGVyQWRhcHRlclxuICBwdWJsaWMgY29uZmlnID0gY29uZmlnXG5cbiAgYWN0aXZhdGUoKSB7XG4gICAgcmVxdWlyZSgnYXRvbS1wYWNrYWdlLWRlcHMnKVxuICAgICAgLmluc3RhbGwoJ2lkZS1oYXNrZWxsLWhscycpXG4gICAgICAuY2F0Y2goKGU6IEVycm9yKSA9PlxuICAgICAgICBhdG9tLm5vdGlmaWNhdGlvbnMuYWRkRmF0YWxFcnJvcihlLnRvU3RyaW5nKCksIHtcbiAgICAgICAgICBzdGFjazogZS5zdGFjayxcbiAgICAgICAgICBkZXRhaWw6IGUubWVzc2FnZSxcbiAgICAgICAgfSksXG4gICAgICApXG4gICAgc3VwZXIuYWN0aXZhdGUoKVxuICAgIHRoaXMuZGlzcG9zYWJsZXMuYWRkKFxuICAgICAgYXRvbS5jb21tYW5kcy5hZGQoJ2F0b20td29ya3NwYWNlJywge1xuICAgICAgICAnaWRlLWhhc2tlbGwtaGxzOnJlc3RhcnQtYWxsLXNldmVycyc6ICgpID0+IHtcbiAgICAgICAgICB0aGlzLmxpbnRlckFkYXB0ZXI/LmNsZWFyTWVzc2FnZXMoKVxuICAgICAgICAgIHRoaXMucmVzdGFydEFsbFNlcnZlcnMoKS5jYXRjaCgoZSkgPT4ge1xuICAgICAgICAgICAgYXRvbS5ub3RpZmljYXRpb25zLmFkZEVycm9yKGUpXG4gICAgICAgICAgfSlcbiAgICAgICAgfSxcbiAgICAgICAgJ2lkZS1oYXNrZWxsLWhsczpjbGVhci1tZXNzYWdlcyc6ICgpID0+IHtcbiAgICAgICAgICB0aGlzLmxpbnRlckFkYXB0ZXI/LmNsZWFyTWVzc2FnZXMoKVxuICAgICAgICB9LFxuICAgICAgfSksXG4gICAgKVxuICB9XG5cbiAgYXN5bmMgZGVhY3RpdmF0ZSgpIHtcbiAgICB0aGlzLmRpc3Bvc2FibGVzLmRpc3Bvc2UoKVxuICAgIHN1cGVyLmRlYWN0aXZhdGUoKVxuICB9XG5cbiAgZ2V0R3JhbW1hclNjb3BlcygpIHtcbiAgICByZXR1cm4gWydzb3VyY2UuaGFza2VsbCddXG4gIH1cbiAgZ2V0TGFuZ3VhZ2VOYW1lKCkge1xuICAgIHJldHVybiAnSGFza2VsbCdcbiAgfVxuICBnZXRTZXJ2ZXJOYW1lKCkge1xuICAgIHJldHVybiAnaGFza2VsbC1sYW5ndWFnZS1zZXJ2ZXInXG4gIH1cbiAgZ2V0Um9vdENvbmZpZ3VyYXRpb25LZXkoKSB7XG4gICAgcmV0dXJuICdpZGUtaGFza2VsbC1obHMnXG4gIH1cblxuICBzdGFydFNlcnZlclByb2Nlc3MocHJvamVjdFBhdGg6IHN0cmluZykge1xuICAgIHJldHVybiBzdXBlci5zcGF3bignaGFza2VsbC1sYW5ndWFnZS1zZXJ2ZXItd3JhcHBlcicsIFsnLS1sc3AnXSwge1xuICAgICAgY3dkOiBwcm9qZWN0UGF0aCxcbiAgICB9KVxuICB9XG5cbiAgY29uc3VtZU1hcmtkb3duUmVuZGVyZXIocmVuZGVyZXI6IE1hcmtkb3duU2VydmljZSkge1xuICAgIHRoaXMucmVuZGVyZXIucmVuZGVyID0gcmVuZGVyZXIucmVuZGVyIGFzIGFueVxuICB9XG5cbiAgY29uc3VtZVVQSShzZXJ2aWNlOiBVUEkuSVVQSVJlZ2lzdHJhdGlvbikge1xuICAgIGNvbnN0IGdldFJlbGV2YW50TWVzc2FnZXMgPSAoZWRpdG9yOiBUZXh0RWRpdG9yLCByYW5nZTogUmFuZ2UpID0+IHtcbiAgICAgIGlmICghdGhpcy5saW50ZXJBZGFwdGVyKSByZXR1cm4gW11cbiAgICAgIGNvbnN0IG1lc3NhZ2VzID0gdGhpcy5saW50ZXJBZGFwdGVyLmdldE1lc3NhZ2VzKClcbiAgICAgIGNvbnN0IHBhdGggPSBlZGl0b3IuZ2V0UGF0aCgpXG4gICAgICByZXR1cm4gbWVzc2FnZXNcbiAgICAgICAgLmZpbHRlcihcbiAgICAgICAgICAoeCkgPT5cbiAgICAgICAgICAgIHgubG9jYXRpb24uZmlsZSA9PT0gcGF0aCAmJlxuICAgICAgICAgICAgcmFuZ2UuaW50ZXJzZWN0c1dpdGgoeC5sb2NhdGlvbi5wb3NpdGlvbiksXG4gICAgICAgIClcbiAgICAgICAgLm1hcCgoeCkgPT4gKHtcbiAgICAgICAgICBmaWxlUGF0aDogeC5sb2NhdGlvbi5maWxlLFxuICAgICAgICAgIHByb3ZpZGVyTmFtZTogeC5saW50ZXJOYW1lID8/ICdobHMnLFxuICAgICAgICAgIHJhbmdlOiB4LmxvY2F0aW9uLnBvc2l0aW9uLFxuICAgICAgICAgIHRleHQ6IHguZXhjZXJwdCxcbiAgICAgICAgICB0eXBlOiBzZXZlcml0eVRvRGlhZ25vc3RpY1R5cGVbeC5zZXZlcml0eV0sXG4gICAgICAgIH0pKVxuICAgIH1cbiAgICB0aGlzLnVwaSA9IHNlcnZpY2Uoe1xuICAgICAgbmFtZTogJ2hscycsXG4gICAgICBhY3Rpb25zOiB7XG4gICAgICAgIHByaW9yaXR5OiA1MCxcbiAgICAgICAgZXZlbnRUeXBlczogW1xuICAgICAgICAgIFVQSS5URXZlbnRSYW5nZVR5cGUuY29udGV4dCxcbiAgICAgICAgICBVUEkuVEV2ZW50UmFuZ2VUeXBlLmtleWJvYXJkLFxuICAgICAgICAgIFVQSS5URXZlbnRSYW5nZVR5cGUubW91c2UsXG4gICAgICAgICAgVVBJLlRFdmVudFJhbmdlVHlwZS5zZWxlY3Rpb24sXG4gICAgICAgIF0sXG4gICAgICAgIGhhbmRsZXI6IGFzeW5jIChlZGl0b3IsIHJhbmdlLCB0eXBlKSA9PiB7XG4gICAgICAgICAgY29uc3QgbXNncyA9IGdldFJlbGV2YW50TWVzc2FnZXMoZWRpdG9yLCByYW5nZSlcbiAgICAgICAgICBpZiAodHlwZSA9PT0gVVBJLlRFdmVudFJhbmdlVHlwZS5rZXlib2FyZCAmJiAhbXNncy5sZW5ndGgpXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkXG4gICAgICAgICAgY29uc3QgYWN0cyA9IGF3YWl0IHRoaXMuZ2V0Q29kZUFjdGlvbnMoZWRpdG9yLCByYW5nZSwgbXNncylcbiAgICAgICAgICBpZiAoIWFjdHMpIHJldHVybiB1bmRlZmluZWRcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoXG4gICAgICAgICAgICBhY3RzLm1hcChhc3luYyAoeCkgPT4gKHtcbiAgICAgICAgICAgICAgdGl0bGU6IGF3YWl0IHguZ2V0VGl0bGUoKSxcbiAgICAgICAgICAgICAgYXBwbHk6ICgpID0+IHguYXBwbHkoKSxcbiAgICAgICAgICAgIH0pKSxcbiAgICAgICAgICApXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0pXG4gICAgY29uc3QgbGEgPSAodGhpcy5saW50ZXJBZGFwdGVyID0gbmV3IExpbnRlckFkYXB0ZXIodGhpcy51cGkpKVxuICAgIHRoaXMuY29uc3VtZUxpbnRlclYyKCgpID0+IGxhKVxuICAgIHRoaXMuY29uc3VtZURhdGF0aXAoZGF0YXRpcEFkYXB0ZXIoc2VydmljZSwgdGhpcy51cGksIHRoaXMucmVuZGVyZXIpKVxuICAgIHRoaXMuY29uc3VtZUJ1c3lTaWduYWwoYnVzeUFkYXB0ZXIodGhpcy51cGkpKVxuICAgIHRoaXMuZGlzcG9zYWJsZXMuYWRkKHRoaXMudXBpKVxuICAgIHJldHVybiB0aGlzLnVwaVxuICB9XG4gIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8gb3ZlcnJpZGVzIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgYXN5bmMgZ2V0RGF0YXRpcChlZGl0b3I6IFRleHRFZGl0b3IsIHBvaW50OiBQb2ludCkge1xuICAgIC8vIEhMUyBsaWtlcyB0byByZXR1cm4gZW1wdHkgZGF0YXRpcHM7IHRoaXMgdHJpZXMgdG8gZmlsdGVyIHRob3NlIG91dFxuICAgIGNvbnN0IGRhdGF0aXAgPSBhd2FpdCBzdXBlci5nZXREYXRhdGlwKGVkaXRvciwgcG9pbnQpXG4gICAgaWYgKGRhdGF0aXApIHtcbiAgICAgIGlmICgnY29tcG9uZW50JyBpbiBkYXRhdGlwKSB7XG4gICAgICAgIHJldHVybiBkYXRhdGlwXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkYXRhdGlwLm1hcmtlZFN0cmluZ3MgPSBkYXRhdGlwLm1hcmtlZFN0cmluZ3MuZmlsdGVyKCh4KSA9PiB4LnZhbHVlKVxuICAgICAgICBpZiAoZGF0YXRpcC5tYXJrZWRTdHJpbmdzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICByZXR1cm4gZGF0YXRpcFxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsXG4gIH1cbn1cblxuZXhwb3J0ID0gbmV3IEhMU0xhbmd1YWdlQ2xpZW50KClcbiJdfQ==