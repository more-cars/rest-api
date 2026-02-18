import {expect, test} from 'vitest'
import {RacingSeriesNode} from "../../../../../src/models/node-types/racing-series/types/RacingSeriesNode"
import {marshalNode} from "../../../../../src/controllers/node-types/racing-series/marshalling/marshalNode"

test("marshalling a RACING SERIES node", async () => {
    const node: RacingSeriesNode = {
        id: 1,
        created_at: "2025-05-14T11:05:07.793Z",
        updated_at: "2025-05-14T11:05:07.793Z",
        name: "Formula 1",
        short_name: "F1",
        founded: 1950,
        defunct: null,
        organized_by: "FIA",
        vehicle_type: "formula racing cars",
    }

    const marshalledNode = marshalNode(node)

    expect(marshalledNode)
        .toStrictEqual({
            data: {
                id: 1,
                name: "Formula 1",
                short_name: "F1",
                founded: 1950,
                defunct: null,
                organized_by: "FIA",
                vehicle_type: "formula racing cars",
                created_at: "2025-05-14T11:05:07.793Z",
                updated_at: "2025-05-14T11:05:07.793Z",
            }
        })
})
