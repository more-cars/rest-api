import {expect, test} from 'vitest'
import {createNode as createBrandNode} from "../../../../src/db/nodes/brands/createNode"
import {createNode as createCarModelNode} from "../../../../src/db/nodes/car-models/createNode"
import assert from "assert"
import {FakeNodeInput} from "../../../_toolbox/fixtures/nodes/FakeNodeInput"
import {ControllerNodeType} from "../../../../src/controllers/nodes/types/ControllerNodeType"
import type {InputBrandCreate} from "../../../../src/db/nodes/brands/types/InputBrandCreate"
import type {InputCarModelCreate} from "../../../../src/db/nodes/car-models/types/InputCarModelCreate"
import {Brand} from "../../../../src/models/node-types/brands/Brand"

test('ID is added when creating a relationship', async () => {
    const brand = await createBrandNode(FakeNodeInput(ControllerNodeType.BRAND) as InputBrandCreate)
    const carModel = await createCarModelNode(FakeNodeInput(ControllerNodeType.CAR_MODEL) as InputCarModelCreate)
    const relationship = await Brand.createHasCarModelRelationship(brand.id, carModel.id)

    if (!relationship) {
        assert.fail('Relationship creation failed')
    }

    expect(relationship.id)
        .toBeGreaterThanOrEqual(12000000)
    expect(relationship.id)
        .toBeLessThanOrEqual(99999999)
})
