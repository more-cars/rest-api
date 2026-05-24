import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {Book} from "../../../../../../../../src/models/node-types/books/Book"
import {RelAlreadyExistsError} from "../../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›has-main-video‹ relationship again', async () => {
    const book = await seedNode(DbNodeType.Book)
    const video = await seedNode(DbNodeType.Video)

    await expect(Book.createHasMainVideoRelationship(book.properties.id, video.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(Book.createHasMainVideoRelationship(book.properties.id, video.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
