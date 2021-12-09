const fs = require("fs");

const input = fs
	.readFileSync("day7.txt", "utf8")
	.split(",")
	.map((el) => parseInt(el, 10));

const example = fs
	.readFileSync("day7example.txt", "utf8")
	.split(",")
	.map((el) => parseInt(el, 10));

const findBestPosition = (input) => {
	const [min, max] = input.reduce(
		(acc, el) => [Math.min(acc[0], el), Math.max(acc[1], el)],
		[Infinity, 0]
	);

	let leastFuel = Infinity;

	for (let i = min; i <= max; i++) {
		let fuel = 0;
		let j = 0;

		while (j < input.length && fuel < leastFuel) {
			fuel += Math.abs(input[j] - i);
			j++;
		}

		leastFuel = Math.min(leastFuel, fuel);
	}

	return leastFuel;
};

console.log(findBestPosition(input));

const calculateFuelCost = (max) => {
	const memo = [0];

	for (let i = 1; i <= max; i++) {
		memo[i] = i + memo[i - 1];
	}

	return memo;
};

const findBestPositionWithNonConstantFuel = (input) => {
	const [min, max] = input.reduce(
		(acc, el) => [Math.min(acc[0], el), Math.max(acc[1], el)],
		[Infinity, 0]
	);

	let leastFuel = Infinity;
	const fuelCosts = calculateFuelCost(max);

	for (let i = min; i <= max; i++) {
		let fuel = 0;
		let j = 0;

		while (j < input.length && fuel < leastFuel) {
			fuel += fuelCosts[Math.abs(input[j] - i)];
			j++;
		}
		leastFuel = Math.min(leastFuel, fuel);
	}

	return leastFuel;
};

console.log(findBestPositionWithNonConstantFuel(input));
