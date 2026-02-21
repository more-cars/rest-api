import {expect, test, vi} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {CarModel} from "../../../../../../../src/models/node-types/car-models/CarModel"

test('A completely valid request, but the database call fails (e.g. one of the nodes was deleted just a moment ago)', async () => {
    vi.mock("../../../../../../../src/db/relationships/createRelationship", async () => {
        return {
            createRelationship: () => false
        }
    })

    const carModel = await seedNode(ControllerNodeType.CarModel)
    const carModelVariant = await seedNode(ControllerNodeType.CarModelVariant)

    await expect(CarModel.createHasVariantRelationship(carModel.properties.id, carModelVariant.properties.id))
        .rejects
        .toThrow(Error)
})
