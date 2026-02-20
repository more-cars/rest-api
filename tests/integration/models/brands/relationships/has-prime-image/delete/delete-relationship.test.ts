import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {getSpecificRelationship} from "../../../../../../../src/db/relationships/getSpecificRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../../src/models/types/RelNotFoundError"
import {Brand} from "../../../../../../../src/models/node-types/brands/Brand"

describe('Deleting a ›has-prime-image‹ relationship', () => {
    test('BRAND node does not exist', async () => {
        const brand = await seedNode(ControllerNodeType.BRAND)

        await expect(Brand.deleteHasPrimeImageRelationship(brand.properties.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('IMAGE node does not exist', async () => {
        const image = await seedNode(ControllerNodeType.IMAGE)

        await expect(Brand.deleteHasPrimeImageRelationship(-42, image.properties.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('BRAND node and IMAGE node do not exist', async () => {
        await expect(Brand.deleteHasPrimeImageRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›has-prime-image‹ relationship', async () => {
        const brand = await seedNode(ControllerNodeType.BRAND)
        const image = await seedNode(ControllerNodeType.IMAGE)

        await expect(Brand.deleteHasPrimeImageRelationship(brand.properties.id, image.properties.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('both nodes exist and have a ›has-prime-image‹ relationship', async () => {
        const seededRelationship = await seedRelationship(ControllerNodeType.BRAND, ControllerNodeType.IMAGE, RelationshipType.BrandHasPrimeImage)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.BrandHasPrimeImage,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await Brand.deleteHasPrimeImageRelationship(seededRelationship.start_node.properties.id, seededRelationship.end_node.properties.id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.BrandHasPrimeImage,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
