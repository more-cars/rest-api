import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {MagazineIssue} from "../../../../../../../../src/models/node-types/magazine-issues/MagazineIssue"
import {RelAlreadyExistsError} from "../../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›has-main-video‹ relationship again', async () => {
    const magazineIssue = await seedNode(DbNodeType.MagazineIssue)
    const video = await seedNode(DbNodeType.Video)

    await expect(MagazineIssue.createHasMainVideoRelationship(magazineIssue.properties.id, video.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(MagazineIssue.createHasMainVideoRelationship(magazineIssue.properties.id, video.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
