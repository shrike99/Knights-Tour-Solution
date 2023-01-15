function knightTour(size, x, y) {
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

// Test the function
console.log(knightTour(8, 0, 0));
