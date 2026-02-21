import {expect, test} from 'vitest'
import assert from "assert"
import {CarModel} from "../../../../src/models/node-types/car-models/CarModel"
import {Brand} from "../../../../src/models/node-types/brands/Brand"
import {FakeNodeInput} from "../../../_toolbox/fixtures/nodes/FakeNodeInput"
import {ControllerNodeType} from "../../../../src/controllers/nodes/types/ControllerNodeType"
import type {InputBrandCreate} from "../../../../src/db/nodes/brands/types/InputBrandCreate"
import type {InputCarModelCreate} from "../../../../src/db/nodes/car-models/types/InputCarModelCreate"

test('ID is always contained in response', async () => {
    const carModel = await CarModel.create(FakeNodeInput(ControllerNodeType.CarModel) as InputCarModelCreate)
    const brand = await Brand.create(FakeNodeInput(ControllerNodeType.Brand) as InputBrandCreate)
    const expectedRelationship = await CarModel.createBelongsToBrandRelationship(carModel.attributes.id, brand.attributes.id)

    if (!expectedRelationship) {
        assert.fail('Relationship creation failed')
    }

    const requestedRelationship = await CarModel.getBelongsToBrandRelationship(carModel.attributes.id)

    if (!requestedRelationship) {
        assert.fail('Relationship retrieval failed')
    }

    expect(requestedRelationship.id)
        .toBe(expectedRelationship.id)
})
