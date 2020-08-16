/// <reference types="Cypress" />

describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const userAlex = {
      name: 'Alex',
      username: 'atu',
      password: 'secret'
    }
    const userJan = {
      name: 'Jan',
      username: 'jan',
      password: 'pass'
    }
    cy.request('POST', 'http://localhost:3001/api/users', userAlex)
    cy.request('POST', 'http://localhost:3001/api/users', userJan)
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
        cy.createBlog({ title: 'first blog', author: 'Alex', url: 'www.first.com', likes: 3 })
        cy.createBlog({ title: 'second blog', author: 'Martin', url: 'www.second.com', likes: 0 })
        cy.createBlog({ title: 'third blog', author: 'Jan', url: 'www.third.com', likes: 1 })
      })

      it('one of those can be liked', function () {
        cy.contains('second blog').contains('show').click()
        cy.get('.extraBlogContent:visible').contains('like').click()
        cy.contains('Likes: 1')
      })

      it('one of those can be deleted if correct user logged in', function () {
        cy.contains('second blog').contains('show').click()
        cy.get('.extraBlogContent:visible').contains('remove').click()
        cy.get('html')
          .should('not.contain', 'second blog')
      })

      it('one of those cannot be deleted with incorrect user', function () {
        cy.contains('logout').click()
        cy.login({ username: 'jan', password: 'pass' })
        cy.contains('second blog').contains('show').click()
        cy.get('.extraBlogContent:visible').should('not.contain', 'remove:visible')
      })

      it.only('blogs have correct order', function () {
        cy.get('.blog')
          .first().contains('second blog')
        cy.get('.blog')
          .eq(1)
          .contains('third blog')
        cy.get('.blog')
          .last()
          .contains('first blog')
      })
    })
  })
})