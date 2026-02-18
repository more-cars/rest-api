import {expect, test, vi} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {SessionResult} from "../../../../../../../src/models/node-types/session-results/SessionResult"

test('A completely valid request, but the database call fails (e.g. one of the nodes was deleted just a moment ago)', async () => {
    vi.mock("../../../../../../../src/db/relationships/createRelationship", async () => {
        return {
            createRelationship: () => false
        }
    })

    const sessionResult = await seedNode(NodeTypeEnum.SESSION_RESULT)
    const carModelVariant = await seedNode(NodeTypeEnum.CAR_MODEL_VARIANT)

    await expect(SessionResult.createAchievedWithCarModelVariantRelationship(sessionResult.id, carModelVariant.id))
        .rejects
        .toThrow(Error)
})
