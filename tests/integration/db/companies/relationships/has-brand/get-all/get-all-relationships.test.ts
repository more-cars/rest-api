import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {seedRelationshipForStartNode} from "../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {NodeTypeLabel} from "../../../../../../../src/db/NodeTypeLabel"

describe('Requesting all ›has-brand‹ relationships', () => {
    test('node and relationships exist', async () => {
        const company = await seedNode(NodeTypeEnum.COMPANY)
        await seedRelationshipForStartNode(company.id, NodeTypeEnum.BRAND, RelationshipType.CompanyHasBrand)
        await seedRelationshipForStartNode(company.id, NodeTypeEnum.BRAND, RelationshipType.CompanyHasBrand)

        const relationships = await getRelationshipCollection(
            company.id,
            RelationshipType.CompanyHasBrand,
            NodeTypeLabel.Brand,
        )

        expect(relationships.length)
            .toBe(2)
    })

    test('node exists, but no relationships', async () => {
        const company = await seedNode(NodeTypeEnum.COMPANY)

        const relationships = await getRelationshipCollection(
            company.id,
            RelationshipType.CompanyHasBrand,
            NodeTypeLabel.Brand,
        )

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationships exist', async () => {
        const relationships = await getRelationshipCollection(
            -42,
            RelationshipType.CompanyHasBrand,
            NodeTypeLabel.Brand,
        )

        expect(relationships.length)
            .toBe(0)
    })
})
