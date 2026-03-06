import express from "express"
import {create} from "./ratings/create"
import {getById} from "./ratings/getById"
import {getAll} from "./ratings/getAll"
import {deleteNode} from "./ratings/deleteNode"
import {createByMagazineIssueRelation} from "./ratings/createByMagazineIssueRelation"
import {getByMagazineIssueRelation} from "./ratings/getByMagazineIssueRelation"
import {deleteByMagazineIssueRelation} from "./ratings/deleteByMagazineIssueRelation"
import {createForCarModelVariantRelation} from "./ratings/createForCarModelVariantRelation"
import {getForCarModelVariantRelation} from "./ratings/getForCarModelVariantRelation"
import {deleteForCarModelVariantRelation} from "./ratings/deleteForCarModelVariantRelation"
import {createHasImageRelation} from "./ratings/createHasImageRelation"
import {getAllHasImageRelations} from "./ratings/getAllHasImageRelations"
import {deleteHasImageRelation} from "./ratings/deleteHasImageRelation"

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

    async deleteByMagazineIssueRelation(req: express.Request, res: express.Response) {
        await deleteByMagazineIssueRelation(req, res)
    },

    async createForCarModelVariantRelation(req: express.Request, res: express.Response) {
        await createForCarModelVariantRelation(req, res)
    },

    async getForCarModelVariantRelation(req: express.Request, res: express.Response) {
        await getForCarModelVariantRelation(req, res)
    },

    async deleteForCarModelVariantRelation(req: express.Request, res: express.Response) {
        await deleteForCarModelVariantRelation(req, res)
    },

    async createHasImageRelation(req: express.Request, res: express.Response) {
        await createHasImageRelation(req, res)
    },

    async getAllHasImageRelations(req: express.Request, res: express.Response) {
        await getAllHasImageRelations(req, res)
    },

    async deleteHasImageRelation(req: express.Request, res: express.Response) {
        await deleteHasImageRelation(req, res)
    },
}
