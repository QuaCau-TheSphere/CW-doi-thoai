import { signal } from "@preact/signals";

export const kvSignal = signal<Deno.Kv>(await Deno.openKv());
export const readUnitSignal = signal(0);
export const writeUnitSignal = signal(0);
