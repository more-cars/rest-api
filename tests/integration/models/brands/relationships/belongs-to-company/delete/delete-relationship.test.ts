import {describe, expect, test} from 'vitest'
import {Brand} from "../../../../../../../src/models/node-types/brands/Brand"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {getSpecificRelationship} from "../../../../../../../src/db/relationships/getSpecificRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../../src/models/types/RelNotFoundError"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"

describe('Deleting a ›belongs-to-company‹ relationship', () => {
    test('BRAND node does not exist', async () => {
        const brand = await seedNode(ControllerNodeType.BRAND)

        await expect(Brand.deleteBelongsToCompanyRelationship(brand.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('COMPANY node does not exist', async () => {
        const company = await seedNode(ControllerNodeType.COMPANY)

        await expect(Brand.deleteBelongsToCompanyRelationship(-42, company.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('BRAND node and COMPANY node do not exist', async () => {
        await expect(Brand.deleteBelongsToCompanyRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›belongs-to-company‹ relationship', async () => {
        const brand = await seedNode(ControllerNodeType.BRAND)
        const company = await seedNode(ControllerNodeType.COMPANY)

        await expect(Brand.deleteBelongsToCompanyRelationship(brand.id, company.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('both nodes exist and have a ›belongs-to-company‹ relationship', async () => {
        const seededRelationship = await seedRelationship(ControllerNodeType.BRAND, ControllerNodeType.COMPANY, RelationshipType.BrandBelongsToCompany)

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
