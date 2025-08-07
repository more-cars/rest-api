import http from 'k6/http'
import {check} from "k6"
import {Trend} from "k6/metrics"
import {createImage} from "../_testdata/createImage.ts"
import {createCarModel} from "../_testdata/createCarModel.ts"
import {createImageBelongsToNodeRelationship} from "../_testdata/createImageBelongsToNodeRelationship.ts"

const trendDuration = new Trend('duration', true)

export const options = {
    summaryTrendStats: ['count', 'min', 'p(1)', 'p(90)', 'p(95)', 'p(98)'],
    thresholds: {
        http_req_failed: ['rate<=0.0'],
        duration: ['p(1)<=30', 'p(90)<=150', 'p(95)<=300', 'p(98)<=750'],
    },
    scenarios: {
        getBelongsToNodeRelationship: {
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
    const nodeId = createCarModel()
    createImageBelongsToNodeRelationship(imageId, nodeId)

    return {
        imageId,
        nodeId,
    }
}

export default function (data: { imageId: number, nodeId: number }) {
    const url = `${__ENV.API_URL}/images/${data.imageId}/belongs-to-node/${data.nodeId}`

    const response = http.get(url)

    check(response, {
        'returns with status code 200': (r) => r.status === 200,
        'content-type is JSON': (r) => r.headers['Content-Type'].includes('application/json'),
        // @ts-expect-error TS2531
        'response contains an ID': (r) => typeof r.json().relationship_id === "number",
    })

    trendDuration.add(response.timings.duration)
}
