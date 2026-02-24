import {expect, test} from 'vitest'
import assert from "assert"
import {createNode as createBrandNode} from "../../../../../src/db/node-types/brands/createNode"
import {createNode as createCarModelNode} from "../../../../../src/db/node-types/car-models/createNode"
import {getExhaustiveFakeInputDataForDbNode} from "../../../../_toolbox/fixtures/nodes/getExhaustiveFakeInputDataForDbNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import type {InputBrandCreate} from "../../../../../src/db/node-types/brands/types/InputBrandCreate"
import type {InputCarModelCreate} from "../../../../../src/db/node-types/car-models/types/InputCarModelCreate"
import {RelationshipType} from "../../../../../src/db/types/RelationshipType"
import {createRelationship} from "../../../../../src/db/relationships/createRelationship"
import {getSpecificRelationship} from "../../../../../src/db/relationships/getSpecificRelationship"

test('ID is always contained in response', async () => {
    const carModel = await createCarModelNode(getExhaustiveFakeInputDataForDbNode(DbNodeType.CarModel) as InputCarModelCreate)
    const brand = await createBrandNode(getExhaustiveFakeInputDataForDbNode(DbNodeType.Brand) as InputBrandCreate)
    const expectedRelationship = await createRelationship(brand.properties.id, carModel.properties.id, RelationshipType.BrandHasCarModel)

    if (!expectedRelationship) {
        assert.fail('Relationship creation failed')
    }

    const requestedRelationship = await getSpecificRelationship(brand.properties.id, carModel.properties.id, RelationshipType.BrandHasCarModel)

    if (!requestedRelationship) {
        assert.fail('Relationship retrieval failed')
    }

    expect(requestedRelationship.id)
        .toBe(expectedRelationship.id)
})
