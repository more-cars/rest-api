import {describe, expect, test} from 'vitest'
import {MagazineIssue} from "../../../../../../src/models/node-types/magazine-issues/MagazineIssue"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"

describe('Deleting a MAGAZINE ISSUE', () => {
    test('that does not exist', async () => {
        await expect(MagazineIssue.delete(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('that exists', async () => {
        const node = await seedNode(DbNodeType.MagazineIssue)
        await expect(MagazineIssue.delete(node.properties.id))
            .resolves
            .not.toThrow(NodeNotFoundError)
    })
})
