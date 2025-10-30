import {CreateCarModelVariantInput} from "./types/CreateCarModelVariantInput"
import {CarModelVariantNode} from "./types/CarModelVariantNode"
import {convertInputData} from "./create/convertInputData"
import {createNode} from "../../db/nodes/car-model-variants/createNode"
import {convertOutputData} from "./create/convertOutputData"
import {getNodeById} from "../../db/nodes/car-model-variants/getNodeById"
import {getAllNodesOfType} from "../../db/nodes/car-model-variants/getAllNodesOfType"
import type {NodeCollectionConstraints} from "../types/NodeCollectionConstraints"
import {deleteNode} from "../../db/nodes/deleteNode"
import {NodeNotFoundError} from "../types/NodeNotFoundError"

export class CarModelVariant {
    static async create(data: CreateCarModelVariantInput): Promise<CarModelVariantNode> {
        const input = convertInputData(data)
        const result = await createNode(input)
        const output = convertOutputData(result)

        return output
    }

    static async findById(id: number): Promise<false | CarModelVariantNode> {
        const node = await getNodeById(id)

        if (!node) {
            return false
        }

        return convertOutputData(node)
    }

    static async findAll(options: NodeCollectionConstraints = {}): Promise<CarModelVariantNode[]> {
        const nodes: Array<CarModelVariantNode> = []
        const nodesDb = await getAllNodesOfType(options)

        nodesDb.forEach(node => {
            nodes.push(convertOutputData(node))
        })

        return nodes
    }

    static async delete(carModelVariantId: number): Promise<void> {
        const node = await CarModelVariant.findById(carModelVariantId)
        if (!node) {
            throw new NodeNotFoundError(carModelVariantId)
        }

        await deleteNode(carModelVariantId)
    }
}
