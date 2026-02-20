import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {CarModel} from "../../../../../../../src/models/node-types/car-models/CarModel"
import {RelType} from "../../../../../../../src/models/relationships/types/RelType"

test('Creating a ›is-successor-of‹ relationship with valid data', async () => {
    const carModel = await seedNode(ControllerNodeType.CAR_MODEL)
    const partner = await seedNode(ControllerNodeType.CAR_MODEL)

    const createdRelationship = await CarModel.createIsSuccessorOfRelationship(carModel.id, partner.id)

    expect(createdRelationship.origin.properties.id)
        .toEqual(carModel.id)
    expect(createdRelationship.destination.properties.id)
        .toEqual(partner.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(RelType.CarModelIsSuccessorOf)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
