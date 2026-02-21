import {CreateRaceTrackInput} from "./types/CreateRaceTrackInput"
import {RaceTrackNode} from "./types/RaceTrackNode"
import {convertInputData} from "./create/convertInputData"
import {createNode} from "../../../db/nodes/race-tracks/createNode"
import {convertDbNodeToModelNode} from "../convertDbNodeToModelNode"
import {getNodeById} from "../../../db/nodes/race-tracks/getNodeById"
import {getAllNodesOfType} from "../../../db/nodes/race-tracks/getAllNodesOfType"
import type {NodeCollectionConstraints} from "../../types/NodeCollectionConstraints"
import {deleteNode} from "../../../db/nodes/deleteNode"
import {NodeNotFoundError} from "../../types/NodeNotFoundError"
import {createRel} from "../../relationships/createRel"
import {TrackLayout} from "../track-layouts/TrackLayout"
import {getSpecificRel} from "../../relationships/getSpecificRel"
import {RelAlreadyExistsError} from "../../types/RelAlreadyExistsError"
import {RelType} from "../../relationships/types/RelType"
import {getAllRels} from "../../relationships/getAllRels"
import {deleteSpecificRel} from "../../relationships/deleteSpecificRel"
import {RelNotFoundError} from "../../types/RelNotFoundError"
import {Image} from "../images/Image"
import {getRel} from "../../relationships/getRel"
import {RacingEvent} from "../racing-events/RacingEvent"
import {ModelNodeType} from "../../types/ModelNodeType"
import {deleteIncomingRel} from "../../relationships/deleteIncomingRel"
import {deleteOutgoingRel} from "../../relationships/deleteOutgoingRel"

export const RaceTrack = {
    async create(data: CreateRaceTrackInput): Promise<RaceTrackNode> {
        const input = convertInputData(data)
        const result = await createNode(input)

        return convertDbNodeToModelNode(result) as RaceTrackNode
    },

    async findById(id: number): Promise<false | RaceTrackNode> {
        const node = await getNodeById(id)

        if (!node) {
            return false
        }

        return convertDbNodeToModelNode(node) as RaceTrackNode
    },

    async findAll(options: NodeCollectionConstraints = {}): Promise<RaceTrackNode[]> {
        const nodes: RaceTrackNode[] = []
        const nodesDb = await getAllNodesOfType(options)

        nodesDb.forEach(node => {
            nodes.push(convertDbNodeToModelNode(node) as RaceTrackNode)
        })

        return nodes
    },

    async delete(raceTrackId: number): Promise<void> {
        const node = await RaceTrack.findById(raceTrackId)
        if (!node) {
            throw new NodeNotFoundError(raceTrackId)
        }

        await deleteNode(raceTrackId)
    },

    async createHasLayoutRelationship(raceTrackId: number, trackLayoutId: number) {

        const raceTrack = await RaceTrack.findById(raceTrackId)
        if (!raceTrack) {
            throw new NodeNotFoundError(raceTrackId)
        }

        const trackLayout = await TrackLayout.findById(trackLayoutId)
        if (!trackLayout) {
            throw new NodeNotFoundError(trackLayoutId)
        }

        const existingRelation = await getSpecificRel(raceTrackId, trackLayoutId, RelType.RaceTrackHasLayout)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.RaceTrackHasLayout, raceTrackId, trackLayoutId)
        }

        await deleteIncomingRel(trackLayoutId, RelType.RaceTrackHasLayout, ModelNodeType.RaceTrack)

        const createdRelationship = await createRel(raceTrackId, trackLayoutId, RelType.RaceTrackHasLayout)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getAllHasLayoutRelationships(raceTrackId: number) {
        const raceTrack = await RaceTrack.findById(raceTrackId)
        if (!raceTrack) {
            throw new NodeNotFoundError(raceTrackId)
        }

        return getAllRels(raceTrackId, RelType.RaceTrackHasLayout)
    },

    async deleteHasLayoutRelationship(raceTrackId: number, trackLayoutId: number) {
        const raceTrack = await RaceTrack.findById(raceTrackId)
        if (!raceTrack) {
            throw new NodeNotFoundError(raceTrackId)
        }

        const trackLayout = await TrackLayout.findById(trackLayoutId)
        if (!trackLayout) {
            throw new NodeNotFoundError(trackLayoutId)
        }

        const relationship = await getSpecificRel(raceTrackId, trackLayoutId, RelType.RaceTrackHasLayout)
        if (!relationship) {
            throw new RelNotFoundError(RelType.RaceTrackHasLayout, raceTrackId, trackLayoutId)
        }

        await deleteSpecificRel(raceTrackId, trackLayoutId, RelType.RaceTrackHasLayout)
    },

    async createHostedRacingEventRelationship(raceTrackId: number, racingEventId: number) {

        const raceTrack = await RaceTrack.findById(raceTrackId)
        if (!raceTrack) {
            throw new NodeNotFoundError(raceTrackId)
        }

        const racingEvent = await RacingEvent.findById(racingEventId)
        if (!racingEvent) {
            throw new NodeNotFoundError(racingEventId)
        }

        const existingRelation = await getSpecificRel(raceTrackId, racingEventId, RelType.RaceTrackHostedRacingEvent)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.RaceTrackHostedRacingEvent, raceTrackId, racingEventId)
        }

        await deleteIncomingRel(racingEventId, RelType.RaceTrackHostedRacingEvent, ModelNodeType.RaceTrack)

        const createdRelationship = await createRel(raceTrackId, racingEventId, RelType.RaceTrackHostedRacingEvent)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getAllHostedRacingEventRelationships(raceTrackId: number) {
        const raceTrack = await RaceTrack.findById(raceTrackId)
        if (!raceTrack) {
            throw new NodeNotFoundError(raceTrackId)
        }

        return getAllRels(raceTrackId, RelType.RaceTrackHostedRacingEvent)
    },

    async deleteHostedRacingEventRelationship(raceTrackId: number, racingEventId: number) {
        const raceTrack = await RaceTrack.findById(raceTrackId)
        if (!raceTrack) {
            throw new NodeNotFoundError(raceTrackId)
        }

        const racingEvent = await RacingEvent.findById(racingEventId)
        if (!racingEvent) {
            throw new NodeNotFoundError(racingEventId)
        }

        const relationship = await getSpecificRel(raceTrackId, racingEventId, RelType.RaceTrackHostedRacingEvent)
        if (!relationship) {
            throw new RelNotFoundError(RelType.RaceTrackHostedRacingEvent, raceTrackId, racingEventId)
        }

        await deleteSpecificRel(raceTrackId, racingEventId, RelType.RaceTrackHostedRacingEvent)
    },

    async createHasImageRelationship(raceTrackId: number, imageId: number) {

        const raceTrack = await RaceTrack.findById(raceTrackId)
        if (!raceTrack) {
            throw new NodeNotFoundError(raceTrackId)
        }

        const image = await Image.findById(imageId)
        if (!image) {
            throw new NodeNotFoundError(imageId)
        }

        const existingRelation = await getSpecificRel(raceTrackId, imageId, RelType.RaceTrackHasImage)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.RaceTrackHasImage, raceTrackId, imageId)
        }

        const createdRelationship = await createRel(raceTrackId, imageId, RelType.RaceTrackHasImage)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getAllHasImageRelationships(raceTrackId: number) {
        const raceTrack = await RaceTrack.findById(raceTrackId)
        if (!raceTrack) {
            throw new NodeNotFoundError(raceTrackId)
        }

        return getAllRels(raceTrackId, RelType.RaceTrackHasImage)
    },

    async deleteHasImageRelationship(raceTrackId: number, imageId: number) {
        const raceTrack = await RaceTrack.findById(raceTrackId)
        if (!raceTrack) {
            throw new NodeNotFoundError(raceTrackId)
        }

        const image = await Image.findById(imageId)
        if (!image) {
            throw new NodeNotFoundError(imageId)
        }

        const relationship = await getSpecificRel(raceTrackId, imageId, RelType.RaceTrackHasImage)
        if (!relationship) {
            throw new RelNotFoundError(RelType.RaceTrackHasImage, raceTrackId, imageId)
        }

        await deleteSpecificRel(raceTrackId, imageId, RelType.RaceTrackHasImage)
    },

    async createHasPrimeImageRelationship(raceTrackId: number, imageId: number) {

        const raceTrack = await RaceTrack.findById(raceTrackId)
        if (!raceTrack) {
            throw new NodeNotFoundError(raceTrackId)
        }

        const image = await Image.findById(imageId)
        if (!image) {
            throw new NodeNotFoundError(imageId)
        }

        const existingRelation = await getSpecificRel(raceTrackId, imageId, RelType.RaceTrackHasPrimeImage)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.RaceTrackHasPrimeImage, raceTrackId, imageId)
        }

        await deleteOutgoingRel(raceTrackId, RelType.RaceTrackHasPrimeImage, ModelNodeType.Image)

        const createdRelationship = await createRel(raceTrackId, imageId, RelType.RaceTrackHasPrimeImage)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getHasPrimeImageRelationship(raceTrackId: number) {
        const raceTrack = await RaceTrack.findById(raceTrackId)
        if (!raceTrack) {
            throw new NodeNotFoundError(raceTrackId)
        }

        const relationship = await getRel(raceTrackId, RelType.RaceTrackHasPrimeImage)
        if (!relationship) {
            throw new RelNotFoundError(RelType.RaceTrackHasPrimeImage, raceTrackId, null)
        }

        return relationship
    },

    async deleteHasPrimeImageRelationship(raceTrackId: number, imageId: number) {
        const raceTrack = await RaceTrack.findById(raceTrackId)
        if (!raceTrack) {
            throw new NodeNotFoundError(raceTrackId)
        }

        const image = await Image.findById(imageId)
        if (!image) {
            throw new NodeNotFoundError(imageId)
        }

        const relationship = await getSpecificRel(raceTrackId, imageId, RelType.RaceTrackHasPrimeImage)
        if (!relationship) {
            throw new RelNotFoundError(RelType.RaceTrackHasPrimeImage, raceTrackId, imageId)
        }

        await deleteSpecificRel(raceTrackId, imageId, RelType.RaceTrackHasPrimeImage)
    },
}
