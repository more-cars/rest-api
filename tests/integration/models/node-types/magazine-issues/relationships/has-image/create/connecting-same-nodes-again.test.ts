import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {MagazineIssue} from "../../../../../../../../src/models/node-types/magazine-issues/MagazineIssue"
import {RelAlreadyExistsError} from "../../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›has-image‹ relationship again', async () => {
    const magazineIssue = await seedNode(DbNodeType.MagazineIssue)
    const image = await seedNode(DbNodeType.Image)

    await expect(MagazineIssue.createHasImageRelationship(magazineIssue.properties.id, image.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(MagazineIssue.createHasImageRelationship(magazineIssue.properties.id, image.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
