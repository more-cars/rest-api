import {describe, expect, test} from 'vitest'
import {MagazineIssue} from "../../../../../../../src/models/node-types/magazine-issues/MagazineIssue"
import {FakeMagazineIssue} from "../../../../../../_toolbox/fixtures/nodes/FakeMagazineIssue"
import type {MagazineIssueInput} from "../../../../../../../src/models/node-types/magazine-issues/types/MagazineIssueInput"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"

describe('Updating a MAGAZINE ISSUE', () => {
    test('Node does not exist', async () => {
        await expect(MagazineIssue.update(-42, FakeMagazineIssue.dbInput() as MagazineIssueInput))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('Node exists', async () => {
        const createdNode = await seedNode(DbNodeType.MagazineIssue)
        const inputData = FakeMagazineIssue.dbInput()
        const updatedNode = await MagazineIssue.update(createdNode.properties.id, inputData as MagazineIssueInput)

        expect(updatedNode.attributes)
            .toEqual(expect.objectContaining(inputData))
    })

    test('Trying to override read-only properties', async () => {
        const createdNode = await seedNode(DbNodeType.MagazineIssue)
        const validData = FakeMagazineIssue.dbInput()
        const readOnlyData = {
            id: 9999,
            created_at: "NOT_ALLOWED_TO_OVERWRITE",
            updated_at: "NOT_ALLOWED_TO_OVERWRITE",
        }
        const inputData = Object.assign({}, validData, readOnlyData)

        const updatedNode = await MagazineIssue.update(createdNode.properties.id, inputData as MagazineIssueInput)

        expect(updatedNode.attributes)
            .not.toEqual(expect.objectContaining(readOnlyData))
    })
})
