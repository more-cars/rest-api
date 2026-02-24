import {expect, test} from 'vitest'
import {createNode as createBrandNode} from "../../../../src/db/node-types/brands/createNode"
import {createNode as createCarModelNode} from "../../../../src/db/node-types/car-models/createNode"
import assert from "assert"
import {getExhaustiveFakeInputDataForDbNode} from "../../../_toolbox/fixtures/nodes/getExhaustiveFakeInputDataForDbNode"
import {DbNodeType} from "../../../../src/db/types/DbNodeType"
import type {InputBrandCreate} from "../../../../src/db/node-types/brands/types/InputBrandCreate"
import type {InputCarModelCreate} from "../../../../src/db/node-types/car-models/types/InputCarModelCreate"
import {Brand} from "../../../../src/models/node-types/brands/Brand"

test('ID is added when creating a relationship', async () => {
    const brand = await createBrandNode(getExhaustiveFakeInputDataForDbNode(DbNodeType.Brand) as InputBrandCreate)
    const carModel = await createCarModelNode(getExhaustiveFakeInputDataForDbNode(DbNodeType.CarModel) as InputCarModelCreate)
    const relationship = await Brand.createHasCarModelRelationship(brand.properties.id, carModel.properties.id)

    if (!relationship) {
        assert.fail('Relationship creation failed')
    }

    expect(relationship.id)
        .toBeGreaterThanOrEqual(12000000)
    expect(relationship.id)
        .toBeLessThanOrEqual(99999999)
})
