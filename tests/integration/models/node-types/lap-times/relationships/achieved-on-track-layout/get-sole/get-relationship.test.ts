import {describe, expect, test} from 'vitest'
import {LapTime} from "../../../../../../../../src/models/node-types/lap-times/LapTime"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedRelationship} from "../../../../../../../_toolbox/dbSeeding/seedRelationship"
import {validateJson} from "../../../../../../../_toolbox/validateJson"
import {RelationshipSchema} from "../../../../../../../_toolbox/schemas/model/RelationshipSchema"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../../../src/models/types/RelNotFoundError"

describe('Requesting a ›achieved-on-track-layout‹ relationship', () => {
    test('node and relationship exist', async () => {
        const expectedRelationship = await seedRelationship(DbNodeType.LapTime, DbNodeType.TrackLayout, RelationshipType.LapTimeAchievedOnTrackLayout)
        const expectedLapTimeId = expectedRelationship.start_node.properties.id
        const expectedTrackLayoutId = expectedRelationship.end_node.properties.id
        const actualRelationship = await LapTime.getAchievedOnTrackLayoutRelationship(expectedLapTimeId)

        expect(validateJson(actualRelationship, RelationshipSchema))
            .toBeTruthy()

        expect(actualRelationship.origin.attributes.id)
            .toBe(expectedLapTimeId)

        expect(actualRelationship.destination.attributes.id)
            .toBe(expectedTrackLayoutId)
    })

    test('node exists, but not the relationship', async () => {
        const lapTime = await seedNode(DbNodeType.LapTime)

        await expect(LapTime.getAchievedOnTrackLayoutRelationship(lapTime.properties.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('neither node, nor relationship exist', async () => {
        await expect(LapTime.getAchievedOnTrackLayoutRelationship(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })
})
