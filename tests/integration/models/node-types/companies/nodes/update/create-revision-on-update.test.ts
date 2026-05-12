import {expect, test} from "vitest"
import {Company} from "../../../../../../../src/models/node-types/companies/Company"
import {FakeCompany} from "../../../../../../_toolbox/fixtures/nodes/FakeCompany"
import type {CompanyInput} from "../../../../../../../src/models/node-types/companies/types/CompanyInput"
import {Revision} from "../../../../../../../src/models/node-types/revisions/Revision"

test('Expecting REVISION to be created when updating a node', async () => {
    const node = await Company.create(FakeCompany.dbInput)
    await Company.update(node.attributes.id, {} as CompanyInput)

    const revisionNodes = await Revision.findAll({
        filterByProperty: 'node_updated_at',
        filterValue: node.attributes.updated_at,
    })

    expect(revisionNodes.length)
        .toEqual(1)
})
