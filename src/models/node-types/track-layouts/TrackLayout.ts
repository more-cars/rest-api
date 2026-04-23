import {CreateTrackLayoutInput} from "./types/CreateTrackLayoutInput"
import {TrackLayoutNode} from "./types/TrackLayoutNode"
import {convertInputData} from "./create/convertInputData"
import {convertDbNodeToModelNode} from "../convertDbNodeToModelNode"
import {getNodeById} from "../../../db/node-types/track-layouts/getNodeById"
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
import {RacingGame} from "../racing-games/RacingGame"
import {deleteOutgoingRel} from "../../relationships/deleteOutgoingRel"
import {deleteIncomingRel} from "../../relationships/deleteIncomingRel"
import {Video} from "../videos/Video"
import {fetchNodesFromDb} from "../../../db/nodes/fetchNodesFromDb"
import {DbNodeType} from "../../../db/types/DbNodeType"
import {getDbQueryCollectionParams} from "../../../db/nodes/getDbQueryCollectionParams"
import {createNeo4jNode} from "../../../db/nodes/createNeo4jNode"

export const TrackLayout = {
    async create(data: CreateTrackLayoutInput): Promise<TrackLayoutNode> {
        const input = convertInputData(data)
        const result = await createNeo4jNode(DbNodeType.TrackLayout, input)

        return convertDbNodeToModelNode(result) as TrackLayoutNode
    },

    async findById(id: number): Promise<TrackLayoutNode> {
        const node = await getNodeById(id)

        if (!node) {
            throw new NodeNotFoundError(id)
        }

        return convertDbNodeToModelNode(node) as TrackLayoutNode
    },

    async findAll(options: NodeCollectionConstraints = {}): Promise<TrackLayoutNode[]> {
        const nodes: TrackLayoutNode[] = []
        const nodesDb = await fetchNodesFromDb(DbNodeType.TrackLayout, getDbQueryCollectionParams(options))

        nodesDb.forEach(node => {
            nodes.push(convertDbNodeToModelNode(node) as TrackLayoutNode)
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

    async createBelongsToRaceTrackRelationship(trackLayoutId: number, raceTrackId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await TrackLayout.findById(trackLayoutId)
        await RaceTrack.findById(raceTrackId)

        const existingRelation = await getSpecificRel(trackLayoutId, raceTrackId, RelType.TrackLayoutBelongsToRaceTrack)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.TrackLayoutBelongsToRaceTrack, trackLayoutId, raceTrackId)
        }

        await deleteOutgoingRel(trackLayoutId, RelType.TrackLayoutBelongsToRaceTrack)

        const createdRelationship = await createRel(trackLayoutId, raceTrackId, RelType.TrackLayoutBelongsToRaceTrack)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getBelongsToRaceTrackRelationship(trackLayoutId: number) {
        // checking that the node exists -> exception is thrown if not
        await TrackLayout.findById(trackLayoutId)

        const relationship = await getRel(trackLayoutId, RelType.TrackLayoutBelongsToRaceTrack)
        if (!relationship) {
            throw new RelNotFoundError(RelType.TrackLayoutBelongsToRaceTrack, trackLayoutId, null)
        }

        return relationship
    },

    async deleteBelongsToRaceTrackRelationship(trackLayoutId: number, raceTrackId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await TrackLayout.findById(trackLayoutId)
        await RaceTrack.findById(raceTrackId)

        const relationship = await getSpecificRel(trackLayoutId, raceTrackId, RelType.TrackLayoutBelongsToRaceTrack)
        if (!relationship) {
            throw new RelNotFoundError(RelType.TrackLayoutBelongsToRaceTrack, trackLayoutId, raceTrackId)
        }

        await deleteSpecificRel(trackLayoutId, raceTrackId, RelType.TrackLayoutBelongsToRaceTrack)
    },

    async createWasUsedByRacingEventRelationship(trackLayoutId: number, racingEventId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await TrackLayout.findById(trackLayoutId)
        await RacingEvent.findById(racingEventId)

        const existingRelation = await getSpecificRel(trackLayoutId, racingEventId, RelType.TrackLayoutWasUsedByRacingEvent)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.TrackLayoutWasUsedByRacingEvent, trackLayoutId, racingEventId)
        }

        await deleteIncomingRel(racingEventId, RelType.TrackLayoutWasUsedByRacingEvent)

        const createdRelationship = await createRel(trackLayoutId, racingEventId, RelType.TrackLayoutWasUsedByRacingEvent)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getAllWasUsedByRacingEventRelationships(trackLayoutId: number) {
        // checking that the node exists -> exception is thrown if not
        await TrackLayout.findById(trackLayoutId)

        return getAllRels(trackLayoutId, RelType.TrackLayoutWasUsedByRacingEvent)
    },

    async deleteWasUsedByRacingEventRelationship(trackLayoutId: number, racingEventId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await TrackLayout.findById(trackLayoutId)
        await RacingEvent.findById(racingEventId)

        const relationship = await getSpecificRel(trackLayoutId, racingEventId, RelType.TrackLayoutWasUsedByRacingEvent)
        if (!relationship) {
            throw new RelNotFoundError(RelType.TrackLayoutWasUsedByRacingEvent, trackLayoutId, racingEventId)
        }

        await deleteSpecificRel(trackLayoutId, racingEventId, RelType.TrackLayoutWasUsedByRacingEvent)
    },

    async createHasLapTimeRelationship(trackLayoutId: number, lapTimeId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await TrackLayout.findById(trackLayoutId)
        await LapTime.findById(lapTimeId)

        const existingRelation = await getSpecificRel(trackLayoutId, lapTimeId, RelType.TrackLayoutHasLapTime)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.TrackLayoutHasLapTime, trackLayoutId, lapTimeId)
        }

        await deleteIncomingRel(lapTimeId, RelType.TrackLayoutHasLapTime)

        const createdRelationship = await createRel(trackLayoutId, lapTimeId, RelType.TrackLayoutHasLapTime)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getAllHasLapTimeRelationships(trackLayoutId: number) {
        // checking that the node exists -> exception is thrown if not
        await TrackLayout.findById(trackLayoutId)

        return getAllRels(trackLayoutId, RelType.TrackLayoutHasLapTime)
    },

    async deleteHasLapTimeRelationship(trackLayoutId: number, lapTimeId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await TrackLayout.findById(trackLayoutId)
        await LapTime.findById(lapTimeId)

        const relationship = await getSpecificRel(trackLayoutId, lapTimeId, RelType.TrackLayoutHasLapTime)
        if (!relationship) {
            throw new RelNotFoundError(RelType.TrackLayoutHasLapTime, trackLayoutId, lapTimeId)
        }

        await deleteSpecificRel(trackLayoutId, lapTimeId, RelType.TrackLayoutHasLapTime)
    },

    async createHasImageRelationship(trackLayoutId: number, imageId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await TrackLayout.findById(trackLayoutId)
        await Image.findById(imageId)

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
        // checking that the node exists -> exception is thrown if not
        await TrackLayout.findById(trackLayoutId)

        return getAllRels(trackLayoutId, RelType.TrackLayoutHasImage)
    },

    async deleteHasImageRelationship(trackLayoutId: number, imageId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await TrackLayout.findById(trackLayoutId)
        await Image.findById(imageId)

        const relationship = await getSpecificRel(trackLayoutId, imageId, RelType.TrackLayoutHasImage)
        if (!relationship) {
            throw new RelNotFoundError(RelType.TrackLayoutHasImage, trackLayoutId, imageId)
        }

        await deleteSpecificRel(trackLayoutId, imageId, RelType.TrackLayoutHasImage)
    },

    async createHasPrimeImageRelationship(trackLayoutId: number, imageId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await TrackLayout.findById(trackLayoutId)
        await Image.findById(imageId)

        const existingRelation = await getSpecificRel(trackLayoutId, imageId, RelType.TrackLayoutHasPrimeImage)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.TrackLayoutHasPrimeImage, trackLayoutId, imageId)
        }

        await deleteOutgoingRel(trackLayoutId, RelType.TrackLayoutHasPrimeImage)

        const createdRelationship = await createRel(trackLayoutId, imageId, RelType.TrackLayoutHasPrimeImage)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getHasPrimeImageRelationship(trackLayoutId: number) {
        // checking that the node exists -> exception is thrown if not
        await TrackLayout.findById(trackLayoutId)

        const relationship = await getRel(trackLayoutId, RelType.TrackLayoutHasPrimeImage)
        if (!relationship) {
            throw new RelNotFoundError(RelType.TrackLayoutHasPrimeImage, trackLayoutId, null)
        }

        return relationship
    },

    async deleteHasPrimeImageRelationship(trackLayoutId: number, imageId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await TrackLayout.findById(trackLayoutId)
        await Image.findById(imageId)

        const relationship = await getSpecificRel(trackLayoutId, imageId, RelType.TrackLayoutHasPrimeImage)
        if (!relationship) {
            throw new RelNotFoundError(RelType.TrackLayoutHasPrimeImage, trackLayoutId, imageId)
        }

        await deleteSpecificRel(trackLayoutId, imageId, RelType.TrackLayoutHasPrimeImage)
    },

    async createIsFeaturedInRacingGameRelationship(trackLayoutId: number, racingGameId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await TrackLayout.findById(trackLayoutId)
        await RacingGame.findById(racingGameId)

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
        // checking that the node exists -> exception is thrown if not
        await TrackLayout.findById(trackLayoutId)

        return getAllRels(trackLayoutId, RelType.TrackLayoutIsFeaturedInRacingGame)
    },

    async deleteIsFeaturedInRacingGameRelationship(trackLayoutId: number, racingGameId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await TrackLayout.findById(trackLayoutId)
        await RacingGame.findById(racingGameId)

        const relationship = await getSpecificRel(trackLayoutId, racingGameId, RelType.TrackLayoutIsFeaturedInRacingGame)
        if (!relationship) {
            throw new RelNotFoundError(RelType.TrackLayoutIsFeaturedInRacingGame, trackLayoutId, racingGameId)
        }

        await deleteSpecificRel(trackLayoutId, racingGameId, RelType.TrackLayoutIsFeaturedInRacingGame)
    },

    async createHasVideoRelationship(trackLayoutId: number, videoId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await TrackLayout.findById(trackLayoutId)
        await Video.findById(videoId)

        const existingRelation = await getSpecificRel(trackLayoutId, videoId, RelType.TrackLayoutHasVideo)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.TrackLayoutHasVideo, trackLayoutId, videoId)
        }

        const createdRelationship = await createRel(trackLayoutId, videoId, RelType.TrackLayoutHasVideo)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getAllHasVideoRelationships(trackLayoutId: number) {
        // checking that the node exists -> exception is thrown if not
        await TrackLayout.findById(trackLayoutId)

        return getAllRels(trackLayoutId, RelType.TrackLayoutHasVideo)
    },

    async deleteHasVideoRelationship(trackLayoutId: number, videoId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await TrackLayout.findById(trackLayoutId)
        await Video.findById(videoId)

        const relationship = await getSpecificRel(trackLayoutId, videoId, RelType.TrackLayoutHasVideo)
        if (!relationship) {
            throw new RelNotFoundError(RelType.TrackLayoutHasVideo, trackLayoutId, videoId)
        }

        await deleteSpecificRel(trackLayoutId, videoId, RelType.TrackLayoutHasVideo)
    },

    async createHasMainVideoRelationship(trackLayoutId: number, videoId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await TrackLayout.findById(trackLayoutId)
        await Video.findById(videoId)

        const existingRelation = await getSpecificRel(trackLayoutId, videoId, RelType.TrackLayoutHasMainVideo)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.TrackLayoutHasMainVideo, trackLayoutId, videoId)
        }
        await deleteOutgoingRel(trackLayoutId, RelType.TrackLayoutHasMainVideo)

        const createdRelationship = await createRel(trackLayoutId, videoId, RelType.TrackLayoutHasMainVideo)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getHasMainVideoRelationship(trackLayoutId: number) {
        // checking that the node exists -> exception is thrown if not
        await TrackLayout.findById(trackLayoutId)

        const relationship = await getRel(trackLayoutId, RelType.TrackLayoutHasMainVideo)
        if (!relationship) {
            throw new RelNotFoundError(RelType.TrackLayoutHasMainVideo, trackLayoutId, null)
        }

        return relationship
    },

    async deleteHasMainVideoRelationship(trackLayoutId: number, videoId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await TrackLayout.findById(trackLayoutId)
        await Video.findById(videoId)

        const relationship = await getSpecificRel(trackLayoutId, videoId, RelType.TrackLayoutHasMainVideo)
        if (!relationship) {
            throw new RelNotFoundError(RelType.TrackLayoutHasMainVideo, trackLayoutId, videoId)
        }

        await deleteSpecificRel(trackLayoutId, videoId, RelType.TrackLayoutHasMainVideo)
    },
}
