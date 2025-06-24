import {seedBrand} from "../../../../../../dbSeeding/brands/nodes/seedBrand"
import {seedCarModel} from "../../../../../../dbSeeding/car-models/nodes/seedCarModel"
import {Brand} from "../../../../../../../src/models/brands/Brand"
import {getSpecificRelationship} from "../../../../../../../src/db/relationships/getSpecificRelationship"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"

test('Attaching the car model to another brand removes the original relationship', async () => {
    const firstBrand = await seedBrand()
    const secondBrand = await seedBrand()
    const carModel = await seedCarModel()

    await Brand.createHasCarModelRelationship(firstBrand.id, carModel.id)
    const originalRelationship = await getSpecificRelationship(
        firstBrand.id as number,
        carModel.id as number,
        DbRelationship.BrandHasCarModel,
    )
    expect(originalRelationship).not.toBeFalsy()

    await Brand.createHasCarModelRelationship(secondBrand.id, carModel.id)
    const newRelationship = await getSpecificRelationship(
        secondBrand.id as number,
        carModel.id as number,
        DbRelationship.BrandHasCarModel,
    )
    expect(newRelationship).not.toBeFalsy()

    const refetchedOriginalRelationship = await getSpecificRelationship(
        firstBrand.id as number,
        carModel.id as number,
        DbRelationship.BrandHasCarModel,
    )
    expect(refetchedOriginalRelationship).toBeFalsy()
})
