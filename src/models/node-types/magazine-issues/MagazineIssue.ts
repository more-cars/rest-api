import {CreateMagazineIssueInput} from "./types/CreateMagazineIssueInput"
import {MagazineIssueNode} from "./types/MagazineIssueNode"
import {convertInputData} from "./create/convertInputData"
import {createNode} from "../../../db/node-types/magazine-issues/createNode"
import {convertDbNodeToModelNode} from "../convertDbNodeToModelNode"
import {getNodeById} from "../../../db/node-types/magazine-issues/getNodeById"
import {NodeNotFoundError} from "../../types/NodeNotFoundError"
import {getAllNodesOfType} from "../../../db/node-types/magazine-issues/getAllNodesOfType"
import type {NodeCollectionConstraints} from "../../types/NodeCollectionConstraints"
import {deleteNode} from "../../../db/nodes/deleteNode"
import {createRel} from "../../relationships/createRel"
import {deleteOutgoingRel} from "../../relationships/deleteOutgoingRel"
import {Magazine} from "../magazines/Magazine"
import {getSpecificRel} from "../../relationships/getSpecificRel"
import {ModelNodeType} from "../../types/ModelNodeType"
import {RelAlreadyExistsError} from "../../types/RelAlreadyExistsError"
import {RelType} from "../../relationships/types/RelType"
import {getRel} from "../../relationships/getRel"
import {RelNotFoundError} from "../../types/RelNotFoundError"
import {deleteSpecificRel} from "../../relationships/deleteSpecificRel"
import {Image} from "../images/Image"

export const MagazineIssue = {
    async create(data: CreateMagazineIssueInput): Promise<MagazineIssueNode> {
        const input = convertInputData(data)
        const result = await createNode(input)

        return convertDbNodeToModelNode(result) as MagazineIssueNode
    },

    async findById(id: number): Promise<MagazineIssueNode> {
        const node = await getNodeById(id)

        if (!node) {
            throw new NodeNotFoundError(id)
        }

        return convertDbNodeToModelNode(node) as MagazineIssueNode
    },

    async findAll(options: NodeCollectionConstraints = {}): Promise<MagazineIssueNode[]> {
        const nodes: MagazineIssueNode[] = []
        const nodesDb = await getAllNodesOfType(options)

        nodesDb.forEach(node => {
            nodes.push(convertDbNodeToModelNode(node) as MagazineIssueNode)
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

    async createBelongsToMagazineRelationship(magazineIssueId: number, magazineId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await MagazineIssue.findById(magazineIssueId)
        await Magazine.findById(magazineId)

        const existingRelation = await getSpecificRel(magazineIssueId, magazineId, RelType.MagazineIssueBelongsToMagazine)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.MagazineIssueBelongsToMagazine, magazineIssueId, magazineId)
        }
        await deleteOutgoingRel(magazineIssueId, RelType.MagazineIssueBelongsToMagazine, ModelNodeType.Magazine)


        const createdRelationship = await createRel(magazineIssueId, magazineId, RelType.MagazineIssueBelongsToMagazine)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getBelongsToMagazineRelationship(magazineIssueId: number) {
        // checking that the node exists -> exception is thrown if not
        await MagazineIssue.findById(magazineIssueId)

        const relationship = await getRel(magazineIssueId, RelType.MagazineIssueBelongsToMagazine)
        if (!relationship) {
            throw new RelNotFoundError(RelType.MagazineIssueBelongsToMagazine, magazineIssueId, null)
        }

        return relationship
    },

    async deleteBelongsToMagazineRelationship(magazineIssueId: number, magazineId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await MagazineIssue.findById(magazineIssueId)
        await Magazine.findById(magazineId)

        const relationship = await getSpecificRel(magazineIssueId, magazineId, RelType.MagazineIssueBelongsToMagazine)
        if (!relationship) {
            throw new RelNotFoundError(RelType.MagazineIssueBelongsToMagazine, magazineIssueId, magazineId)
        }

        await deleteSpecificRel(magazineIssueId, magazineId, RelType.MagazineIssueBelongsToMagazine)
    },

    async createHasImageRelationship(magazineIssueId: number, imageId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await MagazineIssue.findById(magazineIssueId)
        await Image.findById(imageId)

        const existingRelation = await getSpecificRel(magazineIssueId, imageId, RelType.MagazineIssueHasImage)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.MagazineIssueHasImage, magazineIssueId, imageId)
        }

        const createdRelationship = await createRel(magazineIssueId, imageId, RelType.MagazineIssueHasImage)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },
}
