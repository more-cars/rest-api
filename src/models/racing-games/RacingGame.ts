import {CreateRacingGameInput} from "./types/CreateRacingGameInput"
import {RacingGameNode} from "./types/RacingGameNode"
import {convertInputData} from "./create/convertInputData"
import {createNode} from "../../db/nodes/racing-games/createNode"
import {convertOutputData} from "./create/convertOutputData"
import {getNodeById} from "../../db/nodes/racing-games/getNodeById"
import {getAllNodesOfType} from "../../db/nodes/racing-games/getAllNodesOfType"
import type {NodeCollectionConstraints} from "../types/NodeCollectionConstraints"

export const RacingGame = {
    async create(data: CreateRacingGameInput): Promise<RacingGameNode> {
        const input = convertInputData(data)
        const result = await createNode(input)
        const output = convertOutputData(result)

        return output
    },

    async findById(id: number): Promise<false | RacingGameNode> {
        const node = await getNodeById(id)

        if (!node) {
            return false
        }

        return convertOutputData(node)
    },

    async findAll(options: NodeCollectionConstraints = {}): Promise<RacingGameNode[]> {
        const nodes: RacingGameNode[] = []
        const nodesDb = await getAllNodesOfType(options)

        nodesDb.forEach(node => {
            nodes.push(convertOutputData(node))
        })

        return nodes
    },
}
