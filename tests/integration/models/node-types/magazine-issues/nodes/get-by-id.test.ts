import {describe, expect, test} from 'vitest'
import {MagazineIssue} from "../../../../../../src/models/node-types/magazine-issues/MagazineIssue"
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"

describe('Fetching a MAGAZINE ISSUE', () => {
    test('which does not exist', async () => {
        await expect(MagazineIssue.findById(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('which exists', async () => {
        const expectedMagazineIssue = await seedNode(DbNodeType.MagazineIssue)
        const actualMagazineIssue = await MagazineIssue.findById(expectedMagazineIssue.properties.id)

        expect(actualMagazineIssue.attributes)
            .toEqual(expectedMagazineIssue.properties)
    })
})
