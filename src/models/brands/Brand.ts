import {BrandNode} from "./types/BrandNode"
import {CreateBrandInput} from "./types/CreateBrandInput"
import {convertInputData} from "./create/convertInputData"
import {createNode} from "../../db/nodes/brands/createNode"
import {convertOutputData} from "./create/convertOutputData"
import {getNodeById} from "../../db/nodes/brands/getNodeById"
import type {NodeCollectionConstraints} from "../types/NodeCollectionConstraints"
import {getAllNodesOfType} from "../../db/nodes/brands/getAllNodesOfType"
import {deleteNode} from "../../db/nodes/deleteNode"
import {CarModel} from "../car-models/CarModel"
import {Image} from "../images/Image"
import {NodeNotFoundError} from "../types/NodeNotFoundError"
import {RelationshipAlreadyExistsError} from "../types/RelationshipAlreadyExistsError"
import {RelationshipNotFoundError} from "../types/RelationshipNotFoundError"
import {Company} from "../companies/Company"
import {getRel} from "../relationships/getRel"
import {RelationshipType} from "../relationships/types/RelationshipType"
import {getSpecificRel} from "../relationships/getSpecificRel"
import {deleteSpecificRel} from "../relationships/deleteSpecificRel"
import {createRel} from "../relationships/createRel"
import {getAllRels} from "../relationships/getAllRels"
import {NodeTypeLabel} from "../../db/NodeTypeLabel"
import {deleteIncomingRel} from "../relationships/deleteIncomingRel"
import {deleteOutgoingRel} from "../relationships/deleteOutgoingRel"

export const Brand = {
    async create(data: CreateBrandInput): Promise<BrandNode> {
        const input = convertInputData(data)
        const result = await createNode(input)
        const output = convertOutputData(result)

        return output
    },

    async findById(id: number): Promise<false | BrandNode> {
        const node = await getNodeById(id)

        if (!node) {
            return false
        }

        return convertOutputData(node)
    },

    async findAll(options: NodeCollectionConstraints = {}): Promise<BrandNode[]> {
        const nodes: BrandNode[] = []
        const nodesDb = await getAllNodesOfType(options)

        nodesDb.forEach(node => {
            nodes.push(convertOutputData(node))
        })

        return nodes
    },

    async delete(brandId: number): Promise<void> {
        const node = await Brand.findById(brandId)
        if (!node) {
            throw new NodeNotFoundError(brandId)
        }

        await deleteNode(brandId)
    },

    async createBelongsToCompanyRelationship(brandId: number, companyId: number) {
        const brand = await Brand.findById(brandId)
        if (!brand) {
            throw new NodeNotFoundError(brandId)
        }

        const company = await Company.findById(companyId)
        if (!company) {
            throw new NodeNotFoundError(companyId)
        }

        const existingRelation = await getSpecificRel(brandId, companyId, RelationshipType.BrandBelongsToCompany)
        if (existingRelation) {
            throw new RelationshipAlreadyExistsError(RelationshipType.BrandBelongsToCompany, brandId, companyId)
        }

        await deleteOutgoingRel(brandId, RelationshipType.BrandBelongsToCompany, NodeTypeLabel.Company)

        const createdRelationship = await createRel(brandId, companyId, RelationshipType.BrandBelongsToCompany)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getBelongsToCompanyRelationship(brandId: number) {
        const brand = await Brand.findById(brandId)
        if (!brand) {
            throw new NodeNotFoundError(brandId)
        }

        const relationship = await getRel(brandId, RelationshipType.BrandBelongsToCompany)
        if (!relationship) {
            throw new RelationshipNotFoundError(RelationshipType.BrandBelongsToCompany, brandId, null)
        }

        return relationship
    },

    async deleteBelongsToCompanyRelationship(brandId: number, companyId: number) {
        const brand = await Brand.findById(brandId)
        if (!brand) {
            throw new NodeNotFoundError(brandId)
        }

        const company = await Company.findById(companyId)
        if (!company) {
            throw new NodeNotFoundError(companyId)
        }

        const relationship = await getSpecificRel(brandId, companyId, RelationshipType.BrandBelongsToCompany)
        if (!relationship) {
            throw new RelationshipNotFoundError(RelationshipType.BrandBelongsToCompany, brandId, companyId)
        }

        await deleteSpecificRel(brandId, companyId, RelationshipType.BrandBelongsToCompany)
    },

    async createHasCarModelRelationship(brandId: number, carModelId: number) {
        const brand = await Brand.findById(brandId)
        if (!brand) {
            throw new NodeNotFoundError(brandId)
        }

        const carModel = await CarModel.findById(carModelId)
        if (!carModel) {
            throw new NodeNotFoundError(carModelId)
        }

        const existingRelationship = await getSpecificRel(brandId, carModelId, RelationshipType.BrandHasCarModel)
        if (existingRelationship) {
            throw new RelationshipAlreadyExistsError(RelationshipType.BrandHasCarModel, brandId, carModelId)
        }

        await deleteIncomingRel(carModelId, RelationshipType.BrandHasCarModel, NodeTypeLabel.Brand)

        const createdRelationship = await createRel(brandId, carModelId, RelationshipType.BrandHasCarModel)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getSpecificHasCarModelRelationship(brandId: number, carModelId: number) {
        const brand = await Brand.findById(brandId)
        if (!brand) {
            throw new NodeNotFoundError(brandId)
        }

        const carModel = await CarModel.findById(carModelId)
        if (!carModel) {
            throw new NodeNotFoundError(carModelId)
        }

        const relationship = await getSpecificRel(brandId, carModelId, RelationshipType.BrandHasCarModel)
        if (!relationship) {
            throw new RelationshipNotFoundError(RelationshipType.BrandHasCarModel, brandId, carModelId)
        }

        return relationship
    },

    async getAllHasCarModelRelationships(brandId: number) {
        const brand = await this.findById(brandId)
        if (!brand) {
            throw new NodeNotFoundError(brandId)
        }

        return getAllRels(brandId, RelationshipType.BrandHasCarModel)
    },

    async deleteHasCarModelRelationship(brandId: number, carModelId: number) {
        const brand = await Brand.findById(brandId)
        if (!brand) {
            throw new NodeNotFoundError(brandId)
        }

        const carModel = await CarModel.findById(carModelId)
        if (!carModel) {
            throw new NodeNotFoundError(carModelId)
        }

        const relationship = await getSpecificRel(brandId, carModelId, RelationshipType.BrandHasCarModel)
        if (!relationship) {
            throw new RelationshipNotFoundError(RelationshipType.BrandHasCarModel, brandId, carModelId)
        }

        await deleteSpecificRel(brandId, carModelId, RelationshipType.BrandHasCarModel)
    },

    async createHasImageRelationship(brandId: number, imageId: number) {
        const brand = await Brand.findById(brandId)
        if (!brand) {
            throw new NodeNotFoundError(brandId)
        }

        const image = await Image.findById(imageId)
        if (!image) {
            throw new NodeNotFoundError(imageId)
        }

        const existingRelationship = await getSpecificRel(brandId, imageId, RelationshipType.BrandHasImage)
        if (existingRelationship) {
            throw new RelationshipAlreadyExistsError(RelationshipType.BrandHasImage, brandId, imageId)
        }

        const createdRelationship = await createRel(brandId, imageId, RelationshipType.BrandHasImage)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getSpecificHasImageRelationship(brandId: number, imageId: number) {
        const brand = await Brand.findById(brandId)
        if (!brand) {
            throw new NodeNotFoundError(brandId)
        }

        const image = await Image.findById(imageId)
        if (!image) {
            throw new NodeNotFoundError(imageId)
        }

        const relationship = await getSpecificRel(brandId, imageId, RelationshipType.BrandHasImage)
        if (!relationship) {
            throw new RelationshipNotFoundError(RelationshipType.BrandHasImage, brandId, imageId)
        }

        return relationship
    },

    async getAllHasImageRelationships(brandId: number) {
        const brand = await this.findById(brandId)

        if (!brand) {
            throw new NodeNotFoundError(brandId)
        }

        return getAllRels(brandId, RelationshipType.BrandHasImage)
    },

    async deleteHasImageRelationship(brandId: number, imageId: number) {
        const brand = await Brand.findById(brandId)
        if (!brand) {
            throw new NodeNotFoundError(brandId)
        }

        const image = await Image.findById(imageId)
        if (!image) {
            throw new NodeNotFoundError(imageId)
        }

        const relationship = await getSpecificRel(brandId, imageId, RelationshipType.BrandHasImage)
        if (!relationship) {
            throw new RelationshipNotFoundError(RelationshipType.BrandHasImage, brandId, imageId)
        }

        await deleteSpecificRel(brandId, imageId, RelationshipType.BrandHasImage)
    },

    async createHasPrimeImageRelationship(brandId: number, imageId: number) {
        const brand = await Brand.findById(brandId)
        if (!brand) {
            throw new NodeNotFoundError(brandId)
        }

        const image = await Image.findById(imageId)
        if (!image) {
            throw new NodeNotFoundError(imageId)
        }

        const existingRelation = await getSpecificRel(brandId, imageId, RelationshipType.BrandHasPrimeImage)
        if (existingRelation) {
            throw new RelationshipAlreadyExistsError(RelationshipType.BrandHasPrimeImage, brandId, imageId)
        }

        await deleteOutgoingRel(brandId, RelationshipType.BrandHasPrimeImage, NodeTypeLabel.Image)

        const createdRelationship = await createRel(brandId, imageId, RelationshipType.BrandHasPrimeImage)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getHasPrimeImageRelationship(brandId: number) {
        const brand = await Brand.findById(brandId)
        if (!brand) {
            throw new NodeNotFoundError(brandId)
        }

        const relationship = await getRel(brandId, RelationshipType.BrandHasPrimeImage)
        if (!relationship) {
            throw new RelationshipNotFoundError(RelationshipType.BrandHasPrimeImage, brandId, null)
        }

        return relationship
    },

    async deleteHasPrimeImageRelationship(brandId: number, imageId: number) {
        const brand = await Brand.findById(brandId)
        if (!brand) {
            throw new NodeNotFoundError(brandId)
        }

        const image = await Image.findById(imageId)
        if (!image) {
            throw new NodeNotFoundError(imageId)
        }

        const relationship = await getSpecificRel(brandId, imageId, RelationshipType.BrandHasPrimeImage)
        if (!relationship) {
            throw new RelationshipNotFoundError(RelationshipType.BrandHasPrimeImage, brandId, imageId)
        }

        await deleteSpecificRel(brandId, imageId, RelationshipType.BrandHasPrimeImage)
    },
}
