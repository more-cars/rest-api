import axios from "axios"
import {getXrayGraphqlUrl} from "./getXrayGraphqlUrl"
import {loadGraphqlQuery} from "./loadGraphqlQuery"
import {obtainXrayApiToken} from "./obtainXrayApiToken"

export async function downloadTests() {
    try {
        const response = await axios
            .post(getXrayGraphqlUrl(), {
                query: loadGraphqlQuery('getTests.gql')
            }, {
                headers: {
                    'Authorization': `Bearer ${await obtainXrayApiToken()}`
                }
            })
        return response.data.data.getTests.results
    } catch (e) {
        // @ts-expect-error TS18046
        console.error(e.response.data)
    }

    return false
}
