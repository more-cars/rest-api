import {expect, test} from "vitest"
import {MagazineIssue} from "../../../../../../../src/models/node-types/magazine-issues/MagazineIssue"
import {FakeMagazineIssue} from "../../../../../../_toolbox/fixtures/nodes/FakeMagazineIssue"
import type {MagazineIssueInput} from "../../../../../../../src/models/node-types/magazine-issues/types/MagazineIssueInput"
import {Revision} from "../../../../../../../src/models/node-types/revisions/Revision"

test('Expecting REVISION to be created when updating a node', async () => {
    const node = await MagazineIssue.create(FakeMagazineIssue.dbInput())
    await MagazineIssue.update(node.attributes.id, {} as MagazineIssueInput)

    const revisionNodes = await Revision.findAll({
        filterByProperty: 'node_updated_at',
        filterValue: node.attributes.updated_at,
    })

    expect(revisionNodes.length)
        .toEqual(1)
})
