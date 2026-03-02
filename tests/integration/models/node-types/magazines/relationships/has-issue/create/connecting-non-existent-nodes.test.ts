import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {Magazine} from "../../../../../../../../src/models/node-types/magazines/Magazine"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›has-issue‹ relationship with nodes that do not exist', async () => {
    const magazine = await seedNode(DbNodeType.Magazine)
    const magazineIssue = await seedNode(DbNodeType.MagazineIssue)

    await expect(Magazine.createHasIssueRelationship(-42, magazineIssue.properties.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(Magazine.createHasIssueRelationship(magazine.properties.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(Magazine.createHasIssueRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
