import http from 'k6/http'
import {check} from "k6"

export const options = {
    thresholds: {
        http_req_failed: ['rate<=0.0'],
        http_req_duration: ['p(1)<=50', 'p(90)<=100', 'p(95)<=200', 'p(99)<=500'],
    },
    scenarios: {
        createCarModel: {
            executor: 'constant-arrival-rate',
            duration: '5m',
            rate: 1,
            timeUnit: '5s',
            preAllocatedVUs: 5,
            maxVUs: 5,
            gracefulStop: '10s',
        }
    }
}

export default function () {
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
