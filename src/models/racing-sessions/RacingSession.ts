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
import {deleteDeprecatedRel} from "../relationships/deleteDeprecatedRel"
import {RacingEvent} from "../racing-events/RacingEvent"
import {getSpecificRel} from "../relationships/getSpecificRel"
import {RelationshipAlreadyExistsError} from "../types/RelationshipAlreadyExistsError"
import {RelationshipType} from "../relationships/types/RelationshipType"
import {RacingSessionRelationship} from "./types/RacingSessionRelationship"
import {getRel} from "../relationships/getRel"
import {RelationshipNotFoundError} from "../types/RelationshipNotFoundError"
import {deleteSpecificRel} from "../relationships/deleteSpecificRel"
import {Image} from "../images/Image"
import {getAllRels} from "../relationships/getAllRels"
import {SessionResult} from "../session-results/SessionResult"
import {NodeTypeLabel} from "../../db/NodeTypeLabel"
import {RelDirection} from "../relationships/types/RelDirection"

export const RacingSession = {
    async create(data: CreateRacingSessionInput): Promise<RacingSessionNode> {
        const input = convertInputData(data)
        const result = await createNode(input)
        const output = convertOutputData(result)

        return output
    },

    async findById(id: number): Promise<false | RacingSessionNode> {
        const node = await getNodeById(id)

        if (!node) {
            return false
        }

        return convertOutputData(node)
    },

    async findAll(options: NodeCollectionConstraints = {}): Promise<RacingSessionNode[]> {
        const nodes: RacingSessionNode[] = []
        const nodesDb = await getAllNodesOfType(options)

        nodesDb.forEach(node => {
            nodes.push(convertOutputData(node))
        })

        return nodes
    },

    async delete(racingSessionId: number): Promise<void> {
        const node = await RacingSession.findById(racingSessionId)
        if (!node) {
            throw new NodeNotFoundError(racingSessionId)
        }

        await deleteNode(racingSessionId)
    },

    async createBelongsToRacingEventRelationship(racingSessionId: number, racingEventId: number) {

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

        await deleteDeprecatedRel(racingSessionId, DbRelationship.RacingSessionBelongsToRacingEvent, NodeTypeLabel.RacingEvent)

        const createdRelationship = await createRel(racingSessionId, racingEventId, RelationshipType.RacingSessionBelongsToRacingEvent)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getBelongsToRacingEventRelationship(racingSessionId: number) {
        const racingSession = await RacingSession.findById(racingSessionId)
        if (!racingSession) {
            throw new NodeNotFoundError(racingSessionId)
        }

        const relationship = await getRel(racingSessionId, RelationshipType.RacingSessionBelongsToRacingEvent, NodeTypeLabel.RacingEvent, RelDirection.REVERSE)
        if (!relationship) {
            throw new RelationshipNotFoundError(RacingSessionRelationship.belongsToRacingEvent, racingSessionId, null)
        }

        return relationship
    },

    async deleteBelongsToRacingEventRelationship(racingSessionId: number, racingEventId: number) {
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
    },

    async createHasSessionResultRelationship(racingSessionId: number, sessionResultId: number) {

        const racingSession = await RacingSession.findById(racingSessionId)
        if (!racingSession) {
            throw new NodeNotFoundError(racingSessionId)
        }

        const sessionResult = await SessionResult.findById(sessionResultId)
        if (!sessionResult) {
            throw new NodeNotFoundError(sessionResultId)
        }

        const existingRelation = await getSpecificRel(racingSessionId, sessionResultId, RelationshipType.RacingSessionHasSessionResult)
        if (existingRelation) {
            throw new RelationshipAlreadyExistsError(RacingSessionRelationship.hasSessionResult, racingSessionId, sessionResultId)
        }

        await deleteDeprecatedRel(sessionResultId, DbRelationship.RacingSessionHasSessionResult, NodeTypeLabel.RacingSession)

        const createdRelationship = await createRel(racingSessionId, sessionResultId, RelationshipType.RacingSessionHasSessionResult)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getAllHasSessionResultRelationships(racingSessionId: number) {
        const racingSession = await RacingSession.findById(racingSessionId)
        if (!racingSession) {
            throw new NodeNotFoundError(racingSessionId)
        }

        return getAllRels(racingSessionId, RelationshipType.RacingSessionHasSessionResult)
    },

    async deleteHasSessionResultRelationship(racingSessionId: number, sessionResultId: number) {
        const racingSession = await RacingSession.findById(racingSessionId)
        if (!racingSession) {
            throw new NodeNotFoundError(racingSessionId)
        }

        const sessionResult = await SessionResult.findById(sessionResultId)
        if (!sessionResult) {
            throw new NodeNotFoundError(sessionResultId)
        }

        const relationship = await getSpecificRel(racingSessionId, sessionResultId, RelationshipType.RacingSessionHasSessionResult)
        if (!relationship) {
            throw new RelationshipNotFoundError(RacingSessionRelationship.hasSessionResult, racingSessionId, sessionResultId)
        }

        await deleteSpecificRel(racingSessionId, sessionResultId, RelationshipType.RacingSessionHasSessionResult)
    },

    async createHasImageRelationship(racingSessionId: number, imageId: number) {
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
    },

    async getAllHasImageRelationships(racingSessionId: number) {
        const racingSession = await RacingSession.findById(racingSessionId)
        if (!racingSession) {
            throw new NodeNotFoundError(racingSessionId)
        }

        return getAllRels(racingSessionId, RelationshipType.RacingSessionHasImage)
    },

    async deleteHasImageRelationship(racingSessionId: number, imageId: number) {
        const racingSession = await RacingSession.findById(racingSessionId)
        if (!racingSession) {
            throw new NodeNotFoundError(racingSessionId)
        }

        const image = await Image.findById(imageId)
        if (!image) {
            throw new NodeNotFoundError(imageId)
        }

        const relationship = await getSpecificRel(racingSessionId, imageId, RelationshipType.RacingSessionHasImage)
        if (!relationship) {
            throw new RelationshipNotFoundError(RacingSessionRelationship.hasImage, racingSessionId, imageId)
        }

        await deleteSpecificRel(racingSessionId, imageId, RelationshipType.RacingSessionHasImage)
    },

    async createHasPrimeImageRelationship(racingSessionId: number, imageId: number) {

        const racingSession = await RacingSession.findById(racingSessionId)
        if (!racingSession) {
            throw new NodeNotFoundError(racingSessionId)
        }

        const image = await Image.findById(imageId)
        if (!image) {
            throw new NodeNotFoundError(imageId)
        }

        const existingRelation = await getSpecificRel(racingSessionId, imageId, RelationshipType.RacingSessionHasPrimeImage)
        if (existingRelation) {
            throw new RelationshipAlreadyExistsError(RacingSessionRelationship.hasPrimeImage, racingSessionId, imageId)
        }

        await deleteDeprecatedRel(racingSessionId, DbRelationship.RacingSessionHasPrimeImage, NodeTypeLabel.Image)

        const createdRelationship = await createRel(racingSessionId, imageId, RelationshipType.RacingSessionHasPrimeImage)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getHasPrimeImageRelationship(racingSessionId: number) {
        const racingSession = await RacingSession.findById(racingSessionId)
        if (!racingSession) {
            throw new NodeNotFoundError(racingSessionId)
        }

        const relationship = await getRel(racingSessionId, RelationshipType.RacingSessionHasPrimeImage, NodeTypeLabel.Image, RelDirection.FORWARD)
        if (!relationship) {
            throw new RelationshipNotFoundError(RacingSessionRelationship.hasPrimeImage, racingSessionId, null)
        }

        return relationship
    },

    async deleteHasPrimeImageRelationship(racingSessionId: number, imageId: number) {
        const racingSession = await RacingSession.findById(racingSessionId)
        if (!racingSession) {
            throw new NodeNotFoundError(racingSessionId)
        }

        const image = await Image.findById(imageId)
        if (!image) {
            throw new NodeNotFoundError(imageId)
        }

        const relationship = await getSpecificRel(racingSessionId, imageId, RelationshipType.RacingSessionHasPrimeImage)
        if (!relationship) {
            throw new RelationshipNotFoundError(RacingSessionRelationship.hasPrimeImage, racingSessionId, imageId)
        }

        await deleteSpecificRel(racingSessionId, imageId, RelationshipType.RacingSessionHasPrimeImage)
    },
}
