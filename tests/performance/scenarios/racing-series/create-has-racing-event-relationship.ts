import http from 'k6/http'
import {check} from "k6"
import {Trend} from "k6/metrics"
import {createNode} from "../../_testdata/createNode.ts"
import {NodeTypeEnum} from "../../../../src/controllers/nodes/types/NodeTypeEnum.ts"

const trendDuration = new Trend('duration', true)

export const options = {
    summaryTrendStats: ['count', 'min', 'p(1)', 'p(90)', 'p(95)', 'p(98)'],
    thresholds: {
        http_req_failed: ['rate<=0.0'],
        duration: ['p(1)<=30', 'p(90)<=150', 'p(95)<=300', 'p(98)<=750'],
    },
    scenarios: {
        createHasRacingEventRelationship: {
            executor: 'constant-arrival-rate',
            duration: '5m',
            rate: 1,
            timeUnit: '2s',
            preAllocatedVUs: 5,
            maxVUs: 5,
            gracefulStop: '10s',
        }
    }
}

export function setup() {
    const racingSeriesId = createNode(NodeTypeEnum.RACING_SERIES)
    const racingEventId = createNode(NodeTypeEnum.RACING_EVENT)

    return {
        racingSeriesId,
        racingEventId,
    }
}

export default function (data: { racingSeriesId: number, racingEventId: number }) {
    const url = `${__ENV.API_URL}/racing-series/${data.racingSeriesId}/has-racing-event/${data.racingEventId}`

    const response = http.post(url)

    check(response, {
        'returns with status code 201 or 304': (r) => (r.status === 201 || r.status === 304),
    })

    trendDuration.add(response.timings.duration)
}
