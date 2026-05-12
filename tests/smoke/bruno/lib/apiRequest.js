exports.post = async function (path, data) {
    const response = await fetch(bru.getEnvVar('baseUrl') + path, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })

    return extractResponseBody(response)
}

exports.del = async function (path) {
    const response = await fetch(bru.getEnvVar('baseUrl') + path, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
        },
    })

    return extractResponseBody(response)
}

async function extractResponseBody(response) {
    const responseBody = await response.text()
    try {
        return JSON.parse(responseBody)
    } catch (e) {
        return responseBody
    }
}
