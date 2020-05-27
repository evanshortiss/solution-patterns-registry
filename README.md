_NOTE: This is an example, and not an official registry._

# Solution Pattern Registry

This repository contains a registry of Solution Patterns that are reusable. If
you'd like to add your Solution Pattern follow the instructions
[here](#contributing-a-pattern).

## Patterns

_NOTE: We could generate a simple gh-pages site using the `patterns.json` instead of a list here._

* [Skupper Solution Patterns](https://github.com/pwright/skupper-solution-pattern)
* [Create and Deploy Your First Apache Camel K Integration](https://github.com/redhat-integration/camelk-basic-solution-pattern)

## Contributing a Pattern
1. Ensure your Solution Pattern repository contains a `walkthroughs-config.json` at it's root with the following fields:
  * `prettyName` (String)
  * `authors` (Object[])
  * `authors[*].name` (String)
  * `authors[*].email` (String)
  * `tags` (String[])
  * `rhmiVersions` (String[]) - Integreatly versions you've tested for compatibility
  * `hasPreRequisites` (Boolean) - Indicates that your patterns require prerequisite configuration on the Integreatly cluster prior to use
1. Fork this repository
1. Add a link to your pattern repo to the *patterns.txt* file
1. Add a link to your pattern repo to the *README.md* file
1. Open a PR


## Walkthroughs Config JSON

The schema for the `walkthrough-configs.json` can be found [here](/schema.json)
```json
{
  "prettyName": "AppDev Patterns",
  "authors": [
    {
      "name": "Evan Shortiss",
      "email": "evan.shortiss@redhat.com"
    },
    {
      "name": "Someone Else",
      "email": "someone.else@redhat.com"
    }
  ],
  "tags": ["camelk", "kafka", "nodejs", "quarkus"],
  "rhmiVersions": ["1.6"],
  "hasPreRequisites": false
}
```
