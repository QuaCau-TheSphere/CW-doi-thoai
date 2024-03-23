const kv = await Deno.openKv() 
const all = await Array.fromAsync(kv.list({prefix:[]}))
const get1 = await kv.get(['preferences', 'ada'] ) 
const all1 = await Array.fromAsync(kv.list({prefix:['preferences']}))
console.log("🚀 ~ all:", all)
console.log(get1)
console.log(all1)
console.log()
debugger