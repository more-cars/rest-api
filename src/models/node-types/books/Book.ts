import {BookInput} from "./types/BookInput"
import {BookNode} from "./types/BookNode"
import {convertInputData} from "./create/convertInputData"
import {createDbNode} from "../../../db/nodes/createDbNode"
import {convertDbNodeToModelNode} from "../convertDbNodeToModelNode"
import {getNodeById} from "../../../db/node-types/books/getNodeById"
import {NodeNotFoundError} from "../../types/NodeNotFoundError"
import {fetchNodesFromDb} from "../../../db/nodes/fetchNodesFromDb"
import {DbNodeType} from "../../../db/types/DbNodeType"
import {getDbQueryCollectionParams} from "../../../db/nodes/getDbQueryCollectionParams"
import type {NodeCollectionConstraints} from "../../types/NodeCollectionConstraints"
import {updateDbNode} from "../../../db/nodes/updateDbNode"
import {Revision} from "../revisions/Revision"
import {deleteNode} from "../../../db/nodes/deleteNode"
import {createRel} from "../../relationships/createRel"
import {CarModelVariant} from "../car-model-variants/CarModelVariant"
import {getSpecificRel} from "../../relationships/getSpecificRel"
import {RelAlreadyExistsError} from "../../types/RelAlreadyExistsError"
import {RelType} from "../../relationships/types/RelType"
import {getAllRels} from "../../relationships/getAllRels"

export const Book = {
    async create(data: BookInput): Promise<BookNode> {
        const input = convertInputData(data)
        const result = await createDbNode(DbNodeType.Book, input)

        return convertDbNodeToModelNode(result) as BookNode
    },

    async findById(id: number): Promise<BookNode> {
        const node = await getNodeById(id)

        if (!node) {
            throw new NodeNotFoundError(id)
        }

        return convertDbNodeToModelNode(node) as BookNode
    },

    async findAll(options: NodeCollectionConstraints = {}): Promise<BookNode[]> {
        const nodes: BookNode[] = []
        const nodesDb = await fetchNodesFromDb(DbNodeType.Book, getDbQueryCollectionParams(options))

        nodesDb.forEach(node => {
            nodes.push(convertDbNodeToModelNode(node) as BookNode)
        })

        return nodes
    },

    async update(id: number, data: BookInput): Promise<BookNode> {
        const node = await getNodeById(id)

        if (!node) {
            throw new NodeNotFoundError(id)
        }

        const input = convertInputData(data)
        const result = await updateDbNode(DbNodeType.Book, id, input)

        await Revision.create({
            node_type: DbNodeType.Book,
            node_id: node.properties.id,
            node_created_at: node.properties.created_at,
            node_updated_at: node.properties.updated_at,
            ...node.properties,
        })

        return convertDbNodeToModelNode(result) as BookNode
    },

    async delete(id: number): Promise<void> {
        const node = await getNodeById(id)

        if (!node) {
            throw new NodeNotFoundError(id)
        }

        await deleteNode(id)
    },

    async createCoversCarModelVariantRelationship(bookId: number, carModelVariantId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await Book.findById(bookId)
        await CarModelVariant.findById(carModelVariantId)

        const existingRelation = await getSpecificRel(bookId, carModelVariantId, RelType.BookCoversCarModelVariant)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.BookCoversCarModelVariant, bookId, carModelVariantId)
        }

        const createdRelationship = await createRel(bookId, carModelVariantId, RelType.BookCoversCarModelVariant)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getAllCoversCarModelVariantRelationships(bookId: number) {
        // checking that the node exists -> exception is thrown if not
        await Book.findById(bookId)

        return getAllRels(bookId, RelType.BookCoversCarModelVariant)
    },
}
