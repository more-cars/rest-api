import {CreateTrackLayoutInput} from "./types/CreateTrackLayoutInput"
import {TrackLayoutNode} from "./types/TrackLayoutNode"
import {convertInputData} from "./create/convertInputData"
import {createNode} from "../../db/nodes/track-layouts/createNode"
import {convertOutputData} from "./create/convertOutputData"
import {getNodeById} from "../../db/nodes/track-layouts/getNodeById"
import {getAllNodesOfType} from "../../db/nodes/track-layouts/getAllNodesOfType"
import type {NodeCollectionConstraints} from "../types/NodeCollectionConstraints"
import {deleteNode} from "../../db/nodes/deleteNode"
import {NodeNotFoundError} from "../types/NodeNotFoundError"
import {createRel} from "../relationships/createRel"
import {DbRelationship} from "../../db/types/DbRelationship"
import {deleteDeprecatedRel} from "../relationships/deleteDeprecatedRel"
import {RaceTrack} from "../race-tracks/RaceTrack"
import {getSpecificRel} from "../relationships/getSpecificRel"
import {RelationshipAlreadyExistsError} from "../types/RelationshipAlreadyExistsError"
import {RelationshipType} from "../relationships/types/RelationshipType"
import {TrackLayoutRelationship} from "./types/TrackLayoutRelationship"
import {getRel} from "../relationships/getRel"
import {RelationshipNotFoundError} from "../types/RelationshipNotFoundError"
import {deleteSpecificRel} from "../relationships/deleteSpecificRel"
import {Image} from "../images/Image"
import {getAllRels} from "../relationships/getAllRels"
import {RacingEvent} from "../racing-events/RacingEvent"
import {LapTime} from "../lap-times/LapTime"
import {NodeTypeLabel} from "../../db/NodeTypeLabel"
import {RacingGame} from "../racing-games/RacingGame"

export const TrackLayout = {
    async create(data: CreateTrackLayoutInput): Promise<TrackLayoutNode> {
        const input = convertInputData(data)
        const result = await createNode(input)
        const output = convertOutputData(result)

        return output
    },

    async findById(id: number): Promise<false | TrackLayoutNode> {
        const node = await getNodeById(id)

        if (!node) {
            return false
        }

        return convertOutputData(node)
    },

    async findAll(options: NodeCollectionConstraints = {}): Promise<TrackLayoutNode[]> {
        const nodes: TrackLayoutNode[] = []
        const nodesDb = await getAllNodesOfType(options)

        nodesDb.forEach(node => {
            nodes.push(convertOutputData(node))
        })

        return nodes
    },

    async delete(trackLayoutId: number): Promise<void> {
        const node = await TrackLayout.findById(trackLayoutId)
        if (!node) {
            throw new NodeNotFoundError(trackLayoutId)
        }

        await deleteNode(trackLayoutId)
    },

    async createBelongsToRaceTrackRelationship(trackLayoutId: number, raceTrackId: number) {

        const trackLayout = await TrackLayout.findById(trackLayoutId)
        if (!trackLayout) {
            throw new NodeNotFoundError(trackLayoutId)
        }

        const raceTrack = await RaceTrack.findById(raceTrackId)
        if (!raceTrack) {
            throw new NodeNotFoundError(raceTrackId)
        }

        const existingRelation = await getSpecificRel(trackLayoutId, raceTrackId, RelationshipType.TrackLayoutBelongsToRaceTrack)
        if (existingRelation) {
            throw new RelationshipAlreadyExistsError(TrackLayoutRelationship.belongsToRaceTrack, trackLayoutId, raceTrackId)
        }

        await deleteDeprecatedRel(trackLayoutId, DbRelationship.TrackLayoutBelongsToRaceTrack, NodeTypeLabel.RaceTrack)

        const createdRelationship = await createRel(trackLayoutId, raceTrackId, RelationshipType.TrackLayoutBelongsToRaceTrack)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getBelongsToRaceTrackRelationship(trackLayoutId: number) {
        const trackLayout = await TrackLayout.findById(trackLayoutId)
        if (!trackLayout) {
            throw new NodeNotFoundError(trackLayoutId)
        }

        const relationship = await getRel(trackLayoutId, RelationshipType.TrackLayoutBelongsToRaceTrack, NodeTypeLabel.RaceTrack)
        if (!relationship) {
            throw new RelationshipNotFoundError(TrackLayoutRelationship.belongsToRaceTrack, trackLayoutId, null)
        }

        return relationship
    },

    async deleteBelongsToRaceTrackRelationship(trackLayoutId: number, raceTrackId: number) {
        const trackLayout = await TrackLayout.findById(trackLayoutId)
        if (!trackLayout) {
            throw new NodeNotFoundError(trackLayoutId)
        }

        const raceTrack = await RaceTrack.findById(raceTrackId)
        if (!raceTrack) {
            throw new NodeNotFoundError(raceTrackId)
        }

        const relationship = await getSpecificRel(trackLayoutId, raceTrackId, RelationshipType.TrackLayoutBelongsToRaceTrack)
        if (!relationship) {
            throw new RelationshipNotFoundError(TrackLayoutRelationship.belongsToRaceTrack, trackLayoutId, raceTrackId)
        }

        await deleteSpecificRel(trackLayoutId, raceTrackId, RelationshipType.TrackLayoutBelongsToRaceTrack)
    },

    async createWasUsedByRacingEventRelationship(trackLayoutId: number, racingEventId: number) {

        const trackLayout = await TrackLayout.findById(trackLayoutId)
        if (!trackLayout) {
            throw new NodeNotFoundError(trackLayoutId)
        }

        const racingEvent = await RacingEvent.findById(racingEventId)
        if (!racingEvent) {
            throw new NodeNotFoundError(racingEventId)
        }

        const existingRelation = await getSpecificRel(trackLayoutId, racingEventId, RelationshipType.TrackLayoutWasUsedByRacingEvent)
        if (existingRelation) {
            throw new RelationshipAlreadyExistsError(TrackLayoutRelationship.wasUsedByRacingEvent, trackLayoutId, racingEventId)
        }

        await deleteDeprecatedRel(racingEventId, DbRelationship.TrackLayoutWasUsedByRacingEvent, NodeTypeLabel.TrackLayout)

        const createdRelationship = await createRel(trackLayoutId, racingEventId, RelationshipType.TrackLayoutWasUsedByRacingEvent)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getAllWasUsedByRacingEventRelationships(trackLayoutId: number) {
        const trackLayout = await TrackLayout.findById(trackLayoutId)
        if (!trackLayout) {
            throw new NodeNotFoundError(trackLayoutId)
        }

        return getAllRels(trackLayoutId, RelationshipType.TrackLayoutWasUsedByRacingEvent)
    },

    async deleteWasUsedByRacingEventRelationship(trackLayoutId: number, racingEventId: number) {
        const trackLayout = await TrackLayout.findById(trackLayoutId)
        if (!trackLayout) {
            throw new NodeNotFoundError(trackLayoutId)
        }

        const racingEvent = await RacingEvent.findById(racingEventId)
        if (!racingEvent) {
            throw new NodeNotFoundError(racingEventId)
        }

        const relationship = await getSpecificRel(trackLayoutId, racingEventId, RelationshipType.TrackLayoutWasUsedByRacingEvent)
        if (!relationship) {
            throw new RelationshipNotFoundError(TrackLayoutRelationship.wasUsedByRacingEvent, trackLayoutId, racingEventId)
        }

        await deleteSpecificRel(trackLayoutId, racingEventId, RelationshipType.TrackLayoutWasUsedByRacingEvent)
    },

    async createHasLapTimeRelationship(trackLayoutId: number, lapTimeId: number) {

        const trackLayout = await TrackLayout.findById(trackLayoutId)
        if (!trackLayout) {
            throw new NodeNotFoundError(trackLayoutId)
        }

        const lapTime = await LapTime.findById(lapTimeId)
        if (!lapTime) {
            throw new NodeNotFoundError(lapTimeId)
        }

        const existingRelation = await getSpecificRel(trackLayoutId, lapTimeId, RelationshipType.TrackLayoutHasLapTime)
        if (existingRelation) {
            throw new RelationshipAlreadyExistsError(TrackLayoutRelationship.hasLapTime, trackLayoutId, lapTimeId)
        }

        await deleteDeprecatedRel(lapTimeId, DbRelationship.TrackLayoutHasLapTime, NodeTypeLabel.TrackLayout)

        const createdRelationship = await createRel(trackLayoutId, lapTimeId, RelationshipType.TrackLayoutHasLapTime)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getAllHasLapTimeRelationships(trackLayoutId: number) {
        const trackLayout = await TrackLayout.findById(trackLayoutId)
        if (!trackLayout) {
            throw new NodeNotFoundError(trackLayoutId)
        }

        return getAllRels(trackLayoutId, RelationshipType.TrackLayoutHasLapTime)
    },

    async deleteHasLapTimeRelationship(trackLayoutId: number, lapTimeId: number) {
        const trackLayout = await TrackLayout.findById(trackLayoutId)
        if (!trackLayout) {
            throw new NodeNotFoundError(trackLayoutId)
        }

        const lapTime = await LapTime.findById(lapTimeId)
        if (!lapTime) {
            throw new NodeNotFoundError(lapTimeId)
        }

        const relationship = await getSpecificRel(trackLayoutId, lapTimeId, RelationshipType.TrackLayoutHasLapTime)
        if (!relationship) {
            throw new RelationshipNotFoundError(TrackLayoutRelationship.hasLapTime, trackLayoutId, lapTimeId)
        }

        await deleteSpecificRel(trackLayoutId, lapTimeId, RelationshipType.TrackLayoutHasLapTime)
    },

    async createHasImageRelationship(trackLayoutId: number, imageId: number) {

        const trackLayout = await TrackLayout.findById(trackLayoutId)
        if (!trackLayout) {
            throw new NodeNotFoundError(trackLayoutId)
        }

        const image = await Image.findById(imageId)
        if (!image) {
            throw new NodeNotFoundError(imageId)
        }

        const existingRelation = await getSpecificRel(trackLayoutId, imageId, RelationshipType.TrackLayoutHasImage)
        if (existingRelation) {
            throw new RelationshipAlreadyExistsError(TrackLayoutRelationship.hasImage, trackLayoutId, imageId)
        }

        const createdRelationship = await createRel(trackLayoutId, imageId, RelationshipType.TrackLayoutHasImage)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getAllHasImageRelationships(trackLayoutId: number) {
        const trackLayout = await TrackLayout.findById(trackLayoutId)
        if (!trackLayout) {
            throw new NodeNotFoundError(trackLayoutId)
        }

        return getAllRels(trackLayoutId, RelationshipType.TrackLayoutHasImage)
    },

    async deleteHasImageRelationship(trackLayoutId: number, imageId: number) {
        const trackLayout = await TrackLayout.findById(trackLayoutId)
        if (!trackLayout) {
            throw new NodeNotFoundError(trackLayoutId)
        }

        const image = await Image.findById(imageId)
        if (!image) {
            throw new NodeNotFoundError(imageId)
        }

        const relationship = await getSpecificRel(trackLayoutId, imageId, RelationshipType.TrackLayoutHasImage)
        if (!relationship) {
            throw new RelationshipNotFoundError(TrackLayoutRelationship.hasImage, trackLayoutId, imageId)
        }

        await deleteSpecificRel(trackLayoutId, imageId, RelationshipType.TrackLayoutHasImage)
    },

    async createHasPrimeImageRelationship(trackLayoutId: number, imageId: number) {

        const trackLayout = await TrackLayout.findById(trackLayoutId)
        if (!trackLayout) {
            throw new NodeNotFoundError(trackLayoutId)
        }

        const image = await Image.findById(imageId)
        if (!image) {
            throw new NodeNotFoundError(imageId)
        }

        const existingRelation = await getSpecificRel(trackLayoutId, imageId, RelationshipType.TrackLayoutHasPrimeImage)
        if (existingRelation) {
            throw new RelationshipAlreadyExistsError(TrackLayoutRelationship.hasPrimeImage, trackLayoutId, imageId)
        }

        await deleteDeprecatedRel(trackLayoutId, DbRelationship.TrackLayoutHasPrimeImage, NodeTypeLabel.Image)

        const createdRelationship = await createRel(trackLayoutId, imageId, RelationshipType.TrackLayoutHasPrimeImage)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getHasPrimeImageRelationship(trackLayoutId: number) {
        const trackLayout = await TrackLayout.findById(trackLayoutId)
        if (!trackLayout) {
            throw new NodeNotFoundError(trackLayoutId)
        }

        const relationship = await getRel(trackLayoutId, RelationshipType.TrackLayoutHasPrimeImage, NodeTypeLabel.Image)
        if (!relationship) {
            throw new RelationshipNotFoundError(TrackLayoutRelationship.hasPrimeImage, trackLayoutId, null)
        }

        return relationship
    },

    async deleteHasPrimeImageRelationship(trackLayoutId: number, imageId: number) {
        const trackLayout = await TrackLayout.findById(trackLayoutId)
        if (!trackLayout) {
            throw new NodeNotFoundError(trackLayoutId)
        }

        const image = await Image.findById(imageId)
        if (!image) {
            throw new NodeNotFoundError(imageId)
        }

        const relationship = await getSpecificRel(trackLayoutId, imageId, RelationshipType.TrackLayoutHasPrimeImage)
        if (!relationship) {
            throw new RelationshipNotFoundError(TrackLayoutRelationship.hasPrimeImage, trackLayoutId, imageId)
        }

        await deleteSpecificRel(trackLayoutId, imageId, RelationshipType.TrackLayoutHasPrimeImage)
    },

    async createIsFeaturedInRacingGameRelationship(trackLayoutId: number, racingGameId: number) {
        const trackLayout = await TrackLayout.findById(trackLayoutId)
        if (!trackLayout) {
            throw new NodeNotFoundError(trackLayoutId)
        }

        const racingGame = await RacingGame.findById(racingGameId)
        if (!racingGame) {
            throw new NodeNotFoundError(racingGameId)
        }

        const existingRelation = await getSpecificRel(trackLayoutId, racingGameId, RelationshipType.TrackLayoutIsFeaturedInRacingGame)
        if (existingRelation) {
            throw new RelationshipAlreadyExistsError(TrackLayoutRelationship.isFeaturedInRacingGame, trackLayoutId, racingGameId)
        }


        const createdRelationship = await createRel(trackLayoutId, racingGameId, RelationshipType.TrackLayoutIsFeaturedInRacingGame)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getAllIsFeaturedInRacingGameRelationships(trackLayoutId: number) {
        const trackLayout = await TrackLayout.findById(trackLayoutId)
        if (!trackLayout) {
            throw new NodeNotFoundError(trackLayoutId)
        }

        return getAllRels(trackLayoutId, RelationshipType.TrackLayoutIsFeaturedInRacingGame)
    },
}
