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

  var statusPill = ['.smaller.green', '.smaller.red', '.smaller.yellow', '.smaller.yellow', '.smaller.green', '.smaller.yellow']
  var statusText = ['Complete', 'Declined', 'Pending', 'Pending', 'Complete', 'Pending']
  var transDate = ['Today', 'Jan 19th', 'Yesterday', 'Jan 23rd', 'Jan 7th', 'Jan 9th']
  var transTime = ['1:52am', '3:22pm', '7:45am', '2:7pm', '9:51am', '7:45pm']
  var descriptionImage = ['img[src="img/company1.png"]', 'img[src="img/company2.png"]', 'img[src="img/company3.png"]', 'img[src="img/company6.png"]', 'img[src="img/company4.png"]', 'img[src="img/company7.png"]']
  var descriptionText = ['Starbucks coffee', 'Stripe Payment Processing', 'MailChimp Services', 'Shopify product', 'Ebay Marketplace', 'Templates Inc']
  //var category = ['\n                          Restaurant / Cafe\n                        ', '\n                          Finance\n                        ', '\n                          Software\n                        ', '\n                          Shopping\n                        ', '\n                          Ecommerce\n                        ', '\n                          Business\n                        ']
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

  describe('Table Sort Test', () => {
    it('If you don’t enter the username and password and click the login button, it should throw an error', () => {

      cy.get('#username').type('my_username')
      cy.get('#password').type('my_password')
      cy.get('#log-in').click()

      // var firstTransaction1 = [
      //   cy.get('#transactionsTable tr')
      //   .find('tbody>tr').first().find('td').first().find('span').last()
      // ]

      var i
      for(i = 0; i < 6; i++){
        //status icon
        cy.get('#transactionsTable tbody')
          .find('tr').first().as('firstTransaction').find('td').first().as('statusCell').get('.status-pill').get(transactionData[0][0]).should('be.visible')
      }

      var firstStatusIcon = cy.get('#transactionsTable tbody')
      .find('tr').first().as('firstTransaction').find('td').first().as('statusCell').get('.status-pill').get(transactionData[0][0]).should('be.visible')

      

      // var firstStatusCell = cy.get('#transactionsTable tbody')
      // .find('tr').first().as('firstTransaction').find('td').first()

      // if(firstStatusCellText === "Complete"){
      //   return true
      //   expect(firstStatusCellText).to.equal("we in this bitch")

      // }
      // else{
      //   expect(true).to.equal(false)
      // }

      // firstStatusCell.find('span').last().should('have.text', 'Complete')

       // cy.get('#amount').click()
      // cy.get('#amount').click()

      

      // secondStatusCell.find('span').last().should('have.text', 'Complete')

      // expect(firstStatusCell).to.equal(secondStatusCell)

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
        //cy.get('@currentCell').next().as('currentCell').find('.text-success').should('have.text', '+ 1,250.00 USD')
      }


              //first descriptionImage
      //var firstDescriptionImage = cy.get('@dateCell').next().as('descriptionCell').find('img[src="img/company1.png"]')//.should('be.visible')

      //first descriptionText
      //var firstDescriptionText = cy.get('@descriptionCell').find('span')//.should('have.text', 'Starbucks coffee')
      

      cy.get('#transactionsTable tbody').find('tr').first().as('currentTransaction')
      
      for(var i = 0; i < 5; i++){
        cy.get('@currentTransaction').find('td').first().as('currentCell')
        
        checkStatusCell(i)
        checkDateCell(i)
        checkDescriptionCell(i)
        checkCategoryCell(i)
        checkAmountCell(i)

        cy.get('@currentTransaction').next().as('currentTransaction')
          
      }
      


      //first statusIcon
      var firstStatusIcon = cy.get('#transactionsTable tbody').find('tr').first().as('firstTransaction').find('td').first().as('statusCell').find('.status-pill.smaller.green')//.should('be.visible')

      //first statusText
      var firstStatusText = cy.get('@statusCell').find('span').last()//.should('have.text', 'Complete')

      //first descriptionImage
      //var firstDescriptionImage = cy.get('@dateCell').next().as('descriptionCell').find('img[src="img/company1.png"]')//.should('be.visible')

      //first descriptionText
      //var firstDescriptionText = cy.get('@descriptionCell').find('span')//.should('have.text', 'Starbucks coffee')

      //first categoryTextAndStatus
      //var firstCategoryTextAndStatus = cy.get('@descriptionCell').next().as('categoryCell').find('.badge-success')//.should('have.text', 'Restaurant / Cafe')

      // //first Amount
      // var firstAmount = cy.get('@categoryCell').next().as('amountCell').find('.text-success')//.should('have.text', '+ 1,250.00 USD')

      // var transaction1PreSort = new transaction(cy.get('@statusCell'), cy.get('@dateCell'), cy.get('@descriptionCell'), cy.get('@categoryCell'), cy.get('@amountCell'))

      // cy.get('#amount').click()
      // cy.get('#amount').click()

      // var secondStatusIcon = cy.get('#transactionsTable tbody')
      // .find('tr').first().as('firstTransaction').find('td').first().as('statusCell').find('.status-pill.smaller.green')//.should('be.visible')

      // //first statusText
      // var secondStatusText = cy.get('@statusCell').find('span').last()//.should('have.text', 'Complete')

      // var secondStatusCell = cy.get('@statusCell')

      // //first date
      // var secondDate = cy.get('@statusCell').next().as('dateCell').find('span').first()//.should('have.text', 'Today')

      // //first time
      // var secondTime = cy.get('@dateCell').find('span').last()//.should('have.text', '1:52am')

      // //first descriptionImage
      // var secondDescriptionImage = cy.get('@dateCell').next().as('descriptionCell').find('img[src="img/company1.png"]')//.should('be.visible')

      // //first descriptionText
      // var secondDescriptionText = cy.get('@descriptionCell').find('span')//.should('have.text', 'Starbucks coffee')

      // //first categoryTextAndStatus
      // var secondCategoryTextAndStatus = cy.get('@descriptionCell').next().as('categoryCell').find('.badge-success')//.should('have.text', 'Restaurant / Cafe')

      // //first Amount
      // var secondAmount = cy.get('@categoryCell').next().as('amountCell').find('.text-success')//.should('have.text', '+ 1,250.00 USD')

      // var transaction2PreSort = new transaction(cy.get('@statusCell'), cy.get('@dateCell'), cy.get('@descriptionCell'), cy.get('@categoryCell'), cy.get('@amountCell'))

      // //expect(transaction1PreSort).to.equal(transaction2PreSort)


      // function checkTransactionsAreTheSame(firstTransaction, secondTransaction) {
        
      // }

      // function checkStatusIsTheSame(firstCell, secondCell){
      //   firstCell.find('span').last().should('have.text', 'Completed')
      //   // const firstPill = firstCell.find('.status-pill')
      //   // const secondPill = secondCell.find('.status-pill')
      //   // if(firstText === secondText
      //   //   && firstPill === secondPill) {
      //   //     return true
      //   //   }
      //   // return false
      // }

      // expect(checkStatusIsTheSame(firstStatusCell, secondStatusCell)).to.equal(true)

      // get assessment of what each cell status is
      // save it in a clean, text or int or enum like object
      // go through for all of the transactions
      // sort
      // look at 1st date, find matching values
      // check other values.
      // if ANY fail, check if any other rows share date
      // if so, check all their values. If not, then fail the test
      // repeat for all



      // MARK: COPIED CODE







      // var firstTransaction2 = [
      //   cy.get('#transactionsTable tr')
      //   .find('tbody>tr').first().find('td').first().find('span').last()
      // ]

      //expect(firstTransaction1[0]).to.equal(firstTransaction2[0])


      
      //transaction1.statusCell = whatever


      // var transaction1 = [
      //   cy.get('@transactionRow').get('td').first(),
      //   cy.get('@transactionRow').get('td').next(),
      //   cy.get('@transactionRow').get('td').next(),
      //   cy.get('@transactionRow').get('td').next(),
      //   cy.get('@transactionRow').get('td').next()
      // ]
        
      // cy.get('@transactionRow').next().as('transactionRow')

    })


  })

})
