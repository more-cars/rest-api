import {CreateGamingPlatformInput} from "./types/CreateGamingPlatformInput"
import {GamingPlatformNode} from "./types/GamingPlatformNode"
import {convertInputData} from "./create/convertInputData"
import {createNode} from "../../db/nodes/gaming-platforms/createNode"
import {convertOutputData} from "./create/convertOutputData"
import {getNodeById} from "../../db/nodes/gaming-platforms/getNodeById"
import {getAllNodesOfType} from "../../db/nodes/gaming-platforms/getAllNodesOfType"
import type {NodeCollectionConstraints} from "../types/NodeCollectionConstraints"
import {deleteNode} from "../../db/nodes/deleteNode"
import {NodeNotFoundError} from "../types/NodeNotFoundError"
import {createRel} from "../relationships/createRel"
import {RacingGame} from "../racing-games/RacingGame"
import {getSpecificRel} from "../relationships/getSpecificRel"
import {RelationshipAlreadyExistsError} from "../types/RelationshipAlreadyExistsError"
import {RelationshipType} from "../relationships/types/RelationshipType"
import {GamingPlatformRelationship} from "./types/GamingPlatformRelationship"
import {getAllRels} from "../relationships/getAllRels"
import {deleteSpecificRel} from "../relationships/deleteSpecificRel"
import {RelationshipNotFoundError} from "../types/RelationshipNotFoundError"
import {Image} from "../images/Image"
import {NodeTypeLabel} from "../../db/NodeTypeLabel"
import {getRel} from "../relationships/getRel"
import {deleteOutgoingRel} from "../relationships/deleteOutgoingRel"

export const GamingPlatform = {
    async create(data: CreateGamingPlatformInput): Promise<GamingPlatformNode> {
        const input = convertInputData(data)
        const result = await createNode(input)
        const output = convertOutputData(result)

        return output
    },

    async findById(id: number): Promise<false | GamingPlatformNode> {
        const node = await getNodeById(id)

        if (!node) {
            return false
        }

        return convertOutputData(node)
    },

    async findAll(options: NodeCollectionConstraints = {}): Promise<GamingPlatformNode[]> {
        const nodes: GamingPlatformNode[] = []
        const nodesDb = await getAllNodesOfType(options)

        nodesDb.forEach(node => {
            nodes.push(convertOutputData(node))
        })

        return nodes
    },

    async delete(gamingPlatformId: number): Promise<void> {
        const node = await GamingPlatform.findById(gamingPlatformId)
        if (!node) {
            throw new NodeNotFoundError(gamingPlatformId)
        }

        await deleteNode(gamingPlatformId)
    },

    async createFeaturesRacingGameRelationship(gamingPlatformId: number, racingGameId: number) {
        const gamingPlatform = await GamingPlatform.findById(gamingPlatformId)
        if (!gamingPlatform) {
            throw new NodeNotFoundError(gamingPlatformId)
        }

        const racingGame = await RacingGame.findById(racingGameId)
        if (!racingGame) {
            throw new NodeNotFoundError(racingGameId)
        }

        const existingRelation = await getSpecificRel(gamingPlatformId, racingGameId, RelationshipType.GamingPlatformFeaturesRacingGame)
        if (existingRelation) {
            throw new RelationshipAlreadyExistsError(GamingPlatformRelationship.featuresRacingGame, gamingPlatformId, racingGameId)
        }


        const createdRelationship = await createRel(gamingPlatformId, racingGameId, RelationshipType.GamingPlatformFeaturesRacingGame)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getAllFeaturesRacingGameRelationships(gamingPlatformId: number) {
        const gamingPlatform = await GamingPlatform.findById(gamingPlatformId)
        if (!gamingPlatform) {
            throw new NodeNotFoundError(gamingPlatformId)
        }

        return getAllRels(gamingPlatformId, RelationshipType.GamingPlatformFeaturesRacingGame)
    },

    async deleteFeaturesRacingGameRelationship(gamingPlatformId: number, racingGameId: number) {
        const gamingPlatform = await GamingPlatform.findById(gamingPlatformId)
        if (!gamingPlatform) {
            throw new NodeNotFoundError(gamingPlatformId)
        }

        const racingGame = await RacingGame.findById(racingGameId)
        if (!racingGame) {
            throw new NodeNotFoundError(racingGameId)
        }

        const relationship = await getSpecificRel(gamingPlatformId, racingGameId, RelationshipType.GamingPlatformFeaturesRacingGame)
        if (!relationship) {
            throw new RelationshipNotFoundError(GamingPlatformRelationship.featuresRacingGame, gamingPlatformId, racingGameId)
        }

        await deleteSpecificRel(gamingPlatformId, racingGameId, RelationshipType.GamingPlatformFeaturesRacingGame)
    },

    async createHasImageRelationship(gamingPlatformId: number, imageId: number) {
        const gamingPlatform = await GamingPlatform.findById(gamingPlatformId)
        if (!gamingPlatform) {
            throw new NodeNotFoundError(gamingPlatformId)
        }

        const image = await Image.findById(imageId)
        if (!image) {
            throw new NodeNotFoundError(imageId)
        }

        const existingRelation = await getSpecificRel(gamingPlatformId, imageId, RelationshipType.GamingPlatformHasImage)
        if (existingRelation) {
            throw new RelationshipAlreadyExistsError(GamingPlatformRelationship.hasImage, gamingPlatformId, imageId)
        }


        const createdRelationship = await createRel(gamingPlatformId, imageId, RelationshipType.GamingPlatformHasImage)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getAllHasImageRelationships(gamingPlatformId: number) {
        const gamingPlatform = await GamingPlatform.findById(gamingPlatformId)
        if (!gamingPlatform) {
            throw new NodeNotFoundError(gamingPlatformId)
        }

        return getAllRels(gamingPlatformId, RelationshipType.GamingPlatformHasImage)
    },

    async deleteHasImageRelationship(gamingPlatformId: number, imageId: number) {
        const gamingPlatform = await GamingPlatform.findById(gamingPlatformId)
        if (!gamingPlatform) {
            throw new NodeNotFoundError(gamingPlatformId)
        }

        const image = await Image.findById(imageId)
        if (!image) {
            throw new NodeNotFoundError(imageId)
        }

        const relationship = await getSpecificRel(gamingPlatformId, imageId, RelationshipType.GamingPlatformHasImage)
        if (!relationship) {
            throw new RelationshipNotFoundError(GamingPlatformRelationship.hasImage, gamingPlatformId, imageId)
        }

        await deleteSpecificRel(gamingPlatformId, imageId, RelationshipType.GamingPlatformHasImage)
    },

    async createHasPrimeImageRelationship(gamingPlatformId: number, imageId: number) {
        const gamingPlatform = await GamingPlatform.findById(gamingPlatformId)
        if (!gamingPlatform) {
            throw new NodeNotFoundError(gamingPlatformId)
        }

        const image = await Image.findById(imageId)
        if (!image) {
            throw new NodeNotFoundError(imageId)
        }

        const existingRelation = await getSpecificRel(gamingPlatformId, imageId, RelationshipType.GamingPlatformHasPrimeImage)
        if (existingRelation) {
            throw new RelationshipAlreadyExistsError(GamingPlatformRelationship.hasPrimeImage, gamingPlatformId, imageId)
        }
        await deleteOutgoingRel(gamingPlatformId, RelationshipType.GamingPlatformHasPrimeImage, NodeTypeLabel.Image)


        const createdRelationship = await createRel(gamingPlatformId, imageId, RelationshipType.GamingPlatformHasPrimeImage)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getHasPrimeImageRelationship(gamingPlatformId: number) {
        const gamingPlatform = await GamingPlatform.findById(gamingPlatformId)
        if (!gamingPlatform) {
            throw new NodeNotFoundError(gamingPlatformId)
        }

        const relationship = await getRel(gamingPlatformId, RelationshipType.GamingPlatformHasPrimeImage)
        if (!relationship) {
            throw new RelationshipNotFoundError(GamingPlatformRelationship.hasPrimeImage, gamingPlatformId, null)
        }

        return relationship
    },

    async deleteHasPrimeImageRelationship(gamingPlatformId: number, imageId: number) {
        const gamingPlatform = await GamingPlatform.findById(gamingPlatformId)
        if (!gamingPlatform) {
            throw new NodeNotFoundError(gamingPlatformId)
        }

        const image = await Image.findById(imageId)
        if (!image) {
            throw new NodeNotFoundError(imageId)
        }

        const relationship = await getSpecificRel(gamingPlatformId, imageId, RelationshipType.GamingPlatformHasPrimeImage)
        if (!relationship) {
            throw new RelationshipNotFoundError(GamingPlatformRelationship.hasPrimeImage, gamingPlatformId, imageId)
        }

        await deleteSpecificRel(gamingPlatformId, imageId, RelationshipType.GamingPlatformHasPrimeImage)
    },
}
