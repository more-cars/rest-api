import {CreateRaceTrackInput} from "./types/CreateRaceTrackInput"
import {RaceTrackNode} from "./types/RaceTrackNode"
import {convertInputData} from "./create/convertInputData"
import {createNode} from "../../db/nodes/race-tracks/createNode"
import {convertOutputData} from "./create/convertOutputData"
import {getNodeById} from "../../db/nodes/race-tracks/getNodeById"
import {getAllNodesOfType} from "../../db/nodes/race-tracks/getAllNodesOfType"
import type {NodeCollectionConstraints} from "../types/NodeCollectionConstraints"

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
}
