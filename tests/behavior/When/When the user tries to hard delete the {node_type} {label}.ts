import {When, world} from "@cucumber/cucumber"
import axios from "axios"
import {getBasePathFragmentForNodeType} from "../../_toolbox/dbSeeding/getBasePathFragmentForNodeType"
import type {NodeType} from "../../_toolbox/NodeType"

When('the user tries to hard delete the {string} {string}',
    async (nodeType: string, label: string) => {
        const node = world.recallNode(label)
        const path = await getBasePathFragmentForNodeType(nodeType.toLowerCase() as NodeType)

        const response = await axios
            .delete(`${process.env.API_URL}/${path}/${node.id}`, {
                validateStatus: function (status) {
                    return status === 404 // treating 404 as a "good" status code, so axios does not fail the request
                }
            })
            .catch(error => {
                console.error(error)
            })

        world.rememberResponse(response)
    })
