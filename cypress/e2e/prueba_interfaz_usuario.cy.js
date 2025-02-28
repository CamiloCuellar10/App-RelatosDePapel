describe('Prueba de interfaz de usuario', () => {
  it('Visita la aplicación local', () => {
    cy.visit('http://localhost:5173/home');
    
    cy.get('input[placeholder="Buscar por título de libro..."]')
      .should('be.visible');

    cy.contains('Inicio').should('be.visible');
    cy.contains('Favoritos').should('be.visible');
    cy.contains('Carrito').should('be.visible');
  });
});
