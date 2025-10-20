import {describe, expect, test} from 'vitest'
import {
    getRelationshipsForSpecificNode
} from "../../../../../../../src/db/relationships/getRelationshipsForSpecificNode"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {seedBrand} from "../../../../../../_toolbox/dbSeeding/brands/nodes/seedBrand"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"

describe('Requesting a ›belongs-to-company‹ relationship', () => {
    test('node and relationship exist', async () => {
        const relationship = await seedRelationship(NodeTypeEnum.BRAND, NodeTypeEnum.COMPANY, DbRelationship.BrandBelongsToCompany)

        const relationships = await getRelationshipsForSpecificNode(
            relationship.start_node_id,
            DbRelationship.BrandBelongsToCompany,
        )

        expect(relationships.length)
            .toBe(1)
    })

    test('node exists, but not the relationship', async () => {
        const brand = await seedBrand()

        const relationships = await getRelationshipsForSpecificNode(
            brand.id,
            DbRelationship.BrandBelongsToCompany,
        )

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationship exist', async () => {
        const relationships = await getRelationshipsForSpecificNode(
            -42,
            DbRelationship.BrandBelongsToCompany,
        )

        expect(relationships.length)
            .toBe(0)
    })
})
