import {expect, test} from 'vitest'
import {seedCarModels} from "../../../../../../_toolbox/dbSeeding/car-models/nodes/seedCarModels"
import {seedCarModel} from "../../../../../../_toolbox/dbSeeding/car-models/nodes/seedCarModel"
import {CarModel} from "../../../../../../../src/models/car-models/CarModel"
import {getRelationshipsForSpecificNode} from "../../../../../../../src/db/relationships/getRelationshipsForSpecificNode"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"

test('A CAR MODEL cannot have multiple ›is-successor-of‹ relationships', async () => {
    const carModel = await seedCarModel()
    const partnersAmount = 3
    const partners = await seedCarModels(partnersAmount)

    for (const partner of partners) {
        await CarModel.createIsSuccessorOfRelationship(carModel.id, partner.id)
    }

    const relationships = await getRelationshipsForSpecificNode(carModel.id, DbRelationship.CarModelIsSuccessorOf)

    expect(relationships.length)
        .toBe(1)
})
