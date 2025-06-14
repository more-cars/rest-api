import {seedBrand} from "../../../../../../dbSeeding/brands/nodes/seedBrand"
import {seedCarModel} from "../../../../../../dbSeeding/car-models/nodes/seedCarModel"
import FakeCarModelNonExistent from "../../../../../../fixtures/nodes/FakeCarModelNonExistent"
import FakeBrandNonExistent from "../../../../../../fixtures/nodes/FakeBrandNonExistent"
import {Brand} from "../../../../../../../src/models/brands/Brand"

test('Expecting an error when any of the nodes does not exist',
    async () => {
        const brand = await seedBrand()
        const carModel = await seedCarModel()

        const relationshipAttemptWithNonExistentCarModel =
            await Brand.createHasCarModelRelationship(FakeBrandNonExistent, carModel)
        expect(relationshipAttemptWithNonExistentCarModel)
            .toBeFalsy()

        const relationshipAttemptWithNonExistentBrand =
            await Brand.createHasCarModelRelationship(brand, FakeCarModelNonExistent)
        expect(relationshipAttemptWithNonExistentBrand)
            .toBeFalsy()

        const relationshipAttemptWithBothNodesNonExistent =
            await Brand.createHasCarModelRelationship(FakeBrandNonExistent, FakeCarModelNonExistent)
        expect(relationshipAttemptWithBothNodesNonExistent)
            .toBeFalsy()
    })
