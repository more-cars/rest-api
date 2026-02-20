import http from 'k6/http'
import exec from 'k6/execution'
import {check} from "k6"
import {Trend} from "k6/metrics"
import {createNode} from "../../_testdata/createNode.ts"
import {createRelationship} from "../../_testdata/createRelationship.ts"
import {ControllerNodeType} from "../../../../src/controllers/nodes/types/ControllerNodeType"

const trendDuration = new Trend('duration', true)

export const options = {
    summaryTrendStats: ['count', 'min', 'p(1)', 'p(90)', 'p(95)', 'p(98)'],
    thresholds: {
        http_req_failed: ['rate<=0.0'],
        duration: ['p(1)<=10', 'p(90)<=40', 'p(95)<=100', 'p(98)<=500'],
    },
    scenarios: {
        deleteHasSessionResultRelationship: {
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
    const racingSessionId = createNode(ControllerNodeType.RACING_SESSION)
    const sessionResultIds = []

    for (let i = 0; i < 310; i++) {
        const sessionResult = createNode(ControllerNodeType.SESSION_RESULT)
        createRelationship(
            ControllerNodeType.RACING_SESSION,
            racingSessionId,
            sessionResult,
            'has session result',
        )
        sessionResultIds.push(sessionResult)
    }

    return {
        racingSessionId,
        sessionResultIds
    }
}

export default function (data: { racingSessionId: number, sessionResultIds: number[] }) {
    const sessionResultId = data.sessionResultIds[exec.scenario.iterationInTest]
    const url = `${__ENV.API_URL}/racing-sessions/${data.racingSessionId}/has-session-result/${sessionResultId}`

    const response = http.del(url)

    check(response, {
        'returns with status code 204': (r) => r.status === 204,
    })

    trendDuration.add(response.timings.duration)
}
