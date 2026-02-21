import http from 'k6/http'
import exec from 'k6/execution'
import {check} from "k6"
import {Trend} from "k6/metrics"
import {createBrand} from "../../_testdata/createBrand.ts"
import {createCarModel} from "../../_testdata/createCarModel.ts"
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
        deleteHasCarModelRelationship: {
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
    const brandId = createBrand()
    const carModels = []

    for (let i = 0; i < 310; i++) {
        const carModel = createCarModel()
        createRelationship(
            ControllerNodeType.Brand,
            brandId,
            carModel,
            'has car model',
        )
        carModels.push(carModel)
    }

    return {
        brandId,
        carModels
    }
}

export default function (data: { brandId: number, carModels: number[] }) {
    const carModelId = data.carModels[exec.scenario.iterationInTest]
    const url = `${__ENV.API_URL}/brands/${data.brandId}/has-car-model/${carModelId}`

    const response = http.del(url)

    check(response, {
        'returns with status code 204': (r) => r.status === 204,
    })

    trendDuration.add(response.timings.duration)
}
