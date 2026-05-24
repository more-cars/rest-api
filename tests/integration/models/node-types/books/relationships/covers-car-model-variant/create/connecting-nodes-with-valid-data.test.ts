import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {Book} from "../../../../../../../../src/models/node-types/books/Book"
import {RelType} from "../../../../../../../../src/models/relationships/types/RelType"

test('Creating a ›covers-car-model-variant‹ relationship with valid data', async () => {
    const book = await seedNode(DbNodeType.Book)
    const carModelVariant = await seedNode(DbNodeType.CarModelVariant)

    const createdRelationship = await Book.createCoversCarModelVariantRelationship(book.properties.id, carModelVariant.properties.id)

    expect(createdRelationship.origin.attributes.id)
        .toEqual(book.properties.id)
    expect(createdRelationship.destination.attributes.id)
        .toEqual(carModelVariant.properties.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(RelType.BookCoversCarModelVariant)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
