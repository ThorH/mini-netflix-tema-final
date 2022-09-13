describe('empty spec', () => {

  beforeEach(() => {
    cy.visit('/')
  })

  it('Should login account', () => {
    const inputEmail = cy.get('[data-test-target="inputEmail"]').should('have.attr', 'placeholder', 'Email')
    const inputPassword = cy.get('[data-test-target="inputPassword"]').should('have.attr', 'placeholder', 'Password')
    const loginButton = cy.get('button')

    inputEmail.type('haubertthor@gmail.com')
    inputPassword.type('senhadothor')
    loginButton.click()

    const profileLink = cy.get('[data-test-target="profileLink"]')
    profileLink.click()

    cy.get('h2').contains('Thor Haubert')

  }),

    it('Should login and logout account', () => {
      const inputEmail = cy.get('[data-test-target="inputEmail"]').should('have.attr', 'placeholder', 'Email')
      const inputPassword = cy.get('[data-test-target="inputPassword"]').should('have.attr', 'placeholder', 'Password')
      const loginButton = cy.get('button')

      inputEmail.type('haubertthor@gmail.com')
      inputPassword.type('senhadothor')
      loginButton.click()

      const profileLink = cy.get('[data-test-target="profileLink"]')
      profileLink.click()

      cy.get('h2').contains('Thor Haubert')

      cy.get('a').click()

      cy.get('[data-test-target="logout"]').click()

      cy.get('[data-test-target="loginContainer"]')

    })
})