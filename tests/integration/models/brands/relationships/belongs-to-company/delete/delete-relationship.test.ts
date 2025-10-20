import {describe, expect, test} from 'vitest'
import {Brand} from "../../../../../../../src/models/brands/Brand"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {getSpecificRelationship} from "../../../../../../../src/db/relationships/getSpecificRelationship"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {RelationshipNotFoundError} from "../../../../../../../src/models/types/RelationshipNotFoundError"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"

describe('Deleting a ›belongs-to-company‹ relationship', () => {
    test('BRAND node does not exist', async () => {
        const brand = await seedNode(NodeTypeEnum.BRAND)

        await expect(Brand.deleteBelongsToCompanyRelationship(brand.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('COMPANY node does not exist', async () => {
        const company = await seedNode(NodeTypeEnum.BRAND)

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
        const brand = await seedNode(NodeTypeEnum.BRAND)
        const company = await seedNode(NodeTypeEnum.COMPANY)

        await expect(Brand.deleteBelongsToCompanyRelationship(brand.id, company.id))
            .rejects
            .toThrow(RelationshipNotFoundError)
    })

    test('both nodes exist and have a ›belongs-to-company‹ relationship', async () => {
        const seededRelationship = await seedRelationship(NodeTypeEnum.BRAND, NodeTypeEnum.COMPANY, DbRelationship.BrandBelongsToCompany)

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
