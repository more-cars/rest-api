import {describe, expect, test} from 'vitest'
import {Brand} from "../../../../../../../src/models/node-types/brands/Brand"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {getSpecificRelationship} from "../../../../../../../src/db/relationships/getSpecificRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../../src/models/types/RelNotFoundError"

describe('Deleting a ›belongs-to-company‹ relationship', () => {
    test('BRAND node does not exist', async () => {
        const brand = await seedNode(DbNodeType.Brand)

        await expect(Brand.deleteBelongsToCompanyRelationship(brand.properties.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('COMPANY node does not exist', async () => {
        const company = await seedNode(DbNodeType.Company)

        await expect(Brand.deleteBelongsToCompanyRelationship(-42, company.properties.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('BRAND node and COMPANY node do not exist', async () => {
        await expect(Brand.deleteBelongsToCompanyRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›belongs-to-company‹ relationship', async () => {
        const brand = await seedNode(DbNodeType.Brand)
        const company = await seedNode(DbNodeType.Company)

        await expect(Brand.deleteBelongsToCompanyRelationship(brand.properties.id, company.properties.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('both nodes exist and have a ›belongs-to-company‹ relationship', async () => {
        const seededRelationship = await seedRelationship(DbNodeType.Brand, DbNodeType.Company, RelationshipType.BrandBelongsToCompany)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.BrandBelongsToCompany,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await Brand.deleteBelongsToCompanyRelationship(seededRelationship.start_node.properties.id, seededRelationship.end_node.properties.id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.BrandBelongsToCompany,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
