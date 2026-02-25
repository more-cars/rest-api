import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"
import {Brand} from "../../../../../../../../src/models/node-types/brands/Brand"

test('Trying to create a ›has-car-model‹ relationship with nodes that do not exist', async () => {
    const brand = await seedNode(DbNodeType.Brand)
    const carModel = await seedNode(DbNodeType.CarModel)

    await expect(Brand.createHasCarModelRelationship(-42, carModel.properties.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(Brand.createHasCarModelRelationship(brand.properties.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(Brand.createHasCarModelRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
