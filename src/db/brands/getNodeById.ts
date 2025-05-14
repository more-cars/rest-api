import {Driver, Node, Session} from "neo4j-driver"
import {closeDriver, getDriver} from "../driver"
import {BrandNode} from "../../types/brands/BrandNode"

export async function getNodeById(id: number): Promise<false | BrandNode> {
    const driver: Driver = getDriver()
    const session: Session = driver.session()

    const foundNode = await getNode(id, driver)

    await session.close()
    await closeDriver(driver)

    return foundNode
}

async function getNode(id: number, driver: Driver): Promise<false | BrandNode> {
    const {records} = await driver.executeQuery(`
            MATCH (node {mc_id: ${id}}) 
            RETURN node
            LIMIT 1`,
    )

    if (records.length === 0) {
        return false
    }

    const foundDbNode: Node = records[0].get('node')

    const node: BrandNode = {
        id: foundDbNode.properties.mc_id,
        name: foundDbNode.properties.name,
        full_name: foundDbNode.properties.full_name,
        founded: foundDbNode.properties.founded,
        defunct: foundDbNode.properties.defunct,
        wmi: foundDbNode.properties.wmi,
        hsn: foundDbNode.properties.hsn,
    }

    return node
}
