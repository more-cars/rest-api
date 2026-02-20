import {describe, expect, test} from 'vitest'
import {LapTime} from "../../../../../../../src/models/node-types/lap-times/LapTime"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {validateJson} from "../../../../../../_toolbox/validateJson"
import {RelationshipSchema} from "../../../../../../_toolbox/schemas/model/RelationshipSchema"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../../src/models/types/RelNotFoundError"

describe('Requesting a ›belongs-to-session-result‹ relationship', () => {
    test('node and relationship exist', async () => {
        const expectedRelationship = await seedRelationship(ControllerNodeType.LAP_TIME, ControllerNodeType.SESSION_RESULT, RelationshipType.LapTimeBelongsToSessionResult)
        const expectedLapTimeId = expectedRelationship.start_node.properties.id
        const expectedSessionResultId = expectedRelationship.end_node.properties.id
        const actualRelationship = await LapTime.getBelongsToSessionResultRelationship(expectedLapTimeId)

        expect(validateJson(actualRelationship, RelationshipSchema))
            .toBeTruthy()

        expect(actualRelationship.origin.properties.id)
            .toBe(expectedLapTimeId)

        expect(actualRelationship.destination.properties.id)
            .toBe(expectedSessionResultId)
    })

    test('node exists, but not the relationship', async () => {
        const lapTime = await seedNode(ControllerNodeType.LAP_TIME)

        await expect(LapTime.getBelongsToSessionResultRelationship(lapTime.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('neither node, nor relationship exist', async () => {
        await expect(LapTime.getBelongsToSessionResultRelationship(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })
})
