import {CreateCompanyInput} from "./types/CreateCompanyInput"
import {CompanyNode} from "./types/CompanyNode"
import {convertInputData} from "./create/convertInputData"
import {createNode} from "../../db/nodes/companies/createNode"
import {convertOutputData} from "./create/convertOutputData"
import {getNodeById} from "../../db/nodes/companies/getNodeById"
import type {NodeCollectionConstraints} from "../types/NodeCollectionConstraints"
import {getAllNodesOfType} from "../../db/nodes/companies/getAllNodesOfType"
import {deleteNode} from "../../db/nodes/deleteNode"
import {createHasBrandRelationship} from "./createHasBrandRelationship"
import {Brand} from "../brands/Brand"
import {getSpecificHasBrandRelationship} from "./getSpecificHasBrandRelationship"
import {NodeNotFoundError} from "../types/NodeNotFoundError"
import {RelationshipAlreadyExistsError} from "../types/RelationshipAlreadyExistsError"
import type {CompanyHasBrandRelationship} from "./types/CompanyHasBrandRelationship"
import {CompanyRelationship} from "./types/CompanyRelationship"
import {createHasPrimeImageRelationship} from "./createHasPrimeImageRelationship"
import {RelationshipNotFoundError} from "../types/RelationshipNotFoundError"
import {Image} from "../images/Image"
import {getSpecificHasPrimeImageRelationship} from "./getSpecificHasPrimeImageRelationship"
import type {CompanyHasPrimeImageRelationship} from "./types/CompanyHasPrimeImageRelationship"
import {getRelationship} from "../relationships/getRelationship"
import {getAllHasBrandRelationships} from "./getAllHasBrandRelationships"
import {deleteHasBrandRelationship} from "./deleteHasBrandRelationship"
import {deleteHasPrimeImageRelationship} from "./deleteHasPrimeImageRelationship"
import {createHasImageRelationship} from "./createHasImageRelationship"
import {getSpecificHasImageRelationship} from "./getSpecificHasImageRelationship"
import type {CompanyHasImageRelationship} from "./types/CompanyHasImageRelationship"
import {getAllHasImageRelationships} from "./getAllHasImageRelationships"
import {deleteHasImageRelationship} from "./deleteHasImageRelationship"
import {deleteDeprecatedRelationship} from "../relationships/deleteDeprecatedRelationship"
import {DbRelationship} from "../../db/types/DbRelationship"
import {RelationshipType} from "../relationships/types/RelationshipType"

export class Company {
    static async create(data: CreateCompanyInput): Promise<CompanyNode> {
        const input = convertInputData(data)
        const result = await createNode(input)
        const output = convertOutputData(result)

        return output
    }

    static async findById(id: number): Promise<false | CompanyNode> {
        const node = await getNodeById(id)

        if (!node) {
            return false
        }

        return convertOutputData(node)
    }

    static async findAll(options: NodeCollectionConstraints = {}): Promise<CompanyNode[]> {
        const nodes: Array<CompanyNode> = []
        const nodesDb = await getAllNodesOfType(options)

        nodesDb.forEach(node => {
            nodes.push(convertOutputData(node))
        })

        return nodes
    }

    static async delete(companyId: number): Promise<void> {
        const node = await Company.findById(companyId)
        if (!node) {
            throw new NodeNotFoundError(companyId)
        }

        await deleteNode(companyId)
    }

    static async createHasBrandRelationship(companyId: number, brandId: number): Promise<CompanyHasBrandRelationship> {
        const company = await Company.findById(companyId)
        if (!company) {
            throw new NodeNotFoundError(companyId)
        }

        const brand = await Brand.findById(brandId)
        if (!brand) {
            throw new NodeNotFoundError(brandId)
        }

        const existingRelationship = await getSpecificHasBrandRelationship(companyId, brandId)
        if (existingRelationship) {
            throw new RelationshipAlreadyExistsError(CompanyRelationship.hasBrand, companyId, brandId)
        }

        await deleteDeprecatedRelationship(brandId, DbRelationship.CompanyHasBrand)

        const createdRelationship = await createHasBrandRelationship(companyId, brandId)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    }

    static async getAllHasBrandRelationships(companyId: number): Promise<Array<CompanyHasBrandRelationship>> {
        const company = await Company.findById(companyId)
        if (!company) {
            throw new NodeNotFoundError(companyId)
        }

        return getAllHasBrandRelationships(companyId)
    }

    static async deleteHasBrandRelationship(companyId: number, brandId: number): Promise<void> {
        const company = await Company.findById(companyId)
        if (!company) {
            throw new NodeNotFoundError(companyId)
        }

        const brand = await Brand.findById(brandId)
        if (!brand) {
            throw new NodeNotFoundError(brandId)
        }

        const relationship = await getSpecificHasBrandRelationship(companyId, brandId)
        if (!relationship) {
            throw new RelationshipNotFoundError(CompanyRelationship.hasBrand, companyId, brandId)
        }

        await deleteHasBrandRelationship(companyId, brandId)
    }

    static async createHasImageRelationship(companyId: number, imageId: number): Promise<CompanyHasImageRelationship> {
        const company = await Company.findById(companyId)
        if (!company) {
            throw new NodeNotFoundError(companyId)
        }

        const image = await Image.findById(imageId)
        if (!image) {
            throw new NodeNotFoundError(imageId)
        }

        const existingRelationship = await getSpecificHasImageRelationship(companyId, imageId)
        if (existingRelationship) {
            throw new RelationshipAlreadyExistsError(CompanyRelationship.hasImage, companyId, imageId)
        }

        const createdRelationship = await createHasImageRelationship(companyId, imageId)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    }

    static async getAllHasImageRelationships(companyId: number): Promise<Array<CompanyHasImageRelationship>> {
        const company = await Company.findById(companyId)
        if (!company) {
            throw new NodeNotFoundError(companyId)
        }

        return getAllHasImageRelationships(companyId)
    }

    static async deleteHasImageRelationship(companyId: number, imageId: number): Promise<void> {
        const company = await Company.findById(companyId)
        if (!company) {
            throw new NodeNotFoundError(companyId)
        }

        const image = await Image.findById(imageId)
        if (!image) {
            throw new NodeNotFoundError(imageId)
        }

        const relationship = await getSpecificHasImageRelationship(companyId, imageId)
        if (!relationship) {
            throw new RelationshipNotFoundError(CompanyRelationship.hasImage, companyId, imageId)
        }

        await deleteHasImageRelationship(companyId, imageId)
    }

    static async createHasPrimeImageRelationship(companyId: number, imageId: number): Promise<CompanyHasPrimeImageRelationship> {
        const company = await Company.findById(companyId)
        if (!company) {
            throw new NodeNotFoundError(companyId)
        }

        const image = await Image.findById(imageId)
        if (!image) {
            throw new NodeNotFoundError(imageId)
        }

        const existingRelationship = await getSpecificHasPrimeImageRelationship(companyId, imageId)
        if (existingRelationship) {
            throw new RelationshipAlreadyExistsError(CompanyRelationship.hasPrimeImage, companyId, imageId)
        }

        await deleteDeprecatedRelationship(companyId, DbRelationship.CompanyHasPrimeImage)

        const createdRelationship = await createHasPrimeImageRelationship(companyId, imageId)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    }

    static async getHasPrimeImageRelationship(companyId: number) {
        const company = await Company.findById(companyId)
        if (!company) {
            throw new NodeNotFoundError(companyId)
        }

        const relationship = await getRelationship(companyId, RelationshipType.CompanyHasPrimeImage)
        if (!relationship) {
            throw new RelationshipNotFoundError(CompanyRelationship.hasPrimeImage, companyId, null)
        }

        return relationship
    }

    static async deleteHasPrimeImageRelationship(companyId: number, imageId: number): Promise<void> {
        const company = await Company.findById(companyId)
        if (!company) {
            throw new NodeNotFoundError(companyId)
        }

        const image = await Image.findById(imageId)
        if (!image) {
            throw new NodeNotFoundError(imageId)
        }

        const relationship = await getSpecificHasPrimeImageRelationship(companyId, imageId)
        if (!relationship) {
            throw new RelationshipNotFoundError(CompanyRelationship.hasPrimeImage, companyId, imageId)
        }

        await deleteHasPrimeImageRelationship(companyId, imageId)
    }
}
