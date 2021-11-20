# Testing [Miro Signup webapp](https://miro.com/signup/) using Cypress

## __Prerequisites__
1. Install [NodeJS](https://nodejs.org)
2. Install [Cypress](https://docs.cypress.io/guides/getting-started/installing-cypress.html#Install-binary)
3. Install [Mailosaur](https://mailosaur.com/)
4. Have Chrome installed

## [Test Plan](testplan.txt)

## __Installing Dependencies__
1. Install Cybress
````
npm install cypress
````
2. To open the Cypress Application use the command
````
npx cypress open
````

3. To run Cypress Headless use the command
````
npx cypress run
````

4. To run Cypress Headless on specific browser use the command
````
npx cypress run --browser {browser name}
````
5. To run Mailosaur Test Case Successfully
````
1-you need to register and have an account on the Mailosaur website 
2-go to the API and create Key
3-open Cypress.json and replace the existing key with new
4-go to testData.js and copy the server ID & Server Domain and replace the existing with new 
Please check the screenshots for reference
````