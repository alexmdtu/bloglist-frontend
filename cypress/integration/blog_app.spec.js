/// <reference types="Cypress" />

const { default: BlogForm } = require("../../src/components/BlogForm")

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

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'atu', password: 'secret' })
    })

    it('A blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('New Title')
      cy.get('#author').type('Alex')
      cy.get('#url').type('www.test.com')
      cy.get('#add-blog-button').click()
      cy.contains('New Title by Alex')
    })

    describe.only('and several blogs exist', function () {
      beforeEach(function () {
        cy.login({ username: 'atu', password: 'secret' })
        cy.createBlog({ title: 'first blog', author: 'Alex', url: 'www.first.com' })
        cy.createBlog({ title: 'second blog', author: 'Martin', url: 'www.second.com' })
        cy.createBlog({ title: 'third blog', author: 'Jan', url: 'www.third.com' })
      })

      it('one of those can be liked', function () {
        cy.get('#toggleVisibility-button').click()
        cy.get('#addLike-button').click()
        cy.contains('Likes: 1')
      })
    })
  })
})