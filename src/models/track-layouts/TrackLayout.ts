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
import {deleteDeprecatedRelationship} from "../relationships/deleteDeprecatedRelationship"
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

export class TrackLayout {
    static async create(data: CreateTrackLayoutInput): Promise<TrackLayoutNode> {
        const input = convertInputData(data)
        const result = await createNode(input)
        const output = convertOutputData(result)

        return output
    }

    static async findById(id: number): Promise<false | TrackLayoutNode> {
        const node = await getNodeById(id)

        if (!node) {
            return false
        }

        return convertOutputData(node)
    }

    static async findAll(options: NodeCollectionConstraints = {}): Promise<TrackLayoutNode[]> {
        const nodes: Array<TrackLayoutNode> = []
        const nodesDb = await getAllNodesOfType(options)

        nodesDb.forEach(node => {
            nodes.push(convertOutputData(node))
        })

        return nodes
    }

    static async delete(trackLayoutId: number): Promise<void> {
        const node = await TrackLayout.findById(trackLayoutId)
        if (!node) {
            throw new NodeNotFoundError(trackLayoutId)
        }

        await deleteNode(trackLayoutId)
    }

    static async createBelongsToRaceTrackRelationship(trackLayoutId: number, raceTrackId: number) {

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

        await deleteDeprecatedRelationship(trackLayoutId, DbRelationship.TrackLayoutBelongsToRaceTrack)

        const createdRelationship = await createRel(trackLayoutId, raceTrackId, RelationshipType.TrackLayoutBelongsToRaceTrack)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    }

    static async getBelongsToRaceTrackRelationship(trackLayoutId: number) {
        const trackLayout = await TrackLayout.findById(trackLayoutId)
        if (!trackLayout) {
            throw new NodeNotFoundError(trackLayoutId)
        }

        const relationship = await getRel(trackLayoutId, RelationshipType.TrackLayoutBelongsToRaceTrack)
        if (!relationship) {
            throw new RelationshipNotFoundError(TrackLayoutRelationship.belongsToRaceTrack, trackLayoutId, null)
        }

        return relationship
    }

    static async deleteBelongsToRaceTrackRelationship(trackLayoutId: number, raceTrackId: number) {
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
    }

    static async createHasImageRelationship(trackLayoutId: number, imageId: number) {

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
    }

    static async getAllHasImageRelationships(trackLayoutId: number) {
        const trackLayout = await TrackLayout.findById(trackLayoutId)
        if (!trackLayout) {
            throw new NodeNotFoundError(trackLayoutId)
        }

        return getAllRels(trackLayoutId, RelationshipType.TrackLayoutHasImage)
    }
}
