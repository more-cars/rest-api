import {expect, test} from 'vitest'
import {createRelationship} from "../../../../../src/db/relationships/createRelationship"
import {RelationshipType} from "../../../../../src/db/types/RelationshipType"
import assert from "assert"
import {FakeNodeInput} from "../../../../_toolbox/fixtures/nodes/FakeNodeInput"
import {ControllerNodeType} from "../../../../../src/controllers/nodes/types/ControllerNodeType"
import type {InputBrandCreate} from "../../../../../src/db/node-types/brands/types/InputBrandCreate"
import type {InputCarModelCreate} from "../../../../../src/db/node-types/car-models/types/InputCarModelCreate"
import {createNode as createBrandNode} from "../../../../../src/db/node-types/brands/createNode"
import {createNode as createCarModelNode} from "../../../../../src/db/node-types/car-models/createNode"

test('ID is added when creating a relationship', async () => {
    const brand = await createBrandNode(FakeNodeInput(ControllerNodeType.Brand) as InputBrandCreate)
    const carModel = await createCarModelNode(FakeNodeInput(ControllerNodeType.CarModel) as InputCarModelCreate)
    const relationship = await createRelationship(brand.properties.id, carModel.properties.id, RelationshipType.BrandHasCarModel)

    if (!relationship) {
        assert.fail('Relationship creation failed')
    }

    expect(relationship.id)
        .toBeGreaterThanOrEqual(12000000)
    expect(relationship.id)
        .toBeLessThanOrEqual(99999999)
})
