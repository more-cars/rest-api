import {CreateMagazineIssueInput} from "./types/CreateMagazineIssueInput"
import {MagazineIssueNode} from "./types/MagazineIssueNode"
import {convertInputData} from "./create/convertInputData"
import {createNode} from "../../../db/node-types/magazine-issues/createNode"
import {convertDbNodeToModelNode} from "../convertDbNodeToModelNode"
import {getNodeById} from "../../../db/node-types/magazine-issues/getNodeById"
import {NodeNotFoundError} from "../../types/NodeNotFoundError"
import {getAllNodesOfType} from "../../../db/node-types/magazine-issues/getAllNodesOfType"
import type {NodeCollectionConstraints} from "../../types/NodeCollectionConstraints"
import {deleteNode} from "../../../db/nodes/deleteNode"

export const MagazineIssue = {
    async create(data: CreateMagazineIssueInput): Promise<MagazineIssueNode> {
        const input = convertInputData(data)
        const result = await createNode(input)

        return convertDbNodeToModelNode(result) as MagazineIssueNode
    },

    async findById(id: number): Promise<MagazineIssueNode> {
        const node = await getNodeById(id)

        if (!node) {
            throw new NodeNotFoundError(id)
        }

        return convertDbNodeToModelNode(node) as MagazineIssueNode
    },

    async findAll(options: NodeCollectionConstraints = {}): Promise<MagazineIssueNode[]> {
        const nodes: MagazineIssueNode[] = []
        const nodesDb = await getAllNodesOfType(options)

        nodesDb.forEach(node => {
            nodes.push(convertDbNodeToModelNode(node) as MagazineIssueNode)
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
}
