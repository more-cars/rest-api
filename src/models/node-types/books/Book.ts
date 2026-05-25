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
import {deleteSpecificRel} from "../../relationships/deleteSpecificRel"
import {RelNotFoundError} from "../../types/RelNotFoundError"
import {Video} from "../videos/Video"
import {deleteOutgoingRel} from "../../relationships/deleteOutgoingRel"
import {getRel} from "../../relationships/getRel"
import {Image} from "../images/Image"

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

    async deleteCoversCarModelVariantRelationship(bookId: number, carModelVariantId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await Book.findById(bookId)
        await CarModelVariant.findById(carModelVariantId)

        const relationship = await getSpecificRel(bookId, carModelVariantId, RelType.BookCoversCarModelVariant)
        if (!relationship) {
            throw new RelNotFoundError(RelType.BookCoversCarModelVariant, bookId, carModelVariantId)
        }

        await deleteSpecificRel(bookId, carModelVariantId, RelType.BookCoversCarModelVariant)
    },

    async createHasImageRelationship(bookId: number, imageId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await Book.findById(bookId)
        await Image.findById(imageId)

        const existingRelation = await getSpecificRel(bookId, imageId, RelType.BookHasImage)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.BookHasImage, bookId, imageId)
        }


        const createdRelationship = await createRel(bookId, imageId, RelType.BookHasImage)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getAllHasImageRelationships(bookId: number) {
        // checking that the node exists -> exception is thrown if not
        await Book.findById(bookId)

        return getAllRels(bookId, RelType.BookHasImage)
    },

    async deleteHasImageRelationship(bookId: number, imageId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await Book.findById(bookId)
        await Image.findById(imageId)

        const relationship = await getSpecificRel(bookId, imageId, RelType.BookHasImage)
        if (!relationship) {
            throw new RelNotFoundError(RelType.BookHasImage, bookId, imageId)
        }

        await deleteSpecificRel(bookId, imageId, RelType.BookHasImage)
    },

    async createHasPrimeImageRelationship(bookId: number, imageId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await Book.findById(bookId)
        await Image.findById(imageId)

        const existingRelation = await getSpecificRel(bookId, imageId, RelType.BookHasPrimeImage)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.BookHasPrimeImage, bookId, imageId)
        }
        await deleteOutgoingRel(bookId, RelType.BookHasPrimeImage)


        const createdRelationship = await createRel(bookId, imageId, RelType.BookHasPrimeImage)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getHasPrimeImageRelationship(bookId: number) {
        // checking that the node exists -> exception is thrown if not
        await Book.findById(bookId)

        const relationship = await getRel(bookId, RelType.BookHasPrimeImage)
        if (!relationship) {
            throw new RelNotFoundError(RelType.BookHasPrimeImage, bookId, null)
        }

        return relationship
    },

    async deleteHasPrimeImageRelationship(bookId: number, imageId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await Book.findById(bookId)
        await Image.findById(imageId)

        const relationship = await getSpecificRel(bookId, imageId, RelType.BookHasPrimeImage)
        if (!relationship) {
            throw new RelNotFoundError(RelType.BookHasPrimeImage, bookId, imageId)
        }

        await deleteSpecificRel(bookId, imageId, RelType.BookHasPrimeImage)
    },

    async createHasVideoRelationship(bookId: number, videoId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await Book.findById(bookId)
        await Video.findById(videoId)

        const existingRelation = await getSpecificRel(bookId, videoId, RelType.BookHasVideo)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.BookHasVideo, bookId, videoId)
        }

        const createdRelationship = await createRel(bookId, videoId, RelType.BookHasVideo)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getAllHasVideoRelationships(bookId: number) {
        // checking that the node exists -> exception is thrown if not
        await Book.findById(bookId)

        return getAllRels(bookId, RelType.BookHasVideo)
    },

    async deleteHasVideoRelationship(bookId: number, videoId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await Book.findById(bookId)
        await Video.findById(videoId)

        const relationship = await getSpecificRel(bookId, videoId, RelType.BookHasVideo)
        if (!relationship) {
            throw new RelNotFoundError(RelType.BookHasVideo, bookId, videoId)
        }

        await deleteSpecificRel(bookId, videoId, RelType.BookHasVideo)
    },

    async createHasMainVideoRelationship(bookId: number, videoId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await Book.findById(bookId)
        await Video.findById(videoId)

        const existingRelation = await getSpecificRel(bookId, videoId, RelType.BookHasMainVideo)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.BookHasMainVideo, bookId, videoId)
        }
        await deleteOutgoingRel(bookId, RelType.BookHasMainVideo)

        const createdRelationship = await createRel(bookId, videoId, RelType.BookHasMainVideo)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getHasMainVideoRelationship(bookId: number) {
        // checking that the node exists -> exception is thrown if not
        await Book.findById(bookId)

        const relationship = await getRel(bookId, RelType.BookHasMainVideo)
        if (!relationship) {
            throw new RelNotFoundError(RelType.BookHasMainVideo, bookId, null)
        }

        return relationship
    },

    async deleteHasMainVideoRelationship(bookId: number, videoId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await Book.findById(bookId)
        await Video.findById(videoId)

        const relationship = await getSpecificRel(bookId, videoId, RelType.BookHasMainVideo)
        if (!relationship) {
            throw new RelNotFoundError(RelType.BookHasMainVideo, bookId, videoId)
        }

        await deleteSpecificRel(bookId, videoId, RelType.BookHasMainVideo)
    },
}
