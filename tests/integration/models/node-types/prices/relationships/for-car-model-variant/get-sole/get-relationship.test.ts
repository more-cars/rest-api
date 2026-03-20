import {describe, expect, test} from 'vitest'
import {seedRelationship} from "../../../../../../../_toolbox/dbSeeding/seedRelationship"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"
import {Price} from "../../../../../../../../src/models/node-types/prices/Price"
import {validateJson} from "../../../../../../../_toolbox/validateJson"
import {RelationshipSchema} from "../../../../../../../_toolbox/schemas/model/RelationshipSchema"
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {RelNotFoundError} from "../../../../../../../../src/models/types/RelNotFoundError"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"

describe('Requesting a ›for-car-model-variant‹ relationship', () => {
    test('node and relationship exist', async () => {
        const expectedRelationship = await seedRelationship(DbNodeType.Price, DbNodeType.CarModelVariant, RelationshipType.PriceForCarModelVariant)
        const expectedPriceId = expectedRelationship.start_node.properties.id
        const expectedCarModelVariantId = expectedRelationship.end_node.properties.id
        const actualRelationship = await Price.getForCarModelVariantRelationship(expectedPriceId)

        expect(validateJson(actualRelationship, RelationshipSchema))
            .toBeTruthy()

        expect(actualRelationship.origin.attributes.id)
            .toBe(expectedPriceId)

        expect(actualRelationship.destination.attributes.id)
            .toBe(expectedCarModelVariantId)
    })

    test('node exists, but not the relationship', async () => {
        const price = await seedNode(DbNodeType.Price)

        await expect(Price.getForCarModelVariantRelationship(price.properties.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('neither node, nor relationship exist', async () => {
        await expect(Price.getForCarModelVariantRelationship(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })
})
