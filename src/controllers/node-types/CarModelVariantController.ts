import express from "express"
import {create} from "./car-model-variants/create"
import {getById} from "./car-model-variants/getById"
import {getAll} from "./car-model-variants/getAll"
import {deleteNode} from "./car-model-variants/deleteNode"
import {createIsVariantOfRelation} from "./car-model-variants/createIsVariantOfRelation"
import {getIsVariantOfRelation} from "./car-model-variants/getIsVariantOfRelation"
import {deleteIsVariantOfRelation} from "./car-model-variants/deleteIsVariantOfRelation"
import {createAchievedSessionResultRelation} from "./car-model-variants/createAchievedSessionResultRelation"
import {getAllAchievedSessionResultRelations} from "./car-model-variants/getAllAchievedSessionResultRelations"
import {deleteAchievedSessionResultRelation} from "./car-model-variants/deleteAchievedSessionResultRelation"
import {createAchievedLapTimeRelation} from "./car-model-variants/createAchievedLapTimeRelation"
import {getAllAchievedLapTimeRelations} from "./car-model-variants/getAllAchievedLapTimeRelations"
import {deleteAchievedLapTimeRelation} from "./car-model-variants/deleteAchievedLapTimeRelation"
import {createIsPresentedInMagazineIssueRelation} from "./car-model-variants/createIsPresentedInMagazineIssueRelation"
import {getAllIsPresentedInMagazineIssueRelations} from "./car-model-variants/getAllIsPresentedInMagazineIssueRelations"
import {deleteIsPresentedInMagazineIssueRelation} from "./car-model-variants/deleteIsPresentedInMagazineIssueRelation"
import {createReviewedByMagazineIssueWithRatingRelation} from "./car-model-variants/createReviewedByMagazineIssueWithRatingRelation"
import {getAllReviewedByMagazineIssueWithRatingRelations} from "./car-model-variants/getAllReviewedByMagazineIssueWithRatingRelations"
import {deleteReviewedByMagazineIssueWithRatingRelation} from "./car-model-variants/deleteReviewedByMagazineIssueWithRatingRelation"
import {createPresentedInProgrammeEpisodeRelation} from "./car-model-variants/createPresentedInProgrammeEpisodeRelation"
import {createIsFeaturedInRacingGameRelation} from "./car-model-variants/createIsFeaturedInRacingGameRelation"
import {getAllIsFeaturedInRacingGameRelations} from "./car-model-variants/getAllIsFeaturedInRacingGameRelations"
import {deleteIsFeaturedInRacingGameRelation} from "./car-model-variants/deleteIsFeaturedInRacingGameRelation"
import {createPresentedAtMotorShowRelation} from "./car-model-variants/createPresentedAtMotorShowRelation"
import {getAllPresentedAtMotorShowRelations} from "./car-model-variants/getAllPresentedAtMotorShowRelations"
import {deletePresentedAtMotorShowRelation} from "./car-model-variants/deletePresentedAtMotorShowRelation"
import {createHasImageRelation} from "./car-model-variants/createHasImageRelation"
import {getAllHasImageRelations} from "./car-model-variants/getAllHasImageRelations"
import {deleteHasImageRelation} from "./car-model-variants/deleteHasImageRelation"
import {createHasPrimeImageRelation} from "./car-model-variants/createHasPrimeImageRelation"
import {getHasPrimeImageRelation} from "./car-model-variants/getHasPrimeImageRelation"
import {deleteHasPrimeImageRelation} from "./car-model-variants/deleteHasPrimeImageRelation"

export const CarModelVariantController = {
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

    async createIsVariantOfRelation(req: express.Request, res: express.Response) {
        await createIsVariantOfRelation(req, res)
    },

    async getIsVariantOfRelation(req: express.Request, res: express.Response) {
        await getIsVariantOfRelation(req, res)
    },

    async deleteIsVariantOfRelation(req: express.Request, res: express.Response) {
        await deleteIsVariantOfRelation(req, res)
    },

    async createAchievedSessionResultRelation(req: express.Request, res: express.Response) {
        await createAchievedSessionResultRelation(req, res)
    },

    async getAllAchievedSessionResultRelations(req: express.Request, res: express.Response) {
        await getAllAchievedSessionResultRelations(req, res)
    },

    async deleteAchievedSessionResultRelation(req: express.Request, res: express.Response) {
        await deleteAchievedSessionResultRelation(req, res)
    },

    async createAchievedLapTimeRelation(req: express.Request, res: express.Response) {
        await createAchievedLapTimeRelation(req, res)
    },

    async getAllAchievedLapTimeRelations(req: express.Request, res: express.Response) {
        await getAllAchievedLapTimeRelations(req, res)
    },

    async deleteAchievedLapTimeRelation(req: express.Request, res: express.Response) {
        await deleteAchievedLapTimeRelation(req, res)
    },

    async createIsPresentedInMagazineIssueRelation(req: express.Request, res: express.Response) {
        await createIsPresentedInMagazineIssueRelation(req, res)
    },

    async getAllIsPresentedInMagazineIssueRelations(req: express.Request, res: express.Response) {
        await getAllIsPresentedInMagazineIssueRelations(req, res)
    },

    async deleteIsPresentedInMagazineIssueRelation(req: express.Request, res: express.Response) {
        await deleteIsPresentedInMagazineIssueRelation(req, res)
    },

    async createReviewedByMagazineIssueWithRatingRelation(req: express.Request, res: express.Response) {
        await createReviewedByMagazineIssueWithRatingRelation(req, res)
    },

    async getAllReviewedByMagazineIssueWithRatingRelations(req: express.Request, res: express.Response) {
        await getAllReviewedByMagazineIssueWithRatingRelations(req, res)
    },

    async deleteReviewedByMagazineIssueWithRatingRelation(req: express.Request, res: express.Response) {
        await deleteReviewedByMagazineIssueWithRatingRelation(req, res)
    },

    async createIsFeaturedInRacingGameRelation(req: express.Request, res: express.Response) {
        await createIsFeaturedInRacingGameRelation(req, res)
    },

    async getAllIsFeaturedInRacingGameRelations(req: express.Request, res: express.Response) {
        await getAllIsFeaturedInRacingGameRelations(req, res)
    },

    async deleteIsFeaturedInRacingGameRelation(req: express.Request, res: express.Response) {
        await deleteIsFeaturedInRacingGameRelation(req, res)
    },

    async createPresentedAtMotorShowRelation(req: express.Request, res: express.Response) {
        await createPresentedAtMotorShowRelation(req, res)
    },

    async getAllPresentedAtMotorShowRelations(req: express.Request, res: express.Response) {
        await getAllPresentedAtMotorShowRelations(req, res)
    },

    async deletePresentedAtMotorShowRelation(req: express.Request, res: express.Response) {
        await deletePresentedAtMotorShowRelation(req, res)
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

    async createPresentedInProgrammeEpisodeRelation(req: express.Request, res: express.Response) {
        await createPresentedInProgrammeEpisodeRelation(req, res)
    },
}
