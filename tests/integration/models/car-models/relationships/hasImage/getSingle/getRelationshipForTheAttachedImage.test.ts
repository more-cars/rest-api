import {expect, test} from 'vitest'
import assert from "assert"
import {validateJson} from "../../../../../../_toolbox/validateJson"
import {seedImage} from "../../../../../../_toolbox/dbSeeding/images/nodes/seedImage"
import {seedCarModel} from "../../../../../../_toolbox/dbSeeding/car-models/nodes/seedCarModel"
import {CarModel} from "../../../../../../../src/models/car-models/CarModel"
import {CarModelHasImageSchema} from "../../../../../../_toolbox/schemas/CarModelHasImageSchema"

test('Requesting the relationship between CAR MODEL and attached IMAGE',
    async () => {
        const carModel = await seedCarModel()
        const image = await seedImage()

        await CarModel.createHasImageRelationship(carModel.id, image.id)

        const relationship = await CarModel.getRelationshipForHasImage(carModel.id, image.id)

        if (!relationship) {
            assert.fail(`Relationship creation failed.`)
        }

        validateJson(relationship, CarModelHasImageSchema)

        expect(relationship.car_model_id)
            .toBe(carModel.id)

        expect(relationship.image_id)
            .toBe(image.id)
    })
