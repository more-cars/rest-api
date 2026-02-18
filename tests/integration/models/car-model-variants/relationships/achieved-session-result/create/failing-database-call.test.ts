import {expect, test, vi} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {CarModelVariant} from "../../../../../../../src/models/node-types/car-model-variants/CarModelVariant"

test('A completely valid request, but the database call fails (e.g. one of the nodes was deleted just a moment ago)', async () => {
    vi.mock("../../../../../../../src/db/relationships/createRelationship", async () => {
        return {
            createRelationship: () => false
        }
    })

    const carModelVariant = await seedNode(NodeTypeEnum.CAR_MODEL_VARIANT)
    const sessionResult = await seedNode(NodeTypeEnum.SESSION_RESULT)

    await expect(CarModelVariant.createAchievedSessionResultRelationship(carModelVariant.id, sessionResult.id))
        .rejects
        .toThrow(Error)
})
