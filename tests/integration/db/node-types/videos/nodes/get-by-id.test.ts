import {expect, test} from 'vitest'
import {getNodeById} from "../../../../../../src/db/node-types/videos/getNodeById"
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"
import {VideoSchema} from "../../../../../_toolbox/schemas/db/VideoSchema"
import {validateJson} from "../../../../../_toolbox/validateJson"

test('Querying a VIDEO that does not exist should return "false"', async () => {
    const expectedVideoNode = false
    const actualVideoNode = await getNodeById(-42)

    expect(actualVideoNode)
        .toBe(expectedVideoNode)
})

test('Querying an existing VIDEO should return a db node with correct schema', async () => {
    const createdNode = await seedNode(DbNodeType.Video)
    const videoNode = await getNodeById(createdNode.properties.id)

    expect(validateJson(videoNode, VideoSchema))
        .toBeTruthy()
})
