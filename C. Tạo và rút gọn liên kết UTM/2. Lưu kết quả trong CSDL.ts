import VậtThểChiaSẻ from "../Ki%E1%BB%83u.ts";

export default async function đẩyLênCSDL(thôngTinChiaSẻ: VậtThểChiaSẻ){
    const kv = await Deno.openKv();
    await kv.set(["preferences", "ada"], thôngTinChiaSẻ);
} 