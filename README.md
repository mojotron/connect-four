# Connect four

Goal of this project is to learn new skills, build awesome project and to have fun.

[Play Connect four](https://mojotron.github.io/connect-four/). Game is hosted via Github Pages.

# How to play

Goal of the game is to get four tokens connected on the board.
Game has simple and basic design. On the page load, user choose desired game mode. After pressing the 'Start New Game' button, board is created and game randomly pick which player goes first. First player icon is displayed above board. To place token user clicks on desired board column. After click current player is switched and next player icon is displayed.

| Game mode        | Minimax Recursion Depth |
| ---------------- | :---------------------: |
| Player vs Player |          none           |
| Easy             |            3            |
| Normal           |            4            |
| Hard             |            5            |

## What have I learned

- Set up JavaScript linting tool ESLint and formatting tool Prettier.
- Fallow Airbnb JavaScript Style Guide.
- Setting up Visual Studio Code to automatically run ESLint and Prettier.
- Set up pre-commit hook that will run ESLint and Prettier before you commit with Husky package.
- Override conflicting rules between ESLint and Prettier.
- Configure ESLint and Prettier.

- Upgrade Minimax algorithm with alpha beta pruning

## Connect four AI

Minimax is a decision rule used in artificial intelligence, decision theory, game theory, statistics, and philosophy for minimizing the possible loss for a worst case (maximum loss) scenario. When dealing with gains, it is referred to as "maximin"—to maximize the minimum gain. Originally formulated for n-player zero-sum game theory, covering both the cases where players take alternate moves and those where they make simultaneous moves, it has also been extended to more complex games and to general decision-making in the presence of uncertainty.

To improve minimax performance, alpha-beta pruning is added to the algorithm. Alpha-beta pruning is search algorithm that looks up to decrease number of nodes to evaluate. It stops evaluating a move when at least one possibility has been found that proves the move to be worse than a previously examined move. Such moves need not be evaluated further. When applied to a standard minimax tree, it returns the same move as minimax would, but prunes away branches that cannot possibly influence the final decision.

Before this project I made minimax algorithm in the [Tic Tac Toe](https://github.com/mojotron/tic-tac-toe) game. I used same algorithm and modified it for connect four game. Biggest problem was evaluating part of the algorithm but with help of the resources, and after understanding what to do it was pretty easy to implement algorithm. Extending minimax algorithm to alpha-beta pruning is straight forward if minimax is working.

## Minimax Resources

My Tic Tac Toe [minimax](https://github.com/mojotron/tic-tac-toe/blob/main/JS/ticTacToeMinimax.js) algorithm.
Alpha–beta pruning [wikipedia](https://en.wikipedia.org/wiki/Alpha%E2%80%93beta_pruning) page.
Great code along [video](https://www.youtube.com/watch?v=MMLtza3CZFM) tutorial by [Keith Galli](https://github.com/KeithGalli).
Awesome [video](https://www.youtube.com/watch?v=l-hh51ncgDI) with detaile minimax and alpha-beta pruning explanation by [Sebastian Lague](https://github.com/SebLague).
