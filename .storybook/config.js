import { configure } from "@storybook/react";

const req = require.context("../src", true, /story\.js$/);

function loadStories() {
    req.keys().forEach(req);

    // require('../src/index.js');
    // You can require as many stories as you need.
}

configure(loadStories, module);
