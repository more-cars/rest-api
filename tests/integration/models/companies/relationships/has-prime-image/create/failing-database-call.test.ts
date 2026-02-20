import {expect, test, vi} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {Company} from "../../../../../../../src/models/node-types/companies/Company"

test('A completely valid request, but the database call fails (e.g. one of the nodes was deleted just a moment ago)', async () => {
    vi.mock("../../../../../../../src/db/relationships/createRelationship", async () => {
        return {
            createRelationship: () => false
        }
    })

    const company = await seedNode(ControllerNodeType.COMPANY)
    const image = await seedNode(ControllerNodeType.IMAGE)

    await expect(Company.createHasPrimeImageRelationship(company.properties.id, image.properties.id))
        .rejects
        .toThrow(Error)
})
