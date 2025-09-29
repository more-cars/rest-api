import {CreateCompanyInput} from "./types/CreateCompanyInput"
import {CompanyNode} from "./types/CompanyNode"
import {convertInputData} from "./create/convertInputData"
import {createNode} from "../../db/nodes/companies/createNode"
import {convertOutputData} from "./create/convertOutputData"
import {getNodeById} from "../../db/nodes/companies/getNodeById"
import {getAllNodesOfType} from "../../db/nodes/companies/getAllNodesOfType"
import {deleteNode} from "../../db/nodes/deleteNode"
import {createHasBrandRelationship} from "./createHasBrandRelationship"
import {Brand} from "../brands/Brand"
import {getHasBrandRelationship} from "./getHasBrandRelationship"
import {NodeNotFoundError} from "../types/NodeNotFoundError"
import {RelationshipAlreadyExistsError} from "../types/RelationshipAlreadyExistsError"
import type {CompanyHasBrandRelationship} from "./types/CompanyHasBrandRelationship"
import {CompanyRelationship} from "./types/CompanyRelationship"
import {createHasPrimeImageRelationship} from "./createHasPrimeImageRelationship"
import {deleteHasPrimeImageRelationships} from "./deleteHasPrimeImageRelationships"
import {Image} from "../images/Image"
import {getHasPrimeImageRelationship} from "./getHasPrimeImageRelationship"
import type {CompanyHasPrimeImageRelationship} from "./types/CompanyHasPrimeImageRelationship"

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

    static async findAll(): Promise<CompanyNode[]> {
        const nodes: Array<CompanyNode> = []
        const nodesDb = await getAllNodesOfType()

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

        const existingRelation = await getHasBrandRelationship(companyId, brandId)
        if (existingRelation) {
            throw new RelationshipAlreadyExistsError(CompanyRelationship.hasBrand, companyId, brandId)
        }

        const createdRelationship = await createHasBrandRelationship(companyId, brandId)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
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

        const existingRelation = await getHasPrimeImageRelationship(companyId, imageId)
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
}
