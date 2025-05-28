import {createNode} from "../db/images/createNode"
import {getNodeById} from "../db/images/getNodeById"
import {getAllNodesOfType} from "../db/images/getAllNodesOfType"
import {ImageNode} from "../types/images/ImageNode"
import {ImageNodeUserData} from "../types/images/ImageNodeUserData"

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
