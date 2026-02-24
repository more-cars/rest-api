import {expect, test} from 'vitest'
import assert from "assert"
import {CarModel} from "../../../../src/models/node-types/car-models/CarModel"
import {Brand} from "../../../../src/models/node-types/brands/Brand"
import {getExhaustiveFakeInputDataForDbNode} from "../../../_toolbox/fixtures/nodes/getExhaustiveFakeInputDataForDbNode"
import {ControllerNodeType} from "../../../../src/controllers/nodes/types/ControllerNodeType"
import type {InputBrandCreate} from "../../../../src/db/node-types/brands/types/InputBrandCreate"
import type {InputCarModelCreate} from "../../../../src/db/node-types/car-models/types/InputCarModelCreate"

test('ID is always contained in response', async () => {
    const carModel = await CarModel.create(getExhaustiveFakeInputDataForDbNode(ControllerNodeType.CarModel) as InputCarModelCreate)
    const brand = await Brand.create(getExhaustiveFakeInputDataForDbNode(ControllerNodeType.Brand) as InputBrandCreate)
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
