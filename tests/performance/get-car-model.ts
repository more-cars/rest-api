import http from 'k6/http'
import {check} from "k6"

export const options = {
    thresholds: {
        http_req_failed: ['rate<=0.0'],
        http_req_duration: ['p(1)<=50', 'p(90)<=50', 'p(95)<=100', 'p(99)<=300'],
    },
    scenarios: {
        createCarModel: {
            exec: 'createCarModel',
            executor: 'constant-arrival-rate',
            duration: '1s',
            rate: 1,
            timeUnit: '1s',
            preAllocatedVUs: 1,
            maxVUs: 1,
            gracefulStop: '1s',
        },
        getCarModel: {
            exec: 'getCarModel',
            executor: 'constant-arrival-rate',
            startTime: '15s',
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
    const url = 'http://api.more-cars.internal/car-models'
    const payload = {
        "mc_id": 12345,
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
    const url = 'http://api.more-cars.internal/car-models/12345'

    const response = http.get(url)

    check(response, {
        'returns with status code 200': (r) => r.status === 200,
        'content-type is JSON': (r) => r.headers['Content-Type'].includes('application/json'),
    })
}
