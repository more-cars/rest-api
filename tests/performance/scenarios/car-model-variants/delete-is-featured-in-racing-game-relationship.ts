import http from 'k6/http'
import exec from 'k6/execution'
import {check} from "k6"
import {Trend} from "k6/metrics"
import {createNode} from "../../_testdata/createNode.ts"
import {createRelationship} from "../../_testdata/createRelationship.ts"
import {ControllerNodeType} from "../../../../src/controllers/nodes/types/ControllerNodeType"

const trendDuration = new Trend('duration', true)

export const options = {
    summaryTrendStats: ['count', 'min', 'p(1)', 'p(90)', 'p(95)', 'p(98)'],
    thresholds: {
        http_req_failed: ['rate<=0.0'],
        duration: ['p(1)<=10', 'p(90)<=40', 'p(95)<=100', 'p(98)<=500'],
    },
    scenarios: {
        deleteIsFeaturedInRacingGameRelationship: {
            executor: 'constant-arrival-rate',
            duration: '5m',
            rate: 1,
            timeUnit: '1s',
            preAllocatedVUs: 1,
            maxVUs: 1,
            gracefulStop: '10s',
        }
    }
}

export function setup() {
    const carModelVariantId = createNode(ControllerNodeType.CarModelVariant)
    const racingGameIds = []

    for (let i = 0; i < 310; i++) {
        const racingGame = createNode(ControllerNodeType.RacingGame)
        createRelationship(
            ControllerNodeType.CarModelVariant,
            carModelVariantId,
            racingGame,
            'is featured in racing game',
        )
        racingGameIds.push(racingGame)
    }

    return {
        carModelVariantId,
        racingGameIds
    }
}

export default function (data: { carModelVariantId: number, racingGameIds: number[] }) {
    const racingGameId = data.racingGameIds[exec.scenario.iterationInTest]
    const url = `${__ENV.API_URL}/car-model-variants/${data.carModelVariantId}/is-featured-in-racing-game/${racingGameId}`

    const response = http.del(url)

    check(response, {
        'returns with status code 204': (r) => r.status === 204,
    })

    trendDuration.add(response.timings.duration)
}
