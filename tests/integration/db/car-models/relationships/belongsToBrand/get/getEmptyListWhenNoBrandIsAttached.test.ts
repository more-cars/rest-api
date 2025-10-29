import {expect, test} from 'vitest'
import {seedCarModel} from "../../../../../../_toolbox/dbSeeding/car-models/nodes/seedCarModel"
import {
    getRelationshipCollection
} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"

test('An empty list should be returned when no BRAND is connected to the CAR MODEL',
    async () => {
        const carModel = await seedCarModel()

        const relationships = await getRelationshipCollection(
            carModel.id,
            DbRelationship.BrandHasCarModel,
            true,
        )

        expect(relationships.length)
            .toBe(0)
    })
