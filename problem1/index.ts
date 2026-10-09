const sumToNFormula = (n: number) => {
    return n * (n + 1) / 2;
};

const sumToNLoop = (n: number) => {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
};

const sumToNRecursive = (n: number) => {
    if (n <= 1) {
        return n;
    }
    return n + sumToNRecursive(n - 1);
};

