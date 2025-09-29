import {expect, test, vi} from 'vitest'
import {seedCompany} from "../../../../../../_toolbox/dbSeeding/companies/nodes/seedCompany"
import {seedImage} from "../../../../../../_toolbox/dbSeeding/images/nodes/seedImage"
import {Company} from "../../../../../../../src/models/companies/Company"

test('A completely valid request, but the database call fails (e.g. one of the nodes was deleted just a moment ago)', async () => {
    vi.mock("../../../../../../../src/db/relationships/createRelationship", async () => {
        return {
            createRelationship: () => false
        }
    })

    const company = await seedCompany()
    const image = await seedImage()

    await expect(Company.createHasPrimeImageRelationship(company.id, image.id))
        .rejects
        .toThrow(Error)
})
