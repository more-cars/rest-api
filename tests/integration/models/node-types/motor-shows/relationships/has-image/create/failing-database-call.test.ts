import {expect, test, vi} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {MotorShow} from "../../../../../../../../src/models/node-types/motor-shows/MotorShow"

vi.mock("../../../../../../../../src/db/relationships/createRelationship", async () => {
    return {
        createRelationship: () => false
    }
})

test('A completely valid request, but the database call fails (e.g. one of the nodes was deleted just a moment ago)', async () => {
    const motorShow = await seedNode(DbNodeType.MotorShow)
    const image = await seedNode(DbNodeType.Image)

    await expect(MotorShow.createHasImageRelationship(motorShow.properties.id, image.properties.id))
        .rejects
        .toThrow(Error)
})
