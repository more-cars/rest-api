import {BrandNode} from "./types/BrandNode"
import {CreateBrandInput} from "./types/CreateBrandInput"
import {convertInputData} from "./create/convertInputData"
import {createNode} from "../../../db/nodes/brands/createNode"
import {convertOutputData} from "./create/convertOutputData"
import {getNodeById} from "../../../db/nodes/brands/getNodeById"
import type {NodeCollectionConstraints} from "../../types/NodeCollectionConstraints"
import {getAllNodesOfType} from "../../../db/nodes/brands/getAllNodesOfType"
import {deleteNode} from "../../../db/nodes/deleteNode"
import {CarModel} from "../car-models/CarModel"
import {Image} from "../images/Image"
import {NodeNotFoundError} from "../../types/NodeNotFoundError"
import {RelAlreadyExistsError} from "../../types/RelAlreadyExistsError"
import {RelNotFoundError} from "../../types/RelNotFoundError"
import {Company} from "../companies/Company"
import {getRel} from "../../relationships/getRel"
import {RelType} from "../../relationships/types/RelType"
import {getSpecificRel} from "../../relationships/getSpecificRel"
import {deleteSpecificRel} from "../../relationships/deleteSpecificRel"
import {createRel} from "../../relationships/createRel"
import {getAllRels} from "../../relationships/getAllRels"
import {NodeTypeLabel} from "../../../db/NodeTypeLabel"
import {deleteIncomingRel} from "../../relationships/deleteIncomingRel"
import {deleteOutgoingRel} from "../../relationships/deleteOutgoingRel"

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

        const existingRelation = await getSpecificRel(brandId, companyId, RelType.BrandBelongsToCompany)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.BrandBelongsToCompany, brandId, companyId)
        }

        await deleteOutgoingRel(brandId, RelType.BrandBelongsToCompany, NodeTypeLabel.Company)

        const createdRelationship = await createRel(brandId, companyId, RelType.BrandBelongsToCompany)
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

        const relationship = await getRel(brandId, RelType.BrandBelongsToCompany)
        if (!relationship) {
            throw new RelNotFoundError(RelType.BrandBelongsToCompany, brandId, null)
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

        const relationship = await getSpecificRel(brandId, companyId, RelType.BrandBelongsToCompany)
        if (!relationship) {
            throw new RelNotFoundError(RelType.BrandBelongsToCompany, brandId, companyId)
        }

        await deleteSpecificRel(brandId, companyId, RelType.BrandBelongsToCompany)
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

        const existingRelationship = await getSpecificRel(brandId, carModelId, RelType.BrandHasCarModel)
        if (existingRelationship) {
            throw new RelAlreadyExistsError(RelType.BrandHasCarModel, brandId, carModelId)
        }

        await deleteIncomingRel(carModelId, RelType.BrandHasCarModel, NodeTypeLabel.Brand)

        const createdRelationship = await createRel(brandId, carModelId, RelType.BrandHasCarModel)
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

        const relationship = await getSpecificRel(brandId, carModelId, RelType.BrandHasCarModel)
        if (!relationship) {
            throw new RelNotFoundError(RelType.BrandHasCarModel, brandId, carModelId)
        }

        return relationship
    },

    async getAllHasCarModelRelationships(brandId: number) {
        const brand = await this.findById(brandId)
        if (!brand) {
            throw new NodeNotFoundError(brandId)
        }

        return getAllRels(brandId, RelType.BrandHasCarModel)
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

        const relationship = await getSpecificRel(brandId, carModelId, RelType.BrandHasCarModel)
        if (!relationship) {
            throw new RelNotFoundError(RelType.BrandHasCarModel, brandId, carModelId)
        }

        await deleteSpecificRel(brandId, carModelId, RelType.BrandHasCarModel)
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

        const existingRelationship = await getSpecificRel(brandId, imageId, RelType.BrandHasImage)
        if (existingRelationship) {
            throw new RelAlreadyExistsError(RelType.BrandHasImage, brandId, imageId)
        }

        const createdRelationship = await createRel(brandId, imageId, RelType.BrandHasImage)
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

        const relationship = await getSpecificRel(brandId, imageId, RelType.BrandHasImage)
        if (!relationship) {
            throw new RelNotFoundError(RelType.BrandHasImage, brandId, imageId)
        }

        return relationship
    },

    async getAllHasImageRelationships(brandId: number) {
        const brand = await this.findById(brandId)

        if (!brand) {
            throw new NodeNotFoundError(brandId)
        }

        return getAllRels(brandId, RelType.BrandHasImage)
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

        const relationship = await getSpecificRel(brandId, imageId, RelType.BrandHasImage)
        if (!relationship) {
            throw new RelNotFoundError(RelType.BrandHasImage, brandId, imageId)
        }

        await deleteSpecificRel(brandId, imageId, RelType.BrandHasImage)
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

        const existingRelation = await getSpecificRel(brandId, imageId, RelType.BrandHasPrimeImage)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.BrandHasPrimeImage, brandId, imageId)
        }

        await deleteOutgoingRel(brandId, RelType.BrandHasPrimeImage, NodeTypeLabel.Image)

        const createdRelationship = await createRel(brandId, imageId, RelType.BrandHasPrimeImage)
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

        const relationship = await getRel(brandId, RelType.BrandHasPrimeImage)
        if (!relationship) {
            throw new RelNotFoundError(RelType.BrandHasPrimeImage, brandId, null)
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

        const relationship = await getSpecificRel(brandId, imageId, RelType.BrandHasPrimeImage)
        if (!relationship) {
            throw new RelNotFoundError(RelType.BrandHasPrimeImage, brandId, imageId)
        }

        await deleteSpecificRel(brandId, imageId, RelType.BrandHasPrimeImage)
    },
}
