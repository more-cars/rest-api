import {CreateCompanyInput} from "./types/CreateCompanyInput"
import {CompanyNode} from "./types/CompanyNode"
import {convertInputData} from "./create/convertInputData"
import {createNode} from "../../../db/node-types/companies/createNode"
import {convertDbNodeToModelNode} from "../convertDbNodeToModelNode"
import {getNodeById} from "../../../db/node-types/companies/getNodeById"
import type {NodeCollectionConstraints} from "../../types/NodeCollectionConstraints"
import {getAllNodesOfType} from "../../../db/node-types/companies/getAllNodesOfType"
import {deleteNode} from "../../../db/nodes/deleteNode"
import {Brand} from "../brands/Brand"
import {NodeNotFoundError} from "../../types/NodeNotFoundError"
import {RelAlreadyExistsError} from "../../types/RelAlreadyExistsError"
import {RelNotFoundError} from "../../types/RelNotFoundError"
import {Image} from "../images/Image"
import {getRel} from "../../relationships/getRel"
import {RelType} from "../../relationships/types/RelType"
import {deleteSpecificRel} from "../../relationships/deleteSpecificRel"
import {getSpecificRel} from "../../relationships/getSpecificRel"
import {createRel} from "../../relationships/createRel"
import {getAllRels} from "../../relationships/getAllRels"
import {deleteIncomingRel} from "../../relationships/deleteIncomingRel"
import {deleteOutgoingRel} from "../../relationships/deleteOutgoingRel"
import {Video} from "../videos/Video"

export const Company = {
    async create(data: CreateCompanyInput): Promise<CompanyNode> {
        const input = convertInputData(data)
        const result = await createNode(input)

        return convertDbNodeToModelNode(result) as CompanyNode
    },

    async findById(id: number): Promise<CompanyNode> {
        const node = await getNodeById(id)

        if (!node) {
            throw new NodeNotFoundError(id)
        }

        return convertDbNodeToModelNode(node) as CompanyNode
    },

    async findAll(options: NodeCollectionConstraints = {}): Promise<CompanyNode[]> {
        const nodes: CompanyNode[] = []
        const nodesDb = await getAllNodesOfType(options)

        nodesDb.forEach(node => {
            nodes.push(convertDbNodeToModelNode(node) as CompanyNode)
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

    async createHasBrandRelationship(companyId: number, brandId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await Company.findById(companyId)
        await Brand.findById(brandId)

        const existingRelationship = await getSpecificRel(companyId, brandId, RelType.CompanyHasBrand)
        if (existingRelationship) {
            throw new RelAlreadyExistsError(RelType.CompanyHasBrand, companyId, brandId)
        }

        await deleteIncomingRel(brandId, RelType.CompanyHasBrand)

        const createdRelationship = await createRel(companyId, brandId, RelType.CompanyHasBrand)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getAllHasBrandRelationships(companyId: number) {
        // checking that the node exists -> exception is thrown if not
        await Company.findById(companyId)

        return getAllRels(companyId, RelType.CompanyHasBrand)
    },

    async deleteHasBrandRelationship(companyId: number, brandId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await Company.findById(companyId)
        await Brand.findById(brandId)

        const relationship = await getSpecificRel(companyId, brandId, RelType.CompanyHasBrand)
        if (!relationship) {
            throw new RelNotFoundError(RelType.CompanyHasBrand, companyId, brandId)
        }

        await deleteSpecificRel(companyId, brandId, RelType.CompanyHasBrand)
    },

    async createHasImageRelationship(companyId: number, imageId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await Company.findById(companyId)
        await Image.findById(imageId)

        const existingRelationship = await getSpecificRel(companyId, imageId, RelType.CompanyHasImage)
        if (existingRelationship) {
            throw new RelAlreadyExistsError(RelType.CompanyHasImage, companyId, imageId)
        }

        const createdRelationship = await createRel(companyId, imageId, RelType.CompanyHasImage)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getAllHasImageRelationships(companyId: number) {
        // checking that the node exists -> exception is thrown if not
        await Company.findById(companyId)

        return getAllRels(companyId, RelType.CompanyHasImage)
    },

    async deleteHasImageRelationship(companyId: number, imageId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await Company.findById(companyId)
        await Image.findById(imageId)

        const relationship = await getSpecificRel(companyId, imageId, RelType.CompanyHasImage)
        if (!relationship) {
            throw new RelNotFoundError(RelType.CompanyHasImage, companyId, imageId)
        }

        await deleteSpecificRel(companyId, imageId, RelType.CompanyHasImage)
    },

    async createHasPrimeImageRelationship(companyId: number, imageId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await Company.findById(companyId)
        await Image.findById(imageId)

        const existingRelationship = await getSpecificRel(companyId, imageId, RelType.CompanyHasPrimeImage)
        if (existingRelationship) {
            throw new RelAlreadyExistsError(RelType.CompanyHasPrimeImage, companyId, imageId)
        }

        await deleteOutgoingRel(companyId, RelType.CompanyHasPrimeImage)

        const createdRelationship = await createRel(companyId, imageId, RelType.CompanyHasPrimeImage)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getHasPrimeImageRelationship(companyId: number) {
        // checking that the node exists -> exception is thrown if not
        await Company.findById(companyId)

        const relationship = await getRel(companyId, RelType.CompanyHasPrimeImage)
        if (!relationship) {
            throw new RelNotFoundError(RelType.CompanyHasPrimeImage, companyId, null)
        }

        return relationship
    },

    async deleteHasPrimeImageRelationship(companyId: number, imageId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await Company.findById(companyId)
        await Image.findById(imageId)

        const relationship = await getSpecificRel(companyId, imageId, RelType.CompanyHasPrimeImage)
        if (!relationship) {
            throw new RelNotFoundError(RelType.CompanyHasPrimeImage, companyId, imageId)
        }

        await deleteSpecificRel(companyId, imageId, RelType.CompanyHasPrimeImage)
    },

    async createHasVideoRelationship(companyId: number, videoId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await Company.findById(companyId)
        await Video.findById(videoId)

        const existingRelation = await getSpecificRel(companyId, videoId, RelType.CompanyHasVideo)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.CompanyHasVideo, companyId, videoId)
        }

        const createdRelationship = await createRel(companyId, videoId, RelType.CompanyHasVideo)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getAllHasVideoRelationships(companyId: number) {
        // checking that the node exists -> exception is thrown if not
        await Company.findById(companyId)

        return getAllRels(companyId, RelType.CompanyHasVideo)
    },

    async deleteHasVideoRelationship(companyId: number, videoId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await Company.findById(companyId)
        await Video.findById(videoId)

        const relationship = await getSpecificRel(companyId, videoId, RelType.CompanyHasVideo)
        if (!relationship) {
            throw new RelNotFoundError(RelType.CompanyHasVideo, companyId, videoId)
        }

        await deleteSpecificRel(companyId, videoId, RelType.CompanyHasVideo)
    },

    async createHasMainVideoRelationship(companyId: number, videoId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await Company.findById(companyId)
        await Video.findById(videoId)

        const existingRelation = await getSpecificRel(companyId, videoId, RelType.CompanyHasMainVideo)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.CompanyHasMainVideo, companyId, videoId)
        }
        await deleteOutgoingRel(companyId, RelType.CompanyHasMainVideo)

        const createdRelationship = await createRel(companyId, videoId, RelType.CompanyHasMainVideo)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getHasMainVideoRelationship(companyId: number) {
        // checking that the node exists -> exception is thrown if not
        await Company.findById(companyId)

        const relationship = await getRel(companyId, RelType.CompanyHasMainVideo)
        if (!relationship) {
            throw new RelNotFoundError(RelType.CompanyHasMainVideo, companyId, null)
        }

        return relationship
    },

    async deleteHasMainVideoRelationship(companyId: number, videoId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await Company.findById(companyId)
        await Video.findById(videoId)

        const relationship = await getSpecificRel(companyId, videoId, RelType.CompanyHasMainVideo)
        if (!relationship) {
            throw new RelNotFoundError(RelType.CompanyHasMainVideo, companyId, videoId)
        }

        await deleteSpecificRel(companyId, videoId, RelType.CompanyHasMainVideo)
    },
}
