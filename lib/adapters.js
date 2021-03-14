"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.datatipAdapter = exports.LinterAdapter = void 0;
const atom_1 = require("atom");
class LinterAdapter {
    constructor(upi) {
        this.upi = upi;
        this.name = 'hls';
        this.emitter = new atom_1.Emitter();
        this.messages = [];
    }
    dispose() {
        this.emitter.emit('did-destroy');
        this.emitter.dispose();
        this.upi.dispose();
    }
    clearMessages() {
        this.messages = [];
        this.updateMessages();
    }
    getMessages() {
        return this.messages;
    }
    onDidDestroy(callback) {
        return this.emitter.on('did-destroy', callback);
    }
    onDidUpdate(callback) {
        return this.emitter.on('did-update', callback);
    }
    setAllMessages(msgs) {
        this.messages = msgs;
        this.updateMessages();
    }
    setMessages(uri, msgs) {
        this.messages = this.messages
            .filter((x) => x.location.file !== uri)
            .concat(msgs);
        this.updateMessages();
    }
    updateMessages() {
        this.upi.setMessages(this.messages.map(convertMessages));
        this.emitter.emit('did-update');
    }
}
exports.LinterAdapter = LinterAdapter;
function convertMessages(msg) {
    return {
        message: { highlighter: 'hint.message.haskell', text: msg.excerpt },
        position: msg.location.position.start,
        uri: msg.location.file,
        severity: msg.severity,
    };
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRhcHRlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvYWRhcHRlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsK0JBQTBDO0FBTTFDLE1BQWEsYUFBYTtJQUl4QixZQUFvQixHQUFxQjtRQUFyQixRQUFHLEdBQUgsR0FBRyxDQUFrQjtRQUhsQyxTQUFJLEdBQUcsS0FBSyxDQUFBO1FBQ1gsWUFBTyxHQUFHLElBQUksY0FBTyxFQUFFLENBQUE7UUFDdkIsYUFBUSxHQUFxQixFQUFFLENBQUE7SUFDSyxDQUFDO0lBQzdDLE9BQU87UUFDTCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQTtRQUNoQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFBO1FBQ3RCLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUE7SUFDcEIsQ0FBQztJQUNELGFBQWE7UUFDWCxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQTtRQUNsQixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUE7SUFDdkIsQ0FBQztJQUNELFdBQVc7UUFDVCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUE7SUFDdEIsQ0FBQztJQUNELFlBQVksQ0FBQyxRQUErQjtRQUMxQyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxRQUFRLENBQUMsQ0FBQTtJQUNqRCxDQUFDO0lBQ0QsV0FBVyxDQUFDLFFBQStCO1FBQ3pDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLFFBQVEsQ0FBQyxDQUFBO0lBQ2hELENBQUM7SUFDRCxjQUFjLENBQUMsSUFBc0I7UUFDbkMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUE7UUFDcEIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFBO0lBQ3ZCLENBQUM7SUFDRCxXQUFXLENBQUMsR0FBVyxFQUFFLElBQWlDO1FB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QkFDYixHQUFHLENBQUMsV0FBVyxDQUFDO3dCQUNkLE1BQU07d0JBQ04sT0FBTyxFQUFFOzRCQUNQLFVBQVUsRUFBRSxHQUFHLENBQUMsUUFBUTs0QkFDeEIsS0FBSyxFQUFFLEdBQUcsQ0FBQyxLQUFLOzRCQUNoQixJQUFJO3lCQUNMO3FCQUNGLENBQUMsQ0FBQTtnQkFDSixDQUFDLENBQUM7cUJBQ0QsS0FBSyxDQUFDLENBQUMsQ0FBUSxFQUFFLEVBQUU7b0JBQ2xCLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUE7b0JBQ2hCLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUU7d0JBQ2xDLEtBQUssRUFBRSxDQUFDLENBQUMsS0FBSzt3QkFDZCxNQUFNLEVBQUUsQ0FBQyxDQUFDLE9BQU87cUJBQ2xCLENBQUMsQ0FBQTtnQkFDSixDQUFDLENBQUMsQ0FBQTthQUNMO1lBQ0QsT0FBTyxJQUFJLGlCQUFVLENBQUMsR0FBRyxFQUFFO1lBRTNCLENBQUMsQ0FBQyxDQUFBO1FBQ0osQ0FBQztLQUNGLENBQUE7QUFDSCxDQUFDO0FBNUVELHdDQTRFQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVtaXR0ZXIsIERpc3Bvc2FibGUgfSBmcm9tICdhdG9tJ1xuaW1wb3J0ICogYXMgVVBJIGZyb20gJ2F0b20taGFza2VsbC11cGknXG5pbXBvcnQgdHlwZSAqIGFzIEF0b21JREUgZnJvbSAnYXRvbS1pZGUtYmFzZSdcbmltcG9ydCB0eXBlICogYXMgTGludGVyIGZyb20gJ2F0b20vbGludGVyJ1xuaW1wb3J0IHR5cGUgeyBNYXJrZG93blNlcnZpY2UgfSBmcm9tICdhdG9tLWlkZS1iYXNlJ1xuXG5leHBvcnQgY2xhc3MgTGludGVyQWRhcHRlciBpbXBsZW1lbnRzIExpbnRlci5JbmRpZURlbGVnYXRlIHtcbiAgcHVibGljIG5hbWUgPSAnaGxzJ1xuICBwcml2YXRlIGVtaXR0ZXIgPSBuZXcgRW1pdHRlcigpXG4gIHByaXZhdGUgbWVzc2FnZXM6IExpbnRlci5NZXNzYWdlW10gPSBbXVxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHVwaTogVVBJLklVUElJbnN0YW5jZSkge31cbiAgZGlzcG9zZSgpIHtcbiAgICB0aGlzLmVtaXR0ZXIuZW1pdCgnZGlkLWRlc3Ryb3knKVxuICAgIHRoaXMuZW1pdHRlci5kaXNwb3NlKClcbiAgICB0aGlzLnVwaS5kaXNwb3NlKClcbiAgfVxuICBjbGVhck1lc3NhZ2VzKCkge1xuICAgIHRoaXMubWVzc2FnZXMgPSBbXVxuICAgIHRoaXMudXBkYXRlTWVzc2FnZXMoKVxuICB9XG4gIGdldE1lc3NhZ2VzKCkge1xuICAgIHJldHVybiB0aGlzLm1lc3NhZ2VzXG4gIH1cbiAgb25EaWREZXN0cm95KGNhbGxiYWNrOiAodmFsdWU/OiBhbnkpID0+IHZvaWQpIHtcbiAgICByZXR1cm4gdGhpcy5lbWl0dGVyLm9uKCdkaWQtZGVzdHJveScsIGNhbGxiYWNrKVxuICB9XG4gIG9uRGlkVXBkYXRlKGNhbGxiYWNrOiAodmFsdWU/OiBhbnkpID0+IHZvaWQpIHtcbiAgICByZXR1cm4gdGhpcy5lbWl0dGVyLm9uKCdkaWQtdXBkYXRlJywgY2FsbGJhY2spXG4gIH1cbiAgc2V0QWxsTWVzc2FnZXMobXNnczogTGludGVyLk1lc3NhZ2VbXSkge1xuICAgIHRoaXMubWVzc2FnZXMgPSBtc2dzXG4gICAgdGhpcy51cGRhdGVNZXNzYWdlcygpXG4gIH1cbiAgc2V0TWVzc2FnZXModXJpOiBzdHJpbmcsIG1zZ3M6IENvbmNhdEFycmF5PExpbnRlci5NZXNzYWdlPikge1xuICAgIHRoaXMubWVzc2FnZXMgPSB0aGlzLm1lc3NhZ2VzXG4gICAgICAuZmlsdGVyKCh4KSA9PiB4LmxvY2F0aW9uLmZpbGUgIT09IHVyaSlcbiAgICAgIC5jb25jYXQobXNncylcbiAgICB0aGlzLnVwZGF0ZU1lc3NhZ2VzKClcbiAgfVxuICBwcml2YXRlIHVwZGF0ZU1lc3NhZ2VzKCkge1xuICAgIHRoaXMudXBpLnNldE1lc3NhZ2VzKHRoaXMubWVzc2FnZXMubWFwKGNvbnZlcnRNZXNzYWdlcykpXG4gICAgdGhpcy5lbWl0dGVyLmVtaXQoJ2RpZC11cGRhdGUnKVxuICB9XG59XG5cbmZ1bmN0aW9uIGNvbnZlcnRNZXNzYWdlcyhtc2c6IExpbnRlci5NZXNzYWdlKTogVVBJLklSZXN1bHRJdGVtIHtcbiAgcmV0dXJuIHtcbiAgICBtZXNzYWdlOiB7IGhpZ2hsaWdodGVyOiAnaGludC5tZXNzYWdlLmhhc2tlbGwnLCB0ZXh0OiBtc2cuZXhjZXJwdCB9LFxuICAgIHBvc2l0aW9uOiBtc2cubG9jYXRpb24ucG9zaXRpb24uc3RhcnQsXG4gICAgdXJpOiBtc2cubG9jYXRpb24uZmlsZSxcbiAgICBzZXZlcml0eTogbXNnLnNldmVyaXR5LFxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkYXRhdGlwQWRhcHRlcihcbiAgcmVnaXN0ZXI6IFVQSS5JVVBJUmVnaXN0cmF0aW9uLFxuICB1cGk6IFVQSS5JVVBJSW5zdGFuY2UsXG4gIHJlbmRlcmVyOiB7IHJlbmRlcjogTWFya2Rvd25TZXJ2aWNlWydyZW5kZXInXSB8IG51bGwgfSxcbik6IEF0b21JREUuRGF0YXRpcFNlcnZpY2Uge1xuICBhc3luYyBmdW5jdGlvbiByZW5kZXJNYXJrZWRTdHJpbmcoc3RyOiBBdG9tSURFLk1hcmtlZFN0cmluZykge1xuICAgIGlmIChyZW5kZXJlci5yZW5kZXIpIHtcbiAgICAgIHJldHVybiB7IGh0bWw6IGF3YWl0IHJlbmRlcmVyLnJlbmRlcihzdHIudmFsdWUsICdzb3VyY2UuaGFza2VsbCcpIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHsgdGV4dDogc3RyLnZhbHVlIH1cbiAgICB9XG4gIH1cbiAgYXN5bmMgZnVuY3Rpb24gcmVuZGVyTWFya2VkU3RyaW5ncyhzdHJzOiBBdG9tSURFLk1hcmtlZFN0cmluZ1tdKSB7XG4gICAgcmV0dXJuIGF3YWl0IFByb21pc2UuYWxsKHN0cnMubWFwKHJlbmRlck1hcmtlZFN0cmluZykpXG4gIH1cbiAgcmV0dXJuIHtcbiAgICBhZGRNb2RpZmllclByb3ZpZGVyKCkge1xuICAgICAgLy8gbm90IGltcGxlbWVudGVkXG4gICAgICByZXR1cm4gbmV3IERpc3Bvc2FibGUoKCkgPT4ge1xuICAgICAgICAvKm5vb3AqL1xuICAgICAgfSlcbiAgICB9LFxuICAgIGFkZFByb3ZpZGVyKHByb3ZpZGVyKSB7XG4gICAgICBjb25zdCBwcm92aWRlclVwaSA9IHJlZ2lzdGVyKHtcbiAgICAgICAgbmFtZTogJ2hscycsXG4gICAgICAgIHRvb2x0aXA6IHtcbiAgICAgICAgICBwcmlvcml0eTogMTAwLFxuICAgICAgICAgIGV2ZW50VHlwZXM6IFtcbiAgICAgICAgICAgIFVQSS5URXZlbnRSYW5nZVR5cGUubW91c2UsXG4gICAgICAgICAgICBVUEkuVEV2ZW50UmFuZ2VUeXBlLnNlbGVjdGlvbixcbiAgICAgICAgICBdLFxuICAgICAgICAgIGhhbmRsZXI6IGFzeW5jIGZ1bmN0aW9uIChcbiAgICAgICAgICAgIGVkaXRvcixcbiAgICAgICAgICAgIHJhbmdlLFxuICAgICAgICAgICk6IFByb21pc2U8VVBJLklUb29sdGlwRGF0YSB8IHVuZGVmaW5lZD4ge1xuICAgICAgICAgICAgY29uc3QgZGF0YXRpcCA9IGF3YWl0IHByb3ZpZGVyLmRhdGF0aXAoZWRpdG9yLCByYW5nZS5zdGFydClcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogdHJpcGxlLWVxdWFsc1xuICAgICAgICAgICAgaWYgKGRhdGF0aXAgIT0gdW5kZWZpbmVkICYmICdtYXJrZWRTdHJpbmdzJyBpbiBkYXRhdGlwKSB7XG4gICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcGVyc2lzdGVudDogZGF0YXRpcC5waW5uYWJsZSxcbiAgICAgICAgICAgICAgICByYW5nZTogZGF0YXRpcC5yYW5nZSxcbiAgICAgICAgICAgICAgICB0ZXh0OiBhd2FpdCByZW5kZXJNYXJrZWRTdHJpbmdzKGRhdGF0aXAubWFya2VkU3RyaW5ncyksXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWRcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSlcbiAgICAgIHJldHVybiBwcm92aWRlclVwaVxuICAgIH0sXG4gICAgY3JlYXRlUGlubmVkRGF0YVRpcCh0aXAsIGVkaXRvcikge1xuICAgICAgaWYgKCdtYXJrZWRTdHJpbmdzJyBpbiB0aXApIHtcbiAgICAgICAgcmVuZGVyTWFya2VkU3RyaW5ncyh0aXAubWFya2VkU3RyaW5ncylcbiAgICAgICAgICAudGhlbigodGV4dCkgPT4ge1xuICAgICAgICAgICAgdXBpLnNob3dUb29sdGlwKHtcbiAgICAgICAgICAgICAgZWRpdG9yLFxuICAgICAgICAgICAgICB0b29sdGlwOiB7XG4gICAgICAgICAgICAgICAgcGVyc2lzdGVudDogdGlwLnBpbm5hYmxlLFxuICAgICAgICAgICAgICAgIHJhbmdlOiB0aXAucmFuZ2UsXG4gICAgICAgICAgICAgICAgdGV4dCxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2F0Y2goKGU6IEVycm9yKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGUpXG4gICAgICAgICAgICBhdG9tLm5vdGlmaWNhdGlvbnMuYWRkRXJyb3IoZS5uYW1lLCB7XG4gICAgICAgICAgICAgIHN0YWNrOiBlLnN0YWNrLFxuICAgICAgICAgICAgICBkZXRhaWw6IGUubWVzc2FnZSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSlcbiAgICAgIH1cbiAgICAgIHJldHVybiBuZXcgRGlzcG9zYWJsZSgoKSA9PiB7XG4gICAgICAgIC8qIG5vb3AgKi9cbiAgICAgIH0pXG4gICAgfSxcbiAgfVxufVxuIl19