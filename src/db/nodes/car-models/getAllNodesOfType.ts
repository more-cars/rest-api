import {Driver, Session} from "neo4j-driver"
import {closeDriver, getDriver} from "../../driver"
import {CarModelNode} from "./types/CarModelNode"
import {fetchNodesFromDb} from "../fetchNodesFromDb.ts"
import {NodeTypeLabel} from "../../NodeTypeLabel"
import {mapDbNodeToModelNode} from "./mapDbNodeToModelNode"

export async function getAllNodesOfType(): Promise<Array<CarModelNode>> {
    const driver: Driver = getDriver()
    const session: Session = driver.session()

    const dbNodes = await fetchNodesFromDb(NodeTypeLabel.CarModel)

    await session.close()
    await closeDriver(driver)

    const nodes: Array<CarModelNode> = []

    dbNodes.forEach((dbNode) => {
        nodes.push(mapDbNodeToModelNode(dbNode))
    })

    return nodes
}
