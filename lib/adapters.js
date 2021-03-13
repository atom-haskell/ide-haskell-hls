"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.datatipAdapter = exports.linterAdapter = void 0;
const atom_1 = require("atom");
function linterAdapter(upi) {
    return function (config) {
        let messages = [];
        const emitter = new atom_1.Emitter();
        const delegate = {
            name: config.name,
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
function datatipAdapter(register, upi) {
    return {
        addModifierProvider() {
            return new atom_1.Disposable(() => {
            });
        },
        addProvider(provider) {
            const providerUpi = register({
                name: provider.providerName,
                tooltip: {
                    priority: provider.priority,
                    eventTypes: ["mouse"],
                    handler: async function (editor, range) {
                        const datatip = await provider.datatip(editor, range.start);
                        if (datatip != undefined && 'markedStrings' in datatip) {
                            return {
                                persistent: datatip.pinnable,
                                range: datatip.range,
                                text: datatip.markedStrings.map((x) => x.value),
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
                upi
                    .showTooltip({
                    editor,
                    tooltip: {
                        persistent: tip.pinnable,
                        range: tip.range,
                        text: tip.markedStrings.map((x) => x.value),
                    },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRhcHRlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvYWRhcHRlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUEsK0JBQTBDO0FBRzFDLFNBQWdCLGFBQWEsQ0FDM0IsR0FBcUI7SUFFckIsT0FBTyxVQUFVLE1BQXFCO1FBQ3BDLElBQUksUUFBUSxHQUFxQixFQUFFLENBQUE7UUFDbkMsTUFBTSxPQUFPLEdBQUcsSUFBSSxjQUFPLEVBQUUsQ0FBQTtRQUM3QixNQUFNLFFBQVEsR0FBeUI7WUFDckMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJO1lBQ2pCLGFBQWE7Z0JBQ1gsUUFBUSxHQUFHLEVBQUUsQ0FBQTtnQkFDYixHQUFHLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFBO2dCQUNuQixPQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFBO1lBQzVCLENBQUM7WUFDRCxXQUFXO2dCQUNULE9BQU8sUUFBUSxDQUFBO1lBQ2pCLENBQUM7WUFDRCxPQUFPO2dCQUNMLE9BQU8sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUE7Z0JBQzNCLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQTtnQkFDakIsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFBO1lBQ2YsQ0FBQztZQUNELFlBQVksQ0FBQyxRQUFRO2dCQUNuQixPQUFPLE9BQU8sQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLFFBQVEsQ0FBQyxDQUFBO1lBQzVDLENBQUM7WUFDRCxXQUFXLENBQUMsUUFBUTtnQkFDbEIsT0FBTyxPQUFPLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxRQUFRLENBQUMsQ0FBQTtZQUMzQyxDQUFDO1lBQ0QsY0FBYyxDQUFDLElBQUk7Z0JBQ2pCLFFBQVEsR0FBRyxJQUFJLENBQUE7Z0JBQ2YsR0FBRyxDQUFDLFdBQVcsQ0FDYixRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO29CQUNy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QUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFBO29CQUNoQixJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFO3dCQUNsQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLEtBQUs7d0JBQ2QsTUFBTSxFQUFFLENBQUMsQ0FBQyxPQUFPO3FCQUNsQixDQUFDLENBQUE7Z0JBQ0osQ0FBQyxDQUFDLENBQUE7YUFDTDtZQUNELE9BQU8sSUFBSSxpQkFBVSxDQUFDLEdBQUcsRUFBRTtZQUUzQixDQUFDLENBQUMsQ0FBQTtRQUNKLENBQUM7S0FDRixDQUFBO0FBQ0gsQ0FBQztBQTVERCx3Q0E0REMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBBdG9tSURFIGZyb20gJ2F0b20taWRlLWJhc2UnXG5pbXBvcnQgKiBhcyBMaW50ZXIgZnJvbSAnYXRvbS9saW50ZXInXG5pbXBvcnQgeyBFbWl0dGVyLCBEaXNwb3NhYmxlIH0gZnJvbSAnYXRvbSdcbmltcG9ydCAqIGFzIFVQSSBmcm9tICdhdG9tLWhhc2tlbGwtdXBpJ1xuXG5leHBvcnQgZnVuY3Rpb24gbGludGVyQWRhcHRlcihcbiAgdXBpOiBVUEkuSVVQSUluc3RhbmNlLFxuKTogUGFyYW1ldGVyczxMaW50ZXIuSW5kaWVQcm92aWRlcj5bMF0ge1xuICByZXR1cm4gZnVuY3Rpb24gKGNvbmZpZzogTGludGVyLkNvbmZpZykge1xuICAgIGxldCBtZXNzYWdlczogTGludGVyLk1lc3NhZ2VbXSA9IFtdXG4gICAgY29uc3QgZW1pdHRlciA9IG5ldyBFbWl0dGVyKClcbiAgICBjb25zdCBkZWxlZ2F0ZTogTGludGVyLkluZGllRGVsZWdhdGUgPSB7XG4gICAgICBuYW1lOiBjb25maWcubmFtZSxcbiAgICAgIGNsZWFyTWVzc2FnZXMoKSB7XG4gICAgICAgIG1lc3NhZ2VzID0gW11cbiAgICAgICAgdXBpLnNldE1lc3NhZ2VzKFtdKVxuICAgICAgICBlbWl0dGVyLmVtaXQoJ2RpZC11cGRhdGUnKVxuICAgICAgfSxcbiAgICAgIGdldE1lc3NhZ2VzKCkge1xuICAgICAgICByZXR1cm4gbWVzc2FnZXNcbiAgICAgIH0sXG4gICAgICBkaXNwb3NlKCkge1xuICAgICAgICBlbWl0dGVyLmVtaXQoJ2RpZC1kZXN0cm95JylcbiAgICAgICAgZW1pdHRlci5kaXNwb3NlKClcbiAgICAgICAgdXBpLmRpc3Bvc2UoKVxuICAgICAgfSxcbiAgICAgIG9uRGlkRGVzdHJveShjYWxsYmFjaykge1xuICAgICAgICByZXR1cm4gZW1pdHRlci5vbignZGlkLWRlc3Ryb3knLCBjYWxsYmFjaylcbiAgICAgIH0sXG4gICAgICBvbkRpZFVwZGF0ZShjYWxsYmFjaykge1xuICAgICAgICByZXR1cm4gZW1pdHRlci5vbignZGlkLXVwZGF0ZScsIGNhbGxiYWNrKVxuICAgICAgfSxcbiAgICAgIHNldEFsbE1lc3NhZ2VzKG1zZ3MpIHtcbiAgICAgICAgbWVzc2FnZXMgPSBtc2dzXG4gICAgICAgIHVwaS5zZXRNZXNzYWdlcyhcbiAgICAgICAgICBtZXNzYWdlcy5tYXAoKG1zZykgPT4gKHtcbiAgICAgICAgICAgIG1lc3NhZ2U6IG1zZy5leGNlcnB0LFxuICAgICAgICAgICAgcG9zaXRpb246IG1zZy5sb2NhdGlvbi5wb3NpdGlvbi5zdGFydCxcbiAgICAgICAgICAgIHVyaTogbXNnLmxvY2F0aW9uLmZpbGUsXG4gICAgICAgICAgICBzZXZlcml0eTogbXNnLnNldmVyaXR5LFxuICAgICAgICAgIH0pKSxcbiAgICAgICAgKVxuICAgICAgfSxcbiAgICAgIHNldE1lc3NhZ2VzKHVyaSwgbXNncykge1xuICAgICAgICBtZXNzYWdlcyA9IG1lc3NhZ2VzLmZpbHRlcigoeCkgPT4geC5sb2NhdGlvbi5maWxlICE9PSB1cmkpLmNvbmNhdChtc2dzKVxuICAgICAgICB1cGkuc2V0TWVzc2FnZXMoXG4gICAgICAgICAgbWVzc2FnZXMubWFwKChtc2cpID0+ICh7XG4gICAgICAgICAgICBtZXNzYWdlOiB7IGhpZ2hsaWdodGVyOiAnaGludC5tZXNzYWdlLmhhc2tlbGwnLCB0ZXh0OiBtc2cuZXhjZXJwdCB9LFxuICAgICAgICAgICAgcG9zaXRpb246IG1zZy5sb2NhdGlvbi5wb3NpdGlvbi5zdGFydCxcbiAgICAgICAgICAgIHVyaTogbXNnLmxvY2F0aW9uLmZpbGUsXG4gICAgICAgICAgICBzZXZlcml0eTogbXNnLnNldmVyaXR5LFxuICAgICAgICAgIH0pKSxcbiAgICAgICAgKVxuICAgICAgfSxcbiAgICB9XG4gICAgcmV0dXJuIGRlbGVnYXRlXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRhdGF0aXBBZGFwdGVyKFxuICByZWdpc3RlcjogVVBJLklVUElSZWdpc3RyYXRpb24sXG4gIHVwaTogVVBJLklVUElJbnN0YW5jZSxcbik6IEF0b21JREUuRGF0YXRpcFNlcnZpY2Uge1xuICByZXR1cm4ge1xuICAgIGFkZE1vZGlmaWVyUHJvdmlkZXIoKSB7XG4gICAgICAvLyBub3QgaW1wbGVtZW50ZWRcbiAgICAgIHJldHVybiBuZXcgRGlzcG9zYWJsZSgoKSA9PiB7XG4gICAgICAgIC8qbm9vcCovXG4gICAgICB9KVxuICAgIH0sXG4gICAgYWRkUHJvdmlkZXIocHJvdmlkZXIpIHtcbiAgICAgIGNvbnN0IHByb3ZpZGVyVXBpID0gcmVnaXN0ZXIoe1xuICAgICAgICBuYW1lOiBwcm92aWRlci5wcm92aWRlck5hbWUsXG4gICAgICAgIHRvb2x0aXA6IHtcbiAgICAgICAgICBwcmlvcml0eTogcHJvdmlkZXIucHJpb3JpdHksXG4gICAgICAgICAgZXZlbnRUeXBlczogW1VQSS5URXZlbnRSYW5nZVR5cGUubW91c2VdLFxuICAgICAgICAgIGhhbmRsZXI6IGFzeW5jIGZ1bmN0aW9uIChcbiAgICAgICAgICAgIGVkaXRvcixcbiAgICAgICAgICAgIHJhbmdlLFxuICAgICAgICAgICk6IFByb21pc2U8VVBJLklUb29sdGlwRGF0YSB8IHVuZGVmaW5lZD4ge1xuICAgICAgICAgICAgY29uc3QgZGF0YXRpcCA9IGF3YWl0IHByb3ZpZGVyLmRhdGF0aXAoZWRpdG9yLCByYW5nZS5zdGFydClcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogdHJpcGxlLWVxdWFsc1xuICAgICAgICAgICAgaWYgKGRhdGF0aXAgIT0gdW5kZWZpbmVkICYmICdtYXJrZWRTdHJpbmdzJyBpbiBkYXRhdGlwKSB7XG4gICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcGVyc2lzdGVudDogZGF0YXRpcC5waW5uYWJsZSxcbiAgICAgICAgICAgICAgICByYW5nZTogZGF0YXRpcC5yYW5nZSxcbiAgICAgICAgICAgICAgICB0ZXh0OiBkYXRhdGlwLm1hcmtlZFN0cmluZ3MubWFwKCh4KSA9PiB4LnZhbHVlKSxcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9KVxuICAgICAgcmV0dXJuIHByb3ZpZGVyVXBpXG4gICAgfSxcbiAgICBjcmVhdGVQaW5uZWREYXRhVGlwKHRpcCwgZWRpdG9yKSB7XG4gICAgICBpZiAoJ21hcmtlZFN0cmluZ3MnIGluIHRpcCkge1xuICAgICAgICB1cGlcbiAgICAgICAgICAuc2hvd1Rvb2x0aXAoe1xuICAgICAgICAgICAgZWRpdG9yLFxuICAgICAgICAgICAgdG9vbHRpcDoge1xuICAgICAgICAgICAgICBwZXJzaXN0ZW50OiB0aXAucGlubmFibGUsXG4gICAgICAgICAgICAgIHJhbmdlOiB0aXAucmFuZ2UsXG4gICAgICAgICAgICAgIHRleHQ6IHRpcC5tYXJrZWRTdHJpbmdzLm1hcCgoeCkgPT4geC52YWx1ZSksIC8vIFRPRE86IGhpZ2hsaWdodFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5jYXRjaCgoZTogRXJyb3IpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZSlcbiAgICAgICAgICAgIGF0b20ubm90aWZpY2F0aW9ucy5hZGRFcnJvcihlLm5hbWUsIHtcbiAgICAgICAgICAgICAgc3RhY2s6IGUuc3RhY2ssXG4gICAgICAgICAgICAgIGRldGFpbDogZS5tZXNzYWdlLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9KVxuICAgICAgfVxuICAgICAgcmV0dXJuIG5ldyBEaXNwb3NhYmxlKCgpID0+IHtcbiAgICAgICAgLyogbm9vcCAqL1xuICAgICAgfSlcbiAgICB9LFxuICB9XG59XG4iXX0=