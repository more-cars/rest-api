import {CreateRacingEventInput} from "./types/CreateRacingEventInput"
import {RacingEventNode} from "./types/RacingEventNode"
import {convertInputData} from "./create/convertInputData"
import {createNode} from "../../db/nodes/racing-events/createNode"
import {convertOutputData} from "./create/convertOutputData"
import {getNodeById} from "../../db/nodes/racing-events/getNodeById"
import {getAllNodesOfType} from "../../db/nodes/racing-events/getAllNodesOfType"
import type {NodeCollectionConstraints} from "../types/NodeCollectionConstraints"
import {deleteNode} from "../../db/nodes/deleteNode"
import {NodeNotFoundError} from "../types/NodeNotFoundError"
import {createRel} from "../relationships/createRel"
import {DbRelationship} from "../../db/types/DbRelationship"
import {deleteDeprecatedRelationship} from "../relationships/deleteDeprecatedRelationship"
import {RacingSeries} from "../racing-series/RacingSeries"
import {getSpecificRel} from "../relationships/getSpecificRel"
import {RelationshipAlreadyExistsError} from "../types/RelationshipAlreadyExistsError"
import {RelationshipType} from "../relationships/types/RelationshipType"
import {RacingEventRelationship} from "./types/RacingEventRelationship"
import {getRel} from "../relationships/getRel"
import {RelationshipNotFoundError} from "../types/RelationshipNotFoundError"
import {deleteSpecificRel} from "../relationships/deleteSpecificRel"
import {SemanticError} from "../types/SemanticError"
import {RaceTrack} from "../race-tracks/RaceTrack"
import {TrackLayout} from "../track-layouts/TrackLayout"

export class RacingEvent {
    static async create(data: CreateRacingEventInput): Promise<RacingEventNode> {
        const input = convertInputData(data)
        const result = await createNode(input)
        const output = convertOutputData(result)

        return output
    }

    static async findById(id: number): Promise<false | RacingEventNode> {
        const node = await getNodeById(id)

        if (!node) {
            return false
        }

        return convertOutputData(node)
    }

    static async findAll(options: NodeCollectionConstraints = {}): Promise<RacingEventNode[]> {
        const nodes: Array<RacingEventNode> = []
        const nodesDb = await getAllNodesOfType(options)

        nodesDb.forEach(node => {
            nodes.push(convertOutputData(node))
        })

        return nodes
    }

    static async delete(racingEventId: number): Promise<void> {
        const node = await RacingEvent.findById(racingEventId)
        if (!node) {
            throw new NodeNotFoundError(racingEventId)
        }

        await deleteNode(racingEventId)
    }

    static async createBelongsToRacingSeriesRelationship(racingEventId: number, racingSeriesId: number) {

        const racingEvent = await RacingEvent.findById(racingEventId)
        if (!racingEvent) {
            throw new NodeNotFoundError(racingEventId)
        }

        const racingSeries = await RacingSeries.findById(racingSeriesId)
        if (!racingSeries) {
            throw new NodeNotFoundError(racingSeriesId)
        }

        const existingRelation = await getSpecificRel(racingEventId, racingSeriesId, RelationshipType.RacingEventBelongsToRacingSeries)
        if (existingRelation) {
            throw new RelationshipAlreadyExistsError(RacingEventRelationship.belongsToRacingSeries, racingEventId, racingSeriesId)
        }

        await deleteDeprecatedRelationship(racingEventId, DbRelationship.RacingEventBelongsToRacingSeries)

        const createdRelationship = await createRel(racingEventId, racingSeriesId, RelationshipType.RacingEventBelongsToRacingSeries)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    }

    static async getBelongsToRacingSeriesRelationship(racingEventId: number) {
        const racingEvent = await RacingEvent.findById(racingEventId)
        if (!racingEvent) {
            throw new NodeNotFoundError(racingEventId)
        }

        const relationship = await getRel(racingEventId, RelationshipType.RacingEventBelongsToRacingSeries)
        if (!relationship) {
            throw new RelationshipNotFoundError(RacingEventRelationship.belongsToRacingSeries, racingEventId, null)
        }

        return relationship
    }

    static async deleteBelongsToRacingSeriesRelationship(racingEventId: number, racingSeriesId: number) {
        const racingEvent = await RacingEvent.findById(racingEventId)
        if (!racingEvent) {
            throw new NodeNotFoundError(racingEventId)
        }

        const racingSeries = await RacingSeries.findById(racingSeriesId)
        if (!racingSeries) {
            throw new NodeNotFoundError(racingSeriesId)
        }

        const relationship = await getSpecificRel(racingEventId, racingSeriesId, RelationshipType.RacingEventBelongsToRacingSeries)
        if (!relationship) {
            throw new RelationshipNotFoundError(RacingEventRelationship.belongsToRacingSeries, racingEventId, racingSeriesId)
        }

        await deleteSpecificRel(racingEventId, racingSeriesId, RelationshipType.RacingEventBelongsToRacingSeries)
    }

    static async createIsFollowedByEventRelationship(racingEventId: number, partnerId: number) {

        if (racingEventId === partnerId) {
            throw new SemanticError(`Racing Event #${racingEventId} cannot be connected to itself`)
        }

        const racingEvent = await RacingEvent.findById(racingEventId)
        if (!racingEvent) {
            throw new NodeNotFoundError(racingEventId)
        }

        const partner = await RacingEvent.findById(partnerId)
        if (!partner) {
            throw new NodeNotFoundError(partnerId)
        }

        const existingRelation = await getSpecificRel(racingEventId, partnerId, RelationshipType.RacingEventIsFollowedByEvent)
        if (existingRelation) {
            throw new RelationshipAlreadyExistsError(RacingEventRelationship.isFollowedByEvent, racingEventId, partnerId)
        }

        await deleteDeprecatedRelationship(racingEventId, DbRelationship.RacingEventIsFollowedByEvent)

        const createdRelationship = await createRel(racingEventId, partnerId, RelationshipType.RacingEventIsFollowedByEvent)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    }

    static async getIsFollowedByEventRelationship(racingEventId: number) {
        const racingEvent = await RacingEvent.findById(racingEventId)
        if (!racingEvent) {
            throw new NodeNotFoundError(racingEventId)
        }

        const relationship = await getRel(racingEventId, RelationshipType.RacingEventIsFollowedByEvent)
        if (!relationship) {
            throw new RelationshipNotFoundError(RacingEventRelationship.isFollowedByEvent, racingEventId, null)
        }

        return relationship
    }

    static async deleteIsFollowedByEventRelationship(racingEventId: number, partnerId: number) {
        const racingEvent = await RacingEvent.findById(racingEventId)
        if (!racingEvent) {
            throw new NodeNotFoundError(racingEventId)
        }

        const partner = await RacingEvent.findById(partnerId)
        if (!partner) {
            throw new NodeNotFoundError(partnerId)
        }

        const relationship = await getSpecificRel(racingEventId, partnerId, RelationshipType.RacingEventIsFollowedByEvent)
        if (!relationship) {
            throw new RelationshipNotFoundError(RacingEventRelationship.isFollowedByEvent, racingEventId, partnerId)
        }

        await deleteSpecificRel(racingEventId, partnerId, RelationshipType.RacingEventIsFollowedByEvent)
    }

    static async createFollowsEventRelationship(racingEventId: number, partnerId: number) {

        if (racingEventId === partnerId) {
            throw new SemanticError(`Racing Event #${racingEventId} cannot be connected to itself`)
        }

        const racingEvent = await RacingEvent.findById(racingEventId)
        if (!racingEvent) {
            throw new NodeNotFoundError(racingEventId)
        }

        const partner = await RacingEvent.findById(partnerId)
        if (!partner) {
            throw new NodeNotFoundError(partnerId)
        }

        const existingRelation = await getSpecificRel(racingEventId, partnerId, RelationshipType.RacingEventFollowsEvent)
        if (existingRelation) {
            throw new RelationshipAlreadyExistsError(RacingEventRelationship.followsEvent, racingEventId, partnerId)
        }

        await deleteDeprecatedRelationship(racingEventId, DbRelationship.RacingEventFollowsEvent)

        const createdRelationship = await createRel(racingEventId, partnerId, RelationshipType.RacingEventFollowsEvent)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    }

    static async getFollowsEventRelationship(racingEventId: number) {
        const racingEvent = await RacingEvent.findById(racingEventId)
        if (!racingEvent) {
            throw new NodeNotFoundError(racingEventId)
        }

        const relationship = await getRel(racingEventId, RelationshipType.RacingEventFollowsEvent)
        if (!relationship) {
            throw new RelationshipNotFoundError(RacingEventRelationship.followsEvent, racingEventId, null)
        }

        return relationship
    }

    static async deleteFollowsEventRelationship(racingEventId: number, partnerId: number) {
        const racingEvent = await RacingEvent.findById(racingEventId)
        if (!racingEvent) {
            throw new NodeNotFoundError(racingEventId)
        }

        const partner = await RacingEvent.findById(partnerId)
        if (!partner) {
            throw new NodeNotFoundError(partnerId)
        }

        const relationship = await getSpecificRel(racingEventId, partnerId, RelationshipType.RacingEventFollowsEvent)
        if (!relationship) {
            throw new RelationshipNotFoundError(RacingEventRelationship.followsEvent, racingEventId, partnerId)
        }

        await deleteSpecificRel(racingEventId, partnerId, RelationshipType.RacingEventFollowsEvent)
    }

    static async createTookPlaceAtRaceTrackRelationship(racingEventId: number, raceTrackId: number) {

        const racingEvent = await RacingEvent.findById(racingEventId)
        if (!racingEvent) {
            throw new NodeNotFoundError(racingEventId)
        }

        const raceTrack = await RaceTrack.findById(raceTrackId)
        if (!raceTrack) {
            throw new NodeNotFoundError(raceTrackId)
        }

        const existingRelation = await getSpecificRel(racingEventId, raceTrackId, RelationshipType.RacingEventTookPlaceAtRaceTrack)
        if (existingRelation) {
            throw new RelationshipAlreadyExistsError(RacingEventRelationship.tookPlaceAtRaceTrack, racingEventId, raceTrackId)
        }

        await deleteDeprecatedRelationship(racingEventId, DbRelationship.RacingEventTookPlaceAtRaceTrack)

        const createdRelationship = await createRel(racingEventId, raceTrackId, RelationshipType.RacingEventTookPlaceAtRaceTrack)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    }

    static async getTookPlaceAtRaceTrackRelationship(racingEventId: number) {
        const racingEvent = await RacingEvent.findById(racingEventId)
        if (!racingEvent) {
            throw new NodeNotFoundError(racingEventId)
        }

        const relationship = await getRel(racingEventId, RelationshipType.RacingEventTookPlaceAtRaceTrack)
        if (!relationship) {
            throw new RelationshipNotFoundError(RacingEventRelationship.tookPlaceAtRaceTrack, racingEventId, null)
        }

        return relationship
    }

    static async deleteTookPlaceAtRaceTrackRelationship(racingEventId: number, raceTrackId: number) {
        const racingEvent = await RacingEvent.findById(racingEventId)
        if (!racingEvent) {
            throw new NodeNotFoundError(racingEventId)
        }

        const raceTrack = await RaceTrack.findById(raceTrackId)
        if (!raceTrack) {
            throw new NodeNotFoundError(raceTrackId)
        }

        const relationship = await getSpecificRel(racingEventId, raceTrackId, RelationshipType.RacingEventTookPlaceAtRaceTrack)
        if (!relationship) {
            throw new RelationshipNotFoundError(RacingEventRelationship.tookPlaceAtRaceTrack, racingEventId, raceTrackId)
        }

        await deleteSpecificRel(racingEventId, raceTrackId, RelationshipType.RacingEventTookPlaceAtRaceTrack)
    }

    static async createUsedTheTrackLayoutRelationship(racingEventId: number, trackLayoutId: number) {

        const racingEvent = await RacingEvent.findById(racingEventId)
        if (!racingEvent) {
            throw new NodeNotFoundError(racingEventId)
        }

        const trackLayout = await TrackLayout.findById(trackLayoutId)
        if (!trackLayout) {
            throw new NodeNotFoundError(trackLayoutId)
        }

        const existingRelation = await getSpecificRel(racingEventId, trackLayoutId, RelationshipType.RacingEventUsedTheTrackLayout)
        if (existingRelation) {
            throw new RelationshipAlreadyExistsError(RacingEventRelationship.usedTheTrackLayout, racingEventId, trackLayoutId)
        }

        await deleteDeprecatedRelationship(racingEventId, DbRelationship.RacingEventUsedTheTrackLayout)

        const createdRelationship = await createRel(racingEventId, trackLayoutId, RelationshipType.RacingEventUsedTheTrackLayout)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    }

    static async getUsedTheTrackLayoutRelationship(racingEventId: number) {
        const racingEvent = await RacingEvent.findById(racingEventId)
        if (!racingEvent) {
            throw new NodeNotFoundError(racingEventId)
        }

        const relationship = await getRel(racingEventId, RelationshipType.RacingEventUsedTheTrackLayout)
        if (!relationship) {
            throw new RelationshipNotFoundError(RacingEventRelationship.usedTheTrackLayout, racingEventId, null)
        }

        return relationship
    }
}
