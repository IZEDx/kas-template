
import Router from "koa-router";
import { ConfigFile } from "./file";
import { SharedConfig, BackendConfig, FrontendConfig } from "@kas/shared";
import sharedSampleConfig from "./json/shared.json";
import backendSampleConfig from "./json/backend.json";
import frontendSampleConfig from "./json/frontend.json";

type Configs = "shared"|"backend"|"frontend";
type ConfigKey = (keyof SharedConfig)|(keyof BackendConfig)|(keyof FrontendConfig);

export class ConfigProvider
{

    private frontendConfig: SharedConfig&FrontendConfig;

    private constructor(
        public shared: ConfigFile<SharedConfig>,
        public backend: ConfigFile<BackendConfig>,
        public frontend: ConfigFile<FrontendConfig>
    ) {
        this.frontendConfig = {
            ...this.shared.body, ...this.frontend.body
        };
    }

    static async create(router: Router) 
    {
        const configs = await Promise.all([
            ConfigFile.load<SharedConfig>("shared", sharedSampleConfig, true),
            ConfigFile.load<BackendConfig>("backend", backendSampleConfig, false),
            ConfigFile.load<FrontendConfig>("frontend", frontendSampleConfig, true)
        ]);

        const provider = new ConfigProvider(...configs);

        provider.addRoutes(router);

        return provider;
    }

    addRoutes(router: Router)
    {
        router.get("/config", (ctx, _next) => {
            ctx.body = this.frontendConfig;
        });
    }

    async refresh()
    {
        await Promise.all([
            this.shared.refresh(),
            this.backend.refresh(),
            this.frontend.refresh()
        ]);
        this.frontendConfig = {
            ...this.shared.body, ...this.frontend.body
        };
    }

    async save()
    {
        await Promise.all([
            this.shared.save(),
            this.backend.save(),
            this.frontend.save()
        ]);
    }

    set<K extends ConfigKey, V extends (SharedConfig&BackendConfig&FrontendConfig)[K]>(key: K, value: V): void;
    set<C extends "shared"|"backend"|"frontend", K extends keyof ConfigProvider[C]["body"], V extends ConfigProvider[C]["body"][K]>(config: C, key: K, value: V): void;
    set(v1: any, v2: any, v3?: any)
    {
        if (v3 !== undefined) {
            return this[v1].set(v2, v3);
        } else if (!this.backend.has(v1)) {
            if (this.shared.has(v1)) {
                return this.shared.set(v1, v2);
            } else if (this.frontend.has(v1)) {
                return this.frontend.set(v1, v2);
            }
        }
        
        return this.backend.set(v1, v2);
    } 

    get<K extends ConfigKey>(key: K): (SharedConfig&BackendConfig&FrontendConfig)[K];
    get<C extends Configs, K extends keyof ConfigProvider[C]["body"]>(config: C, key: K): ConfigProvider[C]["body"][K];
    get(v1: any, v2?: any): any
    {
        if (v2 === undefined) {
            return this.backend.get(v1) ?? this.shared.get(v1) ?? this.frontend.get(v1);
        } else {
            return this[v1].get(v2);
        }
    }

}
