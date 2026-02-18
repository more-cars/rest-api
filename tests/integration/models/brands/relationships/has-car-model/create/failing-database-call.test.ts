import {expect, test, vi} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {Brand} from "../../../../../../../src/models/node-types/brands/Brand"

test('A completely valid request, but the database call fails (e.g. one of the nodes was deleted just a moment ago)', async () => {
    vi.mock("../../../../../../../src/db/relationships/createRelationship", async () => {
        return {
            createRelationship: () => false
        }
    })

    const brand = await seedNode(NodeTypeEnum.BRAND)
    const carModel = await seedNode(NodeTypeEnum.CAR_MODEL)

    await expect(Brand.createHasCarModelRelationship(brand.id, carModel.id))
        .rejects
        .toThrow(Error)
})
