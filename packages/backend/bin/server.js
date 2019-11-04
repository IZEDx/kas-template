#! /usr/bin/env node

require("../dist/index.js").main().catch(err => {
    console.error("Fatal Error:\n", err);
});
