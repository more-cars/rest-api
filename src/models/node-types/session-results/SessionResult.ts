import {CreateSessionResultInput} from "./types/CreateSessionResultInput"
import {SessionResultNode} from "./types/SessionResultNode"
import {convertInputData} from "./create/convertInputData"
import {createNode} from "../../../db/node-types/session-results/createNode"
import {convertDbNodeToModelNode} from "../convertDbNodeToModelNode"
import {getNodeById} from "../../../db/node-types/session-results/getNodeById"
import {getAllNodesOfType} from "../../../db/node-types/session-results/getAllNodesOfType"
import type {NodeCollectionConstraints} from "../../types/NodeCollectionConstraints"
import {deleteNode} from "../../../db/nodes/deleteNode"
import {NodeNotFoundError} from "../../types/NodeNotFoundError"
import {createRel} from "../../relationships/createRel"
import {RacingSession} from "../racing-sessions/RacingSession"
import {getSpecificRel} from "../../relationships/getSpecificRel"
import {RelAlreadyExistsError} from "../../types/RelAlreadyExistsError"
import {RelType} from "../../relationships/types/RelType"
import {getRel} from "../../relationships/getRel"
import {RelNotFoundError} from "../../types/RelNotFoundError"
import {deleteSpecificRel} from "../../relationships/deleteSpecificRel"
import {LapTime} from "../lap-times/LapTime"
import {getAllRels} from "../../relationships/getAllRels"
import {Image} from "../images/Image"
import {ModelNodeType} from "../../types/ModelNodeType"
import {CarModelVariant} from "../car-model-variants/CarModelVariant"
import {deleteOutgoingRel} from "../../relationships/deleteOutgoingRel"
import {deleteIncomingRel} from "../../relationships/deleteIncomingRel"

export const SessionResult = {
    async create(data: CreateSessionResultInput): Promise<SessionResultNode> {
        const input = convertInputData(data)
        const result = await createNode(input)

        return convertDbNodeToModelNode(result) as SessionResultNode
    },

    async findById(id: number): Promise<SessionResultNode> {
        const node = await getNodeById(id)

        if (!node) {
            throw new NodeNotFoundError(id)
        }

        return convertDbNodeToModelNode(node) as SessionResultNode
    },

    async findAll(options: NodeCollectionConstraints = {}): Promise<SessionResultNode[]> {
        const nodes: SessionResultNode[] = []
        const nodesDb = await getAllNodesOfType(options)

        nodesDb.forEach(node => {
            nodes.push(convertDbNodeToModelNode(node) as SessionResultNode)
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

    async createBelongsToRacingSessionRelationship(sessionResultId: number, racingSessionId: number) {

        const sessionResult = await SessionResult.findById(sessionResultId)
        if (!sessionResult) {
            throw new NodeNotFoundError(sessionResultId)
        }

        const racingSession = await RacingSession.findById(racingSessionId)
        if (!racingSession) {
            throw new NodeNotFoundError(racingSessionId)
        }

        const existingRelation = await getSpecificRel(sessionResultId, racingSessionId, RelType.SessionResultBelongsToRacingSession)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.SessionResultBelongsToRacingSession, sessionResultId, racingSessionId)
        }

        await deleteOutgoingRel(sessionResultId, RelType.SessionResultBelongsToRacingSession, ModelNodeType.RacingSession)

        const createdRelationship = await createRel(sessionResultId, racingSessionId, RelType.SessionResultBelongsToRacingSession)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getBelongsToRacingSessionRelationship(sessionResultId: number) {
        const sessionResult = await SessionResult.findById(sessionResultId)
        if (!sessionResult) {
            throw new NodeNotFoundError(sessionResultId)
        }

        const relationship = await getRel(sessionResultId, RelType.SessionResultBelongsToRacingSession)
        if (!relationship) {
            throw new RelNotFoundError(RelType.SessionResultBelongsToRacingSession, sessionResultId, null)
        }

        return relationship
    },

    async deleteBelongsToRacingSessionRelationship(sessionResultId: number, racingSessionId: number) {
        const sessionResult = await SessionResult.findById(sessionResultId)
        if (!sessionResult) {
            throw new NodeNotFoundError(sessionResultId)
        }

        const racingSession = await RacingSession.findById(racingSessionId)
        if (!racingSession) {
            throw new NodeNotFoundError(racingSessionId)
        }

        const relationship = await getSpecificRel(sessionResultId, racingSessionId, RelType.SessionResultBelongsToRacingSession)
        if (!relationship) {
            throw new RelNotFoundError(RelType.SessionResultBelongsToRacingSession, sessionResultId, racingSessionId)
        }

        await deleteSpecificRel(sessionResultId, racingSessionId, RelType.SessionResultBelongsToRacingSession)
    },

    async createHasLapTimeRelationship(sessionResultId: number, lapTimeId: number) {

        const sessionResult = await SessionResult.findById(sessionResultId)
        if (!sessionResult) {
            throw new NodeNotFoundError(sessionResultId)
        }

        const lapTime = await LapTime.findById(lapTimeId)
        if (!lapTime) {
            throw new NodeNotFoundError(lapTimeId)
        }

        const existingRelation = await getSpecificRel(sessionResultId, lapTimeId, RelType.SessionResultHasLapTime)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.SessionResultHasLapTime, sessionResultId, lapTimeId)
        }

        await deleteIncomingRel(lapTimeId, RelType.SessionResultHasLapTime, ModelNodeType.SessionResult)

        const createdRelationship = await createRel(sessionResultId, lapTimeId, RelType.SessionResultHasLapTime)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getAllHasLapTimeRelationships(sessionResultId: number) {
        const sessionResult = await SessionResult.findById(sessionResultId)
        if (!sessionResult) {
            throw new NodeNotFoundError(sessionResultId)
        }

        return getAllRels(sessionResultId, RelType.SessionResultHasLapTime)
    },

    async deleteHasLapTimeRelationship(sessionResultId: number, lapTimeId: number) {
        const sessionResult = await SessionResult.findById(sessionResultId)
        if (!sessionResult) {
            throw new NodeNotFoundError(sessionResultId)
        }

        const lapTime = await LapTime.findById(lapTimeId)
        if (!lapTime) {
            throw new NodeNotFoundError(lapTimeId)
        }

        const relationship = await getSpecificRel(sessionResultId, lapTimeId, RelType.SessionResultHasLapTime)
        if (!relationship) {
            throw new RelNotFoundError(RelType.SessionResultHasLapTime, sessionResultId, lapTimeId)
        }

        await deleteSpecificRel(sessionResultId, lapTimeId, RelType.SessionResultHasLapTime)
    },

    async createAchievedWithCarModelVariantRelationship(sessionResultId: number, carModelVariantId: number) {
        const sessionResult = await SessionResult.findById(sessionResultId)
        if (!sessionResult) {
            throw new NodeNotFoundError(sessionResultId)
        }

        const carModelVariant = await CarModelVariant.findById(carModelVariantId)
        if (!carModelVariant) {
            throw new NodeNotFoundError(carModelVariantId)
        }

        const existingRelation = await getSpecificRel(sessionResultId, carModelVariantId, RelType.SessionResultAchievedWithCarModelVariant)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.SessionResultAchievedWithCarModelVariant, sessionResultId, carModelVariantId)
        }

        await deleteOutgoingRel(sessionResultId, RelType.SessionResultAchievedWithCarModelVariant, ModelNodeType.CarModelVariant)

        const createdRelationship = await createRel(sessionResultId, carModelVariantId, RelType.SessionResultAchievedWithCarModelVariant)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getAchievedWithCarModelVariantRelationship(sessionResultId: number) {
        const sessionResult = await SessionResult.findById(sessionResultId)
        if (!sessionResult) {
            throw new NodeNotFoundError(sessionResultId)
        }

        const relationship = await getRel(sessionResultId, RelType.SessionResultAchievedWithCarModelVariant)
        if (!relationship) {
            throw new RelNotFoundError(RelType.SessionResultAchievedWithCarModelVariant, sessionResultId, null)
        }

        return relationship
    },

    async deleteAchievedWithCarModelVariantRelationship(sessionResultId: number, carModelVariantId: number) {
        const sessionResult = await SessionResult.findById(sessionResultId)
        if (!sessionResult) {
            throw new NodeNotFoundError(sessionResultId)
        }

        const carModelVariant = await CarModelVariant.findById(carModelVariantId)
        if (!carModelVariant) {
            throw new NodeNotFoundError(carModelVariantId)
        }

        const relationship = await getSpecificRel(sessionResultId, carModelVariantId, RelType.SessionResultAchievedWithCarModelVariant)
        if (!relationship) {
            throw new RelNotFoundError(RelType.SessionResultAchievedWithCarModelVariant, sessionResultId, carModelVariantId)
        }

        await deleteSpecificRel(sessionResultId, carModelVariantId, RelType.SessionResultAchievedWithCarModelVariant)
    },

    async createHasImageRelationship(sessionResultId: number, imageId: number) {

        const sessionResult = await SessionResult.findById(sessionResultId)
        if (!sessionResult) {
            throw new NodeNotFoundError(sessionResultId)
        }

        const image = await Image.findById(imageId)
        if (!image) {
            throw new NodeNotFoundError(imageId)
        }

        const existingRelation = await getSpecificRel(sessionResultId, imageId, RelType.SessionResultHasImage)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.SessionResultHasImage, sessionResultId, imageId)
        }

        const createdRelationship = await createRel(sessionResultId, imageId, RelType.SessionResultHasImage)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getAllHasImageRelationships(sessionResultId: number) {
        const sessionResult = await SessionResult.findById(sessionResultId)
        if (!sessionResult) {
            throw new NodeNotFoundError(sessionResultId)
        }

        return getAllRels(sessionResultId, RelType.SessionResultHasImage)
    },

    async deleteHasImageRelationship(sessionResultId: number, imageId: number) {
        const sessionResult = await SessionResult.findById(sessionResultId)
        if (!sessionResult) {
            throw new NodeNotFoundError(sessionResultId)
        }

        const image = await Image.findById(imageId)
        if (!image) {
            throw new NodeNotFoundError(imageId)
        }

        const relationship = await getSpecificRel(sessionResultId, imageId, RelType.SessionResultHasImage)
        if (!relationship) {
            throw new RelNotFoundError(RelType.SessionResultHasImage, sessionResultId, imageId)
        }

        await deleteSpecificRel(sessionResultId, imageId, RelType.SessionResultHasImage)
    },

    async createHasPrimeImageRelationship(sessionResultId: number, imageId: number) {

        const sessionResult = await SessionResult.findById(sessionResultId)
        if (!sessionResult) {
            throw new NodeNotFoundError(sessionResultId)
        }

        const image = await Image.findById(imageId)
        if (!image) {
            throw new NodeNotFoundError(imageId)
        }

        const existingRelation = await getSpecificRel(sessionResultId, imageId, RelType.SessionResultHasPrimeImage)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.SessionResultHasPrimeImage, sessionResultId, imageId)
        }

        await deleteOutgoingRel(sessionResultId, RelType.SessionResultHasPrimeImage, ModelNodeType.Image)

        const createdRelationship = await createRel(sessionResultId, imageId, RelType.SessionResultHasPrimeImage)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getHasPrimeImageRelationship(sessionResultId: number) {
        const sessionResult = await SessionResult.findById(sessionResultId)
        if (!sessionResult) {
            throw new NodeNotFoundError(sessionResultId)
        }

        const relationship = await getRel(sessionResultId, RelType.SessionResultHasPrimeImage)
        if (!relationship) {
            throw new RelNotFoundError(RelType.SessionResultHasPrimeImage, sessionResultId, null)
        }

        return relationship
    },

    async deleteHasPrimeImageRelationship(sessionResultId: number, imageId: number) {
        const sessionResult = await SessionResult.findById(sessionResultId)
        if (!sessionResult) {
            throw new NodeNotFoundError(sessionResultId)
        }

        const image = await Image.findById(imageId)
        if (!image) {
            throw new NodeNotFoundError(imageId)
        }

        const relationship = await getSpecificRel(sessionResultId, imageId, RelType.SessionResultHasPrimeImage)
        if (!relationship) {
            throw new RelNotFoundError(RelType.SessionResultHasPrimeImage, sessionResultId, imageId)
        }

        await deleteSpecificRel(sessionResultId, imageId, RelType.SessionResultHasPrimeImage)
    },
}
