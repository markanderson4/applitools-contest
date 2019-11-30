/// <reference types="Cypress" />

context('Assertions', () => {
  beforeEach(() => {
    cy.visit('https://demo.applitools.com/hackathonV2.html?showAd=true')
  })

  describe('Login Page UI Elements Test', () => {
    it('assert all elements on Login page', () => {
      
      cy.get('.logo-w > a > img').should('be.visible') // blue/grey logo on image header
      cy.get('.auth-header').should('be.visible').should('have.text', '\n        Login Form\n      ') // header text for the page
      cy.get(':nth-child(1) > label').should('be.visible').should('have.text', 'Username') // Header for username input text field
      cy.get('.os-icon-user-male-circle').should('be.visible') // icon beside username input text field
      cy.get('#username').should('have.attr', 'placeholder', 'Enter your username') // placeholder text for username input text field
      cy.get('form > :nth-child(2) > label').should('be.visible').should('have.text', 'Password') // Header for password input text field
      cy.get('.os-icon-fingerprint').should('be.visible') // icon beside password input text field
      cy.get('#password').should('have.attr', 'placeholder', 'Enter your password')  // placeholder text for password input text field
      cy.get('#log-in').should('contain', 'Log In') // asserting login button text
      cy.get('.form-check-input').should('be.visible') // check box for "Remember Me"
      cy.get('.form-check-label').should('have.text', 'Remember Me') // text describing the checkbox above
      cy.get('img[src="img/social-icons/twitter.png"]').should('be.visible') // twitter social media link
      cy.get('img[src="img/social-icons/facebook.png"]').should('be.visible') // facebook social media link
      cy.get('img[src="img/social-icons/linkedin.png"]').should('be.visible') // linkedin social media link

    })
  })

  describe('Data-Driven Test', () => {
    it('If you don’t enter the username and password and click the login button, it should throw an error', () => {
      cy.login('', '')
      cy.get('.alert-warning').should('have.text', 'Both Username and Password must be present ')

    })

    it('If you only enter the username and click the login button, it should throw an error', () => {

      cy.login('my_username', '')
      cy.get('.alert-warning').should('have.text', 'Password must be present')

    })

    it('If you only enter the password and click the login button, it should throw an error', () => {

      cy.login('', 'my_password')
      cy.get('.alert-warning').should('have.text', 'Username must be present')

    })

    it('If you enter both username (any value) and password (any value), it should log you in', () => {

      cy.login('my_username', 'my_password')
      cy.get('.top-bar').should('be.visible')

    })

  })


  describe('Table Sort Test', () => {
    it('Assert that after sorting the table by amount, that sort is accurate and data stays the same in each cell', () => {

      cy.login('my_username', 'my_password')

      // I'm new to Cypress/JS, and I had difficulty saving some of the more complex aspects that I wanted to test for,
      // such as extracting the classname for a status pull (to be green vs yellow vs red). As a result, I hardoded the table
      // as consts at the bottom of this file. This test still completely tests the functionality that the sort button
      // properly sorts the entire list of transactions, and that the data within each transaction is unchanged. However,
      // the shortcoming of my implementation is that it relies on mock data, and would fail in a live/production environment
      var expectedOrderPreSort = [0, 1, 2, 3, 4, 5]
      var expectedOrderAfterSort = [2, 4, 3, 5, 1, 0]
      
      checkEntireTableIsAccurate(expectedOrderPreSort)
      cy.get('#amount').click()
      checkEntireTableIsAccurate(expectedOrderAfterSort)  
      
    })
  })

  describe('Canvas Chart Test', () => {
    it('Test the chart data is accurate', () => {

      cy.login('my_username', 'my_password')
      cy.get('#showExpensesChart').click()

      // Because the chart is in a canvas, I have no way to extract data from the chart. I cannot assert anything for this test
      // using the traditional method, would need be tested manually or automated using a tool like Applitools

    })
  })
    
  describe('Dynamic Content Test', () => {
    it('Test that existence of dynamic Flash Sale gifs', () => {
      
      cy.login('my_username', 'my_password')

      if(cy.get('.element-balances').find('#flashSale')){
        cy.get('#flashSale > img').should('be.visible')
      }
      if(cy.get('.element-balances').find('#flashSale2')){
        cy.get('#flashSale2 > img').should('be.visible')
      }

    })
  })
})

// Test data for tables test

const statusPill = ['.smaller.green', '.smaller.red', '.smaller.yellow', '.smaller.yellow', '.smaller.green', '.smaller.yellow']
const statusText = ['Complete', 'Declined', 'Pending', 'Pending', 'Complete', 'Pending']
const transDate = ['Today', 'Jan 19th', 'Yesterday', 'Jan 23rd', 'Jan 7th', 'Jan 9th']
const transTime = ['1:52am', '3:22pm', '7:45am', '2:7pm', '9:51am', '7:45pm']
const descriptionImage = ['img[src="img/company1.png"]', 'img[src="img/company2.png"]', 'img[src="img/company3.png"]', 'img[src="img/company6.png"]', 'img[src="img/company4.png"]', 'img[src="img/company7.png"]']
const descriptionText = ['Starbucks coffee', 'Stripe Payment Processing', 'MailChimp Services', 'Shopify product', 'Ebay Marketplace', ' Templates Inc']
const categoryBadge = ['.badge-success', '.badge-danger', '.badge-warning', '.badge-primary', '.badge-danger', '.badge-primary']
const categoryText = ['Restaurant / Cafe', 'Finance', 'Software', 'Shopping', 'Ecommerce', 'Business']
const amountType = ['.text-success', '.text-success', '.text-danger', '.text-success', '.text-danger', '.text-success']
const amountText = ['+ 1,250.00 USD', '+ 952.23 USD', '- 320.00 USD', '+ 17.99 USD', '- 244.00 USD', '+ 340.00 USD']
    
const transactionData = [
  statusPill,
  statusText,
  transDate,
  transTime,
  descriptionImage,
  descriptionText,
  categoryBadge,
  categoryText,
  amountType,
  amountText
]

// Helper functions

function checkEntireTableIsAccurate(expectedOrder){
  cy.get('#transactionsTable tbody').find('tr').first().as('currentTransaction')

  for(var i = 0; i < expectedOrder.length; i++){
    cy.get('@currentTransaction').find('td').first().as('currentCell')
    checkTransactionIsAccurate(expectedOrder[i])
    // avoid getting "next" transaction when you're on the last transaction
    if(i < expectedOrder.length - 1){
      cy.get('@currentTransaction').next().as('currentTransaction')
    }
  }

}

function checkTransactionIsAccurate(transaction){
  checkStatusCell(transaction)
  checkDateCell(transaction)
  checkDescriptionCell(transaction)
  checkCategoryCell(transaction)
  checkAmountCell(transaction)
}

function checkStatusCell(row) {
  //status icon
  cy.get('@currentCell').find(transactionData[0][row]).should('be.visible')
  //status text
  cy.get('@currentCell').find('span').last().should('have.text', transactionData[1][row])
}

function checkDateCell(row) {
  //date
  cy.get('@currentCell').next().as('currentCell').find('span').first().should('have.text', transactionData[2][row])
  //time
  cy.get('@currentCell').find('span').last().should('have.text', transactionData[3][row])
}

function checkDescriptionCell(row) {
  //description image
  cy.get('@currentCell').next().as('currentCell').find(transactionData[4][row]).should('be.visible')
  //description text
  cy.get('@currentCell').find('span').should('have.text', transactionData[5][row])
}

function checkCategoryCell(row) {
  //category badge and text
  cy.get('@currentCell').next().as('currentCell').find(transactionData[6][row]).should('have.text', transactionData[7][row])
}

function checkAmountCell(row){
  //amount type and text
  cy.get('@currentCell').next().as('currentCell').find(transactionData[8][row]).should('have.text', transactionData[9][row])
}
    