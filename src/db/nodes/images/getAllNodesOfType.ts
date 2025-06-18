import {Driver, Session} from "neo4j-driver"
import {closeDriver, getDriver} from "../../driver"
import {ImageNode} from "../../../types/images/ImageNode"
import {mapDbNodeToModelNode} from "./mapDbNodeToModelNode"
import {getAllNodesOfTypeQuery} from "../getAllNodesOfTypeQuery"
import {NodeTypeLabel} from "../../NodeTypeLabel"

export async function getAllNodesOfType(): Promise<Array<ImageNode>> {
    const driver: Driver = getDriver()
    const session: Session = driver.session()

    const foundNodes = await getNodes(driver)

    await session.close()
    await closeDriver(driver)

    return foundNodes
}

async function getNodes(driver: Driver): Promise<Array<ImageNode>> {
    const nodes: Array<ImageNode> = []

    const {records} = await driver.executeQuery(getAllNodesOfTypeQuery(NodeTypeLabel.Image))

    records.forEach(record => {
        nodes.push(mapDbNodeToModelNode(record.get('node')))
    })

    return nodes
}
