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
        createCarModel: {
            exec: 'createCarModel',
            executor: 'constant-arrival-rate',
            duration: '1s',
            rate: 2,
            timeUnit: '1s',
            preAllocatedVUs: 1,
            maxVUs: 1,
            gracefulStop: '1s',
        },
        getCarModel: {
            exec: 'getCarModel',
            executor: 'constant-arrival-rate',
            startTime: '5s',
            duration: '5m',
            rate: 1,
            timeUnit: '1s',
            preAllocatedVUs: 5,
            maxVUs: 5,
            gracefulStop: '10s',
        }
    }
}

// ARRANGE
export function createCarModel() {
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

    check(response, {
        'returns with status code 201': (r) => r.status === 201,
        'content-type is JSON': (r) => r.headers['Content-Type'].includes('application/json'),
    })
}

// ACT + ASSERT
export function getCarModel() {
    const url = `${__ENV.API_URL}/car-models/0`
    const response = http.get(url)

    check(response, {
        'returns with status code 200': (r) => r.status === 200,
        'content-type is JSON': (r) => r.headers['Content-Type'].includes('application/json'),
    })

    trendDuration.add(response.timings.duration)
}
