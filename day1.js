const fs = require("fs");

const input = fs
	.readFileSync("day1.txt", "utf-8")
	.trim()
	.split("\n")
	.map((e) => Number(e));

const getDecreasingCount = (input) => {
	return input.reduce((count, curr, idx, arr) => {
		return count + (idx > 0 && curr > arr[idx - 1] ? 1 : 0);
	}, 0);
};

const getIncreasingThreeMeasurementSums = (input) => {
	let count = 0;
	let threeSum = input[0] + input[1] + input[2];

	for (let i = 3; i < input.length; i++) {
		const prev = threeSum;

		threeSum = threeSum - input[i - 3] + input[i];

		count += threeSum > prev;
	}

	return count;
};

console.log(getDecreasingCount(input));
console.log(getIncreasingThreeMeasurementSums(input));
