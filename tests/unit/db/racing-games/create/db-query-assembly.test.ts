import {expect, test} from 'vitest'
import {InputRacingGameCreate} from "../../../../../src/db/nodes/racing-games/types/InputRacingGameCreate"
import {createNodeQuery} from "../../../../../src/db/nodes/createDbNode"
import {NodeTypeLabel} from "../../../../../src/db/NodeTypeLabel"
import {appInstanceId} from "../../../../../src/db/getNamespacedNodeTypeLabel"

test('database query for creating a RACING GAME node', async () => {
    const data: InputRacingGameCreate = {
        name: "Forza Motorsport 7",
        release_year: 2017,
        developer: "Turn 10 Studios",
        publisher: "Microsoft Studios"
    }

    const query = createNodeQuery(NodeTypeLabel.RacingGame, data)

    expect(query)
        .toEqual(
            "CREATE (node:RacingGame_" + appInstanceId + " {\n" +
            "  name: 'Forza Motorsport 7',\n" +
            "  release_year: 2017,\n" +
            "  developer: 'Turn 10 Studios',\n" +
            "  publisher: 'Microsoft Studios'\n" +
            "})\n" +
            "RETURN node\n" +
            "  LIMIT 1")
})
