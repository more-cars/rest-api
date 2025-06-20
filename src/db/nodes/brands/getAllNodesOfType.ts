import {Driver, Session} from "neo4j-driver"
import {closeDriver, getDriver} from "../../driver"
import {BrandNode} from "./types/BrandNode"
import {mapDbNodeToModelNode} from "./mapDbNodeToModelNode"
import {getAllNodesOfTypeQuery} from "../getAllNodesOfTypeQuery"
import {NodeTypeLabel} from "../../NodeTypeLabel"

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

    const {records} = await driver.executeQuery(getAllNodesOfTypeQuery(NodeTypeLabel.Brand))

    records.forEach(record => {
        nodes.push(mapDbNodeToModelNode(record.get('node')))
    })

    return nodes
}
