"use strict";

const verifyType = require("../../verify/type");

const { nodeQuery } = require("../../utilities/query"),
      { nameFromNameNameNode } = require("../../utilities/node");

const firstTypeNameNameNodeQuery = nodeQuery("/*/typeName[0]/@name!"),
      secondTypeNameNameNodeQuery = nodeQuery("/*/typeName[1]/@name!");

function verifyTypeDeclaration(typeDeclarationNode, fileContext) {
  let typeDeclarationVerified;

  const firstTypeNameNameNode = firstTypeNameNameNodeQuery(typeDeclarationNode),
        secondTypeNameNameNode = secondTypeNameNameNodeQuery(typeDeclarationNode),
        firstTypeName = nameFromNameNameNode(firstTypeNameNameNode),
        secondTypeName = (secondTypeNameNameNode !== undefined) ?
                            nameFromNameNameNode(secondTypeNameNameNode) :
                              undefined,
        typeName = firstTypeName, ///
        superTypeName = secondTypeName, ///
        typeVerified = verifyType(typeName, superTypeName, fileContext);

  typeDeclarationVerified = typeVerified; ///

  return typeDeclarationVerified;
}

module.exports = verifyTypeDeclaration;
