import {describe, expect, test} from 'vitest'
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {Brand} from "../../../../../../../src/models/node-types/brands/Brand"
import {validateJson} from "../../../../../../_toolbox/validateJson"
import {RelationshipSchema} from "../../../../../../_toolbox/schemas/model/RelationshipSchema"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {RelationshipNotFoundError} from "../../../../../../../src/models/types/RelationshipNotFoundError"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

describe('Requesting a ›has-prime-image‹ relationship', () => {
    test('node and relationship exist', async () => {
        const expectedRelationship = await seedRelationship(NodeTypeEnum.BRAND, NodeTypeEnum.IMAGE, RelationshipType.BrandHasPrimeImage)
        const expectedBrandId = expectedRelationship.start_node_id
        const expectedImageId = expectedRelationship.end_node_id
        const actualRelationship = await Brand.getHasPrimeImageRelationship(expectedBrandId)

        expect(validateJson(actualRelationship, RelationshipSchema))
            .toBeTruthy()

        expect(actualRelationship.origin.id)
            .toBe(expectedBrandId)

        expect(actualRelationship.destination.id)
            .toBe(expectedImageId)
    })

    test('node exists, but not the relationship', async () => {
        const brand = await seedNode(NodeTypeEnum.BRAND)

        await expect(Brand.getHasPrimeImageRelationship(brand.id))
            .rejects
            .toThrow(RelationshipNotFoundError)
    })

    test('neither node, nor relationship exist', async () => {
        await expect(Brand.getHasPrimeImageRelationship(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })
})
