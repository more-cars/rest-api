import {expect, test} from 'vitest'
import {Brand} from "../../../../../src/models/node-types/brands/Brand"
import {CarModel} from "../../../../../src/models/node-types/car-models/CarModel"
import {FakeBrand} from "../../../../_toolbox/fixtures/nodes/FakeBrand"
import {FakeCarModel} from "../../../../_toolbox/fixtures/nodes/FakeCarModel"

test('Timestamps are identical when creating a node', async () => {
    const createdBrand = await Brand.create(FakeBrand.dbInput)
    expect(createdBrand.attributes.created_at)
        .toEqual(createdBrand.attributes.updated_at)

    const createdCarModel = await CarModel.create(FakeCarModel.dbInput)
    expect(createdCarModel.attributes.created_at)
        .toEqual(createdCarModel.attributes.updated_at)
})
