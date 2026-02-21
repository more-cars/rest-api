import {CreateRacingGameInput} from "./types/CreateRacingGameInput"
import {RacingGameNode} from "./types/RacingGameNode"
import {convertInputData} from "./create/convertInputData"
import {createNode} from "../../../db/nodes/racing-games/createNode"
import {convertRacingGameDbNodeToModelNode} from "./create/convertRacingGameDbNodeToModelNode"
import {getNodeById} from "../../../db/nodes/racing-games/getNodeById"
import {getAllNodesOfType} from "../../../db/nodes/racing-games/getAllNodesOfType"
import type {NodeCollectionConstraints} from "../../types/NodeCollectionConstraints"
import {deleteNode} from "../../../db/nodes/deleteNode"
import {NodeNotFoundError} from "../../types/NodeNotFoundError"
import {createRel} from "../../relationships/createRel"
import {CarModelVariant} from "../car-model-variants/CarModelVariant"
import {getSpecificRel} from "../../relationships/getSpecificRel"
import {RelAlreadyExistsError} from "../../types/RelAlreadyExistsError"
import {RelType} from "../../relationships/types/RelType"
import {getAllRels} from "../../relationships/getAllRels"
import {deleteSpecificRel} from "../../relationships/deleteSpecificRel"
import {RelNotFoundError} from "../../types/RelNotFoundError"
import {TrackLayout} from "../track-layouts/TrackLayout"
import {Image} from "../images/Image"
import {DbNodeType} from "../../../db/types/DbNodeType"
import {getRel} from "../../relationships/getRel"
import {GamingPlatform} from "../gaming-platforms/GamingPlatform"
import {deleteOutgoingRel} from "../../relationships/deleteOutgoingRel"

export const RacingGame = {
    async create(data: CreateRacingGameInput): Promise<RacingGameNode> {
        const input = convertInputData(data)
        const result = await createNode(input)
        const output = convertRacingGameDbNodeToModelNode(result)

        return output
    },

    async findById(id: number): Promise<false | RacingGameNode> {
        const node = await getNodeById(id)

        if (!node) {
            return false
        }

        return convertRacingGameDbNodeToModelNode(node)
    },

    async findAll(options: NodeCollectionConstraints = {}): Promise<RacingGameNode[]> {
        const nodes: RacingGameNode[] = []
        const nodesDb = await getAllNodesOfType(options)

        nodesDb.forEach(node => {
            nodes.push(convertRacingGameDbNodeToModelNode(node))
        })

        return nodes
    },

    async delete(racingGameId: number): Promise<void> {
        const node = await RacingGame.findById(racingGameId)
        if (!node) {
            throw new NodeNotFoundError(racingGameId)
        }

        await deleteNode(racingGameId)
    },

    async createFeaturesCarModelVariantRelationship(racingGameId: number, carModelVariantId: number) {
        const racingGame = await RacingGame.findById(racingGameId)
        if (!racingGame) {
            throw new NodeNotFoundError(racingGameId)
        }

        const carModelVariant = await CarModelVariant.findById(carModelVariantId)
        if (!carModelVariant) {
            throw new NodeNotFoundError(carModelVariantId)
        }

        const existingRelation = await getSpecificRel(racingGameId, carModelVariantId, RelType.RacingGameFeaturesCarModelVariant)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.RacingGameFeaturesCarModelVariant, racingGameId, carModelVariantId)
        }


        const createdRelationship = await createRel(racingGameId, carModelVariantId, RelType.RacingGameFeaturesCarModelVariant)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getAllFeaturesCarModelVariantRelationships(racingGameId: number) {
        const racingGame = await RacingGame.findById(racingGameId)
        if (!racingGame) {
            throw new NodeNotFoundError(racingGameId)
        }

        return getAllRels(racingGameId, RelType.RacingGameFeaturesCarModelVariant)
    },

    async deleteFeaturesCarModelVariantRelationship(racingGameId: number, carModelVariantId: number) {
        const racingGame = await RacingGame.findById(racingGameId)
        if (!racingGame) {
            throw new NodeNotFoundError(racingGameId)
        }

        const carModelVariant = await CarModelVariant.findById(carModelVariantId)
        if (!carModelVariant) {
            throw new NodeNotFoundError(carModelVariantId)
        }

        const relationship = await getSpecificRel(racingGameId, carModelVariantId, RelType.RacingGameFeaturesCarModelVariant)
        if (!relationship) {
            throw new RelNotFoundError(RelType.RacingGameFeaturesCarModelVariant, racingGameId, carModelVariantId)
        }

        await deleteSpecificRel(racingGameId, carModelVariantId, RelType.RacingGameFeaturesCarModelVariant)
    },

    async createFeaturesTrackLayoutRelationship(racingGameId: number, trackLayoutId: number) {
        const racingGame = await RacingGame.findById(racingGameId)
        if (!racingGame) {
            throw new NodeNotFoundError(racingGameId)
        }

        const trackLayout = await TrackLayout.findById(trackLayoutId)
        if (!trackLayout) {
            throw new NodeNotFoundError(trackLayoutId)
        }

        const existingRelation = await getSpecificRel(racingGameId, trackLayoutId, RelType.RacingGameFeaturesTrackLayout)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.RacingGameFeaturesTrackLayout, racingGameId, trackLayoutId)
        }


        const createdRelationship = await createRel(racingGameId, trackLayoutId, RelType.RacingGameFeaturesTrackLayout)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getAllFeaturesTrackLayoutRelationships(racingGameId: number) {
        const racingGame = await RacingGame.findById(racingGameId)
        if (!racingGame) {
            throw new NodeNotFoundError(racingGameId)
        }

        return getAllRels(racingGameId, RelType.RacingGameFeaturesTrackLayout)
    },

    async deleteFeaturesTrackLayoutRelationship(racingGameId: number, trackLayoutId: number) {
        const racingGame = await RacingGame.findById(racingGameId)
        if (!racingGame) {
            throw new NodeNotFoundError(racingGameId)
        }

        const trackLayout = await TrackLayout.findById(trackLayoutId)
        if (!trackLayout) {
            throw new NodeNotFoundError(trackLayoutId)
        }

        const relationship = await getSpecificRel(racingGameId, trackLayoutId, RelType.RacingGameFeaturesTrackLayout)
        if (!relationship) {
            throw new RelNotFoundError(RelType.RacingGameFeaturesTrackLayout, racingGameId, trackLayoutId)
        }

        await deleteSpecificRel(racingGameId, trackLayoutId, RelType.RacingGameFeaturesTrackLayout)
    },

    async createHasImageRelationship(racingGameId: number, imageId: number) {
        const racingGame = await RacingGame.findById(racingGameId)
        if (!racingGame) {
            throw new NodeNotFoundError(racingGameId)
        }

        const image = await Image.findById(imageId)
        if (!image) {
            throw new NodeNotFoundError(imageId)
        }

        const existingRelation = await getSpecificRel(racingGameId, imageId, RelType.RacingGameHasImage)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.RacingGameHasImage, racingGameId, imageId)
        }


        const createdRelationship = await createRel(racingGameId, imageId, RelType.RacingGameHasImage)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getAllHasImageRelationships(racingGameId: number) {
        const racingGame = await RacingGame.findById(racingGameId)
        if (!racingGame) {
            throw new NodeNotFoundError(racingGameId)
        }

        return getAllRels(racingGameId, RelType.RacingGameHasImage)
    },

    async deleteHasImageRelationship(racingGameId: number, imageId: number) {
        const racingGame = await RacingGame.findById(racingGameId)
        if (!racingGame) {
            throw new NodeNotFoundError(racingGameId)
        }

        const image = await Image.findById(imageId)
        if (!image) {
            throw new NodeNotFoundError(imageId)
        }

        const relationship = await getSpecificRel(racingGameId, imageId, RelType.RacingGameHasImage)
        if (!relationship) {
            throw new RelNotFoundError(RelType.RacingGameHasImage, racingGameId, imageId)
        }

        await deleteSpecificRel(racingGameId, imageId, RelType.RacingGameHasImage)
    },

    async createHasPrimeImageRelationship(racingGameId: number, imageId: number) {
        const racingGame = await RacingGame.findById(racingGameId)
        if (!racingGame) {
            throw new NodeNotFoundError(racingGameId)
        }

        const image = await Image.findById(imageId)
        if (!image) {
            throw new NodeNotFoundError(imageId)
        }

        const existingRelation = await getSpecificRel(racingGameId, imageId, RelType.RacingGameHasPrimeImage)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.RacingGameHasPrimeImage, racingGameId, imageId)
        }
        await deleteOutgoingRel(racingGameId, RelType.RacingGameHasPrimeImage, DbNodeType.Image)


        const createdRelationship = await createRel(racingGameId, imageId, RelType.RacingGameHasPrimeImage)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getHasPrimeImageRelationship(racingGameId: number) {
        const racingGame = await RacingGame.findById(racingGameId)
        if (!racingGame) {
            throw new NodeNotFoundError(racingGameId)
        }

        const relationship = await getRel(racingGameId, RelType.RacingGameHasPrimeImage)
        if (!relationship) {
            throw new RelNotFoundError(RelType.RacingGameHasPrimeImage, racingGameId, null)
        }

        return relationship
    },

    async deleteHasPrimeImageRelationship(racingGameId: number, imageId: number) {
        const racingGame = await RacingGame.findById(racingGameId)
        if (!racingGame) {
            throw new NodeNotFoundError(racingGameId)
        }

        const image = await Image.findById(imageId)
        if (!image) {
            throw new NodeNotFoundError(imageId)
        }

        const relationship = await getSpecificRel(racingGameId, imageId, RelType.RacingGameHasPrimeImage)
        if (!relationship) {
            throw new RelNotFoundError(RelType.RacingGameHasPrimeImage, racingGameId, imageId)
        }

        await deleteSpecificRel(racingGameId, imageId, RelType.RacingGameHasPrimeImage)
    },

    async createReleasedOnGamingPlatformRelationship(racingGameId: number, gamingPlatformId: number) {
        const racingGame = await RacingGame.findById(racingGameId)
        if (!racingGame) {
            throw new NodeNotFoundError(racingGameId)
        }

        const gamingPlatform = await GamingPlatform.findById(gamingPlatformId)
        if (!gamingPlatform) {
            throw new NodeNotFoundError(gamingPlatformId)
        }

        const existingRelation = await getSpecificRel(racingGameId, gamingPlatformId, RelType.RacingGameReleasedOnGamingPlatform)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.RacingGameReleasedOnGamingPlatform, racingGameId, gamingPlatformId)
        }


        const createdRelationship = await createRel(racingGameId, gamingPlatformId, RelType.RacingGameReleasedOnGamingPlatform)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getAllReleasedOnGamingPlatformRelationships(racingGameId: number) {
        const racingGame = await RacingGame.findById(racingGameId)
        if (!racingGame) {
            throw new NodeNotFoundError(racingGameId)
        }

        return getAllRels(racingGameId, RelType.RacingGameReleasedOnGamingPlatform)
    },

    async deleteReleasedOnGamingPlatformRelationship(racingGameId: number, gamingPlatformId: number) {
        const racingGame = await RacingGame.findById(racingGameId)
        if (!racingGame) {
            throw new NodeNotFoundError(racingGameId)
        }

        const gamingPlatform = await GamingPlatform.findById(gamingPlatformId)
        if (!gamingPlatform) {
            throw new NodeNotFoundError(gamingPlatformId)
        }

        const relationship = await getSpecificRel(racingGameId, gamingPlatformId, RelType.RacingGameReleasedOnGamingPlatform)
        if (!relationship) {
            throw new RelNotFoundError(RelType.RacingGameReleasedOnGamingPlatform, racingGameId, gamingPlatformId)
        }

        await deleteSpecificRel(racingGameId, gamingPlatformId, RelType.RacingGameReleasedOnGamingPlatform)
    },
}
