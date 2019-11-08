
export interface JSONArray extends Array<Serializable> {}
export interface JSONObject {
    [key: string]: Serializable;
}
export type Serializable = JSONObject | JSONArray | string | number | boolean | null | undefined;
