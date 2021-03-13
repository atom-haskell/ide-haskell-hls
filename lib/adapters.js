"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.datatipAdapter = exports.linterAdapter = void 0;
const atom_1 = require("atom");
function linterAdapter(upi) {
    return function (config) {
        let messages = [];
        const emitter = new atom_1.Emitter();
        const delegate = {
            name: 'hls',
            clearMessages() {
                messages = [];
                upi.setMessages([]);
                emitter.emit('did-update');
            },
            getMessages() {
                return messages;
            },
            dispose() {
                emitter.emit('did-destroy');
                emitter.dispose();
                upi.dispose();
            },
            onDidDestroy(callback) {
                return emitter.on('did-destroy', callback);
            },
            onDidUpdate(callback) {
                return emitter.on('did-update', callback);
            },
            setAllMessages(msgs) {
                messages = msgs;
                upi.setMessages(messages.map((msg) => ({
                    message: msg.excerpt,
                    position: msg.location.position.start,
                    uri: msg.location.file,
                    severity: msg.severity,
                })));
            },
            setMessages(uri, msgs) {
                messages = messages.filter((x) => x.location.file !== uri).concat(msgs);
                upi.setMessages(messages.map((msg) => ({
                    message: { highlighter: 'hint.message.haskell', text: msg.excerpt },
                    position: msg.location.position.start,
                    uri: msg.location.file,
                    severity: msg.severity,
                })));
            },
        };
        return delegate;
    };
}
exports.linterAdapter = linterAdapter;
function datatipAdapter(register, upi, renderer) {
    async function renderMarkedString(str) {
        if (renderer.render) {
            return { html: await renderer.render(str.value, 'source.haskell') };
        }
        else {
            return { text: str.value };
        }
    }
    async function renderMarkedStrings(strs) {
        return await Promise.all(strs.map(renderMarkedString));
    }
    return {
        addModifierProvider() {
            return new atom_1.Disposable(() => {
            });
        },
        addProvider(provider) {
            const providerUpi = register({
                name: 'hls',
                tooltip: {
                    priority: provider.priority,
                    eventTypes: ["mouse"],
                    handler: async function (editor, range) {
                        const datatip = await provider.datatip(editor, range.start);
                        if (datatip != undefined && 'markedStrings' in datatip) {
                            return {
                                persistent: datatip.pinnable,
                                range: datatip.range,
                                text: await renderMarkedStrings(datatip.markedStrings),
                            };
                        }
                        return undefined;
                    },
                },
            });
            return providerUpi;
        },
        createPinnedDataTip(tip, editor) {
            if ('markedStrings' in tip) {
                renderMarkedStrings(tip.markedStrings)
                    .then((text) => {
                    upi.showTooltip({
                        editor,
                        tooltip: {
                            persistent: tip.pinnable,
                            range: tip.range,
                            text,
                        },
                    });
                })
                    .catch((e) => {
                    console.error(e);
                    atom.notifications.addError(e.name, {
                        stack: e.stack,
                        detail: e.message,
                    });
                });
            }
            return new atom_1.Disposable(() => {
            });
        },
    };
}
exports.datatipAdapter = datatipAdapter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRhcHRlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvYWRhcHRlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsK0JBQTBDO0FBTTFDLFNBQWdCLGFBQWEsQ0FDM0IsR0FBcUI7SUFFckIsT0FBTyxVQUFVLE1BQXFCO1FBQ3BDLElBQUksUUFBUSxHQUFxQixFQUFFLENBQUE7UUFDbkMsTUFBTSxPQUFPLEdBQUcsSUFBSSxjQUFPLEVBQUUsQ0FBQTtRQUM3QixNQUFNLFFBQVEsR0FBeUI7WUFDckMsSUFBSSxFQUFFLEtBQUs7WUFDWCxhQUFhO2dCQUNYLFFBQVEsR0FBRyxFQUFFLENBQUE7Z0JBQ2IsR0FBRyxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQTtnQkFDbkIsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQTtZQUM1QixDQUFDO1lBQ0QsV0FBVztnQkFDVCxPQUFPLFFBQVEsQ0FBQTtZQUNqQixDQUFDO1lBQ0QsT0FBTztnQkFDTCxPQUFPLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFBO2dCQUMzQixPQUFPLENBQUMsT0FBTyxFQUFFLENBQUE7Z0JBQ2pCLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtZQUNmLENBQUM7WUFDRCxZQUFZLENBQUMsUUFBUTtnQkFDbkIsT0FBTyxPQUFPLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxRQUFRLENBQUMsQ0FBQTtZQUM1QyxDQUFDO1lBQ0QsV0FBVyxDQUFDLFFBQVE7Z0JBQ2xCLE9BQU8sT0FBTyxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsUUFBUSxDQUFDLENBQUE7WUFDM0MsQ0FBQztZQUNELGNBQWMsQ0FBQyxJQUFJO2dCQUNqQixRQUFRLEdBQUcsSUFBSSxDQUFBO2dCQUNmLEdBQUcsQ0FBQyxXQUFXLENBQ2IsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztvQkFDckIsT0FBTyxFQUFF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TUFBTTtZQUM3QixJQUFJLGVBQWUsSUFBSSxHQUFHLEVBQUU7Z0JBQzFCLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUM7cUJBQ25DLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO29CQUNiLEdBQUcsQ0FBQyxXQUFXLENBQUM7d0JBQ2QsTUFBTTt3QkFDTixPQUFPLEVBQUU7NEJBQ1AsVUFBVSxFQUFFLEdBQUcsQ0FBQyxRQUFROzRCQUN4QixLQUFLLEVBQUUsR0FBRyxDQUFDLEtBQUs7NEJBQ2hCLElBQUk7eUJBQ0w7cUJBQ0YsQ0FBQyxDQUFBO2dCQUNKLENBQUMsQ0FBQztxQkFDRCxLQUFLLENBQUMsQ0FBQyxDQUFRLEVBQUUsRUFBRTtvQkFDbEIsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQTtvQkFDaEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRTt3QkFDbEMsS0FBSyxFQUFFLENBQUMsQ0FBQyxLQUFLO3dCQUNkLE1BQU0sRUFBRSxDQUFDLENBQUMsT0FBTztxQkFDbEIsQ0FBQyxDQUFBO2dCQUNKLENBQUMsQ0FBQyxDQUFBO2FBQ0w7WUFDRCxPQUFPLElBQUksaUJBQVUsQ0FBQyxHQUFHLEVBQUU7WUFFM0IsQ0FBQyxDQUFDLENBQUE7UUFDSixDQUFDO0tBQ0YsQ0FBQTtBQUNILENBQUM7QUF6RUQsd0NBeUVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRW1pdHRlciwgRGlzcG9zYWJsZSB9IGZyb20gJ2F0b20nXG5pbXBvcnQgKiBhcyBVUEkgZnJvbSAnYXRvbS1oYXNrZWxsLXVwaSdcbmltcG9ydCB0eXBlICogYXMgQXRvbUlERSBmcm9tICdhdG9tLWlkZS1iYXNlJ1xuaW1wb3J0IHR5cGUgKiBhcyBMaW50ZXIgZnJvbSAnYXRvbS9saW50ZXInXG5pbXBvcnQgdHlwZSB7IE1hcmtkb3duU2VydmljZSB9IGZyb20gJ2F0b20taWRlLWJhc2UnXG5cbmV4cG9ydCBmdW5jdGlvbiBsaW50ZXJBZGFwdGVyKFxuICB1cGk6IFVQSS5JVVBJSW5zdGFuY2UsXG4pOiBQYXJhbWV0ZXJzPExpbnRlci5JbmRpZVByb3ZpZGVyPlswXSB7XG4gIHJldHVybiBmdW5jdGlvbiAoY29uZmlnOiBMaW50ZXIuQ29uZmlnKSB7XG4gICAgbGV0IG1lc3NhZ2VzOiBMaW50ZXIuTWVzc2FnZVtdID0gW11cbiAgICBjb25zdCBlbWl0dGVyID0gbmV3IEVtaXR0ZXIoKVxuICAgIGNvbnN0IGRlbGVnYXRlOiBMaW50ZXIuSW5kaWVEZWxlZ2F0ZSA9IHtcbiAgICAgIG5hbWU6ICdobHMnLFxuICAgICAgY2xlYXJNZXNzYWdlcygpIHtcbiAgICAgICAgbWVzc2FnZXMgPSBbXVxuICAgICAgICB1cGkuc2V0TWVzc2FnZXMoW10pXG4gICAgICAgIGVtaXR0ZXIuZW1pdCgnZGlkLXVwZGF0ZScpXG4gICAgICB9LFxuICAgICAgZ2V0TWVzc2FnZXMoKSB7XG4gICAgICAgIHJldHVybiBtZXNzYWdlc1xuICAgICAgfSxcbiAgICAgIGRpc3Bvc2UoKSB7XG4gICAgICAgIGVtaXR0ZXIuZW1pdCgnZGlkLWRlc3Ryb3knKVxuICAgICAgICBlbWl0dGVyLmRpc3Bvc2UoKVxuICAgICAgICB1cGkuZGlzcG9zZSgpXG4gICAgICB9LFxuICAgICAgb25EaWREZXN0cm95KGNhbGxiYWNrKSB7XG4gICAgICAgIHJldHVybiBlbWl0dGVyLm9uKCdkaWQtZGVzdHJveScsIGNhbGxiYWNrKVxuICAgICAgfSxcbiAgICAgIG9uRGlkVXBkYXRlKGNhbGxiYWNrKSB7XG4gICAgICAgIHJldHVybiBlbWl0dGVyLm9uKCdkaWQtdXBkYXRlJywgY2FsbGJhY2spXG4gICAgICB9LFxuICAgICAgc2V0QWxsTWVzc2FnZXMobXNncykge1xuICAgICAgICBtZXNzYWdlcyA9IG1zZ3NcbiAgICAgICAgdXBpLnNldE1lc3NhZ2VzKFxuICAgICAgICAgIG1lc3NhZ2VzLm1hcCgobXNnKSA9PiAoe1xuICAgICAgICAgICAgbWVzc2FnZTogbXNnLmV4Y2VycHQsXG4gICAgICAgICAgICBwb3NpdGlvbjogbXNnLmxvY2F0aW9uLnBvc2l0aW9uLnN0YXJ0LFxuICAgICAgICAgICAgdXJpOiBtc2cubG9jYXRpb24uZmlsZSxcbiAgICAgICAgICAgIHNldmVyaXR5OiBtc2cuc2V2ZXJpdHksXG4gICAgICAgICAgfSkpLFxuICAgICAgICApXG4gICAgICB9LFxuICAgICAgc2V0TWVzc2FnZXModXJpLCBtc2dzKSB7XG4gICAgICAgIG1lc3NhZ2VzID0gbWVzc2FnZXMuZmlsdGVyKCh4KSA9PiB4LmxvY2F0aW9uLmZpbGUgIT09IHVyaSkuY29uY2F0KG1zZ3MpXG4gICAgICAgIHVwaS5zZXRNZXNzYWdlcyhcbiAgICAgICAgICBtZXNzYWdlcy5tYXAoKG1zZykgPT4gKHtcbiAgICAgICAgICAgIG1lc3NhZ2U6IHsgaGlnaGxpZ2h0ZXI6ICdoaW50Lm1lc3NhZ2UuaGFza2VsbCcsIHRleHQ6IG1zZy5leGNlcnB0IH0sXG4gICAgICAgICAgICBwb3NpdGlvbjogbXNnLmxvY2F0aW9uLnBvc2l0aW9uLnN0YXJ0LFxuICAgICAgICAgICAgdXJpOiBtc2cubG9jYXRpb24uZmlsZSxcbiAgICAgICAgICAgIHNldmVyaXR5OiBtc2cuc2V2ZXJpdHksXG4gICAgICAgICAgfSkpLFxuICAgICAgICApXG4gICAgICB9LFxuICAgIH1cbiAgICByZXR1cm4gZGVsZWdhdGVcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZGF0YXRpcEFkYXB0ZXIoXG4gIHJlZ2lzdGVyOiBVUEkuSVVQSVJlZ2lzdHJhdGlvbixcbiAgdXBpOiBVUEkuSVVQSUluc3RhbmNlLFxuICByZW5kZXJlcjogeyByZW5kZXI6IE1hcmtkb3duU2VydmljZVsncmVuZGVyJ10gfCBudWxsIH0sXG4pOiBBdG9tSURFLkRhdGF0aXBTZXJ2aWNlIHtcbiAgYXN5bmMgZnVuY3Rpb24gcmVuZGVyTWFya2VkU3RyaW5nKHN0cjogQXRvbUlERS5NYXJrZWRTdHJpbmcpIHtcbiAgICBpZiAocmVuZGVyZXIucmVuZGVyKSB7XG4gICAgICByZXR1cm4geyBodG1sOiBhd2FpdCByZW5kZXJlci5yZW5kZXIoc3RyLnZhbHVlLCAnc291cmNlLmhhc2tlbGwnKSB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB7IHRleHQ6IHN0ci52YWx1ZSB9XG4gICAgfVxuICB9XG4gIGFzeW5jIGZ1bmN0aW9uIHJlbmRlck1hcmtlZFN0cmluZ3Moc3RyczogQXRvbUlERS5NYXJrZWRTdHJpbmdbXSkge1xuICAgIHJldHVybiBhd2FpdCBQcm9taXNlLmFsbChzdHJzLm1hcChyZW5kZXJNYXJrZWRTdHJpbmcpKVxuICB9XG4gIHJldHVybiB7XG4gICAgYWRkTW9kaWZpZXJQcm92aWRlcigpIHtcbiAgICAgIC8vIG5vdCBpbXBsZW1lbnRlZFxuICAgICAgcmV0dXJuIG5ldyBEaXNwb3NhYmxlKCgpID0+IHtcbiAgICAgICAgLypub29wKi9cbiAgICAgIH0pXG4gICAgfSxcbiAgICBhZGRQcm92aWRlcihwcm92aWRlcikge1xuICAgICAgY29uc3QgcHJvdmlkZXJVcGkgPSByZWdpc3Rlcih7XG4gICAgICAgIG5hbWU6ICdobHMnLFxuICAgICAgICB0b29sdGlwOiB7XG4gICAgICAgICAgcHJpb3JpdHk6IHByb3ZpZGVyLnByaW9yaXR5LFxuICAgICAgICAgIGV2ZW50VHlwZXM6IFtVUEkuVEV2ZW50UmFuZ2VUeXBlLm1vdXNlXSxcbiAgICAgICAgICBoYW5kbGVyOiBhc3luYyBmdW5jdGlvbiAoXG4gICAgICAgICAgICBlZGl0b3IsXG4gICAgICAgICAgICByYW5nZSxcbiAgICAgICAgICApOiBQcm9taXNlPFVQSS5JVG9vbHRpcERhdGEgfCB1bmRlZmluZWQ+IHtcbiAgICAgICAgICAgIGNvbnN0IGRhdGF0aXAgPSBhd2FpdCBwcm92aWRlci5kYXRhdGlwKGVkaXRvciwgcmFuZ2Uuc3RhcnQpXG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IHRyaXBsZS1lcXVhbHNcbiAgICAgICAgICAgIGlmIChkYXRhdGlwICE9IHVuZGVmaW5lZCAmJiAnbWFya2VkU3RyaW5ncycgaW4gZGF0YXRpcCkge1xuICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHBlcnNpc3RlbnQ6IGRhdGF0aXAucGlubmFibGUsXG4gICAgICAgICAgICAgICAgcmFuZ2U6IGRhdGF0aXAucmFuZ2UsXG4gICAgICAgICAgICAgICAgdGV4dDogYXdhaXQgcmVuZGVyTWFya2VkU3RyaW5ncyhkYXRhdGlwLm1hcmtlZFN0cmluZ3MpLFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0pXG4gICAgICByZXR1cm4gcHJvdmlkZXJVcGlcbiAgICB9LFxuICAgIGNyZWF0ZVBpbm5lZERhdGFUaXAodGlwLCBlZGl0b3IpIHtcbiAgICAgIGlmICgnbWFya2VkU3RyaW5ncycgaW4gdGlwKSB7XG4gICAgICAgIHJlbmRlck1hcmtlZFN0cmluZ3ModGlwLm1hcmtlZFN0cmluZ3MpXG4gICAgICAgICAgLnRoZW4oKHRleHQpID0+IHtcbiAgICAgICAgICAgIHVwaS5zaG93VG9vbHRpcCh7XG4gICAgICAgICAgICAgIGVkaXRvcixcbiAgICAgICAgICAgICAgdG9vbHRpcDoge1xuICAgICAgICAgICAgICAgIHBlcnNpc3RlbnQ6IHRpcC5waW5uYWJsZSxcbiAgICAgICAgICAgICAgICByYW5nZTogdGlwLnJhbmdlLFxuICAgICAgICAgICAgICAgIHRleHQsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKChlOiBFcnJvcikgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlKVxuICAgICAgICAgICAgYXRvbS5ub3RpZmljYXRpb25zLmFkZEVycm9yKGUubmFtZSwge1xuICAgICAgICAgICAgICBzdGFjazogZS5zdGFjayxcbiAgICAgICAgICAgICAgZGV0YWlsOiBlLm1lc3NhZ2UsXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0pXG4gICAgICB9XG4gICAgICByZXR1cm4gbmV3IERpc3Bvc2FibGUoKCkgPT4ge1xuICAgICAgICAvKiBub29wICovXG4gICAgICB9KVxuICAgIH0sXG4gIH1cbn1cbiJdfQ==