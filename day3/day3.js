const fs = require("fs");

const input = fs.readFileSync("day3.txt", "utf-8").trim().split("\n");

const getPowerConsumption = (input) => {
	let gamma = "";
	let epsilon = "";

	const binaryLength = input[0].length;

	for (let i = 0; i < binaryLength; i++) {
		const setBitCount = input.reduce((count, e) => {
			return count + Number(e[i]);
		}, 0);

		gamma += setBitCount >= input.length / 2 ? "1" : "0";
		epsilon += setBitCount < input.length / 2 ? "1" : "0";
	}

	return parseInt(gamma, 2) * parseInt(epsilon, 2);
};

console.log(getPowerConsumption(input));

const getLifeSupport = (input) => {
	let o2Arr = [...input];
	let co2Arr = [...input];

	const binaryLength = input[0].length;

	for (let i = 0; i < binaryLength; i++) {
		const o2SetBitCount = o2Arr.reduce((count, e) => {
			return count + Number(e[i]);
		}, 0);

		const o2MostCommon = o2SetBitCount >= o2Arr.length / 2 ? "1" : "0";

		o2Arr =
			o2Arr.length > 1 ? o2Arr.filter((e) => e[i] === o2MostCommon) : o2Arr;

		const co2SetBitCount = co2Arr.reduce((count, e) => {
			return count + Number(e[i]);
		}, 0);

		const co2LeastCommon = co2SetBitCount < co2Arr.length / 2 ? "1" : "0";

		co2Arr =
			co2Arr.length > 1
				? co2Arr.filter((e) => e[i] === co2LeastCommon)
				: co2Arr;
	}

	return parseInt(o2Arr[0], 2) * parseInt(co2Arr[0], 2);
};

console.log(getLifeSupport(input));
