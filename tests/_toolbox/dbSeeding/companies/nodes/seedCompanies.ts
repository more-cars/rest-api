import {CompanyNode} from "../../../../../src/db/nodes/companies/types/CompanyNode"
import {seedCompany} from "./seedCompany"

export async function seedCompanies(amount: number) {
    const companies: Array<CompanyNode> = []

    for (let i = 0; i < amount; i++) {
        companies.push(await seedCompany())
    }

    return companies
}
