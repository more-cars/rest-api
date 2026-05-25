import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {Book} from "../../../../../../../../src/models/node-types/books/Book"
import {RelAlreadyExistsError} from "../../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›has-prime-image‹ relationship again', async () => {
    const book = await seedNode(DbNodeType.Book)
    const image = await seedNode(DbNodeType.Image)

    await expect(Book.createHasPrimeImageRelationship(book.properties.id, image.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(Book.createHasPrimeImageRelationship(book.properties.id, image.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
