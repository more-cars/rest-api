import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedNodes} from "../../../../../../../_toolbox/dbSeeding/seedNodes"
import {MotorShow} from "../../../../../../../../src/models/node-types/motor-shows/MotorShow"
import {getRelationshipCollection} from "../../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"

test('A MOTOR SHOW cannot have multiple ›has-main-video‹ relationships', async () => {
    const motorShow = await seedNode(DbNodeType.MotorShow)
    const videosAmount = 3
    const videos = await seedNodes(DbNodeType.Video, videosAmount)

    for (const video of videos) {
        await MotorShow.createHasMainVideoRelationship(motorShow.properties.id, video.properties.id)
    }

    const relationships = await getRelationshipCollection(motorShow.properties.id, RelationshipType.MotorShowHasMainVideo)

    expect(relationships.length)
        .toBe(1)
})
