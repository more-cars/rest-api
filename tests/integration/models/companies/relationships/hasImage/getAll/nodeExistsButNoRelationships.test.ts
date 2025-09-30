import {assert, expect, test} from 'vitest'
import {seedCompany} from "../../../../../../_toolbox/dbSeeding/companies/nodes/seedCompany"
import {Company} from "../../../../../../../src/models/companies/Company"

test('Company exists, but has no relationships', async () => {
    const company = await seedCompany()

    const relationships = await Company.getAllHasImageRelationships(company.id)

    if (!relationships) {
        assert.fail('Company not found.')
    }

    expect(relationships.length)
        .toBe(0)
})
