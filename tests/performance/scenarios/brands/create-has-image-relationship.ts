import http from 'k6/http'
import {check} from "k6"
import {Trend} from "k6/metrics"
import {createBrand} from "../../_testdata/createBrand.ts"
import {createImage} from "../../_testdata/createImage.ts"

const trendDuration = new Trend('duration', true)

export const options = {
    summaryTrendStats: ['count', 'min', 'p(1)', 'p(90)', 'p(95)', 'p(98)'],
    thresholds: {
        http_req_failed: ['rate<=0.0'],
        duration: ['p(1)<=30', 'p(90)<=150', 'p(95)<=300', 'p(98)<=750'],
    },
    scenarios: {
        createHasImageRelationship: {
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

export function setup() {
    const brandId = createBrand()
    const imageId = createImage()

    return {
        brandId,
        imageId,
    }
}

export default function (data: { brandId: number, imageId: number }) {
    const url = `${__ENV.API_URL}/brands/${data.brandId}/has-image/${data.imageId}`

    const response = http.post(url)

    check(response, {
        'returns with status code 201': (r) => r.status === 201,
        'content-type is JSON': (r) => r.headers['Content-Type'].includes('application/json'),
        // @ts-expect-error TS2531
        'response contains an ID': (r) => typeof r.json().relationship_id === "number",
    })

    trendDuration.add(response.timings.duration)
}
