import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {getSpecificRelationship} from "../../../../../../../src/db/relationships/getSpecificRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../../src/models/types/RelNotFoundError"
import {Company} from "../../../../../../../src/models/node-types/companies/Company"

describe('Deleting a ›has-image‹ relationship', () => {
    test('COMPANY node does not exist', async () => {
        const company = await seedNode(ControllerNodeType.COMPANY)

        await expect(Company.deleteHasImageRelationship(company.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('IMAGE node does not exist', async () => {
        const image = await seedNode(ControllerNodeType.IMAGE)

        await expect(Company.deleteHasImageRelationship(-42, image.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('COMPANY node and IMAGE node do not exist', async () => {
        await expect(Company.deleteHasImageRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›has-image‹ relationship', async () => {
        const company = await seedNode(ControllerNodeType.COMPANY)
        const image = await seedNode(ControllerNodeType.IMAGE)

        await expect(Company.deleteHasImageRelationship(company.id, image.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('both nodes exist and have a ›has-image‹ relationship', async () => {
        const seededRelationship = await seedRelationship(ControllerNodeType.COMPANY, ControllerNodeType.IMAGE, RelationshipType.CompanyHasImage)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.CompanyHasImage,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await Company.deleteHasImageRelationship(seededRelationship.start_node.properties.id, seededRelationship.end_node.properties.id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.CompanyHasImage,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
