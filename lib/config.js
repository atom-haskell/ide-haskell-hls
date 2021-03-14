"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.config = {
    haskell: {
        type: 'object',
        title: 'Haskell Language Server Settings',
        order: 0,
        properties: {
            formattingProvider: {
                title: 'Formatting provider',
                description: 'what formatter to use',
                type: 'string',
                order: 10,
                enum: ['floskell', 'ormolu', 'fourmolu', 'stylish-haskell', 'brittany'],
                default: 'ormolu',
            },
            formatOnImportOn: {
                title: 'Format on imports',
                description: 'whether to format after adding an import',
                type: 'boolean',
                order: 20,
                default: true,
            },
            maxNumberOfProblems: {
                title: 'Maximum number of problems to report',
                description: 'the maximum number of problems the server will send to the client',
                type: 'integer',
                order: 30,
                default: 100,
            },
            diagnosticsOnChange: {
                title: 'Diagnostics on change',
                description: '(currently unused)',
                type: 'boolean',
                order: 40,
                default: true,
            },
            completionSnippetsOn: {
                title: 'Completion snippets',
                description: 'whether to support completion snippets',
                type: 'boolean',
                order: 50,
                default: true,
            },
            liquidOn: {
                title: 'Liquid Haskell',
                description: 'whether to enable Liquid Haskell support (currently unused until the Liquid Haskell support is functional again)',
                type: 'boolean',
                order: 60,
                default: false,
            },
            hlintOn: {
                title: 'Hlint',
                description: 'whether to enable Hlint support',
                type: 'boolean',
                order: 70,
                default: true,
            },
            maxCompletions: {
                title: 'Hlint',
                description: 'maximum number of completions sent to the LSP client',
                type: 'integer',
                order: 80,
                default: 40,
            },
        },
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUF1RWEsUUFBQSxNQUFNLEdBQVk7SUFDN0IsT0FBTyxFQUFFO1FBQ1AsSUFBSSxFQUFFLFFBQVE7UUFDZCxLQUFLLEVBQUUsa0NBQWtDO1FBQ3pDLEtBQUssRUFBRSxDQUFDO1FBQ1IsVUFBVSxFQUFFO1lBRVYsa0JBQWtCLEVBQUU7Z0JBQ2xCLEtBQUssRUFBRSxxQkFBcUI7Z0JBQzVCLFdBQVcsRUFBRSx1QkFBdUI7Z0JBQ3BDLElBQUksRUFBRSxRQUFRO2dCQUNkLEtBQUssRUFBRSxFQUFFO2dCQUNULElBQUksRUFBRSxDQUFDLFVBQVUsRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLGlCQUFpQixFQUFFLFVBQVUsQ0FBQztnQkFDdkUsT0FBTyxFQUFFLFFBQVE7YUFDTztZQUUxQixnQkFBZ0IsRUFBRTtnQkFDaEIsS0FBSyxFQUFFLG1CQUFtQjtnQkFDMUIsV0FBVyxFQUFFLDBDQUEwQztnQkFDdkQsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsS0FBSyxFQUFFLEVBQUU7Z0JBQ1QsT0FBTyxFQUFFLElBQUk7YUFDWTtZQUUzQixtQkFBbUIsRUFBRTtnQkFDbkIsS0FBSyxFQUFFLHNDQUFzQztnQkFDN0MsV0FBVyxFQUNULG1FQUFtRTtnQkFDckUsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsS0FBSyxFQUFFLEVBQUU7Z0JBQ1QsT0FBTyxFQUFFLEdBQUc7YUFDYTtZQUUzQixtQkFBbUIsRUFBRTtnQkFDbkIsS0FBSyxFQUFFLHVCQUF1QjtnQkFDOUIsV0FBVyxFQUFFLG9CQUFvQjtnQkFDakMsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsS0FBSyxFQUFFLEVBQUU7Z0JBQ1QsT0FBTyxFQUFFLElBQUk7YUFDWTtZQUUzQixvQkFBb0IsRUFBRTtnQkFDcEIsS0FBSyxFQUFFLHFCQUFxQjtnQkFDNUIsV0FBVyxFQUFFLHdDQUF3QztnQkFDckQsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsS0FBSyxFQUFFLEVBQUU7Z0JBQ1QsT0FBTyxFQUFFLElBQUk7YUFDWTtZQUUzQixRQUFRLEVBQUU7Z0JBQ1IsS0FBSyxFQUFFLGdCQUFnQjtnQkFDdkIsV0FBVyxFQUNULGtIQUFrSDtnQkFDcEgsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsS0FBSyxFQUFFLEVBQUU7Z0JBQ1QsT0FBTyxFQUFFLEtBQUs7YUFDVztZQUUzQixPQUFPLEVBQUU7Z0JBQ1AsS0FBSyxFQUFFLE9BQU87Z0JBQ2QsV0FBVyxFQUFFLGlDQUFpQztnQkFDOUMsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsS0FBSyxFQUFFLEVBQUU7Z0JBQ1QsT0FBTyxFQUFFLElBQUk7YUFDWTtZQUUzQixjQUFjLEVBQUU7Z0JBQ2QsS0FBSyxFQUFFLE9BQU87Z0JBQ2QsV0FBVyxFQUFFLHNEQUFzRDtnQkFDbkUsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsS0FBSyxFQUFFLEVBQUU7Z0JBQ1QsT0FBTyxFQUFFLEVBQUU7YUFDYztTQUM1QjtLQUNGO0NBQ0YsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCB0eXBlIFR5cGUgPSAnYXJyYXknIHwgJ3N0cmluZycgfCAnYm9vbGVhbicgfCAnb2JqZWN0JyB8ICdpbnRlZ2VyJ1xuZXhwb3J0IHR5cGUgSXRlbVR5cGUgPSBUeXBlIHwgbmV2ZXJcbmV4cG9ydCB0eXBlIFR5cGVkQ29uZmlnPFxuICBUIGV4dGVuZHMgVHlwZSA9IFR5cGUsXG4gIFUgZXh0ZW5kcyBUeXBlIHwgbmV2ZXIgPSBUeXBlXG4+ID0gVHlwZWRQcm9wczxULCBVPiAmIHtcbiAgdHlwZTogVFxuICBpdGVtcz86IHtcbiAgICB0eXBlOiBUIGV4dGVuZHMgJ2FycmF5JyA/IFUgOiBuZXZlclxuICB9XG59XG5pbnRlcmZhY2UgQmFzaWNQcm9wczxUIGV4dGVuZHMgVHlwZT4ge1xuICB0aXRsZTogc3RyaW5nXG4gIG9yZGVyOiBudW1iZXJcbiAgdHlwZTogVFxuICBkZXNjcmlwdGlvbj86IHN0cmluZ1xufVxudHlwZSBUeXBlRnJvbVR5cGVEZXNjPFQgZXh0ZW5kcyBUeXBlLCBVIGV4dGVuZHMgSXRlbVR5cGU+ID0gVCBleHRlbmRzICdzdHJpbmcnXG4gID8gc3RyaW5nXG4gIDogVCBleHRlbmRzICdib29sZWFuJ1xuICA/IGJvb2xlYW5cbiAgOiBUIGV4dGVuZHMgJ29iamVjdCdcbiAgPyBJQ29uZmlnXG4gIDogVCBleHRlbmRzICdpbnRlZ2VyJ1xuICA/IG51bWJlclxuICA6IFQgZXh0ZW5kcyAnYXJyYXknXG4gID8gUmVhZG9ubHlBcnJheTxVPlxuICA6IG5ldmVyXG50eXBlIEVudW1EZXNjPFQ+ID1cbiAgfCBSZWFkb25seUFycmF5PFQ+XG4gIHwgUmVhZG9ubHlBcnJheTx7IHZhbHVlOiBUOyBkZXNjcmlwdGlvbjogc3RyaW5nIH0+XG5pbnRlcmZhY2UgU3RyaW5nUHJvcHMge1xuICBlbnVtPzogRW51bURlc2M8c3RyaW5nPlxuICBkZWZhdWx0OiBzdHJpbmdcbn1cbmludGVyZmFjZSBJbnRQcm9wcyB7XG4gIG1pbmltdW0/OiBudW1iZXJcbiAgbWF4aW11bT86IG51bWJlclxuICBkZWZhdWx0OiBudW1iZXJcbiAgZW51bT86IEVudW1EZXNjPG51bWJlcj5cbn1cbmludGVyZmFjZSBBcnJheVByb3BzPFUgZXh0ZW5kcyBUeXBlPiB7XG4gIGl0ZW1zOiB7XG4gICAgdHlwZTogVVxuICB9XG4gIGRlZmF1bHQ6IFJlYWRvbmx5QXJyYXk8VHlwZUZyb21UeXBlRGVzYzxVLCBuZXZlcj4+XG4gIGVudW0/OiBFbnVtRGVzYzxSZWFkb25seUFycmF5PFR5cGVGcm9tVHlwZURlc2M8VSwgbmV2ZXI+Pj5cbn1cbmludGVyZmFjZSBPYmplY3RQcm9wcyB7XG4gIHByb3BlcnRpZXM6IElDb25maWdcbn1cbmludGVyZmFjZSBCb29sUHJvcHMge1xuICBkZWZhdWx0OiBib29sZWFuXG4gIGVudW0/OiBFbnVtRGVzYzxib29sZWFuPlxufVxudHlwZSBUeXBlZFByb3BzPFQgZXh0ZW5kcyBUeXBlLCBVIGV4dGVuZHMgSXRlbVR5cGU+ID0gQmFzaWNQcm9wczxUPiAmXG4gIChUIGV4dGVuZHMgJ3N0cmluZydcbiAgICA/IFN0cmluZ1Byb3BzXG4gICAgOiBUIGV4dGVuZHMgJ2Jvb2xlYW4nXG4gICAgPyBCb29sUHJvcHNcbiAgICA6IFQgZXh0ZW5kcyAnb2JqZWN0J1xuICAgID8gT2JqZWN0UHJvcHNcbiAgICA6IFQgZXh0ZW5kcyAnaW50ZWdlcidcbiAgICA/IEludFByb3BzXG4gICAgOiBUIGV4dGVuZHMgJ2FycmF5J1xuICAgID8gQXJyYXlQcm9wczxVPlxuICAgIDogbmV2ZXIpXG5leHBvcnQgaW50ZXJmYWNlIElDb25maWcge1xuICBba2V5OiBzdHJpbmddOiBUeXBlZENvbmZpZ1xufVxuXG5leHBvcnQgY29uc3QgY29uZmlnOiBJQ29uZmlnID0ge1xuICBoYXNrZWxsOiB7XG4gICAgdHlwZTogJ29iamVjdCcsXG4gICAgdGl0bGU6ICdIYXNrZWxsIExhbmd1YWdlIFNlcnZlciBTZXR0aW5ncycsXG4gICAgb3JkZXI6IDAsXG4gICAgcHJvcGVydGllczoge1xuICAgICAgLy8gRm9ybWF0dGluZyBwcm92aWRlciAoaGFza2VsbC5mb3JtYXR0aW5nUHJvdmlkZXIsIGRlZmF1bHQgb3Jtb2x1KTogd2hhdCBmb3JtYXR0ZXIgdG8gdXNlOyBvbmUgb2YgZmxvc2tlbGwsIG9ybW9sdSwgZm91cm1vbHUsIHN0eWxpc2gtaGFza2VsbCwgb3IgYnJpdHRhbnkgKGlmIGNvbXBpbGVkIHdpdGggQUdQTClcbiAgICAgIGZvcm1hdHRpbmdQcm92aWRlcjoge1xuICAgICAgICB0aXRsZTogJ0Zvcm1hdHRpbmcgcHJvdmlkZXInLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ3doYXQgZm9ybWF0dGVyIHRvIHVzZScsXG4gICAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgICAgICBvcmRlcjogMTAsXG4gICAgICAgIGVudW06IFsnZmxvc2tlbGwnLCAnb3Jtb2x1JywgJ2ZvdXJtb2x1JywgJ3N0eWxpc2gtaGFza2VsbCcsICdicml0dGFueSddLFxuICAgICAgICBkZWZhdWx0OiAnb3Jtb2x1JyxcbiAgICAgIH0gYXMgVHlwZWRDb25maWc8J3N0cmluZyc+LFxuICAgICAgLy8gRm9ybWF0IG9uIGltcG9ydHMgKGhhc2tlbGwuZm9ybWF0T25JbXBvcnRPbiwgZGVmYXVsdCB0cnVlKTogd2hldGhlciB0byBmb3JtYXQgYWZ0ZXIgYWRkaW5nIGFuIGltcG9ydFxuICAgICAgZm9ybWF0T25JbXBvcnRPbjoge1xuICAgICAgICB0aXRsZTogJ0Zvcm1hdCBvbiBpbXBvcnRzJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICd3aGV0aGVyIHRvIGZvcm1hdCBhZnRlciBhZGRpbmcgYW4gaW1wb3J0JyxcbiAgICAgICAgdHlwZTogJ2Jvb2xlYW4nLFxuICAgICAgICBvcmRlcjogMjAsXG4gICAgICAgIGRlZmF1bHQ6IHRydWUsXG4gICAgICB9IGFzIFR5cGVkQ29uZmlnPCdib29sZWFuJz4sXG4gICAgICAvLyBNYXhpbXVtIG51bWJlciBvZiBwcm9ibGVtcyB0byByZXBvcnQgKGhhc2tlbGwubWF4TnVtYmVyT2ZQcm9ibGVtcywgZGVmYXVsdCAxMDApOiB0aGUgbWF4aW11bSBudW1iZXIgb2YgcHJvYmxlbXMgdGhlIHNlcnZlciB3aWxsIHNlbmQgdG8gdGhlIGNsaWVudFxuICAgICAgbWF4TnVtYmVyT2ZQcm9ibGVtczoge1xuICAgICAgICB0aXRsZTogJ01heGltdW0gbnVtYmVyIG9mIHByb2JsZW1zIHRvIHJlcG9ydCcsXG4gICAgICAgIGRlc2NyaXB0aW9uOlxuICAgICAgICAgICd0aGUgbWF4aW11bSBudW1iZXIgb2YgcHJvYmxlbXMgdGhlIHNlcnZlciB3aWxsIHNlbmQgdG8gdGhlIGNsaWVudCcsXG4gICAgICAgIHR5cGU6ICdpbnRlZ2VyJyxcbiAgICAgICAgb3JkZXI6IDMwLFxuICAgICAgICBkZWZhdWx0OiAxMDAsXG4gICAgICB9IGFzIFR5cGVkQ29uZmlnPCdpbnRlZ2VyJz4sXG4gICAgICAvLyBEaWFnbm9zdGljcyBvbiBjaGFuZ2UgKGhhc2tlbGwuZGlhZ25vc3RpY3NPbkNoYW5nZSwgZGVmYXVsdCB0cnVlKTogKGN1cnJlbnRseSB1bnVzZWQpXG4gICAgICBkaWFnbm9zdGljc09uQ2hhbmdlOiB7XG4gICAgICAgIHRpdGxlOiAnRGlhZ25vc3RpY3Mgb24gY2hhbmdlJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICcoY3VycmVudGx5IHVudXNlZCknLFxuICAgICAgICB0eXBlOiAnYm9vbGVhbicsXG4gICAgICAgIG9yZGVyOiA0MCxcbiAgICAgICAgZGVmYXVsdDogdHJ1ZSxcbiAgICAgIH0gYXMgVHlwZWRDb25maWc8J2Jvb2xlYW4nPixcbiAgICAgIC8vIENvbXBsZXRpb24gc25pcHBldHMgKGhhc2tlbGwuY29tcGxldGlvblNuaXBwZXRzT24sIGRlZmF1bHQgdHJ1ZSk6IHdoZXRoZXIgdG8gc3VwcG9ydCBjb21wbGV0aW9uIHNuaXBwZXRzXG4gICAgICBjb21wbGV0aW9uU25pcHBldHNPbjoge1xuICAgICAgICB0aXRsZTogJ0NvbXBsZXRpb24gc25pcHBldHMnLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ3doZXRoZXIgdG8gc3VwcG9ydCBjb21wbGV0aW9uIHNuaXBwZXRzJyxcbiAgICAgICAgdHlwZTogJ2Jvb2xlYW4nLFxuICAgICAgICBvcmRlcjogNTAsXG4gICAgICAgIGRlZmF1bHQ6IHRydWUsXG4gICAgICB9IGFzIFR5cGVkQ29uZmlnPCdib29sZWFuJz4sXG4gICAgICAvLyBMaXF1aWQgSGFza2VsbCAoaGFza2VsbC5saXF1aWRPbiwgZGVmYXVsdCBmYWxzZSk6IHdoZXRoZXIgdG8gZW5hYmxlIExpcXVpZCBIYXNrZWxsIHN1cHBvcnQgKGN1cnJlbnRseSB1bnVzZWQgdW50aWwgdGhlIExpcXVpZCBIYXNrZWxsIHN1cHBvcnQgaXMgZnVuY3Rpb25hbCBhZ2FpbilcbiAgICAgIGxpcXVpZE9uOiB7XG4gICAgICAgIHRpdGxlOiAnTGlxdWlkIEhhc2tlbGwnLFxuICAgICAgICBkZXNjcmlwdGlvbjpcbiAgICAgICAgICAnd2hldGhlciB0byBlbmFibGUgTGlxdWlkIEhhc2tlbGwgc3VwcG9ydCAoY3VycmVudGx5IHVudXNlZCB1bnRpbCB0aGUgTGlxdWlkIEhhc2tlbGwgc3VwcG9ydCBpcyBmdW5jdGlvbmFsIGFnYWluKScsXG4gICAgICAgIHR5cGU6ICdib29sZWFuJyxcbiAgICAgICAgb3JkZXI6IDYwLFxuICAgICAgICBkZWZhdWx0OiBmYWxzZSxcbiAgICAgIH0gYXMgVHlwZWRDb25maWc8J2Jvb2xlYW4nPixcbiAgICAgIC8vIEhsaW50IChoYXNrZWxsLmhsaW50T24sIGRlZmF1bHQgdHJ1ZSk6IHdoZXRoZXIgdG8gZW5hYmxlIEhsaW50IHN1cHBvcnRcbiAgICAgIGhsaW50T246IHtcbiAgICAgICAgdGl0bGU6ICdIbGludCcsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnd2hldGhlciB0byBlbmFibGUgSGxpbnQgc3VwcG9ydCcsXG4gICAgICAgIHR5cGU6ICdib29sZWFuJyxcbiAgICAgICAgb3JkZXI6IDcwLFxuICAgICAgICBkZWZhdWx0OiB0cnVlLFxuICAgICAgfSBhcyBUeXBlZENvbmZpZzwnYm9vbGVhbic+LFxuICAgICAgLy8gTWF4IGNvbXBsZXRpb25zIChoYXNrZWxsLm1heENvbXBsZXRpb25zLCBkZWZhdWx0IDQwKTogbWF4aW11bSBudW1iZXIgb2YgY29tcGxldGlvbnMgc2VudCB0byB0aGUgTFNQIGNsaWVudC5cbiAgICAgIG1heENvbXBsZXRpb25zOiB7XG4gICAgICAgIHRpdGxlOiAnSGxpbnQnLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ21heGltdW0gbnVtYmVyIG9mIGNvbXBsZXRpb25zIHNlbnQgdG8gdGhlIExTUCBjbGllbnQnLFxuICAgICAgICB0eXBlOiAnaW50ZWdlcicsXG4gICAgICAgIG9yZGVyOiA4MCxcbiAgICAgICAgZGVmYXVsdDogNDAsXG4gICAgICB9IGFzIFR5cGVkQ29uZmlnPCdpbnRlZ2VyJz4sXG4gICAgfSxcbiAgfSxcbn1cbiJdfQ==