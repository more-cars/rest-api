import {expect, test} from 'vitest'
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {CarModel} from "../../../../../../../src/models/car-models/CarModel"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"

test('A CAR MODEL cannot have multiple ›is-successor-of‹ relationships', async () => {
    const carModel = await seedNode(NodeTypeEnum.CAR_MODEL)
    const partnersAmount = 3
    const partners = await seedNodes(NodeTypeEnum.CAR_MODEL, partnersAmount)

    for (const partner of partners) {
        await CarModel.createIsSuccessorOfRelationship(carModel.id, partner.id)
    }

    const relationships = await getRelationshipCollection(carModel.id, DbRelationship.CarModelIsSuccessorOf)

    expect(relationships.length)
        .toBe(1)
})
