import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {CarModelVariant} from "../../../../../../../../src/models/node-types/car-model-variants/CarModelVariant"
import {RelAlreadyExistsError} from "../../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›is-covered-by-book‹ relationship again', async () => {
    const carModelVariant = await seedNode(DbNodeType.CarModelVariant)
    const book = await seedNode(DbNodeType.Book)

    await expect(CarModelVariant.createIsCoveredByBookRelationship(carModelVariant.properties.id, book.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(CarModelVariant.createIsCoveredByBookRelationship(carModelVariant.properties.id, book.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
