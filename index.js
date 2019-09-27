"use strict";

module.exports = function({ types: t }) {
  return {
    name: "transform-define",
    visitor: {
      MemberExpression(path, { opts }) {
        if (path.get("object").matchesPattern("process.env")) {
          var key = path.toComputedKey();
          if (t.isStringLiteral(key)) {
            replacer(path, opts[key.value], t.valueToNode);
          }
        }
      }
    }
  };
};

var replacer = function replacer(path, value, valueToNode) {
  path.replaceWith(valueToNode(value));

  if (path.parentPath.isBinaryExpression()) {
    var result = path.parentPath.evaluate();
    if (result.confident) {
      path.parentPath.replaceWith(valueToNode(result.value));
    }
  }
};
