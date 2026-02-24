import {expect, test} from 'vitest'
import assert from "assert"
import {seedNode} from "../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../src/db/types/DbNodeType"
import {Brand} from "../../../../src/models/node-types/brands/Brand"

test('ID is added when creating a relationship', async () => {
    const brand = await seedNode(DbNodeType.Brand)
    const carModel = await seedNode(DbNodeType.CarModel)
    const relationship = await Brand.createHasCarModelRelationship(brand.properties.id, carModel.properties.id)

    if (!relationship) {
        assert.fail('Relationship creation failed')
    }

    expect(relationship.id)
        .toBeGreaterThanOrEqual(12000000)
    expect(relationship.id)
        .toBeLessThanOrEqual(99999999)
})
