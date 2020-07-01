const moveItem = (
    array: any[],
    from: number,
    to: number,
) => {
    return array.splice(to, 0, array.splice(from, 1)[0]);
}
