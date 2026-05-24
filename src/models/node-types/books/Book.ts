import {BookInput} from "./types/BookInput"
import {BookNode} from "./types/BookNode"
import {convertInputData} from "./create/convertInputData"
import {createDbNode} from "../../../db/nodes/createDbNode"
import {DbNodeType} from "../../../db/types/DbNodeType"
import {convertDbNodeToModelNode} from "../convertDbNodeToModelNode"

export const Book = {
    async create(data: BookInput): Promise<BookNode> {
        const input = convertInputData(data)
        const result = await createDbNode(DbNodeType.Book, input)

        return convertDbNodeToModelNode(result) as BookNode
    },
}
