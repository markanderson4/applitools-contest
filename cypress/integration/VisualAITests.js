context('Assertions', () => {
    beforeEach(() => {
      cy.visit('https://demo.applitools.com/hackathonV2.html?showAd=true')
    })
  
    describe('Login Page UI Elements Test', () => {
      it('assert all elements on Login page', () => {
        
        cy.eyesOpen({
            appName: 'Mark Andersons hackathon app',
            testName: 'Test 1: Login Page UI Elements Test',
            browser: { width: 800, height: 600 },
        });
      
        cy.eyesCheckWindow('Login Page');
    
        cy.eyesClose();
  
      })
    })
  
    describe('Data-Driven Test', () => {
      it('If you don’t enter the username and password and click the login button, it should throw an error', () => {
        cy.eyesOpen({
            appName: 'Mark Andersons hackathon app',
            testName: 'Test 2a: Entering neither username nor password',
            browser: { width: 800, height: 600 },
        });
      
        cy.login('', '')
       
        cy.eyesCheckWindow('Login Page');
    
        cy.eyesClose();
  
      })
  
      it('If you only enter the username and click the login button, it should throw an error', () => {
  
        cy.eyesOpen({
            appName: 'Mark Andersons hackathon app',
            testName: 'Test 2b: Entering username, but no password',
            browser: { width: 800, height: 600 },
        });
      
        cy.login('my_username', '')
       
        cy.eyesCheckWindow('Login Page');
    
        cy.eyesClose();
  
      })
  
      it('If you only enter the password and click the login button, it should throw an error', () => {

        cy.eyesOpen({
            appName: 'Mark Andersons hackathon app',
            testName: 'Test 2c: Entering password, but no username',
            browser: { width: 800, height: 600 },
        });
      
        cy.login('', 'my_password')
       
        cy.eyesCheckWindow('Login Page');
    
        cy.eyesClose();
  
      })
  
      it('If you enter both username (any value) and password (any value), it should log you in', () => {

        cy.eyesOpen({
            appName: 'Mark Andersons hackathon app',
            testName: 'Test 2d: Entering both username and password',
            browser: { width: 800, height: 600 },
        });
      
        cy.login('my_username', 'my_password')
       
        cy.eyesCheckWindow('Main Page');
    
        cy.eyesClose();
  
      })
  
    })
  
  
    describe('Table Sort Test', () => {
      it('If you don’t enter the username and password and click the login button, it should throw an error', () => {
  
        cy.eyesOpen({
            appName: 'Mark Andersons hackathon app',
            testName: 'Test 3: Table sort',
            browser: { width: 800, height: 600 },
        });

        cy.login('my_username', 'my_password')

        cy.get('#amount').click()

        cy.eyesCheckWindow('Main Page');
        
      })
    })
  
    describe('Canvas Chart Test', () => {
      it('Test the chart data is accurate', () => {

        cy.eyesOpen({
            appName: 'Mark Andersons hackathon app',
            testName: 'Test 4: Canvas Chart',
            browser: { width: 800, height: 600 },
        });
  
        cy.login('my_username', 'my_password')
        cy.get('#showExpensesChart').click()
        cy.wait(5000) // wait because chart animates, and screenshot must be of chart once animations are complete

        cy.eyesCheckWindow('Expenses Page');

        cy.get('#addDataset').click()
        cy.wait(5000) // wait because chart animates, and screenshot must be of chart once animations are complete

        cy.eyesCheckWindow('Expenses Page');
        
        cy.eyesClose();

      })
    })
      
    describe('Dynamic Content Test', () => {
      it('Once logged in, click on the "Compare Expenses" button on the toolbar. This will display a bar chart comparing the expenses for the year 2017 and 2018. Assume the values of the chart are coming from a test data and the test data will not change across versions. Validate that the bar chart and representing that data (number of bars and their heights). They should remain the same across versions. Then click on the "Show data for next year" button. This should add the data for the year 2019. Verify that this data set is added for the year 2019.', () => {
        
        cy.eyesOpen({
            appName: 'Mark Andersons hackathon app',
            testName: 'Test 5: Dynamic Content',
            browser: { width: 800, height: 600 },
        });

        cy.login('my_username', 'my_password')
  
        cy.eyesCheckWindow('Main Page');

        cy.eyesClose();
  
      })
    })
  })
  