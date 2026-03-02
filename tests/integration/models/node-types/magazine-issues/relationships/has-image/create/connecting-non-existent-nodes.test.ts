import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {MagazineIssue} from "../../../../../../../../src/models/node-types/magazine-issues/MagazineIssue"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›has-image‹ relationship with nodes that do not exist', async () => {
    const magazineIssue = await seedNode(DbNodeType.MagazineIssue)
    const image = await seedNode(DbNodeType.Image)

    await expect(MagazineIssue.createHasImageRelationship(-42, image.properties.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(MagazineIssue.createHasImageRelationship(magazineIssue.properties.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(MagazineIssue.createHasImageRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
