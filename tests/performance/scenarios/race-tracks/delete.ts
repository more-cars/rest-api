import http from 'k6/http'
import exec from 'k6/execution'
import {check} from "k6"
import {Trend} from "k6/metrics"
import {createNode} from "../../_testdata/race-tracks/createNode.ts"

const trendDuration = new Trend('duration', true)

export const options = {
    summaryTrendStats: ['count', 'min', 'p(1)', 'p(90)', 'p(95)', 'p(98)'],
    thresholds: {
        http_req_failed: ['rate<=0.0'],
        duration: ['p(1)<=10', 'p(90)<=40', 'p(95)<=100', 'p(98)<=500'],
    },
    scenarios: {
        deleteRaceTrack: {
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
    const raceTracks = []

    for (let i = 0; i < 310; i++) {
        raceTracks.push(createNode())
    }

    return {ids: raceTracks}
}

export default function (data: { ids: any[] }) {
    const id = data.ids[exec.scenario.iterationInTest]
    const url = `${__ENV.API_URL}/race-tracks/${id}`
    const response = http.del(url)

    check(response, {
        'returns with status code 204': (r) => r.status === 204,
        'response contains no body': (r) => r.body === null,
    })

    trendDuration.add(response.timings.duration)
}
