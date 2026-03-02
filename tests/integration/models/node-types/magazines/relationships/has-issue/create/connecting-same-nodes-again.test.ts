import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {Magazine} from "../../../../../../../../src/models/node-types/magazines/Magazine"
import {RelAlreadyExistsError} from "../../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›has-issue‹ relationship again', async () => {
    const magazine = await seedNode(DbNodeType.Magazine)
    const magazineIssue = await seedNode(DbNodeType.MagazineIssue)

    await expect(Magazine.createHasIssueRelationship(magazine.properties.id, magazineIssue.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(Magazine.createHasIssueRelationship(magazine.properties.id, magazineIssue.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
