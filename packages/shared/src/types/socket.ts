import { Serializable } from "./json";

export interface SocketSchemaType
{
    "C2S"?: {
        [key: string]: Serializable[];
    },
    "S2C"?: {
        [key: string]: Serializable[];
    }
}


export type TypedClientSocket<T extends SocketSchemaType> = TypedSocket<T, "C2S", SocketIOClient.Socket>;
export type TypedServerSocket<T extends SocketSchemaType> = TypedSocket<T, "S2C", SocketIO.Socket>;

export interface TypedSocketServer<T extends SocketSchemaType> extends SocketIO.Server {
    emit<K extends keyof T["S2C"]>(event: K, ...data: T["S2C"][K]): TypedNamespace<T>;
    on( event: 'connection', listener: ( socket: TypedServerSocket<T> ) => void ): TypedNamespace<T>;
    on( event: 'connect', listener: ( socket: TypedServerSocket<T> ) => void ): TypedNamespace<T>;
}

export interface TypedNamespace<T extends SocketSchemaType> extends SocketIO.Namespace {
    server: TypedSocketServer<T>
}

type Dirs = "S2C"|"C2S";
type InvertDir<D extends Dirs> = D extends "S2C" ? "C2S" : "S2C";
type TypedSocket<T extends SocketSchemaType, D extends Dirs, B> = {
    emit<K extends keyof T[D]>(event: K, ...data: T[D][K]): TypedSocket<T, D, B>;
    on<K extends keyof T[InvertDir<D>]>(event: K, fn: (...args: T[InvertDir<D>][K]) => any): TypedSocket<T, D, B>;
    once<K extends keyof T[InvertDir<D>]>(event: K, fn: (...args: T[InvertDir<D>][K]) => any): TypedSocket<T, D, B>;
    off<K extends keyof T[InvertDir<D>]>(event: K, fn: (...args: T[InvertDir<D>][K]) => any): TypedSocket<T, D, B>;
} & B;