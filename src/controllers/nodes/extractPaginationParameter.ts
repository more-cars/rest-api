import express from "express"

export function extractPaginationParameter(req: express.Request): number {
    const page = req.query.page as string

    return page ? parseInt(page, 10) : 1
}
