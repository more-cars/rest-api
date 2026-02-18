import {expect, test, vi} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {Company} from "../../../../../../../src/models/node-types/companies/Company"

test('A completely valid request, but the database call fails (e.g. one of the nodes was deleted just a moment ago)', async () => {
    vi.mock("../../../../../../../src/db/relationships/createRelationship", async () => {
        return {
            createRelationship: () => false
        }
    })

    const company = await seedNode(NodeTypeEnum.COMPANY)
    const brand = await seedNode(NodeTypeEnum.BRAND)

    await expect(Company.createHasBrandRelationship(company.id, brand.id))
        .rejects
        .toThrow(Error)
})
