import {ImageNode} from "./types/ImageNode"
import {CreateImageInput} from "./types/CreateImageInput"
import {CreateImageGeneratedInput} from "./types/CreateImageGeneratedInput"
import {convertInputData} from "./create/convertInputData"
import {createNode} from "../../../db/node-types/images/createNode"
import {convertDbNodeToModelNode} from "../convertDbNodeToModelNode"
import {getNodeById} from "../../../db/node-types/images/getNodeById"
import type {NodeCollectionConstraints} from "../../types/NodeCollectionConstraints"
import {getAllNodesOfType} from "../../../db/node-types/images/getAllNodesOfType"
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

        const companyRelationships = await getRelationshipCollection(imageId, RelationshipType.ImageBelongsToNode, DbNodeType.Company)
        const brandRelationships = await getRelationshipCollection(imageId, RelationshipType.ImageBelongsToNode, DbNodeType.Brand)
        const carModelRelationships = await getRelationshipCollection(imageId, RelationshipType.ImageBelongsToNode, DbNodeType.CarModel)
        const carModelVariantRelationships = await getRelationshipCollection(imageId, RelationshipType.ImageBelongsToNode, DbNodeType.CarModelVariant)
        const raceTrackRelationships = await getRelationshipCollection(imageId, RelationshipType.ImageBelongsToNode, DbNodeType.RaceTrack)
        const trackLayoutRelationships = await getRelationshipCollection(imageId, RelationshipType.ImageBelongsToNode, DbNodeType.TrackLayout)
        const racingSeriesRelationships = await getRelationshipCollection(imageId, RelationshipType.ImageBelongsToNode, DbNodeType.RacingSeries)
        const racingEventRelationships = await getRelationshipCollection(imageId, RelationshipType.ImageBelongsToNode, DbNodeType.RacingEvent)
        const racingSessionRelationships = await getRelationshipCollection(imageId, RelationshipType.ImageBelongsToNode, DbNodeType.RacingSession)
        const sessionResultRelationships = await getRelationshipCollection(imageId, RelationshipType.ImageBelongsToNode, DbNodeType.SessionResult)
        const lapTimeRelationships = await getRelationshipCollection(imageId, RelationshipType.ImageBelongsToNode, DbNodeType.LapTime)
        const racingGameRelationships = await getRelationshipCollection(imageId, RelationshipType.ImageBelongsToNode, DbNodeType.RacingGame)
        const gamingPlatformRelationships = await getRelationshipCollection(imageId, RelationshipType.ImageBelongsToNode, DbNodeType.GamingPlatform)

        return {
            companies: companyRelationships.map(relationship => convertDbRelToModelRel(relationship)),
            brands: brandRelationships.map(relationship => convertDbRelToModelRel(relationship)),
            car_models: carModelRelationships.map(relationship => convertDbRelToModelRel(relationship)),
            car_model_variants: carModelVariantRelationships.map(relationship => convertDbRelToModelRel(relationship)),
            race_tracks: raceTrackRelationships.map(relationship => convertDbRelToModelRel(relationship)),
            track_layouts: trackLayoutRelationships.map(relationship => convertDbRelToModelRel(relationship)),
            racing_series: racingSeriesRelationships.map(relationship => convertDbRelToModelRel(relationship)),
            racing_events: racingEventRelationships.map(relationship => convertDbRelToModelRel(relationship)),
            racing_sessions: racingSessionRelationships.map(relationship => convertDbRelToModelRel(relationship)),
            session_results: sessionResultRelationships.map(relationship => convertDbRelToModelRel(relationship)),
            lap_times: lapTimeRelationships.map(relationship => convertDbRelToModelRel(relationship)),
            racing_games: racingGameRelationships.map(relationship => convertDbRelToModelRel(relationship)),
            gaming_platforms: gamingPlatformRelationships.map(relationship => convertDbRelToModelRel(relationship)),
        } satisfies ImageBelongsToNodeTypeRelationships
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
