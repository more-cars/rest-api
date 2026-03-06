import express from "express"
import {create} from "./ratings/create"
import {getById} from "./ratings/getById"
import {getAll} from "./ratings/getAll"
import {deleteNode} from "./ratings/deleteNode"
import {createByMagazineIssueRelation} from "./ratings/createByMagazineIssueRelation"
import {getByMagazineIssueRelation} from "./ratings/getByMagazineIssueRelation"

export const RatingController = {
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

    async createByMagazineIssueRelation(req: express.Request, res: express.Response) {
        await createByMagazineIssueRelation(req, res)
    },

    async getByMagazineIssueRelation(req: express.Request, res: express.Response) {
        await getByMagazineIssueRelation(req, res)
    },
}
