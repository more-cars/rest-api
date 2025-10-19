import {ImageNode} from "./types/ImageNode"
import {CreateImageInput} from "./types/CreateImageInput"
import {CreateImageGeneratedInput} from "./types/CreateImageGeneratedInput"
import {convertInputData} from "./create/convertInputData"
import {createNode} from "../../db/nodes/images/createNode"
import {convertOutputData} from "./create/convertOutputData"
import {getNodeById} from "../../db/nodes/images/getNodeById"
import {getNodeById as getAnyNodeById} from "../../db/nodes/getNodeById"
import type {NodeCollectionConstraints} from "../types/NodeCollectionConstraints"
import {getAllNodesOfType} from "../../db/nodes/images/getAllNodesOfType"
import {deleteNode} from "../../db/nodes/deleteNode"
import type {ImageBelongsToNodeTypeRelationships} from "./types/ImageBelongsToNodeTypeRelationships"
import {getBelongsToNodeTypeRelationships} from "../../db/nodes/images/getBelongsToNodeTypeRelationships"
import {NodeNotFoundError} from "../types/NodeNotFoundError"
import {SemanticError} from "../types/SemanticError"
import {RelationshipAlreadyExistsError} from "../types/RelationshipAlreadyExistsError"
import {ImageRelationship} from "./types/ImageRelationship"
import {RelationshipNotFoundError} from "../types/RelationshipNotFoundError"
import {Node} from "../Node"
import {getSpecificRel} from "../relationships/getSpecificRel"
import {deleteSpecificRel} from "../relationships/deleteSpecificRel"
import {RelationshipType} from "../relationships/types/RelationshipType"
import {createRel} from "../relationships/createRel"
import {getAllRels} from "../relationships/getAllRels"

export class Image {
    static async create(data: CreateImageInput): Promise<ImageNode> {
        const generatedData = getGeneratedData()
        const input = convertInputData(Object.assign(data, generatedData))
        const result = await createNode(input)
        const output = convertOutputData(result)

        return output
    }

    static async findById(id: number): Promise<false | ImageNode> {
        const node = await getNodeById(id)

        if (!node) {
            return false
        }

        return convertOutputData(node)
    }

    static async findAll(options: NodeCollectionConstraints = {}): Promise<ImageNode[]> {
        const nodes: Array<ImageNode> = []
        const nodesDb = await getAllNodesOfType(options)

        nodesDb.forEach(node => {
            nodes.push(convertOutputData(node))
        })

        return nodes
    }

    static async delete(imageId: number): Promise<void> {
        const node = await Image.findById(imageId)
        if (!node) {
            throw new NodeNotFoundError(imageId)
        }

        await deleteNode(imageId)
    }

    static async createBelongsToNodeRelationship(imageId: number, partnerId: number) {
        if (imageId === partnerId) {
            throw new SemanticError(`Image #${imageId} cannot be connected to itself`)
        }

        const image = await getNodeById(imageId)
        if (!image) {
            throw new NodeNotFoundError(imageId)
        }

        const partner = await getAnyNodeById(partnerId)
        if (!partner) {
            throw new NodeNotFoundError(partnerId)
        }

        if (await partnerNodeIsAnImage(partnerId)) {
            throw new SemanticError(`Image #${imageId} cannot be connected to another image`)
        }

        const existingRelationship = await getSpecificRel(imageId, partnerId, RelationshipType.ImageBelongsToNode)
        if (existingRelationship) {
            throw new RelationshipAlreadyExistsError(ImageRelationship.belongsToNode, imageId, partnerId)
        }

        const createdRelationship = await createRel(imageId, partnerId, RelationshipType.ImageBelongsToNode)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    }

    static async getSpecificBelongsToNodeRelationship(imageId: number, partnerId: number) {
        const image = await getNodeById(imageId)
        if (!image) {
            throw new NodeNotFoundError(imageId)
        }

        const partner = await getAnyNodeById(partnerId)
        if (!partner) {
            throw new NodeNotFoundError(partnerId)
        }

        const relationship = await getSpecificRel(imageId, partnerId, RelationshipType.ImageBelongsToNode)
        if (!relationship) {
            throw new RelationshipNotFoundError(ImageRelationship.belongsToNode, imageId, partnerId)
        }

        return relationship
    }

    static async getAllBelongsToNodeRelationships(imageId: number) {
        const image = await Image.findById(imageId)
        if (!image) {
            throw new NodeNotFoundError(imageId)
        }

        return getAllRels(imageId, RelationshipType.ImageBelongsToNode)
    }

    static async deleteBelongsToNodeRelationship(imageId: number, partnerNodeId: number) {
        const image = await Image.findById(imageId)
        if (!image) {
            throw new NodeNotFoundError(imageId)
        }

        const partnerNode = await Node.findById(partnerNodeId)
        if (!partnerNode) {
            throw new NodeNotFoundError(partnerNodeId)
        }

        const relationship = await getSpecificRel(imageId, partnerNodeId, RelationshipType.ImageBelongsToNode)
        if (!relationship) {
            throw new RelationshipNotFoundError(ImageRelationship.belongsToNode, imageId, partnerNodeId)
        }

        await deleteSpecificRel(imageId, partnerNodeId, RelationshipType.ImageBelongsToNode)
    }

    static async getBelongsToNodeTypeRelationships(imageId: number): Promise<false | ImageBelongsToNodeTypeRelationships> {
        if (!await getNodeById(imageId)) {
            return false
        }

        return await getBelongsToNodeTypeRelationships(imageId)
    }
}

/**
 * TEMPORARY solution until the flickr and wikimedia importer are implemented
 */
function getGeneratedData(): CreateImageGeneratedInput {
    const generatedData: CreateImageGeneratedInput = {
        name: "DUMMY",
        description: "DUMMY",
        creator: "DUMMY",
        license: "DUMMY",
        tags: "DUMMY",
        source: "DUMMY",
        image_url_original: "DUMMY",
        image_url_xxl: "DUMMY",
        image_url_xl: "DUMMY",
        image_url_l: "DUMMY",
        image_url_m: "DUMMY",
        image_url_s: "DUMMY",
        image_url_xs: "DUMMY",
    }

    return generatedData
}

async function partnerNodeIsAnImage(nodeId: number): Promise<boolean> {
    return await getNodeById(nodeId) !== false
}
