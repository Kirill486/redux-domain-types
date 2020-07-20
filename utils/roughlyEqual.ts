export const roughlyEqual =
(
    a: number,
    b: number,
): boolean => {
    const theSameSign = ((a > 0) && (b > 0)) || ((a < 0) && (b < 0));

    const difference = a - b;
    const rough = (a > 100) ? a * 0.05 : 5;

    return theSameSign && (Math.abs(difference) < rough);
}
