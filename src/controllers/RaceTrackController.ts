import express from "express"
import {create} from "./race-tracks/create"
import {getById} from "./race-tracks/getById"
import {getAll} from "./race-tracks/getAll"
import {deleteNode} from "./race-tracks/deleteNode"
import {createHasLayoutRelation} from "./race-tracks/createHasLayoutRelation"
import {getAllHasLayoutRelations} from "./race-tracks/getAllHasLayoutRelations"
import {deleteHasLayoutRelation} from "./race-tracks/deleteHasLayoutRelation"
import {createHasImageRelation} from "./race-tracks/createHasImageRelation"
import {createHasPrimeImageRelation} from "./race-tracks/createHasPrimeImageRelation"

export class RaceTrackController {
    static async create(req: express.Request, res: express.Response) {
        await create(req, res)
    }

    static async getById(req: express.Request, res: express.Response) {
        await getById(req, res)
    }

    static async getAll(req: express.Request, res: express.Response) {
        await getAll(req, res)
    }

    static async delete(req: express.Request, res: express.Response) {
        await deleteNode(req, res)
    }

    static async createHasLayoutRelation(req: express.Request, res: express.Response) {
        await createHasLayoutRelation(req, res)
    }

    static async getAllHasLayoutRelations(req: express.Request, res: express.Response) {
        await getAllHasLayoutRelations(req, res)
    }

    static async deleteHasLayoutRelation(req: express.Request, res: express.Response) {
        await deleteHasLayoutRelation(req, res)
    }

    static async createHasImageRelation(req: express.Request, res: express.Response) {
        await createHasImageRelation(req, res)
    }

    static async createHasPrimeImageRelation(req: express.Request, res: express.Response) {
        await createHasPrimeImageRelation(req, res)
    }
}
