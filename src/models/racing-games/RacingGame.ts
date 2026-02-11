import {CreateRacingGameInput} from "./types/CreateRacingGameInput"
import {RacingGameNode} from "./types/RacingGameNode"
import {convertInputData} from "./create/convertInputData"
import {createNode} from "../../db/nodes/racing-games/createNode"
import {convertOutputData} from "./create/convertOutputData"
import {getNodeById} from "../../db/nodes/racing-games/getNodeById"
import {getAllNodesOfType} from "../../db/nodes/racing-games/getAllNodesOfType"
import type {NodeCollectionConstraints} from "../types/NodeCollectionConstraints"
import {deleteNode} from "../../db/nodes/deleteNode"
import {NodeNotFoundError} from "../types/NodeNotFoundError"
import {createRel} from "../relationships/createRel"
import {CarModelVariant} from "../car-model-variants/CarModelVariant"
import {getSpecificRel} from "../relationships/getSpecificRel"
import {RelationshipAlreadyExistsError} from "../types/RelationshipAlreadyExistsError"
import {RelationshipType} from "../relationships/types/RelationshipType"
import {RacingGameRelationship} from "./types/RacingGameRelationship"
import {getAllRels} from "../relationships/getAllRels"
import {deleteSpecificRel} from "../relationships/deleteSpecificRel"
import {RelationshipNotFoundError} from "../types/RelationshipNotFoundError"
import {TrackLayout} from "../track-layouts/TrackLayout"


export const RacingGame = {
    async create(data: CreateRacingGameInput): Promise<RacingGameNode> {
        const input = convertInputData(data)
        const result = await createNode(input)
        const output = convertOutputData(result)

        return output
    },

    async findById(id: number): Promise<false | RacingGameNode> {
        const node = await getNodeById(id)

        if (!node) {
            return false
        }

        return convertOutputData(node)
    },

    async findAll(options: NodeCollectionConstraints = {}): Promise<RacingGameNode[]> {
        const nodes: RacingGameNode[] = []
        const nodesDb = await getAllNodesOfType(options)

        nodesDb.forEach(node => {
            nodes.push(convertOutputData(node))
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

        const existingRelation = await getSpecificRel(racingGameId, carModelVariantId, RelationshipType.RacingGameFeaturesCarModelVariant)
        if (existingRelation) {
            throw new RelationshipAlreadyExistsError(RacingGameRelationship.featuresCarModelVariant, racingGameId, carModelVariantId)
        }


        const createdRelationship = await createRel(racingGameId, carModelVariantId, RelationshipType.RacingGameFeaturesCarModelVariant)
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

        return getAllRels(racingGameId, RelationshipType.RacingGameFeaturesCarModelVariant)
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

        const relationship = await getSpecificRel(racingGameId, carModelVariantId, RelationshipType.RacingGameFeaturesCarModelVariant)
        if (!relationship) {
            throw new RelationshipNotFoundError(RacingGameRelationship.featuresCarModelVariant, racingGameId, carModelVariantId)
        }

        await deleteSpecificRel(racingGameId, carModelVariantId, RelationshipType.RacingGameFeaturesCarModelVariant)
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

        const existingRelation = await getSpecificRel(racingGameId, trackLayoutId, RelationshipType.RacingGameFeaturesTrackLayout)
        if (existingRelation) {
            throw new RelationshipAlreadyExistsError(RacingGameRelationship.featuresTrackLayout, racingGameId, trackLayoutId)
        }


        const createdRelationship = await createRel(racingGameId, trackLayoutId, RelationshipType.RacingGameFeaturesTrackLayout)
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

        return getAllRels(racingGameId, RelationshipType.RacingGameFeaturesTrackLayout)
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

        const relationship = await getSpecificRel(racingGameId, trackLayoutId, RelationshipType.RacingGameFeaturesTrackLayout)
        if (!relationship) {
            throw new RelationshipNotFoundError(RacingGameRelationship.featuresTrackLayout, racingGameId, trackLayoutId)
        }

        await deleteSpecificRel(racingGameId, trackLayoutId, RelationshipType.RacingGameFeaturesTrackLayout)
    },
}
