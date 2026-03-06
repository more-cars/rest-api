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
import {ModelNodeType} from "../../types/ModelNodeType"
import {RelAlreadyExistsError} from "../../types/RelAlreadyExistsError"
import {RelType} from "../../relationships/types/RelType"
import {getRel} from "../../relationships/getRel"
import {RelNotFoundError} from "../../types/RelNotFoundError"
import {deleteSpecificRel} from "../../relationships/deleteSpecificRel"

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
        await deleteOutgoingRel(ratingId, RelType.RatingByMagazineIssue, ModelNodeType.MagazineIssue)


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
}
