import {expect, test, vi} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {Company} from "../../../../../../../src/models/companies/Company"

test('A completely valid request, but the database call fails (e.g. one of the nodes was deleted just a moment ago)', async () => {
    vi.mock("../../../../../../../src/db/relationships/createRelationship", async () => {
        return {
            createRelationship: () => false
        }
    })

    const company = await seedNode(NodeTypeEnum.COMPANY)
    const image = await seedNode(NodeTypeEnum.IMAGE)

    await expect(Company.createHasImageRelationship(company.id, image.id))
        .rejects
        .toThrow(Error)
})
