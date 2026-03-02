import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {MagazineIssue} from "../../../../../../../../src/models/node-types/magazine-issues/MagazineIssue"
import {RelAlreadyExistsError} from "../../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›belongs-to-magazine‹ relationship again', async () => {
    const magazineIssue = await seedNode(DbNodeType.MagazineIssue)
    const magazine = await seedNode(DbNodeType.Magazine)

    await expect(MagazineIssue.createBelongsToMagazineRelationship(magazineIssue.properties.id, magazine.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(MagazineIssue.createBelongsToMagazineRelationship(magazineIssue.properties.id, magazine.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
