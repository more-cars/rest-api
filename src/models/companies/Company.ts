import {CreateCompanyInput} from "./types/CreateCompanyInput"
import {CompanyNode} from "./types/CompanyNode"
import {convertInputData} from "./create/convertInputData"
import {createNode} from "../../db/nodes/companies/createNode"
import {convertOutputData} from "./create/convertOutputData"
import {getNodeById} from "../../db/nodes/companies/getNodeById"
import {getAllNodesOfType} from "../../db/nodes/companies/getAllNodesOfType"
import {deleteNode} from "../../db/nodes/deleteNode"

export class Company {
    static async create(data: CreateCompanyInput): Promise<CompanyNode> {
        const input = convertInputData(data)
        const result = await createNode(input)
        const output = convertOutputData(result)

        return output
    }

    static async findById(id: number): Promise<false | CompanyNode> {
        const node = await getNodeById(id)

        if (!node) {
            return false
        }

        return convertOutputData(node)
    }

    static async findAll(): Promise<CompanyNode[]> {
        const nodes: Array<CompanyNode> = []
        const nodesDb = await getAllNodesOfType()

        nodesDb.forEach(node => {
            nodes.push(convertOutputData(node))
        })

        return nodes
    }

    static async delete(id: number): Promise<boolean> {
        return await deleteNode(id)
    }
}
