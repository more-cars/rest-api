import {expect, test} from 'vitest'
import {seedCompany} from "../../../../../../_toolbox/dbSeeding/companies/nodes/seedCompany"
import {Company} from "../../../../../../../src/models/companies/Company"

test('COMPANY exists, but has no ›has-brand‹ relationships', async () => {
    const company = await seedCompany()

    const relationships = await Company.getAllHasBrandRelationships(company.id)

    expect(relationships.length)
        .toBe(0)
})
