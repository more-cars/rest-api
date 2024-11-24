import {Given} from "@cucumber/cucumber"

Given('there exists a car model A', function () {
    // There exists no database yet.
    // But we know that the API has a hardcoded node with ID 555.
    this.carModelA = {
        "id": 555,
        "name": "Countach",
    }
})
