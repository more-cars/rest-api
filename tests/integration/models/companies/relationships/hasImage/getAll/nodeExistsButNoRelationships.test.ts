import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {Company} from "../../../../../../../src/models/companies/Company"

test('COMPANY exists, but has no ›has-image‹ relationships', async () => {
    const company = await seedNode(NodeTypeEnum.COMPANY)

    const relationships = await Company.getAllHasImageRelationships(company.id)

    expect(relationships.length)
        .toBe(0)
})
