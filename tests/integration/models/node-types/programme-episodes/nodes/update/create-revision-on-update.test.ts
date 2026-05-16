import {expect, test} from "vitest"
import {ProgrammeEpisode} from "../../../../../../../src/models/node-types/programme-episodes/ProgrammeEpisode"
import {FakeProgrammeEpisode} from "../../../../../../_toolbox/fixtures/nodes/FakeProgrammeEpisode"
import type {ProgrammeEpisodeInput} from "../../../../../../../src/models/node-types/programme-episodes/types/ProgrammeEpisodeInput"
import {Revision} from "../../../../../../../src/models/node-types/revisions/Revision"

test('Expecting REVISION to be created when updating a node', async () => {
    const node = await ProgrammeEpisode.create(FakeProgrammeEpisode.dbInput())
    await ProgrammeEpisode.update(node.attributes.id, {} as ProgrammeEpisodeInput)

    const revisionNodes = await Revision.findAll({
        filterByProperty: 'node_updated_at',
        filterValue: node.attributes.updated_at,
    })

    expect(revisionNodes.length)
        .toEqual(1)
})
