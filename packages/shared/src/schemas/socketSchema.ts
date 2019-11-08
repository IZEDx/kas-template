import { SocketSchemaType } from "../types";

export interface SocketSchema extends SocketSchemaType
{
    "S2C": {
        "count": [number];
    }
}
