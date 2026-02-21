import {ImageNode} from "./types/ImageNode"
import {CreateImageInput} from "./types/CreateImageInput"
import {CreateImageGeneratedInput} from "./types/CreateImageGeneratedInput"
import {convertInputData} from "./create/convertInputData"
import {createNode} from "../../../db/nodes/images/createNode"
import {convertDbNodeToModelNode} from "../convertDbNodeToModelNode"
import {getNodeById} from "../../../db/nodes/images/getNodeById"
import type {NodeCollectionConstraints} from "../../types/NodeCollectionConstraints"
import {getAllNodesOfType} from "../../../db/nodes/images/getAllNodesOfType"
import {deleteNode} from "../../../db/nodes/deleteNode"
import type {ImageBelongsToNodeTypeRelationships} from "./types/ImageBelongsToNodeTypeRelationships"
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
import type {Rel} from "../../relationships/types/Rel"
import {DbNodeType} from "../../../db/types/DbNodeType"
import {ModelNodeType} from "../../types/ModelNodeType"
import {convertDbRelToModelRel} from "../../relationships/convertDbRelToModelRel"
import {getRelationshipCollection} from "../../../db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../db/types/RelationshipType"
import {deleteIncomingRel} from "../../relationships/deleteIncomingRel"
import type {ModelNode} from "../../types/ModelNode"

export const Image = {
    async create(data: CreateImageInput): Promise<ImageNode> {
        const generatedData = getGeneratedData()
        const input = convertInputData(Object.assign(data, generatedData))
        const result = await createNode(input)

        return convertDbNodeToModelNode(result) as ImageNode
    },

    async findById(id: number): Promise<false | ImageNode> {
        const node = await getNodeById(id)

        if (!node) {
            return false
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

    async delete(imageId: number): Promise<void> {
        const node = await Image.findById(imageId)
        if (!node) {
            throw new NodeNotFoundError(imageId)
        }

        await deleteNode(imageId)
    },

    async createBelongsToNodeRelationship(imageId: number, partnerId: number) {
        if (imageId === partnerId) {
            throw new SemanticError(`Image #${imageId} cannot be connected to itself`)
        }

        const image = await getNodeById(imageId)
        if (!image) {
            throw new NodeNotFoundError(imageId)
        }

        const partner = await Node.findById(partnerId)
        if (!partner) {
            throw new NodeNotFoundError(partnerId)
        }

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

    async getSpecificBelongsToNodeRelationship(imageId: number, partnerId: number) {
        const image = await getNodeById(imageId)
        if (!image) {
            throw new NodeNotFoundError(imageId)
        }

        const partner = await Node.findById(partnerId)
        if (!partner) {
            throw new NodeNotFoundError(partnerId)
        }

        const relationship = await getSpecificRel(imageId, partnerId, RelType.ImageBelongsToNode)
        if (!relationship) {
            throw new RelNotFoundError(RelType.ImageBelongsToNode, imageId, partnerId)
        }

        return relationship
    },

    async getAllBelongsToNodeRelationships(imageId: number) {
        const image = await Image.findById(imageId)
        if (!image) {
            throw new NodeNotFoundError(imageId)
        }

        return getAllRels(imageId, RelType.ImageBelongsToNode)
    },

    async deleteBelongsToNodeRelationship(imageId: number, partnerNodeId: number) {
        const image = await Image.findById(imageId)
        if (!image) {
            throw new NodeNotFoundError(imageId)
        }

        const partnerNode = await Node.findById(partnerNodeId)
        if (!partnerNode) {
            throw new NodeNotFoundError(partnerNodeId)
        }

        const relationship = await getSpecificRel(imageId, partnerNodeId, RelType.ImageBelongsToNode)
        if (!relationship) {
            throw new RelNotFoundError(RelType.ImageBelongsToNode, imageId, partnerNodeId)
        }

        await deleteSpecificRel(imageId, partnerNodeId, RelType.ImageBelongsToNode)
    },

    async getBelongsToNodeTypeRelationships(imageId: number) {
        if (!await getNodeById(imageId)) {
            return false
        }

        const companyRels = await getRelationshipCollection(imageId, RelationshipType.ImageBelongsToNode, DbNodeType.Company)
        const brandRels = await getRelationshipCollection(imageId, RelationshipType.ImageBelongsToNode, DbNodeType.Brand)
        const carModelRels = await getRelationshipCollection(imageId, RelationshipType.ImageBelongsToNode, DbNodeType.CarModel)
        const raceTrackRels = await getRelationshipCollection(imageId, RelationshipType.ImageBelongsToNode, DbNodeType.RaceTrack)
        const trackLayoutRels = await getRelationshipCollection(imageId, RelationshipType.ImageBelongsToNode, DbNodeType.TrackLayout)
        const racingSeriesRels = await getRelationshipCollection(imageId, RelationshipType.ImageBelongsToNode, DbNodeType.RacingSeries)
        const racingEventsRels = await getRelationshipCollection(imageId, RelationshipType.ImageBelongsToNode, DbNodeType.RacingEvent)

        const belongsToNodeTypeRelationships: ImageBelongsToNodeTypeRelationships = {
            companies: [],
            brands: [],
            car_models: [],
            race_tracks: [],
            track_layouts: [],
            racing_series: [],
            racing_events: [],
        }

        let mappedRelationships: Rel[] = []
        for (const relationship of companyRels) {
            mappedRelationships.push(await convertDbRelToModelRel(relationship))
        }
        belongsToNodeTypeRelationships.companies = mappedRelationships

        mappedRelationships = []
        for (const relationship of brandRels) {
            mappedRelationships.push(await convertDbRelToModelRel(relationship))
        }
        belongsToNodeTypeRelationships.brands = mappedRelationships

        mappedRelationships = []
        for (const relationship of carModelRels) {
            mappedRelationships.push(await convertDbRelToModelRel(relationship))
        }
        belongsToNodeTypeRelationships.car_models = mappedRelationships

        mappedRelationships = []
        for (const relationship of raceTrackRels) {
            mappedRelationships.push(await convertDbRelToModelRel(relationship))
        }
        belongsToNodeTypeRelationships.race_tracks = mappedRelationships

        mappedRelationships = []
        for (const relationship of trackLayoutRels) {
            mappedRelationships.push(await convertDbRelToModelRel(relationship))
        }
        belongsToNodeTypeRelationships.track_layouts = mappedRelationships

        mappedRelationships = []
        for (const relationship of racingSeriesRels) {
            mappedRelationships.push(await convertDbRelToModelRel(relationship))
        }
        belongsToNodeTypeRelationships.racing_series = mappedRelationships

        mappedRelationships = []
        for (const relationship of racingEventsRels) {
            mappedRelationships.push(await convertDbRelToModelRel(relationship))
        }
        belongsToNodeTypeRelationships.racing_events = mappedRelationships

        return belongsToNodeTypeRelationships
    },

    async createIsPrimeImageOfNodeRelationship(imageId: number, nodeId: number) {
        if (imageId === nodeId) {
            throw new SemanticError(`Image #${imageId} cannot be connected to itself`)
        }

        const image = await Image.findById(imageId)
        if (!image) {
            throw new NodeNotFoundError(imageId)
        }

        const node = await Node.findById(nodeId)
        if (!node) {
            throw new NodeNotFoundError(nodeId)
        }

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
        const image = await Image.findById(imageId)
        if (!image) {
            throw new NodeNotFoundError(imageId)
        }

        return getAllRels(imageId, RelType.ImageIsPrimeImageOfNode)
    },

    async deleteIsPrimeImageOfNodeRelationship(imageId: number, nodeId: number) {
        const image = await Image.findById(imageId)
        if (!image) {
            throw new NodeNotFoundError(imageId)
        }

        const node = await Node.findById(nodeId)
        if (!node) {
            throw new NodeNotFoundError(nodeId)
        }

        const relationship = await getSpecificRel(imageId, nodeId, RelType.ImageIsPrimeImageOfNode)
        if (!relationship) {
            throw new RelNotFoundError(RelType.ImageIsPrimeImageOfNode, imageId, nodeId)
        }

        await deleteSpecificRel(imageId, nodeId, RelType.ImageIsPrimeImageOfNode)
    },
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

function nodeIsAnImageNode(node: ModelNode) {
    return 'image_url_original' in node.attributes
}
