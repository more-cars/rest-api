import {BookInput} from "./types/BookInput"
import {BookNode} from "./types/BookNode"
import {convertInputData} from "./create/convertInputData"
import {createDbNode} from "../../../db/nodes/createDbNode"
import {DbNodeType} from "../../../db/types/DbNodeType"
import {convertDbNodeToModelNode} from "../convertDbNodeToModelNode"
import {getNodeById} from "../../../db/node-types/books/getNodeById"
import {NodeNotFoundError} from "../../types/NodeNotFoundError"

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
}
