
var readline = require('readline');
var fs = require("fs");
var path = require("path");

process.stdout.write("Name: ");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

let step = 0;
rl.on('line', line => {
    switch (step++) {
        case 0: return setup(line);
        case 1: return cleanup(line);
    }
});

const filesToRename = {
    "kas-template.code-workspace": (name) => name+".code-workspace"
}

const replaceKasTemplate = {
    "kas-template": (name) => name
};

const filesToModify = {
    "README.md": replaceKasTemplate,
    "package.json": replaceKasTemplate,
    "packages/backend/src/index.ts": replaceKasTemplate
}

function setup(name)
{
    for (const file of Object.entries(filesToRename)) {
        const from = file[0];
        const to = file[1](name);

        console.log("Renaming", from, "to", to);
        fs.renameSync(path.join(__dirname, from), path.join(__dirname, to));
    }

    for (const file of Object.entries(filesToModify)) {
        const filePath = path.join(__dirname, file[0]);
        let content = fs.readFileSync(filePath).toString();

        for (const rule of Object.entries(file[1])) {
            content = content.replace(new RegExp(rule[0], "g"), rule[1](name));
        }

        console.log("Updating", file[0]);
        fs.writeFileSync(filePath, content);
    }

    process.stdout.write("Delete SETUP file? (y/n): ");
}

function cleanup(delSetup = "y")
{
    if (!delSetup.toLowerCase().startsWith("n")) {
        fs.unlinkSync(path.join(__dirname, "SETUP.js"));
    }

    process.exit();
}