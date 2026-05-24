import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {Book} from "../../../../../../../../src/models/node-types/books/Book"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›has-video‹ relationship with nodes that do not exist', async () => {
    const book = await seedNode(DbNodeType.Book)
    const video = await seedNode(DbNodeType.Video)

    await expect(Book.createHasVideoRelationship(-42, video.properties.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(Book.createHasVideoRelationship(book.properties.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(Book.createHasVideoRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
