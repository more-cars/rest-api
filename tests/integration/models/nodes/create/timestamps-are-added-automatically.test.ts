import {expect, test} from 'vitest'
import moment from "moment"
import {Brand} from "../../../../../src/models/node-types/brands/Brand"
import {CarModel} from "../../../../../src/models/node-types/car-models/CarModel"
import {FakeBrand} from "../../../../_toolbox/fixtures/nodes/FakeBrand"
import {FakeCarModel} from "../../../../_toolbox/fixtures/nodes/FakeCarModel"

test('Timestamps are added when creating a node', async () => {
    const createdBrand = await Brand.create(FakeBrand.dbInput)
    expect(createdBrand.attributes)
        .toHaveProperty('created_at')
    expect(moment(createdBrand.attributes.created_at).isValid())
        .toEqual(true)
    expect(createdBrand.attributes)
        .toHaveProperty('updated_at')
    expect(moment(createdBrand.attributes.updated_at).isValid())
        .toEqual(true)

    const createdCarModel = await CarModel.create(FakeCarModel.dbInput)
    expect(createdCarModel.attributes)
        .toHaveProperty('created_at')
    expect(moment(createdCarModel.attributes.created_at).isValid())
        .toEqual(true)
    expect(createdCarModel.attributes)
        .toHaveProperty('updated_at')
    expect(moment(createdCarModel.attributes.updated_at).isValid())
        .toEqual(true)
})

test('Timestamps have valid dates', async () => {
    const createdBrand = await Brand.create(FakeBrand.dbInput)
    expect(moment(createdBrand.attributes.created_at).isValid())
    expect(moment(createdBrand.attributes.updated_at).isValid())

    const createdCarModel = await CarModel.create(FakeCarModel.dbInput)
    expect(moment(createdCarModel.attributes.created_at).isValid())
    expect(moment(createdCarModel.attributes.updated_at).isValid())
})
