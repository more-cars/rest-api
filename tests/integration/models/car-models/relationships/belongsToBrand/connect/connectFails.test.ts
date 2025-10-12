import {expect, test, vi} from 'vitest'
import {seedCarModel} from "../../../../../../_toolbox/dbSeeding/car-models/nodes/seedCarModel"
import {seedBrand} from "../../../../../../_toolbox/dbSeeding/brands/nodes/seedBrand"
import {CarModel} from "../../../../../../../src/models/car-models/CarModel"

test('A completely valid request, but the database call fails for some reason', async () => {
    vi.mock("../../../../../../../src/db/relationships/createRelationship", async () => {
        return {
            createRelationship: () => false
        }
    })

    const carModel = await seedCarModel()
    const brand = await seedBrand()

    await expect(CarModel.createBelongsToBrandRelationship(carModel.id, brand.id))
        .rejects
        .toThrow(Error)
})
