import {expect, test} from 'vitest'
import {RacingEventNode} from "../../../../../src/models/racing-events/types/RacingEventNode"
import {marshalNode} from "../../../../../src/controllers/racing-events/marshalling/marshalNode"

test("marshalling a RACING EVENT node", async () => {
    const node: RacingEventNode = {
        id: 1,
        created_at: "2025-05-14T11:05:07.793Z",
        updated_at: "2025-05-14T11:05:07.793Z",
        name: "GP Monaco 2025",
        round: 8,
        date_from: "2025-05-25",
        date_to: "2025-05-27",
    }

    const marshalledNode = marshalNode(node)

    expect(marshalledNode)
        .toStrictEqual({
            data: {
                id: 1,
                name: "GP Monaco 2025",
                round: 8,
                date_from: "2025-05-25",
                date_to: "2025-05-27",
                created_at: "2025-05-14T11:05:07.793Z",
                updated_at: "2025-05-14T11:05:07.793Z",
            }
        })
})
