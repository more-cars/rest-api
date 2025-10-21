import http from "k6/http"

export function createNode(nodeType: string) {
    let path = '/' + nodeType.replace(' ', '-') + 's'
    path = path.replace('ys', 'ies')

    const url = `${__ENV.API_URL}${path}`
    const payload = {
        "name": "Performance Test " + nodeType
    }

    const response = http.post(
        url,
        JSON.stringify(payload),
        {headers: {'Content-Type': 'application/json'}}
    )

    // @ts-expect-error TS2531
    return response.json().data.id
}
