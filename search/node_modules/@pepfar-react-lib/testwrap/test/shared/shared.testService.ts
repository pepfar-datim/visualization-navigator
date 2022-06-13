export function toFail(method:()=>void){
    expect(method).toThrow();
}

export async function toAsyncFail(method: ()=>void){
    await expect(method).rejects.toThrow();
}