'use strict';

const queries = require('../queries'),
      verifyTypeDeclaration = require('../verify/declaration/type'),
      verifyVariableDeclaration = require('../verify/declaration/variable'),
      verifyVariablesDeclaration = require('../verify/declaration/variables'),
      verifyConstructorDeclaration = require('../verify/declaration/constructor'),
      verifyConstructorsDeclaration = require('../verify/declaration/constructors');

const { keywordNodeQuery,
        typeDeclarationNodeQuery,
        variableDeclarationNodeQuery,
        variablesDeclarationNodeQuery,
        constructorDeclarationNodeQuery,
        constructorsDeclarationNodeQuery } = queries;

function verifyDeclaration(declarationNode, context) {
  const keywordNode = keywordNodeQuery(declarationNode),
        keywordNodeContent = keywordNode.getContent(),
        keyword = keywordNodeContent;  ///

  switch (keyword) {
    case 'Type': {
      const typeDeclarationNode = typeDeclarationNodeQuery(declarationNode);

      verifyTypeDeclaration(typeDeclarationNode, context);
      break;
    }

    case 'Variable': {
      const variableDeclarationNode = variableDeclarationNodeQuery(declarationNode);

      verifyVariableDeclaration(variableDeclarationNode, context);
      break;
    }

    case 'Variables': {
      const variablesDeclarationNode = variablesDeclarationNodeQuery(declarationNode);

      verifyVariablesDeclaration(variablesDeclarationNode, context);
      break;
    }

    case 'Constructor': {
      const constructorDeclarationNode = constructorDeclarationNodeQuery(declarationNode);

      verifyConstructorDeclaration(constructorDeclarationNode, context);
      break;
    }

    case 'Constructors': {
      const constructorsDeclarationNode = constructorsDeclarationNodeQuery(declarationNode);

      verifyConstructorsDeclaration(constructorsDeclarationNode, context);
      break;
    }
  }
}

module.exports = verifyDeclaration;