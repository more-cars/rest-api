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
import {deleteDeprecatedRel} from "../relationships/deleteDeprecatedRel"
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
import {Image} from "../images/Image"
import {getAllRels} from "../relationships/getAllRels"
import {RacingSession} from "../racing-sessions/RacingSession"
import {NodeTypeLabel} from "../../db/NodeTypeLabel"

export const RacingEvent = {
    async create(data: CreateRacingEventInput): Promise<RacingEventNode> {
        const input = convertInputData(data)
        const result = await createNode(input)
        const output = convertOutputData(result)

        return output
    },

    async findById(id: number): Promise<false | RacingEventNode> {
        const node = await getNodeById(id)

        if (!node) {
            return false
        }

        return convertOutputData(node)
    },

    async findAll(options: NodeCollectionConstraints = {}): Promise<RacingEventNode[]> {
        const nodes: Array<RacingEventNode> = []
        const nodesDb = await getAllNodesOfType(options)

        nodesDb.forEach(node => {
            nodes.push(convertOutputData(node))
        })

        return nodes
    },

    async delete(racingEventId: number): Promise<void> {
        const node = await RacingEvent.findById(racingEventId)
        if (!node) {
            throw new NodeNotFoundError(racingEventId)
        }

        await deleteNode(racingEventId)
    },

    async createBelongsToRacingSeriesRelationship(racingEventId: number, racingSeriesId: number) {

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

        await deleteDeprecatedRel(racingEventId, DbRelationship.RacingEventBelongsToRacingSeries, NodeTypeLabel.RacingSeries)

        const createdRelationship = await createRel(racingEventId, racingSeriesId, RelationshipType.RacingEventBelongsToRacingSeries)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getBelongsToRacingSeriesRelationship(racingEventId: number) {
        const racingEvent = await RacingEvent.findById(racingEventId)
        if (!racingEvent) {
            throw new NodeNotFoundError(racingEventId)
        }

        const relationship = await getRel(racingEventId, RelationshipType.RacingEventBelongsToRacingSeries, NodeTypeLabel.RacingSeries)
        if (!relationship) {
            throw new RelationshipNotFoundError(RacingEventRelationship.belongsToRacingSeries, racingEventId, null)
        }

        return relationship
    },

    async deleteBelongsToRacingSeriesRelationship(racingEventId: number, racingSeriesId: number) {
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
    },

    async createIsFollowedByEventRelationship(racingEventId: number, partnerId: number) {

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

        await deleteDeprecatedRel(racingEventId, DbRelationship.RacingEventIsFollowedByEvent, NodeTypeLabel.RacingEvent)
        await deleteDeprecatedRel(partnerId, DbRelationship.RacingEventIsFollowedByEvent, NodeTypeLabel.RacingEvent)

        const createdRelationship = await createRel(racingEventId, partnerId, RelationshipType.RacingEventIsFollowedByEvent)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getIsFollowedByEventRelationship(racingEventId: number) {
        const racingEvent = await RacingEvent.findById(racingEventId)
        if (!racingEvent) {
            throw new NodeNotFoundError(racingEventId)
        }

        const relationship = await getRel(racingEventId, RelationshipType.RacingEventIsFollowedByEvent, NodeTypeLabel.RacingEvent)
        if (!relationship) {
            throw new RelationshipNotFoundError(RacingEventRelationship.isFollowedByEvent, racingEventId, null)
        }

        return relationship
    },

    async deleteIsFollowedByEventRelationship(racingEventId: number, partnerId: number) {
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
    },

    async createFollowsEventRelationship(racingEventId: number, partnerId: number) {

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

        await deleteDeprecatedRel(racingEventId, DbRelationship.RacingEventFollowsEvent, NodeTypeLabel.RacingEvent)
        await deleteDeprecatedRel(partnerId, DbRelationship.RacingEventFollowsEvent, NodeTypeLabel.RacingEvent)

        const createdRelationship = await createRel(racingEventId, partnerId, RelationshipType.RacingEventFollowsEvent)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getFollowsEventRelationship(racingEventId: number) {
        const racingEvent = await RacingEvent.findById(racingEventId)
        if (!racingEvent) {
            throw new NodeNotFoundError(racingEventId)
        }

        const relationship = await getRel(racingEventId, RelationshipType.RacingEventFollowsEvent, NodeTypeLabel.RacingEvent)
        if (!relationship) {
            throw new RelationshipNotFoundError(RacingEventRelationship.followsEvent, racingEventId, null)
        }

        return relationship
    },

    async deleteFollowsEventRelationship(racingEventId: number, partnerId: number) {
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
    },

    async createTookPlaceAtRaceTrackRelationship(racingEventId: number, raceTrackId: number) {

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

        await deleteDeprecatedRel(racingEventId, DbRelationship.RacingEventTookPlaceAtRaceTrack, NodeTypeLabel.RaceTrack)

        const createdRelationship = await createRel(racingEventId, raceTrackId, RelationshipType.RacingEventTookPlaceAtRaceTrack)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getTookPlaceAtRaceTrackRelationship(racingEventId: number) {
        const racingEvent = await RacingEvent.findById(racingEventId)
        if (!racingEvent) {
            throw new NodeNotFoundError(racingEventId)
        }

        const relationship = await getRel(racingEventId, RelationshipType.RacingEventTookPlaceAtRaceTrack, NodeTypeLabel.RaceTrack)
        if (!relationship) {
            throw new RelationshipNotFoundError(RacingEventRelationship.tookPlaceAtRaceTrack, racingEventId, null)
        }

        return relationship
    },

    async deleteTookPlaceAtRaceTrackRelationship(racingEventId: number, raceTrackId: number) {
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
    },

    async createUsedTheTrackLayoutRelationship(racingEventId: number, trackLayoutId: number) {

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

        await deleteDeprecatedRel(racingEventId, DbRelationship.RacingEventUsedTheTrackLayout, NodeTypeLabel.TrackLayout)

        const createdRelationship = await createRel(racingEventId, trackLayoutId, RelationshipType.RacingEventUsedTheTrackLayout)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getUsedTheTrackLayoutRelationship(racingEventId: number) {
        const racingEvent = await RacingEvent.findById(racingEventId)
        if (!racingEvent) {
            throw new NodeNotFoundError(racingEventId)
        }

        const relationship = await getRel(racingEventId, RelationshipType.RacingEventUsedTheTrackLayout, NodeTypeLabel.TrackLayout)
        if (!relationship) {
            throw new RelationshipNotFoundError(RacingEventRelationship.usedTheTrackLayout, racingEventId, null)
        }

        return relationship
    },

    async deleteUsedTheTrackLayoutRelationship(racingEventId: number, trackLayoutId: number) {
        const racingEvent = await RacingEvent.findById(racingEventId)
        if (!racingEvent) {
            throw new NodeNotFoundError(racingEventId)
        }

        const trackLayout = await TrackLayout.findById(trackLayoutId)
        if (!trackLayout) {
            throw new NodeNotFoundError(trackLayoutId)
        }

        const relationship = await getSpecificRel(racingEventId, trackLayoutId, RelationshipType.RacingEventUsedTheTrackLayout)
        if (!relationship) {
            throw new RelationshipNotFoundError(RacingEventRelationship.usedTheTrackLayout, racingEventId, trackLayoutId)
        }

        await deleteSpecificRel(racingEventId, trackLayoutId, RelationshipType.RacingEventUsedTheTrackLayout)
    },

    async createHasRacingSessionRelationship(racingEventId: number, racingSessionId: number) {

        const racingEvent = await RacingEvent.findById(racingEventId)
        if (!racingEvent) {
            throw new NodeNotFoundError(racingEventId)
        }

        const racingSession = await RacingSession.findById(racingSessionId)
        if (!racingSession) {
            throw new NodeNotFoundError(racingSessionId)
        }

        const existingRelation = await getSpecificRel(racingEventId, racingSessionId, RelationshipType.RacingEventHasRacingSession)
        if (existingRelation) {
            throw new RelationshipAlreadyExistsError(RacingEventRelationship.hasRacingSession, racingEventId, racingSessionId)
        }

        await deleteDeprecatedRel(racingSessionId, DbRelationship.RacingEventHasRacingSession, NodeTypeLabel.RacingEvent)

        const createdRelationship = await createRel(racingEventId, racingSessionId, RelationshipType.RacingEventHasRacingSession)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getAllHasRacingSessionRelationships(racingEventId: number) {
        const racingEvent = await RacingEvent.findById(racingEventId)
        if (!racingEvent) {
            throw new NodeNotFoundError(racingEventId)
        }

        return getAllRels(racingEventId, RelationshipType.RacingEventHasRacingSession)
    },

    async deleteHasRacingSessionRelationship(racingEventId: number, racingSessionId: number) {
        const racingEvent = await RacingEvent.findById(racingEventId)
        if (!racingEvent) {
            throw new NodeNotFoundError(racingEventId)
        }

        const racingSession = await RacingSession.findById(racingSessionId)
        if (!racingSession) {
            throw new NodeNotFoundError(racingSessionId)
        }

        const relationship = await getSpecificRel(racingEventId, racingSessionId, RelationshipType.RacingEventHasRacingSession)
        if (!relationship) {
            throw new RelationshipNotFoundError(RacingEventRelationship.hasRacingSession, racingEventId, racingSessionId)
        }

        await deleteSpecificRel(racingEventId, racingSessionId, RelationshipType.RacingEventHasRacingSession)
    },

    async createHasImageRelationship(racingEventId: number, imageId: number) {

        const racingEvent = await RacingEvent.findById(racingEventId)
        if (!racingEvent) {
            throw new NodeNotFoundError(racingEventId)
        }

        const image = await Image.findById(imageId)
        if (!image) {
            throw new NodeNotFoundError(imageId)
        }

        const existingRelation = await getSpecificRel(racingEventId, imageId, RelationshipType.RacingEventHasImage)
        if (existingRelation) {
            throw new RelationshipAlreadyExistsError(RacingEventRelationship.hasImage, racingEventId, imageId)
        }

        const createdRelationship = await createRel(racingEventId, imageId, RelationshipType.RacingEventHasImage)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getAllHasImageRelationships(racingEventId: number) {
        const racingEvent = await RacingEvent.findById(racingEventId)
        if (!racingEvent) {
            throw new NodeNotFoundError(racingEventId)
        }

        return getAllRels(racingEventId, RelationshipType.RacingEventHasImage)
    },

    async deleteHasImageRelationship(racingEventId: number, imageId: number) {
        const racingEvent = await RacingEvent.findById(racingEventId)
        if (!racingEvent) {
            throw new NodeNotFoundError(racingEventId)
        }

        const image = await Image.findById(imageId)
        if (!image) {
            throw new NodeNotFoundError(imageId)
        }

        const relationship = await getSpecificRel(racingEventId, imageId, RelationshipType.RacingEventHasImage)
        if (!relationship) {
            throw new RelationshipNotFoundError(RacingEventRelationship.hasImage, racingEventId, imageId)
        }

        await deleteSpecificRel(racingEventId, imageId, RelationshipType.RacingEventHasImage)
    },

    async createHasPrimeImageRelationship(racingEventId: number, imageId: number) {

        const racingEvent = await RacingEvent.findById(racingEventId)
        if (!racingEvent) {
            throw new NodeNotFoundError(racingEventId)
        }

        const image = await Image.findById(imageId)
        if (!image) {
            throw new NodeNotFoundError(imageId)
        }

        const existingRelation = await getSpecificRel(racingEventId, imageId, RelationshipType.RacingEventHasPrimeImage)
        if (existingRelation) {
            throw new RelationshipAlreadyExistsError(RacingEventRelationship.hasPrimeImage, racingEventId, imageId)
        }

        await deleteDeprecatedRel(racingEventId, DbRelationship.RacingEventHasPrimeImage, NodeTypeLabel.Image)

        const createdRelationship = await createRel(racingEventId, imageId, RelationshipType.RacingEventHasPrimeImage)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getHasPrimeImageRelationship(racingEventId: number) {
        const racingEvent = await RacingEvent.findById(racingEventId)
        if (!racingEvent) {
            throw new NodeNotFoundError(racingEventId)
        }

        const relationship = await getRel(racingEventId, RelationshipType.RacingEventHasPrimeImage, NodeTypeLabel.Image)
        if (!relationship) {
            throw new RelationshipNotFoundError(RacingEventRelationship.hasPrimeImage, racingEventId, null)
        }

        return relationship
    },

    async deleteHasPrimeImageRelationship(racingEventId: number, imageId: number) {
        const racingEvent = await RacingEvent.findById(racingEventId)
        if (!racingEvent) {
            throw new NodeNotFoundError(racingEventId)
        }

        const image = await Image.findById(imageId)
        if (!image) {
            throw new NodeNotFoundError(imageId)
        }

        const relationship = await getSpecificRel(racingEventId, imageId, RelationshipType.RacingEventHasPrimeImage)
        if (!relationship) {
            throw new RelationshipNotFoundError(RacingEventRelationship.hasPrimeImage, racingEventId, imageId)
        }

        await deleteSpecificRel(racingEventId, imageId, RelationshipType.RacingEventHasPrimeImage)
    },
}
