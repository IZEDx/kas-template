import axios from "restyped-axios";
import { SharedConfig, FrontendConfig } from "@kas/shared";

export type Config = {};

export type SharedAndFrontend = SharedConfig&FrontendConfig;
export class ConfigConsumer
{
    config = {} as SharedAndFrontend;

    constructor(...configs: Partial<SharedAndFrontend>[]) 
    {
        for (const config of configs)
        {
            Object.assign(this.config, config);
        }
    }

    static async connect(url = "/api/config")
    {
        const {data} = await axios.get(url);
        return new ConfigConsumer(data);
    }

    get<K extends keyof SharedAndFrontend>(key: K)
    {
        return this.config[key];
    }
    
}
