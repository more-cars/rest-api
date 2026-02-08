import {expect, test, vi} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {CarModel} from "../../../../../../../src/models/car-models/CarModel"

test('A completely valid request, but the database call fails (e.g. one of the nodes was deleted just a moment ago)', async () => {
    vi.mock("../../../../../../../src/db/relationships/createRelationship", async () => {
        return {
            createRelationship: () => false
        }
    })

    const carModel = await seedNode(NodeTypeEnum.CAR_MODEL)
    const partnerNode = await seedNode(NodeTypeEnum.CAR_MODEL)

    await expect(CarModel.createHasSuccessorRelationship(carModel.id, partnerNode.id))
        .rejects
        .toThrow(Error)
})
