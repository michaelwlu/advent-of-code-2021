const fs = require("fs");

const input = fs
	.readFileSync("day6.txt", "utf8")
	.split(",")
	.map((el) => parseInt(el, 10));

const example = fs
	.readFileSync("day6example.txt", "utf8")
	.split(",")
	.map((el) => parseInt(el, 10));

const simulateLanternfish = (initialFish, days) => {
	let fishByTimer = Array(9).fill(0);

	initialFish.forEach((timer) => fishByTimer[timer]++);

	for (let i = 0; i < days; i++) {
		let newFishByTimer = Array(9);
		newFishByTimer[8] = fishByTimer[0];

		for (let j = 1; j < fishByTimer.length; j++) {
			newFishByTimer[j - 1] = fishByTimer[j];
		}

		newFishByTimer[6] += newFishByTimer[8];
		fishByTimer = newFishByTimer;
	}

	return fishByTimer.reduce((acc, count) => acc + count, 0);
};

console.log(simulateLanternfish(input, 256));
console.log(simulateLanternfish(example, 80));
