import http from 'k6/http'
import {check} from "k6"
import {Trend} from "k6/metrics"

const trendDuration = new Trend('duration', true)

export const options = {
    summaryTrendStats: ['count', 'min', 'p(1)', 'p(90)', 'p(95)', 'p(98)'],
    thresholds: {
        http_req_failed: ['rate<=0.0'],
        duration: ['p(1)<=10', 'p(90)<=40', 'p(95)<=100', 'p(98)<=500'],
    },
    scenarios: {
        getCarModel: {
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

/**
 * Creating a new car model, so we can request that in the tests.
 */
export function setup() {
    const url = `${__ENV.API_URL}/car-models`
    const payload = {
        "name": "Performance Test Car Model",
    }

    const response = http.post(
        url,
        JSON.stringify(payload),
        {
            headers: {'Content-Type': 'application/json'}
        }
    )

    // @ts-expect-error TS2531
    return {id: response.json().id}
}

export default function (data: { id: number }) {
    const url = `${__ENV.API_URL}/car-models/${data.id}`
    const response = http.get(url)

    check(response, {
        'returns with status code 200': (r) => r.status === 200,
        'content-type is JSON': (r) => r.headers['Content-Type'].includes('application/json'),
        // @ts-expect-error TS2531
        'correct ID is returned': (r) => r.json().id === data.id,
    })

    trendDuration.add(response.timings.duration)
}
