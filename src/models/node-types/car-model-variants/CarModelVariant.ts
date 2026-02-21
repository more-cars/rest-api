import {CreateCarModelVariantInput} from "./types/CreateCarModelVariantInput"
import {CarModelVariantNode} from "./types/CarModelVariantNode"
import {convertInputData} from "./create/convertInputData"
import {createNode} from "../../../db/nodes/car-model-variants/createNode"
import {convertCarModelVariantDbNodeToModelNode} from "./create/convertCarModelVariantDbNodeToModelNode"
import {getNodeById} from "../../../db/nodes/car-model-variants/getNodeById"
import {getAllNodesOfType} from "../../../db/nodes/car-model-variants/getAllNodesOfType"
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

export const CarModelVariant = {
    async create(data: CreateCarModelVariantInput): Promise<CarModelVariantNode> {
        const input = convertInputData(data)
        const result = await createNode(input)
        const output = convertCarModelVariantDbNodeToModelNode(result)

        return output
    },

    async findById(id: number): Promise<false | CarModelVariantNode> {
        const node = await getNodeById(id)

        if (!node) {
            return false
        }

        return convertCarModelVariantDbNodeToModelNode(node)
    },

    async findAll(options: NodeCollectionConstraints = {}): Promise<CarModelVariantNode[]> {
        const nodes: CarModelVariantNode[] = []
        const nodesDb = await getAllNodesOfType(options)

        nodesDb.forEach(node => {
            nodes.push(convertCarModelVariantDbNodeToModelNode(node))
        })

        return nodes
    },

    async delete(carModelVariantId: number): Promise<void> {
        const node = await CarModelVariant.findById(carModelVariantId)
        if (!node) {
            throw new NodeNotFoundError(carModelVariantId)
        }

        await deleteNode(carModelVariantId)
    },

    async createIsVariantOfRelationship(carModelVariantId: number, carModelId: number) {

        const carModelVariant = await CarModelVariant.findById(carModelVariantId)
        if (!carModelVariant) {
            throw new NodeNotFoundError(carModelVariantId)
        }

        const carModel = await CarModel.findById(carModelId)
        if (!carModel) {
            throw new NodeNotFoundError(carModelId)
        }

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
        const carModelVariant = await CarModelVariant.findById(carModelVariantId)
        if (!carModelVariant) {
            throw new NodeNotFoundError(carModelVariantId)
        }

        const relationship = await getRel(carModelVariantId, RelType.CarModelVariantIsVariantOf)
        if (!relationship) {
            throw new RelNotFoundError(RelType.CarModelVariantIsVariantOf, carModelVariantId, null)
        }

        return relationship
    },

    async deleteIsVariantOfRelationship(carModelVariantId: number, carModelId: number) {
        const carModelVariant = await CarModelVariant.findById(carModelVariantId)
        if (!carModelVariant) {
            throw new NodeNotFoundError(carModelVariantId)
        }

        const carModel = await CarModel.findById(carModelId)
        if (!carModel) {
            throw new NodeNotFoundError(carModelId)
        }

        const relationship = await getSpecificRel(carModelVariantId, carModelId, RelType.CarModelVariantIsVariantOf)
        if (!relationship) {
            throw new RelNotFoundError(RelType.CarModelVariantIsVariantOf, carModelVariantId, carModelId)
        }

        await deleteSpecificRel(carModelVariantId, carModelId, RelType.CarModelVariantIsVariantOf)
    },

    async createAchievedSessionResultRelationship(carModelVariantId: number, sessionResultId: number) {
        const carModelVariant = await CarModelVariant.findById(carModelVariantId)
        if (!carModelVariant) {
            throw new NodeNotFoundError(carModelVariantId)
        }

        const sessionResult = await SessionResult.findById(sessionResultId)
        if (!sessionResult) {
            throw new NodeNotFoundError(sessionResultId)
        }

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
        const carModelVariant = await CarModelVariant.findById(carModelVariantId)
        if (!carModelVariant) {
            throw new NodeNotFoundError(carModelVariantId)
        }

        return getAllRels(carModelVariantId, RelType.CarModelVariantAchievedSessionResult)
    },

    async deleteAchievedSessionResultRelationship(carModelVariantId: number, sessionResultId: number) {
        const carModelVariant = await CarModelVariant.findById(carModelVariantId)
        if (!carModelVariant) {
            throw new NodeNotFoundError(carModelVariantId)
        }

        const sessionResult = await SessionResult.findById(sessionResultId)
        if (!sessionResult) {
            throw new NodeNotFoundError(sessionResultId)
        }

        const relationship = await getSpecificRel(carModelVariantId, sessionResultId, RelType.CarModelVariantAchievedSessionResult)
        if (!relationship) {
            throw new RelNotFoundError(RelType.CarModelVariantAchievedSessionResult, carModelVariantId, sessionResultId)
        }

        await deleteSpecificRel(carModelVariantId, sessionResultId, RelType.CarModelVariantAchievedSessionResult)
    },

    async createAchievedLapTimeRelationship(carModelVariantId: number, lapTimeId: number) {
        const carModelVariant = await CarModelVariant.findById(carModelVariantId)
        if (!carModelVariant) {
            throw new NodeNotFoundError(carModelVariantId)
        }

        const lapTime = await LapTime.findById(lapTimeId)
        if (!lapTime) {
            throw new NodeNotFoundError(lapTimeId)
        }

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
        const carModelVariant = await CarModelVariant.findById(carModelVariantId)
        if (!carModelVariant) {
            throw new NodeNotFoundError(carModelVariantId)
        }

        return getAllRels(carModelVariantId, RelType.CarModelVariantAchievedLapTime)
    },

    async deleteAchievedLapTimeRelationship(carModelVariantId: number, lapTimeId: number) {
        const carModelVariant = await CarModelVariant.findById(carModelVariantId)
        if (!carModelVariant) {
            throw new NodeNotFoundError(carModelVariantId)
        }

        const lapTime = await LapTime.findById(lapTimeId)
        if (!lapTime) {
            throw new NodeNotFoundError(lapTimeId)
        }

        const relationship = await getSpecificRel(carModelVariantId, lapTimeId, RelType.CarModelVariantAchievedLapTime)
        if (!relationship) {
            throw new RelNotFoundError(RelType.CarModelVariantAchievedLapTime, carModelVariantId, lapTimeId)
        }

        await deleteSpecificRel(carModelVariantId, lapTimeId, RelType.CarModelVariantAchievedLapTime)
    },

    async createHasImageRelationship(carModelVariantId: number, imageId: number) {
        const carModelVariant = await CarModelVariant.findById(carModelVariantId)
        if (!carModelVariant) {
            throw new NodeNotFoundError(carModelVariantId)
        }

        const image = await Image.findById(imageId)
        if (!image) {
            throw new NodeNotFoundError(imageId)
        }

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
        const carModelVariant = await CarModelVariant.findById(carModelVariantId)
        if (!carModelVariant) {
            throw new NodeNotFoundError(carModelVariantId)
        }

        return getAllRels(carModelVariantId, RelType.CarModelVariantHasImage)
    },

    async deleteHasImageRelationship(carModelVariantId: number, imageId: number) {
        const carModelVariant = await CarModelVariant.findById(carModelVariantId)
        if (!carModelVariant) {
            throw new NodeNotFoundError(carModelVariantId)
        }

        const image = await Image.findById(imageId)
        if (!image) {
            throw new NodeNotFoundError(imageId)
        }

        const relationship = await getSpecificRel(carModelVariantId, imageId, RelType.CarModelVariantHasImage)
        if (!relationship) {
            throw new RelNotFoundError(RelType.CarModelVariantHasImage, carModelVariantId, imageId)
        }

        await deleteSpecificRel(carModelVariantId, imageId, RelType.CarModelVariantHasImage)
    },

    async createHasPrimeImageRelationship(carModelVariantId: number, imageId: number) {
        const carModelVariant = await CarModelVariant.findById(carModelVariantId)
        if (!carModelVariant) {
            throw new NodeNotFoundError(carModelVariantId)
        }

        const image = await Image.findById(imageId)
        if (!image) {
            throw new NodeNotFoundError(imageId)
        }

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
        const carModelVariant = await CarModelVariant.findById(carModelVariantId)
        if (!carModelVariant) {
            throw new NodeNotFoundError(carModelVariantId)
        }

        const relationship = await getRel(carModelVariantId, RelType.CarModelVariantHasPrimeImage)
        if (!relationship) {
            throw new RelNotFoundError(RelType.CarModelVariantHasPrimeImage, carModelVariantId, null)
        }

        return relationship
    },

    async deleteHasPrimeImageRelationship(carModelVariantId: number, imageId: number) {
        const carModelVariant = await CarModelVariant.findById(carModelVariantId)
        if (!carModelVariant) {
            throw new NodeNotFoundError(carModelVariantId)
        }

        const image = await Image.findById(imageId)
        if (!image) {
            throw new NodeNotFoundError(imageId)
        }

        const relationship = await getSpecificRel(carModelVariantId, imageId, RelType.CarModelVariantHasPrimeImage)
        if (!relationship) {
            throw new RelNotFoundError(RelType.CarModelVariantHasPrimeImage, carModelVariantId, imageId)
        }

        await deleteSpecificRel(carModelVariantId, imageId, RelType.CarModelVariantHasPrimeImage)
    },

    async createIsFeaturedInRacingGameRelationship(carModelVariantId: number, racingGameId: number) {
        const carModelVariant = await CarModelVariant.findById(carModelVariantId)
        if (!carModelVariant) {
            throw new NodeNotFoundError(carModelVariantId)
        }

        const racingGame = await RacingGame.findById(racingGameId)
        if (!racingGame) {
            throw new NodeNotFoundError(racingGameId)
        }

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
        const carModelVariant = await CarModelVariant.findById(carModelVariantId)
        if (!carModelVariant) {
            throw new NodeNotFoundError(carModelVariantId)
        }

        return getAllRels(carModelVariantId, RelType.CarModelVariantIsFeaturedInRacingGame)
    },

    async deleteIsFeaturedInRacingGameRelationship(carModelVariantId: number, racingGameId: number) {
        const carModelVariant = await CarModelVariant.findById(carModelVariantId)
        if (!carModelVariant) {
            throw new NodeNotFoundError(carModelVariantId)
        }

        const racingGame = await RacingGame.findById(racingGameId)
        if (!racingGame) {
            throw new NodeNotFoundError(racingGameId)
        }

        const relationship = await getSpecificRel(carModelVariantId, racingGameId, RelType.CarModelVariantIsFeaturedInRacingGame)
        if (!relationship) {
            throw new RelNotFoundError(RelType.CarModelVariantIsFeaturedInRacingGame, carModelVariantId, racingGameId)
        }

        await deleteSpecificRel(carModelVariantId, racingGameId, RelType.CarModelVariantIsFeaturedInRacingGame)
    },
}
