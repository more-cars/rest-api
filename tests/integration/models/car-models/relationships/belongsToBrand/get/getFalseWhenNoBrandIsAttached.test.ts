import {expect, test} from 'vitest'
import {seedCarModel} from "../../../../../../_toolbox/dbSeeding/car-models/nodes/seedCarModel"
import {CarModel} from "../../../../../../../src/models/car-models/CarModel"

test('False should be returned when no BRAND is connected to the CAR MODEL',
    async () => {
        const carModel = await seedCarModel()

        const relationships = await CarModel.getBelongsToBrandRelationship(carModel.id)

        expect(relationships)
            .toBe(false)
    })
