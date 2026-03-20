import {CreatePriceInput} from "./types/CreatePriceInput"
import {PriceNode} from "./types/PriceNode"
import {convertInputData} from "./create/convertInputData"
import {createNode} from "../../../db/node-types/prices/createNode"
import {convertDbNodeToModelNode} from "../convertDbNodeToModelNode"
import {getNodeById} from "../../../db/node-types/prices/getNodeById"
import {NodeNotFoundError} from "../../types/NodeNotFoundError"
import {getAllNodesOfType} from "../../../db/node-types/prices/getAllNodesOfType"
import type {NodeCollectionConstraints} from "../../types/NodeCollectionConstraints"
import {deleteNode} from "../../../db/nodes/deleteNode"
import {createRel} from "../../relationships/createRel"
import {deleteOutgoingRel} from "../../relationships/deleteOutgoingRel"
import {CarModelVariant} from "../car-model-variants/CarModelVariant"
import {getSpecificRel} from "../../relationships/getSpecificRel"
import {ModelNodeType} from "../../types/ModelNodeType"
import {RelAlreadyExistsError} from "../../types/RelAlreadyExistsError"
import {RelType} from "../../relationships/types/RelType"
import {getRel} from "../../relationships/getRel"
import {RelNotFoundError} from "../../types/RelNotFoundError"
import {deleteSpecificRel} from "../../relationships/deleteSpecificRel"

export const Price = {
    async create(data: CreatePriceInput): Promise<PriceNode> {
        const input = convertInputData(data)
        const result = await createNode(input)

        return convertDbNodeToModelNode(result) as PriceNode
    },

    async findById(id: number): Promise<PriceNode> {
        const node = await getNodeById(id)

        if (!node) {
            throw new NodeNotFoundError(id)
        }

        return convertDbNodeToModelNode(node) as PriceNode
    },

    async findAll(options: NodeCollectionConstraints = {}): Promise<PriceNode[]> {
        const nodes: PriceNode[] = []
        const nodesDb = await getAllNodesOfType(options)

        nodesDb.forEach(node => {
            nodes.push(convertDbNodeToModelNode(node) as PriceNode)
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

    async createForCarModelVariantRelationship(priceId: number, carModelVariantId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await Price.findById(priceId)
        await CarModelVariant.findById(carModelVariantId)

        const existingRelation = await getSpecificRel(priceId, carModelVariantId, RelType.PriceForCarModelVariant)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.PriceForCarModelVariant, priceId, carModelVariantId)
        }
        await deleteOutgoingRel(priceId, RelType.PriceForCarModelVariant, ModelNodeType.CarModelVariant)

        const createdRelationship = await createRel(priceId, carModelVariantId, RelType.PriceForCarModelVariant)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getForCarModelVariantRelationship(priceId: number) {
        // checking that the node exists -> exception is thrown if not
        await Price.findById(priceId)

        const relationship = await getRel(priceId, RelType.PriceForCarModelVariant)
        if (!relationship) {
            throw new RelNotFoundError(RelType.PriceForCarModelVariant, priceId, null)
        }

        return relationship
    },

    async deleteForCarModelVariantRelationship(priceId: number, carModelVariantId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await Price.findById(priceId)
        await CarModelVariant.findById(carModelVariantId)

        const relationship = await getSpecificRel(priceId, carModelVariantId, RelType.PriceForCarModelVariant)
        if (!relationship) {
            throw new RelNotFoundError(RelType.PriceForCarModelVariant, priceId, carModelVariantId)
        }

        await deleteSpecificRel(priceId, carModelVariantId, RelType.PriceForCarModelVariant)
    },
}
