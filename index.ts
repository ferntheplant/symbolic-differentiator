function main() {
	for (const t of testCases) {
		console.log(`Test case: ${t.desc}`);
		console.log(`${test(t) ? "PASS" : "FAIL"}`);
	}
}

/**
 * Ideas for domain extension
 * 1. Taylor Series
 *   - Instead of Arrays use generators to represent infinite degree polynomials
 *   - Accept some "epsilon" bound for the max degree to evaluate to
 *   - Need way to represent infinite matrices
 * 2. New Families
 *   - Represent other function families as "orthogonal" dimensions via their own arrays
 *   - Ex: Array for functions of form sin(kx) where k is the k-th entry of the array
 *   - Limits our ability to represent exponentiation of functions to naturals
 */

// The coefficient of the n-th degree term is the n-th element of the array
type Polynomial = Array<number>;

function differentiate(poly: Polynomial): Polynomial {
	const multiplyPowers = poly.map((coef, idx) => coef * idx);
	return multiplyPowers.slice(1) || [];
}

type TestCase = {
	desc: string;
	f: Polynomial;
	fPrime: Polynomial;
};

function isZeroFunction(p: Polynomial): boolean {
	return p.every((coef) => coef === 0) || p.length === 0;
}

function polyEquality(a: Polynomial, b: Polynomial): boolean {
	if (a.length !== b.length) {
		return isZeroFunction(a) && isZeroFunction(b);
	}
	for (let i = 0; i < a.length; i++) {
		if (a[i] !== b[i]) return false;
	}
	return true;
}

function test(t: TestCase): boolean {
	const tPrime = differentiate(t.f);
	return polyEquality(tPrime, t.fPrime);
}

const testCases: TestCase[] = [
	{ desc: "Basic polynomial", f: [1, 2, 3, 4, 5], fPrime: [2, 6, 12, 20] },
	{ desc: "Explicit 0 polynomial", f: [0, 0, 0, 0], fPrime: [0, 0, 0] },
	{ desc: "Implicit 0 derivative", f: [1], fPrime: [] },
	{
		desc: "N-degree with < N terms",
		f: [1, 0, 0, 3, 4, 0, 6],
		fPrime: [0, 0, 9, 16, 0, 36],
	},
];

main();
