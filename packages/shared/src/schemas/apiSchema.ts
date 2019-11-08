
export interface APISchema {
    "/": {
        "GET": {
            response: {
                msgFromShared: string
            }
        }
    },
    "/foo": {
        "GET": {
            response: {
                bar: string
            }
        }
    }
}
