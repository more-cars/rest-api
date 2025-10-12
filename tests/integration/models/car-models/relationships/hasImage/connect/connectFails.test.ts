import {expect, test, vi} from 'vitest'
import {seedCarModel} from "../../../../../../_toolbox/dbSeeding/car-models/nodes/seedCarModel"
import {seedImage} from "../../../../../../_toolbox/dbSeeding/images/nodes/seedImage"
import {CarModel} from "../../../../../../../src/models/car-models/CarModel"

test('A completely valid request, but the database call fails for some reason', async () => {
    vi.mock("../../../../../../../src/db/relationships/createRelationship", async () => {
        return {
            createRelationship: () => false
        }
    })

    const carModel = await seedCarModel()
    const image = await seedImage()

    await expect(CarModel.createHasImageRelationship(carModel.id, image.id))
        .rejects
        .toThrow(Error)
})
