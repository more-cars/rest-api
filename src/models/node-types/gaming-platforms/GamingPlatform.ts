import {CreateGamingPlatformInput} from "./types/CreateGamingPlatformInput"
import {GamingPlatformNode} from "./types/GamingPlatformNode"
import {convertInputData} from "./create/convertInputData"
import {createNode} from "../../../db/node-types/gaming-platforms/createNode"
import {convertDbNodeToModelNode} from "../convertDbNodeToModelNode"
import {getNodeById} from "../../../db/node-types/gaming-platforms/getNodeById"
import {getAllNodesOfType} from "../../../db/node-types/gaming-platforms/getAllNodesOfType"
import type {NodeCollectionConstraints} from "../../types/NodeCollectionConstraints"
import {deleteNode} from "../../../db/nodes/deleteNode"
import {NodeNotFoundError} from "../../types/NodeNotFoundError"
import {createRel} from "../../relationships/createRel"
import {RacingGame} from "../racing-games/RacingGame"
import {getSpecificRel} from "../../relationships/getSpecificRel"
import {RelAlreadyExistsError} from "../../types/RelAlreadyExistsError"
import {RelType} from "../../relationships/types/RelType"
import {getAllRels} from "../../relationships/getAllRels"
import {deleteSpecificRel} from "../../relationships/deleteSpecificRel"
import {RelNotFoundError} from "../../types/RelNotFoundError"
import {Image} from "../images/Image"
import {ModelNodeType} from "../../types/ModelNodeType"
import {getRel} from "../../relationships/getRel"
import {deleteOutgoingRel} from "../../relationships/deleteOutgoingRel"

export const GamingPlatform = {
    async create(data: CreateGamingPlatformInput): Promise<GamingPlatformNode> {
        const input = convertInputData(data)
        const result = await createNode(input)

        return convertDbNodeToModelNode(result) as GamingPlatformNode
    },

    async findById(id: number): Promise<GamingPlatformNode> {
        const node = await getNodeById(id)

        if (!node) {
            throw new NodeNotFoundError(id)
        }

        return convertDbNodeToModelNode(node) as GamingPlatformNode
    },

    async findAll(options: NodeCollectionConstraints = {}): Promise<GamingPlatformNode[]> {
        const nodes: GamingPlatformNode[] = []
        const nodesDb = await getAllNodesOfType(options)

        nodesDb.forEach(node => {
            nodes.push(convertDbNodeToModelNode(node) as GamingPlatformNode)
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

    async createFeaturesRacingGameRelationship(gamingPlatformId: number, racingGameId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await GamingPlatform.findById(gamingPlatformId)
        await RacingGame.findById(racingGameId)

        const existingRelation = await getSpecificRel(gamingPlatformId, racingGameId, RelType.GamingPlatformFeaturesRacingGame)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.GamingPlatformFeaturesRacingGame, gamingPlatformId, racingGameId)
        }


        const createdRelationship = await createRel(gamingPlatformId, racingGameId, RelType.GamingPlatformFeaturesRacingGame)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getAllFeaturesRacingGameRelationships(gamingPlatformId: number) {
        // checking that the node exists -> exception is thrown if not
        await GamingPlatform.findById(gamingPlatformId)

        return getAllRels(gamingPlatformId, RelType.GamingPlatformFeaturesRacingGame)
    },

    async deleteFeaturesRacingGameRelationship(gamingPlatformId: number, racingGameId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await GamingPlatform.findById(gamingPlatformId)
        await RacingGame.findById(racingGameId)

        const relationship = await getSpecificRel(gamingPlatformId, racingGameId, RelType.GamingPlatformFeaturesRacingGame)
        if (!relationship) {
            throw new RelNotFoundError(RelType.GamingPlatformFeaturesRacingGame, gamingPlatformId, racingGameId)
        }

        await deleteSpecificRel(gamingPlatformId, racingGameId, RelType.GamingPlatformFeaturesRacingGame)
    },

    async createHasImageRelationship(gamingPlatformId: number, imageId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await GamingPlatform.findById(gamingPlatformId)
        await Image.findById(imageId)

        const existingRelation = await getSpecificRel(gamingPlatformId, imageId, RelType.GamingPlatformHasImage)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.GamingPlatformHasImage, gamingPlatformId, imageId)
        }

        const createdRelationship = await createRel(gamingPlatformId, imageId, RelType.GamingPlatformHasImage)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getAllHasImageRelationships(gamingPlatformId: number) {
        // checking that the node exists -> exception is thrown if not
        await GamingPlatform.findById(gamingPlatformId)

        return getAllRels(gamingPlatformId, RelType.GamingPlatformHasImage)
    },

    async deleteHasImageRelationship(gamingPlatformId: number, imageId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await GamingPlatform.findById(gamingPlatformId)
        await Image.findById(imageId)

        const relationship = await getSpecificRel(gamingPlatformId, imageId, RelType.GamingPlatformHasImage)
        if (!relationship) {
            throw new RelNotFoundError(RelType.GamingPlatformHasImage, gamingPlatformId, imageId)
        }

        await deleteSpecificRel(gamingPlatformId, imageId, RelType.GamingPlatformHasImage)
    },

    async createHasPrimeImageRelationship(gamingPlatformId: number, imageId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await GamingPlatform.findById(gamingPlatformId)
        await Image.findById(imageId)

        const existingRelation = await getSpecificRel(gamingPlatformId, imageId, RelType.GamingPlatformHasPrimeImage)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.GamingPlatformHasPrimeImage, gamingPlatformId, imageId)
        }
        await deleteOutgoingRel(gamingPlatformId, RelType.GamingPlatformHasPrimeImage, ModelNodeType.Image)


        const createdRelationship = await createRel(gamingPlatformId, imageId, RelType.GamingPlatformHasPrimeImage)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getHasPrimeImageRelationship(gamingPlatformId: number) {
        // checking that the node exists -> exception is thrown if not
        await GamingPlatform.findById(gamingPlatformId)

        const relationship = await getRel(gamingPlatformId, RelType.GamingPlatformHasPrimeImage)
        if (!relationship) {
            throw new RelNotFoundError(RelType.GamingPlatformHasPrimeImage, gamingPlatformId, null)
        }

        return relationship
    },

    async deleteHasPrimeImageRelationship(gamingPlatformId: number, imageId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await GamingPlatform.findById(gamingPlatformId)
        await Image.findById(imageId)

        const relationship = await getSpecificRel(gamingPlatformId, imageId, RelType.GamingPlatformHasPrimeImage)
        if (!relationship) {
            throw new RelNotFoundError(RelType.GamingPlatformHasPrimeImage, gamingPlatformId, imageId)
        }

        await deleteSpecificRel(gamingPlatformId, imageId, RelType.GamingPlatformHasPrimeImage)
    },
}
