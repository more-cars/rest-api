import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedNodes} from "../../../../../../../_toolbox/dbSeeding/seedNodes"
import {Book} from "../../../../../../../../src/models/node-types/books/Book"
import {getRelationshipCollection} from "../../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"

test('A BOOK can have multiple ›covers-car-model-variant‹ relationships', async () => {
    const book = await seedNode(DbNodeType.Book)
    const carModelVariantsAmount = 3
    const carModelVariants = await seedNodes(DbNodeType.CarModelVariant, carModelVariantsAmount)

    for (const carModelVariant of carModelVariants) {
        await Book.createCoversCarModelVariantRelationship(book.properties.id, carModelVariant.properties.id)
    }

    const relationships = await getRelationshipCollection(book.properties.id, RelationshipType.BookCoversCarModelVariant)

    expect(relationships.length)
        .toBe(carModelVariantsAmount)
})
