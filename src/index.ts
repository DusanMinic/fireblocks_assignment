import { readFileSync } from "node:fs";

const filePath = process.argv[2];
if (!filePath) {
    console.error('Please provide an input file as argument.');
    process.exit(1);
}

// holds a literal numeric value.
interface InputCell {
    type: 'input';
    value: number;
}

// holds a formula (without the '='), a list of dependencies, and its computed numeric value
interface ComputedCell {
    type: 'computed';
    formula: string;
    dependencies: number[];
    value: number;
}

// A union type for any reactive cell.
type ReactiveCell = InputCell | ComputedCell;

function createCell(definition: string): ReactiveCell {
    const trimmedDefinition = definition.trim();
    const isFormula = trimmedDefinition.startsWith('=');

    if (isFormula) {
        // We remove the '=' from the string and save it as a formula
        const formula = trimmedDefinition.substring(1);

        return {
            type: 'computed',
            formula,
            dependencies: [],
            value: 0
        }
    }

    // We return the InputCell with the value parsed as a number
    return {
        type: 'input',
        value: Number(trimmedDefinition)
    }
}

function parseCells(input: string): ReactiveCell[] {
    return input
        .split(',')
        .map((cell) => createCell(cell.trim()));
}

function evaluateExpression(expr: string): number {
    // We remove space and split the expression into numbers and operators, ex. '10+7*5' => ['10', '+', '7', '*', '5']
    const tokens = expr.replace(/\s+/g, '').split(/([+\-*/])/);
    // The first element is operand and the second one is operator and so on
    let result = parseFloat(tokens[0]);
    for (let i = 1; i < tokens.length; i += 2) {
        const operator = tokens[i];
        const operand = parseFloat(tokens[i + 1]);
        switch (operator) {
            case '+':
                result += operand;
                break;
            case '-':
                result -= operand;
                break;
            case '*':
                result *= operand;
                break;
            case '/':
                result /= operand;
                break;
            default:
                console.error(`Unknown operator ${operator}`);
                break;
        }
    }

    return result;
}

// Replaces cell references in the form {<index>} with the corresponding cell's value
function evaluateFormula(formula: string, cells: ReactiveCell[]): number {
    const replaced = formula.replace(/{(\d+)}/g, (_, indexStr) => {
        const index = parseInt(indexStr, 10);
        if (index >= 0 && index < cells.length) {
            return cells[index].value.toString();
        } else {
            console.error(`Invalid cell reference {${index}} in formula.`);
            return '0';
        }
    });

    return evaluateExpression(replaced);
}

// recursively updates the value of computed cells
function updateCells(cells: ReactiveCell[]): void {
    let updated = false;

    for (const cell of cells) {
        if (cell.type === 'computed') {
            const newValue = evaluateFormula(cell.formula, cells);
            if (newValue !== cell.value) {
                cell.value = newValue;
                updated = true;
            }
        }
    }

    // If any cell was updated, we need to recompute all cells
    if (updated) {
        updateCells(cells);
    }
}

// Prints all cell values
function printCells(cells: ReactiveCell[]): void {
    const state = cells.map((cell, index) => `[${index}: ${cell.value}]`).join(', ');
    console.log(state);
}

// Small test:
const testInput = readFileSync(filePath, 'utf-8');

const cells = parseCells(testInput);

updateCells(cells);

console.log('Test Cells:');
printCells(cells);