const fs = require("fs");

const input = fs.readFileSync("day4.txt", "utf8").trim().split("\n\n");

const parseInput = (input) => {
	const drawnNums = input[0].split(",").map((e) => parseInt(e, 10));

	const boards = input.slice(1).map((e) =>
		e
			.split("\n")
			.map((e) =>
				e
					.split(" ")
					.filter((e) => e !== "")
					.map((e) => parseInt(e, 10))
			)
			.reduce((acc, e) => [...acc, ...e], [])
	);

	return { drawnNums, boards };
};

const isBoardWinning = (board) => {
	const winningCombos = [
		// rows
		[0, 1, 2, 3, 4],
		[5, 6, 7, 8, 9],
		[10, 11, 12, 13, 14],
		[15, 16, 17, 18, 19],
		[20, 21, 22, 23, 24],
		// columns
		[0, 5, 10, 15, 20],
		[1, 6, 11, 16, 21],
		[2, 7, 12, 17, 22],
		[3, 8, 13, 18, 23],
		[4, 9, 14, 19, 24],
		// don't count diagonals
	];

	for (let combo of winningCombos) {
		if (combo.reduce((acc, idx) => acc && board[idx] === null, true)) {
			return board.reduce((acc, el) => acc + (el !== null ? el : 0), 0);
		}
	}

	return false;
};

const findFirstWinningBoard = (input) => {
	let { drawnNums, boards } = parseInput(input);

	for (let num of drawnNums) {
		boards = boards.map((board) => board.map((el) => (el === num ? null : el)));

		for (let board of boards) {
			const result = isBoardWinning(board);
			if (result !== false) {
				return result * num;
			}
		}
	}
};

console.log(findFirstWinningBoard(input));

const findLastWinningBoard = (input) => {
	let { drawnNums, boards } = parseInput(input);

	for (let num of drawnNums) {
		boards = boards.map((board) => board.map((el) => (el === num ? null : el)));

		const remainingBoards = boards.filter(
			(board) => isBoardWinning(board) === false
		);

		if (remainingBoards.length > 0) {
			boards = remainingBoards;
		} else {
			const lastWinningBoard = boards[boards.length - 1];

			return isBoardWinning(lastWinningBoard) * num;
		}
	}
};

console.log(findLastWinningBoard(input));
