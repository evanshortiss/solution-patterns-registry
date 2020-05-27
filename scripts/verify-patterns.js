"use strict"

/**
 * Verifies that each pattern meets requirements for listing.
 * This means that they contain a walkthroughs-config.json file with specific
 * fields set as required.
 */

const { default: PQueue } = require("p-queue")
const { parse } = require("url")
const log = require("../utils/log")
const got = require("got")
const Ajv = require("ajv")

// URLs to the Solution Pattern repos and the schema to validate them
const patternUrls = require("../patterns.json")
const schema = require("../schema.json")

;(async function () {
  const ajv = new Ajv()
  const q = new PQueue({
    concurrency: 1,
  })

  patternUrls.forEach((url) => {
    q.add(async () => {
      log.info(`Validating pattern at URL: ${url}`)
      const urlComponents = parse(url)
      const configJsonUrl = `https://raw.githubusercontent.com${urlComponents.pathname}/${urlComponents.hash.replace('#', '')}/walkthroughs-config.json`

      // Enforce versioning/branches in patterns.json URLs
      if (!urlComponents.hash) {
        log.error(`The pattern URL ${url} is invalid. Please include a ref to a branch or tag in the via URL hash.`)
        log.error('We recommend creating specific version tags, e.g https://github.com/user/pattern#v1.0.0')
        process.exit(1)
      }

      try {
        log.info(`Fetching walkthroughs-config.json at ${configJsonUrl}`)
        const data = await got(configJsonUrl).json()
        const valid = ajv.validate(schema, data)

        if (!valid) {
          log.error(ajv.errorsText)
          process.exit(1)
        }
      } catch (ex) {
        if (ex instanceof got.HTTPError) {
          log.error(`Exception occurred when fetching ${configJsonUrl}`)
          log.error(ex.toString())
        } else {
          log.error(ex)
        }
        process.exit(1)
      }
    })
  })

  await q.onEmpty()
  log.info('All entries in pattern.json passed validation!')
})()
