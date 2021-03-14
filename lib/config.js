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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUF5RWEsUUFBQSxNQUFNLEdBQVk7SUFDN0IsT0FBTyxFQUFPO1FBQ1osSUFBSSxFQUFFLFFBQVE7UUFDZCxLQUFLLEVBQUUsa0NBQWtDO1FBQ3pDLEtBQUssRUFBRSxDQUFDO1FBQ1IsVUFBVSxFQUFFO1lBRVYsa0JBQWtCLEVBQU87Z0JBQ3ZCLEtBQUssRUFBRSxxQkFBcUI7Z0JBQzVCLFdBQVcsRUFBRSx1QkFBdUI7Z0JBQ3BDLElBQUksRUFBRSxRQUFRO2dCQUNkLEtBQUssRUFBRSxFQUFFO2dCQUNULElBQUksRUFBRSxDQUFDLFVBQVUsRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLGlCQUFpQixFQUFFLFVBQVUsQ0FBQztnQkFDdkUsT0FBTyxFQUFFLFFBQVE7YUFDbEI7WUFFRCxnQkFBZ0IsRUFBUTtnQkFDdEIsS0FBSyxFQUFFLG1CQUFtQjtnQkFDMUIsV0FBVyxFQUFFLDBDQUEwQztnQkFDdkQsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsS0FBSyxFQUFFLEVBQUU7Z0JBQ1QsT0FBTyxFQUFFLElBQUk7YUFDZDtZQUVELG1CQUFtQixFQUFPO2dCQUN4QixLQUFLLEVBQUUsc0NBQXNDO2dCQUM3QyxXQUFXLEVBQ1QsbUVBQW1FO2dCQUNyRSxJQUFJLEVBQUUsU0FBUztnQkFDZixLQUFLLEVBQUUsRUFBRTtnQkFDVCxPQUFPLEVBQUUsR0FBRzthQUNiO1lBRUQsbUJBQW1CLEVBQVE7Z0JBQ3pCLEtBQUssRUFBRSx1QkFBdUI7Z0JBQzlCLFdBQVcsRUFBRSxvQkFBb0I7Z0JBQ2pDLElBQUksRUFBRSxTQUFTO2dCQUNmLEtBQUssRUFBRSxFQUFFO2dCQUNULE9BQU8sRUFBRSxJQUFJO2FBQ2Q7WUFFRCxvQkFBb0IsRUFBUTtnQkFDMUIsS0FBSyxFQUFFLHFCQUFxQjtnQkFDNUIsV0FBVyxFQUFFLHdDQUF3QztnQkFDckQsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsS0FBSyxFQUFFLEVBQUU7Z0JBQ1QsT0FBTyxFQUFFLElBQUk7YUFDZDtZQUVELFFBQVEsRUFBUTtnQkFDZCxLQUFLLEVBQUUsZ0JBQWdCO2dCQUN2QixXQUFXLEVBQ1Qsa0hBQWtIO2dCQUNwSCxJQUFJLEVBQUUsU0FBUztnQkFDZixLQUFLLEVBQUUsRUFBRTtnQkFDVCxPQUFPLEVBQUUsS0FBSzthQUNmO1lBRUQsT0FBTyxFQUFRO2dCQUNiLEtBQUssRUFBRSxPQUFPO2dCQUNkLFdBQVcsRUFBRSxpQ0FBaUM7Z0JBQzlDLElBQUksRUFBRSxTQUFTO2dCQUNmLEtBQUssRUFBRSxFQUFFO2dCQUNULE9BQU8sRUFBRSxJQUFJO2FBQ2Q7WUFFRCxjQUFjLEVBQU87Z0JBQ25CLEtBQUssRUFBRSxPQUFPO2dCQUNkLFdBQVcsRUFBRSxzREFBc0Q7Z0JBQ25FLElBQUksRUFBRSxTQUFTO2dCQUNmLEtBQUssRUFBRSxFQUFFO2dCQUNULE9BQU8sRUFBRSxFQUFFO2FBQ1o7U0FDRjtLQUNGO0NBQ0YsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCB0eXBlIFR5cGUgPSAnYXJyYXknIHwgJ3N0cmluZycgfCAnYm9vbGVhbicgfCAnb2JqZWN0JyB8ICdpbnRlZ2VyJ1xuZXhwb3J0IHR5cGUgSXRlbVR5cGUgPSBUeXBlIHwgbmV2ZXJcbmV4cG9ydCB0eXBlIFR5cGVkQ29uZmlnPFxuICBUIGV4dGVuZHMgVHlwZSA9IFR5cGUsXG4gIFUgZXh0ZW5kcyBUeXBlIHwgbmV2ZXIgPSBUeXBlXG4+ID0gVHlwZWRQcm9wczxULCBVPiAmIHtcbiAgdHlwZTogVFxufVxuaW50ZXJmYWNlIEJhc2ljUHJvcHM8VCBleHRlbmRzIFR5cGU+IHtcbiAgdGl0bGU6IHN0cmluZ1xuICBvcmRlcjogbnVtYmVyXG4gIHR5cGU6IFRcbiAgZGVzY3JpcHRpb24/OiBzdHJpbmdcbn1cbnR5cGUgVHlwZUZyb21UeXBlRGVzYzxUIGV4dGVuZHMgVHlwZSwgVSBleHRlbmRzIEl0ZW1UeXBlPiA9IFQgZXh0ZW5kcyAnc3RyaW5nJ1xuICA/IHN0cmluZ1xuICA6IFQgZXh0ZW5kcyAnYm9vbGVhbidcbiAgPyBib29sZWFuXG4gIDogVCBleHRlbmRzICdvYmplY3QnXG4gID8gSUNvbmZpZ1xuICA6IFQgZXh0ZW5kcyAnaW50ZWdlcidcbiAgPyBudW1iZXJcbiAgOiBUIGV4dGVuZHMgJ2FycmF5J1xuICA/IFJlYWRvbmx5QXJyYXk8VT5cbiAgOiBuZXZlclxudHlwZSBFbnVtRGVzYzxUPiA9XG4gIHwgUmVhZG9ubHlBcnJheTxUPlxuICB8IFJlYWRvbmx5QXJyYXk8eyB2YWx1ZTogVDsgZGVzY3JpcHRpb246IHN0cmluZyB9PlxuaW50ZXJmYWNlIFN0cmluZ1Byb3BzIHtcbiAgZW51bT86IEVudW1EZXNjPHN0cmluZz5cbiAgZGVmYXVsdDogc3RyaW5nXG59XG5pbnRlcmZhY2UgSW50UHJvcHMge1xuICBtaW5pbXVtPzogbnVtYmVyXG4gIG1heGltdW0/OiBudW1iZXJcbiAgZGVmYXVsdDogbnVtYmVyXG4gIGVudW0/OiBFbnVtRGVzYzxudW1iZXI+XG59XG5pbnRlcmZhY2UgQXJyYXlQcm9wczxVIGV4dGVuZHMgVHlwZT4ge1xuICBpdGVtczoge1xuICAgIHR5cGU6IFVcbiAgfVxuICBkZWZhdWx0OiBSZWFkb25seUFycmF5PFR5cGVGcm9tVHlwZURlc2M8VSwgbmV2ZXI+PlxuICBlbnVtPzogRW51bURlc2M8UmVhZG9ubHlBcnJheTxUeXBlRnJvbVR5cGVEZXNjPFUsIG5ldmVyPj4+XG59XG5pbnRlcmZhY2UgT2JqZWN0UHJvcHMge1xuICBwcm9wZXJ0aWVzOiBJQ29uZmlnXG59XG5pbnRlcmZhY2UgQm9vbFByb3BzIHtcbiAgZGVmYXVsdDogYm9vbGVhblxuICBlbnVtPzogRW51bURlc2M8Ym9vbGVhbj5cbn1cbnR5cGUgVHlwZWRQcm9wczxUIGV4dGVuZHMgVHlwZSwgVSBleHRlbmRzIEl0ZW1UeXBlPiA9IEJhc2ljUHJvcHM8VD4gJlxuICAoVCBleHRlbmRzICdzdHJpbmcnXG4gICAgPyBTdHJpbmdQcm9wc1xuICAgIDogVCBleHRlbmRzICdib29sZWFuJ1xuICAgID8gQm9vbFByb3BzXG4gICAgOiBUIGV4dGVuZHMgJ29iamVjdCdcbiAgICA/IE9iamVjdFByb3BzXG4gICAgOiBUIGV4dGVuZHMgJ2ludGVnZXInXG4gICAgPyBJbnRQcm9wc1xuICAgIDogVCBleHRlbmRzICdhcnJheSdcbiAgICA/IEFycmF5UHJvcHM8VT5cbiAgICA6IG5ldmVyKVxuZXhwb3J0IGludGVyZmFjZSBJQ29uZmlnIHtcbiAgW2tleTogc3RyaW5nXTogVHlwZWRDb25maWdcbn1cbmV4cG9ydCB0eXBlIE9iaiA9IFR5cGVkQ29uZmlnPCdvYmplY3QnPlxuZXhwb3J0IHR5cGUgU3RyID0gVHlwZWRDb25maWc8J3N0cmluZyc+XG5leHBvcnQgdHlwZSBCb29sID0gVHlwZWRDb25maWc8J2Jvb2xlYW4nPlxuZXhwb3J0IHR5cGUgSW50ID0gVHlwZWRDb25maWc8J2ludGVnZXInPlxuZXhwb3J0IHR5cGUgQXJyPFUgZXh0ZW5kcyBUeXBlPiA9IFR5cGVkQ29uZmlnPCdhcnJheScsIFU+XG5cbmV4cG9ydCBjb25zdCBjb25maWc6IElDb25maWcgPSB7XG4gIGhhc2tlbGw6IDxPYmo+e1xuICAgIHR5cGU6ICdvYmplY3QnLFxuICAgIHRpdGxlOiAnSGFza2VsbCBMYW5ndWFnZSBTZXJ2ZXIgU2V0dGluZ3MnLFxuICAgIG9yZGVyOiAwLFxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgIC8vIEZvcm1hdHRpbmcgcHJvdmlkZXIgKGhhc2tlbGwuZm9ybWF0dGluZ1Byb3ZpZGVyLCBkZWZhdWx0IG9ybW9sdSk6IHdoYXQgZm9ybWF0dGVyIHRvIHVzZTsgb25lIG9mIGZsb3NrZWxsLCBvcm1vbHUsIGZvdXJtb2x1LCBzdHlsaXNoLWhhc2tlbGwsIG9yIGJyaXR0YW55IChpZiBjb21waWxlZCB3aXRoIEFHUEwpXG4gICAgICBmb3JtYXR0aW5nUHJvdmlkZXI6IDxTdHI+e1xuICAgICAgICB0aXRsZTogJ0Zvcm1hdHRpbmcgcHJvdmlkZXInLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ3doYXQgZm9ybWF0dGVyIHRvIHVzZScsXG4gICAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgICAgICBvcmRlcjogMTAsXG4gICAgICAgIGVudW06IFsnZmxvc2tlbGwnLCAnb3Jtb2x1JywgJ2ZvdXJtb2x1JywgJ3N0eWxpc2gtaGFza2VsbCcsICdicml0dGFueSddLFxuICAgICAgICBkZWZhdWx0OiAnb3Jtb2x1JyxcbiAgICAgIH0sXG4gICAgICAvLyBGb3JtYXQgb24gaW1wb3J0cyAoaGFza2VsbC5mb3JtYXRPbkltcG9ydE9uLCBkZWZhdWx0IHRydWUpOiB3aGV0aGVyIHRvIGZvcm1hdCBhZnRlciBhZGRpbmcgYW4gaW1wb3J0XG4gICAgICBmb3JtYXRPbkltcG9ydE9uOiA8Qm9vbD57XG4gICAgICAgIHRpdGxlOiAnRm9ybWF0IG9uIGltcG9ydHMnLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ3doZXRoZXIgdG8gZm9ybWF0IGFmdGVyIGFkZGluZyBhbiBpbXBvcnQnLFxuICAgICAgICB0eXBlOiAnYm9vbGVhbicsXG4gICAgICAgIG9yZGVyOiAyMCxcbiAgICAgICAgZGVmYXVsdDogdHJ1ZSxcbiAgICAgIH0sXG4gICAgICAvLyBNYXhpbXVtIG51bWJlciBvZiBwcm9ibGVtcyB0byByZXBvcnQgKGhhc2tlbGwubWF4TnVtYmVyT2ZQcm9ibGVtcywgZGVmYXVsdCAxMDApOiB0aGUgbWF4aW11bSBudW1iZXIgb2YgcHJvYmxlbXMgdGhlIHNlcnZlciB3aWxsIHNlbmQgdG8gdGhlIGNsaWVudFxuICAgICAgbWF4TnVtYmVyT2ZQcm9ibGVtczogPEludD57XG4gICAgICAgIHRpdGxlOiAnTWF4aW11bSBudW1iZXIgb2YgcHJvYmxlbXMgdG8gcmVwb3J0JyxcbiAgICAgICAgZGVzY3JpcHRpb246XG4gICAgICAgICAgJ3RoZSBtYXhpbXVtIG51bWJlciBvZiBwcm9ibGVtcyB0aGUgc2VydmVyIHdpbGwgc2VuZCB0byB0aGUgY2xpZW50JyxcbiAgICAgICAgdHlwZTogJ2ludGVnZXInLFxuICAgICAgICBvcmRlcjogMzAsXG4gICAgICAgIGRlZmF1bHQ6IDEwMCxcbiAgICAgIH0sXG4gICAgICAvLyBEaWFnbm9zdGljcyBvbiBjaGFuZ2UgKGhhc2tlbGwuZGlhZ25vc3RpY3NPbkNoYW5nZSwgZGVmYXVsdCB0cnVlKTogKGN1cnJlbnRseSB1bnVzZWQpXG4gICAgICBkaWFnbm9zdGljc09uQ2hhbmdlOiA8Qm9vbD57XG4gICAgICAgIHRpdGxlOiAnRGlhZ25vc3RpY3Mgb24gY2hhbmdlJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICcoY3VycmVudGx5IHVudXNlZCknLFxuICAgICAgICB0eXBlOiAnYm9vbGVhbicsXG4gICAgICAgIG9yZGVyOiA0MCxcbiAgICAgICAgZGVmYXVsdDogdHJ1ZSxcbiAgICAgIH0sXG4gICAgICAvLyBDb21wbGV0aW9uIHNuaXBwZXRzIChoYXNrZWxsLmNvbXBsZXRpb25TbmlwcGV0c09uLCBkZWZhdWx0IHRydWUpOiB3aGV0aGVyIHRvIHN1cHBvcnQgY29tcGxldGlvbiBzbmlwcGV0c1xuICAgICAgY29tcGxldGlvblNuaXBwZXRzT246IDxCb29sPntcbiAgICAgICAgdGl0bGU6ICdDb21wbGV0aW9uIHNuaXBwZXRzJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICd3aGV0aGVyIHRvIHN1cHBvcnQgY29tcGxldGlvbiBzbmlwcGV0cycsXG4gICAgICAgIHR5cGU6ICdib29sZWFuJyxcbiAgICAgICAgb3JkZXI6IDUwLFxuICAgICAgICBkZWZhdWx0OiB0cnVlLFxuICAgICAgfSxcbiAgICAgIC8vIExpcXVpZCBIYXNrZWxsIChoYXNrZWxsLmxpcXVpZE9uLCBkZWZhdWx0IGZhbHNlKTogd2hldGhlciB0byBlbmFibGUgTGlxdWlkIEhhc2tlbGwgc3VwcG9ydCAoY3VycmVudGx5IHVudXNlZCB1bnRpbCB0aGUgTGlxdWlkIEhhc2tlbGwgc3VwcG9ydCBpcyBmdW5jdGlvbmFsIGFnYWluKVxuICAgICAgbGlxdWlkT246IDxCb29sPntcbiAgICAgICAgdGl0bGU6ICdMaXF1aWQgSGFza2VsbCcsXG4gICAgICAgIGRlc2NyaXB0aW9uOlxuICAgICAgICAgICd3aGV0aGVyIHRvIGVuYWJsZSBMaXF1aWQgSGFza2VsbCBzdXBwb3J0IChjdXJyZW50bHkgdW51c2VkIHVudGlsIHRoZSBMaXF1aWQgSGFza2VsbCBzdXBwb3J0IGlzIGZ1bmN0aW9uYWwgYWdhaW4pJyxcbiAgICAgICAgdHlwZTogJ2Jvb2xlYW4nLFxuICAgICAgICBvcmRlcjogNjAsXG4gICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxuICAgICAgfSxcbiAgICAgIC8vIEhsaW50IChoYXNrZWxsLmhsaW50T24sIGRlZmF1bHQgdHJ1ZSk6IHdoZXRoZXIgdG8gZW5hYmxlIEhsaW50IHN1cHBvcnRcbiAgICAgIGhsaW50T246IDxCb29sPntcbiAgICAgICAgdGl0bGU6ICdIbGludCcsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnd2hldGhlciB0byBlbmFibGUgSGxpbnQgc3VwcG9ydCcsXG4gICAgICAgIHR5cGU6ICdib29sZWFuJyxcbiAgICAgICAgb3JkZXI6IDcwLFxuICAgICAgICBkZWZhdWx0OiB0cnVlLFxuICAgICAgfSxcbiAgICAgIC8vIE1heCBjb21wbGV0aW9ucyAoaGFza2VsbC5tYXhDb21wbGV0aW9ucywgZGVmYXVsdCA0MCk6IG1heGltdW0gbnVtYmVyIG9mIGNvbXBsZXRpb25zIHNlbnQgdG8gdGhlIExTUCBjbGllbnQuXG4gICAgICBtYXhDb21wbGV0aW9uczogPEludD57XG4gICAgICAgIHRpdGxlOiAnSGxpbnQnLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ21heGltdW0gbnVtYmVyIG9mIGNvbXBsZXRpb25zIHNlbnQgdG8gdGhlIExTUCBjbGllbnQnLFxuICAgICAgICB0eXBlOiAnaW50ZWdlcicsXG4gICAgICAgIG9yZGVyOiA4MCxcbiAgICAgICAgZGVmYXVsdDogNDAsXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG59XG4iXX0=