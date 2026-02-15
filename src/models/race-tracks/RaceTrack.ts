import {CreateRaceTrackInput} from "./types/CreateRaceTrackInput"
import {RaceTrackNode} from "./types/RaceTrackNode"
import {convertInputData} from "./create/convertInputData"
import {createNode} from "../../db/nodes/race-tracks/createNode"
import {convertOutputData} from "./create/convertOutputData"
import {getNodeById} from "../../db/nodes/race-tracks/getNodeById"
import {getAllNodesOfType} from "../../db/nodes/race-tracks/getAllNodesOfType"
import type {NodeCollectionConstraints} from "../types/NodeCollectionConstraints"
import {deleteNode} from "../../db/nodes/deleteNode"
import {NodeNotFoundError} from "../types/NodeNotFoundError"
import {createRel} from "../relationships/createRel"
import {deleteDeprecatedRel} from "../relationships/deleteDeprecatedRel"
import {TrackLayout} from "../track-layouts/TrackLayout"
import {getSpecificRel} from "../relationships/getSpecificRel"
import {RelationshipAlreadyExistsError} from "../types/RelationshipAlreadyExistsError"
import {RelationshipType} from "../relationships/types/RelationshipType"
import {RaceTrackRelationship} from "./types/RaceTrackRelationship"
import {getAllRels} from "../relationships/getAllRels"
import {deleteSpecificRel} from "../relationships/deleteSpecificRel"
import {RelationshipNotFoundError} from "../types/RelationshipNotFoundError"
import {Image} from "../images/Image"
import {getRel} from "../relationships/getRel"
import {RacingEvent} from "../racing-events/RacingEvent"
import {NodeTypeLabel} from "../../db/NodeTypeLabel"

export const RaceTrack = {
    async create(data: CreateRaceTrackInput): Promise<RaceTrackNode> {
        const input = convertInputData(data)
        const result = await createNode(input)
        const output = convertOutputData(result)

        return output
    },

    async findById(id: number): Promise<false | RaceTrackNode> {
        const node = await getNodeById(id)

        if (!node) {
            return false
        }

        return convertOutputData(node)
    },

    async findAll(options: NodeCollectionConstraints = {}): Promise<RaceTrackNode[]> {
        const nodes: RaceTrackNode[] = []
        const nodesDb = await getAllNodesOfType(options)

        nodesDb.forEach(node => {
            nodes.push(convertOutputData(node))
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

        const existingRelation = await getSpecificRel(raceTrackId, trackLayoutId, RelationshipType.RaceTrackHasLayout)
        if (existingRelation) {
            throw new RelationshipAlreadyExistsError(RaceTrackRelationship.hasLayout, raceTrackId, trackLayoutId)
        }

        await deleteDeprecatedRel(trackLayoutId, RelationshipType.RaceTrackHasLayout, NodeTypeLabel.RaceTrack)

        const createdRelationship = await createRel(raceTrackId, trackLayoutId, RelationshipType.RaceTrackHasLayout)
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

        return getAllRels(raceTrackId, RelationshipType.RaceTrackHasLayout)
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

        const relationship = await getSpecificRel(raceTrackId, trackLayoutId, RelationshipType.RaceTrackHasLayout)
        if (!relationship) {
            throw new RelationshipNotFoundError(RaceTrackRelationship.hasLayout, raceTrackId, trackLayoutId)
        }

        await deleteSpecificRel(raceTrackId, trackLayoutId, RelationshipType.RaceTrackHasLayout)
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

        const existingRelation = await getSpecificRel(raceTrackId, racingEventId, RelationshipType.RaceTrackHostedRacingEvent)
        if (existingRelation) {
            throw new RelationshipAlreadyExistsError(RaceTrackRelationship.hostedRacingEvent, raceTrackId, racingEventId)
        }

        await deleteDeprecatedRel(racingEventId, RelationshipType.RaceTrackHostedRacingEvent, NodeTypeLabel.RaceTrack)

        const createdRelationship = await createRel(raceTrackId, racingEventId, RelationshipType.RaceTrackHostedRacingEvent)
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

        return getAllRels(raceTrackId, RelationshipType.RaceTrackHostedRacingEvent)
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

        const relationship = await getSpecificRel(raceTrackId, racingEventId, RelationshipType.RaceTrackHostedRacingEvent)
        if (!relationship) {
            throw new RelationshipNotFoundError(RaceTrackRelationship.hostedRacingEvent, raceTrackId, racingEventId)
        }

        await deleteSpecificRel(raceTrackId, racingEventId, RelationshipType.RaceTrackHostedRacingEvent)
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

        const existingRelation = await getSpecificRel(raceTrackId, imageId, RelationshipType.RaceTrackHasImage)
        if (existingRelation) {
            throw new RelationshipAlreadyExistsError(RaceTrackRelationship.hasImage, raceTrackId, imageId)
        }

        const createdRelationship = await createRel(raceTrackId, imageId, RelationshipType.RaceTrackHasImage)
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

        return getAllRels(raceTrackId, RelationshipType.RaceTrackHasImage)
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

        const relationship = await getSpecificRel(raceTrackId, imageId, RelationshipType.RaceTrackHasImage)
        if (!relationship) {
            throw new RelationshipNotFoundError(RaceTrackRelationship.hasImage, raceTrackId, imageId)
        }

        await deleteSpecificRel(raceTrackId, imageId, RelationshipType.RaceTrackHasImage)
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

        const existingRelation = await getSpecificRel(raceTrackId, imageId, RelationshipType.RaceTrackHasPrimeImage)
        if (existingRelation) {
            throw new RelationshipAlreadyExistsError(RaceTrackRelationship.hasPrimeImage, raceTrackId, imageId)
        }

        await deleteDeprecatedRel(raceTrackId, RelationshipType.RaceTrackHasPrimeImage, NodeTypeLabel.Image)

        const createdRelationship = await createRel(raceTrackId, imageId, RelationshipType.RaceTrackHasPrimeImage)
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

        const relationship = await getRel(raceTrackId, RelationshipType.RaceTrackHasPrimeImage)
        if (!relationship) {
            throw new RelationshipNotFoundError(RaceTrackRelationship.hasPrimeImage, raceTrackId, null)
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

        const relationship = await getSpecificRel(raceTrackId, imageId, RelationshipType.RaceTrackHasPrimeImage)
        if (!relationship) {
            throw new RelationshipNotFoundError(RaceTrackRelationship.hasPrimeImage, raceTrackId, imageId)
        }

        await deleteSpecificRel(raceTrackId, imageId, RelationshipType.RaceTrackHasPrimeImage)
    },
}
