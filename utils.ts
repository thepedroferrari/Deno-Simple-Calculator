import { BREAK_NUMBERS_REGEX, Messages, OPS_ARR } from "./constants.ts";
import type { Operation } from "./types.ts";

/**
 * @param str string
 * @returns string
 * @description takes up a string and utilises other utility functions in order
 * to get the final result or an error message.
 * * Although this is an expensive algorithm with a high complexity, spending time
 * to tune it might not be much benefitial given the fact that the max-size of
 * any given url can't be greater than 2KB. Unless this is called hundreds+ of
 * times per second I don't see an issue with it.
 * @fires splitNumbersAndChars
 * @fires validateInput
 * @fires performOperations
 * @emits O(n²)
 */
export const calculateString = (str: string) => {
  // We shouldn't use eval since strings can be manipulated in a way that even
  // after cleaning up it could be still dangerous. Doing extra work to cleanup
  // the string beats the purpose of simplifying with eval in the first place.
  // Plus the scope of the project is to work for certain math operations and
  // not all. It is not a full-fledged calculator.
  // return eval(str);
  const numbersAndOperationsArr = splitNumbersAndChars(str);
  const isValidInput = validateInput(numbersAndOperationsArr);

  if (!isValidInput) return Messages.INVALID_INPUT;

  const calculateResult = performOperations(numbersAndOperationsArr);
  return calculateResult;
};

/**
 * @param a number
 * @param op Operation (+ / - / * / +- / *-)
 * @param b number
 * @returns number OR NaN (typeof number)
 * @emits O(1)
 */
const handleExpression = (a: number, op: Operation, b: number) => {
  switch (op) {
    case "*":
      return a * b;

    case "+":
      return a + b;

    case "-":
    case "+-":
      return a - b;

    case "*-":
      return a * -b;

    default:
      return NaN;
  }
};

/**
 * @param numsAndOps string[]
 * @param operation Operation
 * @description Takes the params and checks if there are operations left to be
 * made. In the event that it is done, it returns false. Otherwise it should
 * try to calculate the next operation available from left to right.
 * @returns false OR string[]
 * @emits O(n)
 */
const handleOperation = (numsAndOps: string[], operation: Operation) => {
  const filteredInput = numsAndOps.filter((item) => item !== "");
  const operationIndex = filteredInput.indexOf(operation);

  // There are no more operations to be made.
  if (operationIndex === -1) return false;

  // Deals with a malformed string such as "*2+3" by ignoring the *.
  // if the operation is malformed by starting with an operation that is not -
  // it returns false. Number([]) === 0 so if we start with a - operation
  // the previous slice will return [] which will evaluate to 0 - n, or -n.
  if (operationIndex === 0 && operation !== "-") return false;

  // we want to gather only the smallest form of operation we can make.
  // for these operations as humans what we do is to look at the left side
  // at the operator and the right side. We come up with a result and substitute
  // the previous with the result. eg.:
  // 10 + 20 * 2 - 4 --> 10 + (20 * 2) - 4 --> 10 + 40 - 4
  const expression = filteredInput.slice(
    operationIndex - 1,
    operationIndex + 2
  );

  // We cast the values as numbers so we can perform mathematical expressions
  const result = handleExpression(
    Number(expression[0]),
    expression[1] as Operation,
    Number(expression[2])
  );

  // We are re-writing the values on the copied / cleanedup array
  filteredInput.splice(operationIndex - 1, 3, String(result));

  return filteredInput;
};

/**
 * @param numsAndOps string[]
 * @returns string
 * @description Is responsible for getting the array of strings that contains
 * the numbers and operations, and loop through each operation in order, to then
 * perform singular calculations on each small block and reduce the initial
 * array into an array of length 1, where the remaining item is the result.
 * @fires handleOperation
 * @emits O(6n²)
 */
const performOperations = (numsAndOps: string[]) => {
  // We are going to manipulate and re-assign this array, at the end it should
  // be of length 1.
  let result = [...numsAndOps];

  // We want to recursively loop through the array of operations. There are few
  // expected possibilities (5) so this may be O(5n) / O(n).
  for (const operation of OPS_ARR) {
    // We could check each time for result.includes(operation), but we will
    // also receive false from handleOperation and can break when that happens.
    // We save a bit on operations checking for while true instead.
    while (true) {
      // TODO: Investigate the whole operation may be better as a linked list
      const next = handleOperation(result, operation);
      if (next === false) break;
      result = next;
    }
  }

  // at this point our result array should be only of length 1. We can return it
  return result[0];
};

/**
 * @param input string
 * @returns string[]
 * @description Utilises a defined Regex to search and replace a string into
 * chunks of data, separating numbers but leaving them together, while keeping
 * the rest in-between numbers apart but also at the same chunk.
 * @emits O(n*k)
 */
const splitNumbersAndChars = (input: string) =>
  input.split(BREAK_NUMBERS_REGEX);

/**
 * Performs a O(n) operation
 * Checks if the characters are valid by checking if they are numbers or
 * valid arithmetic operators.
 * @param input Array of Strings
 */
const validateInput = (input: string[]) => {
  // for of allows for abrupt termination
  for (const str of input) {
    if (str === "") continue;
    // Test if it is a number
    if (parseFloat(str)) {
      continue;
    }
    // test if it is a valid operation
    if (OPS_ARR.includes(str as Operation)) {
      continue;
    }
    // The above are the only allowed cases, anything else should be invalid.
    return false;
  }
  return true;
};
