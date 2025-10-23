import {CreateRacingSeriesInput} from "./types/CreateRacingSeriesInput"
import {RacingSeriesNode} from "./types/RacingSeriesNode"
import {convertInputData} from "./create/convertInputData"
import {createNode} from "../../db/nodes/racing-series/createNode"
import {convertOutputData} from "./create/convertOutputData"
import {getNodeById} from "../../db/nodes/racing-series/getNodeById"
import {getAllNodesOfType} from "../../db/nodes/racing-series/getAllNodesOfType"
import type {NodeCollectionConstraints} from "../types/NodeCollectionConstraints"

export class RacingSeries {
    static async create(data: CreateRacingSeriesInput): Promise<RacingSeriesNode> {
        const input = convertInputData(data)
        const result = await createNode(input)
        const output = convertOutputData(result)

        return output
    }

    static async findById(id: number): Promise<false | RacingSeriesNode> {
        const node = await getNodeById(id)

        if (!node) {
            return false
        }

        return convertOutputData(node)
    }

    static async findAll(options: NodeCollectionConstraints = {}): Promise<RacingSeriesNode[]> {
        const nodes: Array<RacingSeriesNode> = []
        const nodesDb = await getAllNodesOfType(options)

        nodesDb.forEach(node => {
            nodes.push(convertOutputData(node))
        })

        return nodes
    }
}
