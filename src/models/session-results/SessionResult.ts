import {CreateSessionResultInput} from "./types/CreateSessionResultInput"
import {SessionResultNode} from "./types/SessionResultNode"
import {convertInputData} from "./create/convertInputData"
import {createNode} from "../../db/nodes/session-results/createNode"
import {convertOutputData} from "./create/convertOutputData"
import {getNodeById} from "../../db/nodes/session-results/getNodeById"
import {getAllNodesOfType} from "../../db/nodes/session-results/getAllNodesOfType"
import type {NodeCollectionConstraints} from "../types/NodeCollectionConstraints"
import {deleteNode} from "../../db/nodes/deleteNode"
import {NodeNotFoundError} from "../types/NodeNotFoundError"
import {createRel} from "../relationships/createRel"
import {DbRelationship} from "../../db/types/DbRelationship"
import {deleteDeprecatedRel} from "../relationships/deleteDeprecatedRel"
import {RacingSession} from "../racing-sessions/RacingSession"
import {getSpecificRel} from "../relationships/getSpecificRel"
import {RelationshipAlreadyExistsError} from "../types/RelationshipAlreadyExistsError"
import {RelationshipType} from "../relationships/types/RelationshipType"
import {SessionResultRelationship} from "./types/SessionResultRelationship"
import {getRel} from "../relationships/getRel"
import {RelationshipNotFoundError} from "../types/RelationshipNotFoundError"
import {deleteSpecificRel} from "../relationships/deleteSpecificRel"
import {LapTime} from "../lap-times/LapTime"
import {getAllRels} from "../relationships/getAllRels"
import {Image} from "../images/Image"
import {NodeTypeLabel} from "../../db/NodeTypeLabel"
import {CarModelVariant} from "../car-model-variants/CarModelVariant"

export const SessionResult = {
    async create(data: CreateSessionResultInput): Promise<SessionResultNode> {
        const input = convertInputData(data)
        const result = await createNode(input)
        const output = convertOutputData(result)

        return output
    },

    async findById(id: number): Promise<false | SessionResultNode> {
        const node = await getNodeById(id)

        if (!node) {
            return false
        }

        return convertOutputData(node)
    },

    async findAll(options: NodeCollectionConstraints = {}): Promise<SessionResultNode[]> {
        const nodes: Array<SessionResultNode> = []
        const nodesDb = await getAllNodesOfType(options)

        nodesDb.forEach(node => {
            nodes.push(convertOutputData(node))
        })

        return nodes
    },

    async delete(sessionResultId: number): Promise<void> {
        const node = await SessionResult.findById(sessionResultId)
        if (!node) {
            throw new NodeNotFoundError(sessionResultId)
        }

        await deleteNode(sessionResultId)
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

        const existingRelation = await getSpecificRel(sessionResultId, racingSessionId, RelationshipType.SessionResultBelongsToRacingSession)
        if (existingRelation) {
            throw new RelationshipAlreadyExistsError(SessionResultRelationship.belongsToRacingSession, sessionResultId, racingSessionId)
        }

        await deleteDeprecatedRel(sessionResultId, DbRelationship.SessionResultBelongsToRacingSession, NodeTypeLabel.RacingSession)

        const createdRelationship = await createRel(sessionResultId, racingSessionId, RelationshipType.SessionResultBelongsToRacingSession)
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

        const relationship = await getRel(sessionResultId, RelationshipType.SessionResultBelongsToRacingSession, NodeTypeLabel.RacingSession)
        if (!relationship) {
            throw new RelationshipNotFoundError(SessionResultRelationship.belongsToRacingSession, sessionResultId, null)
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

        const relationship = await getSpecificRel(sessionResultId, racingSessionId, RelationshipType.SessionResultBelongsToRacingSession)
        if (!relationship) {
            throw new RelationshipNotFoundError(SessionResultRelationship.belongsToRacingSession, sessionResultId, racingSessionId)
        }

        await deleteSpecificRel(sessionResultId, racingSessionId, RelationshipType.SessionResultBelongsToRacingSession)
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

        const existingRelation = await getSpecificRel(sessionResultId, lapTimeId, RelationshipType.SessionResultHasLapTime)
        if (existingRelation) {
            throw new RelationshipAlreadyExistsError(SessionResultRelationship.hasLapTime, sessionResultId, lapTimeId)
        }

        await deleteDeprecatedRel(lapTimeId, DbRelationship.SessionResultHasLapTime, NodeTypeLabel.SessionResult)

        const createdRelationship = await createRel(sessionResultId, lapTimeId, RelationshipType.SessionResultHasLapTime)
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

        return getAllRels(sessionResultId, RelationshipType.SessionResultHasLapTime)
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

        const relationship = await getSpecificRel(sessionResultId, lapTimeId, RelationshipType.SessionResultHasLapTime)
        if (!relationship) {
            throw new RelationshipNotFoundError(SessionResultRelationship.hasLapTime, sessionResultId, lapTimeId)
        }

        await deleteSpecificRel(sessionResultId, lapTimeId, RelationshipType.SessionResultHasLapTime)
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

        const existingRelation = await getSpecificRel(sessionResultId, carModelVariantId, RelationshipType.SessionResultAchievedWithCarModelVariant)
        if (existingRelation) {
            throw new RelationshipAlreadyExistsError(SessionResultRelationship.achievedWithCarModelVariant, sessionResultId, carModelVariantId)
        }

        await deleteDeprecatedRel(sessionResultId, DbRelationship.SessionResultAchievedWithCarModelVariant, NodeTypeLabel.CarModelVariant)

        const createdRelationship = await createRel(sessionResultId, carModelVariantId, RelationshipType.SessionResultAchievedWithCarModelVariant)
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

        const relationship = await getRel(sessionResultId, RelationshipType.SessionResultAchievedWithCarModelVariant, NodeTypeLabel.CarModelVariant)
        if (!relationship) {
            throw new RelationshipNotFoundError(SessionResultRelationship.achievedWithCarModelVariant, sessionResultId, null)
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

        const relationship = await getSpecificRel(sessionResultId, carModelVariantId, RelationshipType.SessionResultAchievedWithCarModelVariant)
        if (!relationship) {
            throw new RelationshipNotFoundError(SessionResultRelationship.achievedWithCarModelVariant, sessionResultId, carModelVariantId)
        }

        await deleteSpecificRel(sessionResultId, carModelVariantId, RelationshipType.SessionResultAchievedWithCarModelVariant)
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

        const existingRelation = await getSpecificRel(sessionResultId, imageId, RelationshipType.SessionResultHasImage)
        if (existingRelation) {
            throw new RelationshipAlreadyExistsError(SessionResultRelationship.hasImage, sessionResultId, imageId)
        }

        const createdRelationship = await createRel(sessionResultId, imageId, RelationshipType.SessionResultHasImage)
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

        return getAllRels(sessionResultId, RelationshipType.SessionResultHasImage)
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

        const relationship = await getSpecificRel(sessionResultId, imageId, RelationshipType.SessionResultHasImage)
        if (!relationship) {
            throw new RelationshipNotFoundError(SessionResultRelationship.hasImage, sessionResultId, imageId)
        }

        await deleteSpecificRel(sessionResultId, imageId, RelationshipType.SessionResultHasImage)
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

        const existingRelation = await getSpecificRel(sessionResultId, imageId, RelationshipType.SessionResultHasPrimeImage)
        if (existingRelation) {
            throw new RelationshipAlreadyExistsError(SessionResultRelationship.hasPrimeImage, sessionResultId, imageId)
        }

        await deleteDeprecatedRel(sessionResultId, DbRelationship.SessionResultHasPrimeImage, NodeTypeLabel.Image)

        const createdRelationship = await createRel(sessionResultId, imageId, RelationshipType.SessionResultHasPrimeImage)
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

        const relationship = await getRel(sessionResultId, RelationshipType.SessionResultHasPrimeImage, NodeTypeLabel.Image)
        if (!relationship) {
            throw new RelationshipNotFoundError(SessionResultRelationship.hasPrimeImage, sessionResultId, null)
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

        const relationship = await getSpecificRel(sessionResultId, imageId, RelationshipType.SessionResultHasPrimeImage)
        if (!relationship) {
            throw new RelationshipNotFoundError(SessionResultRelationship.hasPrimeImage, sessionResultId, imageId)
        }

        await deleteSpecificRel(sessionResultId, imageId, RelationshipType.SessionResultHasPrimeImage)
    },
}
