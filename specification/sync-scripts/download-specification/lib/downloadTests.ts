import axios from "axios"
import type {XrayTest} from "./types/XrayTest"
import {loadGraphqlQuery} from "./loadGraphqlQuery"
import {getXrayGraphqlUrl} from "./getXrayGraphqlUrl"
import {obtainXrayApiToken} from "./obtainXrayApiToken"

export async function downloadTests() {
    let results: Array<XrayTest> = []
    let startIndex = 0
    let moreResultsPagesAreAvailable = true

    try {
        do {
            const response = await requestNextPage(startIndex)
            results = results.concat(response.data.data.getTests.results)
            const totalResults = response.data.data.getTests.total
            startIndex = startIndex + 100
            moreResultsPagesAreAvailable = (startIndex < totalResults)
        } while (moreResultsPagesAreAvailable)
    } catch (e) {
        console.error(e)
    }

    return results
}

async function requestNextPage(startIndex: number) {
    let query = loadGraphqlQuery('getTests.gql')
    query = query.replace('$start', String(startIndex))

    return axios
        .post(getXrayGraphqlUrl(), {
            query
        }, {
            headers: {
                'Authorization': `Bearer ${await obtainXrayApiToken()}`
            }
        })
}
