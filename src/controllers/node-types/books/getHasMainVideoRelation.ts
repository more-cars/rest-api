import express from "express"
import {Book} from "../../../models/node-types/books/Book"
import {convertModelRelationToControllerRelation} from "../../relations/convertModelRelationToControllerRelation"
import {marshalSingleRelation} from "../../relations/marshalSingleRelation"
import {marshalEmptyRelation} from "../../relations/marshalEmptyRelation"
import {ControllerNodeType} from "../../types/ControllerNodeType"
import {RelationType} from "../../types/RelationType"
import {NodeNotFoundError} from "../../../models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../models/types/RelNotFoundError"
import {sendResponse200} from "../../responses/sendResponse200"
import {sendResponse404} from "../../responses/sendResponse404"
import {sendResponse500} from "../../responses/sendResponse500"

export async function getHasMainVideoRelation(req: express.Request, res: express.Response) {
    const bookId = parseInt(req.params.bookId)

    try {
        const modelRelation = await Book.getHasMainVideoRelationship(bookId)
        const relation = convertModelRelationToControllerRelation(modelRelation)
        const marshalledData = marshalSingleRelation(relation)

        return sendResponse200(marshalledData, res)
    } catch (e) {
        if (e instanceof NodeNotFoundError) {
            return sendResponse404(res)
        } else if (e instanceof RelNotFoundError) {
            const marshalledData = marshalEmptyRelation(ControllerNodeType.Book, bookId, RelationType.BookHasMainVideo)
            return sendResponse200(marshalledData, res)
        } else {
            console.error(e)
            return sendResponse500(res)
        }
    }
}
