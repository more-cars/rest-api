import {expect, test} from 'vitest'
import assert from "assert"
import {CarModel} from "../../../../src/models/car-models/CarModel"
import {Brand} from "../../../../src/models/brands/Brand"
import FakeCarModel from "../../../_toolbox/fixtures/nodes/FakeCarModel"
import FakeBrand from "../../../_toolbox/fixtures/nodes/FakeBrand"

test('ID is always contained in response', async () => {
    const carModel = await CarModel.create(FakeCarModel)
    const brand = await Brand.create(FakeBrand)
    const expectedRelationship = await CarModel.createBelongsToBrandRelationship(carModel.id, brand.id)

    if (!expectedRelationship) {
        assert.fail('Relationship creation failed')
    }

    const requestedRelationship = await CarModel.getBelongsToBrandRelationship(carModel.id)

    if (!requestedRelationship) {
        assert.fail('Relationship retrieval failed')
    }

    expect(requestedRelationship.relationship_id)
        .toBe(expectedRelationship.relationship_id)
})
