import {describe, expect, test} from 'vitest'
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"

describe('Requesting a ›belongs-to-company‹ relationship', () => {
    test('node and relationship exist', async () => {
        const relationship = await seedRelationship(ControllerNodeType.BRAND, ControllerNodeType.COMPANY, RelationshipType.BrandBelongsToCompany)

        const relationships = await getRelationshipCollection(
            relationship.start_node.properties.id,
            RelationshipType.BrandBelongsToCompany,
            DbNodeType.Company,
        )

        expect(relationships.length)
            .toBe(1)
    })

    test('node exists, but not the relationship', async () => {
        const brand = await seedNode(ControllerNodeType.BRAND)

        const relationships = await getRelationshipCollection(
            brand.id,
            RelationshipType.BrandBelongsToCompany,
            DbNodeType.Company,
        )

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationship exist', async () => {
        const relationships = await getRelationshipCollection(
            -42,
            RelationshipType.BrandBelongsToCompany,
            DbNodeType.Company,
        )

        expect(relationships.length)
            .toBe(0)
    })
})
