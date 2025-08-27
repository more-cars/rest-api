import {When, world} from "@cucumber/cucumber"
import axios from "axios"

When('the user requests to connect {string} to {string} as prime image',
    async (endNodeLabel: string, startNodeLabel: string) => {
        const startNode = world.recallNode(startNodeLabel).data
        const endNode = world.recallNode(endNodeLabel).data
        const pathFragment = world.recallNode(startNodeLabel).nodeType.toLowerCase().replace(' ', '-') + 's'

        const response = await axios
            .post(`${process.env.API_URL}/${pathFragment}/${startNode.id}/has-prime-image/${endNode.id}`)
            .catch(error => {
                console.error(error)
            })

        world.rememberResponse(response)
    })
