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
        severity: msg.severity === 'info' ? 'lint' : msg.severity,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRhcHRlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvYWRhcHRlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsK0JBQTBDO0FBTTFDLE1BQWEsYUFBYTtJQUl4QixZQUFvQixHQUFxQjtRQUFyQixRQUFHLEdBQUgsR0FBRyxDQUFrQjtRQUhsQyxTQUFJLEdBQUcsS0FBSyxDQUFBO1FBQ1gsWUFBTyxHQUFHLElBQUksY0FBTyxFQUFFLENBQUE7UUFDdkIsYUFBUSxHQUFxQixFQUFFLENBQUE7SUFDSyxDQUFDO0lBQzdDLE9BQU87UUFDTCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQTtRQUNoQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFBO1FBQ3RCLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUE7SUFDcEIsQ0FBQztJQUNELGFBQWE7UUFDWCxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQTtRQUNsQixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUE7SUFDdkIsQ0FBQztJQUNELFdBQVc7UUFDVCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUE7SUFDdEIsQ0FBQztJQUNELFlBQVksQ0FBQyxRQUErQjtRQUMxQyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxRQUFRLENBQUMsQ0FBQTtJQUNqRCxDQUFDO0lBQ0QsV0FBVyxDQUFDLFFBQStCO1FBQ3pDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLFFBQVEsQ0FBQyxDQUFBO0lBQ2hELENBQUM7SUFDRCxjQUFjLENBQUMsSUFBc0I7UUFDbkMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUE7UUFDcEIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFBO0lBQ3ZCLENBQUM7SUFDRCxXQUFXLENBQUMsR0FBVyxFQUFFLElBQWlDO1FBQ3hELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVE7YUFDMUIsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksS0FBSyxHQUFHLENBQUM7YUFDdEMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ2YsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFBO0lBQ3ZCLENBQUM7SUFDTyxjQUFjO1FBQ3BCLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUE7UUFDeEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUE7SUFDakMsQ0FBQztDQUNGO0FBckNELHNDQXFDQztBQUVELFNBQVMsZUFBZSxDQUFDLEdBQW1CO0lBQzFDLE9BQU87UUFDTCxPQUFPLEVBQUUsRUFBRSxXQUFXLEVBQUUsc0JBQXNCLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxPQUFPLEVBQUU7UUFDbkUsUUFBUSxFQUFFLEdBQUcsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUs7UUFDckMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSTtRQUN0QixRQUFRLEVBQUUsR0FBRyxDQUFDLFFBQVEsS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVE7S0FDMUQsQ0FBQTtBQUNILENBQUM7QUFFRCxTQUFnQixjQUFjLENBQzVCLFFBQThCLEVBQzlCLEdBQXFCLEVBQ3JCLFFBQXNEO0lBRXRELEtBQUssVUFBVSxrQkFBa0IsQ0FBQyxHQUF5QjtRQUN6RCxJQUFJLFFBQVEsQ0FBQyxNQUFNLEVBQUU7WUFDbkIsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxnQkFBZ0IsQ0FBQyxFQUFFLENBQUE7U0FDcEU7YUFBTTtZQUNMLE9BQU8sRUFBRSxJQUFJLEVBQUUsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFBO1NBQzNCO0lBQ0gsQ0FBQztJQUNELEtBQUssVUFBVSxtQkFBbUIsQ0FBQyxJQUE0QjtRQUM3RCxPQUFPLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQTtJQUN4RCxDQUFDO0lBQ0QsT0FBTztRQUNMLG1CQUFtQjtZQUVqQixPQUFPLElBQUksaUJBQVUsQ0FBQyxHQUFHLEVBQUU7WUFFM0IsQ0FBQyxDQUFDLENBQUE7UUFDSixDQUFDO1FBQ0QsV0FBVyxDQUFDLFFBQVE7WUFDbEIsTUFBTSxXQUFXLEdBQUcsUUFBUSxDQUFDO2dCQUMzQixJQUFJLEVBQUUsS0FBSztnQkFDWCxPQUFPLEVBQUU7b0JBQ1AsUUFBUSxFQUFFLEdBQUc7b0JBQ2IsVUFBVSxFQUFFOzs7cUJBR1g7b0JBQ0QsT0FBTyxFQUFFLEtBQUssV0FDWixNQUFNLEVBQ04sS0FBSzt3QkFFTCxNQUFNLE9BQU8sR0FBRyxNQUFNLFFBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQTt3QkFFM0QsSUFBSSxPQUFPLElBQUksU0FBUyxJQUFJLGVBQWUsSUFBSSxPQUFPLEVBQUU7NEJBQ3RELE9BQU87Z0NBQ0wsVUFBVSxFQUFFLE9BQU8sQ0FBQyxRQUFRO2dDQUM1QixLQUFLLEVBQUUsT0FBTyxDQUFDLEtBQUs7Z0NBQ3BCLElBQUksRUFBRSxNQUFNLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUM7NkJBQ3ZELENBQUE7eUJBQ0Y7d0JBQ0QsT0FBTyxTQUFTLENBQUE7b0JBQ2xCLENBQUM7aUJBQ0Y7YUFDRixDQUFDLENBQUE7WUFDRixPQUFPLFdBQVcsQ0FBQTtRQUNwQixDQUFDO1FBQ0QsbUJBQW1CLENBQUMsR0FBRyxFQUFFLE1BQU07WUFDN0IsSUFBSSxlQUFlLElBQUksR0FBRyxFQUFFO2dCQUMxQixtQkFBbUIsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDO3FCQUNuQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtvQkFDYixHQUFHLENBQUMsV0FBVyxDQUFDO3dCQUNkLE1BQU07d0JBQ04sT0FBTyxFQUFFOzRCQUNQLFVBQVUsRUFBRSxHQUFHLENBQUMsUUFBUTs0QkFDeEIsS0FBSyxFQUFFLEdBQUcsQ0FBQyxLQUFLOzRCQUNoQixJQUFJO3lCQUNMO3FCQUNGLENBQUMsQ0FBQTtnQkFDSixDQUFDLENBQUM7cUJBQ0QsS0FBSyxDQUFDLENBQUMsQ0FBUSxFQUFFLEVBQUU7b0JBQ2xCLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUE7b0JBQ2hCLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUU7d0JBQ2xDLEtBQUssRUFBRSxDQUFDLENBQUMsS0FBSzt3QkFDZCxNQUFNLEVBQUUsQ0FBQyxDQUFDLE9BQU87cUJBQ2xCLENBQUMsQ0FBQTtnQkFDSixDQUFDLENBQUMsQ0FBQTthQUNMO1lBQ0QsT0FBTyxJQUFJLGlCQUFVLENBQUMsR0FBRyxFQUFFO1lBRTNCLENBQUMsQ0FBQyxDQUFBO1FBQ0osQ0FBQztLQUNGLENBQUE7QUFDSCxDQUFDO0FBNUVELHdDQTRFQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVtaXR0ZXIsIERpc3Bvc2FibGUgfSBmcm9tICdhdG9tJ1xuaW1wb3J0ICogYXMgVVBJIGZyb20gJ2F0b20taGFza2VsbC11cGknXG5pbXBvcnQgdHlwZSAqIGFzIEF0b21JREUgZnJvbSAnYXRvbS1pZGUtYmFzZSdcbmltcG9ydCB0eXBlICogYXMgTGludGVyIGZyb20gJ2F0b20vbGludGVyJ1xuaW1wb3J0IHR5cGUgeyBNYXJrZG93blNlcnZpY2UgfSBmcm9tICdhdG9tLWlkZS1iYXNlJ1xuXG5leHBvcnQgY2xhc3MgTGludGVyQWRhcHRlciBpbXBsZW1lbnRzIExpbnRlci5JbmRpZURlbGVnYXRlIHtcbiAgcHVibGljIG5hbWUgPSAnaGxzJ1xuICBwcml2YXRlIGVtaXR0ZXIgPSBuZXcgRW1pdHRlcigpXG4gIHByaXZhdGUgbWVzc2FnZXM6IExpbnRlci5NZXNzYWdlW10gPSBbXVxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHVwaTogVVBJLklVUElJbnN0YW5jZSkge31cbiAgZGlzcG9zZSgpIHtcbiAgICB0aGlzLmVtaXR0ZXIuZW1pdCgnZGlkLWRlc3Ryb3knKVxuICAgIHRoaXMuZW1pdHRlci5kaXNwb3NlKClcbiAgICB0aGlzLnVwaS5kaXNwb3NlKClcbiAgfVxuICBjbGVhck1lc3NhZ2VzKCkge1xuICAgIHRoaXMubWVzc2FnZXMgPSBbXVxuICAgIHRoaXMudXBkYXRlTWVzc2FnZXMoKVxuICB9XG4gIGdldE1lc3NhZ2VzKCkge1xuICAgIHJldHVybiB0aGlzLm1lc3NhZ2VzXG4gIH1cbiAgb25EaWREZXN0cm95KGNhbGxiYWNrOiAodmFsdWU/OiBhbnkpID0+IHZvaWQpIHtcbiAgICByZXR1cm4gdGhpcy5lbWl0dGVyLm9uKCdkaWQtZGVzdHJveScsIGNhbGxiYWNrKVxuICB9XG4gIG9uRGlkVXBkYXRlKGNhbGxiYWNrOiAodmFsdWU/OiBhbnkpID0+IHZvaWQpIHtcbiAgICByZXR1cm4gdGhpcy5lbWl0dGVyLm9uKCdkaWQtdXBkYXRlJywgY2FsbGJhY2spXG4gIH1cbiAgc2V0QWxsTWVzc2FnZXMobXNnczogTGludGVyLk1lc3NhZ2VbXSkge1xuICAgIHRoaXMubWVzc2FnZXMgPSBtc2dzXG4gICAgdGhpcy51cGRhdGVNZXNzYWdlcygpXG4gIH1cbiAgc2V0TWVzc2FnZXModXJpOiBzdHJpbmcsIG1zZ3M6IENvbmNhdEFycmF5PExpbnRlci5NZXNzYWdlPikge1xuICAgIHRoaXMubWVzc2FnZXMgPSB0aGlzLm1lc3NhZ2VzXG4gICAgICAuZmlsdGVyKCh4KSA9PiB4LmxvY2F0aW9uLmZpbGUgIT09IHVyaSlcbiAgICAgIC5jb25jYXQobXNncylcbiAgICB0aGlzLnVwZGF0ZU1lc3NhZ2VzKClcbiAgfVxuICBwcml2YXRlIHVwZGF0ZU1lc3NhZ2VzKCkge1xuICAgIHRoaXMudXBpLnNldE1lc3NhZ2VzKHRoaXMubWVzc2FnZXMubWFwKGNvbnZlcnRNZXNzYWdlcykpXG4gICAgdGhpcy5lbWl0dGVyLmVtaXQoJ2RpZC11cGRhdGUnKVxuICB9XG59XG5cbmZ1bmN0aW9uIGNvbnZlcnRNZXNzYWdlcyhtc2c6IExpbnRlci5NZXNzYWdlKTogVVBJLklSZXN1bHRJdGVtIHtcbiAgcmV0dXJuIHtcbiAgICBtZXNzYWdlOiB7IGhpZ2hsaWdodGVyOiAnaGludC5tZXNzYWdlLmhhc2tlbGwnLCB0ZXh0OiBtc2cuZXhjZXJwdCB9LFxuICAgIHBvc2l0aW9uOiBtc2cubG9jYXRpb24ucG9zaXRpb24uc3RhcnQsXG4gICAgdXJpOiBtc2cubG9jYXRpb24uZmlsZSxcbiAgICBzZXZlcml0eTogbXNnLnNldmVyaXR5ID09PSAnaW5mbycgPyAnbGludCcgOiBtc2cuc2V2ZXJpdHksXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRhdGF0aXBBZGFwdGVyKFxuICByZWdpc3RlcjogVVBJLklVUElSZWdpc3RyYXRpb24sXG4gIHVwaTogVVBJLklVUElJbnN0YW5jZSxcbiAgcmVuZGVyZXI6IHsgcmVuZGVyOiBNYXJrZG93blNlcnZpY2VbJ3JlbmRlciddIHwgbnVsbCB9LFxuKTogQXRvbUlERS5EYXRhdGlwU2VydmljZSB7XG4gIGFzeW5jIGZ1bmN0aW9uIHJlbmRlck1hcmtlZFN0cmluZyhzdHI6IEF0b21JREUuTWFya2VkU3RyaW5nKSB7XG4gICAgaWYgKHJlbmRlcmVyLnJlbmRlcikge1xuICAgICAgcmV0dXJuIHsgaHRtbDogYXdhaXQgcmVuZGVyZXIucmVuZGVyKHN0ci52YWx1ZSwgJ3NvdXJjZS5oYXNrZWxsJykgfVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4geyB0ZXh0OiBzdHIudmFsdWUgfVxuICAgIH1cbiAgfVxuICBhc3luYyBmdW5jdGlvbiByZW5kZXJNYXJrZWRTdHJpbmdzKHN0cnM6IEF0b21JREUuTWFya2VkU3RyaW5nW10pIHtcbiAgICByZXR1cm4gYXdhaXQgUHJvbWlzZS5hbGwoc3Rycy5tYXAocmVuZGVyTWFya2VkU3RyaW5nKSlcbiAgfVxuICByZXR1cm4ge1xuICAgIGFkZE1vZGlmaWVyUHJvdmlkZXIoKSB7XG4gICAgICAvLyBub3QgaW1wbGVtZW50ZWRcbiAgICAgIHJldHVybiBuZXcgRGlzcG9zYWJsZSgoKSA9PiB7XG4gICAgICAgIC8qbm9vcCovXG4gICAgICB9KVxuICAgIH0sXG4gICAgYWRkUHJvdmlkZXIocHJvdmlkZXIpIHtcbiAgICAgIGNvbnN0IHByb3ZpZGVyVXBpID0gcmVnaXN0ZXIoe1xuICAgICAgICBuYW1lOiAnaGxzJyxcbiAgICAgICAgdG9vbHRpcDoge1xuICAgICAgICAgIHByaW9yaXR5OiAxMDAsXG4gICAgICAgICAgZXZlbnRUeXBlczogW1xuICAgICAgICAgICAgVVBJLlRFdmVudFJhbmdlVHlwZS5tb3VzZSxcbiAgICAgICAgICAgIFVQSS5URXZlbnRSYW5nZVR5cGUuc2VsZWN0aW9uLFxuICAgICAgICAgIF0sXG4gICAgICAgICAgaGFuZGxlcjogYXN5bmMgZnVuY3Rpb24gKFxuICAgICAgICAgICAgZWRpdG9yLFxuICAgICAgICAgICAgcmFuZ2UsXG4gICAgICAgICAgKTogUHJvbWlzZTxVUEkuSVRvb2x0aXBEYXRhIHwgdW5kZWZpbmVkPiB7XG4gICAgICAgICAgICBjb25zdCBkYXRhdGlwID0gYXdhaXQgcHJvdmlkZXIuZGF0YXRpcChlZGl0b3IsIHJhbmdlLnN0YXJ0KVxuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiB0cmlwbGUtZXF1YWxzXG4gICAgICAgICAgICBpZiAoZGF0YXRpcCAhPSB1bmRlZmluZWQgJiYgJ21hcmtlZFN0cmluZ3MnIGluIGRhdGF0aXApIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBwZXJzaXN0ZW50OiBkYXRhdGlwLnBpbm5hYmxlLFxuICAgICAgICAgICAgICAgIHJhbmdlOiBkYXRhdGlwLnJhbmdlLFxuICAgICAgICAgICAgICAgIHRleHQ6IGF3YWl0IHJlbmRlck1hcmtlZFN0cmluZ3MoZGF0YXRpcC5tYXJrZWRTdHJpbmdzKSxcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9KVxuICAgICAgcmV0dXJuIHByb3ZpZGVyVXBpXG4gICAgfSxcbiAgICBjcmVhdGVQaW5uZWREYXRhVGlwKHRpcCwgZWRpdG9yKSB7XG4gICAgICBpZiAoJ21hcmtlZFN0cmluZ3MnIGluIHRpcCkge1xuICAgICAgICByZW5kZXJNYXJrZWRTdHJpbmdzKHRpcC5tYXJrZWRTdHJpbmdzKVxuICAgICAgICAgIC50aGVuKCh0ZXh0KSA9PiB7XG4gICAgICAgICAgICB1cGkuc2hvd1Rvb2x0aXAoe1xuICAgICAgICAgICAgICBlZGl0b3IsXG4gICAgICAgICAgICAgIHRvb2x0aXA6IHtcbiAgICAgICAgICAgICAgICBwZXJzaXN0ZW50OiB0aXAucGlubmFibGUsXG4gICAgICAgICAgICAgICAgcmFuZ2U6IHRpcC5yYW5nZSxcbiAgICAgICAgICAgICAgICB0ZXh0LFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5jYXRjaCgoZTogRXJyb3IpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZSlcbiAgICAgICAgICAgIGF0b20ubm90aWZpY2F0aW9ucy5hZGRFcnJvcihlLm5hbWUsIHtcbiAgICAgICAgICAgICAgc3RhY2s6IGUuc3RhY2ssXG4gICAgICAgICAgICAgIGRldGFpbDogZS5tZXNzYWdlLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9KVxuICAgICAgfVxuICAgICAgcmV0dXJuIG5ldyBEaXNwb3NhYmxlKCgpID0+IHtcbiAgICAgICAgLyogbm9vcCAqL1xuICAgICAgfSlcbiAgICB9LFxuICB9XG59XG4iXX0=