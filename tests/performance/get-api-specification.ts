import http from 'k6/http'
import {check} from "k6"

export const options = {
    thresholds: {
        http_req_failed: ['rate<=0.0'],
        http_req_duration: ['p(90)<=50', 'p(95)<=200', 'p(99)<=500'],
    },
    scenarios: {
        getApiSpecification: {
            executor: 'constant-arrival-rate',
            duration: '1m',
            rate: 10,
            timeUnit: '1s',
            preAllocatedVUs: 10,
            maxVUs: 10,
            gracefulStop: '10s',
        }
    }
}

export default function () {
    const response = http.get('http://api.more-cars.internal')

    check(response, {
        'returns with status code 200': (r) => r.status === 200,
        'content-type is JSON': (r) => r.headers['Content-Type'].includes('application/json'),
    })
}
