import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {getSpecificRelationship} from "../../../../../../../src/db/relationships/getSpecificRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../../src/models/types/RelNotFoundError"
import {Company} from "../../../../../../../src/models/node-types/companies/Company"

describe('Deleting a ›has-brand‹ relationship', () => {
    test('COMPANY node does not exist', async () => {
        const company = await seedNode(DbNodeType.Company)

        await expect(Company.deleteHasBrandRelationship(company.properties.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('IMAGE node does not exist', async () => {
        const brand = await seedNode(DbNodeType.Brand)

        await expect(Company.deleteHasBrandRelationship(-42, brand.properties.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('COMPANY node and IMAGE node do not exist', async () => {
        await expect(Company.deleteHasBrandRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›has-brand‹ relationship', async () => {
        const company = await seedNode(DbNodeType.Company)
        const brand = await seedNode(DbNodeType.Brand)

        await expect(Company.deleteHasBrandRelationship(company.properties.id, brand.properties.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('both nodes exist and have a ›has-brand‹ relationship', async () => {
        const seededRelationship = await seedRelationship(DbNodeType.Company, DbNodeType.Brand, RelationshipType.CompanyHasBrand)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.CompanyHasBrand,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await Company.deleteHasBrandRelationship(seededRelationship.start_node.properties.id, seededRelationship.end_node.properties.id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.CompanyHasBrand,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
