import {seedBrand} from "../../../../../../_toolbox/dbSeeding/brands/nodes/seedBrand"
import {seedCarModel} from "../../../../../../_toolbox/dbSeeding/car-models/nodes/seedCarModel"
import {CarModel} from "../../../../../../../src/models/car-models/CarModel"

test('Expecting an error when any of the nodes does not exist',
    async () => {
        const carModel = await seedCarModel()
        const brand = await seedBrand()

        const relationshipAttemptWithNonExistentCarModel =
            await CarModel.createBelongsToBrandRelationship(-42, brand.id)
        expect(relationshipAttemptWithNonExistentCarModel)
            .toBeFalsy()

        const relationshipAttemptWithNonExistentBrand =
            await CarModel.createBelongsToBrandRelationship(carModel.id, -43)
        expect(relationshipAttemptWithNonExistentBrand)
            .toBeFalsy()

        const relationshipAttemptWithBothNodesNonExistent =
            await CarModel.createBelongsToBrandRelationship(-44, -45)
        expect(relationshipAttemptWithBothNodesNonExistent)
            .toBeFalsy()
    })
