import {expect, test, vi} from 'vitest'
import {seedCarModel} from "../../../../../../_toolbox/dbSeeding/car-models/nodes/seedCarModel"
import {CarModel} from "../../../../../../../src/models/car-models/CarModel"

test('A completely valid request, but the database call fails (e.g. one of the nodes was deleted just a moment ago)', async () => {
    vi.mock("../../../../../../../src/db/relationships/createRelationship", async () => {
        return {
            createRelationship: () => false
        }
    })

    const carModel = await seedCarModel()
    const partner = await seedCarModel()

    await expect(CarModel.createIsSuccessorOfRelationship(carModel.id, partner.id))
        .rejects
        .toThrow(Error)
})
