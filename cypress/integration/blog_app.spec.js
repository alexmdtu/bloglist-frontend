/// <reference types="Cypress" />

describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Alex',
      username: 'atu',
      password: 'secret'
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('log in to application')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('atu')
      cy.get('#password').type('secret')
      cy.get('#login-button').click()

      cy.contains('blogs')
      cy.contains('Alex logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('atu')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error').should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html')
        .should('not.contain', 'Alex logged in')
        .and('not.contain', 'blogs')
    })
  })
})