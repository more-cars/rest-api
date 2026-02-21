import http from 'k6/http'
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
        getHasPrimeImageRelationship: {
            executor: 'constant-arrival-rate',
            duration: '5m',
            rate: 1,
            timeUnit: '1s',
            preAllocatedVUs: 5,
            maxVUs: 5,
            gracefulStop: '10s',
        }
    }
}

export function setup() {
    const trackLayoutId = createNode(ControllerNodeType.TrackLayout)
    const imageId = createNode(ControllerNodeType.Image)
    createRelationship(
        ControllerNodeType.TrackLayout,
        trackLayoutId,
        imageId,
        'has prime image',
    )

    return {
        trackLayoutId
    }
}

export default function (data: { trackLayoutId: number }) {
    const url = `${__ENV.API_URL}/track-layouts/${data.trackLayoutId}/has-prime-image`

    const response = http.get(url)

    check(response, {
        'returns with status code 200': (r) => r.status === 200,
        'content-type is JSON': (r) => r.headers['Content-Type'].includes('application/json'),
        // @ts-expect-error TS2531
        'response contains an ID': (r) => typeof r.json().data.relationship_id === "number",
    })

    trendDuration.add(response.timings.duration)
}
