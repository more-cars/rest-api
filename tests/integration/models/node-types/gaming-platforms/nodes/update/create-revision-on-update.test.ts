import {expect, test} from "vitest"
import {GamingPlatform} from "../../../../../../../src/models/node-types/gaming-platforms/GamingPlatform"
import {FakeGamingPlatform} from "../../../../../../_toolbox/fixtures/nodes/FakeGamingPlatform"
import type {GamingPlatformInput} from "../../../../../../../src/models/node-types/gaming-platforms/types/GamingPlatformInput"
import {Revision} from "../../../../../../../src/models/node-types/revisions/Revision"

test('Expecting REVISION to be created when updating a node', async () => {
    const node = await GamingPlatform.create(FakeGamingPlatform.dbInput())
    await GamingPlatform.update(node.attributes.id, {} as GamingPlatformInput)

    const revisionNodes = await Revision.findAll({
        filterByProperty: 'node_updated_at',
        filterValue: node.attributes.updated_at,
    })

    expect(revisionNodes.length)
        .toEqual(1)
})
