import { getMetaTags } from "https://deno.land/x/opengraph@v1.0.0/mod.ts";
const url =
  "http://localhost:8000/cors-proxy/https://lậptrình.quảcầu.cc/%F0%9F%91%8Ftr%E1%BA%A5n%20k%E1%BB%B3//";
const res = await fetch(url);
console.log(await res.text());

const a = await getMetaTags(url);
console.log(a);
// const { title, description } = a.og;
// console.log(a, title, description);
debugger;
