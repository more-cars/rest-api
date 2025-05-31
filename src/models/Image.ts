import {createNode} from "../db/images/createNode"
import {getNodeById} from "../db/images/getNodeById"
import {getNodeById as getAnyNodeById} from "../db/getNodeById"
import {getAllNodesOfType} from "../db/images/getAllNodesOfType"
import {ImageNode} from "../types/images/ImageNode"
import {ImageNodeUserData} from "../types/images/ImageNodeUserData"
import {getImageBelongsToNodeRelationship} from "./relationships/getImageBelongsToNodeRelationship"
import {ImageBelongsToNodeRelationship} from "../types/images/ImageBelongsToNodeRelationship"
import {createImageBelongsToNodeRelationship} from "./relationships/createImageBelongsToNodeRelationship"

export class Image {
    static async create(data: ImageNodeUserData): Promise<ImageNode> {
        const completeData = addDummyData(data)

        return await createNode(completeData)
    }

    static async findById(id: number): Promise<false | ImageNode> {
        return await getNodeById(id)
    }

    static async findAll(): Promise<ImageNode[]> {
        return await getAllNodesOfType()
    }

    static async createBelongsToNodeRelationship(
        imageId: number,
        partnerNodeId: number
    ): Promise<false | ImageBelongsToNodeRelationship> {
        if (imageId === partnerNodeId) {
            throw new Error(`Image #${imageId} cannot be connected to itself`)
        }

        const imageNode = await getNodeById(imageId)
        const partnerNode = await getAnyNodeById(partnerNodeId)

        if (!imageNode || !partnerNode) {
            return false
        }

        if (await partnerNodeIsAnImage(partnerNodeId)) {
            throw new Error(`Image #${imageId} cannot be connected to another image`)
        }

        const existingRelation = await getImageBelongsToNodeRelationship(imageId, partnerNodeId)

        if (existingRelation) {
            return existingRelation
        }

        return await createImageBelongsToNodeRelationship(imageId, partnerNodeId)
    }

    static async getBelongsToNodeRelationship(imageId: number, partnerNodeId: number): Promise<false | ImageBelongsToNodeRelationship> {
        const imageNode = await getNodeById(imageId)
        const partnerNode = await getAnyNodeById(partnerNodeId)

        if (!imageNode || !partnerNode) {
            return false
        }

        return await getImageBelongsToNodeRelationship(imageId, partnerNodeId)
    }
}

/**
 * TEMPORARY solution until the flickr and wikimedia importer are implemented
 */
function addDummyData(data: ImageNodeUserData) {
    const additionalData = {
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

    return Object.assign(data, additionalData)
}

async function partnerNodeIsAnImage(nodeId: number): Promise<boolean> {
    return await getNodeById(nodeId) !== false
}
