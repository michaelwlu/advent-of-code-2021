const fs = require("fs");

const input = fs.readFileSync("day5.txt", "utf8").split("\n");

// console.log(input);

const parseInput = (input) => {
	return input.map((segment) =>
		segment
			.split(" -> ")
			.map((point) => point.split(",").map((str) => parseInt(str, 10)))
	);
};

// console.log(parseInput(input));

const getDimensions = (lines) => {
	let xMax = 0;
	let yMax = 0;

	lines.forEach((line) => {
		xMax = Math.max(xMax, line[0][0], line[1][0]);
		yMax = Math.max(yMax, line[0][1], line[1][1]);
	});

	return [xMax + 1, yMax + 1];
};

const findOverlappingPointsWithHVLines = (input) => {
	const lines = parseInput(input);

	const [xLength, yLength] = getDimensions(lines);

	const field = Array(xLength * yLength).fill(0);

	const vLines = lines.filter((lineArr) => lineArr[0][0] === lineArr[1][0]);

	const hLines = lines.filter((lineArr) => lineArr[0][1] === lineArr[1][1]);

	vLines.forEach((line) => {
		const maxY = Math.max(line[0][1], line[1][1]);
		const minY = Math.min(line[0][1], line[1][1]);

		for (let i = minY; i <= maxY; i++) {
			field[xLength * line[0][0] + i]++;
		}
	});

	hLines.forEach((line) => {
		const maxX = Math.max(line[0][0], line[1][0]);
		const minX = Math.min(line[0][0], line[1][0]);

		for (let i = minX; i <= maxX; i++) {
			field[xLength * i + line[0][1]]++;
		}
	});

	return field.reduce((count, point) => (count += point > 1 ? 1 : 0), 0);
};

console.log(findOverlappingPointsWithHVLines(input));

const findOverlappingPointsWithAllLines = (input) => {
	const lines = parseInput(input);

	const [xLength, yLength] = getDimensions(lines);

	const field = Array(xLength * yLength).fill(0);

	const vLines = lines.filter((lineArr) => lineArr[0][0] === lineArr[1][0]);

	const hLines = lines.filter((lineArr) => lineArr[0][1] === lineArr[1][1]);

	const diagLines = lines.filter(
		(lineArr) =>
			lineArr[0][0] !== lineArr[1][0] && lineArr[0][1] !== lineArr[1][1]
	);

	vLines.forEach((line) => {
		const maxY = Math.max(line[0][1], line[1][1]);
		const minY = Math.min(line[0][1], line[1][1]);

		for (let i = minY; i <= maxY; i++) {
			field[xLength * line[0][0] + i]++;
		}
	});

	hLines.forEach((line) => {
		const maxX = Math.max(line[0][0], line[1][0]);
		const minX = Math.min(line[0][0], line[1][0]);

		for (let i = minX; i <= maxX; i++) {
			field[xLength * i + line[0][1]]++;
		}
	});

	diagLines.forEach((line, idx) => {
		const maxX = Math.max(line[0][0], line[1][0]);
		const minX = Math.min(line[0][0], line[1][0]);
		const [minIdx, otherIdx] = minX === line[0][0] ? [0, 1] : [1, 0];
		let startingY = line[minIdx][1];
		let isStartingYMax = line[minIdx][1] > line[otherIdx][1];

		for (let i = minX; i <= maxX; i++) {
			field[xLength * i + startingY]++;
			startingY += isStartingYMax ? -1 : 1;
		}
	});

	return field.reduce((count, point) => (count += point > 1 ? 1 : 0), 0);
};

console.log(findOverlappingPointsWithAllLines(input));
