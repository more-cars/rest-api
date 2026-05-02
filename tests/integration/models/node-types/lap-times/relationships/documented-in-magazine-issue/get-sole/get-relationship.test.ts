import {describe, expect, test} from 'vitest'
import {seedRelationship} from "../../../../../../../_toolbox/dbSeeding/seedRelationship"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"
import {LapTime} from "../../../../../../../../src/models/node-types/lap-times/LapTime"
import {validateJson} from "../../../../../../../_toolbox/validateJson"
import {RelationshipSchema} from "../../../../../../../_toolbox/schemas/model/RelationshipSchema"
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {RelNotFoundError} from "../../../../../../../../src/models/types/RelNotFoundError"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"

describe('Requesting a ›documented-in-magazine-issue‹ relationship', () => {
    test('node and relationship exist', async () => {
        const expectedRelationship = await seedRelationship(DbNodeType.LapTime, DbNodeType.MagazineIssue, RelationshipType.LapTimeDocumentedInMagazineIssue)
        const expectedLapTimeId = expectedRelationship.start_node.properties.id
        const expectedMagazineIssueId = expectedRelationship.end_node.properties.id
        const actualRelationship = await LapTime.getDocumentedInMagazineIssueRelationship(expectedLapTimeId)

        expect(validateJson(actualRelationship, RelationshipSchema))
            .toBeTruthy()

        expect(actualRelationship.origin.attributes.id)
            .toBe(expectedLapTimeId)

        expect(actualRelationship.destination.attributes.id)
            .toBe(expectedMagazineIssueId)
    })

    test('node exists, but not the relationship', async () => {
        const lapTime = await seedNode(DbNodeType.LapTime)

        await expect(LapTime.getDocumentedInMagazineIssueRelationship(lapTime.properties.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('neither node, nor relationship exist', async () => {
        await expect(LapTime.getDocumentedInMagazineIssueRelationship(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })
})
