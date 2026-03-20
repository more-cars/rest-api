import {CreateModelCarBrandInput} from "./types/CreateModelCarBrandInput"
import {ModelCarBrandNode} from "./types/ModelCarBrandNode"
import {convertInputData} from "./create/convertInputData"
import {createNode} from "../../../db/node-types/model-car-brands/createNode"
import {convertDbNodeToModelNode} from "../convertDbNodeToModelNode"
import {getNodeById} from "../../../db/node-types/model-car-brands/getNodeById"
import {NodeNotFoundError} from "../../types/NodeNotFoundError"
import {getAllNodesOfType} from "../../../db/node-types/model-car-brands/getAllNodesOfType"
import type {NodeCollectionConstraints} from "../../types/NodeCollectionConstraints"
import {deleteNode} from "../../../db/nodes/deleteNode"
import {createRel} from "../../relationships/createRel"
import {deleteIncomingRel} from "../../relationships/deleteIncomingRel"
import {ModelCar} from "../model-cars/ModelCar"
import {getSpecificRel} from "../../relationships/getSpecificRel"
import {ModelNodeType} from "../../types/ModelNodeType"
import {RelAlreadyExistsError} from "../../types/RelAlreadyExistsError"
import {RelType} from "../../relationships/types/RelType"
import {getAllRels} from "../../relationships/getAllRels"

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

    async delete(id: number): Promise<void> {
        const node = await getNodeById(id)

        if (!node) {
            throw new NodeNotFoundError(id)
        }

        await deleteNode(id)
    },

    async createCreatedModelCarRelationship(modelCarBrandId: number, modelCarId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await ModelCarBrand.findById(modelCarBrandId)
        await ModelCar.findById(modelCarId)

        const existingRelation = await getSpecificRel(modelCarBrandId, modelCarId, RelType.ModelCarBrandCreatedModelCar)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.ModelCarBrandCreatedModelCar, modelCarBrandId, modelCarId)
        }

        await deleteIncomingRel(modelCarId, RelType.ModelCarBrandCreatedModelCar, ModelNodeType.ModelCarBrand)

        const createdRelationship = await createRel(modelCarBrandId, modelCarId, RelType.ModelCarBrandCreatedModelCar)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getAllCreatedModelCarRelationships(modelCarBrandId: number) {
        // checking that the node exists -> exception is thrown if not
        await ModelCarBrand.findById(modelCarBrandId)

        return getAllRels(modelCarBrandId, RelType.ModelCarBrandCreatedModelCar)
    },
}
