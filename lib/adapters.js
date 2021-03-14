"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.datatipAdapter = exports.linterAdapter = void 0;
const atom_1 = require("atom");
function linterAdapter(upi, actions) {
    function convertMessages(msg) {
        return {
            message: { highlighter: 'hint.message.haskell', text: msg.excerpt },
            position: msg.location.position.start,
            uri: msg.location.file,
            severity: msg.severity,
            actions: async () => {
                const pane = atom.workspace.paneForURI(msg.location.file);
                const editor = pane === null || pane === void 0 ? void 0 : pane.itemForURI(msg.location.file);
                if (editor && atom.workspace.isTextEditor(editor)) {
                    const acts = await actions.getCodeActions(editor, msg.location.position, [
                        {
                            filePath: msg.location.file,
                            providerName: 'hls',
                            range: msg.location.position,
                            text: msg.excerpt,
                            type: 'Info',
                        },
                    ]);
                    if (!acts)
                        return [];
                    return Promise.all(acts.map(async (a) => ({
                        title: await a.getTitle(),
                        apply: () => a.apply(),
                    })));
                }
                else {
                    return [];
                }
            },
        };
    }
    return function (_config) {
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
                upi.setMessages(messages.map(convertMessages));
            },
            setMessages(uri, msgs) {
                messages = messages.filter((x) => x.location.file !== uri).concat(msgs);
                upi.setMessages(messages.map(convertMessages));
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
                    priority: 100,
                    eventTypes: [
                        "mouse",
                        "selection",
                    ],
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRhcHRlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvYWRhcHRlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsK0JBQTBDO0FBTTFDLFNBQWdCLGFBQWEsQ0FDM0IsR0FBcUIsRUFDckIsT0FBbUM7SUFFbkMsU0FBUyxlQUFlLENBQUMsR0FBbUI7UUFDMUMsT0FBTztZQUNMLE9BQU8sRUFBRSxFQUFFLFdBQVcsRUFBRSxzQkFBc0IsRUFBRSxJQUFJLEVBQUUsR0FBRyxDQUFDLE9BQU8sRUFBRTtZQUNuRSxRQUFRLEVBQUUsR0FBRyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSztZQUNyQyxHQUFHLEVBQUUsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJO1lBQ3RCLFFBQVEsRUFBRSxHQUFHLENBQUMsUUFBUTtZQUN0QixPQUFPLEVBQUUsS0FBSyxJQUFJLEVBQUU7Z0JBQ2xCLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUE7Z0JBQ3pELE1BQU0sTUFBTSxHQUFHLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxVQUFVLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQTtnQkFDbEQsSUFBSSxNQUFNLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLEVBQUU7b0JBQ2pELE1BQU0sSUFBSSxHQUFHLE1BQU0sT0FBTyxDQUFDLGNBQWMsQ0FDdkMsTUFBTSxFQUNOLEdBQUcsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUNyQjt3QkFDRTs0QkFDRSxRQUFRLEVBQUUsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJOzRCQUMzQixZQUFZLEVBQUUsS0FBSzs0QkFDbkIsS0FBSyxFQUFFLEdBQUcsQ0FBQyxRQUFRLENBQUMsUUFBUTs0QkFDNUIsSUFBSSxFQUFFLEdBQUcs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LENBQUMsS0FBSzs0QkFDaEIsSUFBSTt5QkFDTDtxQkFDRixDQUFDLENBQUE7Z0JBQ0osQ0FBQyxDQUFDO3FCQUNELEtBQUssQ0FBQyxDQUFDLENBQVEsRUFBRSxFQUFFO29CQUNsQixPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFBO29CQUNoQixJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFO3dCQUNsQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLEtBQUs7d0JBQ2QsTUFBTSxFQUFFLENBQUMsQ0FBQyxPQUFPO3FCQUNsQixDQUFDLENBQUE7Z0JBQ0osQ0FBQyxDQUFDLENBQUE7YUFDTDtZQUNELE9BQU8sSUFBSSxpQkFBVSxDQUFDLEdBQUcsRUFBRTtZQUUzQixDQUFDLENBQUMsQ0FBQTtRQUNKLENBQUM7S0FDRixDQUFBO0FBQ0gsQ0FBQztBQTVFRCx3Q0E0RUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFbWl0dGVyLCBEaXNwb3NhYmxlIH0gZnJvbSAnYXRvbSdcbmltcG9ydCAqIGFzIFVQSSBmcm9tICdhdG9tLWhhc2tlbGwtdXBpJ1xuaW1wb3J0IHR5cGUgKiBhcyBBdG9tSURFIGZyb20gJ2F0b20taWRlLWJhc2UnXG5pbXBvcnQgdHlwZSAqIGFzIExpbnRlciBmcm9tICdhdG9tL2xpbnRlcidcbmltcG9ydCB0eXBlIHsgTWFya2Rvd25TZXJ2aWNlIH0gZnJvbSAnYXRvbS1pZGUtYmFzZSdcblxuZXhwb3J0IGZ1bmN0aW9uIGxpbnRlckFkYXB0ZXIoXG4gIHVwaTogVVBJLklVUElJbnN0YW5jZSxcbiAgYWN0aW9uczogQXRvbUlERS5Db2RlQWN0aW9uUHJvdmlkZXIsXG4pOiBQYXJhbWV0ZXJzPExpbnRlci5JbmRpZVByb3ZpZGVyPlswXSB7XG4gIGZ1bmN0aW9uIGNvbnZlcnRNZXNzYWdlcyhtc2c6IExpbnRlci5NZXNzYWdlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG1lc3NhZ2U6IHsgaGlnaGxpZ2h0ZXI6ICdoaW50Lm1lc3NhZ2UuaGFza2VsbCcsIHRleHQ6IG1zZy5leGNlcnB0IH0sXG4gICAgICBwb3NpdGlvbjogbXNnLmxvY2F0aW9uLnBvc2l0aW9uLnN0YXJ0LFxuICAgICAgdXJpOiBtc2cubG9jYXRpb24uZmlsZSxcbiAgICAgIHNldmVyaXR5OiBtc2cuc2V2ZXJpdHksXG4gICAgICBhY3Rpb25zOiBhc3luYyAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHBhbmUgPSBhdG9tLndvcmtzcGFjZS5wYW5lRm9yVVJJKG1zZy5sb2NhdGlvbi5maWxlKVxuICAgICAgICBjb25zdCBlZGl0b3IgPSBwYW5lPy5pdGVtRm9yVVJJKG1zZy5sb2NhdGlvbi5maWxlKVxuICAgICAgICBpZiAoZWRpdG9yICYmIGF0b20ud29ya3NwYWNlLmlzVGV4dEVkaXRvcihlZGl0b3IpKSB7XG4gICAgICAgICAgY29uc3QgYWN0cyA9IGF3YWl0IGFjdGlvbnMuZ2V0Q29kZUFjdGlvbnMoXG4gICAgICAgICAgICBlZGl0b3IsXG4gICAgICAgICAgICBtc2cubG9jYXRpb24ucG9zaXRpb24sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmaWxlUGF0aDogbXNnLmxvY2F0aW9uLmZpbGUsXG4gICAgICAgICAgICAgICAgcHJvdmlkZXJOYW1lOiAnaGxzJyxcbiAgICAgICAgICAgICAgICByYW5nZTogbXNnLmxvY2F0aW9uLnBvc2l0aW9uLFxuICAgICAgICAgICAgICAgIHRleHQ6IG1zZy5leGNlcnB0LFxuICAgICAgICAgICAgICAgIHR5cGU6ICdJbmZvJyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgKVxuICAgICAgICAgIGlmICghYWN0cykgcmV0dXJuIFtdXG4gICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFxuICAgICAgICAgICAgYWN0cy5tYXAoYXN5bmMgKGEpID0+ICh7XG4gICAgICAgICAgICAgIHRpdGxlOiBhd2FpdCBhLmdldFRpdGxlKCksXG4gICAgICAgICAgICAgIGFwcGx5OiAoKSA9PiBhLmFwcGx5KCksXG4gICAgICAgICAgICB9KSksXG4gICAgICAgICAgKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBbXVxuICAgICAgICB9XG4gICAgICB9LFxuICAgIH1cbiAgfVxuICByZXR1cm4gZnVuY3Rpb24gKF9jb25maWc6IExpbnRlci5Db25maWcpIHtcbiAgICBsZXQgbWVzc2FnZXM6IExpbnRlci5NZXNzYWdlW10gPSBbXVxuICAgIGNvbnN0IGVtaXR0ZXIgPSBuZXcgRW1pdHRlcigpXG4gICAgY29uc3QgZGVsZWdhdGU6IExpbnRlci5JbmRpZURlbGVnYXRlID0ge1xuICAgICAgbmFtZTogJ2hscycsXG4gICAgICBjbGVhck1lc3NhZ2VzKCkge1xuICAgICAgICBtZXNzYWdlcyA9IFtdXG4gICAgICAgIHVwaS5zZXRNZXNzYWdlcyhbXSlcbiAgICAgICAgZW1pdHRlci5lbWl0KCdkaWQtdXBkYXRlJylcbiAgICAgIH0sXG4gICAgICBnZXRNZXNzYWdlcygpIHtcbiAgICAgICAgcmV0dXJuIG1lc3NhZ2VzXG4gICAgICB9LFxuICAgICAgZGlzcG9zZSgpIHtcbiAgICAgICAgZW1pdHRlci5lbWl0KCdkaWQtZGVzdHJveScpXG4gICAgICAgIGVtaXR0ZXIuZGlzcG9zZSgpXG4gICAgICAgIHVwaS5kaXNwb3NlKClcbiAgICAgIH0sXG4gICAgICBvbkRpZERlc3Ryb3koY2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIGVtaXR0ZXIub24oJ2RpZC1kZXN0cm95JywgY2FsbGJhY2spXG4gICAgICB9LFxuICAgICAgb25EaWRVcGRhdGUoY2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIGVtaXR0ZXIub24oJ2RpZC11cGRhdGUnLCBjYWxsYmFjaylcbiAgICAgIH0sXG4gICAgICBzZXRBbGxNZXNzYWdlcyhtc2dzKSB7XG4gICAgICAgIG1lc3NhZ2VzID0gbXNnc1xuICAgICAgICB1cGkuc2V0TWVzc2FnZXMobWVzc2FnZXMubWFwKGNvbnZlcnRNZXNzYWdlcykpXG4gICAgICB9LFxuICAgICAgc2V0TWVzc2FnZXModXJpLCBtc2dzKSB7XG4gICAgICAgIG1lc3NhZ2VzID0gbWVzc2FnZXMuZmlsdGVyKCh4KSA9PiB4LmxvY2F0aW9uLmZpbGUgIT09IHVyaSkuY29uY2F0KG1zZ3MpXG4gICAgICAgIHVwaS5zZXRNZXNzYWdlcyhtZXNzYWdlcy5tYXAoY29udmVydE1lc3NhZ2VzKSlcbiAgICAgIH0sXG4gICAgfVxuICAgIHJldHVybiBkZWxlZ2F0ZVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkYXRhdGlwQWRhcHRlcihcbiAgcmVnaXN0ZXI6IFVQSS5JVVBJUmVnaXN0cmF0aW9uLFxuICB1cGk6IFVQSS5JVVBJSW5zdGFuY2UsXG4gIHJlbmRlcmVyOiB7IHJlbmRlcjogTWFya2Rvd25TZXJ2aWNlWydyZW5kZXInXSB8IG51bGwgfSxcbik6IEF0b21JREUuRGF0YXRpcFNlcnZpY2Uge1xuICBhc3luYyBmdW5jdGlvbiByZW5kZXJNYXJrZWRTdHJpbmcoc3RyOiBBdG9tSURFLk1hcmtlZFN0cmluZykge1xuICAgIGlmIChyZW5kZXJlci5yZW5kZXIpIHtcbiAgICAgIHJldHVybiB7IGh0bWw6IGF3YWl0IHJlbmRlcmVyLnJlbmRlcihzdHIudmFsdWUsICdzb3VyY2UuaGFza2VsbCcpIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHsgdGV4dDogc3RyLnZhbHVlIH1cbiAgICB9XG4gIH1cbiAgYXN5bmMgZnVuY3Rpb24gcmVuZGVyTWFya2VkU3RyaW5ncyhzdHJzOiBBdG9tSURFLk1hcmtlZFN0cmluZ1tdKSB7XG4gICAgcmV0dXJuIGF3YWl0IFByb21pc2UuYWxsKHN0cnMubWFwKHJlbmRlck1hcmtlZFN0cmluZykpXG4gIH1cbiAgcmV0dXJuIHtcbiAgICBhZGRNb2RpZmllclByb3ZpZGVyKCkge1xuICAgICAgLy8gbm90IGltcGxlbWVudGVkXG4gICAgICByZXR1cm4gbmV3IERpc3Bvc2FibGUoKCkgPT4ge1xuICAgICAgICAvKm5vb3AqL1xuICAgICAgfSlcbiAgICB9LFxuICAgIGFkZFByb3ZpZGVyKHByb3ZpZGVyKSB7XG4gICAgICBjb25zdCBwcm92aWRlclVwaSA9IHJlZ2lzdGVyKHtcbiAgICAgICAgbmFtZTogJ2hscycsXG4gICAgICAgIHRvb2x0aXA6IHtcbiAgICAgICAgICBwcmlvcml0eTogMTAwLFxuICAgICAgICAgIGV2ZW50VHlwZXM6IFtcbiAgICAgICAgICAgIFVQSS5URXZlbnRSYW5nZVR5cGUubW91c2UsXG4gICAgICAgICAgICBVUEkuVEV2ZW50UmFuZ2VUeXBlLnNlbGVjdGlvbixcbiAgICAgICAgICBdLFxuICAgICAgICAgIGhhbmRsZXI6IGFzeW5jIGZ1bmN0aW9uIChcbiAgICAgICAgICAgIGVkaXRvcixcbiAgICAgICAgICAgIHJhbmdlLFxuICAgICAgICAgICk6IFByb21pc2U8VVBJLklUb29sdGlwRGF0YSB8IHVuZGVmaW5lZD4ge1xuICAgICAgICAgICAgY29uc3QgZGF0YXRpcCA9IGF3YWl0IHByb3ZpZGVyLmRhdGF0aXAoZWRpdG9yLCByYW5nZS5zdGFydClcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogdHJpcGxlLWVxdWFsc1xuICAgICAgICAgICAgaWYgKGRhdGF0aXAgIT0gdW5kZWZpbmVkICYmICdtYXJrZWRTdHJpbmdzJyBpbiBkYXRhdGlwKSB7XG4gICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcGVyc2lzdGVudDogZGF0YXRpcC5waW5uYWJsZSxcbiAgICAgICAgICAgICAgICByYW5nZTogZGF0YXRpcC5yYW5nZSxcbiAgICAgICAgICAgICAgICB0ZXh0OiBhd2FpdCByZW5kZXJNYXJrZWRTdHJpbmdzKGRhdGF0aXAubWFya2VkU3RyaW5ncyksXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWRcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSlcbiAgICAgIHJldHVybiBwcm92aWRlclVwaVxuICAgIH0sXG4gICAgY3JlYXRlUGlubmVkRGF0YVRpcCh0aXAsIGVkaXRvcikge1xuICAgICAgaWYgKCdtYXJrZWRTdHJpbmdzJyBpbiB0aXApIHtcbiAgICAgICAgcmVuZGVyTWFya2VkU3RyaW5ncyh0aXAubWFya2VkU3RyaW5ncylcbiAgICAgICAgICAudGhlbigodGV4dCkgPT4ge1xuICAgICAgICAgICAgdXBpLnNob3dUb29sdGlwKHtcbiAgICAgICAgICAgICAgZWRpdG9yLFxuICAgICAgICAgICAgICB0b29sdGlwOiB7XG4gICAgICAgICAgICAgICAgcGVyc2lzdGVudDogdGlwLnBpbm5hYmxlLFxuICAgICAgICAgICAgICAgIHJhbmdlOiB0aXAucmFuZ2UsXG4gICAgICAgICAgICAgICAgdGV4dCxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2F0Y2goKGU6IEVycm9yKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGUpXG4gICAgICAgICAgICBhdG9tLm5vdGlmaWNhdGlvbnMuYWRkRXJyb3IoZS5uYW1lLCB7XG4gICAgICAgICAgICAgIHN0YWNrOiBlLnN0YWNrLFxuICAgICAgICAgICAgICBkZXRhaWw6IGUubWVzc2FnZSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSlcbiAgICAgIH1cbiAgICAgIHJldHVybiBuZXcgRGlzcG9zYWJsZSgoKSA9PiB7XG4gICAgICAgIC8qIG5vb3AgKi9cbiAgICAgIH0pXG4gICAgfSxcbiAgfVxufVxuIl19