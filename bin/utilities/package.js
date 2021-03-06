"use strict";

const { Query } = require("occam-dom"),
      { filePathUtilities } = require("occam-open-cli"),
      { fileSystemUtilities } = require("necessary"),
      { CombinedCustomGrammar } = require("occam-custom-grammars"),
      { MetaJSONLexer, MetaJSONParser } = require("occam-grammars");

const { trimDoubleQuotes } = require("../utilities/content"),
      { customGrammarFromDirectoryPath } = require("../utilities/customGrammar");

const { isFilePathFlorenceFilePath } = filePathUtilities,
      { checkFileExists, readFile, readDirectory } = fileSystemUtilities;

const metaJSONLexer = MetaJSONLexer.fromNothing(),
      metaJSONParser = MetaJSONParser.fromNothing(),
      dependencyStringLiteralNodesQuery = Query.fromExpression("//dependency//@string-literal");

function findPackageContext(packageName, packageContexts) {
  const packageContext = packageContexts.find((packageContext) => {
    const packageContextPackageName = packageContext.getPackageName();

    if (packageContextPackageName === packageName) {
      return true;
    }
  });

  return packageContext;
}

function filePathsFromPackageName(packageName) {
  let filePaths;

  const directoryPath = packageName,  ///
        fileNames = readDirectory(directoryPath);

  filePaths = fileNames.map((fileName) => `${directoryPath}/${fileName}`);

  const florenceFilePaths = filePaths.filter(isFilePathFlorenceFilePath);

  filePaths = florenceFilePaths;  ///

  return filePaths;
}

function dependencyPackageNamesFromPackageName(packageName) {
  let dependencyPackageNames = [];

  const directoryPath = packageName,  ///
        metaJSONFilePath = `${directoryPath}/meta.json`,
        metaJSONFileExists = checkFileExists(metaJSONFilePath);

  if (metaJSONFileExists) {
    const metaJSONFileContent = readFile(metaJSONFilePath),
          content = metaJSONFileContent,  ///
          tokens = metaJSONLexer.tokenise(content),
          node = metaJSONParser.parse(tokens),
          dependencyStringLiteralNodes = dependencyStringLiteralNodesQuery.execute(node);

    dependencyPackageNames = dependencyStringLiteralNodes.map((dependencyStringLiteralNode) => {
      const dependencyStringLiteralNodeContent = dependencyStringLiteralNode.getContent(),
            dependencyPackageName = trimDoubleQuotes(dependencyStringLiteralNodeContent);

      return dependencyPackageName;
    });
  }

  return dependencyPackageNames;
}

function combinedCustomGrammarFromPackageNames(packageNames) {
  const customGrammars = customGrammarsFromPackageNames(packageNames),
        combinedCustomGrammar = CombinedCustomGrammar.fromCustomGrammars(customGrammars);

  return combinedCustomGrammar;
}

module.exports = {
  findPackageContext,
  filePathsFromPackageName,
  dependencyPackageNamesFromPackageName,
  combinedCustomGrammarFromPackageNames
};

function customGrammarFromPackageName(packageName) {
  const directoryPath = packageName,  ///
        customGrammar = customGrammarFromDirectoryPath(directoryPath);

  return customGrammar;
}

function customGrammarsFromPackageNames(packageNames) {
  const customGrammars = packageNames.map((packageName) => customGrammarFromPackageName(packageName));

  return customGrammars;
}
