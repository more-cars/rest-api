import {expect, test, vi} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {CarModel} from "../../../../../../../src/models/node-types/car-models/CarModel"

test('A completely valid request, but the database call fails for some reason', async () => {
    vi.mock("../../../../../../../src/db/relationships/createRelationship", async () => {
        return {
            createRelationship: () => false
        }
    })

    const carModel = await seedNode(ControllerNodeType.CAR_MODEL)
    const brand = await seedNode(ControllerNodeType.BRAND)

    await expect(CarModel.createBelongsToBrandRelationship(carModel.id, brand.id))
        .rejects
        .toThrow(Error)
})
