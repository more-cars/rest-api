import http from "k6/http"

export function createBrand() {
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
    return response.json().data.id
}
