import {Driver, Session} from "neo4j-driver"
import {closeDriver, getDriver} from "../driver"
import {BrandNode} from "../../types/brands/BrandNode"

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
        const dbNode = record.get('node')
        nodes.push({
            id: dbNode.properties.mc_id,
            name: dbNode.properties.name,
            full_name: dbNode.properties.full_name,
            founded: dbNode.properties.founded,
            defunct: dbNode.properties.defunct,
            wmi: dbNode.properties.wmi,
            hsn: dbNode.properties.hsn,
        })
    })

    return nodes
}
