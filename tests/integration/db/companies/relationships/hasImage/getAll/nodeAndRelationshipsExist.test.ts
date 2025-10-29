import {expect, test} from 'vitest'
import {seedCompany} from "../../../../../../_toolbox/dbSeeding/companies/nodes/seedCompany"
import {seedRelationshipForStartNode} from "../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {
    getRelationshipCollection
} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"

test('Node and relationships exist', async () => {
    const company = await seedCompany()
    await seedRelationshipForStartNode(company.id, NodeTypeEnum.IMAGE, DbRelationship.CompanyHasImage)
    await seedRelationshipForStartNode(company.id, NodeTypeEnum.IMAGE, DbRelationship.CompanyHasImage)

    const relationships = await getRelationshipCollection(
        company.id,
        DbRelationship.CompanyHasImage,
    )

    expect(relationships.length)
        .toBe(2)
})