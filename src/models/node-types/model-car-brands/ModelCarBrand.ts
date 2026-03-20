import {CreateModelCarBrandInput} from "./types/CreateModelCarBrandInput"
import {ModelCarBrandNode} from "./types/ModelCarBrandNode"
import {convertInputData} from "./create/convertInputData"
import {createNode} from "../../../db/node-types/model-car-brands/createNode"
import {convertDbNodeToModelNode} from "../convertDbNodeToModelNode"
import {getNodeById} from "../../../db/node-types/model-car-brands/getNodeById"
import {NodeNotFoundError} from "../../types/NodeNotFoundError"
import {getAllNodesOfType} from "../../../db/node-types/model-car-brands/getAllNodesOfType"
import type {NodeCollectionConstraints} from "../../types/NodeCollectionConstraints"

export const ModelCarBrand = {
    async create(data: CreateModelCarBrandInput): Promise<ModelCarBrandNode> {
        const input = convertInputData(data)
        const result = await createNode(input)

        return convertDbNodeToModelNode(result) as ModelCarBrandNode
    },

    async findById(id: number): Promise<ModelCarBrandNode> {
        const node = await getNodeById(id)

        if (!node) {
            throw new NodeNotFoundError(id)
        }

        return convertDbNodeToModelNode(node) as ModelCarBrandNode
    },

    async findAll(options: NodeCollectionConstraints = {}): Promise<ModelCarBrandNode[]> {
        const nodes: ModelCarBrandNode[] = []
        const nodesDb = await getAllNodesOfType(options)

        nodesDb.forEach(node => {
            nodes.push(convertDbNodeToModelNode(node) as ModelCarBrandNode)
        })

        return nodes
    },
}
