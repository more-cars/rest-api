import {CreateRacingSessionInput} from "./types/CreateRacingSessionInput"
import {RacingSessionNode} from "./types/RacingSessionNode"
import {convertInputData} from "./create/convertInputData"
import {createNode} from "../../db/nodes/racing-sessions/createNode"
import {convertOutputData} from "./create/convertOutputData"
import {getNodeById} from "../../db/nodes/racing-sessions/getNodeById"
import {getAllNodesOfType} from "../../db/nodes/racing-sessions/getAllNodesOfType"
import type {NodeCollectionConstraints} from "../types/NodeCollectionConstraints"
import {deleteNode} from "../../db/nodes/deleteNode"
import {NodeNotFoundError} from "../types/NodeNotFoundError"
import {createRel} from "../relationships/createRel"
import {DbRelationship} from "../../db/types/DbRelationship"
import {deleteDeprecatedRelationship} from "../relationships/deleteDeprecatedRelationship"
import {RacingEvent} from "../racing-events/RacingEvent"
import {getSpecificRel} from "../relationships/getSpecificRel"
import {RelationshipAlreadyExistsError} from "../types/RelationshipAlreadyExistsError"
import {RelationshipType} from "../relationships/types/RelationshipType"
import {RacingSessionRelationship} from "./types/RacingSessionRelationship"
import {getRel} from "../relationships/getRel"
import {RelationshipNotFoundError} from "../types/RelationshipNotFoundError"
import {deleteSpecificRel} from "../relationships/deleteSpecificRel"
import {Image} from "../images/Image"

export class RacingSession {
    static async create(data: CreateRacingSessionInput): Promise<RacingSessionNode> {
        const input = convertInputData(data)
        const result = await createNode(input)
        const output = convertOutputData(result)

        return output
    }

    static async findById(id: number): Promise<false | RacingSessionNode> {
        const node = await getNodeById(id)

        if (!node) {
            return false
        }

        return convertOutputData(node)
    }

    static async findAll(options: NodeCollectionConstraints = {}): Promise<RacingSessionNode[]> {
        const nodes: Array<RacingSessionNode> = []
        const nodesDb = await getAllNodesOfType(options)

        nodesDb.forEach(node => {
            nodes.push(convertOutputData(node))
        })

        return nodes
    }

    static async delete(racingSessionId: number): Promise<void> {
        const node = await RacingSession.findById(racingSessionId)
        if (!node) {
            throw new NodeNotFoundError(racingSessionId)
        }

        await deleteNode(racingSessionId)
    }

    static async createBelongsToRacingEventRelationship(racingSessionId: number, racingEventId: number) {

        const racingSession = await RacingSession.findById(racingSessionId)
        if (!racingSession) {
            throw new NodeNotFoundError(racingSessionId)
        }

        const racingEvent = await RacingEvent.findById(racingEventId)
        if (!racingEvent) {
            throw new NodeNotFoundError(racingEventId)
        }

        const existingRelation = await getSpecificRel(racingSessionId, racingEventId, RelationshipType.RacingSessionBelongsToRacingEvent)
        if (existingRelation) {
            throw new RelationshipAlreadyExistsError(RacingSessionRelationship.belongsToRacingEvent, racingSessionId, racingEventId)
        }

        await deleteDeprecatedRelationship(racingSessionId, DbRelationship.RacingSessionBelongsToRacingEvent)

        const createdRelationship = await createRel(racingSessionId, racingEventId, RelationshipType.RacingSessionBelongsToRacingEvent)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    }

    static async getBelongsToRacingEventRelationship(racingSessionId: number) {
        const racingSession = await RacingSession.findById(racingSessionId)
        if (!racingSession) {
            throw new NodeNotFoundError(racingSessionId)
        }

        const relationship = await getRel(racingSessionId, RelationshipType.RacingSessionBelongsToRacingEvent)
        if (!relationship) {
            throw new RelationshipNotFoundError(RacingSessionRelationship.belongsToRacingEvent, racingSessionId, null)
        }

        return relationship
    }

    static async deleteBelongsToRacingEventRelationship(racingSessionId: number, racingEventId: number) {
        const racingSession = await RacingSession.findById(racingSessionId)
        if (!racingSession) {
            throw new NodeNotFoundError(racingSessionId)
        }

        const racingEvent = await RacingEvent.findById(racingEventId)
        if (!racingEvent) {
            throw new NodeNotFoundError(racingEventId)
        }

        const relationship = await getSpecificRel(racingSessionId, racingEventId, RelationshipType.RacingSessionBelongsToRacingEvent)
        if (!relationship) {
            throw new RelationshipNotFoundError(RacingSessionRelationship.belongsToRacingEvent, racingSessionId, racingEventId)
        }

        await deleteSpecificRel(racingSessionId, racingEventId, RelationshipType.RacingSessionBelongsToRacingEvent)
    }

    static async createHasImageRelationship(racingSessionId: number, imageId: number) {
        const racingSession = await RacingSession.findById(racingSessionId)
        if (!racingSession) {
            throw new NodeNotFoundError(racingSessionId)
        }

        const image = await Image.findById(imageId)
        if (!image) {
            throw new NodeNotFoundError(imageId)
        }

        const existingRelation = await getSpecificRel(racingSessionId, imageId, RelationshipType.RacingSessionHasImage)
        if (existingRelation) {
            throw new RelationshipAlreadyExistsError(RacingSessionRelationship.hasImage, racingSessionId, imageId)
        }

        const createdRelationship = await createRel(racingSessionId, imageId, RelationshipType.RacingSessionHasImage)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    }
}
