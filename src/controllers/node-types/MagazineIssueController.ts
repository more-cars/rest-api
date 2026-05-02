import express from "express"
import {create} from "./magazine-issues/create"
import {getById} from "./magazine-issues/getById"
import {getAll} from "./magazine-issues/getAll"
import {deleteNode} from "./magazine-issues/deleteNode"
import {createBelongsToMagazineRelation} from "./magazine-issues/createBelongsToMagazineRelation"
import {getBelongsToMagazineRelation} from "./magazine-issues/getBelongsToMagazineRelation"
import {deleteBelongsToMagazineRelation} from "./magazine-issues/deleteBelongsToMagazineRelation"
import {createFollowsIssueRelation} from "./magazine-issues/createFollowsIssueRelation"
import {getFollowsIssueRelation} from "./magazine-issues/getFollowsIssueRelation"
import {deleteFollowsIssueRelation} from "./magazine-issues/deleteFollowsIssueRelation"
import {createFollowedByIssueRelation} from "./magazine-issues/createFollowedByIssueRelation"
import {getFollowedByIssueRelation} from "./magazine-issues/getFollowedByIssueRelation"
import {deleteFollowedByIssueRelation} from "./magazine-issues/deleteFollowedByIssueRelation"
import {createCoversCarModelRelation} from "./magazine-issues/createCoversCarModelRelation"
import {getAllCoversCarModelRelations} from "./magazine-issues/getAllCoversCarModelRelations"
import {deleteCoversCarModelRelation} from "./magazine-issues/deleteCoversCarModelRelation"
import {createPresentsCarModelVariantRelation} from "./magazine-issues/createPresentsCarModelVariantRelation"
import {getAllPresentsCarModelVariantRelations} from "./magazine-issues/getAllPresentsCarModelVariantRelations"
import {deletePresentsCarModelVariantRelation} from "./magazine-issues/deletePresentsCarModelVariantRelation"
import {createReviewedCarModelVariantWithRatingRelation} from "./magazine-issues/createReviewedCarModelVariantWithRatingRelation"
import {getAllReviewedCarModelVariantWithRatingRelations} from "./magazine-issues/getAllReviewedCarModelVariantWithRatingRelations"
import {deleteReviewedCarModelVariantWithRatingRelation} from "./magazine-issues/deleteReviewedCarModelVariantWithRatingRelation"
import {createCoversRacingEventRelation} from "./magazine-issues/createCoversRacingEventRelation"
import {getAllCoversRacingEventRelations} from "./magazine-issues/getAllCoversRacingEventRelations"
import {deleteCoversRacingEventRelation} from "./magazine-issues/deleteCoversRacingEventRelation"
import {createDocumentsLapTimeRelation} from "./magazine-issues/createDocumentsLapTimeRelation"
import {createHasImageRelation} from "./magazine-issues/createHasImageRelation"
import {getAllHasImageRelations} from "./magazine-issues/getAllHasImageRelations"
import {deleteHasImageRelation} from "./magazine-issues/deleteHasImageRelation"
import {createHasPrimeImageRelation} from "./magazine-issues/createHasPrimeImageRelation"
import {getHasPrimeImageRelation} from "./magazine-issues/getHasPrimeImageRelation"
import {deleteHasPrimeImageRelation} from "./magazine-issues/deleteHasPrimeImageRelation"
import {createHasVideoRelation} from "./magazine-issues/createHasVideoRelation"
import {getAllHasVideoRelations} from "./magazine-issues/getAllHasVideoRelations"
import {deleteHasVideoRelation} from "./magazine-issues/deleteHasVideoRelation"
import {createHasMainVideoRelation} from "./magazine-issues/createHasMainVideoRelation"
import {getHasMainVideoRelation} from "./magazine-issues/getHasMainVideoRelation"
import {deleteHasMainVideoRelation} from "./magazine-issues/deleteHasMainVideoRelation"

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

    async createFollowsIssueRelation(req: express.Request, res: express.Response) {
        await createFollowsIssueRelation(req, res)
    },

    async getFollowsIssueRelation(req: express.Request, res: express.Response) {
        await getFollowsIssueRelation(req, res)
    },

    async deleteFollowsIssueRelation(req: express.Request, res: express.Response) {
        await deleteFollowsIssueRelation(req, res)
    },

    async createFollowedByIssueRelation(req: express.Request, res: express.Response) {
        await createFollowedByIssueRelation(req, res)
    },

    async getFollowedByIssueRelation(req: express.Request, res: express.Response) {
        await getFollowedByIssueRelation(req, res)
    },

    async deleteFollowedByIssueRelation(req: express.Request, res: express.Response) {
        await deleteFollowedByIssueRelation(req, res)
    },

    async createCoversCarModelRelation(req: express.Request, res: express.Response) {
        await createCoversCarModelRelation(req, res)
    },

    async getAllCoversCarModelRelations(req: express.Request, res: express.Response) {
        await getAllCoversCarModelRelations(req, res)
    },

    async deleteCoversCarModelRelation(req: express.Request, res: express.Response) {
        await deleteCoversCarModelRelation(req, res)
    },

    async createPresentsCarModelVariantRelation(req: express.Request, res: express.Response) {
        await createPresentsCarModelVariantRelation(req, res)
    },

    async getAllPresentsCarModelVariantRelations(req: express.Request, res: express.Response) {
        await getAllPresentsCarModelVariantRelations(req, res)
    },

    async deletePresentsCarModelVariantRelation(req: express.Request, res: express.Response) {
        await deletePresentsCarModelVariantRelation(req, res)
    },

    async createReviewedCarModelVariantWithRatingRelation(req: express.Request, res: express.Response) {
        await createReviewedCarModelVariantWithRatingRelation(req, res)
    },

    async getAllReviewedCarModelVariantWithRatingRelations(req: express.Request, res: express.Response) {
        await getAllReviewedCarModelVariantWithRatingRelations(req, res)
    },

    async deleteReviewedCarModelVariantWithRatingRelation(req: express.Request, res: express.Response) {
        await deleteReviewedCarModelVariantWithRatingRelation(req, res)
    },

    async createCoversRacingEventRelation(req: express.Request, res: express.Response) {
        await createCoversRacingEventRelation(req, res)
    },

    async getAllCoversRacingEventRelations(req: express.Request, res: express.Response) {
        await getAllCoversRacingEventRelations(req, res)
    },

    async deleteCoversRacingEventRelation(req: express.Request, res: express.Response) {
        await deleteCoversRacingEventRelation(req, res)
    },

    async createDocumentsLapTimeRelation(req: express.Request, res: express.Response) {
        await createDocumentsLapTimeRelation(req, res)
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

    async createHasPrimeImageRelation(req: express.Request, res: express.Response) {
        await createHasPrimeImageRelation(req, res)
    },

    async getHasPrimeImageRelation(req: express.Request, res: express.Response) {
        await getHasPrimeImageRelation(req, res)
    },

    async deleteHasPrimeImageRelation(req: express.Request, res: express.Response) {
        await deleteHasPrimeImageRelation(req, res)
    },

    async createHasVideoRelation(req: express.Request, res: express.Response) {
        await createHasVideoRelation(req, res)
    },

    async getAllHasVideoRelations(req: express.Request, res: express.Response) {
        await getAllHasVideoRelations(req, res)
    },

    async deleteHasVideoRelation(req: express.Request, res: express.Response) {
        await deleteHasVideoRelation(req, res)
    },

    async createHasMainVideoRelation(req: express.Request, res: express.Response) {
        await createHasMainVideoRelation(req, res)
    },

    async getHasMainVideoRelation(req: express.Request, res: express.Response) {
        await getHasMainVideoRelation(req, res)
    },

    async deleteHasMainVideoRelation(req: express.Request, res: express.Response) {
        await deleteHasMainVideoRelation(req, res)
    },
}
