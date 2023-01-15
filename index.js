function backtrack(size, x, y) {
	// Initialize the chess board with -1 to indicate unvisited squares
	const board = new Array(size).fill(0).map(() => new Array(size).fill(-1));

	// Initialize the move counter
	let moveCounter = 0;

	// Function to check if a move is valid
	function isValidMove(x, y) {
		return x >= 0 && x < size && y >= 0 && y < size && board[x][y] === -1;
	}

	// Function to perform a move
	function move(x, y) {
		board[x][y] = moveCounter++;

		// If all the squares have been visited, return true
		if (moveCounter === size ** 2) return true;

		// Try all the possible moves from the current position
		for (let i = 0; i < size + 1; i++) {
			let newX = x + dx[i];
			let newY = y + dy[i];
			if (isValidMove(newX, newY) && move(newX, newY)) return true;
		}
		// If no move is possible, backtrack
		board[x][y] = -1;
		moveCounter--;

		return false;
	}

	// Array to store the possible moves of the knight
	let dx = [2, 1, -1, -2, -2, -1, 1, 2];
	let dy = [1, 2, 2, 1, -1, -2, -2, -1];

	// Start the knight's tour at the given initial position
	move(x, y);
	return board;
}

function warnsdorffHeuristic(size, startX, startY) {
	// Create an empty board
	const board = createEmptyBoard(size);
	// Mark the starting position as visited
	board[startX][startY] = 1;
	// Initialize current position and tour count
	let currentPos = { x: startX, y: startY };
	let tourCount = 1;
	// Loop until the tour is complete
	while (tourCount < size ** 2) {
		// Get the next position to move to using the Warnsdorff's heuristic
		currentPos = getNextMove(board, currentPos);
		// Mark the position as visited and increment the tour count
		board[currentPos.x][currentPos.y] = ++tourCount;
	}
	// Return the completed tour
	return board;

	function createEmptyBoard(size) {
		// Create an empty 2D array of size x size
		return Array.from({ length: size }, () => Array(size).fill(-1));
	}

	function getNextMove(board, currentPos) {
		// Get the valid next moves from the current position
		let nextMoves = getValidMoves(board, currentPos);
		// Sort the next moves by the number of available moves from each position
		nextMoves.sort((a, b) => getValidMoves(board, a).length - getValidMoves(board, b).length);
		// Return the position with the least number of available moves
		return nextMoves[0];
	}

	function getValidMoves(board, currentPos) {
		// Define the possible moves for the knight
		let moves = [
			{ x: currentPos.x - 2, y: currentPos.y - 1 },
			{ x: currentPos.x - 2, y: currentPos.y + 1 },
			{ x: currentPos.x - 1, y: currentPos.y - 2 },
			{ x: currentPos.x - 1, y: currentPos.y + 2 },
			{ x: currentPos.x + 1, y: currentPos.y - 2 },
			{ x: currentPos.x + 1, y: currentPos.y + 2 },
			{ x: currentPos.x + 2, y: currentPos.y - 1 },
			{ x: currentPos.x + 2, y: currentPos.y + 1 },
		];
		// Filter out moves that are out of bounds or have already been visited
		return moves.filter((move) => move.x >= 0 && move.x < board.length && move.y >= 0 && move.y < board.length && board[move.x][move.y] === -1);
	}
}

function divide_and_conquer(size, x, y) {
	// Function to solve the tour using Divide & Conquer
	function solveTour(board, stepCount, x, y, moves) {
		// If all the squares have been visited, return true
		if (stepCount === size ** 2) return true;

		// Try all the possible moves from the current position
		for (let i = 0; i < moves.length; i++) {
			let newX = x + moves[i][0];
			let newY = y + moves[i][1];
			if (isValidMove(newX, newY, board.length) && board[newX][newY] === -1) {
				board[newX][newY] = stepCount;
				if (solveTour(board, stepCount + 1, newX, newY, moves)) {
					return true;
				} else {
					board[newX][newY] = -1;
				}
			}
		}
		return false;
	}

	// Function to check if a move is valid
	function isValidMove(x, y, size) {
		return x >= 0 && x < size && y >= 0 && y < size;
	}

	// Initialize the chess board with -1 to indicate unvisited squares
	const board = new Array(size).fill(0).map(() => new Array(size).fill(-1));

	// Define the possible moves for the knight
	let moves = [
		[2, 1],
		[1, 2],
		[-1, 2],
		[-2, 1],
		[-2, -1],
		[-1, -2],
		[1, -2],
		[2, -1],
	];

	// Start the tour at the initial x and y coordinates
	board[x][y] = 0;
	return solveTour(board, 1, x, y, moves) ? board : null;
}

// Test each one

//console.log(backtrack(8, 0, 0));
//console.log(divide_and_conquer(8, 0, 0));
console.log(warnsdorffHeuristic(99, 0, 0));
