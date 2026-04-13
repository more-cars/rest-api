import {expect, test, vi} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {CarModelVariant} from "../../../../../../../../src/models/node-types/car-model-variants/CarModelVariant"

vi.mock("../../../../../../../../src/db/relationships/createRelationship", async () => {
    return {
        createRelationship: () => false
    }
})

test('A completely valid request, but the database call fails (e.g. one of the nodes was deleted just a moment ago)', async () => {
    const carModelVariant = await seedNode(DbNodeType.CarModelVariant)
    const price = await seedNode(DbNodeType.Price)

    await expect(CarModelVariant.createHasPriceRelationship(carModelVariant.properties.id, price.properties.id))
        .rejects
        .toThrow(Error)
})
