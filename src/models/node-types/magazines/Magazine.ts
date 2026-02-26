import {CreateMagazineInput} from "./types/CreateMagazineInput"
import {MagazineNode} from "./types/MagazineNode"
import {convertInputData} from "./create/convertInputData"
import {createNode} from "../../../db/node-types/magazines/createNode"
import {convertDbNodeToModelNode} from "../convertDbNodeToModelNode"
import {getNodeById} from "../../../db/node-types/magazines/getNodeById"
import {NodeNotFoundError} from "../../types/NodeNotFoundError"
import {getAllNodesOfType} from "../../../db/node-types/magazines/getAllNodesOfType"
import type {NodeCollectionConstraints} from "../../types/NodeCollectionConstraints"
import {deleteNode} from "../../../db/nodes/deleteNode"
import {createRel} from "../../relationships/createRel"
import {Image} from "../images/Image"
import {getSpecificRel} from "../../relationships/getSpecificRel"
import {RelAlreadyExistsError} from "../../types/RelAlreadyExistsError"
import {RelType} from "../../relationships/types/RelType"
import {getAllRels} from "../../relationships/getAllRels"

export const Magazine = {
    async create(data: CreateMagazineInput): Promise<MagazineNode> {
        const input = convertInputData(data)
        const result = await createNode(input)

        return convertDbNodeToModelNode(result) as MagazineNode
    },

    async findById(id: number): Promise<MagazineNode> {
        const node = await getNodeById(id)

        if (!node) {
            throw new NodeNotFoundError(id)
        }

        return convertDbNodeToModelNode(node) as MagazineNode
    },

    async findAll(options: NodeCollectionConstraints = {}): Promise<MagazineNode[]> {
        const nodes: MagazineNode[] = []
        const nodesDb = await getAllNodesOfType(options)

        nodesDb.forEach(node => {
            nodes.push(convertDbNodeToModelNode(node) as MagazineNode)
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

    async createHasImageRelationship(magazineId: number, imageId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await Magazine.findById(magazineId)
        await Image.findById(imageId)

        const existingRelation = await getSpecificRel(magazineId, imageId, RelType.MagazineHasImage)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.MagazineHasImage, magazineId, imageId)
        }

        const createdRelationship = await createRel(magazineId, imageId, RelType.MagazineHasImage)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getAllHasImageRelationships(magazineId: number) {
        // checking that the node exists -> exception is thrown if not
        await Magazine.findById(magazineId)

        return getAllRels(magazineId, RelType.MagazineHasImage)
    },
}
