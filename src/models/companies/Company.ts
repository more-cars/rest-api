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
import {RelationshipNotFoundError} from "../types/RelationshipNotFoundError"
import {Image} from "../images/Image"
import {getRel} from "../relationships/getRel"
import {RelType} from "../relationships/types/RelType"
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

        const existingRelationship = await getSpecificRel(companyId, brandId, RelType.CompanyHasBrand)
        if (existingRelationship) {
            throw new RelationshipAlreadyExistsError(RelType.CompanyHasBrand, companyId, brandId)
        }

        await deleteIncomingRel(brandId, RelType.CompanyHasBrand, NodeTypeLabel.Company)

        const createdRelationship = await createRel(companyId, brandId, RelType.CompanyHasBrand)
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

        return getAllRels(companyId, RelType.CompanyHasBrand)
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

        const relationship = await getSpecificRel(companyId, brandId, RelType.CompanyHasBrand)
        if (!relationship) {
            throw new RelationshipNotFoundError(RelType.CompanyHasBrand, companyId, brandId)
        }

        await deleteSpecificRel(companyId, brandId, RelType.CompanyHasBrand)
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

        const existingRelationship = await getSpecificRel(companyId, imageId, RelType.CompanyHasImage)
        if (existingRelationship) {
            throw new RelationshipAlreadyExistsError(RelType.CompanyHasImage, companyId, imageId)
        }

        const createdRelationship = await createRel(companyId, imageId, RelType.CompanyHasImage)
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

        return getAllRels(companyId, RelType.CompanyHasImage)
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

        const relationship = await getSpecificRel(companyId, imageId, RelType.CompanyHasImage)
        if (!relationship) {
            throw new RelationshipNotFoundError(RelType.CompanyHasImage, companyId, imageId)
        }

        await deleteSpecificRel(companyId, imageId, RelType.CompanyHasImage)
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

        const existingRelationship = await getSpecificRel(companyId, imageId, RelType.CompanyHasPrimeImage)
        if (existingRelationship) {
            throw new RelationshipAlreadyExistsError(RelType.CompanyHasPrimeImage, companyId, imageId)
        }

        await deleteOutgoingRel(companyId, RelType.CompanyHasPrimeImage, NodeTypeLabel.Image)

        const createdRelationship = await createRel(companyId, imageId, RelType.CompanyHasPrimeImage)
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

        const relationship = await getRel(companyId, RelType.CompanyHasPrimeImage)
        if (!relationship) {
            throw new RelationshipNotFoundError(RelType.CompanyHasPrimeImage, companyId, null)
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

        const relationship = await getSpecificRel(companyId, imageId, RelType.CompanyHasPrimeImage)
        if (!relationship) {
            throw new RelationshipNotFoundError(RelType.CompanyHasPrimeImage, companyId, imageId)
        }

        await deleteSpecificRel(companyId, imageId, RelType.CompanyHasPrimeImage)
    },
}
