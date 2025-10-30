import {expect, test, vi} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {CarModelVariant} from "../../../../../../../src/models/car-model-variants/CarModelVariant"

test('A completely valid request, but the database call fails (e.g. one of the nodes was deleted just a moment ago)', async () => {
    vi.mock("../../../../../../../src/db/relationships/createRelationship", async () => {
        return {
            createRelationship: () => false
        }
    })

    const carModelVariant = await seedNode(NodeTypeEnum.CAR_MODEL_VARIANT)
    const image = await seedNode(NodeTypeEnum.IMAGE)

    await expect(CarModelVariant.createHasImageRelationship(carModelVariant.id, image.id))
        .rejects
        .toThrow(Error)
})
