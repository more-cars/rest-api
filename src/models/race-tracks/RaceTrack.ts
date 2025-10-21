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
import {DbRelationship} from "../../db/types/DbRelationship"
import {deleteDeprecatedRelationship} from "../relationships/deleteDeprecatedRelationship"
import {TrackLayout} from "../track-layouts/TrackLayout"
import {getSpecificRel} from "../relationships/getSpecificRel"
import {RelationshipAlreadyExistsError} from "../types/RelationshipAlreadyExistsError"
import {RelationshipType} from "../relationships/types/RelationshipType"
import {RaceTrackRelationship} from "./types/RaceTrackRelationship"

export class RaceTrack {
    static async create(data: CreateRaceTrackInput): Promise<RaceTrackNode> {
        const input = convertInputData(data)
        const result = await createNode(input)
        const output = convertOutputData(result)

        return output
    }

    static async findById(id: number): Promise<false | RaceTrackNode> {
        const node = await getNodeById(id)

        if (!node) {
            return false
        }

        return convertOutputData(node)
    }

    static async findAll(options: NodeCollectionConstraints = {}): Promise<RaceTrackNode[]> {
        const nodes: Array<RaceTrackNode> = []
        const nodesDb = await getAllNodesOfType(options)

        nodesDb.forEach(node => {
            nodes.push(convertOutputData(node))
        })

        return nodes
    }

    static async delete(raceTrackId: number): Promise<void> {
        const node = await RaceTrack.findById(raceTrackId)
        if (!node) {
            throw new NodeNotFoundError(raceTrackId)
        }

        await deleteNode(raceTrackId)
    }

    static async createHasLayoutRelationship(raceTrackId: number, trackLayoutId: number) {

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

        await deleteDeprecatedRelationship(trackLayoutId, DbRelationship.RaceTrackHasLayout)

        const createdRelationship = await createRel(raceTrackId, trackLayoutId, RelationshipType.RaceTrackHasLayout)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    }
}
