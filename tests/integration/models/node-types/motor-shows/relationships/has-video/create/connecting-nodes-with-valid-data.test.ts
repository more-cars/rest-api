import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {MotorShow} from "../../../../../../../../src/models/node-types/motor-shows/MotorShow"
import {RelType} from "../../../../../../../../src/models/relationships/types/RelType"

test('Creating a ›has-video‹ relationship with valid data', async () => {
    const motorShow = await seedNode(DbNodeType.MotorShow)
    const video = await seedNode(DbNodeType.Video)

    const createdRelationship = await MotorShow.createHasVideoRelationship(motorShow.properties.id, video.properties.id)

    expect(createdRelationship.origin.attributes.id)
        .toEqual(motorShow.properties.id)
    expect(createdRelationship.destination.attributes.id)
        .toEqual(video.properties.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(RelType.MotorShowHasVideo)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
