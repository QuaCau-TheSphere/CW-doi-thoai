export type OneKey<K extends string, V = any> = {
  [P in K]: (
    & Record<P, V>
    & Partial<Record<Exclude<K, P>, never>>
  ) extends infer O ? { [Q in keyof O]: O[Q] }
    : never;
}[K];

/** [Define a list of optional keys for Typescript Record](https://stackoverflow.com/q/53276792/3416774) */
export type PartialRecord<K extends keyof any, T> = Partial<Record<K, T>>;
