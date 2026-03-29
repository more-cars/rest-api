import http from 'k6/http'
import {check} from "k6"
import {Trend} from "k6/metrics"
import {createNode} from "../../_testdata/createNode.ts"
import {ControllerNodeType} from "../../../../src/controllers/types/ControllerNodeType.ts"
import {createCarModel} from "../../_testdata/createCarModel"

const trendDuration = new Trend('duration', true)

export const options = {
    summaryTrendStats: ['count', 'min', 'p(1)', 'p(90)', 'p(95)', 'p(98)'],
    thresholds: {
        http_req_failed: ['rate<=0.0'],
        duration: ['p(1)<=30', 'p(90)<=150', 'p(95)<=300', 'p(98)<=750'],
    },
    scenarios: {
        createIsMainVideoOfNodeRelationship: {
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
    const videoId = createNode(ControllerNodeType.Video)
    const nodeId = createCarModel()

    return {
        videoId,
        nodeId,
    }
}

export default function (data: { videoId: number, nodeId: number }) {
    const url = `${__ENV.API_URL}/videos/${data.videoId}/is-main-video-of-node/${data.nodeId}`

    const response = http.post(url)

    check(response, {
        'returns with status code 201 or 304': (r) => (r.status === 201 || r.status === 304),
    })

    trendDuration.add(response.timings.duration)
}
