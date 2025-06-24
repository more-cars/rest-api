import {seedBrand} from "../../../../../../dbSeeding/brands/nodes/seedBrand"
import {seedCarModel} from "../../../../../../dbSeeding/car-models/nodes/seedCarModel"
import {Brand} from "../../../../../../../src/models/brands/Brand"

test('Expecting an error when any of the nodes does not exist',
    async () => {
        const brand = await seedBrand()
        const carModel = await seedCarModel()

        const relationshipAttemptWithNonExistentCarModel =
            await Brand.createHasCarModelRelationship(-42, carModel.id)
        expect(relationshipAttemptWithNonExistentCarModel)
            .toBeFalsy()

        const relationshipAttemptWithNonExistentBrand =
            await Brand.createHasCarModelRelationship(brand.id, -43)
        expect(relationshipAttemptWithNonExistentBrand)
            .toBeFalsy()

        const relationshipAttemptWithBothNodesNonExistent =
            await Brand.createHasCarModelRelationship(-44, -45)
        expect(relationshipAttemptWithBothNodesNonExistent)
            .toBeFalsy()
    })
