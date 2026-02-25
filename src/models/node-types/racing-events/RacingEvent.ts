import {CreateRacingEventInput} from "./types/CreateRacingEventInput"
import {RacingEventNode} from "./types/RacingEventNode"
import {convertInputData} from "./create/convertInputData"
import {createNode} from "../../../db/node-types/racing-events/createNode"
import {convertDbNodeToModelNode} from "../convertDbNodeToModelNode"
import {getNodeById} from "../../../db/node-types/racing-events/getNodeById"
import {getAllNodesOfType} from "../../../db/node-types/racing-events/getAllNodesOfType"
import type {NodeCollectionConstraints} from "../../types/NodeCollectionConstraints"
import {deleteNode} from "../../../db/nodes/deleteNode"
import {NodeNotFoundError} from "../../types/NodeNotFoundError"
import {createRel} from "../../relationships/createRel"
import {RacingSeries} from "../racing-series/RacingSeries"
import {getSpecificRel} from "../../relationships/getSpecificRel"
import {RelAlreadyExistsError} from "../../types/RelAlreadyExistsError"
import {RelType} from "../../relationships/types/RelType"
import {getRel} from "../../relationships/getRel"
import {RelNotFoundError} from "../../types/RelNotFoundError"
import {deleteSpecificRel} from "../../relationships/deleteSpecificRel"
import {SemanticError} from "../../types/SemanticError"
import {RaceTrack} from "../race-tracks/RaceTrack"
import {TrackLayout} from "../track-layouts/TrackLayout"
import {Image} from "../images/Image"
import {getAllRels} from "../../relationships/getAllRels"
import {RacingSession} from "../racing-sessions/RacingSession"
import {ModelNodeType} from "../../types/ModelNodeType"
import {deleteOutgoingRel} from "../../relationships/deleteOutgoingRel"
import {deleteIncomingRel} from "../../relationships/deleteIncomingRel"

export const RacingEvent = {
    async create(data: CreateRacingEventInput): Promise<RacingEventNode> {
        const input = convertInputData(data)
        const result = await createNode(input)

        return convertDbNodeToModelNode(result) as RacingEventNode
    },

    async findById(id: number): Promise<RacingEventNode> {
        const node = await getNodeById(id)

        if (!node) {
            throw new NodeNotFoundError(id)
        }

        return convertDbNodeToModelNode(node) as RacingEventNode
    },

    async findAll(options: NodeCollectionConstraints = {}): Promise<RacingEventNode[]> {
        const nodes: RacingEventNode[] = []
        const nodesDb = await getAllNodesOfType(options)

        nodesDb.forEach(node => {
            nodes.push(convertDbNodeToModelNode(node) as RacingEventNode)
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

    async createBelongsToRacingSeriesRelationship(racingEventId: number, racingSeriesId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await RacingEvent.findById(racingEventId)
        await RacingSeries.findById(racingSeriesId)

        const existingRelation = await getSpecificRel(racingEventId, racingSeriesId, RelType.RacingEventBelongsToRacingSeries)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.RacingEventBelongsToRacingSeries, racingEventId, racingSeriesId)
        }

        await deleteOutgoingRel(racingEventId, RelType.RacingEventBelongsToRacingSeries, ModelNodeType.RacingSeries)

        const createdRelationship = await createRel(racingEventId, racingSeriesId, RelType.RacingEventBelongsToRacingSeries)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getBelongsToRacingSeriesRelationship(racingEventId: number) {
        // checking that the node exists -> exception is thrown if not
        await RacingEvent.findById(racingEventId)

        const relationship = await getRel(racingEventId, RelType.RacingEventBelongsToRacingSeries)
        if (!relationship) {
            throw new RelNotFoundError(RelType.RacingEventBelongsToRacingSeries, racingEventId, null)
        }

        return relationship
    },

    async deleteBelongsToRacingSeriesRelationship(racingEventId: number, racingSeriesId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await RacingEvent.findById(racingEventId)
        await RacingSeries.findById(racingSeriesId)

        const relationship = await getSpecificRel(racingEventId, racingSeriesId, RelType.RacingEventBelongsToRacingSeries)
        if (!relationship) {
            throw new RelNotFoundError(RelType.RacingEventBelongsToRacingSeries, racingEventId, racingSeriesId)
        }

        await deleteSpecificRel(racingEventId, racingSeriesId, RelType.RacingEventBelongsToRacingSeries)
    },

    async createIsFollowedByEventRelationship(racingEventId: number, partnerId: number) {
        if (racingEventId === partnerId) {
            throw new SemanticError(`Racing Event #${racingEventId} cannot be connected to itself`)
        }

        // checking that both nodes exist -> exception is thrown if not
        await RacingEvent.findById(racingEventId)
        await RacingEvent.findById(partnerId)

        const existingRelation = await getSpecificRel(racingEventId, partnerId, RelType.RacingEventIsFollowedByEvent)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.RacingEventIsFollowedByEvent, racingEventId, partnerId)
        }

        await deleteOutgoingRel(racingEventId, RelType.RacingEventIsFollowedByEvent, ModelNodeType.RacingEvent)
        await deleteIncomingRel(partnerId, RelType.RacingEventIsFollowedByEvent, ModelNodeType.RacingEvent)

        const createdRelationship = await createRel(racingEventId, partnerId, RelType.RacingEventIsFollowedByEvent)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getIsFollowedByEventRelationship(racingEventId: number) {
        // checking that the node exists -> exception is thrown if not
        await RacingEvent.findById(racingEventId)

        const relationship = await getRel(racingEventId, RelType.RacingEventIsFollowedByEvent)
        if (!relationship) {
            throw new RelNotFoundError(RelType.RacingEventIsFollowedByEvent, racingEventId, null)
        }

        return relationship
    },

    async deleteIsFollowedByEventRelationship(racingEventId: number, partnerId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await RacingEvent.findById(racingEventId)
        await RacingEvent.findById(partnerId)

        const relationship = await getSpecificRel(racingEventId, partnerId, RelType.RacingEventIsFollowedByEvent)
        if (!relationship) {
            throw new RelNotFoundError(RelType.RacingEventIsFollowedByEvent, racingEventId, partnerId)
        }

        await deleteSpecificRel(racingEventId, partnerId, RelType.RacingEventIsFollowedByEvent)
    },

    async createFollowsEventRelationship(racingEventId: number, partnerId: number) {
        if (racingEventId === partnerId) {
            throw new SemanticError(`Racing Event #${racingEventId} cannot be connected to itself`)
        }

        // checking that both nodes exist -> exception is thrown if not
        await RacingEvent.findById(racingEventId)
        await RacingEvent.findById(partnerId)

        const existingRelation = await getSpecificRel(racingEventId, partnerId, RelType.RacingEventFollowsEvent)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.RacingEventFollowsEvent, racingEventId, partnerId)
        }

        await deleteOutgoingRel(racingEventId, RelType.RacingEventFollowsEvent, ModelNodeType.RacingEvent)
        await deleteIncomingRel(partnerId, RelType.RacingEventFollowsEvent, ModelNodeType.RacingEvent)

        const createdRelationship = await createRel(racingEventId, partnerId, RelType.RacingEventFollowsEvent)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getFollowsEventRelationship(racingEventId: number) {
        // checking that the node exists -> exception is thrown if not
        await RacingEvent.findById(racingEventId)

        const relationship = await getRel(racingEventId, RelType.RacingEventFollowsEvent)
        if (!relationship) {
            throw new RelNotFoundError(RelType.RacingEventFollowsEvent, racingEventId, null)
        }

        return relationship
    },

    async deleteFollowsEventRelationship(racingEventId: number, partnerId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await RacingEvent.findById(racingEventId)
        await RacingEvent.findById(partnerId)

        const relationship = await getSpecificRel(racingEventId, partnerId, RelType.RacingEventFollowsEvent)
        if (!relationship) {
            throw new RelNotFoundError(RelType.RacingEventFollowsEvent, racingEventId, partnerId)
        }

        await deleteSpecificRel(racingEventId, partnerId, RelType.RacingEventFollowsEvent)
    },

    async createTookPlaceAtRaceTrackRelationship(racingEventId: number, raceTrackId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await RacingEvent.findById(racingEventId)
        await RaceTrack.findById(raceTrackId)

        const existingRelation = await getSpecificRel(racingEventId, raceTrackId, RelType.RacingEventTookPlaceAtRaceTrack)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.RacingEventTookPlaceAtRaceTrack, racingEventId, raceTrackId)
        }

        await deleteOutgoingRel(racingEventId, RelType.RacingEventTookPlaceAtRaceTrack, ModelNodeType.RaceTrack)

        const createdRelationship = await createRel(racingEventId, raceTrackId, RelType.RacingEventTookPlaceAtRaceTrack)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getTookPlaceAtRaceTrackRelationship(racingEventId: number) {
        // checking that the node exists -> exception is thrown if not
        await RacingEvent.findById(racingEventId)

        const relationship = await getRel(racingEventId, RelType.RacingEventTookPlaceAtRaceTrack)
        if (!relationship) {
            throw new RelNotFoundError(RelType.RacingEventTookPlaceAtRaceTrack, racingEventId, null)
        }

        return relationship
    },

    async deleteTookPlaceAtRaceTrackRelationship(racingEventId: number, raceTrackId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await RacingEvent.findById(racingEventId)
        await RaceTrack.findById(raceTrackId)

        const relationship = await getSpecificRel(racingEventId, raceTrackId, RelType.RacingEventTookPlaceAtRaceTrack)
        if (!relationship) {
            throw new RelNotFoundError(RelType.RacingEventTookPlaceAtRaceTrack, racingEventId, raceTrackId)
        }

        await deleteSpecificRel(racingEventId, raceTrackId, RelType.RacingEventTookPlaceAtRaceTrack)
    },

    async createUsedTheTrackLayoutRelationship(racingEventId: number, trackLayoutId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await RacingEvent.findById(racingEventId)
        await TrackLayout.findById(trackLayoutId)

        const existingRelation = await getSpecificRel(racingEventId, trackLayoutId, RelType.RacingEventUsedTheTrackLayout)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.RacingEventUsedTheTrackLayout, racingEventId, trackLayoutId)
        }

        await deleteOutgoingRel(racingEventId, RelType.RacingEventUsedTheTrackLayout, ModelNodeType.TrackLayout)

        const createdRelationship = await createRel(racingEventId, trackLayoutId, RelType.RacingEventUsedTheTrackLayout)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getUsedTheTrackLayoutRelationship(racingEventId: number) {
        // checking that the node exists -> exception is thrown if not
        await RacingEvent.findById(racingEventId)

        const relationship = await getRel(racingEventId, RelType.RacingEventUsedTheTrackLayout)
        if (!relationship) {
            throw new RelNotFoundError(RelType.RacingEventUsedTheTrackLayout, racingEventId, null)
        }

        return relationship
    },

    async deleteUsedTheTrackLayoutRelationship(racingEventId: number, trackLayoutId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await RacingEvent.findById(racingEventId)
        await TrackLayout.findById(trackLayoutId)

        const relationship = await getSpecificRel(racingEventId, trackLayoutId, RelType.RacingEventUsedTheTrackLayout)
        if (!relationship) {
            throw new RelNotFoundError(RelType.RacingEventUsedTheTrackLayout, racingEventId, trackLayoutId)
        }

        await deleteSpecificRel(racingEventId, trackLayoutId, RelType.RacingEventUsedTheTrackLayout)
    },

    async createHasRacingSessionRelationship(racingEventId: number, racingSessionId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await RacingEvent.findById(racingEventId)
        await RacingSession.findById(racingSessionId)

        const existingRelation = await getSpecificRel(racingEventId, racingSessionId, RelType.RacingEventHasRacingSession)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.RacingEventHasRacingSession, racingEventId, racingSessionId)
        }

        await deleteIncomingRel(racingSessionId, RelType.RacingEventHasRacingSession, ModelNodeType.RacingEvent)

        const createdRelationship = await createRel(racingEventId, racingSessionId, RelType.RacingEventHasRacingSession)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getAllHasRacingSessionRelationships(racingEventId: number) {
        // checking that the node exists -> exception is thrown if not
        await RacingEvent.findById(racingEventId)

        return getAllRels(racingEventId, RelType.RacingEventHasRacingSession)
    },

    async deleteHasRacingSessionRelationship(racingEventId: number, racingSessionId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await RacingEvent.findById(racingEventId)
        await RacingSession.findById(racingSessionId)

        const relationship = await getSpecificRel(racingEventId, racingSessionId, RelType.RacingEventHasRacingSession)
        if (!relationship) {
            throw new RelNotFoundError(RelType.RacingEventHasRacingSession, racingEventId, racingSessionId)
        }

        await deleteSpecificRel(racingEventId, racingSessionId, RelType.RacingEventHasRacingSession)
    },

    async createHasImageRelationship(racingEventId: number, imageId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await RacingEvent.findById(racingEventId)
        await Image.findById(imageId)

        const existingRelation = await getSpecificRel(racingEventId, imageId, RelType.RacingEventHasImage)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.RacingEventHasImage, racingEventId, imageId)
        }

        const createdRelationship = await createRel(racingEventId, imageId, RelType.RacingEventHasImage)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getAllHasImageRelationships(racingEventId: number) {
        // checking that the node exists -> exception is thrown if not
        await RacingEvent.findById(racingEventId)

        return getAllRels(racingEventId, RelType.RacingEventHasImage)
    },

    async deleteHasImageRelationship(racingEventId: number, imageId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await RacingEvent.findById(racingEventId)
        await Image.findById(imageId)

        const relationship = await getSpecificRel(racingEventId, imageId, RelType.RacingEventHasImage)
        if (!relationship) {
            throw new RelNotFoundError(RelType.RacingEventHasImage, racingEventId, imageId)
        }

        await deleteSpecificRel(racingEventId, imageId, RelType.RacingEventHasImage)
    },

    async createHasPrimeImageRelationship(racingEventId: number, imageId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await RacingEvent.findById(racingEventId)
        await Image.findById(imageId)

        const existingRelation = await getSpecificRel(racingEventId, imageId, RelType.RacingEventHasPrimeImage)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.RacingEventHasPrimeImage, racingEventId, imageId)
        }

        await deleteOutgoingRel(racingEventId, RelType.RacingEventHasPrimeImage, ModelNodeType.Image)

        const createdRelationship = await createRel(racingEventId, imageId, RelType.RacingEventHasPrimeImage)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getHasPrimeImageRelationship(racingEventId: number) {
        // checking that the node exists -> exception is thrown if not
        await RacingEvent.findById(racingEventId)

        const relationship = await getRel(racingEventId, RelType.RacingEventHasPrimeImage)
        if (!relationship) {
            throw new RelNotFoundError(RelType.RacingEventHasPrimeImage, racingEventId, null)
        }

        return relationship
    },

    async deleteHasPrimeImageRelationship(racingEventId: number, imageId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await RacingEvent.findById(racingEventId)
        await Image.findById(imageId)

        const relationship = await getSpecificRel(racingEventId, imageId, RelType.RacingEventHasPrimeImage)
        if (!relationship) {
            throw new RelNotFoundError(RelType.RacingEventHasPrimeImage, racingEventId, imageId)
        }

        await deleteSpecificRel(racingEventId, imageId, RelType.RacingEventHasPrimeImage)
    },
}
