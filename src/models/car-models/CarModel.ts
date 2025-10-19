import {CarModelNode} from "./types/CarModelNode"
import {CreateCarModelInput} from "./types/CreateCarModelInput"
import {convertInputData} from "./create/convertInputData"
import {createNode} from "../../db/nodes/car-models/createNode"
import {convertOutputData} from "./create/convertOutputData"
import {getNodeById} from "../../db/nodes/car-models/getNodeById"
import type {NodeCollectionConstraints} from "../types/NodeCollectionConstraints"
import {getAllNodesOfType} from "../../db/nodes/car-models/getAllNodesOfType"
import {deleteNode} from "../../db/nodes/deleteNode"
import {Brand} from "../brands/Brand"
import {Image} from "../images/Image"
import {getRel} from "../relationships/getRel"
import {NodeNotFoundError} from "../types/NodeNotFoundError"
import {RelationshipNotFoundError} from "../types/RelationshipNotFoundError"
import {CarModelRelationship} from "./types/CarModelRelationship"
import {RelationshipAlreadyExistsError} from "../types/RelationshipAlreadyExistsError"
import {deleteDeprecatedRelationship} from "../relationships/deleteDeprecatedRelationship"
import {DbRelationship} from "../../db/types/DbRelationship"
import {SemanticError} from "../types/SemanticError"
import {RelationshipType} from "../relationships/types/RelationshipType"
import {deleteSpecificRel} from "../relationships/deleteSpecificRel"
import {getSpecificRel} from "../relationships/getSpecificRel"
import {createRel} from "../relationships/createRel"
import {getAllRels} from "../relationships/getAllRels"

export class CarModel {
    static async create(data: CreateCarModelInput): Promise<CarModelNode> {
        const input = convertInputData(data)
        const result = await createNode(input)
        const output = convertOutputData(result)

        return output
    }

    static async findById(id: number): Promise<false | CarModelNode> {
        const node = await getNodeById(id)

        if (!node) {
            return false
        }

        return convertOutputData(node)
    }

    static async findAll(options: NodeCollectionConstraints = {}): Promise<CarModelNode[]> {
        const nodes: Array<CarModelNode> = []
        const nodesDb = await getAllNodesOfType(options)

        nodesDb.forEach(node => {
            nodes.push(convertOutputData(node))
        })

        return nodes
    }

    static async delete(carModelId: number): Promise<void> {
        const node = await CarModel.findById(carModelId)
        if (!node) {
            throw new NodeNotFoundError(carModelId)
        }

        await deleteNode(carModelId)
    }

    static async createBelongsToBrandRelationship(carModelId: number, brandId: number) {
        const carModel = await CarModel.findById(carModelId)
        if (!carModel) {
            throw new NodeNotFoundError(carModelId)
        }

        const brand = await Brand.findById(brandId)
        if (!brand) {
            throw new NodeNotFoundError(brandId)
        }

        const existingRelationship = await getSpecificRel(carModelId, brandId, RelationshipType.CarModelBelongsToBrand)
        if (existingRelationship) {
            throw new RelationshipAlreadyExistsError(CarModelRelationship.belongsToBrand, carModelId, brandId)
        }

        await deleteDeprecatedRelationship(carModelId, DbRelationship.BrandHasCarModel)

        const createdRelationship = await createRel(carModelId, brandId, RelationshipType.CarModelBelongsToBrand)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    }

    static async getBelongsToBrandRelationship(carModelId: number) {
        const carModel = await CarModel.findById(carModelId)
        if (!carModel) {
            throw new NodeNotFoundError(carModelId)
        }

        const relationship = await getRel(carModelId, RelationshipType.CarModelBelongsToBrand)
        if (!relationship) {
            throw new RelationshipNotFoundError(CarModelRelationship.belongsToBrand, carModelId)
        }

        return relationship
    }

    static async deleteBelongsToBrandRelationship(carModelId: number, brandId: number) {
        const carModel = await CarModel.findById(carModelId)
        if (!carModel) {
            throw new NodeNotFoundError(carModelId)
        }

        const brand = await Brand.findById(brandId)
        if (!brand) {
            throw new NodeNotFoundError(brandId)
        }

        const relationship = await getSpecificRel(carModelId, brandId, RelationshipType.CarModelBelongsToBrand)
        if (!relationship) {
            throw new RelationshipNotFoundError(CarModelRelationship.belongsToBrand, carModelId, brandId)
        }

        await deleteSpecificRel(carModelId, brandId, RelationshipType.CarModelBelongsToBrand)
    }

    static async createHasSuccessorRelationship(carModelId: number, partnerId: number) {
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

        const existingRelation = await getSpecificRel(carModelId, partnerId, RelationshipType.CarModelHasSuccessor)
        if (existingRelation) {
            throw new RelationshipAlreadyExistsError(CarModelRelationship.hasSuccessor, carModelId, partnerId)
        }

        await deleteDeprecatedRelationship(carModelId, DbRelationship.CarModelHasSuccessor)

        const createdRelationship = await createRel(carModelId, partnerId, RelationshipType.CarModelHasSuccessor)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    }

    static async getHasSuccessorRelationship(carModelId: number) {
        const carModel = await CarModel.findById(carModelId)
        if (!carModel) {
            throw new NodeNotFoundError(carModelId)
        }

        const relationship = await getRel(carModelId, RelationshipType.CarModelHasSuccessor)
        if (!relationship) {
            throw new RelationshipNotFoundError(CarModelRelationship.hasSuccessor, carModelId, null)
        }

        return relationship
    }

    static async deleteHasSuccessorRelationship(carModelId: number, partnerId: number) {
        const carModel = await CarModel.findById(carModelId)
        if (!carModel) {
            throw new NodeNotFoundError(carModelId)
        }

        const partner = await CarModel.findById(partnerId)
        if (!partner) {
            throw new NodeNotFoundError(partnerId)
        }

        const relationship = await getSpecificRel(carModelId, partnerId, RelationshipType.CarModelHasSuccessor)
        if (!relationship) {
            throw new RelationshipNotFoundError(CarModelRelationship.hasSuccessor, carModelId, partnerId)
        }

        await deleteSpecificRel(carModelId, partnerId, RelationshipType.CarModelHasSuccessor)
    }

    static async createIsSuccessorOfRelationship(carModelId: number, partnerId: number) {
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

        const existingRelation = await getSpecificRel(carModelId, partnerId, RelationshipType.CarModelIsSuccessorOf)
        if (existingRelation) {
            throw new RelationshipAlreadyExistsError(CarModelRelationship.isSuccessorOf, carModelId, partnerId)
        }

        await deleteDeprecatedRelationship(carModelId, DbRelationship.CarModelIsSuccessorOf)

        const createdRelationship = await createRel(carModelId, partnerId, RelationshipType.CarModelIsSuccessorOf)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    }

    static async getIsSuccessorOfRelationship(carModelId: number) {
        const carModel = await CarModel.findById(carModelId)
        if (!carModel) {
            throw new NodeNotFoundError(carModelId)
        }

        const relationship = await getRel(carModelId, RelationshipType.CarModelIsSuccessorOf)
        if (!relationship) {
            throw new RelationshipNotFoundError(CarModelRelationship.isSuccessorOf, carModelId, null)
        }

        return relationship
    }

    static async deleteIsSuccessorOfRelationship(carModelId: number, partnerId: number) {
        const carModel = await CarModel.findById(carModelId)
        if (!carModel) {
            throw new NodeNotFoundError(carModelId)
        }

        const partner = await CarModel.findById(partnerId)
        if (!partner) {
            throw new NodeNotFoundError(partnerId)
        }

        const relationship = await getSpecificRel(carModelId, partnerId, RelationshipType.CarModelIsSuccessorOf)
        if (!relationship) {
            throw new RelationshipNotFoundError(CarModelRelationship.isSuccessorOf, carModelId, partnerId)
        }

        await deleteSpecificRel(carModelId, partnerId, RelationshipType.CarModelIsSuccessorOf)
    }

    static async createHasImageRelationship(carModelId: number, imageId: number) {
        const carModel = await CarModel.findById(carModelId)
        if (!carModel) {
            throw new NodeNotFoundError(carModelId)
        }

        const image = await Image.findById(imageId)
        if (!image) {
            throw new NodeNotFoundError(imageId)
        }

        const existingRelationship = await getSpecificRel(carModelId, imageId, RelationshipType.CarModelHasImage)
        if (existingRelationship) {
            throw new RelationshipAlreadyExistsError(CarModelRelationship.hasImage, carModelId, imageId)
        }

        const createdRelationship = await createRel(carModelId, imageId, RelationshipType.CarModelHasImage)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    }

    static async getSpecificHasImageRelationship(carModelId: number, imageId: number) {
        const carModel = await CarModel.findById(carModelId)
        if (!carModel) {
            throw new NodeNotFoundError(carModelId)
        }

        const image = await Image.findById(imageId)
        if (!image) {
            throw new NodeNotFoundError(imageId)
        }

        const relationship = await getSpecificRel(carModelId, imageId, RelationshipType.CarModelHasImage)
        if (!relationship) {
            throw new RelationshipNotFoundError(CarModelRelationship.hasImage, carModelId, imageId)
        }

        return relationship
    }

    static async getAllHasImageRelationships(carModelId: number) {
        const carModel = await CarModel.findById(carModelId)
        if (!carModel) {
            throw new NodeNotFoundError(carModelId)
        }

        return getAllRels(carModelId, RelationshipType.CarModelHasImage)
    }

    static async deleteHasImageRelationship(carModelId: number, imageId: number) {
        const carModel = await CarModel.findById(carModelId)
        if (!carModel) {
            throw new NodeNotFoundError(carModelId)
        }

        const image = await Image.findById(imageId)
        if (!image) {
            throw new NodeNotFoundError(imageId)
        }

        const relationship = await getSpecificRel(carModelId, imageId, RelationshipType.CarModelHasImage)
        if (!relationship) {
            throw new RelationshipNotFoundError(CarModelRelationship.hasImage, carModelId, imageId)
        }

        await deleteSpecificRel(carModelId, imageId, RelationshipType.CarModelHasImage)
    }

    static async createHasPrimeImageRelationship(carModelId: number, imageId: number) {
        const carModel = await CarModel.findById(carModelId)
        if (!carModel) {
            throw new NodeNotFoundError(carModelId)
        }

        const image = await Image.findById(imageId)
        if (!image) {
            throw new NodeNotFoundError(imageId)
        }

        const existingRelationship = await getSpecificRel(carModelId, imageId, RelationshipType.CarModelHasPrimeImage)
        if (existingRelationship) {
            throw new RelationshipAlreadyExistsError(CarModelRelationship.hasPrimeImage, carModelId, imageId)
        }

        await deleteDeprecatedRelationship(carModelId, DbRelationship.CarModelHasPrimeImage)

        const createdRelationship = await createRel(carModelId, imageId, RelationshipType.CarModelHasPrimeImage)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    }

    static async getHasPrimeImageRelationship(carModelId: number) {
        const carModel = await CarModel.findById(carModelId)
        if (!carModel) {
            throw new NodeNotFoundError(carModelId)
        }

        const relationship = await getRel(carModelId, RelationshipType.CarModelHasPrimeImage)
        if (!relationship) {
            throw new RelationshipNotFoundError(CarModelRelationship.hasPrimeImage, carModelId, null)
        }

        return relationship
    }

    static async getSpecificHasPrimeImageRelationship(carModelId: number, imageId: number) {
        const carModel = await CarModel.findById(carModelId)
        if (!carModel) {
            throw new NodeNotFoundError(carModelId)
        }

        const image = await Image.findById(imageId)
        if (!image) {
            throw new NodeNotFoundError(imageId)
        }

        const relationship = await getSpecificRel(carModelId, imageId, RelationshipType.CarModelHasPrimeImage)
        if (!relationship) {
            throw new RelationshipNotFoundError(CarModelRelationship.hasPrimeImage, carModelId, imageId)
        }

        return relationship
    }

    static async deleteHasPrimeImageRelationship(carModelId: number, imageId: number) {
        const carModel = await CarModel.findById(carModelId)
        if (!carModel) {
            throw new NodeNotFoundError(carModelId)
        }

        const image = await Image.findById(imageId)
        if (!image) {
            throw new NodeNotFoundError(imageId)
        }

        const relationship = await getSpecificRel(carModelId, imageId, RelationshipType.CarModelHasPrimeImage)
        if (!relationship) {
            throw new RelationshipNotFoundError(CarModelRelationship.hasPrimeImage, carModelId, imageId)
        }

        await deleteSpecificRel(carModelId, imageId, RelationshipType.CarModelHasPrimeImage)
    }
}
