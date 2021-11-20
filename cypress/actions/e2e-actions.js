/// <reference types="cypress" />
import data from '../fixtures/testData'
import element from '../fixtures/elements'


export function setName(value) {
  cy.get(element.name)
    .click()
    .type(data.name, { force: true })
    .should('have.value', value)
}

export function setEmail(value1, value2) {

  cy.get(element.email).should('not.be.disabled').should('be.visible')
    .type(value1, { delay: 20 }).should('contain.value', value2)
}

export function setPassword(value) {

  cy.get(element.password).should('contain.value', '')
  cy.get(element.password).type(value).should('be.visible')

}

export function acceptTerms() {
  cy.get(element.termsChkbx).should('not.be.visible')
  cy.get(element.termsChkbx).click({ force: true })
}

export function acceptSubscription() {
  cy.get(element.newsChkbx).should('be.visible')
  cy.get(element.newsChkbx).click()
}


export function validateSuccessfulReg() {
  const field = cy.get(element.successfulSingup).invoke('text').then((text1) => {
    expect(text1).to.eq(data.expectedSignupTitle)
  })
}

export function submit() {
  cy.get(element.submitBtn).should('contain.text', data.expectedBtnText)
  cy.get(element.submitBtn).should('be.visible')
  cy.get(element.submitBtn).click()
}

export function validatePassword(value, status) {
  cy.get(element.password).click().type(value, { delay: 30 })
  cy.get(element.passwordStatus).should('contain.text', status)
  cy.get(element.passwordStatus).should('not.be.checked')
  cy.get(element.password).clear()

}

export function getConfirmationCode(value) {
  var res = value.replace(/\D/g, "");
  console.log('Code => ', res)
  return res
}


export function generateRandomPassword(length) {
  var result = '';
  var characters = data.characters;
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() *
      charactersLength));
  }
  return result;
}



export function navigate() {
  cy.visit('/')
  cy.url().should('include', data.expectedURL)
}


export function generateRandomString(length) {
  let result = '';
  let characters = data.aphabet;
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() *
      charactersLength));
  }
  return result;
}

export function generateRandomEmail() {
  let validEmail = data.emailDomain
  return generateRandomString(10) + validEmail
}

export function validateEmail(email) {
  cy.get(element.email).type(email)
  cy.get(element.submitBtn).click()
  cy.get(element.email).then(function (text) {
    cy.log(text.text())
  })
  cy.get(element.email).clear()

}
