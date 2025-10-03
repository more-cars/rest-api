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
import {deleteHasPrimeImageRelationships} from "./deleteHasPrimeImageRelationships"
import {Image} from "../images/Image"
import {getSpecificHasPrimeImageRelationship} from "./getSpecificHasPrimeImageRelationship"
import type {CompanyHasPrimeImageRelationship} from "./types/CompanyHasPrimeImageRelationship"
import {getHasPrimeImageRelationship} from "./getHasPrimeImageRelationship"
import {getAllHasBrandRelationships} from "./getAllHasBrandRelationships"
import {deleteHasBrandRelationship} from "./deleteHasBrandRelationship"
import {deleteHasPrimeImageRelationship} from "./deleteHasPrimeImageRelationship"
import {createHasImageRelationship} from "./createHasImageRelationship"
import {getSpecificHasImageRelationship} from "./getSpecificHasImageRelationship"
import type {CompanyHasImageRelationship} from "./types/CompanyHasImageRelationship"
import {getAllHasImageRelationships} from "./getAllHasImageRelationships"
import {deleteHasImageRelationship} from "./deleteHasImageRelationship"

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

    static async delete(id: number): Promise<boolean> {
        return await deleteNode(id)
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

        const existingRelation = await getSpecificHasBrandRelationship(companyId, brandId)
        if (existingRelation) {
            throw new RelationshipAlreadyExistsError(CompanyRelationship.hasBrand, companyId, brandId)
        }

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

        return await getAllHasBrandRelationships(companyId)
    }

    static async deleteHasBrandRelationship(companyId: number, brandId: number) {
        const company = await Company.findById(companyId)
        if (!company) {
            throw new NodeNotFoundError(companyId)
        }

        const brand = await Brand.findById(brandId)
        if (!brand) {
            throw new NodeNotFoundError(brandId)
        }

        const relation = await getSpecificHasBrandRelationship(companyId, brandId)
        if (!relation) {
            throw new RelationshipNotFoundError('has brand', companyId, brandId)
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

        const existingRelation = await getSpecificHasImageRelationship(companyId, imageId)
        if (existingRelation) {
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

        return await getAllHasImageRelationships(companyId)
    }

    static async deleteHasImageRelationship(companyId: number, imageId: number) {
        const company = await Company.findById(companyId)
        if (!company) {
            throw new NodeNotFoundError(companyId)
        }

        const image = await Image.findById(imageId)
        if (!image) {
            throw new NodeNotFoundError(imageId)
        }

        const relation = await getSpecificHasImageRelationship(companyId, imageId)
        if (!relation) {
            throw new RelationshipNotFoundError('has image', companyId, imageId)
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

        const existingRelation = await getSpecificHasPrimeImageRelationship(companyId, imageId)
        if (existingRelation) {
            throw new RelationshipAlreadyExistsError(CompanyRelationship.hasPrimeImage, companyId, imageId)
        }

        await deleteHasPrimeImageRelationships(companyId)

        const createdRelationship = await createHasPrimeImageRelationship(companyId, imageId)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    }

    static async getHasPrimeImageRelationship(companyId: number): Promise<CompanyHasPrimeImageRelationship> {
        const company = await Company.findById(companyId)
        if (!company) {
            throw new NodeNotFoundError(companyId)
        }

        const relation = await getHasPrimeImageRelationship(companyId)
        if (!relation) {
            throw new RelationshipNotFoundError('has prime image', companyId, null)
        }

        return relation
    }

    static async deleteHasPrimeImageRelationship(companyId: number, imageId: number) {
        const company = await Company.findById(companyId)
        if (!company) {
            throw new NodeNotFoundError(companyId)
        }

        const image = await Image.findById(imageId)
        if (!image) {
            throw new NodeNotFoundError(imageId)
        }

        const relation = await getSpecificHasPrimeImageRelationship(companyId, imageId)
        if (!relation) {
            throw new RelationshipNotFoundError('has prime image', companyId, imageId)
        }

        await deleteHasPrimeImageRelationship(companyId, imageId)
    }
}
