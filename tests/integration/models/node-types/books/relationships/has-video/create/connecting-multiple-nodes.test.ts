import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedNodes} from "../../../../../../../_toolbox/dbSeeding/seedNodes"
import {Book} from "../../../../../../../../src/models/node-types/books/Book"
import {getRelationshipCollection} from "../../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"

test('A BOOK can have multiple ›has-video‹ relationships', async () => {
    const book = await seedNode(DbNodeType.Book)
    const videosAmount = 3
    const videos = await seedNodes(DbNodeType.Video, videosAmount)

    for (const video of videos) {
        await Book.createHasVideoRelationship(book.properties.id, video.properties.id)
    }

    const relationships = await getRelationshipCollection(book.properties.id, RelationshipType.BookHasVideo)

    expect(relationships.length)
        .toBe(videosAmount)
})
