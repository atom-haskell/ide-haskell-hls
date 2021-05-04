"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.config = {
    binaryPath: {
        type: 'string',
        default: 'haskell-language-server-wrapper',
        description: 'Full path of the Haskell Language Server wrapper binary',
        order: -10,
        title: 'haskell-language-server-wrapper binary path',
    },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUF5RWEsUUFBQSxNQUFNLEdBQVk7SUFDN0IsVUFBVSxFQUFPO1FBQ2YsSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUsaUNBQWlDO1FBQzFDLFdBQVcsRUFBRSx5REFBeUQ7UUFDdEUsS0FBSyxFQUFFLENBQUMsRUFBRTtRQUNWLEtBQUssRUFBRSw2Q0FBNkM7S0FDckQ7SUFDRCxPQUFPLEVBQU87UUFDWixJQUFJLEVBQUUsUUFBUTtRQUNkLEtBQUssRUFBRSxrQ0FBa0M7UUFDekMsS0FBSyxFQUFFLENBQUM7UUFDUixVQUFVLEVBQUU7WUFFVixrQkFBa0IsRUFBTztnQkFDdkIsS0FBSyxFQUFFLHFCQUFxQjtnQkFDNUIsV0FBVyxFQUFFLHVCQUF1QjtnQkFDcEMsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsS0FBSyxFQUFFLEVBQUU7Z0JBQ1QsSUFBSSxFQUFFLENBQUMsVUFBVSxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsaUJBQWlCLEVBQUUsVUFBVSxDQUFDO2dCQUN2RSxPQUFPLEVBQUUsUUFBUTthQUNsQjtZQUVELGdCQUFnQixFQUFRO2dCQUN0QixLQUFLLEVBQUUsbUJBQW1CO2dCQUMxQixXQUFXLEVBQUUsMENBQTBDO2dCQUN2RCxJQUFJLEVBQUUsU0FBUztnQkFDZixLQUFLLEVBQUUsRUFBRTtnQkFDVCxPQUFPLEVBQUUsSUFBSTthQUNkO1lBRUQsbUJBQW1CLEVBQU87Z0JBQ3hCLEtBQUssRUFBRSxzQ0FBc0M7Z0JBQzdDLFdBQVcsRUFDVCxtRUFBbUU7Z0JBQ3JFLElBQUksRUFBRSxTQUFTO2dCQUNmLEtBQUssRUFBRSxFQUFFO2dCQUNULE9BQU8sRUFBRSxHQUFHO2FBQ2I7WUFFRCxtQkFBbUIsRUFBUTtnQkFDekIsS0FBSyxFQUFFLHVCQUF1QjtnQkFDOUIsV0FBVyxFQUFFLG9CQUFvQjtnQkFDakMsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsS0FBSyxFQUFFLEVBQUU7Z0JBQ1QsT0FBTyxFQUFFLElBQUk7YUFDZDtZQUVELG9CQUFvQixFQUFRO2dCQUMxQixLQUFLLEVBQUUscUJBQXFCO2dCQUM1QixXQUFXLEVBQUUsd0NBQXdDO2dCQUNyRCxJQUFJLEVBQUUsU0FBUztnQkFDZixLQUFLLEVBQUUsRUFBRTtnQkFDVCxPQUFPLEVBQUUsSUFBSTthQUNkO1lBRUQsUUFBUSxFQUFRO2dCQUNkLEtBQUssRUFBRSxnQkFBZ0I7Z0JBQ3ZCLFdBQVcsRUFDVCxrSEFBa0g7Z0JBQ3BILElBQUksRUFBRSxTQUFTO2dCQUNmLEtBQUssRUFBRSxFQUFFO2dCQUNULE9BQU8sRUFBRSxLQUFLO2FBQ2Y7WUFFRCxPQUFPLEVBQVE7Z0JBQ2IsS0FBSyxFQUFFLE9BQU87Z0JBQ2QsV0FBVyxFQUFFLGlDQUFpQztnQkFDOUMsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsS0FBSyxFQUFFLEVBQUU7Z0JBQ1QsT0FBTyxFQUFFLElBQUk7YUFDZDtZQUVELGNBQWMsRUFBTztnQkFDbkIsS0FBSyxFQUFFLE9BQU87Z0JBQ2QsV0FBVyxFQUFFLHNEQUFzRDtnQkFDbkUsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsS0FBSyxFQUFFLEVBQUU7Z0JBQ1QsT0FBTyxFQUFFLEVBQUU7YUFDWjtTQUNGO0tBQ0Y7Q0FDRixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IHR5cGUgVHlwZSA9ICdhcnJheScgfCAnc3RyaW5nJyB8ICdib29sZWFuJyB8ICdvYmplY3QnIHwgJ2ludGVnZXInXG5leHBvcnQgdHlwZSBJdGVtVHlwZSA9IFR5cGUgfCBuZXZlclxuZXhwb3J0IHR5cGUgVHlwZWRDb25maWc8XG4gIFQgZXh0ZW5kcyBUeXBlID0gVHlwZSxcbiAgVSBleHRlbmRzIFR5cGUgfCBuZXZlciA9IFR5cGVcbj4gPSBUeXBlZFByb3BzPFQsIFU+ICYge1xuICB0eXBlOiBUXG59XG5pbnRlcmZhY2UgQmFzaWNQcm9wczxUIGV4dGVuZHMgVHlwZT4ge1xuICB0aXRsZTogc3RyaW5nXG4gIG9yZGVyOiBudW1iZXJcbiAgdHlwZTogVFxuICBkZXNjcmlwdGlvbj86IHN0cmluZ1xufVxudHlwZSBUeXBlRnJvbVR5cGVEZXNjPFQgZXh0ZW5kcyBUeXBlLCBVIGV4dGVuZHMgSXRlbVR5cGU+ID0gVCBleHRlbmRzICdzdHJpbmcnXG4gID8gc3RyaW5nXG4gIDogVCBleHRlbmRzICdib29sZWFuJ1xuICA/IGJvb2xlYW5cbiAgOiBUIGV4dGVuZHMgJ29iamVjdCdcbiAgPyBJQ29uZmlnXG4gIDogVCBleHRlbmRzICdpbnRlZ2VyJ1xuICA/IG51bWJlclxuICA6IFQgZXh0ZW5kcyAnYXJyYXknXG4gID8gUmVhZG9ubHlBcnJheTxVPlxuICA6IG5ldmVyXG50eXBlIEVudW1EZXNjPFQ+ID1cbiAgfCBSZWFkb25seUFycmF5PFQ+XG4gIHwgUmVhZG9ubHlBcnJheTx7IHZhbHVlOiBUOyBkZXNjcmlwdGlvbjogc3RyaW5nIH0+XG5pbnRlcmZhY2UgU3RyaW5nUHJvcHMge1xuICBlbnVtPzogRW51bURlc2M8c3RyaW5nPlxuICBkZWZhdWx0OiBzdHJpbmdcbn1cbmludGVyZmFjZSBJbnRQcm9wcyB7XG4gIG1pbmltdW0/OiBudW1iZXJcbiAgbWF4aW11bT86IG51bWJlclxuICBkZWZhdWx0OiBudW1iZXJcbiAgZW51bT86IEVudW1EZXNjPG51bWJlcj5cbn1cbmludGVyZmFjZSBBcnJheVByb3BzPFUgZXh0ZW5kcyBUeXBlPiB7XG4gIGl0ZW1zOiB7XG4gICAgdHlwZTogVVxuICB9XG4gIGRlZmF1bHQ6IFJlYWRvbmx5QXJyYXk8VHlwZUZyb21UeXBlRGVzYzxVLCBuZXZlcj4+XG4gIGVudW0/OiBFbnVtRGVzYzxSZWFkb25seUFycmF5PFR5cGVGcm9tVHlwZURlc2M8VSwgbmV2ZXI+Pj5cbn1cbmludGVyZmFjZSBPYmplY3RQcm9wcyB7XG4gIHByb3BlcnRpZXM6IElDb25maWdcbn1cbmludGVyZmFjZSBCb29sUHJvcHMge1xuICBkZWZhdWx0OiBib29sZWFuXG4gIGVudW0/OiBFbnVtRGVzYzxib29sZWFuPlxufVxudHlwZSBUeXBlZFByb3BzPFQgZXh0ZW5kcyBUeXBlLCBVIGV4dGVuZHMgSXRlbVR5cGU+ID0gQmFzaWNQcm9wczxUPiAmXG4gIChUIGV4dGVuZHMgJ3N0cmluZydcbiAgICA/IFN0cmluZ1Byb3BzXG4gICAgOiBUIGV4dGVuZHMgJ2Jvb2xlYW4nXG4gICAgPyBCb29sUHJvcHNcbiAgICA6IFQgZXh0ZW5kcyAnb2JqZWN0J1xuICAgID8gT2JqZWN0UHJvcHNcbiAgICA6IFQgZXh0ZW5kcyAnaW50ZWdlcidcbiAgICA/IEludFByb3BzXG4gICAgOiBUIGV4dGVuZHMgJ2FycmF5J1xuICAgID8gQXJyYXlQcm9wczxVPlxuICAgIDogbmV2ZXIpXG5leHBvcnQgaW50ZXJmYWNlIElDb25maWcge1xuICBba2V5OiBzdHJpbmddOiBUeXBlZENvbmZpZ1xufVxuZXhwb3J0IHR5cGUgT2JqID0gVHlwZWRDb25maWc8J29iamVjdCc+XG5leHBvcnQgdHlwZSBTdHIgPSBUeXBlZENvbmZpZzwnc3RyaW5nJz5cbmV4cG9ydCB0eXBlIEJvb2wgPSBUeXBlZENvbmZpZzwnYm9vbGVhbic+XG5leHBvcnQgdHlwZSBJbnQgPSBUeXBlZENvbmZpZzwnaW50ZWdlcic+XG5leHBvcnQgdHlwZSBBcnI8VSBleHRlbmRzIFR5cGU+ID0gVHlwZWRDb25maWc8J2FycmF5JywgVT5cblxuZXhwb3J0IGNvbnN0IGNvbmZpZzogSUNvbmZpZyA9IHtcbiAgYmluYXJ5UGF0aDogPFN0cj57XG4gICAgdHlwZTogJ3N0cmluZycsXG4gICAgZGVmYXVsdDogJ2hhc2tlbGwtbGFuZ3VhZ2Utc2VydmVyLXdyYXBwZXInLFxuICAgIGRlc2NyaXB0aW9uOiAnRnVsbCBwYXRoIG9mIHRoZSBIYXNrZWxsIExhbmd1YWdlIFNlcnZlciB3cmFwcGVyIGJpbmFyeScsXG4gICAgb3JkZXI6IC0xMCxcbiAgICB0aXRsZTogJ2hhc2tlbGwtbGFuZ3VhZ2Utc2VydmVyLXdyYXBwZXIgYmluYXJ5IHBhdGgnLFxuICB9LFxuICBoYXNrZWxsOiA8T2JqPntcbiAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICB0aXRsZTogJ0hhc2tlbGwgTGFuZ3VhZ2UgU2VydmVyIFNldHRpbmdzJyxcbiAgICBvcmRlcjogMCxcbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAvLyBGb3JtYXR0aW5nIHByb3ZpZGVyIChoYXNrZWxsLmZvcm1hdHRpbmdQcm92aWRlciwgZGVmYXVsdCBvcm1vbHUpOiB3aGF0IGZvcm1hdHRlciB0byB1c2U7IG9uZSBvZiBmbG9za2VsbCwgb3Jtb2x1LCBmb3VybW9sdSwgc3R5bGlzaC1oYXNrZWxsLCBvciBicml0dGFueSAoaWYgY29tcGlsZWQgd2l0aCBBR1BMKVxuICAgICAgZm9ybWF0dGluZ1Byb3ZpZGVyOiA8U3RyPntcbiAgICAgICAgdGl0bGU6ICdGb3JtYXR0aW5nIHByb3ZpZGVyJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICd3aGF0IGZvcm1hdHRlciB0byB1c2UnLFxuICAgICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICAgICAgb3JkZXI6IDEwLFxuICAgICAgICBlbnVtOiBbJ2Zsb3NrZWxsJywgJ29ybW9sdScsICdmb3VybW9sdScsICdzdHlsaXNoLWhhc2tlbGwnLCAnYnJpdHRhbnknXSxcbiAgICAgICAgZGVmYXVsdDogJ29ybW9sdScsXG4gICAgICB9LFxuICAgICAgLy8gRm9ybWF0IG9uIGltcG9ydHMgKGhhc2tlbGwuZm9ybWF0T25JbXBvcnRPbiwgZGVmYXVsdCB0cnVlKTogd2hldGhlciB0byBmb3JtYXQgYWZ0ZXIgYWRkaW5nIGFuIGltcG9ydFxuICAgICAgZm9ybWF0T25JbXBvcnRPbjogPEJvb2w+e1xuICAgICAgICB0aXRsZTogJ0Zvcm1hdCBvbiBpbXBvcnRzJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICd3aGV0aGVyIHRvIGZvcm1hdCBhZnRlciBhZGRpbmcgYW4gaW1wb3J0JyxcbiAgICAgICAgdHlwZTogJ2Jvb2xlYW4nLFxuICAgICAgICBvcmRlcjogMjAsXG4gICAgICAgIGRlZmF1bHQ6IHRydWUsXG4gICAgICB9LFxuICAgICAgLy8gTWF4aW11bSBudW1iZXIgb2YgcHJvYmxlbXMgdG8gcmVwb3J0IChoYXNrZWxsLm1heE51bWJlck9mUHJvYmxlbXMsIGRlZmF1bHQgMTAwKTogdGhlIG1heGltdW0gbnVtYmVyIG9mIHByb2JsZW1zIHRoZSBzZXJ2ZXIgd2lsbCBzZW5kIHRvIHRoZSBjbGllbnRcbiAgICAgIG1heE51bWJlck9mUHJvYmxlbXM6IDxJbnQ+e1xuICAgICAgICB0aXRsZTogJ01heGltdW0gbnVtYmVyIG9mIHByb2JsZW1zIHRvIHJlcG9ydCcsXG4gICAgICAgIGRlc2NyaXB0aW9uOlxuICAgICAgICAgICd0aGUgbWF4aW11bSBudW1iZXIgb2YgcHJvYmxlbXMgdGhlIHNlcnZlciB3aWxsIHNlbmQgdG8gdGhlIGNsaWVudCcsXG4gICAgICAgIHR5cGU6ICdpbnRlZ2VyJyxcbiAgICAgICAgb3JkZXI6IDMwLFxuICAgICAgICBkZWZhdWx0OiAxMDAsXG4gICAgICB9LFxuICAgICAgLy8gRGlhZ25vc3RpY3Mgb24gY2hhbmdlIChoYXNrZWxsLmRpYWdub3N0aWNzT25DaGFuZ2UsIGRlZmF1bHQgdHJ1ZSk6IChjdXJyZW50bHkgdW51c2VkKVxuICAgICAgZGlhZ25vc3RpY3NPbkNoYW5nZTogPEJvb2w+e1xuICAgICAgICB0aXRsZTogJ0RpYWdub3N0aWNzIG9uIGNoYW5nZScsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnKGN1cnJlbnRseSB1bnVzZWQpJyxcbiAgICAgICAgdHlwZTogJ2Jvb2xlYW4nLFxuICAgICAgICBvcmRlcjogNDAsXG4gICAgICAgIGRlZmF1bHQ6IHRydWUsXG4gICAgICB9LFxuICAgICAgLy8gQ29tcGxldGlvbiBzbmlwcGV0cyAoaGFza2VsbC5jb21wbGV0aW9uU25pcHBldHNPbiwgZGVmYXVsdCB0cnVlKTogd2hldGhlciB0byBzdXBwb3J0IGNvbXBsZXRpb24gc25pcHBldHNcbiAgICAgIGNvbXBsZXRpb25TbmlwcGV0c09uOiA8Qm9vbD57XG4gICAgICAgIHRpdGxlOiAnQ29tcGxldGlvbiBzbmlwcGV0cycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnd2hldGhlciB0byBzdXBwb3J0IGNvbXBsZXRpb24gc25pcHBldHMnLFxuICAgICAgICB0eXBlOiAnYm9vbGVhbicsXG4gICAgICAgIG9yZGVyOiA1MCxcbiAgICAgICAgZGVmYXVsdDogdHJ1ZSxcbiAgICAgIH0sXG4gICAgICAvLyBMaXF1aWQgSGFza2VsbCAoaGFza2VsbC5saXF1aWRPbiwgZGVmYXVsdCBmYWxzZSk6IHdoZXRoZXIgdG8gZW5hYmxlIExpcXVpZCBIYXNrZWxsIHN1cHBvcnQgKGN1cnJlbnRseSB1bnVzZWQgdW50aWwgdGhlIExpcXVpZCBIYXNrZWxsIHN1cHBvcnQgaXMgZnVuY3Rpb25hbCBhZ2FpbilcbiAgICAgIGxpcXVpZE9uOiA8Qm9vbD57XG4gICAgICAgIHRpdGxlOiAnTGlxdWlkIEhhc2tlbGwnLFxuICAgICAgICBkZXNjcmlwdGlvbjpcbiAgICAgICAgICAnd2hldGhlciB0byBlbmFibGUgTGlxdWlkIEhhc2tlbGwgc3VwcG9ydCAoY3VycmVudGx5IHVudXNlZCB1bnRpbCB0aGUgTGlxdWlkIEhhc2tlbGwgc3VwcG9ydCBpcyBmdW5jdGlvbmFsIGFnYWluKScsXG4gICAgICAgIHR5cGU6ICdib29sZWFuJyxcbiAgICAgICAgb3JkZXI6IDYwLFxuICAgICAgICBkZWZhdWx0OiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICAvLyBIbGludCAoaGFza2VsbC5obGludE9uLCBkZWZhdWx0IHRydWUpOiB3aGV0aGVyIHRvIGVuYWJsZSBIbGludCBzdXBwb3J0XG4gICAgICBobGludE9uOiA8Qm9vbD57XG4gICAgICAgIHRpdGxlOiAnSGxpbnQnLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ3doZXRoZXIgdG8gZW5hYmxlIEhsaW50IHN1cHBvcnQnLFxuICAgICAgICB0eXBlOiAnYm9vbGVhbicsXG4gICAgICAgIG9yZGVyOiA3MCxcbiAgICAgICAgZGVmYXVsdDogdHJ1ZSxcbiAgICAgIH0sXG4gICAgICAvLyBNYXggY29tcGxldGlvbnMgKGhhc2tlbGwubWF4Q29tcGxldGlvbnMsIGRlZmF1bHQgNDApOiBtYXhpbXVtIG51bWJlciBvZiBjb21wbGV0aW9ucyBzZW50IHRvIHRoZSBMU1AgY2xpZW50LlxuICAgICAgbWF4Q29tcGxldGlvbnM6IDxJbnQ+e1xuICAgICAgICB0aXRsZTogJ0hsaW50JyxcbiAgICAgICAgZGVzY3JpcHRpb246ICdtYXhpbXVtIG51bWJlciBvZiBjb21wbGV0aW9ucyBzZW50IHRvIHRoZSBMU1AgY2xpZW50JyxcbiAgICAgICAgdHlwZTogJ2ludGVnZXInLFxuICAgICAgICBvcmRlcjogODAsXG4gICAgICAgIGRlZmF1bHQ6IDQwLFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxufVxuXG4vLyBnZW5lcmF0ZWQgYnkgdHlwZWQtY29uZmlnLmpzXG5kZWNsYXJlIG1vZHVsZSAnYXRvbScge1xuICBpbnRlcmZhY2UgQ29uZmlnVmFsdWVzIHtcbiAgICAnaWRlLWhhc2tlbGwtaGxzLmJpbmFyeVBhdGgnOiBzdHJpbmdcbiAgICAnaWRlLWhhc2tlbGwtaGxzLmhhc2tlbGwuZm9ybWF0dGluZ1Byb3ZpZGVyJzpcbiAgICAgIHwgJ2Zsb3NrZWxsJ1xuICAgICAgfCAnb3Jtb2x1J1xuICAgICAgfCAnZm91cm1vbHUnXG4gICAgICB8ICdzdHlsaXNoLWhhc2tlbGwnXG4gICAgICB8ICdicml0dGFueSdcbiAgICAnaWRlLWhhc2tlbGwtaGxzLmhhc2tlbGwuZm9ybWF0T25JbXBvcnRPbic6IGJvb2xlYW5cbiAgICAnaWRlLWhhc2tlbGwtaGxzLmhhc2tlbGwubWF4TnVtYmVyT2ZQcm9ibGVtcyc6IG51bWJlclxuICAgICdpZGUtaGFza2VsbC1obHMuaGFza2VsbC5kaWFnbm9zdGljc09uQ2hhbmdlJzogYm9vbGVhblxuICAgICdpZGUtaGFza2VsbC1obHMuaGFza2VsbC5jb21wbGV0aW9uU25pcHBldHNPbic6IGJvb2xlYW5cbiAgICAnaWRlLWhhc2tlbGwtaGxzLmhhc2tlbGwubGlxdWlkT24nOiBib29sZWFuXG4gICAgJ2lkZS1oYXNrZWxsLWhscy5oYXNrZWxsLmhsaW50T24nOiBib29sZWFuXG4gICAgJ2lkZS1oYXNrZWxsLWhscy5oYXNrZWxsLm1heENvbXBsZXRpb25zJzogbnVtYmVyXG4gICAgJ2lkZS1oYXNrZWxsLWhscy5oYXNrZWxsJzoge1xuICAgICAgZm9ybWF0dGluZ1Byb3ZpZGVyOlxuICAgICAgICB8ICdmbG9za2VsbCdcbiAgICAgICAgfCAnb3Jtb2x1J1xuICAgICAgICB8ICdmb3VybW9sdSdcbiAgICAgICAgfCAnc3R5bGlzaC1oYXNrZWxsJ1xuICAgICAgICB8ICdicml0dGFueSdcbiAgICAgIGZvcm1hdE9uSW1wb3J0T246IGJvb2xlYW5cbiAgICAgIG1heE51bWJlck9mUHJvYmxlbXM6IG51bWJlclxuICAgICAgZGlhZ25vc3RpY3NPbkNoYW5nZTogYm9vbGVhblxuICAgICAgY29tcGxldGlvblNuaXBwZXRzT246IGJvb2xlYW5cbiAgICAgIGxpcXVpZE9uOiBib29sZWFuXG4gICAgICBobGludE9uOiBib29sZWFuXG4gICAgICBtYXhDb21wbGV0aW9uczogbnVtYmVyXG4gICAgfVxuICAgICdpZGUtaGFza2VsbC1obHMnOiB7XG4gICAgICBiaW5hcnlQYXRoOiBzdHJpbmdcbiAgICAgICdoYXNrZWxsLmZvcm1hdHRpbmdQcm92aWRlcic6XG4gICAgICAgIHwgJ2Zsb3NrZWxsJ1xuICAgICAgICB8ICdvcm1vbHUnXG4gICAgICAgIHwgJ2ZvdXJtb2x1J1xuICAgICAgICB8ICdzdHlsaXNoLWhhc2tlbGwnXG4gICAgICAgIHwgJ2JyaXR0YW55J1xuICAgICAgJ2hhc2tlbGwuZm9ybWF0T25JbXBvcnRPbic6IGJvb2xlYW5cbiAgICAgICdoYXNrZWxsLm1heE51bWJlck9mUHJvYmxlbXMnOiBudW1iZXJcbiAgICAgICdoYXNrZWxsLmRpYWdub3N0aWNzT25DaGFuZ2UnOiBib29sZWFuXG4gICAgICAnaGFza2VsbC5jb21wbGV0aW9uU25pcHBldHNPbic6IGJvb2xlYW5cbiAgICAgICdoYXNrZWxsLmxpcXVpZE9uJzogYm9vbGVhblxuICAgICAgJ2hhc2tlbGwuaGxpbnRPbic6IGJvb2xlYW5cbiAgICAgICdoYXNrZWxsLm1heENvbXBsZXRpb25zJzogbnVtYmVyXG4gICAgICBoYXNrZWxsOiB7XG4gICAgICAgIGZvcm1hdHRpbmdQcm92aWRlcjpcbiAgICAgICAgICB8ICdmbG9za2VsbCdcbiAgICAgICAgICB8ICdvcm1vbHUnXG4gICAgICAgICAgfCAnZm91cm1vbHUnXG4gICAgICAgICAgfCAnc3R5bGlzaC1oYXNrZWxsJ1xuICAgICAgICAgIHwgJ2JyaXR0YW55J1xuICAgICAgICBmb3JtYXRPbkltcG9ydE9uOiBib29sZWFuXG4gICAgICAgIG1heE51bWJlck9mUHJvYmxlbXM6IG51bWJlclxuICAgICAgICBkaWFnbm9zdGljc09uQ2hhbmdlOiBib29sZWFuXG4gICAgICAgIGNvbXBsZXRpb25TbmlwcGV0c09uOiBib29sZWFuXG4gICAgICAgIGxpcXVpZE9uOiBib29sZWFuXG4gICAgICAgIGhsaW50T246IGJvb2xlYW5cbiAgICAgICAgbWF4Q29tcGxldGlvbnM6IG51bWJlclxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19