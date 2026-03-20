import {CreateCarModelVariantInput} from "./types/CreateCarModelVariantInput"
import {CarModelVariantNode} from "./types/CarModelVariantNode"
import {convertInputData} from "./create/convertInputData"
import {createNode} from "../../../db/node-types/car-model-variants/createNode"
import {convertDbNodeToModelNode} from "../convertDbNodeToModelNode"
import {getNodeById} from "../../../db/node-types/car-model-variants/getNodeById"
import {getAllNodesOfType} from "../../../db/node-types/car-model-variants/getAllNodesOfType"
import type {NodeCollectionConstraints} from "../../types/NodeCollectionConstraints"
import {deleteNode} from "../../../db/nodes/deleteNode"
import {NodeNotFoundError} from "../../types/NodeNotFoundError"
import {createRel} from "../../relationships/createRel"
import {ModelNodeType} from "../../types/ModelNodeType"
import {CarModel} from "../car-models/CarModel"
import {getSpecificRel} from "../../relationships/getSpecificRel"
import {RelAlreadyExistsError} from "../../types/RelAlreadyExistsError"
import {RelType} from "../../relationships/types/RelType"
import {getRel} from "../../relationships/getRel"
import {RelNotFoundError} from "../../types/RelNotFoundError"
import {deleteSpecificRel} from "../../relationships/deleteSpecificRel"
import {SessionResult} from "../session-results/SessionResult"
import {getAllRels} from "../../relationships/getAllRels"
import {LapTime} from "../lap-times/LapTime"
import {Image} from "../images/Image"
import {RacingGame} from "../racing-games/RacingGame"
import {deleteOutgoingRel} from "../../relationships/deleteOutgoingRel"
import {deleteIncomingRel} from "../../relationships/deleteIncomingRel"
import {MagazineIssue} from "../magazine-issues/MagazineIssue"
import {Rating} from "../ratings/Rating"
import {MotorShow} from "../motor-shows/MotorShow"
import {ProgrammeEpisode} from "../programme-episodes/ProgrammeEpisode"
import {Price} from "../prices/Price"

export const CarModelVariant = {
    async create(data: CreateCarModelVariantInput): Promise<CarModelVariantNode> {
        const input = convertInputData(data)
        const result = await createNode(input)

        return convertDbNodeToModelNode(result) as CarModelVariantNode
    },

    async findById(id: number): Promise<CarModelVariantNode> {
        const node = await getNodeById(id)

        if (!node) {
            throw new NodeNotFoundError(id)
        }

        return convertDbNodeToModelNode(node) as CarModelVariantNode
    },

    async findAll(options: NodeCollectionConstraints = {}): Promise<CarModelVariantNode[]> {
        const nodes: CarModelVariantNode[] = []
        const nodesDb = await getAllNodesOfType(options)

        nodesDb.forEach(node => {
            nodes.push(convertDbNodeToModelNode(node) as CarModelVariantNode)
        })

        return nodes
    },

    async delete(id: number): Promise<void> {
        const node = await getNodeById(id)

        if (!node) {
            throw new NodeNotFoundError(id)
        }

        await deleteNode(id)
    },

    async createIsVariantOfRelationship(carModelVariantId: number, carModelId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await CarModelVariant.findById(carModelVariantId)
        await CarModel.findById(carModelId)

        const existingRelation = await getSpecificRel(carModelVariantId, carModelId, RelType.CarModelVariantIsVariantOf)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.CarModelVariantIsVariantOf, carModelVariantId, carModelId)
        }

        await deleteOutgoingRel(carModelVariantId, RelType.CarModelVariantIsVariantOf, ModelNodeType.CarModel)

        const createdRelationship = await createRel(carModelVariantId, carModelId, RelType.CarModelVariantIsVariantOf)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getIsVariantOfRelationship(carModelVariantId: number) {
        // checking that the node exists -> exception is thrown if not
        await CarModelVariant.findById(carModelVariantId)

        const relationship = await getRel(carModelVariantId, RelType.CarModelVariantIsVariantOf)
        if (!relationship) {
            throw new RelNotFoundError(RelType.CarModelVariantIsVariantOf, carModelVariantId, null)
        }

        return relationship
    },

    async deleteIsVariantOfRelationship(carModelVariantId: number, carModelId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await CarModelVariant.findById(carModelVariantId)
        await CarModel.findById(carModelId)

        const relationship = await getSpecificRel(carModelVariantId, carModelId, RelType.CarModelVariantIsVariantOf)
        if (!relationship) {
            throw new RelNotFoundError(RelType.CarModelVariantIsVariantOf, carModelVariantId, carModelId)
        }

        await deleteSpecificRel(carModelVariantId, carModelId, RelType.CarModelVariantIsVariantOf)
    },

    async createAchievedSessionResultRelationship(carModelVariantId: number, sessionResultId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await CarModelVariant.findById(carModelVariantId)
        await SessionResult.findById(sessionResultId)

        const existingRelation = await getSpecificRel(carModelVariantId, sessionResultId, RelType.CarModelVariantAchievedSessionResult)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.CarModelVariantAchievedSessionResult, carModelVariantId, sessionResultId)
        }

        await deleteIncomingRel(sessionResultId, RelType.CarModelVariantAchievedSessionResult, ModelNodeType.CarModelVariant)

        const createdRelationship = await createRel(carModelVariantId, sessionResultId, RelType.CarModelVariantAchievedSessionResult)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getAllAchievedSessionResultRelationships(carModelVariantId: number) {
        // checking that the node exists -> exception is thrown if not
        await CarModelVariant.findById(carModelVariantId)

        return getAllRels(carModelVariantId, RelType.CarModelVariantAchievedSessionResult)
    },

    async deleteAchievedSessionResultRelationship(carModelVariantId: number, sessionResultId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await CarModelVariant.findById(carModelVariantId)
        await SessionResult.findById(sessionResultId)

        const relationship = await getSpecificRel(carModelVariantId, sessionResultId, RelType.CarModelVariantAchievedSessionResult)
        if (!relationship) {
            throw new RelNotFoundError(RelType.CarModelVariantAchievedSessionResult, carModelVariantId, sessionResultId)
        }

        await deleteSpecificRel(carModelVariantId, sessionResultId, RelType.CarModelVariantAchievedSessionResult)
    },

    async createAchievedLapTimeRelationship(carModelVariantId: number, lapTimeId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await CarModelVariant.findById(carModelVariantId)
        await LapTime.findById(lapTimeId)

        const existingRelation = await getSpecificRel(carModelVariantId, lapTimeId, RelType.CarModelVariantAchievedLapTime)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.CarModelVariantAchievedLapTime, carModelVariantId, lapTimeId)
        }

        await deleteIncomingRel(lapTimeId, RelType.CarModelVariantAchievedLapTime, ModelNodeType.CarModelVariant)

        const createdRelationship = await createRel(carModelVariantId, lapTimeId, RelType.CarModelVariantAchievedLapTime)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getAllAchievedLapTimeRelationships(carModelVariantId: number) {
        // checking that the node exists -> exception is thrown if not
        await CarModelVariant.findById(carModelVariantId)

        return getAllRels(carModelVariantId, RelType.CarModelVariantAchievedLapTime)
    },

    async deleteAchievedLapTimeRelationship(carModelVariantId: number, lapTimeId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await CarModelVariant.findById(carModelVariantId)
        await LapTime.findById(lapTimeId)

        const relationship = await getSpecificRel(carModelVariantId, lapTimeId, RelType.CarModelVariantAchievedLapTime)
        if (!relationship) {
            throw new RelNotFoundError(RelType.CarModelVariantAchievedLapTime, carModelVariantId, lapTimeId)
        }

        await deleteSpecificRel(carModelVariantId, lapTimeId, RelType.CarModelVariantAchievedLapTime)
    },

    async createIsPresentedInMagazineIssueRelationship(carModelVariantId: number, magazineIssueId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await CarModelVariant.findById(carModelVariantId)
        await MagazineIssue.findById(magazineIssueId)

        const existingRelation = await getSpecificRel(carModelVariantId, magazineIssueId, RelType.CarModelVariantIsPresentedInMagazineIssue)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.CarModelVariantIsPresentedInMagazineIssue, carModelVariantId, magazineIssueId)
        }


        const createdRelationship = await createRel(carModelVariantId, magazineIssueId, RelType.CarModelVariantIsPresentedInMagazineIssue)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getAllIsPresentedInMagazineIssueRelationships(carModelVariantId: number) {
        // checking that the node exists -> exception is thrown if not
        await CarModelVariant.findById(carModelVariantId)

        return getAllRels(carModelVariantId, RelType.CarModelVariantIsPresentedInMagazineIssue)
    },

    async deleteIsPresentedInMagazineIssueRelationship(carModelVariantId: number, magazineIssueId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await CarModelVariant.findById(carModelVariantId)
        await MagazineIssue.findById(magazineIssueId)

        const relationship = await getSpecificRel(carModelVariantId, magazineIssueId, RelType.CarModelVariantIsPresentedInMagazineIssue)
        if (!relationship) {
            throw new RelNotFoundError(RelType.CarModelVariantIsPresentedInMagazineIssue, carModelVariantId, magazineIssueId)
        }

        await deleteSpecificRel(carModelVariantId, magazineIssueId, RelType.CarModelVariantIsPresentedInMagazineIssue)
    },

    async createReviewedByMagazineIssueWithRatingRelationship(carModelVariantId: number, ratingId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await CarModelVariant.findById(carModelVariantId)
        await Rating.findById(ratingId)

        const existingRelation = await getSpecificRel(carModelVariantId, ratingId, RelType.CarModelVariantReviewedByMagazineIssueWithRating)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.CarModelVariantReviewedByMagazineIssueWithRating, carModelVariantId, ratingId)
        }

        await deleteIncomingRel(ratingId, RelType.CarModelVariantReviewedByMagazineIssueWithRating, ModelNodeType.CarModelVariant)

        const createdRelationship = await createRel(carModelVariantId, ratingId, RelType.CarModelVariantReviewedByMagazineIssueWithRating)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getAllReviewedByMagazineIssueWithRatingRelationships(carModelVariantId: number) {
        // checking that the node exists -> exception is thrown if not
        await CarModelVariant.findById(carModelVariantId)

        return getAllRels(carModelVariantId, RelType.CarModelVariantReviewedByMagazineIssueWithRating)
    },

    async deleteReviewedByMagazineIssueWithRatingRelationship(carModelVariantId: number, ratingId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await CarModelVariant.findById(carModelVariantId)
        await Rating.findById(ratingId)

        const relationship = await getSpecificRel(carModelVariantId, ratingId, RelType.CarModelVariantReviewedByMagazineIssueWithRating)
        if (!relationship) {
            throw new RelNotFoundError(RelType.CarModelVariantReviewedByMagazineIssueWithRating, carModelVariantId, ratingId)
        }

        await deleteSpecificRel(carModelVariantId, ratingId, RelType.CarModelVariantReviewedByMagazineIssueWithRating)
    },

    async createFeaturedInProgrammeEpisodeRelationship(carModelVariantId: number, programmeEpisodeId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await CarModelVariant.findById(carModelVariantId)
        await ProgrammeEpisode.findById(programmeEpisodeId)

        const existingRelation = await getSpecificRel(carModelVariantId, programmeEpisodeId, RelType.CarModelVariantFeaturedInProgrammeEpisode)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.CarModelVariantFeaturedInProgrammeEpisode, carModelVariantId, programmeEpisodeId)
        }


        const createdRelationship = await createRel(carModelVariantId, programmeEpisodeId, RelType.CarModelVariantFeaturedInProgrammeEpisode)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getAllFeaturedInProgrammeEpisodeRelationships(carModelVariantId: number) {
        // checking that the node exists -> exception is thrown if not
        await CarModelVariant.findById(carModelVariantId)

        return getAllRels(carModelVariantId, RelType.CarModelVariantFeaturedInProgrammeEpisode)
    },

    async deleteFeaturedInProgrammeEpisodeRelationship(carModelVariantId: number, programmeEpisodeId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await CarModelVariant.findById(carModelVariantId)
        await ProgrammeEpisode.findById(programmeEpisodeId)

        const relationship = await getSpecificRel(carModelVariantId, programmeEpisodeId, RelType.CarModelVariantFeaturedInProgrammeEpisode)
        if (!relationship) {
            throw new RelNotFoundError(RelType.CarModelVariantFeaturedInProgrammeEpisode, carModelVariantId, programmeEpisodeId)
        }

        await deleteSpecificRel(carModelVariantId, programmeEpisodeId, RelType.CarModelVariantFeaturedInProgrammeEpisode)
    },

    async createIsFeaturedInRacingGameRelationship(carModelVariantId: number, racingGameId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await CarModelVariant.findById(carModelVariantId)
        await RacingGame.findById(racingGameId)

        const existingRelation = await getSpecificRel(carModelVariantId, racingGameId, RelType.CarModelVariantIsFeaturedInRacingGame)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.CarModelVariantIsFeaturedInRacingGame, carModelVariantId, racingGameId)
        }


        const createdRelationship = await createRel(carModelVariantId, racingGameId, RelType.CarModelVariantIsFeaturedInRacingGame)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getAllIsFeaturedInRacingGameRelationships(carModelVariantId: number) {
        // checking that the node exists -> exception is thrown if not
        await CarModelVariant.findById(carModelVariantId)

        return getAllRels(carModelVariantId, RelType.CarModelVariantIsFeaturedInRacingGame)
    },

    async deleteIsFeaturedInRacingGameRelationship(carModelVariantId: number, racingGameId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await CarModelVariant.findById(carModelVariantId)
        await RacingGame.findById(racingGameId)

        const relationship = await getSpecificRel(carModelVariantId, racingGameId, RelType.CarModelVariantIsFeaturedInRacingGame)
        if (!relationship) {
            throw new RelNotFoundError(RelType.CarModelVariantIsFeaturedInRacingGame, carModelVariantId, racingGameId)
        }

        await deleteSpecificRel(carModelVariantId, racingGameId, RelType.CarModelVariantIsFeaturedInRacingGame)
    },

    async createPresentedAtMotorShowRelationship(carModelVariantId: number, motorShowId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await CarModelVariant.findById(carModelVariantId)
        await MotorShow.findById(motorShowId)

        const existingRelation = await getSpecificRel(carModelVariantId, motorShowId, RelType.CarModelVariantPresentedAtMotorShow)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.CarModelVariantPresentedAtMotorShow, carModelVariantId, motorShowId)
        }

        const createdRelationship = await createRel(carModelVariantId, motorShowId, RelType.CarModelVariantPresentedAtMotorShow)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getAllPresentedAtMotorShowRelationships(carModelVariantId: number) {
        // checking that the node exists -> exception is thrown if not
        await CarModelVariant.findById(carModelVariantId)

        return getAllRels(carModelVariantId, RelType.CarModelVariantPresentedAtMotorShow)
    },

    async deletePresentedAtMotorShowRelationship(carModelVariantId: number, motorShowId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await CarModelVariant.findById(carModelVariantId)
        await MotorShow.findById(motorShowId)

        const relationship = await getSpecificRel(carModelVariantId, motorShowId, RelType.CarModelVariantPresentedAtMotorShow)
        if (!relationship) {
            throw new RelNotFoundError(RelType.CarModelVariantPresentedAtMotorShow, carModelVariantId, motorShowId)
        }

        await deleteSpecificRel(carModelVariantId, motorShowId, RelType.CarModelVariantPresentedAtMotorShow)
    },

    async createHasImageRelationship(carModelVariantId: number, imageId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await CarModelVariant.findById(carModelVariantId)
        await Image.findById(imageId)

        const existingRelation = await getSpecificRel(carModelVariantId, imageId, RelType.CarModelVariantHasImage)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.CarModelVariantHasImage, carModelVariantId, imageId)
        }

        const createdRelationship = await createRel(carModelVariantId, imageId, RelType.CarModelVariantHasImage)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getAllHasImageRelationships(carModelVariantId: number) {
        // checking that the node exists -> exception is thrown if not
        await CarModelVariant.findById(carModelVariantId)

        return getAllRels(carModelVariantId, RelType.CarModelVariantHasImage)
    },

    async deleteHasImageRelationship(carModelVariantId: number, imageId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await CarModelVariant.findById(carModelVariantId)
        await Image.findById(imageId)

        const relationship = await getSpecificRel(carModelVariantId, imageId, RelType.CarModelVariantHasImage)
        if (!relationship) {
            throw new RelNotFoundError(RelType.CarModelVariantHasImage, carModelVariantId, imageId)
        }

        await deleteSpecificRel(carModelVariantId, imageId, RelType.CarModelVariantHasImage)
    },

    async createHasPrimeImageRelationship(carModelVariantId: number, imageId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await CarModelVariant.findById(carModelVariantId)
        await Image.findById(imageId)

        const existingRelation = await getSpecificRel(carModelVariantId, imageId, RelType.CarModelVariantHasPrimeImage)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.CarModelVariantHasPrimeImage, carModelVariantId, imageId)
        }

        await deleteOutgoingRel(carModelVariantId, RelType.CarModelVariantHasPrimeImage, ModelNodeType.Image)

        const createdRelationship = await createRel(carModelVariantId, imageId, RelType.CarModelVariantHasPrimeImage)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getHasPrimeImageRelationship(carModelVariantId: number) {
        // checking that the node exists -> exception is thrown if not
        await CarModelVariant.findById(carModelVariantId)

        const relationship = await getRel(carModelVariantId, RelType.CarModelVariantHasPrimeImage)
        if (!relationship) {
            throw new RelNotFoundError(RelType.CarModelVariantHasPrimeImage, carModelVariantId, null)
        }

        return relationship
    },

    async deleteHasPrimeImageRelationship(carModelVariantId: number, imageId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await CarModelVariant.findById(carModelVariantId)
        await Image.findById(imageId)

        const relationship = await getSpecificRel(carModelVariantId, imageId, RelType.CarModelVariantHasPrimeImage)
        if (!relationship) {
            throw new RelNotFoundError(RelType.CarModelVariantHasPrimeImage, carModelVariantId, imageId)
        }

        await deleteSpecificRel(carModelVariantId, imageId, RelType.CarModelVariantHasPrimeImage)
    },

    async createHasPriceRelationship(carModelVariantId: number, priceId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await CarModelVariant.findById(carModelVariantId)
        await Price.findById(priceId)

        const existingRelation = await getSpecificRel(carModelVariantId, priceId, RelType.CarModelVariantHasPrice)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.CarModelVariantHasPrice, carModelVariantId, priceId)
        }

        await deleteIncomingRel(priceId, RelType.CarModelVariantHasPrice, ModelNodeType.CarModelVariant)

        const createdRelationship = await createRel(carModelVariantId, priceId, RelType.CarModelVariantHasPrice)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },
}
