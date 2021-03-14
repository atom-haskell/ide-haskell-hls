"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.datatipAdapter = void 0;
const atom_1 = require("atom");
function datatipAdapter(register, upi, renderer) {
    async function renderMarkedString(str) {
        if (renderer.render) {
            return {
                html: await renderer.render(str.value, 'source.haskell', {
                    ALLOW_UNKNOWN_PROTOCOLS: true,
                }),
            };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YXRpcC1hZGFwdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2FkYXB0ZXJzL2RhdGF0aXAtYWRhcHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwrQkFBaUM7QUFJakMsU0FBZ0IsY0FBYyxDQUM1QixRQUE4QixFQUM5QixHQUFxQixFQUNyQixRQUF5QjtJQUV6QixLQUFLLFVBQVUsa0JBQWtCLENBQy9CLEdBQXlCO1FBRXpCLElBQUksUUFBUSxDQUFDLE1BQU0sRUFBRTtZQUNuQixPQUFPO2dCQUNMLElBQUksRUFBRSxNQUFNLFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxnQkFBZ0IsRUFBRTtvQkFDdkQsdUJBQXVCLEVBQUUsSUFBSTtpQkFDOUIsQ0FBQzthQUNILENBQUE7U0FDRjthQUFNO1lBQ0wsT0FBTyxFQUFFLElBQUksRUFBRSxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUE7U0FDM0I7SUFDSCxDQUFDO0lBQ0QsS0FBSyxVQUFVLG1CQUFtQixDQUFDLElBQTRCO1FBQzdELE9BQU8sTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFBO0lBQ3hELENBQUM7SUFDRCxPQUFPO1FBQ0wsbUJBQW1CO1lBRWpCLE9BQU8sSUFBSSxpQkFBVSxDQUFDLEdBQUcsRUFBRTtZQUUzQixDQUFDLENBQUMsQ0FBQTtRQUNKLENBQUM7UUFDRCxXQUFXLENBQUMsUUFBUTtZQUNsQixNQUFNLFdBQVcsR0FBRyxRQUFRLENBQUM7Z0JBQzNCLElBQUksRUFBRSxLQUFLO2dCQUNYLE9BQU8sRUFBRTtvQkFDUCxRQUFRLEVBQUUsR0FBRztvQkFDYixVQUFVLEVBQUU7OztxQkFHWDtvQkFDRCxPQUFPLEVBQUUsS0FBSyxXQUNaLE1BQU0sRUFDTixLQUFLO3dCQUVMLE1BQU0sT0FBTyxHQUFHLE1BQU0sUUFBUSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFBO3dCQUUzRCxJQUFJLE9BQU8sSUFBSSxTQUFTLElBQUksZUFBZSxJQUFJLE9BQU8sRUFBRTs0QkFDdEQsT0FBTztnQ0FDTCxVQUFVLEVBQUUsT0FBTyxDQUFDLFFBQVE7Z0NBQzVCLEtBQUssRUFBRSxPQUFPLENBQUMsS0FBSztnQ0FDcEIsSUFBSSxFQUFFLE1BQU0sbUJBQW1CLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQzs2QkFDdkQsQ0FBQTt5QkFDRjt3QkFDRCxPQUFPLFNBQVMsQ0FBQTtvQkFDbEIsQ0FBQztpQkFDRjthQUNGLENBQUMsQ0FBQTtZQUNGLE9BQU8sV0FBVyxDQUFBO1FBQ3BCLENBQUM7UUFDRCxtQkFBbUIsQ0FBQyxHQUFHLEVBQUUsTUFBTTtZQUM3QixJQUFJLGVBQWUsSUFBSSxHQUFHLEVBQUU7Z0JBQzFCLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUM7cUJBQ25DLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO29CQUNiLEdBQUcsQ0FBQyxXQUFXLENBQUM7d0JBQ2QsTUFBTTt3QkFDTixPQUFPLEVBQUU7NEJBQ1AsVUFBVSxFQUFFLEdBQUcsQ0FBQyxRQUFROzRCQUN4QixLQUFLLEVBQUUsR0FBRyxDQUFDLEtBQUs7NEJBQ2hCLElBQUk7eUJBQ0w7cUJBQ0YsQ0FBQyxDQUFBO2dCQUNKLENBQUMsQ0FBQztxQkFDRCxLQUFLLENBQUMsQ0FBQyxDQUFRLEVBQUUsRUFBRTtvQkFDbEIsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQTtvQkFDaEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRTt3QkFDbEMsS0FBSyxFQUFFLENBQUMsQ0FBQyxLQUFLO3dCQUNkLE1BQU0sRUFBRSxDQUFDLENBQUMsT0FBTztxQkFDbEIsQ0FBQyxDQUFBO2dCQUNKLENBQUMsQ0FBQyxDQUFBO2FBQ0w7WUFDRCxPQUFPLElBQUksaUJBQVUsQ0FBQyxHQUFHLEVBQUU7WUFFM0IsQ0FBQyxDQUFDLENBQUE7UUFDSixDQUFDO0tBQ0YsQ0FBQTtBQUNILENBQUM7QUFsRkQsd0NBa0ZDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlzcG9zYWJsZSB9IGZyb20gJ2F0b20nXG5pbXBvcnQgKiBhcyBVUEkgZnJvbSAnYXRvbS1oYXNrZWxsLXVwaSdcbmltcG9ydCB0eXBlICogYXMgQXRvbUlERSBmcm9tICdhdG9tLWlkZS1iYXNlJ1xuXG5leHBvcnQgZnVuY3Rpb24gZGF0YXRpcEFkYXB0ZXIoXG4gIHJlZ2lzdGVyOiBVUEkuSVVQSVJlZ2lzdHJhdGlvbixcbiAgdXBpOiBVUEkuSVVQSUluc3RhbmNlLFxuICByZW5kZXJlcjogeyByZW5kZXI6IGFueSB9LFxuKTogQXRvbUlERS5EYXRhdGlwU2VydmljZSB7XG4gIGFzeW5jIGZ1bmN0aW9uIHJlbmRlck1hcmtlZFN0cmluZyhcbiAgICBzdHI6IEF0b21JREUuTWFya2VkU3RyaW5nLFxuICApOiBQcm9taXNlPFVQSS5UTWVzc2FnZT4ge1xuICAgIGlmIChyZW5kZXJlci5yZW5kZXIpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGh0bWw6IGF3YWl0IHJlbmRlcmVyLnJlbmRlcihzdHIudmFsdWUsICdzb3VyY2UuaGFza2VsbCcsIHtcbiAgICAgICAgICBBTExPV19VTktOT1dOX1BST1RPQ09MUzogdHJ1ZSxcbiAgICAgICAgfSksXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB7IHRleHQ6IHN0ci52YWx1ZSB9XG4gICAgfVxuICB9XG4gIGFzeW5jIGZ1bmN0aW9uIHJlbmRlck1hcmtlZFN0cmluZ3Moc3RyczogQXRvbUlERS5NYXJrZWRTdHJpbmdbXSkge1xuICAgIHJldHVybiBhd2FpdCBQcm9taXNlLmFsbChzdHJzLm1hcChyZW5kZXJNYXJrZWRTdHJpbmcpKVxuICB9XG4gIHJldHVybiB7XG4gICAgYWRkTW9kaWZpZXJQcm92aWRlcigpIHtcbiAgICAgIC8vIG5vdCBpbXBsZW1lbnRlZFxuICAgICAgcmV0dXJuIG5ldyBEaXNwb3NhYmxlKCgpID0+IHtcbiAgICAgICAgLypub29wKi9cbiAgICAgIH0pXG4gICAgfSxcbiAgICBhZGRQcm92aWRlcihwcm92aWRlcikge1xuICAgICAgY29uc3QgcHJvdmlkZXJVcGkgPSByZWdpc3Rlcih7XG4gICAgICAgIG5hbWU6ICdobHMnLFxuICAgICAgICB0b29sdGlwOiB7XG4gICAgICAgICAgcHJpb3JpdHk6IDEwMCxcbiAgICAgICAgICBldmVudFR5cGVzOiBbXG4gICAgICAgICAgICBVUEkuVEV2ZW50UmFuZ2VUeXBlLm1vdXNlLFxuICAgICAgICAgICAgVVBJLlRFdmVudFJhbmdlVHlwZS5zZWxlY3Rpb24sXG4gICAgICAgICAgXSxcbiAgICAgICAgICBoYW5kbGVyOiBhc3luYyBmdW5jdGlvbiAoXG4gICAgICAgICAgICBlZGl0b3IsXG4gICAgICAgICAgICByYW5nZSxcbiAgICAgICAgICApOiBQcm9taXNlPFVQSS5JVG9vbHRpcERhdGEgfCB1bmRlZmluZWQ+IHtcbiAgICAgICAgICAgIGNvbnN0IGRhdGF0aXAgPSBhd2FpdCBwcm92aWRlci5kYXRhdGlwKGVkaXRvciwgcmFuZ2Uuc3RhcnQpXG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IHRyaXBsZS1lcXVhbHNcbiAgICAgICAgICAgIGlmIChkYXRhdGlwICE9IHVuZGVmaW5lZCAmJiAnbWFya2VkU3RyaW5ncycgaW4gZGF0YXRpcCkge1xuICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHBlcnNpc3RlbnQ6IGRhdGF0aXAucGlubmFibGUsXG4gICAgICAgICAgICAgICAgcmFuZ2U6IGRhdGF0aXAucmFuZ2UsXG4gICAgICAgICAgICAgICAgdGV4dDogYXdhaXQgcmVuZGVyTWFya2VkU3RyaW5ncyhkYXRhdGlwLm1hcmtlZFN0cmluZ3MpLFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0pXG4gICAgICByZXR1cm4gcHJvdmlkZXJVcGlcbiAgICB9LFxuICAgIGNyZWF0ZVBpbm5lZERhdGFUaXAodGlwLCBlZGl0b3IpIHtcbiAgICAgIGlmICgnbWFya2VkU3RyaW5ncycgaW4gdGlwKSB7XG4gICAgICAgIHJlbmRlck1hcmtlZFN0cmluZ3ModGlwLm1hcmtlZFN0cmluZ3MpXG4gICAgICAgICAgLnRoZW4oKHRleHQpID0+IHtcbiAgICAgICAgICAgIHVwaS5zaG93VG9vbHRpcCh7XG4gICAgICAgICAgICAgIGVkaXRvcixcbiAgICAgICAgICAgICAgdG9vbHRpcDoge1xuICAgICAgICAgICAgICAgIHBlcnNpc3RlbnQ6IHRpcC5waW5uYWJsZSxcbiAgICAgICAgICAgICAgICByYW5nZTogdGlwLnJhbmdlLFxuICAgICAgICAgICAgICAgIHRleHQsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKChlOiBFcnJvcikgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlKVxuICAgICAgICAgICAgYXRvbS5ub3RpZmljYXRpb25zLmFkZEVycm9yKGUubmFtZSwge1xuICAgICAgICAgICAgICBzdGFjazogZS5zdGFjayxcbiAgICAgICAgICAgICAgZGV0YWlsOiBlLm1lc3NhZ2UsXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0pXG4gICAgICB9XG4gICAgICByZXR1cm4gbmV3IERpc3Bvc2FibGUoKCkgPT4ge1xuICAgICAgICAvKiBub29wICovXG4gICAgICB9KVxuICAgIH0sXG4gIH1cbn1cbiJdfQ==