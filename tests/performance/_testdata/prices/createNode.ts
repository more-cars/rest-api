import http from "k6/http"

export function createNode() {
    const url = `${__ENV.API_URL}/prices`
    const payload = {
        "price": 59990,
        "price_year": 2020,
        "currency_code": "EUR",
        "country_code": "DE",
    }

    const response = http.post(
        url,
        JSON.stringify(payload),
        {headers: {'Content-Type': 'application/json'}}
    )

    // @ts-expect-error TS2531
    return response.json().id
}
