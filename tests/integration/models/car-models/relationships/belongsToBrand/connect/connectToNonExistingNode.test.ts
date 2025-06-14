import {seedBrand} from "../../../../../../dbSeeding/brands/nodes/seedBrand"
import {seedCarModel} from "../../../../../../dbSeeding/car-models/nodes/seedCarModel"
import {CarModel} from "../../../../../../../src/models/car-models/CarModel"
import FakeCarModelNonExistent from "../../../../../../fixtures/nodes/FakeCarModelNonExistent"
import FakeBrandNonExistent from "../../../../../../fixtures/nodes/FakeBrandNonExistent"

test('Expecting an error when any of the nodes does not exist',
    async () => {
        const carModel = await seedCarModel()
        const brand = await seedBrand()

        const relationshipAttemptWithNonExistentCarModel =
            await CarModel.createBelongsToBrandRelationship(FakeCarModelNonExistent, brand)
        expect(relationshipAttemptWithNonExistentCarModel)
            .toBeFalsy()

        const relationshipAttemptWithNonExistentBrand =
            await CarModel.createBelongsToBrandRelationship(carModel, FakeBrandNonExistent)
        expect(relationshipAttemptWithNonExistentBrand)
            .toBeFalsy()

        const relationshipAttemptWithBothNodesNonExistent =
            await CarModel.createBelongsToBrandRelationship(FakeCarModelNonExistent, FakeBrandNonExistent)
        expect(relationshipAttemptWithBothNodesNonExistent)
            .toBeFalsy()
    })
