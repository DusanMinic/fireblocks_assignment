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