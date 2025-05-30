import {seedBrand} from "../../../../../dbSeeding/seedBrand"
import {seedCarModel} from "../../../../../dbSeeding/seedCarModel"
import {getRelationship} from "../../../../../../src/db/getRelationship"
import {DbRelationship} from "../../../../../../src/types/DbRelationship"
import {CarModel} from "../../../../../../src/models/CarModel"

describe('Car Model', () => {
    test('Attaching the car model to another brand removes the original relationship', async () => {
        const firstBrand = await seedBrand()
        const secondBrand = await seedBrand()
        const carModel = await seedCarModel()

        await CarModel.createBelongsToBrandRelationship(carModel, firstBrand)
        const originalRelationship = await getRelationship(
            firstBrand.id as number,
            carModel.id as number,
            DbRelationship.BrandHasCarModel,
        )
        expect(originalRelationship).not.toBeFalsy()

        await CarModel.createBelongsToBrandRelationship(carModel, secondBrand)
        const newRelationship = await getRelationship(
            secondBrand.id as number,
            carModel.id as number,
            DbRelationship.BrandHasCarModel,
        )
        expect(newRelationship).not.toBeFalsy()

        const refetchedOriginalRelationship = await getRelationship(
            firstBrand.id as number,
            carModel.id as number,
            DbRelationship.BrandHasCarModel,
        )
        expect(refetchedOriginalRelationship).toBeFalsy()
    })
})
