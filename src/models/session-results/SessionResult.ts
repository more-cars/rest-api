import {CreateSessionResultInput} from "./types/CreateSessionResultInput"
import {SessionResultNode} from "./types/SessionResultNode"
import {convertInputData} from "./create/convertInputData"
import {createNode} from "../../db/nodes/session-results/createNode"
import {convertOutputData} from "./create/convertOutputData"
import {getNodeById} from "../../db/nodes/session-results/getNodeById"
import {getAllNodesOfType} from "../../db/nodes/session-results/getAllNodesOfType"
import type {NodeCollectionConstraints} from "../types/NodeCollectionConstraints"
import {deleteNode} from "../../db/nodes/deleteNode"
import {NodeNotFoundError} from "../types/NodeNotFoundError"

export class SessionResult {
    static async create(data: CreateSessionResultInput): Promise<SessionResultNode> {
        const input = convertInputData(data)
        const result = await createNode(input)
        const output = convertOutputData(result)

        return output
    }

    static async findById(id: number): Promise<false | SessionResultNode> {
        const node = await getNodeById(id)

        if (!node) {
            return false
        }

        return convertOutputData(node)
    }

    static async findAll(options: NodeCollectionConstraints = {}): Promise<SessionResultNode[]> {
        const nodes: Array<SessionResultNode> = []
        const nodesDb = await getAllNodesOfType(options)

        nodesDb.forEach(node => {
            nodes.push(convertOutputData(node))
        })

        return nodes
    }

    static async delete(sessionResultId: number): Promise<void> {
        const node = await SessionResult.findById(sessionResultId)
        if (!node) {
            throw new NodeNotFoundError(sessionResultId)
        }

        await deleteNode(sessionResultId)
    }
}
