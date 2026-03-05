import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {MagazineIssue} from "../../../../../../../../src/models/node-types/magazine-issues/MagazineIssue"
import {RelAlreadyExistsError} from "../../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›follows-issue‹ relationship again', async () => {
    const magazineIssue = await seedNode(DbNodeType.MagazineIssue)
    const partner = await seedNode(DbNodeType.MagazineIssue)

    await expect(MagazineIssue.createFollowsIssueRelationship(magazineIssue.properties.id, partner.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(MagazineIssue.createFollowsIssueRelationship(magazineIssue.properties.id, partner.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
