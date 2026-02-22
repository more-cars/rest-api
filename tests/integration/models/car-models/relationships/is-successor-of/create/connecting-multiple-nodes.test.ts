import {expect, test} from 'vitest'
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {CarModel} from "../../../../../../../src/models/node-types/car-models/CarModel"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"

test('A CAR MODEL cannot have multiple ›is-successor-of‹ relationships', async () => {
    const carModel = await seedNode(DbNodeType.CarModel)
    const partnersAmount = 3
    const partners = await seedNodes(DbNodeType.CarModel, partnersAmount)

    for (const partner of partners) {
        await CarModel.createIsSuccessorOfRelationship(carModel.properties.id, partner.properties.id)
    }

    const relationships = await getRelationshipCollection(
        carModel.properties.id,
        RelationshipType.CarModelIsSuccessorOf,
        DbNodeType.CarModel,
    )

    expect(relationships.length)
        .toBe(1)
})
