import {expect, test} from 'vitest'
import {RacingGameNode} from "../../../../../src/models/node-types/racing-games/types/RacingGameNode"
import {ModelNodeType} from "../../../../../src/models/types/ModelNodeType"
import {convertRacingGameModelNodeToControllerNode} from "../../../../../src/controllers/node-types/racing-games/convertRacingGameModelNodeToControllerNode"
import {ControllerNodeType} from "../../../../../src/controllers/nodes/types/ControllerNodeType"

test("converting a RACING GAME node", async () => {
    const node: RacingGameNode = {
        node_type: ModelNodeType.RacingGame,
        attributes: {
            id: 1,
            created_at: "2025-05-14T11:05:07.793Z",
            updated_at: "2025-05-14T11:05:07.793Z",
            name: "Forza Motorsport 7",
            release_year: 2017,
            developer: "Turn 10 Studios",
            publisher: "Microsoft Studios",
        }
    }

    const convertedNode = convertRacingGameModelNodeToControllerNode(node)

    expect(convertedNode)
        .toStrictEqual({
            node_type: ControllerNodeType.RacingGame,
            fields: {
                id: 1,
                name: "Forza Motorsport 7",
                release_year: 2017,
                developer: "Turn 10 Studios",
                publisher: "Microsoft Studios",
                created_at: "2025-05-14T11:05:07.793Z",
                updated_at: "2025-05-14T11:05:07.793Z",
            }
        })
})
