"use strict";

const Type = require("../../type"),
      Error = require("../../error"),
      queries = require("../../miscellaneous/queries");

const { typeNameTerminalNodesQuery } = queries;

function verifyTypeDeclaration(typeDeclarationNode, fileContext) {
  const typeNameTerminalNodes = typeNameTerminalNodesQuery(typeDeclarationNode),
        typeNames = typeNameTerminalNodes.map((typeNameTerminalNode) => {
          const typeNameTerminalNodeContent = typeNameTerminalNode.getContent(),
                typeName = typeNameTerminalNodeContent; ///

          return typeName;
        }),
        typeName = typeNames.shift(), ///
        typePresent = fileContext.isTypePresentByTypeName(typeName);

  if (typePresent) {
    const node = typeDeclarationNode, ///
          message = `The type '${typeName}' is already present.`;

    throw new Error(node, message);
  }

  const superTypeName = typeNames.shift();

  if (superTypeName === undefined) {
    const type = Type.fromTypeName(typeName);

    fileContext.addType(type);
  } else {
    const superType = fileContext.findTypeByTypeName(superTypeName);

    if (superType === undefined) {
      const node = typeDeclarationNode, ///
            message = `The super-type '${superTypeName}' is missing.`;

      throw new Error(node, message);
    }

    const type = Type.fromTypeNameAndSuperType(typeName, superType);

    fileContext.addType(type);
  }
}

module.exports = verifyTypeDeclaration;
