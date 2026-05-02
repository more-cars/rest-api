import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {LapTime} from "../../../../../../../../src/models/node-types/lap-times/LapTime"
import {RelAlreadyExistsError} from "../../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›documented-in-magazine-issue‹ relationship again', async () => {
    const lapTime = await seedNode(DbNodeType.LapTime)
    const magazineIssue = await seedNode(DbNodeType.MagazineIssue)

    await expect(LapTime.createDocumentedInMagazineIssueRelationship(lapTime.properties.id, magazineIssue.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(LapTime.createDocumentedInMagazineIssueRelationship(lapTime.properties.id, magazineIssue.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
