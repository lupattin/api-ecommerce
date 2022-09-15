export function setLimitsAndOffset(limit:number, offset:number) {
    const maxLimit = 100
    const maxOffset = 100

    const finalLimit = limit <= maxLimit ? limit : maxLimit;
    const finalOffset = offset <= maxLimit ? offset : maxLimit;
    return {
        finalLimit,
        finalOffset
    }
}