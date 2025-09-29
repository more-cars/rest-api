import {expect, test} from 'vitest'
import {seedCompany} from "../../../../../../_toolbox/dbSeeding/companies/nodes/seedCompany"
import {seedRelationshipForStartNode} from "../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {getRelationshipsForSpecificNode} from "../../../../../../../src/db/relationships/getRelationshipsForSpecificNode"

test('Node and relationships exist', async () => {
    const company = await seedCompany()
    await seedRelationshipForStartNode(company.id, 'brand', DbRelationship.CompanyHasBrand)
    await seedRelationshipForStartNode(company.id, 'brand', DbRelationship.CompanyHasBrand)

    const relationships = await getRelationshipsForSpecificNode(
        company.id,
        DbRelationship.CompanyHasBrand,
    )

    expect(relationships.length)
        .toBe(2)
})