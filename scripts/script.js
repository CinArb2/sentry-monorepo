var fs = require("fs"),
  path = require("path"),
  sourceMap = require("source-map");

// Path to file that is generated by your build tool (webpack, tsc, ...)
var GENERATED_FILE = path.join("./apps/web/.next/static/chunks/pages", "home-85efc8932d83babd.js.map");

// Line and column located in your generated file (for example, the source
// of the error from your minified file)
var GENERATED_LINE_AND_COLUMN = { line: 1, column: 15493 };

var rawSourceMap = fs.readFileSync(GENERATED_FILE).toString();
new sourceMap.SourceMapConsumer(rawSourceMap).then(function (smc) {
  var pos = smc.originalPositionFor(GENERATED_LINE_AND_COLUMN);

  // You should see something like:
  // { source: 'original.js', line: 57, column: 9, name: 'myfunc' }
  console.log(pos);
});