import {expect, test} from "vitest"
import {Programme} from "../../../../../../../src/models/node-types/programmes/Programme"
import {FakeProgramme} from "../../../../../../_toolbox/fixtures/nodes/FakeProgramme"
import type {ProgrammeInput} from "../../../../../../../src/models/node-types/programmes/types/ProgrammeInput"
import {Revision} from "../../../../../../../src/models/node-types/revisions/Revision"

test('Expecting REVISION to be created when updating a node', async () => {
    const node = await Programme.create(FakeProgramme.dbInput())
    await Programme.update(node.attributes.id, {} as ProgrammeInput)

    const revisionNodes = await Revision.findAll({
        filterByProperty: 'node_updated_at',
        filterValue: node.attributes.updated_at,
    })

    expect(revisionNodes.length)
        .toEqual(1)
})
