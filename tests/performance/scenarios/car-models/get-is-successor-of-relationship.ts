import http from 'k6/http'
import {check} from "k6"
import {Trend} from "k6/metrics"
import {createCarModel} from "../../_testdata/createCarModel.ts"
import {createRelationship} from "../../_testdata/createRelationship.ts"

const trendDuration = new Trend('duration', true)

export const options = {
    summaryTrendStats: ['count', 'min', 'p(1)', 'p(90)', 'p(95)', 'p(98)'],
    thresholds: {
        http_req_failed: ['rate<=0.0'],
        duration: ['p(1)<=10', 'p(90)<=40', 'p(95)<=100', 'p(98)<=500'],
    },
    scenarios: {
        getIsSuccessorOfRelationship: {
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
    const carModelId = createCarModel()
    const partnerNodeId = createCarModel()
    createRelationship(
        'car model',
        carModelId,
        partnerNodeId,
        'is successor of',
    )

    return {
        carModelId
    }
}

export default function (data: { carModelId: number }) {
    const url = `${__ENV.API_URL}/car-models/${data.carModelId}/is-successor-of`

    const response = http.get(url)

    check(response, {
        'returns with status code 200': (r) => r.status === 200,
        'content-type is JSON': (r) => r.headers['Content-Type'].includes('application/json'),
        // @ts-expect-error TS2531
        'response contains an ID': (r) => typeof r.json().data.relationship_id === "number",
    })

    trendDuration.add(response.timings.duration)
}
