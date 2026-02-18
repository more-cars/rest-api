import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {LapTime} from "../../../../../../../src/models/lap-times/LapTime"
import {RelType} from "../../../../../../../src/models/relationships/types/RelType"

test('Creating a ›has-prime-image‹ relationship with valid data', async () => {
    const lapTime = await seedNode(NodeTypeEnum.LAP_TIME)
    const image = await seedNode(NodeTypeEnum.IMAGE)

    const createdRelationship = await LapTime.createHasPrimeImageRelationship(lapTime.id, image.id)

    expect(createdRelationship.origin.id)
        .toEqual(lapTime.id)
    expect(createdRelationship.destination.id)
        .toEqual(image.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(RelType.LapTimeHasPrimeImage)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
