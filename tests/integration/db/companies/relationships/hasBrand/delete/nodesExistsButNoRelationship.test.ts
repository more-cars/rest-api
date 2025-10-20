import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {deleteSpecificRelationship} from "../../../../../../../src/db/relationships/deleteSpecificRelationship"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"

test('Expecting an empty list when the relationship does not exist', async () => {
    const company = await seedNode(NodeTypeEnum.COMPANY)
    const brand = await seedNode(NodeTypeEnum.BRAND)

    const relationship = await deleteSpecificRelationship(
        company.id,
        brand.id,
        DbRelationship.CompanyHasBrand,
    )

    expect(relationship)
        .toBeFalsy()
})