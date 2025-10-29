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
import {DbRelationship} from "../../db/types/DbRelationship"
import {deleteDeprecatedRelationship} from "../relationships/deleteDeprecatedRelationship"
import {RacingEvent} from "../racing-events/RacingEvent"
import {getSpecificRel} from "../relationships/getSpecificRel"
import {RelationshipAlreadyExistsError} from "../types/RelationshipAlreadyExistsError"
import {RelationshipType} from "../relationships/types/RelationshipType"
import {RacingSeriesRelationship} from "./types/RacingSeriesRelationship"
import {getAllRels} from "../relationships/getAllRels"
import {deleteSpecificRel} from "../relationships/deleteSpecificRel"
import {RelationshipNotFoundError} from "../types/RelationshipNotFoundError"
import {Image} from "../images/Image"
import {getRel} from "../relationships/getRel"
import {NodeTypeLabel} from "../../db/NodeTypeLabel"

export class RacingSeries {
    static async create(data: CreateRacingSeriesInput): Promise<RacingSeriesNode> {
        const input = convertInputData(data)
        const result = await createNode(input)
        const output = convertOutputData(result)

        return output
    }

    static async findById(id: number): Promise<false | RacingSeriesNode> {
        const node = await getNodeById(id)

        if (!node) {
            return false
        }

        return convertOutputData(node)
    }

    static async findAll(options: NodeCollectionConstraints = {}): Promise<RacingSeriesNode[]> {
        const nodes: Array<RacingSeriesNode> = []
        const nodesDb = await getAllNodesOfType(options)

        nodesDb.forEach(node => {
            nodes.push(convertOutputData(node))
        })

        return nodes
    }

    static async delete(racingSeriesId: number): Promise<void> {
        const node = await RacingSeries.findById(racingSeriesId)
        if (!node) {
            throw new NodeNotFoundError(racingSeriesId)
        }

        await deleteNode(racingSeriesId)
    }

    static async createHasRacingEventRelationship(racingSeriesId: number, racingEventId: number) {

        const racingSeries = await RacingSeries.findById(racingSeriesId)
        if (!racingSeries) {
            throw new NodeNotFoundError(racingSeriesId)
        }

        const racingEvent = await RacingEvent.findById(racingEventId)
        if (!racingEvent) {
            throw new NodeNotFoundError(racingEventId)
        }

        const existingRelation = await getSpecificRel(racingSeriesId, racingEventId, RelationshipType.RacingSeriesHasRacingEvent)
        if (existingRelation) {
            throw new RelationshipAlreadyExistsError(RacingSeriesRelationship.hasRacingEvent, racingSeriesId, racingEventId)
        }

        await deleteDeprecatedRelationship(racingEventId, DbRelationship.RacingSeriesHasRacingEvent, NodeTypeLabel.RacingSeries)

        const createdRelationship = await createRel(racingSeriesId, racingEventId, RelationshipType.RacingSeriesHasRacingEvent)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    }

    static async getAllHasRacingEventRelationships(racingSeriesId: number) {
        const racingSeries = await RacingSeries.findById(racingSeriesId)
        if (!racingSeries) {
            throw new NodeNotFoundError(racingSeriesId)
        }

        return getAllRels(racingSeriesId, RelationshipType.RacingSeriesHasRacingEvent)
    }

    static async deleteHasRacingEventRelationship(racingSeriesId: number, racingEventId: number) {
        const racingSeries = await RacingSeries.findById(racingSeriesId)
        if (!racingSeries) {
            throw new NodeNotFoundError(racingSeriesId)
        }

        const racingEvent = await RacingEvent.findById(racingEventId)
        if (!racingEvent) {
            throw new NodeNotFoundError(racingEventId)
        }

        const relationship = await getSpecificRel(racingSeriesId, racingEventId, RelationshipType.RacingSeriesHasRacingEvent)
        if (!relationship) {
            throw new RelationshipNotFoundError(RacingSeriesRelationship.hasRacingEvent, racingSeriesId, racingEventId)
        }

        await deleteSpecificRel(racingSeriesId, racingEventId, RelationshipType.RacingSeriesHasRacingEvent)
    }

    static async createHasImageRelationship(racingSeriesId: number, imageId: number) {

        const racingSeries = await RacingSeries.findById(racingSeriesId)
        if (!racingSeries) {
            throw new NodeNotFoundError(racingSeriesId)
        }

        const image = await Image.findById(imageId)
        if (!image) {
            throw new NodeNotFoundError(imageId)
        }

        const existingRelation = await getSpecificRel(racingSeriesId, imageId, RelationshipType.RacingSeriesHasImage)
        if (existingRelation) {
            throw new RelationshipAlreadyExistsError(RacingSeriesRelationship.hasImage, racingSeriesId, imageId)
        }

        const createdRelationship = await createRel(racingSeriesId, imageId, RelationshipType.RacingSeriesHasImage)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    }

    static async getAllHasImageRelationships(racingSeriesId: number) {
        const racingSeries = await RacingSeries.findById(racingSeriesId)
        if (!racingSeries) {
            throw new NodeNotFoundError(racingSeriesId)
        }

        return getAllRels(racingSeriesId, RelationshipType.RacingSeriesHasImage)
    }

    static async deleteHasImageRelationship(racingSeriesId: number, imageId: number) {
        const racingSeries = await RacingSeries.findById(racingSeriesId)
        if (!racingSeries) {
            throw new NodeNotFoundError(racingSeriesId)
        }

        const image = await Image.findById(imageId)
        if (!image) {
            throw new NodeNotFoundError(imageId)
        }

        const relationship = await getSpecificRel(racingSeriesId, imageId, RelationshipType.RacingSeriesHasImage)
        if (!relationship) {
            throw new RelationshipNotFoundError(RacingSeriesRelationship.hasImage, racingSeriesId, imageId)
        }

        await deleteSpecificRel(racingSeriesId, imageId, RelationshipType.RacingSeriesHasImage)
    }

    static async createHasPrimeImageRelationship(racingSeriesId: number, imageId: number) {

        const racingSeries = await RacingSeries.findById(racingSeriesId)
        if (!racingSeries) {
            throw new NodeNotFoundError(racingSeriesId)
        }

        const image = await Image.findById(imageId)
        if (!image) {
            throw new NodeNotFoundError(imageId)
        }

        const existingRelation = await getSpecificRel(racingSeriesId, imageId, RelationshipType.RacingSeriesHasPrimeImage)
        if (existingRelation) {
            throw new RelationshipAlreadyExistsError(RacingSeriesRelationship.hasPrimeImage, racingSeriesId, imageId)
        }

        await deleteDeprecatedRelationship(racingSeriesId, DbRelationship.RacingSeriesHasPrimeImage, NodeTypeLabel.Image)

        const createdRelationship = await createRel(racingSeriesId, imageId, RelationshipType.RacingSeriesHasPrimeImage)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    }

    static async getHasPrimeImageRelationship(racingSeriesId: number) {
        const racingSeries = await RacingSeries.findById(racingSeriesId)
        if (!racingSeries) {
            throw new NodeNotFoundError(racingSeriesId)
        }

        const relationship = await getRel(racingSeriesId, RelationshipType.RacingSeriesHasPrimeImage, NodeTypeLabel.Image)
        if (!relationship) {
            throw new RelationshipNotFoundError(RacingSeriesRelationship.hasPrimeImage, racingSeriesId, null)
        }

        return relationship
    }

    static async deleteHasPrimeImageRelationship(racingSeriesId: number, imageId: number) {
        const racingSeries = await RacingSeries.findById(racingSeriesId)
        if (!racingSeries) {
            throw new NodeNotFoundError(racingSeriesId)
        }

        const image = await Image.findById(imageId)
        if (!image) {
            throw new NodeNotFoundError(imageId)
        }

        const relationship = await getSpecificRel(racingSeriesId, imageId, RelationshipType.RacingSeriesHasPrimeImage)
        if (!relationship) {
            throw new RelationshipNotFoundError(RacingSeriesRelationship.hasPrimeImage, racingSeriesId, imageId)
        }

        await deleteSpecificRel(racingSeriesId, imageId, RelationshipType.RacingSeriesHasPrimeImage)
    }
}
