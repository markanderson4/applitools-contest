/// <reference types="Cypress" />

context('Assertions', () => {
  beforeEach(() => {
    cy.visit('https://demo.applitools.com/hackathon.html')
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
    it('If you don’t enter the username and password and click the login button, it should throw an error', () => {

      cy.login('my_username', 'my_password')

      var expectedOrderPreSort = [0,1,2,3,4,5]

      checkEntireTableIsAccurate(expectedOrderPreSort)

      var expectedOrderAfterSort = [2, 4, 3, 5, 1, 0]

      cy.get('#amount').click()

      checkEntireTableIsAccurate(expectedOrderAfterSort)  

    })


  })

})

      var statusPill = ['.smaller.green', '.smaller.red', '.smaller.yellow', '.smaller.yellow', '.smaller.green', '.smaller.yellow']
      var statusText = ['Complete', 'Declined', 'Pending', 'Pending', 'Complete', 'Pending']
      var transDate = ['Today', 'Jan 19th', 'Yesterday', 'Jan 23rd', 'Jan 7th', 'Jan 9th']
      var transTime = ['1:52am', '3:22pm', '7:45am', '2:7pm', '9:51am', '7:45pm']
      var descriptionImage = ['img[src="img/company1.png"]', 'img[src="img/company2.png"]', 'img[src="img/company3.png"]', 'img[src="img/company6.png"]', 'img[src="img/company4.png"]', 'img[src="img/company7.png"]']
      var descriptionText = ['Starbucks coffee', 'Stripe Payment Processing', 'MailChimp Services', 'Shopify product', 'Ebay Marketplace', ' Templates Inc']
      var categoryBadge = ['.badge-success', '.badge-danger', '.badge-warning', '.badge-primary', '.badge-danger', '.badge-primary']
      var categoryText = ['Restaurant / Cafe', 'Finance', 'Software', 'Shopping', 'Ecommerce', 'Business']
      var amountType = ['.text-success', '.text-success', '.text-danger', '.text-success', '.text-danger', '.text-success']
      var amountText = ['+ 1,250.00 USD', '+ 952.23 USD', '- 320.00 USD', '+ 17.99 USD', '- 244.00 USD', '+ 340.00 USD']
    
    
      var transactionData = [
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

      function checkEntireTableIsAccurate(expectedOrder){
        cy.get('#transactionsTable tbody').find('tr').first().as('currentTransaction')
      
        for(var i = 0; i < expectedOrder.length; i++){
          cy.get('@currentTransaction').find('td').first().as('currentCell')
         
          checkTransactionIsAccurate(expectedOrder[i])
          
          if(i < 5){
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