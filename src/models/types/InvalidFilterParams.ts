export class InvalidFilterParams extends Error {
    constructor(filterBy: unknown, value: unknown, operator: unknown) {
        const message = `Filter params 'filter_by_property=${filterBy}' and/or 'filter_value=${value}' and/or 'filter_operator=${operator}' are invalid.`
        super(message)
    }
}
