import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {Book} from "../../../../../../../../src/models/node-types/books/Book"
import {RelAlreadyExistsError} from "../../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›covers-car-model-variant‹ relationship again', async () => {
    const book = await seedNode(DbNodeType.Book)
    const carModelVariant = await seedNode(DbNodeType.CarModelVariant)

    await expect(Book.createCoversCarModelVariantRelationship(book.properties.id, carModelVariant.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(Book.createCoversCarModelVariantRelationship(book.properties.id, carModelVariant.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
