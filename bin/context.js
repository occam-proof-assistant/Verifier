'use strict';

class Context {
  constructor(types, variables, constructors) {
    this.types = types;
    this.variables = variables;
    this.constructors = constructors
  }

  addType(type) {
    const typeString = type.asString();

    this.types.push(type);

    console.log(`Added the '${typeString}' type to the context.`);
  }

  addVariable(variable) {
    const variableString = variable.asString();

    this.variables.push(variable);

    console.log(`Added the '${variableString}' variable to the context.`);
  }

  addConstructor(constructor) {
    const constructorString = constructor.asString();

    this.constructors.push(constructor);

    console.log(`Added the '${constructorString}' constructor to the context.`);
  }

  isTypePresentByTypeName(typeName) {
    const typePresent = this.types.some((type) => {
      const typeNamesMatch = type.matchTypeName(typeName);

      if (typeNamesMatch) {
        return true;
      }
    });

    return typePresent;
  }

  isTypeMissingByTypeName(typeName) {
    const typePresent = this.isTypePresentByTypeName(typeName),
          typeMissing = !typePresent;

    return typeMissing;
  }

  isSubTypeMissingBySubTypeName(subTypeName) {
    const subTypeMissing = this.types.every((type) => {
      const typeNamesMatch = type.matchTypeName(subTypeName);

      if (!typeNamesMatch) {
        return true;
      }
    });

    return subTypeMissing;
  }

  isVariablePresentByVariableName(VariableName) {
    const VariablePresent = this.variables.some((Variable) => {
      const VariableNamesMatch = Variable.matchVariableName(VariableName);

      if (VariableNamesMatch) {
        return true;
      }
    });

    return VariablePresent;
  }

  isConstructorPresentByConstructorName(constructorName) {
    const constructorPresent = this.constructors.some((constructor) => {
      const constructorNamesMatch = constructor.matchConstructorName(constructorName);

      if (constructorNamesMatch) {
        return true;
      }
    });

    return constructorPresent;
  }

  static fromNothing() {
    const types = [],
          variables = [],
          constructors = [],
          context = new Context(types, variables, constructors);

    return context;
  }
}

module.exports = Context;