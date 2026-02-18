import {expect, test} from 'vitest'
import {RacingGameNode} from "../../../../../src/models/node-types/racing-games/types/RacingGameNode"
import {marshalNode} from "../../../../../src/controllers/node-types/racing-games/marshalling/marshalNode"

test("marshalling a RACING GAME node", async () => {
    const node: RacingGameNode = {
        id: 1,
        created_at: "2025-05-14T11:05:07.793Z",
        updated_at: "2025-05-14T11:05:07.793Z",
        name: "Forza Motorsport 7",
        release_year: 2017,
        developer: "Turn 10 Studios",
        publisher: "Microsoft Studios",
    }

    const marshalledNode = marshalNode(node)

    expect(marshalledNode)
        .toStrictEqual({
            data: {
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
