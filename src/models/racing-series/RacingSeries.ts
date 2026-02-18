import {CreateRacingSeriesInput} from "./types/CreateRacingSeriesInput"
import {RacingSeriesNode} from "./types/RacingSeriesNode"
import {convertInputData} from "./create/convertInputData"
import {createNode} from "../../db/nodes/racing-series/createNode"
import {convertOutputData} from "./create/convertOutputData"
import {getNodeById} from "../../db/nodes/racing-series/getNodeById"
import {getAllNodesOfType} from "../../db/nodes/racing-series/getAllNodesOfType"
import type {NodeCollectionConstraints} from "../types/NodeCollectionConstraints"
import {deleteNode} from "../../db/nodes/deleteNode"
import {NodeNotFoundError} from "../types/NodeNotFoundError"
import {createRel} from "../relationships/createRel"
import {RacingEvent} from "../racing-events/RacingEvent"
import {getSpecificRel} from "../relationships/getSpecificRel"
import {RelationshipAlreadyExistsError} from "../types/RelationshipAlreadyExistsError"
import {RelType} from "../relationships/types/RelType"
import {getAllRels} from "../relationships/getAllRels"
import {deleteSpecificRel} from "../relationships/deleteSpecificRel"
import {RelationshipNotFoundError} from "../types/RelationshipNotFoundError"
import {Image} from "../images/Image"
import {getRel} from "../relationships/getRel"
import {NodeTypeLabel} from "../../db/NodeTypeLabel"
import {deleteIncomingRel} from "../relationships/deleteIncomingRel"
import {deleteOutgoingRel} from "../relationships/deleteOutgoingRel"

export const RacingSeries = {
    async create(data: CreateRacingSeriesInput): Promise<RacingSeriesNode> {
        const input = convertInputData(data)
        const result = await createNode(input)
        const output = convertOutputData(result)

        return output
    },

    async findById(id: number): Promise<false | RacingSeriesNode> {
        const node = await getNodeById(id)

        if (!node) {
            return false
        }

        return convertOutputData(node)
    },

    async findAll(options: NodeCollectionConstraints = {}): Promise<RacingSeriesNode[]> {
        const nodes: RacingSeriesNode[] = []
        const nodesDb = await getAllNodesOfType(options)

        nodesDb.forEach(node => {
            nodes.push(convertOutputData(node))
        })

        return nodes
    },

    async delete(racingSeriesId: number): Promise<void> {
        const node = await RacingSeries.findById(racingSeriesId)
        if (!node) {
            throw new NodeNotFoundError(racingSeriesId)
        }

        await deleteNode(racingSeriesId)
    },

    async createHasRacingEventRelationship(racingSeriesId: number, racingEventId: number) {

        const racingSeries = await RacingSeries.findById(racingSeriesId)
        if (!racingSeries) {
            throw new NodeNotFoundError(racingSeriesId)
        }

        const racingEvent = await RacingEvent.findById(racingEventId)
        if (!racingEvent) {
            throw new NodeNotFoundError(racingEventId)
        }

        const existingRelation = await getSpecificRel(racingSeriesId, racingEventId, RelType.RacingSeriesHasRacingEvent)
        if (existingRelation) {
            throw new RelationshipAlreadyExistsError(RelType.RacingSeriesHasRacingEvent, racingSeriesId, racingEventId)
        }

        await deleteIncomingRel(racingEventId, RelType.RacingSeriesHasRacingEvent, NodeTypeLabel.RacingSeries)

        const createdRelationship = await createRel(racingSeriesId, racingEventId, RelType.RacingSeriesHasRacingEvent)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getAllHasRacingEventRelationships(racingSeriesId: number) {
        const racingSeries = await RacingSeries.findById(racingSeriesId)
        if (!racingSeries) {
            throw new NodeNotFoundError(racingSeriesId)
        }

        return getAllRels(racingSeriesId, RelType.RacingSeriesHasRacingEvent)
    },

    async deleteHasRacingEventRelationship(racingSeriesId: number, racingEventId: number) {
        const racingSeries = await RacingSeries.findById(racingSeriesId)
        if (!racingSeries) {
            throw new NodeNotFoundError(racingSeriesId)
        }

        const racingEvent = await RacingEvent.findById(racingEventId)
        if (!racingEvent) {
            throw new NodeNotFoundError(racingEventId)
        }

        const relationship = await getSpecificRel(racingSeriesId, racingEventId, RelType.RacingSeriesHasRacingEvent)
        if (!relationship) {
            throw new RelationshipNotFoundError(RelType.RacingSeriesHasRacingEvent, racingSeriesId, racingEventId)
        }

        await deleteSpecificRel(racingSeriesId, racingEventId, RelType.RacingSeriesHasRacingEvent)
    },

    async createHasImageRelationship(racingSeriesId: number, imageId: number) {

        const racingSeries = await RacingSeries.findById(racingSeriesId)
        if (!racingSeries) {
            throw new NodeNotFoundError(racingSeriesId)
        }

        const image = await Image.findById(imageId)
        if (!image) {
            throw new NodeNotFoundError(imageId)
        }

        const existingRelation = await getSpecificRel(racingSeriesId, imageId, RelType.RacingSeriesHasImage)
        if (existingRelation) {
            throw new RelationshipAlreadyExistsError(RelType.RacingSeriesHasImage, racingSeriesId, imageId)
        }

        const createdRelationship = await createRel(racingSeriesId, imageId, RelType.RacingSeriesHasImage)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getAllHasImageRelationships(racingSeriesId: number) {
        const racingSeries = await RacingSeries.findById(racingSeriesId)
        if (!racingSeries) {
            throw new NodeNotFoundError(racingSeriesId)
        }

        return getAllRels(racingSeriesId, RelType.RacingSeriesHasImage)
    },

    async deleteHasImageRelationship(racingSeriesId: number, imageId: number) {
        const racingSeries = await RacingSeries.findById(racingSeriesId)
        if (!racingSeries) {
            throw new NodeNotFoundError(racingSeriesId)
        }

        const image = await Image.findById(imageId)
        if (!image) {
            throw new NodeNotFoundError(imageId)
        }

        const relationship = await getSpecificRel(racingSeriesId, imageId, RelType.RacingSeriesHasImage)
        if (!relationship) {
            throw new RelationshipNotFoundError(RelType.RacingSeriesHasImage, racingSeriesId, imageId)
        }

        await deleteSpecificRel(racingSeriesId, imageId, RelType.RacingSeriesHasImage)
    },

    async createHasPrimeImageRelationship(racingSeriesId: number, imageId: number) {

        const racingSeries = await RacingSeries.findById(racingSeriesId)
        if (!racingSeries) {
            throw new NodeNotFoundError(racingSeriesId)
        }

        const image = await Image.findById(imageId)
        if (!image) {
            throw new NodeNotFoundError(imageId)
        }

        const existingRelation = await getSpecificRel(racingSeriesId, imageId, RelType.RacingSeriesHasPrimeImage)
        if (existingRelation) {
            throw new RelationshipAlreadyExistsError(RelType.RacingSeriesHasPrimeImage, racingSeriesId, imageId)
        }

        await deleteOutgoingRel(racingSeriesId, RelType.RacingSeriesHasPrimeImage, NodeTypeLabel.Image)

        const createdRelationship = await createRel(racingSeriesId, imageId, RelType.RacingSeriesHasPrimeImage)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getHasPrimeImageRelationship(racingSeriesId: number) {
        const racingSeries = await RacingSeries.findById(racingSeriesId)
        if (!racingSeries) {
            throw new NodeNotFoundError(racingSeriesId)
        }

        const relationship = await getRel(racingSeriesId, RelType.RacingSeriesHasPrimeImage)
        if (!relationship) {
            throw new RelationshipNotFoundError(RelType.RacingSeriesHasPrimeImage, racingSeriesId, null)
        }

        return relationship
    },

    async deleteHasPrimeImageRelationship(racingSeriesId: number, imageId: number) {
        const racingSeries = await RacingSeries.findById(racingSeriesId)
        if (!racingSeries) {
            throw new NodeNotFoundError(racingSeriesId)
        }

        const image = await Image.findById(imageId)
        if (!image) {
            throw new NodeNotFoundError(imageId)
        }

        const relationship = await getSpecificRel(racingSeriesId, imageId, RelType.RacingSeriesHasPrimeImage)
        if (!relationship) {
            throw new RelationshipNotFoundError(RelType.RacingSeriesHasPrimeImage, racingSeriesId, imageId)
        }

        await deleteSpecificRel(racingSeriesId, imageId, RelType.RacingSeriesHasPrimeImage)
    },
}
