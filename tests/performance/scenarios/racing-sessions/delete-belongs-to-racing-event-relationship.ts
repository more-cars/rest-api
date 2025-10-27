import http from 'k6/http'
import exec from 'k6/execution'
import {check} from "k6"
import {Trend} from "k6/metrics"
import {createNode} from "../../_testdata/createNode.ts"
import {createRelationship} from "../../_testdata/createRelationship.ts"
import {NodeTypeEnum} from "../../../../src/controllers/nodes/types/NodeTypeEnum"

const trendDuration = new Trend('duration', true)

export const options = {
    summaryTrendStats: ['count', 'min', 'p(1)', 'p(90)', 'p(95)', 'p(98)'],
    thresholds: {
        http_req_failed: ['rate<=0.0'],
        duration: ['p(1)<=10', 'p(90)<=40', 'p(95)<=100', 'p(98)<=500'],
    },
    scenarios: {
        deleteBelongsToRacingEventRelationship: {
            executor: 'constant-arrival-rate',
            duration: '5m',
            rate: 1,
            timeUnit: '1s',
            preAllocatedVUs: 1,
            maxVUs: 1,
            gracefulStop: '10s',
        }
    }
}

export function setup() {
    const racingSessionId = createNode(NodeTypeEnum.RACING_SESSION)
    const racingEventIds = []

    for (let i = 0; i < 310; i++) {
        const racingEvent = createNode(NodeTypeEnum.RACING_EVENT)
        createRelationship(
            NodeTypeEnum.RACING_SESSION,
            racingSessionId,
            racingEvent,
            'belongs to racing event',
        )
        racingEventIds.push(racingEvent)
    }

    return {
        racingSessionId,
        racingEventIds
    }
}

export default function (data: { racingSessionId: number, racingEventIds: number[] }) {
    const racingEventId = data.racingEventIds[exec.scenario.iterationInTest]
    const url = `${__ENV.API_URL}/racing-sessions/${data.racingSessionId}/belongs-to-racing-event/${racingEventId}`

    const response = http.del(url)

    check(response, {
        'returns with status code 204': (r) => r.status === 204,
    })

    trendDuration.add(response.timings.duration)
}
