import {CreateTrackLayoutInput} from "./types/CreateTrackLayoutInput"
import {TrackLayoutNode} from "./types/TrackLayoutNode"
import {convertInputData} from "./create/convertInputData"
import {createNode} from "../../../db/nodes/track-layouts/createNode"
import {convertTrackLayoutDbNodeToModelNode} from "./create/convertTrackLayoutDbNodeToModelNode"
import {getNodeById} from "../../../db/nodes/track-layouts/getNodeById"
import {getAllNodesOfType} from "../../../db/nodes/track-layouts/getAllNodesOfType"
import type {NodeCollectionConstraints} from "../../types/NodeCollectionConstraints"
import {deleteNode} from "../../../db/nodes/deleteNode"
import {NodeNotFoundError} from "../../types/NodeNotFoundError"
import {createRel} from "../../relationships/createRel"
import {RaceTrack} from "../race-tracks/RaceTrack"
import {getSpecificRel} from "../../relationships/getSpecificRel"
import {RelAlreadyExistsError} from "../../types/RelAlreadyExistsError"
import {RelType} from "../../relationships/types/RelType"
import {getRel} from "../../relationships/getRel"
import {RelNotFoundError} from "../../types/RelNotFoundError"
import {deleteSpecificRel} from "../../relationships/deleteSpecificRel"
import {Image} from "../images/Image"
import {getAllRels} from "../../relationships/getAllRels"
import {RacingEvent} from "../racing-events/RacingEvent"
import {LapTime} from "../lap-times/LapTime"
import {DbNodeType} from "../../../db/types/DbNodeType"
import {RacingGame} from "../racing-games/RacingGame"
import {deleteOutgoingRel} from "../../relationships/deleteOutgoingRel"
import {deleteIncomingRel} from "../../relationships/deleteIncomingRel"

export const TrackLayout = {
    async create(data: CreateTrackLayoutInput): Promise<TrackLayoutNode> {
        const input = convertInputData(data)
        const result = await createNode(input)
        const output = convertTrackLayoutDbNodeToModelNode(result)

        return output
    },

    async findById(id: number): Promise<false | TrackLayoutNode> {
        const node = await getNodeById(id)

        if (!node) {
            return false
        }

        return convertTrackLayoutDbNodeToModelNode(node)
    },

    async findAll(options: NodeCollectionConstraints = {}): Promise<TrackLayoutNode[]> {
        const nodes: TrackLayoutNode[] = []
        const nodesDb = await getAllNodesOfType(options)

        nodesDb.forEach(node => {
            nodes.push(convertTrackLayoutDbNodeToModelNode(node))
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

        const existingRelation = await getSpecificRel(trackLayoutId, raceTrackId, RelType.TrackLayoutBelongsToRaceTrack)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.TrackLayoutBelongsToRaceTrack, trackLayoutId, raceTrackId)
        }

        await deleteOutgoingRel(trackLayoutId, RelType.TrackLayoutBelongsToRaceTrack, DbNodeType.RaceTrack)

        const createdRelationship = await createRel(trackLayoutId, raceTrackId, RelType.TrackLayoutBelongsToRaceTrack)
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

        const relationship = await getRel(trackLayoutId, RelType.TrackLayoutBelongsToRaceTrack)
        if (!relationship) {
            throw new RelNotFoundError(RelType.TrackLayoutBelongsToRaceTrack, trackLayoutId, null)
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

        const relationship = await getSpecificRel(trackLayoutId, raceTrackId, RelType.TrackLayoutBelongsToRaceTrack)
        if (!relationship) {
            throw new RelNotFoundError(RelType.TrackLayoutBelongsToRaceTrack, trackLayoutId, raceTrackId)
        }

        await deleteSpecificRel(trackLayoutId, raceTrackId, RelType.TrackLayoutBelongsToRaceTrack)
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

        const existingRelation = await getSpecificRel(trackLayoutId, racingEventId, RelType.TrackLayoutWasUsedByRacingEvent)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.TrackLayoutWasUsedByRacingEvent, trackLayoutId, racingEventId)
        }

        await deleteIncomingRel(racingEventId, RelType.TrackLayoutWasUsedByRacingEvent, DbNodeType.TrackLayout)

        const createdRelationship = await createRel(trackLayoutId, racingEventId, RelType.TrackLayoutWasUsedByRacingEvent)
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

        return getAllRels(trackLayoutId, RelType.TrackLayoutWasUsedByRacingEvent)
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

        const relationship = await getSpecificRel(trackLayoutId, racingEventId, RelType.TrackLayoutWasUsedByRacingEvent)
        if (!relationship) {
            throw new RelNotFoundError(RelType.TrackLayoutWasUsedByRacingEvent, trackLayoutId, racingEventId)
        }

        await deleteSpecificRel(trackLayoutId, racingEventId, RelType.TrackLayoutWasUsedByRacingEvent)
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

        const existingRelation = await getSpecificRel(trackLayoutId, lapTimeId, RelType.TrackLayoutHasLapTime)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.TrackLayoutHasLapTime, trackLayoutId, lapTimeId)
        }

        await deleteIncomingRel(lapTimeId, RelType.TrackLayoutHasLapTime, DbNodeType.TrackLayout)

        const createdRelationship = await createRel(trackLayoutId, lapTimeId, RelType.TrackLayoutHasLapTime)
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

        return getAllRels(trackLayoutId, RelType.TrackLayoutHasLapTime)
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

        const relationship = await getSpecificRel(trackLayoutId, lapTimeId, RelType.TrackLayoutHasLapTime)
        if (!relationship) {
            throw new RelNotFoundError(RelType.TrackLayoutHasLapTime, trackLayoutId, lapTimeId)
        }

        await deleteSpecificRel(trackLayoutId, lapTimeId, RelType.TrackLayoutHasLapTime)
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

        const existingRelation = await getSpecificRel(trackLayoutId, imageId, RelType.TrackLayoutHasImage)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.TrackLayoutHasImage, trackLayoutId, imageId)
        }

        const createdRelationship = await createRel(trackLayoutId, imageId, RelType.TrackLayoutHasImage)
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

        return getAllRels(trackLayoutId, RelType.TrackLayoutHasImage)
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

        const relationship = await getSpecificRel(trackLayoutId, imageId, RelType.TrackLayoutHasImage)
        if (!relationship) {
            throw new RelNotFoundError(RelType.TrackLayoutHasImage, trackLayoutId, imageId)
        }

        await deleteSpecificRel(trackLayoutId, imageId, RelType.TrackLayoutHasImage)
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

        const existingRelation = await getSpecificRel(trackLayoutId, imageId, RelType.TrackLayoutHasPrimeImage)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.TrackLayoutHasPrimeImage, trackLayoutId, imageId)
        }

        await deleteOutgoingRel(trackLayoutId, RelType.TrackLayoutHasPrimeImage, DbNodeType.Image)

        const createdRelationship = await createRel(trackLayoutId, imageId, RelType.TrackLayoutHasPrimeImage)
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

        const relationship = await getRel(trackLayoutId, RelType.TrackLayoutHasPrimeImage)
        if (!relationship) {
            throw new RelNotFoundError(RelType.TrackLayoutHasPrimeImage, trackLayoutId, null)
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

        const relationship = await getSpecificRel(trackLayoutId, imageId, RelType.TrackLayoutHasPrimeImage)
        if (!relationship) {
            throw new RelNotFoundError(RelType.TrackLayoutHasPrimeImage, trackLayoutId, imageId)
        }

        await deleteSpecificRel(trackLayoutId, imageId, RelType.TrackLayoutHasPrimeImage)
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

        const existingRelation = await getSpecificRel(trackLayoutId, racingGameId, RelType.TrackLayoutIsFeaturedInRacingGame)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.TrackLayoutIsFeaturedInRacingGame, trackLayoutId, racingGameId)
        }


        const createdRelationship = await createRel(trackLayoutId, racingGameId, RelType.TrackLayoutIsFeaturedInRacingGame)
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

        return getAllRels(trackLayoutId, RelType.TrackLayoutIsFeaturedInRacingGame)
    },

    async deleteIsFeaturedInRacingGameRelationship(trackLayoutId: number, racingGameId: number) {
        const trackLayout = await TrackLayout.findById(trackLayoutId)
        if (!trackLayout) {
            throw new NodeNotFoundError(trackLayoutId)
        }

        const racingGame = await RacingGame.findById(racingGameId)
        if (!racingGame) {
            throw new NodeNotFoundError(racingGameId)
        }

        const relationship = await getSpecificRel(trackLayoutId, racingGameId, RelType.TrackLayoutIsFeaturedInRacingGame)
        if (!relationship) {
            throw new RelNotFoundError(RelType.TrackLayoutIsFeaturedInRacingGame, trackLayoutId, racingGameId)
        }

        await deleteSpecificRel(trackLayoutId, racingGameId, RelType.TrackLayoutIsFeaturedInRacingGame)
    },
}
