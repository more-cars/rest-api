import express from "express"
import {create} from "./images/create"
import {getById} from "./images/getById"
import {getAll} from "./images/getAll"
import {deleteNode} from "./images/deleteNode"
import {createBelongsToNodeRelation} from "./images/createBelongsToNodeRelation"
import {getSpecificBelongsToNodeRelation} from "./images/getSpecificBelongsToNodeRelation"
import {getAllBelongsToNodeRelations} from "./images/getAllBelongsToNodeRelations"
import {deleteBelongsToNodeRelation} from "./images/deleteBelongsToNodeRelation"
import {getAllBelongsToNodeTypeRelations} from "./images/getAllBelongsToNodeTypeRelations"
import {createIsPrimeImageOfNodeRelation} from "./images/createIsPrimeImageOfNodeRelation"
import {getAllIsPrimeImageOfNodeRelations} from "./images/getAllIsPrimeImageOfNodeRelations"
import {deleteIsPrimeImageOfNodeRelation} from "./images/deleteIsPrimeImageOfNodeRelation"

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
