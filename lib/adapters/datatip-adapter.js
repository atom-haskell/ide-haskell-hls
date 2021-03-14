"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.datatipAdapter = void 0;
const atom_1 = require("atom");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YXRpcC1hZGFwdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2FkYXB0ZXJzL2RhdGF0aXAtYWRhcHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwrQkFBaUM7QUFLakMsU0FBZ0IsY0FBYyxDQUM1QixRQUE4QixFQUM5QixHQUFxQixFQUNyQixRQUFzRDtJQUV0RCxLQUFLLFVBQVUsa0JBQWtCLENBQUMsR0FBeUI7UUFDekQsSUFBSSxRQUFRLENBQUMsTUFBTSxFQUFFO1lBQ25CLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsZ0JBQWdCLENBQUMsRUFBRSxDQUFBO1NBQ3BFO2FBQU07WUFDTCxPQUFPLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQTtTQUMzQjtJQUNILENBQUM7SUFDRCxLQUFLLFVBQVUsbUJBQW1CLENBQUMsSUFBNEI7UUFDN0QsT0FBTyxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUE7SUFDeEQsQ0FBQztJQUNELE9BQU87UUFDTCxtQkFBbUI7WUFFakIsT0FBTyxJQUFJLGlCQUFVLENBQUMsR0FBRyxFQUFFO1lBRTNCLENBQUMsQ0FBQyxDQUFBO1FBQ0osQ0FBQztRQUNELFdBQVcsQ0FBQyxRQUFRO1lBQ2xCLE1BQU0sV0FBVyxHQUFHLFFBQVEsQ0FBQztnQkFDM0IsSUFBSSxFQUFFLEtBQUs7Z0JBQ1gsT0FBTyxFQUFFO29CQUNQLFFBQVEsRUFBRSxHQUFHO29CQUNiLFVBQVUsRUFBRTs7O3FCQUdYO29CQUNELE9BQU8sRUFBRSxLQUFLLFdBQ1osTUFBTSxFQUNOLEtBQUs7d0JBRUwsTUFBTSxPQUFPLEdBQUcsTUFBTSxRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUE7d0JBRTNELElBQUksT0FBTyxJQUFJLFNBQVMsSUFBSSxlQUFlLElBQUksT0FBTyxFQUFFOzRCQUN0RCxPQUFPO2dDQUNMLFVBQVUsRUFBRSxPQUFPLENBQUMsUUFBUTtnQ0FDNUIsS0FBSyxFQUFFLE9BQU8sQ0FBQyxLQUFLO2dDQUNwQixJQUFJLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDOzZCQUN2RCxDQUFBO3lCQUNGO3dCQUNELE9BQU8sU0FBUyxDQUFBO29CQUNsQixDQUFDO2lCQUNGO2FBQ0YsQ0FBQyxDQUFBO1lBQ0YsT0FBTyxXQUFXLENBQUE7UUFDcEIsQ0FBQztRQUNELG1CQUFtQixDQUFDLEdBQUcsRUFBRSxNQUFNO1lBQzdCLElBQUksZUFBZSxJQUFJLEdBQUcsRUFBRTtnQkFDMUIsbUJBQW1CLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQztxQkFDbkMsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7b0JBQ2IsR0FBRyxDQUFDLFdBQVcsQ0FBQzt3QkFDZCxNQUFNO3dCQUNOLE9BQU8sRUFBRTs0QkFDUCxVQUFVLEVBQUUsR0FBRyxDQUFDLFFBQVE7NEJBQ3hCLEtBQUssRUFBRSxHQUFHLENBQUMsS0FBSzs0QkFDaEIsSUFBSTt5QkFDTDtxQkFDRixDQUFDLENBQUE7Z0JBQ0osQ0FBQyxDQUFDO3FCQUNELEtBQUssQ0FBQyxDQUFDLENBQVEsRUFBRSxFQUFFO29CQUNsQixPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFBO29CQUNoQixJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFO3dCQUNsQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLEtBQUs7d0JBQ2QsTUFBTSxFQUFFLENBQUMsQ0FBQyxPQUFPO3FCQUNsQixDQUFDLENBQUE7Z0JBQ0osQ0FBQyxDQUFDLENBQUE7YUFDTDtZQUNELE9BQU8sSUFBSSxpQkFBVSxDQUFDLEdBQUcsRUFBRTtZQUUzQixDQUFDLENBQUMsQ0FBQTtRQUNKLENBQUM7S0FDRixDQUFBO0FBQ0gsQ0FBQztBQTVFRCx3Q0E0RUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXNwb3NhYmxlIH0gZnJvbSAnYXRvbSdcbmltcG9ydCAqIGFzIFVQSSBmcm9tICdhdG9tLWhhc2tlbGwtdXBpJ1xuaW1wb3J0IHR5cGUgKiBhcyBBdG9tSURFIGZyb20gJ2F0b20taWRlLWJhc2UnXG5pbXBvcnQgdHlwZSB7IE1hcmtkb3duU2VydmljZSB9IGZyb20gJ2F0b20taWRlLWJhc2UnXG5cbmV4cG9ydCBmdW5jdGlvbiBkYXRhdGlwQWRhcHRlcihcbiAgcmVnaXN0ZXI6IFVQSS5JVVBJUmVnaXN0cmF0aW9uLFxuICB1cGk6IFVQSS5JVVBJSW5zdGFuY2UsXG4gIHJlbmRlcmVyOiB7IHJlbmRlcjogTWFya2Rvd25TZXJ2aWNlWydyZW5kZXInXSB8IG51bGwgfSxcbik6IEF0b21JREUuRGF0YXRpcFNlcnZpY2Uge1xuICBhc3luYyBmdW5jdGlvbiByZW5kZXJNYXJrZWRTdHJpbmcoc3RyOiBBdG9tSURFLk1hcmtlZFN0cmluZykge1xuICAgIGlmIChyZW5kZXJlci5yZW5kZXIpIHtcbiAgICAgIHJldHVybiB7IGh0bWw6IGF3YWl0IHJlbmRlcmVyLnJlbmRlcihzdHIudmFsdWUsICdzb3VyY2UuaGFza2VsbCcpIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHsgdGV4dDogc3RyLnZhbHVlIH1cbiAgICB9XG4gIH1cbiAgYXN5bmMgZnVuY3Rpb24gcmVuZGVyTWFya2VkU3RyaW5ncyhzdHJzOiBBdG9tSURFLk1hcmtlZFN0cmluZ1tdKSB7XG4gICAgcmV0dXJuIGF3YWl0IFByb21pc2UuYWxsKHN0cnMubWFwKHJlbmRlck1hcmtlZFN0cmluZykpXG4gIH1cbiAgcmV0dXJuIHtcbiAgICBhZGRNb2RpZmllclByb3ZpZGVyKCkge1xuICAgICAgLy8gbm90IGltcGxlbWVudGVkXG4gICAgICByZXR1cm4gbmV3IERpc3Bvc2FibGUoKCkgPT4ge1xuICAgICAgICAvKm5vb3AqL1xuICAgICAgfSlcbiAgICB9LFxuICAgIGFkZFByb3ZpZGVyKHByb3ZpZGVyKSB7XG4gICAgICBjb25zdCBwcm92aWRlclVwaSA9IHJlZ2lzdGVyKHtcbiAgICAgICAgbmFtZTogJ2hscycsXG4gICAgICAgIHRvb2x0aXA6IHtcbiAgICAgICAgICBwcmlvcml0eTogMTAwLFxuICAgICAgICAgIGV2ZW50VHlwZXM6IFtcbiAgICAgICAgICAgIFVQSS5URXZlbnRSYW5nZVR5cGUubW91c2UsXG4gICAgICAgICAgICBVUEkuVEV2ZW50UmFuZ2VUeXBlLnNlbGVjdGlvbixcbiAgICAgICAgICBdLFxuICAgICAgICAgIGhhbmRsZXI6IGFzeW5jIGZ1bmN0aW9uIChcbiAgICAgICAgICAgIGVkaXRvcixcbiAgICAgICAgICAgIHJhbmdlLFxuICAgICAgICAgICk6IFByb21pc2U8VVBJLklUb29sdGlwRGF0YSB8IHVuZGVmaW5lZD4ge1xuICAgICAgICAgICAgY29uc3QgZGF0YXRpcCA9IGF3YWl0IHByb3ZpZGVyLmRhdGF0aXAoZWRpdG9yLCByYW5nZS5zdGFydClcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogdHJpcGxlLWVxdWFsc1xuICAgICAgICAgICAgaWYgKGRhdGF0aXAgIT0gdW5kZWZpbmVkICYmICdtYXJrZWRTdHJpbmdzJyBpbiBkYXRhdGlwKSB7XG4gICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcGVyc2lzdGVudDogZGF0YXRpcC5waW5uYWJsZSxcbiAgICAgICAgICAgICAgICByYW5nZTogZGF0YXRpcC5yYW5nZSxcbiAgICAgICAgICAgICAgICB0ZXh0OiBhd2FpdCByZW5kZXJNYXJrZWRTdHJpbmdzKGRhdGF0aXAubWFya2VkU3RyaW5ncyksXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWRcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSlcbiAgICAgIHJldHVybiBwcm92aWRlclVwaVxuICAgIH0sXG4gICAgY3JlYXRlUGlubmVkRGF0YVRpcCh0aXAsIGVkaXRvcikge1xuICAgICAgaWYgKCdtYXJrZWRTdHJpbmdzJyBpbiB0aXApIHtcbiAgICAgICAgcmVuZGVyTWFya2VkU3RyaW5ncyh0aXAubWFya2VkU3RyaW5ncylcbiAgICAgICAgICAudGhlbigodGV4dCkgPT4ge1xuICAgICAgICAgICAgdXBpLnNob3dUb29sdGlwKHtcbiAgICAgICAgICAgICAgZWRpdG9yLFxuICAgICAgICAgICAgICB0b29sdGlwOiB7XG4gICAgICAgICAgICAgICAgcGVyc2lzdGVudDogdGlwLnBpbm5hYmxlLFxuICAgICAgICAgICAgICAgIHJhbmdlOiB0aXAucmFuZ2UsXG4gICAgICAgICAgICAgICAgdGV4dCxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2F0Y2goKGU6IEVycm9yKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGUpXG4gICAgICAgICAgICBhdG9tLm5vdGlmaWNhdGlvbnMuYWRkRXJyb3IoZS5uYW1lLCB7XG4gICAgICAgICAgICAgIHN0YWNrOiBlLnN0YWNrLFxuICAgICAgICAgICAgICBkZXRhaWw6IGUubWVzc2FnZSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSlcbiAgICAgIH1cbiAgICAgIHJldHVybiBuZXcgRGlzcG9zYWJsZSgoKSA9PiB7XG4gICAgICAgIC8qIG5vb3AgKi9cbiAgICAgIH0pXG4gICAgfSxcbiAgfVxufVxuIl19