import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {MagazineIssue} from "../../../../../../../../src/models/node-types/magazine-issues/MagazineIssue"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›belongs-to-magazine‹ relationship with nodes that do not exist', async () => {
    const magazineIssue = await seedNode(DbNodeType.MagazineIssue)
    const magazine = await seedNode(DbNodeType.Magazine)

    await expect(MagazineIssue.createBelongsToMagazineRelationship(-42, magazine.properties.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(MagazineIssue.createBelongsToMagazineRelationship(magazineIssue.properties.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(MagazineIssue.createBelongsToMagazineRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
