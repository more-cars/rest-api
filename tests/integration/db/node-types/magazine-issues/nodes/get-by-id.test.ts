import {expect, test} from 'vitest'
import {getNodeById} from "../../../../../../src/db/node-types/magazine-issues/getNodeById"
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"
import {MagazineIssueSchema} from "../../../../../_toolbox/schemas/db/MagazineIssueSchema"
import {validateJson} from "../../../../../_toolbox/validateJson"

test('Querying a MAGAZINE ISSUE that does not exist should return "false"', async () => {
    const expectedMagazineIssueNode = false
    const actualMagazineIssueNode = await getNodeById(-42)

    expect(actualMagazineIssueNode)
        .toBe(expectedMagazineIssueNode)
})

test('Querying an existing MAGAZINE ISSUE should return a db node with correct schema', async () => {
    const createdNode = await seedNode(DbNodeType.MagazineIssue)
    const magazineIssueNode = await getNodeById(createdNode.properties.id)

    expect(validateJson(magazineIssueNode, MagazineIssueSchema))
        .toBeTruthy()
})
