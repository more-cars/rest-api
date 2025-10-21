import express from "express"
import {create} from "./race-tracks/create"
import {getById} from "./race-tracks/getById"
import {getAll} from "./race-tracks/getAll"
import {deleteNode} from "./race-tracks/deleteNode"
import {createHasLayoutRelation} from "./race-tracks/createHasLayoutRelation"
import {getAllHasLayoutRelations} from "./race-tracks/getAllHasLayoutRelations"
import {deleteHasLayoutRelation} from "./race-tracks/deleteHasLayoutRelation"
import {createHasImageRelation} from "./race-tracks/createHasImageRelation"
import {getAllHasImageRelations} from "./race-tracks/getAllHasImageRelations"
import {deleteHasImageRelation} from "./race-tracks/deleteHasImageRelation"
import {createHasPrimeImageRelation} from "./race-tracks/createHasPrimeImageRelation"
import {getHasPrimeImageRelation} from "./race-tracks/getHasPrimeImageRelation"
import {deleteHasPrimeImageRelation} from "./race-tracks/deleteHasPrimeImageRelation"

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

    static async getAllHasImageRelations(req: express.Request, res: express.Response) {
        await getAllHasImageRelations(req, res)
    }

    static async deleteHasImageRelation(req: express.Request, res: express.Response) {
        await deleteHasImageRelation(req, res)
    }

    static async createHasPrimeImageRelation(req: express.Request, res: express.Response) {
        await createHasPrimeImageRelation(req, res)
    }

    static async getHasPrimeImageRelation(req: express.Request, res: express.Response) {
        await getHasPrimeImageRelation(req, res)
    }

    static async deleteHasPrimeImageRelation(req: express.Request, res: express.Response) {
        await deleteHasPrimeImageRelation(req, res)
    }
}
