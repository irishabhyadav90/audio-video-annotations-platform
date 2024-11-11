describe('End-to-End Flow: Upload, Play, and Annotate', () => {
  
    it('uploads a video file, plays it, and allows annotation', () => {
      // Step 1: Visit the homepage
      cy.visit('/');
  
      // Step 2: Upload a video file
      const fileName = 'sample-1.mp4';
      cy.get('input[type="file"]').attachFile(fileName);
      cy.get('button').contains('Upload File').click();
  
      // Step 3: Verify the video file was uploaded and loaded correctly
      cy.get('video').should('have.attr', 'src').and('include', fileName);
    
      // Step 5: Wait for annotations input to be available
      cy.get('input[placeholder="Add annotation"]').should('exist');
  
      // Step 6: Add an annotation
      cy.get('input[placeholder="Add annotation"]').type('Test annotation');
      cy.get('button').contains('Add').click();
  
      // Step 7: Verify the annotation appears in the annotations list
      cy.contains('[0.00s]: Test annotation').should('be.visible');
  
      // Step 8: Delete the annotation to complete the flow
      cy.contains('[0.00s]: Test annotation')
        .parent()
        .parent()
        .find('button')
        .should('contain.text', 'Delete')
        .and('be.visible') // Check that it's visible
        .click();
  
      // Step 9: Verify annotation was deleted
      cy.contains('[0.00s]: Test annotation').should('not.exist');
    });
  });

  