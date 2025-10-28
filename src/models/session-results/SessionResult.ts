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
import {deleteDeprecatedRelationship} from "../relationships/deleteDeprecatedRelationship"
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

export class SessionResult {
    static async create(data: CreateSessionResultInput): Promise<SessionResultNode> {
        const input = convertInputData(data)
        const result = await createNode(input)
        const output = convertOutputData(result)

        return output
    }

    static async findById(id: number): Promise<false | SessionResultNode> {
        const node = await getNodeById(id)

        if (!node) {
            return false
        }

        return convertOutputData(node)
    }

    static async findAll(options: NodeCollectionConstraints = {}): Promise<SessionResultNode[]> {
        const nodes: Array<SessionResultNode> = []
        const nodesDb = await getAllNodesOfType(options)

        nodesDb.forEach(node => {
            nodes.push(convertOutputData(node))
        })

        return nodes
    }

    static async delete(sessionResultId: number): Promise<void> {
        const node = await SessionResult.findById(sessionResultId)
        if (!node) {
            throw new NodeNotFoundError(sessionResultId)
        }

        await deleteNode(sessionResultId)
    }

    static async createBelongsToRacingSessionRelationship(sessionResultId: number, racingSessionId: number) {

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

        await deleteDeprecatedRelationship(sessionResultId, DbRelationship.SessionResultBelongsToRacingSession)

        const createdRelationship = await createRel(sessionResultId, racingSessionId, RelationshipType.SessionResultBelongsToRacingSession)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    }

    static async getBelongsToRacingSessionRelationship(sessionResultId: number) {
        const sessionResult = await SessionResult.findById(sessionResultId)
        if (!sessionResult) {
            throw new NodeNotFoundError(sessionResultId)
        }

        const relationship = await getRel(sessionResultId, RelationshipType.SessionResultBelongsToRacingSession)
        if (!relationship) {
            throw new RelationshipNotFoundError(SessionResultRelationship.belongsToRacingSession, sessionResultId, null)
        }

        return relationship
    }

    static async deleteBelongsToRacingSessionRelationship(sessionResultId: number, racingSessionId: number) {
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
    }

    static async createHasLapTimeRelationship(sessionResultId: number, lapTimeId: number) {

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

        await deleteDeprecatedRelationship(lapTimeId, DbRelationship.SessionResultHasLapTime)

        const createdRelationship = await createRel(sessionResultId, lapTimeId, RelationshipType.SessionResultHasLapTime)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    }

    static async getAllHasLapTimeRelationships(sessionResultId: number) {
        const sessionResult = await SessionResult.findById(sessionResultId)
        if (!sessionResult) {
            throw new NodeNotFoundError(sessionResultId)
        }

        return getAllRels(sessionResultId, RelationshipType.SessionResultHasLapTime)
    }

    static async deleteHasLapTimeRelationship(sessionResultId: number, lapTimeId: number) {
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
    }
}
