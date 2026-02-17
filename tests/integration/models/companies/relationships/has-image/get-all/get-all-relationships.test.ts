import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {seedRelationshipForStartNode} from "../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {Company} from "../../../../../../../src/models/companies/Company"

describe('Requesting all ›has-image‹ relationships', () => {
    test('node and relationships exist', async () => {
        const company = await seedNode(NodeTypeEnum.COMPANY)
        await seedRelationshipForStartNode(company.id, NodeTypeEnum.IMAGE, DbRelationship.CompanyHasImage)
        await seedRelationshipForStartNode(company.id, NodeTypeEnum.IMAGE, DbRelationship.CompanyHasImage)

        const relationships = await Company.getAllHasImageRelationships(company.id)

        expect(relationships.length)
            .toBe(2)
    })

    test('node exists, but no relationships', async () => {
        const company = await seedNode(NodeTypeEnum.COMPANY)

        const relationships = await Company.getAllHasImageRelationships(company.id)

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationships exist', async () => {
        await expect(Company.getAllHasImageRelationships(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })
})
