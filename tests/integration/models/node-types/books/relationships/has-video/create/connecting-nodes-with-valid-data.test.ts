import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {Book} from "../../../../../../../../src/models/node-types/books/Book"
import {RelType} from "../../../../../../../../src/models/relationships/types/RelType"

test('Creating a ›has-video‹ relationship with valid data', async () => {
    const book = await seedNode(DbNodeType.Book)
    const video = await seedNode(DbNodeType.Video)

    const createdRelationship = await Book.createHasVideoRelationship(book.properties.id, video.properties.id)

    expect(createdRelationship.origin.attributes.id)
        .toEqual(book.properties.id)
    expect(createdRelationship.destination.attributes.id)
        .toEqual(video.properties.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(RelType.BookHasVideo)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
