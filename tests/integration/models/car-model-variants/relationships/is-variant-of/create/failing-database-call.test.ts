import {expect, test, vi} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {CarModelVariant} from "../../../../../../../src/models/node-types/car-model-variants/CarModelVariant"

test('A completely valid request, but the database call fails (e.g. one of the nodes was deleted just a moment ago)', async () => {
    vi.mock("../../../../../../../src/db/relationships/createRelationship", async () => {
        return {
            createRelationship: () => false
        }
    })

    const carModelVariant = await seedNode(ControllerNodeType.CAR_MODEL_VARIANT)
    const carModel = await seedNode(ControllerNodeType.CAR_MODEL)

    await expect(CarModelVariant.createIsVariantOfRelationship(carModelVariant.properties.id, carModel.properties.id))
        .rejects
        .toThrow(Error)
})
