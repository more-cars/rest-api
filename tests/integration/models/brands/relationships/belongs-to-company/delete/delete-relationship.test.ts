import {describe, expect, test} from 'vitest'
import {Brand} from "../../../../../../../src/models/brands/Brand"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {getSpecificRelationship} from "../../../../../../../src/db/relationships/getSpecificRelationship"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {RelationshipNotFoundError} from "../../../../../../../src/models/types/RelationshipNotFoundError"

describe('Deleting a ›belongs-to-company‹ relationship', () => {
    test('BRAND node does not exist', async () => {
        const brand = await seedNode('brand')

        await expect(Brand.deleteBelongsToCompanyRelationship(brand.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('COMPANY node does not exist', async () => {
        const company = await seedNode('brand')

        await expect(Brand.deleteBelongsToCompanyRelationship(-42, company.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('COMPANY node and COMPANY node do not exist', async () => {
        await expect(Brand.deleteBelongsToCompanyRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›belongs-to-company‹ relationship', async () => {
        const brand = await seedNode('brand')
        const company = await seedNode('company')

        await expect(Brand.deleteBelongsToCompanyRelationship(brand.id, company.id))
            .rejects
            .toThrow(RelationshipNotFoundError)
    })

    test('both nodes exist and have a ›belongs-to-company‹ relationship', async () => {
        const seededRelationship = await seedRelationship('brand', 'company', DbRelationship.BrandBelongsToCompany)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node_id,
            seededRelationship.end_node_id,
            DbRelationship.BrandBelongsToCompany,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await Brand.deleteBelongsToCompanyRelationship(seededRelationship.start_node_id, seededRelationship.end_node_id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node_id,
            seededRelationship.end_node_id,
            DbRelationship.BrandBelongsToCompany,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
