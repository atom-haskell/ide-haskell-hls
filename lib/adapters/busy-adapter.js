"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.busyAdapter = void 0;
function busyAdapter(upi) {
    return {
        dispose() {
            if (upi)
                upi.setStatus({ status: 'ready', detail: '' });
            upi = undefined;
        },
        reportBusy(title) {
            if (upi)
                upi.setStatus({ status: 'progress', detail: title });
            return {
                setTitle: (title) => {
                    if (upi)
                        upi.setStatus({ status: 'progress', detail: title });
                },
                dispose: () => {
                    if (upi)
                        upi.setStatus({ status: 'ready', detail: '' });
                },
            };
        },
        async reportBusyWhile(title, f) {
            if (upi)
                upi.setStatus({ status: 'progress', detail: title });
            const res = await f();
            if (upi)
                upi.setStatus({ status: 'ready', detail: '' });
            return res;
        },
    };
}
exports.busyAdapter = busyAdapter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVzeS1hZGFwdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2FkYXB0ZXJzL2J1c3ktYWRhcHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSxTQUFnQixXQUFXLENBQUMsR0FBaUM7SUFDM0QsT0FBTztRQUNMLE9BQU87WUFDTCxJQUFJLEdBQUc7Z0JBQUUsR0FBRyxDQUFDLFNBQVMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUE7WUFDdkQsR0FBRyxHQUFHLFNBQVMsQ0FBQTtRQUNqQixDQUFDO1FBQ0QsVUFBVSxDQUFDLEtBQWE7WUFDdEIsSUFBSSxHQUFHO2dCQUFFLEdBQUcsQ0FBQyxTQUFTLENBQUMsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFBO1lBQzdELE9BQU87Z0JBQ0wsUUFBUSxFQUFFLENBQUMsS0FBYSxFQUFFLEVBQUU7b0JBQzFCLElBQUksR0FBRzt3QkFBRSxHQUFHLENBQUMsU0FBUyxDQUFDLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQTtnQkFDL0QsQ0FBQztnQkFDRCxPQUFPLEVBQUUsR0FBRyxFQUFFO29CQUNaLElBQUksR0FBRzt3QkFBRSxHQUFHLENBQUMsU0FBUyxDQUFDLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQTtnQkFDekQsQ0FBQzthQUNGLENBQUE7UUFDSCxDQUFDO1FBQ0QsS0FBSyxDQUFDLGVBQWUsQ0FBSSxLQUFhLEVBQUUsQ0FBbUI7WUFDekQsSUFBSSxHQUFHO2dCQUFFLEdBQUcsQ0FBQyxTQUFTLENBQUMsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFBO1lBQzdELE1BQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUE7WUFDckIsSUFBSSxHQUFHO2dCQUFFLEdBQUcsQ0FBQyxTQUFTLENBQUMsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFBO1lBQ3ZELE9BQU8sR0FBRyxDQUFBO1FBQ1osQ0FBQztLQUNGLENBQUE7QUFDSCxDQUFDO0FBeEJELGtDQXdCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFVQSSBmcm9tICdhdG9tLWhhc2tlbGwtdXBpJ1xuXG5leHBvcnQgZnVuY3Rpb24gYnVzeUFkYXB0ZXIodXBpOiBVUEkuSVVQSUluc3RhbmNlIHwgdW5kZWZpbmVkKSB7XG4gIHJldHVybiB7XG4gICAgZGlzcG9zZSgpIHtcbiAgICAgIGlmICh1cGkpIHVwaS5zZXRTdGF0dXMoeyBzdGF0dXM6ICdyZWFkeScsIGRldGFpbDogJycgfSlcbiAgICAgIHVwaSA9IHVuZGVmaW5lZFxuICAgIH0sXG4gICAgcmVwb3J0QnVzeSh0aXRsZTogc3RyaW5nKSB7XG4gICAgICBpZiAodXBpKSB1cGkuc2V0U3RhdHVzKHsgc3RhdHVzOiAncHJvZ3Jlc3MnLCBkZXRhaWw6IHRpdGxlIH0pXG4gICAgICByZXR1cm4ge1xuICAgICAgICBzZXRUaXRsZTogKHRpdGxlOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICBpZiAodXBpKSB1cGkuc2V0U3RhdHVzKHsgc3RhdHVzOiAncHJvZ3Jlc3MnLCBkZXRhaWw6IHRpdGxlIH0pXG4gICAgICAgIH0sXG4gICAgICAgIGRpc3Bvc2U6ICgpID0+IHtcbiAgICAgICAgICBpZiAodXBpKSB1cGkuc2V0U3RhdHVzKHsgc3RhdHVzOiAncmVhZHknLCBkZXRhaWw6ICcnIH0pXG4gICAgICAgIH0sXG4gICAgICB9XG4gICAgfSxcbiAgICBhc3luYyByZXBvcnRCdXN5V2hpbGU8VD4odGl0bGU6IHN0cmluZywgZjogKCkgPT4gUHJvbWlzZTxUPik6IFByb21pc2U8VD4ge1xuICAgICAgaWYgKHVwaSkgdXBpLnNldFN0YXR1cyh7IHN0YXR1czogJ3Byb2dyZXNzJywgZGV0YWlsOiB0aXRsZSB9KVxuICAgICAgY29uc3QgcmVzID0gYXdhaXQgZigpXG4gICAgICBpZiAodXBpKSB1cGkuc2V0U3RhdHVzKHsgc3RhdHVzOiAncmVhZHknLCBkZXRhaWw6ICcnIH0pXG4gICAgICByZXR1cm4gcmVzXG4gICAgfSxcbiAgfVxufVxuIl19