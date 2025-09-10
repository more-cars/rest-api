import {createNode} from "./createNode"
import data from "./ticketTree.json"

createNode(data).then(
    createdTickets => {
        console.log('Tickets created:', createdTickets)
    })
