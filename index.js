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
        // if (path.matchesPattern("process.env.NODE_ENV")) {
        //   path.replaceWith(t.valueToNode(process.env.NODE_ENV));

        //   if (path.parentPath.isBinaryExpression()) {
        //     const evaluated = path.parentPath.evaluate();
        //     if (evaluated.confident) {
        //       path.parentPath.replaceWith(t.valueToNode(evaluated.value));
        //     }
        //   }
        // }
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
