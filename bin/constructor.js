"use strict";

const { nodeAsString } = require("./utilities/node");

class Constructor {
  constructor(termNode, type) {
    this.termNode = termNode;
    this.type = type;
  }

  getTermNode() {
    return this.termNode;
  }

  getType() {
    return this.type;
  }

  asString() {
    let string;

    const termString = nodeAsString(this.termNode);

    if (this.type === undefined) {
      string = `${termString}`;
    } else {
      const noSuperType = true,
            typeString = this.type.asString(noSuperType);

      string = `${termString}:${typeString}`;
    }

    return string;
  }

  static fromTermNodeAndType(termNode, type) {
    const constructor = new Constructor(termNode, type);

    return constructor;
  }
}

module.exports = Constructor;
