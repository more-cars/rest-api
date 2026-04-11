import {ImageNode} from "./types/ImageNode"
import {CreateImageInput} from "./types/CreateImageInput"
import {convertInputData} from "./create/convertInputData"
import {createNode} from "../../../db/node-types/images/createNode"
import {convertDbNodeToModelNode} from "../convertDbNodeToModelNode"
import {getNodeById} from "../../../db/node-types/images/getNodeById"
import type {NodeCollectionConstraints} from "../../types/NodeCollectionConstraints"
import {getAllNodesOfType} from "../../../db/node-types/images/getAllNodesOfType"
import {deleteNode} from "../../../db/nodes/deleteNode"
import {NodeNotFoundError} from "../../types/NodeNotFoundError"
import {SemanticError} from "../../types/SemanticError"
import {RelAlreadyExistsError} from "../../types/RelAlreadyExistsError"
import {RelNotFoundError} from "../../types/RelNotFoundError"
import {Node} from "../../Node"
import {getSpecificRel} from "../../relationships/getSpecificRel"
import {deleteSpecificRel} from "../../relationships/deleteSpecificRel"
import {RelType} from "../../relationships/types/RelType"
import {createRel} from "../../relationships/createRel"
import {getAllRels} from "../../relationships/getAllRels"
import {ModelNodeType} from "../../types/ModelNodeType"
import {deleteIncomingRel} from "../../relationships/deleteIncomingRel"
import type {ModelNode} from "../../types/ModelNode"
import {imageAlreadyExists} from "./create/imageAlreadyExists"
import {WikimediaImageAlreadyExistsError} from "../../types/WikimediaImageAlreadyExistsError"
import {WikimediaFacade} from "../../../db/external/WikimediaFacade"
import {WikimediaImageNotFoundError} from "../../types/WikimediaImageNotFoundError"

export const Image = {
    async create(data: CreateImageInput): Promise<ImageNode> {
        const id = data.external_id

        if (await imageAlreadyExists(id)) {
            throw new WikimediaImageAlreadyExistsError(id)
        }

        try {
            const wikimediaImage = await WikimediaFacade.getImageById(id)
            const input = convertInputData(Object.assign({}, data, wikimediaImage))
            const result = await createNode(input)

            return convertDbNodeToModelNode(result) as ImageNode
        } catch (e) {
            console.error(e)
            throw new WikimediaImageNotFoundError(id)
        }
    },

    async findById(id: number): Promise<ImageNode> {
        const node = await getNodeById(id)

        if (!node) {
            throw new NodeNotFoundError(id)
        }

        return convertDbNodeToModelNode(node) as ImageNode
    },

    async findAll(options: NodeCollectionConstraints = {}): Promise<ImageNode[]> {
        const nodes: ImageNode[] = []
        const nodesDb = await getAllNodesOfType(options)

        nodesDb.forEach(node => {
            nodes.push(convertDbNodeToModelNode(node) as ImageNode)
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

    async createBelongsToNodeRelationship(imageId: number, partnerId: number) {
        if (imageId === partnerId) {
            throw new SemanticError(`Image #${imageId} cannot be connected to itself`)
        }

        // checking that both nodes exist -> exception is thrown if not
        await Image.findById(imageId)
        const partner = await Node.findById(partnerId)

        if (nodeIsAnImageNode(partner)) {
            throw new SemanticError(`Image #${imageId} cannot be connected to another image`)
        }

        const existingRelationship = await getSpecificRel(imageId, partnerId, RelType.ImageBelongsToNode)
        if (existingRelationship) {
            throw new RelAlreadyExistsError(RelType.ImageBelongsToNode, imageId, partnerId)
        }

        const createdRelationship = await createRel(imageId, partnerId, RelType.ImageBelongsToNode)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getAllBelongsToNodeRelationships(imageId: number) {
        // checking that the node exists -> exception is thrown if not
        await Image.findById(imageId)

        return getAllRels(imageId, RelType.ImageBelongsToNode)
    },

    async deleteBelongsToNodeRelationship(imageId: number, partnerNodeId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await Image.findById(imageId)
        await Node.findById(partnerNodeId)

        const relationship = await getSpecificRel(imageId, partnerNodeId, RelType.ImageBelongsToNode)
        if (!relationship) {
            throw new RelNotFoundError(RelType.ImageBelongsToNode, imageId, partnerNodeId)
        }

        await deleteSpecificRel(imageId, partnerNodeId, RelType.ImageBelongsToNode)
    },

    async createIsPrimeImageOfNodeRelationship(imageId: number, nodeId: number) {
        if (imageId === nodeId) {
            throw new SemanticError(`Image #${imageId} cannot be connected to itself`)
        }

        // checking that both nodes exist -> exception is thrown if not
        await Image.findById(imageId)
        const node = await Node.findById(nodeId)

        if (nodeIsAnImageNode(node)) {
            throw new SemanticError(`Image #${imageId} cannot be connected to another image`)
        }

        const existingRelation = await getSpecificRel(imageId, nodeId, RelType.ImageIsPrimeImageOfNode)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.ImageIsPrimeImageOfNode, imageId, nodeId)
        }

        await deleteIncomingRel(nodeId, RelType.ImageIsPrimeImageOfNode, ModelNodeType.Image)

        const createdRelationship = await createRel(imageId, nodeId, RelType.ImageIsPrimeImageOfNode)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getAllIsPrimeImageOfNodeRelationships(imageId: number) {
        // checking that the node exists -> exception is thrown if not
        await Image.findById(imageId)

        return getAllRels(imageId, RelType.ImageIsPrimeImageOfNode)
    },

    async deleteIsPrimeImageOfNodeRelationship(imageId: number, nodeId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await Image.findById(imageId)
        await Node.findById(nodeId)

        const relationship = await getSpecificRel(imageId, nodeId, RelType.ImageIsPrimeImageOfNode)
        if (!relationship) {
            throw new RelNotFoundError(RelType.ImageIsPrimeImageOfNode, imageId, nodeId)
        }

        await deleteSpecificRel(imageId, nodeId, RelType.ImageIsPrimeImageOfNode)
    },
}

function nodeIsAnImageNode(node: ModelNode) {
    return 'image_url_original' in node.attributes
}
