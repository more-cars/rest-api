import http from 'k6/http'
import {check} from "k6"
import {Trend} from "k6/metrics"
import {createBrand} from "../_testdata/createBrand.ts"
import {createBrandHasImageRelationships} from "../_testdata/createBrandHasImageRelationships.ts"

const trendDuration = new Trend('duration', true)

export const options = {
    summaryTrendStats: ['count', 'min', 'p(1)', 'p(90)', 'p(95)', 'p(98)'],
    thresholds: {
        http_req_failed: ['rate<=0.0'],
        duration: ['p(1)<=10', 'p(90)<=40', 'p(95)<=100', 'p(98)<=500'],
    },
    scenarios: {
        getHasImageRelationships: {
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
    const brandId = createBrand()
    createBrandHasImageRelationships(brandId, 9)

    return {
        brandId
    }
}

export default function (data: { brandId: number }) {
    const url = `${__ENV.API_URL}/brands/${data.brandId}/has-image`

    const response = http.get(url)

    check(response, {
        'returns with status code 200': (r) => r.status === 200,
        'content-type is JSON': (r) => r.headers['Content-Type'].includes('application/json'),
        // @ts-expect-error TS2531
        'response is an Array': (r) => r.json().length > 0,
    })

    trendDuration.add(response.timings.duration)
}
