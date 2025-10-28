import {describe, expect, test} from 'vitest'
import {LapTime} from "../../../../../../../src/models/lap-times/LapTime"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {validateJson} from "../../../../../../_toolbox/validateJson"
import {RelationshipSchema} from "../../../../../../_toolbox/schemas/model/RelationshipSchema"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {RelationshipNotFoundError} from "../../../../../../../src/models/types/RelationshipNotFoundError"

describe('Requesting a ›achieved-on-track-layout‹ relationship', () => {
    test('node and relationship exist', async () => {
        const expectedRelationship = await seedRelationship(NodeTypeEnum.LAP_TIME, NodeTypeEnum.TRACK_LAYOUT, DbRelationship.LapTimeAchievedOnTrackLayout)
        const actualRelationship = await LapTime.getAchievedOnTrackLayoutRelationship(expectedRelationship.start_node_id)

        expect(validateJson(actualRelationship, RelationshipSchema))
            .toBeTruthy()

        expect(actualRelationship.origin.id)
            .toBe(expectedRelationship.start_node_id)

        expect(actualRelationship.destination.id)
            .toBe(expectedRelationship.end_node_id)
    })

    test('node exists, but not the relationship', async () => {
        const lapTime = await seedNode(NodeTypeEnum.LAP_TIME)

        await expect(LapTime.getAchievedOnTrackLayoutRelationship(lapTime.id))
            .rejects
            .toThrow(RelationshipNotFoundError)
    })

    test('neither node, nor relationship exist', async () => {
        await expect(LapTime.getAchievedOnTrackLayoutRelationship(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })
})
