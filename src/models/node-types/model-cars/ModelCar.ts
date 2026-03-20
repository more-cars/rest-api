import {CreateModelCarInput} from "./types/CreateModelCarInput"
import {ModelCarNode} from "./types/ModelCarNode"
import {convertInputData} from "./create/convertInputData"
import {createNode} from "../../../db/node-types/model-cars/createNode"
import {convertDbNodeToModelNode} from "../convertDbNodeToModelNode"
import {getNodeById} from "../../../db/node-types/model-cars/getNodeById"
import {NodeNotFoundError} from "../../types/NodeNotFoundError"
import {getAllNodesOfType} from "../../../db/node-types/model-cars/getAllNodesOfType"
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
import {ModelCarBrand} from "../model-car-brands/ModelCarBrand"
import {Image} from "../images/Image"
import {getAllRels} from "../../relationships/getAllRels"

export const ModelCar = {
    async create(data: CreateModelCarInput): Promise<ModelCarNode> {
        const input = convertInputData(data)
        const result = await createNode(input)

        return convertDbNodeToModelNode(result) as ModelCarNode
    },

    async findById(id: number): Promise<ModelCarNode> {
        const node = await getNodeById(id)

        if (!node) {
            throw new NodeNotFoundError(id)
        }

        return convertDbNodeToModelNode(node) as ModelCarNode
    },

    async findAll(options: NodeCollectionConstraints = {}): Promise<ModelCarNode[]> {
        const nodes: ModelCarNode[] = []
        const nodesDb = await getAllNodesOfType(options)

        nodesDb.forEach(node => {
            nodes.push(convertDbNodeToModelNode(node) as ModelCarNode)
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

    async createIsScaleModelOfCarModelVariantRelationship(modelCarId: number, carModelVariantId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await ModelCar.findById(modelCarId)
        await CarModelVariant.findById(carModelVariantId)

        const existingRelation = await getSpecificRel(modelCarId, carModelVariantId, RelType.ModelCarIsScaleModelOfCarModelVariant)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.ModelCarIsScaleModelOfCarModelVariant, modelCarId, carModelVariantId)
        }
        await deleteOutgoingRel(modelCarId, RelType.ModelCarIsScaleModelOfCarModelVariant, ModelNodeType.CarModelVariant)

        const createdRelationship = await createRel(modelCarId, carModelVariantId, RelType.ModelCarIsScaleModelOfCarModelVariant)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getIsScaleModelOfCarModelVariantRelationship(modelCarId: number) {
        // checking that the node exists -> exception is thrown if not
        await ModelCar.findById(modelCarId)

        const relationship = await getRel(modelCarId, RelType.ModelCarIsScaleModelOfCarModelVariant)
        if (!relationship) {
            throw new RelNotFoundError(RelType.ModelCarIsScaleModelOfCarModelVariant, modelCarId, null)
        }

        return relationship
    },

    async deleteIsScaleModelOfCarModelVariantRelationship(modelCarId: number, carModelVariantId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await ModelCar.findById(modelCarId)
        await CarModelVariant.findById(carModelVariantId)

        const relationship = await getSpecificRel(modelCarId, carModelVariantId, RelType.ModelCarIsScaleModelOfCarModelVariant)
        if (!relationship) {
            throw new RelNotFoundError(RelType.ModelCarIsScaleModelOfCarModelVariant, modelCarId, carModelVariantId)
        }

        await deleteSpecificRel(modelCarId, carModelVariantId, RelType.ModelCarIsScaleModelOfCarModelVariant)
    },

    async createMadeByModelCarBrandRelationship(modelCarId: number, modelCarBrandId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await ModelCar.findById(modelCarId)
        await ModelCarBrand.findById(modelCarBrandId)

        const existingRelation = await getSpecificRel(modelCarId, modelCarBrandId, RelType.ModelCarMadeByModelCarBrand)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.ModelCarMadeByModelCarBrand, modelCarId, modelCarBrandId)
        }
        await deleteOutgoingRel(modelCarId, RelType.ModelCarMadeByModelCarBrand, ModelNodeType.ModelCarBrand)

        const createdRelationship = await createRel(modelCarId, modelCarBrandId, RelType.ModelCarMadeByModelCarBrand)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getMadeByModelCarBrandRelationship(modelCarId: number) {
        // checking that the node exists -> exception is thrown if not
        await ModelCar.findById(modelCarId)

        const relationship = await getRel(modelCarId, RelType.ModelCarMadeByModelCarBrand)
        if (!relationship) {
            throw new RelNotFoundError(RelType.ModelCarMadeByModelCarBrand, modelCarId, null)
        }

        return relationship
    },

    async deleteMadeByModelCarBrandRelationship(modelCarId: number, modelCarBrandId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await ModelCar.findById(modelCarId)
        await ModelCarBrand.findById(modelCarBrandId)

        const relationship = await getSpecificRel(modelCarId, modelCarBrandId, RelType.ModelCarMadeByModelCarBrand)
        if (!relationship) {
            throw new RelNotFoundError(RelType.ModelCarMadeByModelCarBrand, modelCarId, modelCarBrandId)
        }

        await deleteSpecificRel(modelCarId, modelCarBrandId, RelType.ModelCarMadeByModelCarBrand)
    },

    async createHasImageRelationship(modelCarId: number, imageId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await ModelCar.findById(modelCarId)
        await Image.findById(imageId)

        const existingRelation = await getSpecificRel(modelCarId, imageId, RelType.ModelCarHasImage)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.ModelCarHasImage, modelCarId, imageId)
        }

        const createdRelationship = await createRel(modelCarId, imageId, RelType.ModelCarHasImage)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getAllHasImageRelationships(modelCarId: number) {
        // checking that the node exists -> exception is thrown if not
        await ModelCar.findById(modelCarId)

        return getAllRels(modelCarId, RelType.ModelCarHasImage)
    },

    async deleteHasImageRelationship(modelCarId: number, imageId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await ModelCar.findById(modelCarId)
        await Image.findById(imageId)

        const relationship = await getSpecificRel(modelCarId, imageId, RelType.ModelCarHasImage)
        if (!relationship) {
            throw new RelNotFoundError(RelType.ModelCarHasImage, modelCarId, imageId)
        }

        await deleteSpecificRel(modelCarId, imageId, RelType.ModelCarHasImage)
    },

    async createHasPrimeImageRelationship(modelCarId: number, imageId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await ModelCar.findById(modelCarId)
        await Image.findById(imageId)

        const existingRelation = await getSpecificRel(modelCarId, imageId, RelType.ModelCarHasPrimeImage)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.ModelCarHasPrimeImage, modelCarId, imageId)
        }
        await deleteOutgoingRel(modelCarId, RelType.ModelCarHasPrimeImage, ModelNodeType.Image)

        const createdRelationship = await createRel(modelCarId, imageId, RelType.ModelCarHasPrimeImage)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getHasPrimeImageRelationship(modelCarId: number) {
        // checking that the node exists -> exception is thrown if not
        await ModelCar.findById(modelCarId)

        const relationship = await getRel(modelCarId, RelType.ModelCarHasPrimeImage)
        if (!relationship) {
            throw new RelNotFoundError(RelType.ModelCarHasPrimeImage, modelCarId, null)
        }

        return relationship
    },
}
