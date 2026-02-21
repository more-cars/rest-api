import {CarModelNode} from "./types/CarModelNode"
import {CreateCarModelInput} from "./types/CreateCarModelInput"
import {convertInputData} from "./create/convertInputData"
import {createNode} from "../../../db/nodes/car-models/createNode"
import {convertCarModelDbNodeToModelNode} from "./create/convertCarModelDbNodeToModelNode"
import {getNodeById} from "../../../db/nodes/car-models/getNodeById"
import type {NodeCollectionConstraints} from "../../types/NodeCollectionConstraints"
import {getAllNodesOfType} from "../../../db/nodes/car-models/getAllNodesOfType"
import {deleteNode} from "../../../db/nodes/deleteNode"
import {Brand} from "../brands/Brand"
import {Image} from "../images/Image"
import {getRel} from "../../relationships/getRel"
import {NodeNotFoundError} from "../../types/NodeNotFoundError"
import {RelNotFoundError} from "../../types/RelNotFoundError"
import {RelAlreadyExistsError} from "../../types/RelAlreadyExistsError"
import {SemanticError} from "../../types/SemanticError"
import {RelType} from "../../relationships/types/RelType"
import {deleteSpecificRel} from "../../relationships/deleteSpecificRel"
import {getSpecificRel} from "../../relationships/getSpecificRel"
import {createRel} from "../../relationships/createRel"
import {getAllRels} from "../../relationships/getAllRels"
import {DbNodeType} from "../../../db/types/DbNodeType"
import {CarModelVariant} from "../car-model-variants/CarModelVariant"
import {deleteOutgoingRel} from "../../relationships/deleteOutgoingRel"
import {deleteIncomingRel} from "../../relationships/deleteIncomingRel"

export const CarModel = {
    async create(data: CreateCarModelInput): Promise<CarModelNode> {
        const input = convertInputData(data)
        const result = await createNode(input)

        return convertCarModelDbNodeToModelNode(result)
    },

    async findById(id: number): Promise<false | CarModelNode> {
        const node = await getNodeById(id)

        if (!node) {
            return false
        }

        return convertCarModelDbNodeToModelNode(node)
    },

    async findAll(options: NodeCollectionConstraints = {}): Promise<CarModelNode[]> {
        const nodes: CarModelNode[] = []
        const nodesDb = await getAllNodesOfType(options)

        nodesDb.forEach(node => {
            nodes.push(convertCarModelDbNodeToModelNode(node))
        })

        return nodes
    },

    async delete(carModelId: number): Promise<void> {
        const node = await CarModel.findById(carModelId)
        if (!node) {
            throw new NodeNotFoundError(carModelId)
        }

        await deleteNode(carModelId)
    },

    async createBelongsToBrandRelationship(carModelId: number, brandId: number) {
        const carModel = await CarModel.findById(carModelId)
        if (!carModel) {
            throw new NodeNotFoundError(carModelId)
        }

        const brand = await Brand.findById(brandId)
        if (!brand) {
            throw new NodeNotFoundError(brandId)
        }

        const existingRelationship = await getSpecificRel(carModelId, brandId, RelType.CarModelBelongsToBrand)
        if (existingRelationship) {
            throw new RelAlreadyExistsError(RelType.CarModelBelongsToBrand, carModelId, brandId)
        }

        await deleteOutgoingRel(carModelId, RelType.CarModelBelongsToBrand, DbNodeType.Brand)

        const createdRelationship = await createRel(carModelId, brandId, RelType.CarModelBelongsToBrand)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getBelongsToBrandRelationship(carModelId: number) {
        const carModel = await CarModel.findById(carModelId)
        if (!carModel) {
            throw new NodeNotFoundError(carModelId)
        }

        const relationship = await getRel(carModelId, RelType.CarModelBelongsToBrand)
        if (!relationship) {
            throw new RelNotFoundError(RelType.CarModelBelongsToBrand, carModelId)
        }

        return relationship
    },

    async deleteBelongsToBrandRelationship(carModelId: number, brandId: number) {
        const carModel = await CarModel.findById(carModelId)
        if (!carModel) {
            throw new NodeNotFoundError(carModelId)
        }

        const brand = await Brand.findById(brandId)
        if (!brand) {
            throw new NodeNotFoundError(brandId)
        }

        const relationship = await getSpecificRel(carModelId, brandId, RelType.CarModelBelongsToBrand)
        if (!relationship) {
            throw new RelNotFoundError(RelType.CarModelBelongsToBrand, carModelId, brandId)
        }

        await deleteSpecificRel(carModelId, brandId, RelType.CarModelBelongsToBrand)
    },

    async createHasSuccessorRelationship(carModelId: number, partnerId: number) {
        if (carModelId === partnerId) {
            throw new SemanticError(`Car Model #${carModelId} cannot be connected to itself`)
        }

        const carModel = await CarModel.findById(carModelId)
        if (!carModel) {
            throw new NodeNotFoundError(carModelId)
        }

        const partner = await CarModel.findById(partnerId)
        if (!partner) {
            throw new NodeNotFoundError(partnerId)
        }

        const existingRelation = await getSpecificRel(carModelId, partnerId, RelType.CarModelHasSuccessor)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.CarModelHasSuccessor, carModelId, partnerId)
        }

        await deleteOutgoingRel(carModelId, RelType.CarModelHasSuccessor, DbNodeType.CarModel)
        await deleteIncomingRel(partnerId, RelType.CarModelHasSuccessor, DbNodeType.CarModel)

        const createdRelationship = await createRel(carModelId, partnerId, RelType.CarModelHasSuccessor)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getHasSuccessorRelationship(carModelId: number) {
        const carModel = await CarModel.findById(carModelId)
        if (!carModel) {
            throw new NodeNotFoundError(carModelId)
        }

        const relationship = await getRel(carModelId, RelType.CarModelHasSuccessor)
        if (!relationship) {
            throw new RelNotFoundError(RelType.CarModelHasSuccessor, carModelId, null)
        }

        return relationship
    },

    async deleteHasSuccessorRelationship(carModelId: number, partnerId: number) {
        const carModel = await CarModel.findById(carModelId)
        if (!carModel) {
            throw new NodeNotFoundError(carModelId)
        }

        const partner = await CarModel.findById(partnerId)
        if (!partner) {
            throw new NodeNotFoundError(partnerId)
        }

        const relationship = await getSpecificRel(carModelId, partnerId, RelType.CarModelHasSuccessor)
        if (!relationship) {
            throw new RelNotFoundError(RelType.CarModelHasSuccessor, carModelId, partnerId)
        }

        await deleteSpecificRel(carModelId, partnerId, RelType.CarModelHasSuccessor)
    },

    async createIsSuccessorOfRelationship(carModelId: number, partnerId: number) {
        if (carModelId === partnerId) {
            throw new SemanticError(`Car Model #${carModelId} cannot be connected to itself`)
        }

        const carModel = await CarModel.findById(carModelId)
        if (!carModel) {
            throw new NodeNotFoundError(carModelId)
        }

        const partner = await CarModel.findById(partnerId)
        if (!partner) {
            throw new NodeNotFoundError(partnerId)
        }

        const existingRelation = await getSpecificRel(carModelId, partnerId, RelType.CarModelIsSuccessorOf)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.CarModelIsSuccessorOf, carModelId, partnerId)
        }

        await deleteOutgoingRel(carModelId, RelType.CarModelIsSuccessorOf, DbNodeType.CarModel)
        await deleteIncomingRel(partnerId, RelType.CarModelIsSuccessorOf, DbNodeType.CarModel)

        const createdRelationship = await createRel(carModelId, partnerId, RelType.CarModelIsSuccessorOf)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getIsSuccessorOfRelationship(carModelId: number) {
        const carModel = await CarModel.findById(carModelId)
        if (!carModel) {
            throw new NodeNotFoundError(carModelId)
        }

        const relationship = await getRel(carModelId, RelType.CarModelIsSuccessorOf)
        if (!relationship) {
            throw new RelNotFoundError(RelType.CarModelIsSuccessorOf, carModelId, null)
        }

        return relationship
    },

    async deleteIsSuccessorOfRelationship(carModelId: number, partnerId: number) {
        const carModel = await CarModel.findById(carModelId)
        if (!carModel) {
            throw new NodeNotFoundError(carModelId)
        }

        const partner = await CarModel.findById(partnerId)
        if (!partner) {
            throw new NodeNotFoundError(partnerId)
        }

        const relationship = await getSpecificRel(carModelId, partnerId, RelType.CarModelIsSuccessorOf)
        if (!relationship) {
            throw new RelNotFoundError(RelType.CarModelIsSuccessorOf, carModelId, partnerId)
        }

        await deleteSpecificRel(carModelId, partnerId, RelType.CarModelIsSuccessorOf)
    },

    async createHasVariantRelationship(carModelId: number, carModelVariantId: number) {
        const carModel = await CarModel.findById(carModelId)
        if (!carModel) {
            throw new NodeNotFoundError(carModelId)
        }

        const carModelVariant = await CarModelVariant.findById(carModelVariantId)
        if (!carModelVariant) {
            throw new NodeNotFoundError(carModelVariantId)
        }

        const existingRelation = await getSpecificRel(carModelId, carModelVariantId, RelType.CarModelHasVariant)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.CarModelHasVariant, carModelId, carModelVariantId)
        }

        await deleteIncomingRel(carModelVariantId, RelType.CarModelHasVariant, DbNodeType.CarModel)

        const createdRelationship = await createRel(carModelId, carModelVariantId, RelType.CarModelHasVariant)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getAllHasVariantRelationships(carModelId: number) {
        const carModel = await CarModel.findById(carModelId)
        if (!carModel) {
            throw new NodeNotFoundError(carModelId)
        }

        return getAllRels(carModelId, RelType.CarModelHasVariant)
    },

    async deleteHasVariantRelationship(carModelId: number, carModelVariantId: number) {
        const carModel = await CarModel.findById(carModelId)
        if (!carModel) {
            throw new NodeNotFoundError(carModelId)
        }

        const carModelVariant = await CarModelVariant.findById(carModelVariantId)
        if (!carModelVariant) {
            throw new NodeNotFoundError(carModelVariantId)
        }

        const relationship = await getSpecificRel(carModelId, carModelVariantId, RelType.CarModelHasVariant)
        if (!relationship) {
            throw new RelNotFoundError(RelType.CarModelHasVariant, carModelId, carModelVariantId)
        }

        await deleteSpecificRel(carModelId, carModelVariantId, RelType.CarModelHasVariant)
    },

    async createHasImageRelationship(carModelId: number, imageId: number) {
        const carModel = await CarModel.findById(carModelId)
        if (!carModel) {
            throw new NodeNotFoundError(carModelId)
        }

        const image = await Image.findById(imageId)
        if (!image) {
            throw new NodeNotFoundError(imageId)
        }

        const existingRelationship = await getSpecificRel(carModelId, imageId, RelType.CarModelHasImage)
        if (existingRelationship) {
            throw new RelAlreadyExistsError(RelType.CarModelHasImage, carModelId, imageId)
        }

        const createdRelationship = await createRel(carModelId, imageId, RelType.CarModelHasImage)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getSpecificHasImageRelationship(carModelId: number, imageId: number) {
        const carModel = await CarModel.findById(carModelId)
        if (!carModel) {
            throw new NodeNotFoundError(carModelId)
        }

        const image = await Image.findById(imageId)
        if (!image) {
            throw new NodeNotFoundError(imageId)
        }

        const relationship = await getSpecificRel(carModelId, imageId, RelType.CarModelHasImage)
        if (!relationship) {
            throw new RelNotFoundError(RelType.CarModelHasImage, carModelId, imageId)
        }

        return relationship
    },

    async getAllHasImageRelationships(carModelId: number) {
        const carModel = await CarModel.findById(carModelId)
        if (!carModel) {
            throw new NodeNotFoundError(carModelId)
        }

        return getAllRels(carModelId, RelType.CarModelHasImage)
    },

    async deleteHasImageRelationship(carModelId: number, imageId: number) {
        const carModel = await CarModel.findById(carModelId)
        if (!carModel) {
            throw new NodeNotFoundError(carModelId)
        }

        const image = await Image.findById(imageId)
        if (!image) {
            throw new NodeNotFoundError(imageId)
        }

        const relationship = await getSpecificRel(carModelId, imageId, RelType.CarModelHasImage)
        if (!relationship) {
            throw new RelNotFoundError(RelType.CarModelHasImage, carModelId, imageId)
        }

        await deleteSpecificRel(carModelId, imageId, RelType.CarModelHasImage)
    },

    async createHasPrimeImageRelationship(carModelId: number, imageId: number) {
        const carModel = await CarModel.findById(carModelId)
        if (!carModel) {
            throw new NodeNotFoundError(carModelId)
        }

        const image = await Image.findById(imageId)
        if (!image) {
            throw new NodeNotFoundError(imageId)
        }

        const existingRelationship = await getSpecificRel(carModelId, imageId, RelType.CarModelHasPrimeImage)
        if (existingRelationship) {
            throw new RelAlreadyExistsError(RelType.CarModelHasPrimeImage, carModelId, imageId)
        }

        await deleteOutgoingRel(carModelId, RelType.CarModelHasPrimeImage, DbNodeType.Image)

        const createdRelationship = await createRel(carModelId, imageId, RelType.CarModelHasPrimeImage)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getHasPrimeImageRelationship(carModelId: number) {
        const carModel = await CarModel.findById(carModelId)
        if (!carModel) {
            throw new NodeNotFoundError(carModelId)
        }

        const relationship = await getRel(carModelId, RelType.CarModelHasPrimeImage)
        if (!relationship) {
            throw new RelNotFoundError(RelType.CarModelHasPrimeImage, carModelId, null)
        }

        return relationship
    },

    async getSpecificHasPrimeImageRelationship(carModelId: number, imageId: number) {
        const carModel = await CarModel.findById(carModelId)
        if (!carModel) {
            throw new NodeNotFoundError(carModelId)
        }

        const image = await Image.findById(imageId)
        if (!image) {
            throw new NodeNotFoundError(imageId)
        }

        const relationship = await getSpecificRel(carModelId, imageId, RelType.CarModelHasPrimeImage)
        if (!relationship) {
            throw new RelNotFoundError(RelType.CarModelHasPrimeImage, carModelId, imageId)
        }

        return relationship
    },

    async deleteHasPrimeImageRelationship(carModelId: number, imageId: number) {
        const carModel = await CarModel.findById(carModelId)
        if (!carModel) {
            throw new NodeNotFoundError(carModelId)
        }

        const image = await Image.findById(imageId)
        if (!image) {
            throw new NodeNotFoundError(imageId)
        }

        const relationship = await getSpecificRel(carModelId, imageId, RelType.CarModelHasPrimeImage)
        if (!relationship) {
            throw new RelNotFoundError(RelType.CarModelHasPrimeImage, carModelId, imageId)
        }

        await deleteSpecificRel(carModelId, imageId, RelType.CarModelHasPrimeImage)
    },
}
