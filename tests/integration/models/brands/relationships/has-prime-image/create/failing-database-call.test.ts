import {expect, test, vi} from 'vitest'
import {Brand} from "../../../../../../../src/models/node-types/brands/Brand"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"

test('A completely valid request, but the database call fails (e.g. one of the nodes was deleted just a moment ago)', async () => {
    vi.mock("../../../../../../../src/db/relationships/createRelationship", async () => {
        return {
            createRelationship: () => false
        }
    })

    const brand = await seedNode(NodeTypeEnum.BRAND)
    const image = await seedNode(NodeTypeEnum.IMAGE)

    await expect(Brand.createHasPrimeImageRelationship(brand.id, image.id))
        .rejects
        .toThrow(Error)
})
