import {expect, test} from 'vitest'
import assert from "assert"
import {CarModel} from "../../../../src/models/car-models/CarModel"
import {Brand} from "../../../../src/models/brands/Brand"
import FakeCarModel from "../../../_toolbox/fixtures/nodes/FakeCarModel"
import {FakeNodeInput} from "../../../_toolbox/fixtures/nodes/FakeNodeInput"
import {NodeTypeEnum} from "../../../../src/controllers/nodes/types/NodeTypeEnum"
import {InputBrandCreate} from "../../../../src/db/nodes/brands/types/InputBrandCreate"

test('ID is always contained in response', async () => {
    const carModel = await CarModel.create(FakeCarModel)
    const brand = await Brand.create(FakeNodeInput(NodeTypeEnum.BRAND) as InputBrandCreate)
    const expectedRelationship = await CarModel.createBelongsToBrandRelationship(carModel.id, brand.id)

    if (!expectedRelationship) {
        assert.fail('Relationship creation failed')
    }

    const requestedRelationship = await CarModel.getBelongsToBrandRelationship(carModel.id)

    if (!requestedRelationship) {
        assert.fail('Relationship retrieval failed')
    }

    expect(requestedRelationship.id)
        .toBe(expectedRelationship.id)
})
