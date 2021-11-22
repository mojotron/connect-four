# Connect fore

## What have I learned

Set up ESLint and Prettier. ESLint is JavaScript linting tool (+). Prettier is a formatting tool(+).
Airbnb JavaScript Style Guide.
Setting up Visual Studio Code to automatically run ESLint and Prettier.
Set up pre-commit hook at will run ESLint and Prettier before you commit.
Install development dependacies.
npm install --save-dev eslint eslint-config-prettier prettier
Create a ESLint config file.
npx eslint --init
"extends": ["other-stuff", "prettier"], <= eslint-config-prettier - that simply override conflicting rules between ESLint and Prettier
.prettierrc
scripts
"format:check": "prettier --check .",
"format:write": "prettier --write .",
"lint:check": "eslint .",
"lint:fix": "eslint --fix ."
