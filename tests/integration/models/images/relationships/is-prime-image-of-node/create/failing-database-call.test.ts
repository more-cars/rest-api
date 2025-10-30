import {expect, test, vi} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {Image} from "../../../../../../../src/models/images/Image"

test('A completely valid request, but the database call fails (e.g. one of the nodes was deleted just a moment ago)', async () => {
    vi.mock("../../../../../../../src/db/relationships/createRelationship", async () => {
        return {
            createRelationship: () => false
        }
    })

    const image = await seedNode(NodeTypeEnum.IMAGE)
    const node = await seedNode(NodeTypeEnum.COMPANY)

    await expect(Image.createIsPrimeImageOfNodeRelationship(image.id, node.id))
        .rejects
        .toThrow(Error)
})
