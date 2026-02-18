import express from "express"
import {create} from "./node-types/images/create"
import {getById} from "./node-types/images/getById"
import {getAll} from "./node-types/images/getAll"
import {deleteNode} from "./node-types/images/deleteNode"
import {createBelongsToNodeRelation} from "./node-types/images/createBelongsToNodeRelation"
import {getSpecificBelongsToNodeRelation} from "./node-types/images/getSpecificBelongsToNodeRelation"
import {getAllBelongsToNodeRelations} from "./node-types/images/getAllBelongsToNodeRelations"
import {deleteBelongsToNodeRelation} from "./node-types/images/deleteBelongsToNodeRelation"
import {getAllBelongsToNodeTypeRelations} from "./node-types/images/getAllBelongsToNodeTypeRelations"
import {createIsPrimeImageOfNodeRelation} from "./node-types/images/createIsPrimeImageOfNodeRelation"
import {getAllIsPrimeImageOfNodeRelations} from "./node-types/images/getAllIsPrimeImageOfNodeRelations"
import {deleteIsPrimeImageOfNodeRelation} from "./node-types/images/deleteIsPrimeImageOfNodeRelation"

export const ImageController = {
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

    async createBelongsToNodeRelation(req: express.Request, res: express.Response) {
        await createBelongsToNodeRelation(req, res)
    },

    async getSpecificBelongsToNodeRelation(req: express.Request, res: express.Response) {
        await getSpecificBelongsToNodeRelation(req, res)
    },

    async getAllBelongsToNodeRelations(req: express.Request, res: express.Response) {
        await getAllBelongsToNodeRelations(req, res)
    },

    async deleteBelongsToNodeRelation(req: express.Request, res: express.Response) {
        await deleteBelongsToNodeRelation(req, res)
    },

    async getAllBelongsToNodeTypeRelations(req: express.Request, res: express.Response) {
        await getAllBelongsToNodeTypeRelations(req, res)
    },

    async createIsPrimeImageOfNodeRelation(req: express.Request, res: express.Response) {
        await createIsPrimeImageOfNodeRelation(req, res)
    },

    async getAllIsPrimeImageOfNodeRelations(req: express.Request, res: express.Response) {
        await getAllIsPrimeImageOfNodeRelations(req, res)
    },

    async deleteIsPrimeImageOfNodeRelation(req: express.Request, res: express.Response) {
        await deleteIsPrimeImageOfNodeRelation(req, res)
    },
}
