import {expect, test, vi} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {CarModel} from "../../../../../../../src/models/node-types/car-models/CarModel"

test('A completely valid request, but the database call fails for some reason', async () => {
    vi.mock("../../../../../../../src/db/relationships/createRelationship", async () => {
        return {
            createRelationship: () => false
        }
    })

    const carModel = await seedNode(DbNodeType.CarModel)
    const brand = await seedNode(DbNodeType.Brand)

    await expect(CarModel.createBelongsToBrandRelationship(carModel.properties.id, brand.properties.id))
        .rejects
        .toThrow(Error)
})
