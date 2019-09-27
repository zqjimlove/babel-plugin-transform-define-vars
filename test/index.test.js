const pluginTester = require("babel-plugin-tester");

const definePlugin = require("../index");

pluginTester({
  plugin: definePlugin,
  pluginOptions: {
    env: "__env__"
  },
  tests: {
    "changes this code": {
      // input to the plugin
      code: "var hello = process.env.env;",
      output: 'var hello = "__env__";'
    },
    "changes this code 2": {
      // input to the plugin
      code: "var hello = process.env['env'];",
      output: 'var hello = "__env__";'
    },
    "changes confident": {
      // input to the plugin
      code: `process.env.env === '__env__'`,
      output: "true;"
    }
  }
});
