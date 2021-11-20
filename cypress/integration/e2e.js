/// <reference types="cypress" />
import { beforeEach } from 'mocha';
import data from '../fixtures/testData'
import element from '../fixtures/elements'

import {
    navigate,
    setName,
    setEmail,
    setPassword,
    submit,
    acceptTerms,
    acceptSubscription,
    generateRandomPassword,
    generateRandomEmail,
    generateRandomString,
    validateEmail,
    validatePassword,
    getConfirmationCode,
    validateSuccessfulReg
} from '../actions/e2e-actions';

Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})



describe('fill sign up', () => {

    beforeEach(() => {
        navigate()
    })

    describe('positive test cases', () => {

        const serverId = data.serverID;
        const testEmail = `${generateRandomString(6) + data.emailDomain}`
        var yourCode = ""

        it('should check UI on the page', () => {

            acceptTerms()
            acceptSubscription()
            submit()
        })

        it('should check password strength', () => {

            validatePassword(generateRandomPassword(8), data.weak_password)
            validatePassword(generateRandomPassword(9), data.Good_password)
            validatePassword(generateRandomPassword(23), data.Strong_password)
        })



        it('should check successful signup without optional fields', () => {

            setName(data.expectedName)
            setEmail(generateRandomEmail(), data.serverName)
            setPassword(generateRandomPassword(8))
            acceptTerms()
            submit()
            validateSuccessfulReg()
        })

        it('should check alphanumeric password', () => {
            setName(data.expectedName)
            setEmail(generateRandomEmail(), data.serverName)
            setPassword(generateRandomPassword(8))
            acceptTerms()
            acceptSubscription()
            submit()
            validateSuccessfulReg()
        })


        it('should signup successfully by entering confirmation code', () => {
            setName(data.expectedName)
            setEmail(testEmail, data.serverName)
            setPassword(generateRandomPassword(8))
            acceptTerms()
            acceptSubscription()
            submit()
            validateSuccessfulReg()
            cy.mailosaurGetMessage(serverId, {
                sentTo: testEmail
            }).then(email => {
                yourCode = getConfirmationCode(email.subject)
                cy.get(element.code).type(yourCode)
            })

        })

    })

    describe('negative test cases', () => {

        it('should check invalid email format', () => {
            setName(data.expectedName)
            setEmail(generateRandomEmail(), data.serverName)
            setPassword(generateRandomPassword(9))
            acceptTerms()
            acceptSubscription()
            validateEmail(data.wrongEmail1)
            validateEmail(data.wrongEmail2)
            validateEmail(data.wrongEmail3)
            validateEmail(data.wrongEmail4)
        })


        it('should check existing email format', () => {
            setName(data.expectedName)
            setEmail(data.existEmail, data.serverName)
            setPassword(generateRandomPassword(8))
            acceptTerms()
            acceptSubscription()
            submit()
            cy.get(element.emailErrorMsg).contains(data.existEmailError)

        })

        it('should check the password for less value than 8 digits', () => {
            setName(data.expectedName)
            setEmail(generateRandomEmail(), data.serverName)
            setPassword(generateRandomPassword(7))
            acceptTerms()
            acceptSubscription()
            submit()
            cy.get(element.PwdError).contains(data.less_password)
        })

        it('should check without Name only', () => {
            setEmail(generateRandomEmail(), data.serverName)
            setPassword(generateRandomPassword(20))
            acceptTerms()
            acceptSubscription()
            submit()
            cy.get(element.nameErrorMsg).contains(data.nameErrorMsg)
        })

        it('should check without Email only', () => {
            setName(data.expectedName)
            setPassword(generateRandomPassword(10))
            acceptTerms()
            acceptSubscription()
            submit()
            cy.get(element.emailErrorMsg).contains(data.emailErrorMsg)
        })

        it('should check without password only', () => {
            setName(data.expectedName)
            setEmail(generateRandomEmail(), data.serverName)
            acceptTerms()
            acceptSubscription()
            submit()
            cy.get(element.passwordErrorMsg).contains(data.passwordErrorMsg)
            
        })

        it('should check without Terms Checkbox only', () => {
            setName(data.expectedName)
            setEmail(generateRandomEmail(), data.serverName)
            setPassword(generateRandomPassword(9))
            acceptSubscription()
            submit()
            cy.get(element.termsErrorMsg).contains(data.termsErrorMsg)
        })


    })


})





