import fs from 'fs'

const attemptAutofix = process.argv[2] === "true" || false

checkDependencies(attemptAutofix).then(() => true)

async function checkDependencies(autofix: boolean = false) {
    if (!process.env.API_URL) {
        console.log('⚠️ Environment variable `API_URL` is missing.')

        if (autofix) {
            console.log('🪛 Trying to autofix')
            fs.appendFileSync('.env', 'API_URL=http://api.more-cars.internal:3000\n')
            console.log('🪛 Environment variable `API_URL` with value `http://api.more-cars.internal:3000` was added to the `.env` file')
            console.log('⏻ Please restart the test for the changes to take effect')
        }

        process.exit(1)
    }
}
