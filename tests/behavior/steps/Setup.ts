import {Before} from "@cucumber/cucumber"

Before(function () {
    process.env.UNIQUE_TEST_ID = (Math.ceil(Math.random() * 10_000_000) + 10_000_000).toString(16)
})
