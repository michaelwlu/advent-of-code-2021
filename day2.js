const fs = require("fs");

const input = fs.readFileSync("day2.txt", "utf-8").trim().split("\n");

const calculatePosition = (input) => {
	let hPos = 0;
	let depth = 0;

	input.forEach((instr) => {
		const [direction, distanceStr] = instr.split(" ");
		const distance = Number(distanceStr);

		switch (direction) {
			case "forward":
				hPos += distance;
				break;
			case "down":
				depth += distance;
				break;
			case "up":
				depth -= distance;
				break;
		}
	});

	return hPos * depth;
};

const calculatePositionWithAim = (input) => {
	let hPos = 0;
	let depth = 0;
	let aim = 0;

	input.forEach((instr) => {
		const [direction, unitsStr] = instr.split(" ");
		const units = Number(unitsStr);

		switch (direction) {
			case "forward":
				hPos += units;
				depth += aim * units;
				break;
			case "down":
				aim += units;
				break;
			case "up":
				aim -= units;
				break;
		}
	});

	return hPos * depth;
};

console.log(calculatePosition(input));
console.log(calculatePositionWithAim(input));
