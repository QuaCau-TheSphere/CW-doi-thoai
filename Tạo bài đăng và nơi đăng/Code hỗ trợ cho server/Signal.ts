import { signal } from "@preact/signals";
import sizeof from "npm:object-sizeof";

export const kvSignal = signal<Deno.Kv>(undefined as unknown as Deno.Kv);
export const readUnitSignal = signal<number>(0);
export const writeUnitSignal = signal<number>(0);

export function increaseReadUnit(data: any) {
  const kb = sizeof(data) / 1000;
  readUnitSignal.value += Math.ceil(kb / 4);
}
export function increaseWriteUnit(data: any) {
  const kb = sizeof(data) / 1000;
  writeUnitSignal.value += Math.ceil(kb);
}
