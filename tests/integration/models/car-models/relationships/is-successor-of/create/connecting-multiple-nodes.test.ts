import {expect, test} from 'vitest'
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {CarModel} from "../../../../../../../src/models/node-types/car-models/CarModel"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"

test('A CAR MODEL cannot have multiple ›is-successor-of‹ relationships', async () => {
    const carModel = await seedNode(ControllerNodeType.CAR_MODEL)
    const partnersAmount = 3
    const partners = await seedNodes(ControllerNodeType.CAR_MODEL, partnersAmount)

    for (const partner of partners) {
        await CarModel.createIsSuccessorOfRelationship(carModel.id, partner.id)
    }

    const relationships = await getRelationshipCollection(
        carModel.id,
        RelationshipType.CarModelIsSuccessorOf,
        DbNodeType.CarModel,
    )

    expect(relationships.length)
        .toBe(1)
})
