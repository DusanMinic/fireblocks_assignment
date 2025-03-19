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