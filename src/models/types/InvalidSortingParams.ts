export class InvalidSortingParams extends Error {
    constructor(sortBy: unknown, sortDir: unknown) {
        const message = `Sorting params 'sort_by_property=${sortBy}' and/or 'sort_direction=${sortDir}' are invalid.`
        super(message)
    }
}
