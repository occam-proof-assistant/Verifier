"use strict";

const Error = require("../../error"),
      queries = require("../../miscellaneous/queries"),
      Variable = require("../../variable"),
      verifyTypeName = require("../../verify/typeName");

const { typeNameTerminalNodeQuery, nameTerminalNodeQuery } = queries;

function verifyVariableDeclaration(variableDeclarationNode, context, ruleMap) {
  const typeNameTerminalNode = typeNameTerminalNodeQuery(variableDeclarationNode),
        type = verifyTypeName(typeNameTerminalNode, context, ruleMap);

  const nameTerminalNode = nameTerminalNodeQuery(variableDeclarationNode),
        nameTerminalNodeContent = nameTerminalNode.getContent(),
        name = nameTerminalNodeContent, ///
        variablePresent = context.isVariablePresentByName(name);

  if (variablePresent) {
    const node = variableDeclarationNode, ///
          message = `The variable '${name}' is already present.`;

    throw new Error(node, message);
  }

  const variable = Variable.fromNameAndType(name, type);

  context.addVariable(variable);
}

module.exports = verifyVariableDeclaration;
