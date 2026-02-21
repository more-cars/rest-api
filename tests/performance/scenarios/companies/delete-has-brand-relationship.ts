import http from 'k6/http'
import exec from 'k6/execution'
import {check} from "k6"
import {Trend} from "k6/metrics"
import {createCompany} from "../../_testdata/createCompany.ts"
import {createBrand} from "../../_testdata/createBrand.ts"
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
        deleteHasBrandRelationship: {
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
    const companyId = createCompany()
    const brands = []

    for (let i = 0; i < 310; i++) {
        const brand = createBrand()
        createRelationship(
            ControllerNodeType.Company,
            companyId,
            brand,
            'has brand',
        )
        brands.push(brand)
    }

    return {
        companyId,
        brands
    }
}

export default function (data: { companyId: number, brands: number[] }) {
    const brandId = data.brands[exec.scenario.iterationInTest]
    const url = `${__ENV.API_URL}/companies/${data.companyId}/has-brand/${brandId}`

    const response = http.del(url)

    check(response, {
        'returns with status code 204': (r) => r.status === 204,
    })

    trendDuration.add(response.timings.duration)
}
