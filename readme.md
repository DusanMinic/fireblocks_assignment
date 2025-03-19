# Fireblocks Assignment - Reactive System CLI

This CLI application implements a simple reactive system similar to a spreadsheet. It features two types of cells:

- **Input Cells:** Hold literal numeric values.
- **Computed Cells:** Hold a formula (starting with `=`) that references other cells using `{<index>}` notation. Computed cells update their values automatically when the input cells change.

## Features

- **Reactive Updates:** Computed cells recalculate automatically when input values change.
- **Interactive Console Menu:** Provides options to:
  - Print the current state of all cells.
  - Change the value of a cell, triggering updates to dependent computed cells.
- **Formula Evaluation:** Supports basic arithmetic operations (`+`, `-`, `*`, `/`)


## Installation
### Prerequisites
- Node.js installed (>= 20.0.0)

### Setup
1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd fireblocks_assignment
   ```
2. Install dependencies:
   ```sh
   npm install
   ```

## Usage
### Running the Program
```sh
npm start <path-to-input-file>
```
Example:
```sh
npm start input.txt
```

### Input File Format
The input file should contain a **comma-separated list of cell definitions**. Each cell can either be:
- A **direct number** (e.g., `5` or `12`)
- A **formula** prefixed with `=` and referencing other cells via `{index}` (e.g., `=2+{0}`)

Example input file:
```
2, 18, =2*{0}, 9, ={2}+1*5
```

### Interactive Commands
Once running, the program presents a menu:
- `a` - Print the current state of all cells.
- `b <cell index> <new value>` - Change a cell's value.

#### Example Execution
```
Menu:
a. Print current state
b. Change value (usage: b <cell index> <new value>)

# a
[0: 2], [1: 18], [2: 4], [3: 9], [4: 25]

# b 0 3
Cell #0 changed to 3

# a
[0: 3], [1: 18], [2: 6], [3: 9], [4: 35]
```

## Development

### Testing
Tests are not included in the initial implementation but can be added later.
