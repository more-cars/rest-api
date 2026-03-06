import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {Rating} from "../../../../../../../../src/models/node-types/ratings/Rating"
import {RelAlreadyExistsError} from "../../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›by-magazine-issue‹ relationship again', async () => {
    const rating = await seedNode(DbNodeType.Rating)
    const magazineIssue = await seedNode(DbNodeType.MagazineIssue)

    await expect(Rating.createByMagazineIssueRelationship(rating.properties.id, magazineIssue.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(Rating.createByMagazineIssueRelationship(rating.properties.id, magazineIssue.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
