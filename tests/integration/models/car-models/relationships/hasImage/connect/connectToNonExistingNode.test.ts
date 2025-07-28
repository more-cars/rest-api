import {expect, test} from 'vitest'
import {seedImage} from "../../../../../../_toolbox/dbSeeding/images/nodes/seedImage"
import {seedCarModel} from "../../../../../../_toolbox/dbSeeding/car-models/nodes/seedCarModel"
import {CarModel} from "../../../../../../../src/models/car-models/CarModel"

test('Expecting an error when any of the nodes does not exist',
    async () => {
        const carModel = await seedCarModel()
        const image = await seedImage()

        const relationshipAttemptWithNonExistentCarModel =
            await CarModel.createHasImageRelationship(-42, image.id)
        expect(relationshipAttemptWithNonExistentCarModel)
            .toBeFalsy()

        const relationshipAttemptWithNonExistentImage =
            await CarModel.createHasImageRelationship(carModel.id, -43)
        expect(relationshipAttemptWithNonExistentImage)
            .toBeFalsy()

        const relationshipAttemptWithBothNodesNonExistent =
            await CarModel.createHasImageRelationship(-44, -45)
        expect(relationshipAttemptWithBothNodesNonExistent)
            .toBeFalsy()
    })
