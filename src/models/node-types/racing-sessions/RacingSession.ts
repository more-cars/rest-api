import {CreateRacingSessionInput} from "./types/CreateRacingSessionInput"
import {RacingSessionNode} from "./types/RacingSessionNode"
import {convertInputData} from "./create/convertInputData"
import {createNode} from "../../../db/node-types/racing-sessions/createNode"
import {convertDbNodeToModelNode} from "../convertDbNodeToModelNode"
import {getNodeById} from "../../../db/node-types/racing-sessions/getNodeById"
import {getAllNodesOfType} from "../../../db/node-types/racing-sessions/getAllNodesOfType"
import type {NodeCollectionConstraints} from "../../types/NodeCollectionConstraints"
import {deleteNode} from "../../../db/nodes/deleteNode"
import {NodeNotFoundError} from "../../types/NodeNotFoundError"
import {createRel} from "../../relationships/createRel"
import {RacingEvent} from "../racing-events/RacingEvent"
import {getSpecificRel} from "../../relationships/getSpecificRel"
import {RelAlreadyExistsError} from "../../types/RelAlreadyExistsError"
import {RelType} from "../../relationships/types/RelType"
import {getRel} from "../../relationships/getRel"
import {RelNotFoundError} from "../../types/RelNotFoundError"
import {deleteSpecificRel} from "../../relationships/deleteSpecificRel"
import {Image} from "../images/Image"
import {getAllRels} from "../../relationships/getAllRels"
import {SessionResult} from "../session-results/SessionResult"
import {ModelNodeType} from "../../types/ModelNodeType"
import {deleteOutgoingRel} from "../../relationships/deleteOutgoingRel"
import {deleteIncomingRel} from "../../relationships/deleteIncomingRel"

export const RacingSession = {
    async create(data: CreateRacingSessionInput): Promise<RacingSessionNode> {
        const input = convertInputData(data)
        const result = await createNode(input)

        return convertDbNodeToModelNode(result) as RacingSessionNode
    },

    async findById(id: number): Promise<RacingSessionNode> {
        const node = await getNodeById(id)

        if (!node) {
            throw new NodeNotFoundError(id)
        }

        return convertDbNodeToModelNode(node) as RacingSessionNode
    },

    async findAll(options: NodeCollectionConstraints = {}): Promise<RacingSessionNode[]> {
        const nodes: RacingSessionNode[] = []
        const nodesDb = await getAllNodesOfType(options)

        nodesDb.forEach(node => {
            nodes.push(convertDbNodeToModelNode(node) as RacingSessionNode)
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

    async createBelongsToRacingEventRelationship(racingSessionId: number, racingEventId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await RacingSession.findById(racingSessionId)
        await RacingEvent.findById(racingEventId)

        const existingRelation = await getSpecificRel(racingSessionId, racingEventId, RelType.RacingSessionBelongsToRacingEvent)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.RacingSessionBelongsToRacingEvent, racingSessionId, racingEventId)
        }

        await deleteOutgoingRel(racingSessionId, RelType.RacingSessionBelongsToRacingEvent, ModelNodeType.RacingEvent)

        const createdRelationship = await createRel(racingSessionId, racingEventId, RelType.RacingSessionBelongsToRacingEvent)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getBelongsToRacingEventRelationship(racingSessionId: number) {
        // checking that the node exists -> exception is thrown if not
        await RacingSession.findById(racingSessionId)

        const relationship = await getRel(racingSessionId, RelType.RacingSessionBelongsToRacingEvent)
        if (!relationship) {
            throw new RelNotFoundError(RelType.RacingSessionBelongsToRacingEvent, racingSessionId, null)
        }

        return relationship
    },

    async deleteBelongsToRacingEventRelationship(racingSessionId: number, racingEventId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await RacingSession.findById(racingSessionId)
        await RacingEvent.findById(racingEventId)

        const relationship = await getSpecificRel(racingSessionId, racingEventId, RelType.RacingSessionBelongsToRacingEvent)
        if (!relationship) {
            throw new RelNotFoundError(RelType.RacingSessionBelongsToRacingEvent, racingSessionId, racingEventId)
        }

        await deleteSpecificRel(racingSessionId, racingEventId, RelType.RacingSessionBelongsToRacingEvent)
    },

    async createHasSessionResultRelationship(racingSessionId: number, sessionResultId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await RacingSession.findById(racingSessionId)
        await SessionResult.findById(sessionResultId)

        const existingRelation = await getSpecificRel(racingSessionId, sessionResultId, RelType.RacingSessionHasSessionResult)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.RacingSessionHasSessionResult, racingSessionId, sessionResultId)
        }

        await deleteIncomingRel(sessionResultId, RelType.RacingSessionHasSessionResult, ModelNodeType.RacingSession)

        const createdRelationship = await createRel(racingSessionId, sessionResultId, RelType.RacingSessionHasSessionResult)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getAllHasSessionResultRelationships(racingSessionId: number) {
        // checking that the node exists -> exception is thrown if not
        await RacingSession.findById(racingSessionId)

        return getAllRels(racingSessionId, RelType.RacingSessionHasSessionResult)
    },

    async deleteHasSessionResultRelationship(racingSessionId: number, sessionResultId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await RacingSession.findById(racingSessionId)
        await SessionResult.findById(sessionResultId)

        const relationship = await getSpecificRel(racingSessionId, sessionResultId, RelType.RacingSessionHasSessionResult)
        if (!relationship) {
            throw new RelNotFoundError(RelType.RacingSessionHasSessionResult, racingSessionId, sessionResultId)
        }

        await deleteSpecificRel(racingSessionId, sessionResultId, RelType.RacingSessionHasSessionResult)
    },

    async createHasImageRelationship(racingSessionId: number, imageId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await RacingSession.findById(racingSessionId)
        await Image.findById(imageId)

        const existingRelation = await getSpecificRel(racingSessionId, imageId, RelType.RacingSessionHasImage)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.RacingSessionHasImage, racingSessionId, imageId)
        }

        const createdRelationship = await createRel(racingSessionId, imageId, RelType.RacingSessionHasImage)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getAllHasImageRelationships(racingSessionId: number) {
        // checking that the node exists -> exception is thrown if not
        await RacingSession.findById(racingSessionId)

        return getAllRels(racingSessionId, RelType.RacingSessionHasImage)
    },

    async deleteHasImageRelationship(racingSessionId: number, imageId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await RacingSession.findById(racingSessionId)
        await Image.findById(imageId)

        const relationship = await getSpecificRel(racingSessionId, imageId, RelType.RacingSessionHasImage)
        if (!relationship) {
            throw new RelNotFoundError(RelType.RacingSessionHasImage, racingSessionId, imageId)
        }

        await deleteSpecificRel(racingSessionId, imageId, RelType.RacingSessionHasImage)
    },

    async createHasPrimeImageRelationship(racingSessionId: number, imageId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await RacingSession.findById(racingSessionId)
        await Image.findById(imageId)

        const existingRelation = await getSpecificRel(racingSessionId, imageId, RelType.RacingSessionHasPrimeImage)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.RacingSessionHasPrimeImage, racingSessionId, imageId)
        }

        await deleteOutgoingRel(racingSessionId, RelType.RacingSessionHasPrimeImage, ModelNodeType.Image)

        const createdRelationship = await createRel(racingSessionId, imageId, RelType.RacingSessionHasPrimeImage)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getHasPrimeImageRelationship(racingSessionId: number) {
        // checking that the node exists -> exception is thrown if not
        await RacingSession.findById(racingSessionId)

        const relationship = await getRel(racingSessionId, RelType.RacingSessionHasPrimeImage)
        if (!relationship) {
            throw new RelNotFoundError(RelType.RacingSessionHasPrimeImage, racingSessionId, null)
        }

        return relationship
    },

    async deleteHasPrimeImageRelationship(racingSessionId: number, imageId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await RacingSession.findById(racingSessionId)
        await Image.findById(imageId)

        const relationship = await getSpecificRel(racingSessionId, imageId, RelType.RacingSessionHasPrimeImage)
        if (!relationship) {
            throw new RelNotFoundError(RelType.RacingSessionHasPrimeImage, racingSessionId, imageId)
        }

        await deleteSpecificRel(racingSessionId, imageId, RelType.RacingSessionHasPrimeImage)
    },
}
