import {CreateRatingInput} from "./types/CreateRatingInput"
import {RatingNode} from "./types/RatingNode"
import {convertInputData} from "./create/convertInputData"
import {createNode} from "../../../db/node-types/ratings/createNode"
import {convertDbNodeToModelNode} from "../convertDbNodeToModelNode"
import {getNodeById} from "../../../db/node-types/ratings/getNodeById"
import {NodeNotFoundError} from "../../types/NodeNotFoundError"
import {getAllNodesOfType} from "../../../db/node-types/ratings/getAllNodesOfType"
import type {NodeCollectionConstraints} from "../../types/NodeCollectionConstraints"
import {deleteNode} from "../../../db/nodes/deleteNode"
import {createRel} from "../../relationships/createRel"
import {deleteOutgoingRel} from "../../relationships/deleteOutgoingRel"
import {MagazineIssue} from "../magazine-issues/MagazineIssue"
import {getSpecificRel} from "../../relationships/getSpecificRel"
import {RelAlreadyExistsError} from "../../types/RelAlreadyExistsError"
import {RelType} from "../../relationships/types/RelType"
import {getRel} from "../../relationships/getRel"
import {RelNotFoundError} from "../../types/RelNotFoundError"
import {deleteSpecificRel} from "../../relationships/deleteSpecificRel"
import {CarModelVariant} from "../car-model-variants/CarModelVariant"
import {Image} from "../images/Image"
import {getAllRels} from "../../relationships/getAllRels"

export const Rating = {
    async create(data: CreateRatingInput): Promise<RatingNode> {
        const input = convertInputData(data)
        const result = await createNode(input)

        return convertDbNodeToModelNode(result) as RatingNode
    },

    async findById(id: number): Promise<RatingNode> {
        const node = await getNodeById(id)

        if (!node) {
            throw new NodeNotFoundError(id)
        }

        return convertDbNodeToModelNode(node) as RatingNode
    },

    async findAll(options: NodeCollectionConstraints = {}): Promise<RatingNode[]> {
        const nodes: RatingNode[] = []
        const nodesDb = await getAllNodesOfType(options)

        nodesDb.forEach(node => {
            nodes.push(convertDbNodeToModelNode(node) as RatingNode)
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

    async createByMagazineIssueRelationship(ratingId: number, magazineIssueId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await Rating.findById(ratingId)
        await MagazineIssue.findById(magazineIssueId)

        const existingRelation = await getSpecificRel(ratingId, magazineIssueId, RelType.RatingByMagazineIssue)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.RatingByMagazineIssue, ratingId, magazineIssueId)
        }

        await deleteOutgoingRel(ratingId, RelType.RatingByMagazineIssue)

        const createdRelationship = await createRel(ratingId, magazineIssueId, RelType.RatingByMagazineIssue)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getByMagazineIssueRelationship(ratingId: number) {
        // checking that the node exists -> exception is thrown if not
        await Rating.findById(ratingId)

        const relationship = await getRel(ratingId, RelType.RatingByMagazineIssue)
        if (!relationship) {
            throw new RelNotFoundError(RelType.RatingByMagazineIssue, ratingId, null)
        }

        return relationship
    },

    async deleteByMagazineIssueRelationship(ratingId: number, magazineIssueId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await Rating.findById(ratingId)
        await MagazineIssue.findById(magazineIssueId)

        const relationship = await getSpecificRel(ratingId, magazineIssueId, RelType.RatingByMagazineIssue)
        if (!relationship) {
            throw new RelNotFoundError(RelType.RatingByMagazineIssue, ratingId, magazineIssueId)
        }

        await deleteSpecificRel(ratingId, magazineIssueId, RelType.RatingByMagazineIssue)
    },

    async createForCarModelVariantRelationship(ratingId: number, carModelVariantId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await Rating.findById(ratingId)
        await CarModelVariant.findById(carModelVariantId)

        const existingRelation = await getSpecificRel(ratingId, carModelVariantId, RelType.RatingForCarModelVariant)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.RatingForCarModelVariant, ratingId, carModelVariantId)
        }

        await deleteOutgoingRel(ratingId, RelType.RatingForCarModelVariant)

        const createdRelationship = await createRel(ratingId, carModelVariantId, RelType.RatingForCarModelVariant)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getForCarModelVariantRelationship(ratingId: number) {
        // checking that the node exists -> exception is thrown if not
        await Rating.findById(ratingId)

        const relationship = await getRel(ratingId, RelType.RatingForCarModelVariant)
        if (!relationship) {
            throw new RelNotFoundError(RelType.RatingForCarModelVariant, ratingId, null)
        }

        return relationship
    },

    async deleteForCarModelVariantRelationship(ratingId: number, carModelVariantId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await Rating.findById(ratingId)
        await CarModelVariant.findById(carModelVariantId)

        const relationship = await getSpecificRel(ratingId, carModelVariantId, RelType.RatingForCarModelVariant)
        if (!relationship) {
            throw new RelNotFoundError(RelType.RatingForCarModelVariant, ratingId, carModelVariantId)
        }

        await deleteSpecificRel(ratingId, carModelVariantId, RelType.RatingForCarModelVariant)
    },

    async createHasImageRelationship(ratingId: number, imageId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await Rating.findById(ratingId)
        await Image.findById(imageId)

        const existingRelation = await getSpecificRel(ratingId, imageId, RelType.RatingHasImage)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.RatingHasImage, ratingId, imageId)
        }

        const createdRelationship = await createRel(ratingId, imageId, RelType.RatingHasImage)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getAllHasImageRelationships(ratingId: number) {
        // checking that the node exists -> exception is thrown if not
        await Rating.findById(ratingId)

        return getAllRels(ratingId, RelType.RatingHasImage)
    },

    async deleteHasImageRelationship(ratingId: number, imageId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await Rating.findById(ratingId)
        await Image.findById(imageId)

        const relationship = await getSpecificRel(ratingId, imageId, RelType.RatingHasImage)
        if (!relationship) {
            throw new RelNotFoundError(RelType.RatingHasImage, ratingId, imageId)
        }

        await deleteSpecificRel(ratingId, imageId, RelType.RatingHasImage)
    },

    async createHasPrimeImageRelationship(ratingId: number, imageId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await Rating.findById(ratingId)
        await Image.findById(imageId)

        const existingRelation = await getSpecificRel(ratingId, imageId, RelType.RatingHasPrimeImage)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.RatingHasPrimeImage, ratingId, imageId)
        }

        await deleteOutgoingRel(ratingId, RelType.RatingHasPrimeImage)

        const createdRelationship = await createRel(ratingId, imageId, RelType.RatingHasPrimeImage)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getHasPrimeImageRelationship(ratingId: number) {
        // checking that the node exists -> exception is thrown if not
        await Rating.findById(ratingId)

        const relationship = await getRel(ratingId, RelType.RatingHasPrimeImage)
        if (!relationship) {
            throw new RelNotFoundError(RelType.RatingHasPrimeImage, ratingId, null)
        }

        return relationship
    },

    async deleteHasPrimeImageRelationship(ratingId: number, imageId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await Rating.findById(ratingId)
        await Image.findById(imageId)

        const relationship = await getSpecificRel(ratingId, imageId, RelType.RatingHasPrimeImage)
        if (!relationship) {
            throw new RelNotFoundError(RelType.RatingHasPrimeImage, ratingId, imageId)
        }

        await deleteSpecificRel(ratingId, imageId, RelType.RatingHasPrimeImage)
    },
}
