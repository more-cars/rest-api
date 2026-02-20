import {describe, expect, test} from 'vitest'
import {Brand} from "../../../../../../../src/models/node-types/brands/Brand"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {getSpecificRelationship} from "../../../../../../../src/db/relationships/getSpecificRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../../src/models/types/RelNotFoundError"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"

describe('Deleting a ›has-image‹ relationship', () => {
    test('BRAND node does not exist', async () => {
        const brand = await seedNode(ControllerNodeType.BRAND)

        await expect(Brand.deleteHasImageRelationship(brand.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('IMAGE node does not exist', async () => {
        const image = await seedNode(ControllerNodeType.IMAGE)

        await expect(Brand.deleteHasImageRelationship(-42, image.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('BRAND node and IMAGE node do not exist', async () => {
        await expect(Brand.deleteHasImageRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›has-image‹ relationship', async () => {
        const brand = await seedNode(ControllerNodeType.BRAND)
        const image = await seedNode(ControllerNodeType.IMAGE)

        await expect(Brand.deleteHasImageRelationship(brand.id, image.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('both nodes exist and have a ›has-image‹ relationship', async () => {
        const seededRelationship = await seedRelationship(ControllerNodeType.BRAND, ControllerNodeType.IMAGE, RelationshipType.BrandHasImage)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.BrandHasImage,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await Brand.deleteHasImageRelationship(seededRelationship.start_node.properties.id, seededRelationship.end_node.properties.id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.BrandHasImage,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
