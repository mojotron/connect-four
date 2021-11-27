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

Minimax
Alpha beta pruning

## Connect four AI

Minimax is a decision rule used in artificial intelligence, decision theory, game theory, statistics, and philosophy for minimizing the possible loss for a worst case (maximum loss) scenario. When dealing with gains, it is referred to as "maximin"—to maximize the minimum gain. Originally formulated for n-player zero-sum game theory, covering both the cases where players take alternate moves and those where they make simultaneous moves, it has also been extended to more complex games and to general decision-making in the presence of uncertainty.

To improve minimax performance, alpha-beta pruning is added to the algorithm. Alpha-beta pruning is search algorithm that looks up to decrease number of nodes to evaluate. It stops evaluating a move when at least one possibility has been found that proves the move to be worse than a previously examined move. Such moves need not be evaluated further. When applied to a standard minimax tree, it returns the same move as minimax would, but prunes away branches that cannot possibly influence the final decision.

Before this project I made minimax algorithm in Tic Tac Toe game. I used that algorithm and modified it for connect four game. Biggest problem was evaluating part of the algorithm but with help of resources and after understanding what tot do it was pretty easy to. Extending minimax algorithm to alpha-beta pruning is straight forward when you understand data flow through recursion calls.

## Minimax Resources

My Tic Tac Toe [minimax](https://github.com/mojotron/tic-tac-toe/blob/main/JS/ticTacToeMinimax.js) algorithm.
Alpha–beta pruning [wikipedia](https://en.wikipedia.org/wiki/Alpha%E2%80%93beta_pruning) page.
Great code along [video](https://www.youtube.com/watch?v=MMLtza3CZFM) tutorial by [Keith Galli](https://github.com/KeithGalli).
Awesome [video](https://www.youtube.com/watch?v=l-hh51ncgDI) with detaile minimax and alpha-beta pruning explanation by [Sebastian Lague](https://github.com/SebLague).
