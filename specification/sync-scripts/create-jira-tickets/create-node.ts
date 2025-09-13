import {createCreateNodeTickets} from "./lib/createCreateNodeTickets"
import data from "./ticketTree.json"

createCreateNodeTickets(data).then(
    createdTickets => {
        console.log('Tickets created:', createdTickets)
    })
