export type Draft<T> = Omit<T, "id" | "numRenta">

export type UpdateData<T> = Partial<Draft<T>>
