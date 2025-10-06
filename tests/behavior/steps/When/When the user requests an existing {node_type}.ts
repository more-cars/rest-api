import {When, world} from "@cucumber/cucumber"
import axios from "axios"
import {BaseNode} from "../../../../src/db/types/BaseNode"
import {getAllNodesOfType as getAllCompanies} from "../../../../src/db/nodes/companies/getAllNodesOfType"
import {getAllNodesOfType as getAllBrands} from "../../../../src/db/nodes/brands/getAllNodesOfType"
import {getAllNodesOfType as getAllCarModels} from "../../../../src/db/nodes/car-models/getAllNodesOfType"
import {getAllNodesOfType as getAllImages} from "../../../../src/db/nodes/images/getAllNodesOfType"
import {getBasePathFragmentForNodeType} from "../../../_toolbox/dbSeeding/getBasePathFragmentForNodeType"
import type {NodeType} from "../../../_toolbox/NodeType"

When('the user requests an existing {string}',
    async (nodeType: string) => {
        let node: BaseNode
        const path = getBasePathFragmentForNodeType(nodeType.toLowerCase() as NodeType)

        switch (nodeType.toLowerCase()) {
            case 'company':
                node = (await getAllCompanies())[0]
                break
            case 'brand':
                node = (await getAllBrands())[0]
                break
            case 'car model':
                node = (await getAllCarModels())[0]
                break
            case 'image':
                node = (await getAllImages())[0]
                break
            default:
                return
        }

        const response = await axios
            .get(`${process.env.API_URL}/${path}/${node.id}`)

        world.rememberResponse(response)
    })
