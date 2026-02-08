import {expect, test, vi} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {Image} from "../../../../../../../src/models/images/Image"

test('A completely valid request, but the database call fails for some reason', async () => {
    vi.mock("../../../../../../../src/db/relationships/createRelationship", async () => {
        return {
            createRelationship: () => false
        }
    })

    const image = await seedNode(NodeTypeEnum.IMAGE)
    const partnerNode = await seedNode(NodeTypeEnum.CAR_MODEL)

    await expect(Image.createBelongsToNodeRelationship(image.id, partnerNode.id))
        .rejects
        .toThrow(Error)
})
