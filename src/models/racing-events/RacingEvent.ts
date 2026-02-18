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
import {RacingSeries} from "../racing-series/RacingSeries"
import {getSpecificRel} from "../relationships/getSpecificRel"
import {RelationshipAlreadyExistsError} from "../types/RelationshipAlreadyExistsError"
import {RelType} from "../relationships/types/RelType"
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
import {deleteOutgoingRel} from "../relationships/deleteOutgoingRel"
import {deleteIncomingRel} from "../relationships/deleteIncomingRel"

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
        const nodes: RacingEventNode[] = []
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

        const existingRelation = await getSpecificRel(racingEventId, racingSeriesId, RelType.RacingEventBelongsToRacingSeries)
        if (existingRelation) {
            throw new RelationshipAlreadyExistsError(RelType.RacingEventBelongsToRacingSeries, racingEventId, racingSeriesId)
        }

        await deleteOutgoingRel(racingEventId, RelType.RacingEventBelongsToRacingSeries, NodeTypeLabel.RacingSeries)

        const createdRelationship = await createRel(racingEventId, racingSeriesId, RelType.RacingEventBelongsToRacingSeries)
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

        const relationship = await getRel(racingEventId, RelType.RacingEventBelongsToRacingSeries)
        if (!relationship) {
            throw new RelationshipNotFoundError(RelType.RacingEventBelongsToRacingSeries, racingEventId, null)
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

        const relationship = await getSpecificRel(racingEventId, racingSeriesId, RelType.RacingEventBelongsToRacingSeries)
        if (!relationship) {
            throw new RelationshipNotFoundError(RelType.RacingEventBelongsToRacingSeries, racingEventId, racingSeriesId)
        }

        await deleteSpecificRel(racingEventId, racingSeriesId, RelType.RacingEventBelongsToRacingSeries)
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

        const existingRelation = await getSpecificRel(racingEventId, partnerId, RelType.RacingEventIsFollowedByEvent)
        if (existingRelation) {
            throw new RelationshipAlreadyExistsError(RelType.RacingEventIsFollowedByEvent, racingEventId, partnerId)
        }

        await deleteOutgoingRel(racingEventId, RelType.RacingEventIsFollowedByEvent, NodeTypeLabel.RacingEvent)
        await deleteIncomingRel(partnerId, RelType.RacingEventIsFollowedByEvent, NodeTypeLabel.RacingEvent)

        const createdRelationship = await createRel(racingEventId, partnerId, RelType.RacingEventIsFollowedByEvent)
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

        const relationship = await getRel(racingEventId, RelType.RacingEventIsFollowedByEvent)
        if (!relationship) {
            throw new RelationshipNotFoundError(RelType.RacingEventIsFollowedByEvent, racingEventId, null)
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

        const relationship = await getSpecificRel(racingEventId, partnerId, RelType.RacingEventIsFollowedByEvent)
        if (!relationship) {
            throw new RelationshipNotFoundError(RelType.RacingEventIsFollowedByEvent, racingEventId, partnerId)
        }

        await deleteSpecificRel(racingEventId, partnerId, RelType.RacingEventIsFollowedByEvent)
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

        const existingRelation = await getSpecificRel(racingEventId, partnerId, RelType.RacingEventFollowsEvent)
        if (existingRelation) {
            throw new RelationshipAlreadyExistsError(RelType.RacingEventFollowsEvent, racingEventId, partnerId)
        }

        await deleteOutgoingRel(racingEventId, RelType.RacingEventFollowsEvent, NodeTypeLabel.RacingEvent)
        await deleteIncomingRel(partnerId, RelType.RacingEventFollowsEvent, NodeTypeLabel.RacingEvent)

        const createdRelationship = await createRel(racingEventId, partnerId, RelType.RacingEventFollowsEvent)
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

        const relationship = await getRel(racingEventId, RelType.RacingEventFollowsEvent)
        if (!relationship) {
            throw new RelationshipNotFoundError(RelType.RacingEventFollowsEvent, racingEventId, null)
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

        const relationship = await getSpecificRel(racingEventId, partnerId, RelType.RacingEventFollowsEvent)
        if (!relationship) {
            throw new RelationshipNotFoundError(RelType.RacingEventFollowsEvent, racingEventId, partnerId)
        }

        await deleteSpecificRel(racingEventId, partnerId, RelType.RacingEventFollowsEvent)
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

        const existingRelation = await getSpecificRel(racingEventId, raceTrackId, RelType.RacingEventTookPlaceAtRaceTrack)
        if (existingRelation) {
            throw new RelationshipAlreadyExistsError(RelType.RacingEventTookPlaceAtRaceTrack, racingEventId, raceTrackId)
        }

        await deleteOutgoingRel(racingEventId, RelType.RacingEventTookPlaceAtRaceTrack, NodeTypeLabel.RaceTrack)

        const createdRelationship = await createRel(racingEventId, raceTrackId, RelType.RacingEventTookPlaceAtRaceTrack)
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

        const relationship = await getRel(racingEventId, RelType.RacingEventTookPlaceAtRaceTrack)
        if (!relationship) {
            throw new RelationshipNotFoundError(RelType.RacingEventTookPlaceAtRaceTrack, racingEventId, null)
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

        const relationship = await getSpecificRel(racingEventId, raceTrackId, RelType.RacingEventTookPlaceAtRaceTrack)
        if (!relationship) {
            throw new RelationshipNotFoundError(RelType.RacingEventTookPlaceAtRaceTrack, racingEventId, raceTrackId)
        }

        await deleteSpecificRel(racingEventId, raceTrackId, RelType.RacingEventTookPlaceAtRaceTrack)
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

        const existingRelation = await getSpecificRel(racingEventId, trackLayoutId, RelType.RacingEventUsedTheTrackLayout)
        if (existingRelation) {
            throw new RelationshipAlreadyExistsError(RelType.RacingEventUsedTheTrackLayout, racingEventId, trackLayoutId)
        }

        await deleteOutgoingRel(racingEventId, RelType.RacingEventUsedTheTrackLayout, NodeTypeLabel.TrackLayout)

        const createdRelationship = await createRel(racingEventId, trackLayoutId, RelType.RacingEventUsedTheTrackLayout)
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

        const relationship = await getRel(racingEventId, RelType.RacingEventUsedTheTrackLayout)
        if (!relationship) {
            throw new RelationshipNotFoundError(RelType.RacingEventUsedTheTrackLayout, racingEventId, null)
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

        const relationship = await getSpecificRel(racingEventId, trackLayoutId, RelType.RacingEventUsedTheTrackLayout)
        if (!relationship) {
            throw new RelationshipNotFoundError(RelType.RacingEventUsedTheTrackLayout, racingEventId, trackLayoutId)
        }

        await deleteSpecificRel(racingEventId, trackLayoutId, RelType.RacingEventUsedTheTrackLayout)
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

        const existingRelation = await getSpecificRel(racingEventId, racingSessionId, RelType.RacingEventHasRacingSession)
        if (existingRelation) {
            throw new RelationshipAlreadyExistsError(RelType.RacingEventHasRacingSession, racingEventId, racingSessionId)
        }

        await deleteIncomingRel(racingSessionId, RelType.RacingEventHasRacingSession, NodeTypeLabel.RacingEvent)

        const createdRelationship = await createRel(racingEventId, racingSessionId, RelType.RacingEventHasRacingSession)
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

        return getAllRels(racingEventId, RelType.RacingEventHasRacingSession)
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

        const relationship = await getSpecificRel(racingEventId, racingSessionId, RelType.RacingEventHasRacingSession)
        if (!relationship) {
            throw new RelationshipNotFoundError(RelType.RacingEventHasRacingSession, racingEventId, racingSessionId)
        }

        await deleteSpecificRel(racingEventId, racingSessionId, RelType.RacingEventHasRacingSession)
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

        const existingRelation = await getSpecificRel(racingEventId, imageId, RelType.RacingEventHasImage)
        if (existingRelation) {
            throw new RelationshipAlreadyExistsError(RelType.RacingEventHasImage, racingEventId, imageId)
        }

        const createdRelationship = await createRel(racingEventId, imageId, RelType.RacingEventHasImage)
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

        return getAllRels(racingEventId, RelType.RacingEventHasImage)
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

        const relationship = await getSpecificRel(racingEventId, imageId, RelType.RacingEventHasImage)
        if (!relationship) {
            throw new RelationshipNotFoundError(RelType.RacingEventHasImage, racingEventId, imageId)
        }

        await deleteSpecificRel(racingEventId, imageId, RelType.RacingEventHasImage)
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

        const existingRelation = await getSpecificRel(racingEventId, imageId, RelType.RacingEventHasPrimeImage)
        if (existingRelation) {
            throw new RelationshipAlreadyExistsError(RelType.RacingEventHasPrimeImage, racingEventId, imageId)
        }

        await deleteOutgoingRel(racingEventId, RelType.RacingEventHasPrimeImage, NodeTypeLabel.Image)

        const createdRelationship = await createRel(racingEventId, imageId, RelType.RacingEventHasPrimeImage)
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

        const relationship = await getRel(racingEventId, RelType.RacingEventHasPrimeImage)
        if (!relationship) {
            throw new RelationshipNotFoundError(RelType.RacingEventHasPrimeImage, racingEventId, null)
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

        const relationship = await getSpecificRel(racingEventId, imageId, RelType.RacingEventHasPrimeImage)
        if (!relationship) {
            throw new RelationshipNotFoundError(RelType.RacingEventHasPrimeImage, racingEventId, imageId)
        }

        await deleteSpecificRel(racingEventId, imageId, RelType.RacingEventHasPrimeImage)
    },
}
