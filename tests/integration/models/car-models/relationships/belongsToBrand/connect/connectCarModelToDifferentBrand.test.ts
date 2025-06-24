import {seedBrand} from "../../../../../../dbSeeding/brands/nodes/seedBrand"
import {seedCarModel} from "../../../../../../dbSeeding/car-models/nodes/seedCarModel"
import {getSpecificRelationship} from "../../../../../../../src/db/relationships/getSpecificRelationship"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {CarModel} from "../../../../../../../src/models/car-models/CarModel"

test('Attaching the Car Model to another Brand removes the original relationship', async () => {
    const firstBrand = await seedBrand()
    const secondBrand = await seedBrand()
    const carModel = await seedCarModel()

    await CarModel.createBelongsToBrandRelationship(carModel.id, firstBrand.id)
    const originalRelationship = await getSpecificRelationship(
        firstBrand.id as number,
        carModel.id as number,
        DbRelationship.BrandHasCarModel,
    )
    expect(originalRelationship).not.toBeFalsy()

    await CarModel.createBelongsToBrandRelationship(carModel.id, secondBrand.id)
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
