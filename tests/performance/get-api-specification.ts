import http from 'k6/http'
import {check} from "k6"
import {Trend} from "k6/metrics";

const trendDuration = new Trend('duration', true)

export const options = {
    summaryTrendStats: ['count', 'min', 'p(1)', 'p(90)', 'p(95)', 'p(98)'],
    thresholds: {
        http_req_failed: ['rate<=0.0'],
        duration: ['p(1)<=1', 'p(90)<=3', 'p(95)<=6', 'p(98)<=10'],
    },
    scenarios: {
        getApiSpecification: {
            executor: 'constant-arrival-rate',
            duration: '5m',
            rate: 5,
            timeUnit: '1s',
            preAllocatedVUs: 2,
            maxVUs: 2,
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

    trendDuration.add(response.timings.duration)
}
