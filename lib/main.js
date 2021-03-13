"use strict";
const atom_languageclient_1 = require("atom-languageclient");
const atom_1 = require("atom");
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
    consumeUPI(service) {
        this.upi = service({
            name: 'hls',
        });
        this.consumeLinterV2(linterAdapter(this.upi));
        this.consumeDatatip(datatipAdapter(service, this.upi));
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
module.exports = new HLSLanguageClient();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSw2REFBd0Q7QUFLeEQsK0JBQTBDO0FBRTFDLE1BQU0saUJBQWtCLFNBQVEsd0NBQWtCO0lBRWhELGdCQUFnQjtRQUNkLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBO0lBQzNCLENBQUM7SUFDRCxlQUFlO1FBQ2IsT0FBTyxTQUFTLENBQUE7SUFDbEIsQ0FBQztJQUNELGFBQWE7UUFDWCxPQUFPLHlCQUF5QixDQUFBO0lBQ2xDLENBQUM7SUFFRCxrQkFBa0IsQ0FBQyxXQUFnQjtRQUNqQyxPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUMsaUNBQWlDLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUMvRCxHQUFHLEVBQUUsV0FBVztTQUNqQixDQUFDLENBQUE7SUFDSixDQUFDO0lBRUQsVUFBVSxDQUFDLE9BQTZCO1FBQ3RDLElBQUksQ0FBQyxHQUFHLEdBQUcsT0FBTyxDQUFDO1lBQ2pCLElBQUksRUFBRSxLQUFLO1NBQ1osQ0FBQyxDQUFBO1FBQ0YsSUFBSSxDQUFDLGVBQWUsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7UUFDN0MsSUFBSSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO1FBQ3RELE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQTtJQUNqQixDQUFDO0lBRUQsS0FBSyxDQUFDLFVBQVUsQ0FBQyxNQUFrQixFQUFFLEtBQVk7UUFFL0MsTUFBTSxPQUFPLEdBQUcsTUFBTSxLQUFLLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQTtRQUNyRCxJQUFJLE9BQU8sRUFBRTtZQUNYLElBQUksV0FBVyxJQUFJLE9BQU8sRUFBRTtnQkFDMUIsT0FBTyxPQUFPLENBQUE7YUFDZjtpQkFBTTtn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LEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO3FCQUM1QztpQkFDRixDQUFDO3FCQUNELEtBQUssQ0FBQyxDQUFDLENBQVEsRUFBRSxFQUFFO29CQUNsQixPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFBO29CQUNoQixJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFO3dCQUNsQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLEtBQUs7d0JBQ2QsTUFBTSxFQUFFLENBQUMsQ0FBQyxPQUFPO3FCQUNsQixDQUFDLENBQUE7Z0JBQ0osQ0FBQyxDQUFDLENBQUE7YUFDTDtZQUNELE9BQU8sSUFBSSxpQkFBVSxDQUFDLEdBQUcsRUFBRTtZQUUzQixDQUFDLENBQUMsQ0FBQTtRQUNKLENBQUM7S0FDRixDQUFBO0FBQ0gsQ0FBQztBQXBIRCxpQkFBUyxJQUFJLGlCQUFpQixFQUFFLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBdXRvTGFuZ3VhZ2VDbGllbnQgfSBmcm9tICdhdG9tLWxhbmd1YWdlY2xpZW50J1xuaW1wb3J0IHsgVGV4dEVkaXRvciwgUG9pbnQgfSBmcm9tICdhdG9tJ1xuaW1wb3J0ICogYXMgVVBJIGZyb20gJ2F0b20taGFza2VsbC11cGknXG5pbXBvcnQgKiBhcyBBdG9tSURFIGZyb20gJ2F0b20taWRlLWJhc2UnXG5pbXBvcnQgKiBhcyBMaW50ZXIgZnJvbSAnYXRvbS9saW50ZXInXG5pbXBvcnQgeyBFbWl0dGVyLCBEaXNwb3NhYmxlIH0gZnJvbSAnYXRvbSdcblxuY2xhc3MgSExTTGFuZ3VhZ2VDbGllbnQgZXh0ZW5kcyBBdXRvTGFuZ3VhZ2VDbGllbnQge1xuICBwcml2YXRlIHVwaT86IFVQSS5JVVBJSW5zdGFuY2VcbiAgZ2V0R3JhbW1hclNjb3BlcygpIHtcbiAgICByZXR1cm4gWydzb3VyY2UuaGFza2VsbCddXG4gIH1cbiAgZ2V0TGFuZ3VhZ2VOYW1lKCkge1xuICAgIHJldHVybiAnSGFza2VsbCdcbiAgfVxuICBnZXRTZXJ2ZXJOYW1lKCkge1xuICAgIHJldHVybiAnaGFza2VsbC1sYW5ndWFnZS1zZXJ2ZXInXG4gIH1cblxuICBzdGFydFNlcnZlclByb2Nlc3MocHJvamVjdFBhdGg6IGFueSkge1xuICAgIHJldHVybiBzdXBlci5zcGF3bignaGFza2VsbC1sYW5ndWFnZS1zZXJ2ZXItd3JhcHBlcicsIFsnLS1sc3AnXSwge1xuICAgICAgY3dkOiBwcm9qZWN0UGF0aCxcbiAgICB9KVxuICB9XG5cbiAgY29uc3VtZVVQSShzZXJ2aWNlOiBVUEkuSVVQSVJlZ2lzdHJhdGlvbikge1xuICAgIHRoaXMudXBpID0gc2VydmljZSh7XG4gICAgICBuYW1lOiAnaGxzJyxcbiAgICB9KVxuICAgIHRoaXMuY29uc3VtZUxpbnRlclYyKGxpbnRlckFkYXB0ZXIodGhpcy51cGkpKVxuICAgIHRoaXMuY29uc3VtZURhdGF0aXAoZGF0YXRpcEFkYXB0ZXIoc2VydmljZSwgdGhpcy51cGkpKVxuICAgIHJldHVybiB0aGlzLnVwaVxuICB9XG4gIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8gb3ZlcnJpZGVzIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgYXN5bmMgZ2V0RGF0YXRpcChlZGl0b3I6IFRleHRFZGl0b3IsIHBvaW50OiBQb2ludCkge1xuICAgIC8vIEhMUyBsaWtlcyB0byByZXR1cm4gZW1wdHkgZGF0YXRpcHM7IHRoaXMgdHJpZXMgdG8gZmlsdGVyIHRob3NlIG91dFxuICAgIGNvbnN0IGRhdGF0aXAgPSBhd2FpdCBzdXBlci5nZXREYXRhdGlwKGVkaXRvciwgcG9pbnQpXG4gICAgaWYgKGRhdGF0aXApIHtcbiAgICAgIGlmICgnY29tcG9uZW50JyBpbiBkYXRhdGlwKSB7XG4gICAgICAgIHJldHVybiBkYXRhdGlwXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkYXRhdGlwLm1hcmtlZFN0cmluZ3MgPSBkYXRhdGlwLm1hcmtlZFN0cmluZ3MuZmlsdGVyKCh4KSA9PiB4LnZhbHVlKVxuICAgICAgICBpZiAoZGF0YXRpcC5tYXJrZWRTdHJpbmdzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICByZXR1cm4gZGF0YXRpcFxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsXG4gIH1cbn1cblxuZXhwb3J0ID0gbmV3IEhMU0xhbmd1YWdlQ2xpZW50KClcblxuZnVuY3Rpb24gbGludGVyQWRhcHRlcihcbiAgdXBpOiBVUEkuSVVQSUluc3RhbmNlLFxuKTogUGFyYW1ldGVyczxMaW50ZXIuSW5kaWVQcm92aWRlcj5bMF0ge1xuICByZXR1cm4gZnVuY3Rpb24gKGNvbmZpZzogTGludGVyLkNvbmZpZykge1xuICAgIGxldCBtZXNzYWdlczogTGludGVyLk1lc3NhZ2VbXSA9IFtdXG4gICAgY29uc3QgZW1pdHRlciA9IG5ldyBFbWl0dGVyKClcbiAgICBjb25zdCBkZWxlZ2F0ZTogTGludGVyLkluZGllRGVsZWdhdGUgPSB7XG4gICAgICBuYW1lOiBjb25maWcubmFtZSxcbiAgICAgIGNsZWFyTWVzc2FnZXMoKSB7XG4gICAgICAgIG1lc3NhZ2VzID0gW11cbiAgICAgICAgdXBpLnNldE1lc3NhZ2VzKFtdKVxuICAgICAgICBlbWl0dGVyLmVtaXQoJ2RpZC11cGRhdGUnKVxuICAgICAgfSxcbiAgICAgIGdldE1lc3NhZ2VzKCkge1xuICAgICAgICByZXR1cm4gbWVzc2FnZXNcbiAgICAgIH0sXG4gICAgICBkaXNwb3NlKCkge1xuICAgICAgICBlbWl0dGVyLmVtaXQoJ2RpZC1kZXN0cm95JylcbiAgICAgICAgZW1pdHRlci5kaXNwb3NlKClcbiAgICAgICAgdXBpLmRpc3Bvc2UoKVxuICAgICAgfSxcbiAgICAgIG9uRGlkRGVzdHJveShjYWxsYmFjaykge1xuICAgICAgICByZXR1cm4gZW1pdHRlci5vbignZGlkLWRlc3Ryb3knLCBjYWxsYmFjaylcbiAgICAgIH0sXG4gICAgICBvbkRpZFVwZGF0ZShjYWxsYmFjaykge1xuICAgICAgICByZXR1cm4gZW1pdHRlci5vbignZGlkLXVwZGF0ZScsIGNhbGxiYWNrKVxuICAgICAgfSxcbiAgICAgIHNldEFsbE1lc3NhZ2VzKG1zZ3MpIHtcbiAgICAgICAgbWVzc2FnZXMgPSBtc2dzXG4gICAgICAgIHVwaS5zZXRNZXNzYWdlcyhcbiAgICAgICAgICBtZXNzYWdlcy5tYXAoKG1zZykgPT4gKHtcbiAgICAgICAgICAgIG1lc3NhZ2U6IG1zZy5leGNlcnB0LFxuICAgICAgICAgICAgcG9zaXRpb246IG1zZy5sb2NhdGlvbi5wb3NpdGlvbi5zdGFydCxcbiAgICAgICAgICAgIHVyaTogbXNnLmxvY2F0aW9uLmZpbGUsXG4gICAgICAgICAgICBzZXZlcml0eTogbXNnLnNldmVyaXR5LFxuICAgICAgICAgIH0pKSxcbiAgICAgICAgKVxuICAgICAgfSxcbiAgICAgIHNldE1lc3NhZ2VzKHVyaSwgbXNncykge1xuICAgICAgICBtZXNzYWdlcyA9IG1lc3NhZ2VzLmZpbHRlcigoeCkgPT4geC5sb2NhdGlvbi5maWxlICE9PSB1cmkpLmNvbmNhdChtc2dzKVxuICAgICAgICB1cGkuc2V0TWVzc2FnZXMoXG4gICAgICAgICAgbWVzc2FnZXMubWFwKChtc2cpID0+ICh7XG4gICAgICAgICAgICBtZXNzYWdlOiB7IGhpZ2hsaWdodGVyOiAnaGludC5tZXNzYWdlLmhhc2tlbGwnLCB0ZXh0OiBtc2cuZXhjZXJwdCB9LFxuICAgICAgICAgICAgcG9zaXRpb246IG1zZy5sb2NhdGlvbi5wb3NpdGlvbi5zdGFydCxcbiAgICAgICAgICAgIHVyaTogbXNnLmxvY2F0aW9uLmZpbGUsXG4gICAgICAgICAgICBzZXZlcml0eTogbXNnLnNldmVyaXR5LFxuICAgICAgICAgIH0pKSxcbiAgICAgICAgKVxuICAgICAgfSxcbiAgICB9XG4gICAgcmV0dXJuIGRlbGVnYXRlXG4gIH1cbn1cblxuZnVuY3Rpb24gZGF0YXRpcEFkYXB0ZXIoXG4gIHJlZ2lzdGVyOiBVUEkuSVVQSVJlZ2lzdHJhdGlvbixcbiAgdXBpOiBVUEkuSVVQSUluc3RhbmNlLFxuKTogQXRvbUlERS5EYXRhdGlwU2VydmljZSB7XG4gIHJldHVybiB7XG4gICAgYWRkTW9kaWZpZXJQcm92aWRlcigpIHtcbiAgICAgIC8vIG5vdCBpbXBsZW1lbnRlZFxuICAgICAgcmV0dXJuIG5ldyBEaXNwb3NhYmxlKCgpID0+IHtcbiAgICAgICAgLypub29wKi9cbiAgICAgIH0pXG4gICAgfSxcbiAgICBhZGRQcm92aWRlcihwcm92aWRlcikge1xuICAgICAgY29uc3QgcHJvdmlkZXJVcGkgPSByZWdpc3Rlcih7XG4gICAgICAgIG5hbWU6IHByb3ZpZGVyLnByb3ZpZGVyTmFtZSxcbiAgICAgICAgdG9vbHRpcDoge1xuICAgICAgICAgIHByaW9yaXR5OiBwcm92aWRlci5wcmlvcml0eSxcbiAgICAgICAgICBldmVudFR5cGVzOiBbVVBJLlRFdmVudFJhbmdlVHlwZS5tb3VzZV0sXG4gICAgICAgICAgaGFuZGxlcjogYXN5bmMgZnVuY3Rpb24gKFxuICAgICAgICAgICAgZWRpdG9yLFxuICAgICAgICAgICAgcmFuZ2UsXG4gICAgICAgICAgKTogUHJvbWlzZTxVUEkuSVRvb2x0aXBEYXRhIHwgdW5kZWZpbmVkPiB7XG4gICAgICAgICAgICBjb25zdCBkYXRhdGlwID0gYXdhaXQgcHJvdmlkZXIuZGF0YXRpcChlZGl0b3IsIHJhbmdlLnN0YXJ0KVxuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiB0cmlwbGUtZXF1YWxzXG4gICAgICAgICAgICBpZiAoZGF0YXRpcCAhPSB1bmRlZmluZWQgJiYgJ21hcmtlZFN0cmluZ3MnIGluIGRhdGF0aXApIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBwZXJzaXN0ZW50OiBkYXRhdGlwLnBpbm5hYmxlLFxuICAgICAgICAgICAgICAgIHJhbmdlOiBkYXRhdGlwLnJhbmdlLFxuICAgICAgICAgICAgICAgIHRleHQ6IGRhdGF0aXAubWFya2VkU3RyaW5ncy5tYXAoKHgpID0+IHgudmFsdWUpLFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0pXG4gICAgICByZXR1cm4gcHJvdmlkZXJVcGlcbiAgICB9LFxuICAgIGNyZWF0ZVBpbm5lZERhdGFUaXAodGlwLCBlZGl0b3IpIHtcbiAgICAgIGlmICgnbWFya2VkU3RyaW5ncycgaW4gdGlwKSB7XG4gICAgICAgIHVwaVxuICAgICAgICAgIC5zaG93VG9vbHRpcCh7XG4gICAgICAgICAgICBlZGl0b3IsXG4gICAgICAgICAgICB0b29sdGlwOiB7XG4gICAgICAgICAgICAgIHBlcnNpc3RlbnQ6IHRpcC5waW5uYWJsZSxcbiAgICAgICAgICAgICAgcmFuZ2U6IHRpcC5yYW5nZSxcbiAgICAgICAgICAgICAgdGV4dDogdGlwLm1hcmtlZFN0cmluZ3MubWFwKCh4KSA9PiB4LnZhbHVlKSwgLy8gVE9ETzogaGlnaGxpZ2h0XG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKChlOiBFcnJvcikgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlKVxuICAgICAgICAgICAgYXRvbS5ub3RpZmljYXRpb25zLmFkZEVycm9yKGUubmFtZSwge1xuICAgICAgICAgICAgICBzdGFjazogZS5zdGFjayxcbiAgICAgICAgICAgICAgZGV0YWlsOiBlLm1lc3NhZ2UsXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0pXG4gICAgICB9XG4gICAgICByZXR1cm4gbmV3IERpc3Bvc2FibGUoKCkgPT4ge1xuICAgICAgICAvKiBub29wICovXG4gICAgICB9KVxuICAgIH0sXG4gIH1cbn1cbiJdfQ==