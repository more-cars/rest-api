import express from "express"
import {create} from "./magazine-issues/create"
import {getById} from "./magazine-issues/getById"
import {getAll} from "./magazine-issues/getAll"
import {deleteNode} from "./magazine-issues/deleteNode"
import {createBelongsToMagazineRelation} from "./magazine-issues/createBelongsToMagazineRelation"
import {getBelongsToMagazineRelation} from "./magazine-issues/getBelongsToMagazineRelation"
import {deleteBelongsToMagazineRelation} from "./magazine-issues/deleteBelongsToMagazineRelation"

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

    async createBelongsToMagazineRelation(req: express.Request, res: express.Response) {
        await createBelongsToMagazineRelation(req, res)
    },

    async getBelongsToMagazineRelation(req: express.Request, res: express.Response) {
        await getBelongsToMagazineRelation(req, res)
    },

    async deleteBelongsToMagazineRelation(req: express.Request, res: express.Response) {
        await deleteBelongsToMagazineRelation(req, res)
    },
}
