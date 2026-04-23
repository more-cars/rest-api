import {BrandNode} from "./types/BrandNode"
import {CreateBrandInput} from "./types/CreateBrandInput"
import {convertInputData} from "./create/convertInputData"
import {createNeo4jNode} from "../../../db/nodes/createNeo4jNode"
import {convertDbNodeToModelNode} from "../convertDbNodeToModelNode"
import {getNodeById} from "../../../db/node-types/brands/getNodeById"
import type {NodeCollectionConstraints} from "../../types/NodeCollectionConstraints"
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
import {deleteIncomingRel} from "../../relationships/deleteIncomingRel"
import {deleteOutgoingRel} from "../../relationships/deleteOutgoingRel"
import {Video} from "../videos/Video"
import {fetchNodesFromDb} from "../../../db/nodes/fetchNodesFromDb"
import {DbNodeType} from "../../../db/types/DbNodeType"
import {getDbQueryCollectionParams} from "../../../db/nodes/getDbQueryCollectionParams"

export const Brand = {
    async create(data: CreateBrandInput): Promise<BrandNode> {
        const input = convertInputData(data)
        const result = await createNeo4jNode(DbNodeType.Brand, input)

        return convertDbNodeToModelNode(result) as BrandNode
    },

    async findById(id: number): Promise<BrandNode> {
        const node = await getNodeById(id)

        if (!node) {
            throw new NodeNotFoundError(id)
        }

        return convertDbNodeToModelNode(node) as BrandNode
    },

    async findAll(options: NodeCollectionConstraints = {}): Promise<BrandNode[]> {
        const nodes: BrandNode[] = []
        const nodesDb = await fetchNodesFromDb(DbNodeType.Brand, getDbQueryCollectionParams(options))

        nodesDb.forEach(node => {
            nodes.push(convertDbNodeToModelNode(node) as BrandNode)
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

    async createBelongsToCompanyRelationship(brandId: number, companyId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await Brand.findById(brandId)
        await Company.findById(companyId)

        const existingRelation = await getSpecificRel(brandId, companyId, RelType.BrandBelongsToCompany)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.BrandBelongsToCompany, brandId, companyId)
        }

        await deleteOutgoingRel(brandId, RelType.BrandBelongsToCompany)

        const createdRelationship = await createRel(brandId, companyId, RelType.BrandBelongsToCompany)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getBelongsToCompanyRelationship(brandId: number) {
        // checking that the node exists -> exception is thrown if not
        await Brand.findById(brandId)

        const relationship = await getRel(brandId, RelType.BrandBelongsToCompany)
        if (!relationship) {
            throw new RelNotFoundError(RelType.BrandBelongsToCompany, brandId, null)
        }

        return relationship
    },

    async deleteBelongsToCompanyRelationship(brandId: number, companyId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await Brand.findById(brandId)
        await Company.findById(companyId)

        const relationship = await getSpecificRel(brandId, companyId, RelType.BrandBelongsToCompany)
        if (!relationship) {
            throw new RelNotFoundError(RelType.BrandBelongsToCompany, brandId, companyId)
        }

        await deleteSpecificRel(brandId, companyId, RelType.BrandBelongsToCompany)
    },

    async createHasCarModelRelationship(brandId: number, carModelId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await Brand.findById(brandId)
        await CarModel.findById(carModelId)

        const existingRelationship = await getSpecificRel(brandId, carModelId, RelType.BrandHasCarModel)
        if (existingRelationship) {
            throw new RelAlreadyExistsError(RelType.BrandHasCarModel, brandId, carModelId)
        }

        await deleteIncomingRel(carModelId, RelType.BrandHasCarModel)

        const createdRelationship = await createRel(brandId, carModelId, RelType.BrandHasCarModel)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getAllHasCarModelRelationships(brandId: number) {
        // checking that the node exists -> exception is thrown if not
        await Brand.findById(brandId)

        return getAllRels(brandId, RelType.BrandHasCarModel)
    },

    async deleteHasCarModelRelationship(brandId: number, carModelId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await Brand.findById(brandId)
        await CarModel.findById(carModelId)

        const relationship = await getSpecificRel(brandId, carModelId, RelType.BrandHasCarModel)
        if (!relationship) {
            throw new RelNotFoundError(RelType.BrandHasCarModel, brandId, carModelId)
        }

        await deleteSpecificRel(brandId, carModelId, RelType.BrandHasCarModel)
    },

    async createHasImageRelationship(brandId: number, imageId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await Brand.findById(brandId)
        await Image.findById(imageId)

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

    async getAllHasImageRelationships(brandId: number) {
        // checking that the node exists -> exception is thrown if not
        await Brand.findById(brandId)

        return getAllRels(brandId, RelType.BrandHasImage)
    },

    async deleteHasImageRelationship(brandId: number, imageId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await Brand.findById(brandId)
        await Image.findById(imageId)

        const relationship = await getSpecificRel(brandId, imageId, RelType.BrandHasImage)
        if (!relationship) {
            throw new RelNotFoundError(RelType.BrandHasImage, brandId, imageId)
        }

        await deleteSpecificRel(brandId, imageId, RelType.BrandHasImage)
    },

    async createHasPrimeImageRelationship(brandId: number, imageId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await Brand.findById(brandId)
        await Image.findById(imageId)

        const existingRelation = await getSpecificRel(brandId, imageId, RelType.BrandHasPrimeImage)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.BrandHasPrimeImage, brandId, imageId)
        }

        await deleteOutgoingRel(brandId, RelType.BrandHasPrimeImage)

        const createdRelationship = await createRel(brandId, imageId, RelType.BrandHasPrimeImage)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getHasPrimeImageRelationship(brandId: number) {
        // checking that the node exists -> exception is thrown if not
        await Brand.findById(brandId)

        const relationship = await getRel(brandId, RelType.BrandHasPrimeImage)
        if (!relationship) {
            throw new RelNotFoundError(RelType.BrandHasPrimeImage, brandId, null)
        }

        return relationship
    },

    async deleteHasPrimeImageRelationship(brandId: number, imageId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await Brand.findById(brandId)
        await Image.findById(imageId)

        const relationship = await getSpecificRel(brandId, imageId, RelType.BrandHasPrimeImage)
        if (!relationship) {
            throw new RelNotFoundError(RelType.BrandHasPrimeImage, brandId, imageId)
        }

        await deleteSpecificRel(brandId, imageId, RelType.BrandHasPrimeImage)
    },

    async createHasVideoRelationship(brandId: number, videoId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await Brand.findById(brandId)
        await Video.findById(videoId)

        const existingRelation = await getSpecificRel(brandId, videoId, RelType.BrandHasVideo)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.BrandHasVideo, brandId, videoId)
        }

        const createdRelationship = await createRel(brandId, videoId, RelType.BrandHasVideo)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getAllHasVideoRelationships(brandId: number) {
        // checking that the node exists -> exception is thrown if not
        await Brand.findById(brandId)

        return getAllRels(brandId, RelType.BrandHasVideo)
    },

    async deleteHasVideoRelationship(brandId: number, videoId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await Brand.findById(brandId)
        await Video.findById(videoId)

        const relationship = await getSpecificRel(brandId, videoId, RelType.BrandHasVideo)
        if (!relationship) {
            throw new RelNotFoundError(RelType.BrandHasVideo, brandId, videoId)
        }

        await deleteSpecificRel(brandId, videoId, RelType.BrandHasVideo)
    },

    async createHasMainVideoRelationship(brandId: number, videoId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await Brand.findById(brandId)
        await Video.findById(videoId)

        const existingRelation = await getSpecificRel(brandId, videoId, RelType.BrandHasMainVideo)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.BrandHasMainVideo, brandId, videoId)
        }
        await deleteOutgoingRel(brandId, RelType.BrandHasMainVideo)

        const createdRelationship = await createRel(brandId, videoId, RelType.BrandHasMainVideo)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getHasMainVideoRelationship(brandId: number) {
        // checking that the node exists -> exception is thrown if not
        await Brand.findById(brandId)

        const relationship = await getRel(brandId, RelType.BrandHasMainVideo)
        if (!relationship) {
            throw new RelNotFoundError(RelType.BrandHasMainVideo, brandId, null)
        }

        return relationship
    },

    async deleteHasMainVideoRelationship(brandId: number, videoId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await Brand.findById(brandId)
        await Video.findById(videoId)

        const relationship = await getSpecificRel(brandId, videoId, RelType.BrandHasMainVideo)
        if (!relationship) {
            throw new RelNotFoundError(RelType.BrandHasMainVideo, brandId, videoId)
        }

        await deleteSpecificRel(brandId, videoId, RelType.BrandHasMainVideo)
    },
}
