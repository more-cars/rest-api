import {expect, test} from 'vitest'
import {SessionResultNode} from "../../../../../src/models/node-types/session-results/types/SessionResultNode"
import {marshalNode} from "../../../../../src/controllers/node-types/session-results/marshalling/marshalNode"

test("marshalling a SESSION RESULT node", async () => {
    const node: SessionResultNode = {
        id: 1,
        created_at: "2025-05-14T11:05:07.793Z",
        updated_at: "2025-05-14T11:05:07.793Z",
        position: 1,
        race_number: "44",
        driver_name: "Lewis Hamilton",
        team_name: "Mercedes",
        race_time: "PT1H23M45.678S",
        laps: 51,
        status: "finished",
        points: 25,
    }

    const marshalledNode = marshalNode(node)

    expect(marshalledNode)
        .toStrictEqual({
            data: {
                id: 1,
                position: 1,
                race_number: "44",
                driver_name: "Lewis Hamilton",
                team_name: "Mercedes",
                race_time: "PT1H23M45.678S",
                laps: 51,
                status: "finished",
                points: 25,
                created_at: "2025-05-14T11:05:07.793Z",
                updated_at: "2025-05-14T11:05:07.793Z",
            }
        })
})
