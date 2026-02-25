import {expect, test, vi} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {CarModel} from "../../../../../../../../src/models/node-types/car-models/CarModel"

test('A completely valid request, but the database call fails (e.g. one of the nodes was deleted just a moment ago)', async () => {
    vi.mock("../../../../../../../../src/db/relationships/createRelationship", async () => {
        return {
            createRelationship: () => false
        }
    })

    const carModel = await seedNode(DbNodeType.CarModel)
    const carModelVariant = await seedNode(DbNodeType.CarModelVariant)

    await expect(CarModel.createHasVariantRelationship(carModel.properties.id, carModelVariant.properties.id))
        .rejects
        .toThrow(Error)
})
