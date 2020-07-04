const moveItem = (
    array: any[],
    from: number,
    to: number,
) => {
    return array.map((item, index, initial) => {
        const isFromIndex = index === from;
        const isToIndex = index === to;
        
        if (isFromIndex) {
            return initial[to];
        } else if (isToIndex) {
            return initial[from];
        } else {
            return item;
        }
    });
};
