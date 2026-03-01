import express from "express"
import {create} from "./magazine-issues/create"
import {getById} from "./magazine-issues/getById"
import {getAll} from "./magazine-issues/getAll"
import {deleteNode} from "./magazine-issues/deleteNode"

export const MagazineIssueController = {
    async create(req: express.Request, res: express.Response) {
        await create(req, res)
    },

    async getById(req: express.Request, res: express.Response) {
        await getById(req, res)
    },

    async getAll(req: express.Request, res: express.Response) {
        await getAll(req, res)
    },

    async delete(req: express.Request, res: express.Response) {
        await deleteNode(req, res)
    },
}
