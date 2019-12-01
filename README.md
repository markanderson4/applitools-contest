# Applitools Hackathon Contest

## How to run the tests

* Clone the repo to your local machine : `git clone https://github.com/markanderson4/applitools-contest`

* Move into root directory of the project : `cd applitools-contest`

* Set Applitools API key to mine : `export APPLITOOLS_API_KEY=MszVA7945vnSVXEZ98OknP7RUwunI9cmYOrgCHteoWws110`

* Install NPM in the root directory of the project: `npm install`

* Launch the Cypress GUI: `npx cypress open`

* Select the TraditionalTests.js and VisualAITests.js to run the traditional tests using cypress/chai assertions, and the tests using Applitools Eyes assertions, respectively

## FAQs/Shortcomings

* There were many changes from V1 -> V2 of the app. I know the instructions mentioned to update tests for new "features", but there were a lot of changes that were mostly changes in copy. Some of them were reasonable (such as, the failure text on login without inputting a username and/or password), and others were unreasonable (changing header on 1st page from "Login" to "Logout"). I operated under the assumption that anything _added_ was a feature, and that anything _changed_ was a defect. Hopefully that is clear with my work

## Why I did this contest

* I work in a client-services company as a Test Engineer, and our client on the project I'm working on is actually actively in a trial period to test out Applitools. So, this seemed like a great way to try it out and also maybe win an awesome prize!
* Also, almost all of my test automation experience is using native mobile solutions (XCUITest and Espresso), so it was an awesome learning experience to automate a website. I've been pushing to use a native solution instead of a 3rd party (such as Appium) so that Test Engineers and Developers can share a language/codebase, to help enhance the shared understanding of the entire project's tech stake. It leads to developers caring more about the tests, and the testers to accelerate their development skills (since PRs are read by developers). As a result, Cypress was the obvious choice!


## What I learned doing this project

* I wrote my first ever tests using Cypress and for the Web in general
* Used JS for the first time outside of college
* Got to use a really cool and practical tool of Applitools Eyes which may directly impact my career in the short future, if my client decides to keep using Applitools past the trial period!
