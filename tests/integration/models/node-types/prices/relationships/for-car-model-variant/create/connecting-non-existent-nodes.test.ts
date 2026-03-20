import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {Price} from "../../../../../../../../src/models/node-types/prices/Price"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›for-car-model-variant‹ relationship with nodes that do not exist', async () => {
    const price = await seedNode(DbNodeType.Price)
    const carModelVariant = await seedNode(DbNodeType.CarModelVariant)

    await expect(Price.createForCarModelVariantRelationship(-42, carModelVariant.properties.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(Price.createForCarModelVariantRelationship(price.properties.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(Price.createForCarModelVariantRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
