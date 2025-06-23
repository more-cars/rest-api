import {ImageNode} from "./types/ImageNode"
import {CreateImageInput} from "./types/CreateImageInput"
import {CreateImageGeneratedInput} from "./types/CreateImageGeneratedInput"
import {convertInputData} from "./create/convertInputData"
import {createNode} from "../../db/nodes/images/createNode"
import {convertOutputData} from "./create/convertOutputData"
import {getNodeById} from "../../db/nodes/images/getNodeById"
import {getNodeById as getAnyNodeById} from "../../db/nodes/getNodeById"
import {getAllNodesOfType} from "../../db/nodes/images/getAllNodesOfType"
import {ImageBelongsToNodeRelationship} from "../../types/images/ImageBelongsToNodeRelationship"
import {getImageBelongsToNodeRelationship} from "./getImageBelongsToNodeRelationship"
import {createImageBelongsToNodeRelationship} from "./createImageBelongsToNodeRelationship"
import {getRelationships} from "../../db/nodes/images/getRelationships"

export class Image {
    static async create(data: CreateImageInput): Promise<ImageNode> {
        const generatedData = getGeneratedData()
        const input = convertInputData(Object.assign(data, generatedData))
        const result = await createNode(input)
        const output = convertOutputData(result)

        return output
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
        if (imageId === partnerNodeId) {
            throw new Error(`A relationship between the image #${imageId} and itself cannot exist`)
        }

        const imageNode = await getNodeById(imageId)
        const partnerNode = await getAnyNodeById(partnerNodeId)

        if (!imageNode || !partnerNode) {
            return false
        }

        return await getImageBelongsToNodeRelationship(imageId, partnerNodeId)
    }

    static async getBelongsToNodeRelationships(imageId: number): Promise<false | Array<ImageBelongsToNodeRelationship>> {
        if (!await getNodeById(imageId)) {
            return false
        }

        return await getRelationships(imageId)
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
