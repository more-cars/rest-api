import {expect, test, vi} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {CarModel} from "../../../../../../../src/models/node-types/car-models/CarModel"

test('A completely valid request, but the database call fails (e.g. one of the nodes was deleted just a moment ago)', async () => {
    vi.mock("../../../../../../../src/db/relationships/createRelationship", async () => {
        return {
            createRelationship: () => false
        }
    })

    const carModel = await seedNode(NodeTypeEnum.CAR_MODEL)
    const carModelVariant = await seedNode(NodeTypeEnum.CAR_MODEL_VARIANT)

    await expect(CarModel.createHasVariantRelationship(carModel.id, carModelVariant.id))
        .rejects
        .toThrow(Error)
})
