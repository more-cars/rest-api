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
import {deleteNode} from "../../../db/nodes/deleteNode"
import {Node} from "../../Node"
import {createRel} from "../../relationships/createRel"
import {getSpecificRel} from "../../relationships/getSpecificRel"
import {RelAlreadyExistsError} from "../../types/RelAlreadyExistsError"
import {RelType} from "../../relationships/types/RelType"
import {getAllRels} from "../../relationships/getAllRels"

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

    async delete(id: number): Promise<void> {
        const node = await getNodeById(id)

        if (!node) {
            throw new NodeNotFoundError(id)
        }

        await deleteNode(id)
    },

    async createBelongsToNodeRelationship(videoId: number, nodeId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await Video.findById(videoId)
        await Node.findById(nodeId)

        const existingRelation = await getSpecificRel(videoId, nodeId, RelType.VideoBelongsToNode)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.VideoBelongsToNode, videoId, nodeId)
        }


        const createdRelationship = await createRel(videoId, nodeId, RelType.VideoBelongsToNode)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getAllBelongsToNodeRelationships(videoId: number) {
        // checking that the node exists -> exception is thrown if not
        await Video.findById(videoId)

        return getAllRels(videoId, RelType.VideoBelongsToNode)
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