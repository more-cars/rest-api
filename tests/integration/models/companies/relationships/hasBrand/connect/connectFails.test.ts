import {expect, test, vi} from 'vitest'
import {seedCompany} from "../../../../../../_toolbox/dbSeeding/companies/nodes/seedCompany"
import {seedBrand} from "../../../../../../_toolbox/dbSeeding/brands/nodes/seedBrand"
import {Company} from "../../../../../../../src/models/companies/Company"

test('A completely valid request, but the database call fails (e.g. one of the nodes was deleted just a moment ago)', async () => {
    vi.mock("../../../../../../../src/db/relationships/createRelationship", async () => {
        return {
            createRelationship: () => false
        }
    })

    const company = await seedCompany()
    const brand = await seedBrand()

    await expect(Company.createHasBrandRelationship(company.id, brand.id))
        .rejects
        .toThrow(Error)
})
