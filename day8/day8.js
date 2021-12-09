const fs = require("fs");

const input = fs
	.readFileSync("day8.txt", "utf8")
	.split("\n")
	.map((line) => line.split(" | ").map((segment) => segment.split(" ")));

// console.log(input);

const countUniqueSegmentDigits = (input) => {
	return input.reduce(
		(acc, el) =>
			acc +
			el[1].reduce(
				(acc, values) =>
					acc +
					(values.length === 2 ||
						values.length === 4 ||
						values.length === 3 ||
						values.length === 7),
				0
			),
		0
	);
};

console.log(countUniqueSegmentDigits(input));

const getSegments = (signals) => {
	const counts = signals
		.join("")
		.split("")
		.reduce(
			(acc, letter) => ({ ...acc, [letter]: (acc[letter] ?? 0) + 1 }),
			{}
		);

	const segment5 = Object.keys(counts).find((key) => counts[key] === 4);
	const segment2 = Object.keys(counts).find((key) => counts[key] === 6);
	const segment6 = Object.keys(counts).find((key) => counts[key] === 9);

	let remaining = [...signals];

	const { one, four, seven, eight } = remaining.reduce((acc, el) => {
		if (el.length === 2) {
			return { ...acc, one: el };
		}
		if (el.length === 4) {
			return { ...acc, four: el };
		}
		if (el.length === 3) {
			return { ...acc, seven: el };
		}
		if (el.length === 7) {
			return { ...acc, eight: el };
		}
		return { ...acc };
	}, {});

	remaining = remaining.filter(
		(el) => el !== one && el !== four && el !== seven && el !== eight
	);

	const { two, three, five } = remaining
		.filter((el) => el.length === 5)
		.reduce((acc, el) => {
			const elArr = el.split("");

			if (elArr.includes(segment5)) {
				return { ...acc, two: el };
			}

			if (elArr.includes(segment2)) {
				return { ...acc, five: el };
			}

			if (elArr.includes(segment6)) {
				return { ...acc, three: el };
			}

			return { ...acc };
		}, {});

	const segment3 = three.split("").find((el) => !five.split("").includes(el));

	remaining = remaining.filter((el) => el.length === 6);

	const nine = remaining.find((el) => !el.split("").includes(segment5));

	remaining = remaining.filter((el) => el !== nine);

	const zero = remaining.find(
		(el) =>
			el.split("").includes(one.charAt(0)) &&
			el.split("").includes(one.charAt(1))
	);

	const segment4 = eight.split("").find((el) => !zero.split("").includes(el));

	return {
		segment2,
		segment3,
		segment4,
		segment5,
	};
};

const decodeSignal = (segments, signal) => {
	const arr = signal.split("");

	if (arr.length === 2) return 1;
	if (arr.length === 4) return 4;
	if (arr.length === 3) return 7;
	if (arr.length === 7) return 8;

	if (arr.length === 5) {
		if (arr.includes(segments.segment5)) return 2;
		if (arr.includes(segments.segment2)) return 5;
		return 3;
	}

	if (!arr.includes(segments.segment3)) return 6;
	if (arr.includes(segments.segment4)) return 9;
	return 0;
};

const countDecodedSignals = (input) => {
	return input.reduce((acc, el) => {
		const [inputArr, outputArr] = el;
		const segments = getSegments(inputArr);

		return (
			acc +
			outputArr.reduce((innerAcc, innerEl, idx) => {
				return (
					innerAcc + decodeSignal(segments, innerEl) * Math.pow(10, 3 - idx)
				);
			}, 0)
		);
	}, 0);
};

console.log(countDecodedSignals(input));
