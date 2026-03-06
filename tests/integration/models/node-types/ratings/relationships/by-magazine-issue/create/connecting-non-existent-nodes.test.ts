import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {Rating} from "../../../../../../../../src/models/node-types/ratings/Rating"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›by-magazine-issue‹ relationship with nodes that do not exist', async () => {
    const rating = await seedNode(DbNodeType.Rating)
    const magazineIssue = await seedNode(DbNodeType.MagazineIssue)

    await expect(Rating.createByMagazineIssueRelationship(-42, magazineIssue.properties.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(Rating.createByMagazineIssueRelationship(rating.properties.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(Rating.createByMagazineIssueRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
