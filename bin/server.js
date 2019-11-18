#! /usr/bin/env node

require("../packages/backend/dist/index.js").main().catch(err => {
    console.error("Fatal Error:\n", err);
});
