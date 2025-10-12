import {expect, test} from 'vitest'
import {seedBrand} from "../../../../../../_toolbox/dbSeeding/brands/nodes/seedBrand"
import {CarModel} from "../../../../../../../src/models/car-models/CarModel"
import {seedCarModel} from "../../../../../../_toolbox/dbSeeding/car-models/nodes/seedCarModel"
import {validateJson} from "../../../../../../_toolbox/validateJson"
import {RelationshipSchema} from "../../../../../../_toolbox/schemas/RelationshipSchema"

test('CAR MODEL exists and has a ›belongs-to-brand‹ relationship', async () => {
    const carModel = await seedCarModel()
    const brand = await seedBrand()

    await CarModel.createBelongsToBrandRelationship(carModel.id, brand.id)

    const relationship = await CarModel.getBelongsToBrandRelationship(carModel.id)

    validateJson(relationship, RelationshipSchema)

    expect(relationship.brand_id)
        .toBe(brand.id)

    expect(relationship.car_model_id)
        .toBe(carModel.id)
})
