import { signal } from "@preact/signals";

export const kvSignal = signal<Deno.Kv>(await Deno.openKv());
export const readUnitSignal = signal<number>(0);
export const writeUnitSignal = signal<number>(0);
