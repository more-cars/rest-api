import {CreateCompanyInput} from "./types/CreateCompanyInput"
import {CompanyNode} from "./types/CompanyNode"
import {convertInputData} from "./create/convertInputData"
import {createNode} from "../../db/nodes/companies/createNode"
import {convertOutputData} from "./create/convertOutputData"
import {getNodeById} from "../../db/nodes/companies/getNodeById"
import type {NodeCollectionConstraints} from "../types/NodeCollectionConstraints"
import {getAllNodesOfType} from "../../db/nodes/companies/getAllNodesOfType"
import {deleteNode} from "../../db/nodes/deleteNode"
import {Brand} from "../brands/Brand"
import {NodeNotFoundError} from "../types/NodeNotFoundError"
import {RelationshipAlreadyExistsError} from "../types/RelationshipAlreadyExistsError"
import {CompanyRelationship} from "./types/CompanyRelationship"
import {RelationshipNotFoundError} from "../types/RelationshipNotFoundError"
import {Image} from "../images/Image"
import {getRel} from "../relationships/getRel"
import {RelationshipType} from "../relationships/types/RelationshipType"
import {deleteSpecificRel} from "../relationships/deleteSpecificRel"
import {getSpecificRel} from "../relationships/getSpecificRel"
import {createRel} from "../relationships/createRel"
import {getAllRels} from "../relationships/getAllRels"
import {NodeTypeLabel} from "../../db/NodeTypeLabel"
import {deleteIncomingRel} from "../relationships/deleteIncomingRel"
import {deleteOutgoingRel} from "../relationships/deleteOutgoingRel"

export const Company = {
    async create(data: CreateCompanyInput): Promise<CompanyNode> {
        const input = convertInputData(data)
        const result = await createNode(input)
        const output = convertOutputData(result)

        return output
    },

    async findById(id: number): Promise<false | CompanyNode> {
        const node = await getNodeById(id)

        if (!node) {
            return false
        }

        return convertOutputData(node)
    },

    async findAll(options: NodeCollectionConstraints = {}): Promise<CompanyNode[]> {
        const nodes: CompanyNode[] = []
        const nodesDb = await getAllNodesOfType(options)

        nodesDb.forEach(node => {
            nodes.push(convertOutputData(node))
        })

        return nodes
    },

    async delete(companyId: number): Promise<void> {
        const node = await Company.findById(companyId)
        if (!node) {
            throw new NodeNotFoundError(companyId)
        }

        await deleteNode(companyId)
    },

    async createHasBrandRelationship(companyId: number, brandId: number) {
        const company = await Company.findById(companyId)
        if (!company) {
            throw new NodeNotFoundError(companyId)
        }

        const brand = await Brand.findById(brandId)
        if (!brand) {
            throw new NodeNotFoundError(brandId)
        }

        const existingRelationship = await getSpecificRel(companyId, brandId, RelationshipType.CompanyHasBrand)
        if (existingRelationship) {
            throw new RelationshipAlreadyExistsError(CompanyRelationship.hasBrand, companyId, brandId)
        }

        await deleteIncomingRel(brandId, RelationshipType.CompanyHasBrand, NodeTypeLabel.Company)

        const createdRelationship = await createRel(companyId, brandId, RelationshipType.CompanyHasBrand)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getAllHasBrandRelationships(companyId: number) {
        const company = await Company.findById(companyId)
        if (!company) {
            throw new NodeNotFoundError(companyId)
        }

        return getAllRels(companyId, RelationshipType.CompanyHasBrand)
    },

    async deleteHasBrandRelationship(companyId: number, brandId: number) {
        const company = await Company.findById(companyId)
        if (!company) {
            throw new NodeNotFoundError(companyId)
        }

        const brand = await Brand.findById(brandId)
        if (!brand) {
            throw new NodeNotFoundError(brandId)
        }

        const relationship = await getSpecificRel(companyId, brandId, RelationshipType.CompanyHasBrand)
        if (!relationship) {
            throw new RelationshipNotFoundError(CompanyRelationship.hasBrand, companyId, brandId)
        }

        await deleteSpecificRel(companyId, brandId, RelationshipType.CompanyHasBrand)
    },

    async createHasImageRelationship(companyId: number, imageId: number) {
        const company = await Company.findById(companyId)
        if (!company) {
            throw new NodeNotFoundError(companyId)
        }

        const image = await Image.findById(imageId)
        if (!image) {
            throw new NodeNotFoundError(imageId)
        }

        const existingRelationship = await getSpecificRel(companyId, imageId, RelationshipType.CompanyHasImage)
        if (existingRelationship) {
            throw new RelationshipAlreadyExistsError(CompanyRelationship.hasImage, companyId, imageId)
        }

        const createdRelationship = await createRel(companyId, imageId, RelationshipType.CompanyHasImage)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getAllHasImageRelationships(companyId: number) {
        const company = await Company.findById(companyId)
        if (!company) {
            throw new NodeNotFoundError(companyId)
        }

        return getAllRels(companyId, RelationshipType.CompanyHasImage)
    },

    async deleteHasImageRelationship(companyId: number, imageId: number) {
        const company = await Company.findById(companyId)
        if (!company) {
            throw new NodeNotFoundError(companyId)
        }

        const image = await Image.findById(imageId)
        if (!image) {
            throw new NodeNotFoundError(imageId)
        }

        const relationship = await getSpecificRel(companyId, imageId, RelationshipType.CompanyHasImage)
        if (!relationship) {
            throw new RelationshipNotFoundError(CompanyRelationship.hasImage, companyId, imageId)
        }

        await deleteSpecificRel(companyId, imageId, RelationshipType.CompanyHasImage)
    },

    async createHasPrimeImageRelationship(companyId: number, imageId: number) {
        const company = await Company.findById(companyId)
        if (!company) {
            throw new NodeNotFoundError(companyId)
        }

        const image = await Image.findById(imageId)
        if (!image) {
            throw new NodeNotFoundError(imageId)
        }

        const existingRelationship = await getSpecificRel(companyId, imageId, RelationshipType.CompanyHasPrimeImage)
        if (existingRelationship) {
            throw new RelationshipAlreadyExistsError(CompanyRelationship.hasPrimeImage, companyId, imageId)
        }

        await deleteOutgoingRel(companyId, RelationshipType.CompanyHasPrimeImage, NodeTypeLabel.Image)

        const createdRelationship = await createRel(companyId, imageId, RelationshipType.CompanyHasPrimeImage)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getHasPrimeImageRelationship(companyId: number) {
        const company = await Company.findById(companyId)
        if (!company) {
            throw new NodeNotFoundError(companyId)
        }

        const relationship = await getRel(companyId, RelationshipType.CompanyHasPrimeImage)
        if (!relationship) {
            throw new RelationshipNotFoundError(CompanyRelationship.hasPrimeImage, companyId, null)
        }

        return relationship
    },

    async deleteHasPrimeImageRelationship(companyId: number, imageId: number) {
        const company = await Company.findById(companyId)
        if (!company) {
            throw new NodeNotFoundError(companyId)
        }

        const image = await Image.findById(imageId)
        if (!image) {
            throw new NodeNotFoundError(imageId)
        }

        const relationship = await getSpecificRel(companyId, imageId, RelationshipType.CompanyHasPrimeImage)
        if (!relationship) {
            throw new RelationshipNotFoundError(CompanyRelationship.hasPrimeImage, companyId, imageId)
        }

        await deleteSpecificRel(companyId, imageId, RelationshipType.CompanyHasPrimeImage)
    },
}
