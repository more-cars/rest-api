import {CreateVideoInput} from "./types/CreateVideoInput"
import {VideoNode} from "./types/VideoNode"
import {convertInputData} from "./create/convertInputData"
import {createNode} from "../../../db/node-types/videos/createNode"
import {convertDbNodeToModelNode} from "../convertDbNodeToModelNode"
import type {CreateVideoGeneratedInput} from "./create/CreateVideoGeneratedInput"
import {getNodeById} from "../../../db/node-types/videos/getNodeById"
import {NodeNotFoundError} from "../../types/NodeNotFoundError"
import {getAllNodesOfType} from "../../../db/node-types/videos/getAllNodesOfType"
import type {NodeCollectionConstraints} from "../../types/NodeCollectionConstraints"

export const Video = {
    async create(data: CreateVideoInput): Promise<VideoNode> {
        const generatedData = getGeneratedData()
        const input = convertInputData(Object.assign(data, generatedData))
        const result = await createNode(input)

        return convertDbNodeToModelNode(result) as VideoNode
    },

    async findById(id: number): Promise<VideoNode> {
        const node = await getNodeById(id)

        if (!node) {
            throw new NodeNotFoundError(id)
        }

        return convertDbNodeToModelNode(node) as VideoNode
    },

    async findAll(options: NodeCollectionConstraints = {}): Promise<VideoNode[]> {
        const nodes: VideoNode[] = []
        const nodesDb = await getAllNodesOfType(options)

        nodesDb.forEach(node => {
            nodes.push(convertDbNodeToModelNode(node) as VideoNode)
        })

        return nodes
    },
}

/**
 * TEMPORARY solution until the youtube importer is implemented
 */
function getGeneratedData(): CreateVideoGeneratedInput {
    return {
        title: 'DUMMY',
        description: 'DUMMY',
        creator: 'DUMMY',
        license: 'DUMMY',
        tags: 'DUMMY',
        source: 'DUMMY',
        duration: 'DUMMY',
        thumbnail_url_l: 'DUMMY',
        thumbnail_url_m: 'DUMMY',
        thumbnail_url_s: 'DUMMY',
        thumbnail_url_xs: 'DUMMY',
    } satisfies CreateVideoGeneratedInput
}