import {assert, expect, test} from 'vitest'
import {seedCompany} from "../../../../../../_toolbox/dbSeeding/companies/nodes/seedCompany"
import {seedRelationshipForStartNode} from "../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {Company} from "../../../../../../../src/models/companies/Company"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"

test('Company and relationships exist', async () => {
    const company = await seedCompany()
    await seedRelationshipForStartNode(company.id, 'image', DbRelationship.CompanyHasImage)
    await seedRelationshipForStartNode(company.id, 'image', DbRelationship.CompanyHasImage)

    const relationships = await Company.getAllHasImageRelationships(company.id)

    if (!relationships) {
        assert.fail('Company not found.')
    }

    expect(relationships.length)
        .toBe(2)
})
