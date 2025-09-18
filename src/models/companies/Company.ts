import {CreateCompanyInput} from "./types/CreateCompanyInput"
import {CompanyNode} from "./types/CompanyNode"
import {convertInputData} from "./create/convertInputData"
import {createNode} from "../../db/nodes/companies/createNode"
import {convertOutputData} from "./create/convertOutputData"
import {getNodeById} from "../../db/nodes/companies/getNodeById"

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
}
