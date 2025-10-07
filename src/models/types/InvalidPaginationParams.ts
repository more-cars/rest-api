export class InvalidPaginationParams extends Error {
    constructor(page: unknown) {
        const message = `Pagination value 'page=${page}' is invalid.`
        super(message)
    }
}
