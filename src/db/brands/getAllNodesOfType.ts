import {Driver, Session} from "neo4j-driver"
import {closeDriver, getDriver} from "../driver"
import {BrandNode} from "../../types/brands/BrandNode"
import {mapDbNodeToModelNode} from "./mapDbNodeToModelNode"

export async function getAllNodesOfType(): Promise<Array<BrandNode>> {
    const driver: Driver = getDriver()
    const session: Session = driver.session()

    const foundNodes = await getNodes(driver)

    await session.close()
    await closeDriver(driver)

    return foundNodes
}

async function getNodes(driver: Driver): Promise<Array<BrandNode>> {
    const nodes: Array<BrandNode> = []

    const {records} = await driver.executeQuery(`
            MATCH (node:Brand) 
            RETURN node`,
    )

    records.forEach(record => {
        nodes.push(mapDbNodeToModelNode(record.get('node')))
    })

    return nodes
}
