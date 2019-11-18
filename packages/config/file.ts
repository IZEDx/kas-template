import { join } from "path";
import { readFile as rF, writeFile as wF, exists, mkdirSync, existsSync } from "fs";
import { Config } from "./consumer";
import beautify from "json-beautify";

const basePath = join(".", "config");
const configPath = (name: string) => join(basePath, name + ".json");
const readFile = (path: string): Promise<Buffer> => new Promise((res, rej) => rF(path, (err, data) => {
    if (err) rej(err);
    else res(data);
}));
const writeFile = (path: string, data: Buffer|string): Promise<void> => new Promise((res, rej) => wF(path, data, (err) => {
    if (err) rej(err);
    else res();
}));
const fileExists = (path: string) => new Promise<boolean>(res => exists(path, res));

if (!existsSync(basePath)) mkdirSync(basePath);

export class ConfigFile<C extends Config>
{
    private _ready = false;


    private constructor(
        public path: string,
        public allowFrontend = false,
        public body = {} as C
    ) 
    {}

    get ready() {
        return this._ready;
    }

    static async load<C extends Config>(configName: string, sampleConfig?: C, allowFrontend = false)
    {
        const config = new ConfigFile<C>(configPath(configName), allowFrontend, sampleConfig);
        if (await fileExists(config.path)) {
            await config.refresh(false);
        } else {
            await config.save();
        }
        config._ready = true;
        return config;
    }

    async refresh(clean = true)
    {
        const file = await readFile(this.path);
        if (clean) this.body = JSON.parse(file.toString()) as C;
        else Object.assign(this.body, JSON.parse(file.toString()) as C);
    }

    async save()
    {
        await writeFile(this.path, beautify(this.body, null, 2, 80));
    }

    set<K extends keyof C>(key: K, value: C[K])
    {
        this.body[key] = value;
    }

    get(key: keyof C)
    {  
        return this.body[key];
    }

    has(key: keyof C)
    {
        return Object.keys(this.body).includes(key as string);
    }
}