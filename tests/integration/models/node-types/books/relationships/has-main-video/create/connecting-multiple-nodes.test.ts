import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedNodes} from "../../../../../../../_toolbox/dbSeeding/seedNodes"
import {Book} from "../../../../../../../../src/models/node-types/books/Book"
import {getRelationshipCollection} from "../../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"

test('A BOOK cannot have multiple ›has-main-video‹ relationships', async () => {
    const book = await seedNode(DbNodeType.Book)
    const videosAmount = 3
    const videos = await seedNodes(DbNodeType.Video, videosAmount)

    for (const video of videos) {
        await Book.createHasMainVideoRelationship(book.properties.id, video.properties.id)
    }

    const relationships = await getRelationshipCollection(book.properties.id, RelationshipType.BookHasMainVideo)

    expect(relationships.length)
        .toBe(1)
})
