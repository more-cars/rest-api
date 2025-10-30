import express from "express"
import {create} from "./lap-times/create"
import {getById} from "./lap-times/getById"
import {getAll} from "./lap-times/getAll"
import {deleteNode} from "./lap-times/deleteNode"
import {createBelongsToSessionResultRelation} from "./lap-times/createBelongsToSessionResultRelation"
import {getBelongsToSessionResultRelation} from "./lap-times/getBelongsToSessionResultRelation"
import {deleteBelongsToSessionResultRelation} from "./lap-times/deleteBelongsToSessionResultRelation"
import {createAchievedOnTrackLayoutRelation} from "./lap-times/createAchievedOnTrackLayoutRelation"
import {getAchievedOnTrackLayoutRelation} from "./lap-times/getAchievedOnTrackLayoutRelation"
import {deleteAchievedOnTrackLayoutRelation} from "./lap-times/deleteAchievedOnTrackLayoutRelation"
import {createAchievedWithCarModelVariantRelation} from "./lap-times/createAchievedWithCarModelVariantRelation"
import {createHasImageRelation} from "./lap-times/createHasImageRelation"
import {getAllHasImageRelations} from "./lap-times/getAllHasImageRelations"
import {deleteHasImageRelation} from "./lap-times/deleteHasImageRelation"
import {createHasPrimeImageRelation} from "./lap-times/createHasPrimeImageRelation"
import {getHasPrimeImageRelation} from "./lap-times/getHasPrimeImageRelation"
import {deleteHasPrimeImageRelation} from "./lap-times/deleteHasPrimeImageRelation"
import {getAchievedWithCarModelVariantRelation} from "./lap-times/getAchievedWithCarModelVariantRelation"

export class LapTimeController {
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

    static async createBelongsToSessionResultRelation(req: express.Request, res: express.Response) {
        await createBelongsToSessionResultRelation(req, res)
    }

    static async getBelongsToSessionResultRelation(req: express.Request, res: express.Response) {
        await getBelongsToSessionResultRelation(req, res)
    }

    static async deleteBelongsToSessionResultRelation(req: express.Request, res: express.Response) {
        await deleteBelongsToSessionResultRelation(req, res)
    }

    static async createAchievedOnTrackLayoutRelation(req: express.Request, res: express.Response) {
        await createAchievedOnTrackLayoutRelation(req, res)
    }

    static async getAchievedOnTrackLayoutRelation(req: express.Request, res: express.Response) {
        await getAchievedOnTrackLayoutRelation(req, res)
    }

    static async deleteAchievedOnTrackLayoutRelation(req: express.Request, res: express.Response) {
        await deleteAchievedOnTrackLayoutRelation(req, res)
    }

    static async createAchievedWithCarModelVariantRelation(req: express.Request, res: express.Response) {
        await createAchievedWithCarModelVariantRelation(req, res)
    }

    static async getAchievedWithCarModelVariantRelation(req: express.Request, res: express.Response) {
        await getAchievedWithCarModelVariantRelation(req, res)
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
