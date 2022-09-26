describe('Movies E2E tests', () => {
    beforeEach(() => {
        cy.visit('/')

        const inputEmail = cy.get('[data-test-target="inputEmail"]').should('have.attr', 'placeholder', 'Email')
        const inputPassword = cy.get('[data-test-target="inputPassword"]').should('have.attr', 'placeholder', 'Password')
        const loginButton = cy.get('button')

        inputEmail.type('haubertthor@gmail.com')
        inputPassword.type('senhadothor')
        loginButton.click()
    })

    it('Should movie go to last watched when play', () => {

        cy.get('[data-test-target="metricContainer"]:contains(Last watched movies)')
            .children('div')
            .children('div')
            .first()
            .should('not.contain', 'Senhor dos anéis: As duas torres')

        cy.get('[data-test-target="movieContainer"]:contains(Senhor dos anéis: As duas torres)')
            .first()
            .click()

        cy.get('iframe').should('be.visible')
        cy.get('a').click()

        cy.get('[data-test-target="metricContainer"]:contains(Last watched movies)')
            .children('div')
            .children('div')
            .first()
            .should('contain', 'Senhor dos anéis: As duas torres')

    })
})