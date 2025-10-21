import {expect, test} from 'vitest'
import {getNodeById} from "../../../../../src/db/nodes/track-layouts/getNodeById"
import {seedNode} from "../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {TrackLayoutNode} from "../../../../../src/db/nodes/track-layouts/types/TrackLayoutNode"
import {TrackLayoutSchema} from "../../../../_toolbox/schemas/TrackLayoutSchema"
import {validateJson} from "../../../../_toolbox/validateJson"

test('Querying a TRACK LAYOUT that does not exist should return "false"', async () => {
    const expectedTrackLayoutNode = false
    const actualTrackLayoutNode = await getNodeById(-42)

    expect(actualTrackLayoutNode)
        .toBe(expectedTrackLayoutNode)
})

test('Querying an existing TRACK LAYOUT should return a db node with correct schema', async () => {
    const createdNode = await seedNode(NodeTypeEnum.TRACK_LAYOUT) as TrackLayoutNode
    const trackLayoutNode = await getNodeById(createdNode.id)

    expect(validateJson(trackLayoutNode, TrackLayoutSchema))
        .toBeTruthy()
})
