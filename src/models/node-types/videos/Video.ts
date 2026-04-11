import {CreateVideoInput} from "./types/CreateVideoInput"
import {YouTubeFacade} from "../../../db/external/YouTubeFacade"
import {VideoNode} from "./types/VideoNode"
import {convertInputData} from "./create/convertInputData"
import {createNode} from "../../../db/node-types/videos/createNode"
import {convertDbNodeToModelNode} from "../convertDbNodeToModelNode"
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
import {deleteSpecificRel} from "../../relationships/deleteSpecificRel"
import {RelNotFoundError} from "../../types/RelNotFoundError"
import {deleteIncomingRel} from "../../relationships/deleteIncomingRel"
import {ModelNodeType} from "../../types/ModelNodeType"
import {YouTubeVideoNotFoundError} from "../../types/YouTubeVideoNotFoundError"
import {YouTubeVideoAlreadyExistsError} from "../../types/YouTubeVideoAlreadyExistsError"
import {videoAlreadyExists} from "./create/videoAlreadyExists"

export const Video = {
    async create(data: CreateVideoInput): Promise<VideoNode> {
        const id = data.external_id

        if (await videoAlreadyExists(id)) {
            throw new YouTubeVideoAlreadyExistsError(id)
        }

        try {
            const youTubeVideo = await YouTubeFacade.getVideoById(id)
            const input = convertInputData(Object.assign({}, data, youTubeVideo))
            const result = await createNode(input)

            return convertDbNodeToModelNode(result) as VideoNode
        } catch (e) {
            console.error(e)
            throw new YouTubeVideoNotFoundError(id)
        }
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

    async deleteBelongsToNodeRelationship(videoId: number, nodeId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await Video.findById(videoId)
        await Node.findById(nodeId)

        const relationship = await getSpecificRel(videoId, nodeId, RelType.VideoBelongsToNode)
        if (!relationship) {
            throw new RelNotFoundError(RelType.VideoBelongsToNode, videoId, nodeId)
        }

        await deleteSpecificRel(videoId, nodeId, RelType.VideoBelongsToNode)
    },

    async createIsMainVideoOfNodeRelationship(videoId: number, nodeId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await Video.findById(videoId)
        await Node.findById(nodeId)

        const existingRelation = await getSpecificRel(videoId, nodeId, RelType.VideoIsMainVideoOfNode)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.VideoIsMainVideoOfNode, videoId, nodeId)
        }

        await deleteIncomingRel(nodeId, RelType.VideoIsMainVideoOfNode, ModelNodeType.Video)

        const createdRelationship = await createRel(videoId, nodeId, RelType.VideoIsMainVideoOfNode)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getAllIsMainVideoOfNodeRelationships(videoId: number) {
        // checking that the node exists -> exception is thrown if not
        await Video.findById(videoId)

        return getAllRels(videoId, RelType.VideoIsMainVideoOfNode)
    },

    async deleteIsMainVideoOfNodeRelationship(videoId: number, nodeId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await Video.findById(videoId)
        await Node.findById(nodeId)

        const relationship = await getSpecificRel(videoId, nodeId, RelType.VideoIsMainVideoOfNode)
        if (!relationship) {
            throw new RelNotFoundError(RelType.VideoIsMainVideoOfNode, videoId, nodeId)
        }

        await deleteSpecificRel(videoId, nodeId, RelType.VideoIsMainVideoOfNode)
    },
}
