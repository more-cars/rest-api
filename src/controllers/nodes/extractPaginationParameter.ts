import express from "express"

export function extractPaginationParameter(req: express.Request): number | null {
    const page = req.query.page as string

    return page ? parseInt(page, 10) : null
}
