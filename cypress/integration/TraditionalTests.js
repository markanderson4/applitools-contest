/// <reference types="Cypress" />

context('Assertions', () => {
  beforeEach(() => {
    cy.visit('https://demo.applitools.com/hackathon.html?showAd=true')
  })

  describe('Login Page UI Elements Test', () => {
    it('.should() - make an assertion about the current subject', () => {
      // https://on.cypress.io/should
      cy.get('.logo-w > a > img').should('be.visible')
      cy.get('.auth-header').should('be.visible').should('have.text', '\n        Login Form\n      ')
      cy.get(':nth-child(1) > label').should('be.visible').should('have.text', 'Username')
      cy.get('.os-icon-user-male-circle').should('be.visible')
      cy.get('#username').should('have.attr', 'placeholder', 'Enter your username')
      cy.get('form > :nth-child(2) > label').should('be.visible').should('have.text', 'Password')
      cy.get('.os-icon-fingerprint').should('be.visible')
      // cy.get('div[class="pre-icon os-icon os-icon-fingerprint"]').should('be.visible')
      cy.get('#password').should('have.attr', 'placeholder', 'Enter your password')
      cy.get('#log-in').should('contain', 'Log In')
      cy.get('.form-check-input').should('be.visible')
      cy.get('.form-check-label').should('have.text', 'Remember Me')
      cy.get('img[src="img/social-icons/twitter.png"]').should('be.visible')
      cy.get('img[src="img/social-icons/facebook.png"]').should('be.visible')
      cy.get('img[src="img/social-icons/linkedin.png"]').should('be.visible')


    })
  })

  describe('Data-Driven Test', () => {
    it('If you don’t enter the username and password and click the login button, it should throw an error', () => {

      cy.get('#log-in').click()
      cy.get('.alert-warning').should('have.text', 'Both Username and Password must be present ')

    })

    it('If you only enter the username and click the login button, it should throw an error', () => {

      cy.get('#username').type('my_username')
      cy.get('#log-in').click()
      cy.get('.alert-warning').should('have.text', 'Password must be present')

    })

    it('If you only enter the password and click the login button, it should throw an error', () => {

      cy.get('#password').type('my_password')
      cy.get('#log-in').click()
      cy.get('.alert-warning').should('have.text', 'Username must be present')

    })

    it('If you enter both username (any value) and password (any value), it should log you in', () => {

      cy.get('#username').type('my_username')
      cy.get('#password').type('my_password')
      cy.get('#log-in').click()
      cy.get('.top-bar').should('be.visible')

    })

  })

  class transaction {
    constructor(statusCell, dateCell, descriptionCell, categoryCell, amountCell) {
      this.statusCell = statusCell;
      this.dateCell = dateCell;
      this.descriptionCell = descriptionCell;
      this.categoryCell = categoryCell;
      this.amountCell = amountCell;
      return this;
    }
  }

  describe('Dynamic Content Test', () => {
    it('Once logged in, click on the "Compare Expenses" button on the toolbar. This will display a bar chart comparing the expenses for the year 2017 and 2018. Assume the values of the chart are coming from a test data and the test data will not change across versions. Validate that the bar chart and representing that data (number of bars and their heights). They should remain the same across versions. Then click on the "Show data for next year" button. This should add the data for the year 2019. Verify that this data set is added for the year 2019.', () => {
      
      cy.get('#username').type('my_username')
      cy.get('#password').type('my_password')
      cy.get('#log-in').click()


      if(cy.get('.element-balances').find('#flashSale')){
        cy.get('#flashSale > img').should('be.visible')
      }
      if(cy.get('.element-balances').find('#flashSale2')){
        cy.get('#flashSale2 > img').should('be.visible')
      }

    })
  })

})
