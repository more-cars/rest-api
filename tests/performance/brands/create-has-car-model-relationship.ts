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
        createHasCarModelRelationship: {
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


/**
 * Creating a brand and a car model, so we can test the relationship creation between both.
 */
export function setup() {
    const brandId = createBrand()
    const carModelId = createCarModel()

    return {
        brandId,
        carModelId,
    }
}

export default function (data: { brandId: number, carModelId: number }) {
    const url = `${__ENV.API_URL}/brands/${data.brandId}/has-car-model/${data.carModelId}`

    const response = http.post(url)

    check(response, {
        'returns with status code 201': (r) => r.status === 201,
        'content-type is JSON': (r) => r.headers['Content-Type'].includes('application/json'),
        // @ts-expect-error TS2531
        'response contains an ID': (r) => typeof r.json().relationship_id === "number",
    })

    trendDuration.add(response.timings.duration)
}

function createBrand() {
    const url = `${__ENV.API_URL}/brands`
    const payload = {
        "name": "Performance Test Brand",
    }

    const response = http.post(
        url,
        JSON.stringify(payload),
        {headers: {'Content-Type': 'application/json'}}
    )

    // @ts-expect-error TS2531
    return response.json().id
}

function createCarModel() {
    const url = `${__ENV.API_URL}/car-models`
    const payload = {
        "name": "Performance Test Car Model",
    }

    const response = http.post(
        url,
        JSON.stringify(payload),
        {headers: {'Content-Type': 'application/json'}}
    )

    // @ts-expect-error TS2531
    return response.json().id
}
