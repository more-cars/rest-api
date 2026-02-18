import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {getSpecificRelationship} from "../../../../../../../src/db/relationships/getSpecificRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {RelationshipNotFoundError} from "../../../../../../../src/models/types/RelationshipNotFoundError"
import {Brand} from "../../../../../../../src/models/node-types/brands/Brand"

describe('Deleting a ›has-prime-image‹ relationship', () => {
    test('BRAND node does not exist', async () => {
        const brand = await seedNode(NodeTypeEnum.BRAND)

        await expect(Brand.deleteHasPrimeImageRelationship(brand.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('IMAGE node does not exist', async () => {
        const image = await seedNode(NodeTypeEnum.IMAGE)

        await expect(Brand.deleteHasPrimeImageRelationship(-42, image.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('BRAND node and IMAGE node do not exist', async () => {
        await expect(Brand.deleteHasPrimeImageRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›has-prime-image‹ relationship', async () => {
        const brand = await seedNode(NodeTypeEnum.BRAND)
        const image = await seedNode(NodeTypeEnum.IMAGE)

        await expect(Brand.deleteHasPrimeImageRelationship(brand.id, image.id))
            .rejects
            .toThrow(RelationshipNotFoundError)
    })

    test('both nodes exist and have a ›has-prime-image‹ relationship', async () => {
        const seededRelationship = await seedRelationship(NodeTypeEnum.BRAND, NodeTypeEnum.IMAGE, RelationshipType.BrandHasPrimeImage)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node_id,
            seededRelationship.end_node_id,
            RelationshipType.BrandHasPrimeImage,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await Brand.deleteHasPrimeImageRelationship(seededRelationship.start_node_id, seededRelationship.end_node_id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node_id,
            seededRelationship.end_node_id,
            RelationshipType.BrandHasPrimeImage,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
