import {ImageNode} from "./types/ImageNode"
import {CreateImageInput} from "./types/CreateImageInput"
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
