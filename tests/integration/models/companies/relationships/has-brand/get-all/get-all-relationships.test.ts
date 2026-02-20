import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {seedRelationshipForStartNode} from "../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {Company} from "../../../../../../../src/models/node-types/companies/Company"

describe('Requesting all ›has-brand‹ relationships', () => {
    test('node and relationships exist', async () => {
        const company = await seedNode(ControllerNodeType.COMPANY)
        await seedRelationshipForStartNode(company.id, ControllerNodeType.BRAND, RelationshipType.CompanyHasBrand)
        await seedRelationshipForStartNode(company.id, ControllerNodeType.BRAND, RelationshipType.CompanyHasBrand)

        const relationships = await Company.getAllHasBrandRelationships(company.id)

        expect(relationships.length)
            .toBe(2)
    })

    test('node exists, but no relationships', async () => {
        const company = await seedNode(ControllerNodeType.COMPANY)

        const relationships = await Company.getAllHasBrandRelationships(company.id)

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationships exist', async () => {
        await expect(Company.getAllHasBrandRelationships(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })
})
