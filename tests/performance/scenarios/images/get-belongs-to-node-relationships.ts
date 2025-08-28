import http from 'k6/http'
import {check} from "k6"
import {Trend} from "k6/metrics"
import {createImage} from "../../_testdata/createImage.ts"
import {createImageBelongsToNodeRelationships} from "../../_testdata/createImageBelongsToNodeRelationships.ts"

const trendDuration = new Trend('duration', true)

export const options = {
    summaryTrendStats: ['count', 'min', 'p(1)', 'p(90)', 'p(95)', 'p(98)'],
    thresholds: {
        http_req_failed: ['rate<=0.0'],
        duration: ['p(1)<=30', 'p(90)<=150', 'p(95)<=300', 'p(98)<=750'],
    },
    scenarios: {
        getBelongsToNodeRelationships: {
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
    const imageId = createImage()
    createImageBelongsToNodeRelationships(imageId, 7)

    return {
        imageId
    }
}

export default function (data: { imageId: number }) {
    const url = `${__ENV.API_URL}/images/${data.imageId}/belongs-to-node`

    const response = http.get(url)

    check(response, {
        'returns with status code 200': (r) => r.status === 200,
        'content-type is JSON': (r) => r.headers['Content-Type'].includes('application/json'),
        // @ts-expect-error TS2531
        'response is an Array': (r) => r.json().length > 0,
    })

    trendDuration.add(response.timings.duration)
}
