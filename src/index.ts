const filePath = process.argv[2];

if (!filePath) {
    console.error('Please provide an input file as argument.');
    process.exit(1);
}
