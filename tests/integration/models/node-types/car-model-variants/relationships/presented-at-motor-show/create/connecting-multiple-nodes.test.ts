import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedNodes} from "../../../../../../../_toolbox/dbSeeding/seedNodes"
import {CarModelVariant} from "../../../../../../../../src/models/node-types/car-model-variants/CarModelVariant"
import {getRelationshipCollection} from "../../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"

test('A CAR MODEL VARIANT can have multiple ›presented-at-motor-show‹ relationships', async () => {
    const carModelVariant = await seedNode(DbNodeType.CarModelVariant)
    const motorShowsAmount = 3
    const motorShows = await seedNodes(DbNodeType.MotorShow, motorShowsAmount)

    for (const motorShow of motorShows) {
        await CarModelVariant.createPresentedAtMotorShowRelationship(carModelVariant.properties.id, motorShow.properties.id)
    }

    const relationships = await getRelationshipCollection(carModelVariant.properties.id, RelationshipType.CarModelVariantPresentedAtMotorShow)

    expect(relationships.length)
        .toBe(motorShowsAmount)
})
