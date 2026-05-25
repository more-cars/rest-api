import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedNodes} from "../../../../../../../_toolbox/dbSeeding/seedNodes"
import {Book} from "../../../../../../../../src/models/node-types/books/Book"
import {getRelationshipCollection} from "../../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"

test('A BOOK cannot have multiple ›has-prime-image‹ relationships', async () => {
    const book = await seedNode(DbNodeType.Book)
    const imagesAmount = 3
    const images = await seedNodes(DbNodeType.Image, imagesAmount)

    for (const image of images) {
        await Book.createHasPrimeImageRelationship(book.properties.id, image.properties.id)
    }

    const relationships = await getRelationshipCollection(book.properties.id, RelationshipType.BookHasPrimeImage)

    expect(relationships.length)
        .toBe(1)
})
