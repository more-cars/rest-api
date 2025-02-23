import http from 'k6/http'
import {check} from "k6"
import {Trend} from "k6/metrics"

const trendDuration = new Trend('duration', true)

export const options = {
    summaryTrendStats: ['count', 'min', 'p(1)', 'p(90)', 'p(95)', 'p(98)'],
    thresholds: {
        http_req_failed: ['rate<=0.0'],
        duration: ['p(1)<=30', 'p(90)<=150', 'p(95)<=300', 'p(98)<=750'],
    },
    scenarios: {
        createCarModel: {
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

export default function () {
    const url = `${__ENV.API_URL}/car-models`
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

    trendDuration.add(response.timings.duration)
}
