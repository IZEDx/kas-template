import { SharedConfig, FrontendConfig } from "./configSchema";

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
    "/config": {
        "GET": {
            response: SharedConfig & FrontendConfig
        }
    }
}
