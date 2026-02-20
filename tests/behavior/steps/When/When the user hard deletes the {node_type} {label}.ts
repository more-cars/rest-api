import {When, world} from "@cucumber/cucumber"
import axios from "axios"
import {getBasePathFragmentForNodeType} from "../../../_toolbox/dbSeeding/getBasePathFragmentForNodeType"
import type {ControllerNodeType} from "../../../../src/controllers/nodes/types/ControllerNodeType"

When('the user hard-deletes the {string} {string}',
    async (nodeType: string, label: string) => {
        const node = world.recallNode(label).data
        const path = getBasePathFragmentForNodeType(nodeType.toLowerCase() as ControllerNodeType)

        const response = await axios
            .delete(`${process.env.API_URL}/${path}/${node.id}`)
            .catch(error => {
                console.error(error)
            })

        world.rememberResponse(response)
    })
