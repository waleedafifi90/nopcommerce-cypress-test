/// <reference types="cypress" />

const parentCategory = 'Computers';
const categoryName = 'Headphone';
const manufactureName = 'Apple';
const tagName = 'testtag';

describe('Login Scenario', () => {
  before(() => {
    cy.visit('/');
  });

  it('Verify Click on login button', () => {
    cy.get('.button-1').should('be.visible').click();
  });

  it('Logged in successfully', () => {
    cy.get('.main-header').contains('Logout')
  })
});

describe('Category Scenario', () => {
  beforeEach(() => {
    // Preserve cookie in every test
    Cypress.Cookies.defaults({
      preserve: (cookie) => {
        return true;
      }
    })
  });

  context('Add new category', () => {
    it('Can reach category from Catalog', () => {
      cy.get('.nav-pills > :nth-child(2) > :nth-child(1)').click();
      cy.get('[style="display: block;"] > :nth-child(2) > .nav-link').click();
      cy.url().should('include', 'Category/List');
    });

    it('Verify Clicking on Add New button', () => {
      cy.get('.content-wrapper .content-header .float-right > a').click();
      cy.url().should('include', 'Category/Create');
    });

    it('Verify filling category name field', () => {
      cy.get('#Name')
        .type(categoryName)
        .should('have.value', categoryName)
        .focused();
    });

    it('Verify filling description', () => {
      cy.get('iframe[id="Description_ifr"]')
        .its('0.contentDocument.body')
        .type('Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content')
        .should('not.be.empty')
    });

    it('Verify select parent category from dropdown', () => {
      cy.get('#ParentCategoryId')
        .select(parentCategory);
    });

    it('Verify the default values on page load', () => {
      cy.get('#Published').should('be.checked');
      cy.get('#IncludeInTopMenu').should('be.checked');
      cy.get('#AllowCustomersToSelectPageSize').should('be.checked');
      cy.get('#PageSizeOptions').should('have.value', '6, 3, 9');
      cy.get('#DisplayOrder').should('have.value', '0')
    });

    it('Verify clicking on Save button', () => {
      cy.get('button[name="save"]').click();
      cy.url().should('include', 'Category/List');
    });

    it('Verify Category successfully added', () => {
      cy.get('div.alert-success').should('be.visible').and('contain', 'The new category has been added successfully.')
    })

    it('Verify closing success alert', () => {
      cy.get('div.alert-success > .close').click();
      cy.get('div.alert-success').should('not.exist')
    });

    it('Verify added category inside the list', () => {
      cy.get('#SearchCategoryName').type(categoryName).should('have.value', categoryName).focused();
      cy.get('#search-categories').click();
      cy.get('table[id="categories-grid"] tbody').find('tr');
    });
  });
});

describe('Manufactures Scenario', () => {
  context('Add new Manufactures', () => {
    it('Can reach manufactures from Catalog', () => {
      // cy.get('.nav-pills > :nth-child(2) > :nth-child(1)').should('be.visible').click();
      cy.get('.menu-open > :nth-child(2) > :nth-child(3) > .nav-link ').click();
      cy.url().should('include', 'Manufacturer/List');
    });

    it('Verify redirect to Add new Manufacture page', () => {
      cy.get('div.float-right > a.btn').click();
      cy.url().should('include', 'Manufacturer/Create');
    });

    it('Verify filling the Name field', () => {
      cy.get('#Name').should('be.visible').type('Apple').focused().and('have.value', 'Apple');
    });

    it('Verify fill Description textarea', () => {
      cy.get('iframe[id="Description_ifr"]')
        .its('0.contentDocument.body')
        .type('Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content')
        .should('not.be.empty')
    });

    it('Verify open the Manufacture Display tab', () => {

      cy.get('#manufacturer-display > .card-header').should('be.visible').click();
    });

    it('Verify changing the order field value using increase button', () => {
      cy.get(':nth-child(6) > .col-md-9 > .k-widget > .k-numeric-wrap > .k-select > .k-link-increase').click();
      cy.get('input[name="DisplayOrder"]').should(`have.attr`, `aria-valuenow`, 1);
    });

    it('Verify clicking on save button and save the data', () => {
      cy.get('button[name="save"]').click();
      cy.url().should('include', 'Manufacturer/List');
    });

    it('Verify Manufacture successfully added', () => {
      cy.get('div.alert-success').should('be.visible').and('contain', 'The new manufacturer has been added successfully.')
    });

    it('Verify closing success alert', () => {
      cy.get('div.alert-success > .close').should('be.visible').click();
      cy.get('div.alert-success').should('not.exist')
    });

    it('Verify added Manufacture inside the list', () => {
      cy.get('#SearchManufacturerName').type(manufactureName).should('have.value', manufactureName).focused();
      cy.get('#search-manufacturers').click();
      cy.get('table[id="manufacturers-grid"] tbody').find('tr');
    });

  })
});

describe('Product Scenario', () => {
  context('Add new Product', () => {
    it('Can reach Products from Catalog', () => {
      cy.get('.menu-open > :nth-child(2) > :nth-child(1) > .nav-link').click();
      cy.url().should('include', 'Product/List');
    });

    it('Verify redirect to Add new product page', () => {
      cy.get('div.float-right > a.btn').trigger('mouseover').should('have.css', 'background-color', 'rgb(60, 141, 188)').click();
      cy.url().should('include', 'Product/Create');
    });

    it('Verify open Product Info tab', () => {
      cy.get('div[data-card-name="product-info"] div.card-body').then(ele => {
        if (!ele.is(':visible')) {
          cy.get('#product-info').click();
          cy.get('div[data-card-name="product-info"] div.card-body').should('be.visible');
        }
      });
    });

    it('Verify filling Product name', () => {
      cy.get('#Name').type('ASTRO Gaming A40 TR X-Edition Headset For PC').should('have.value', 'ASTRO Gaming A40 TR X-Edition Headset For PC').focused();
    });

    it('Verify filling Product short description', () => {
      cy.get('#ShortDescription')
        .type('Tuned with ASTRO Audio V2 - Tuned for Gaming, ASTRO Audio V2 delivers pro quality audio for gamers when they need it most, whether live streaming to competitive play in the pits of a pro tournament.')
        .should('have.value', 'Tuned with ASTRO Audio V2 - Tuned for Gaming, ASTRO Audio V2 delivers pro quality audio for gamers when they need it most, whether live streaming to competitive play in the pits of a pro tournament.')
        .focused();
    });

    it('Verify filling the full description field', () => {
      cy.get('iframe[id="FullDescription_ifr"]')
        .its('0.contentDocument.body')
        .type('Tuned with ASTRO Audio V2 - Tuned for Gaming, ASTRO Audio V2 delivers pro quality audio for gamers when they need it most, whether live streaming to competitive play in the pits of a pro tournament.\
        Superior fit and finish - The A40 TR features lightweight yet rugged construction with premium materials for a pressure-free fit that won’t overheat your head. The ear cushions feature cloth for maximum comfort, backed with synthetic leather for the best acoustic performance.\
        Swappable boom microphone - Highly sensitive uni-directional mic that focuses on your voice and minimizes background noise. It can be positioned on either side of the A40 TR headset.\
        Customizable Speaker Tags - Our patented magnetic Speaker Tag system lets you personalize your headset - purchase special editions or design your own using our online Speaker Tag Customizer.\
        Mod Kit Ready - Features synthetic leather noise-cancelling ear cushions, voice-isolating mic, padded headband and closed-back Speaker Tags. (Sold Separately)\
        All current ASTRO Gaming products designed for Xbox One will offer continuous compatibility on Xbox: Series X')
        .should('not.be.empty')
    });

    it('Verify filling the SKU field', () => {
      let val1 = Math.floor(1000000000000 + Math.random() * 9999999999999);
      cy.get('#Sku').type(val1).should('have.value', val1).focused();
    });

    it('Verify selecting product category from the list', () => {
      cy.get('select[name="SelectedCategoryIds"]').parents('.k-multiselect').click('right');
      cy.get('ul[id="SelectedCategoryIds_listbox"] li').each(($el, index, $list) => {
        const category = $el.text();
        if (category === (parentCategory + ' >> ' + categoryName)) {
          $el.trigger("click");
        }
      });
      cy.get('ul[id="SelectedCategoryIds_taglist"]').should('not.be.empty');
    });

    context('Advanced option', () => {
      it('Verify selection product manufature from the list', () => {
        cy.get('input[id="advanced-settings-mode"]').then(ele => {
          if (!ele.is(':checked')) {
            cy.get('input[id="advanced-settings-mode"]').next('label').click();
          }
        });
        cy.get('select[name="SelectedManufacturerIds"]').parents('.k-multiselect').click('right');
        cy.get('ul[id="SelectedManufacturerIds_listbox"] li').each(($el, index, $list) => {
          const manufacture = $el.text();
          if (manufacture === manufactureName) {
            $el.trigger("click");
          }
        });
        cy.get('ul[id="SelectedManufacturerIds_taglist"]').should('not.be.empty');
      });

      it('Verify adding a new tag', () => {
        cy.get('.tag-editor').type(tagName + ',');
        // .should('contain', 'testTag');
      });

      it('Verify check show on home page checkbox', () => {
        cy.get('#ShowOnHomepage').should('be.visible').check().should('be.checked');
      });
    });

    context('Product price', () => {
      it('Verify update price field using increase button', () => {
        cy.get('#product-price-area > .col-md-9 > .k-widget > .k-numeric-wrap > .k-select > .k-link-increase').should('be.visible').click()
      });

      it('Verify update the price using the field', () => {
        cy.get('input[id="Price"]').clear().type(159).should('have.value', '159');
      });
    });

    context('Product inventory option', () => {
      it('Check if the shipping body is visible', () => {
        cy.get('div[id="product-inventory"] .card-body').should('be.visible');
      });

      it('Select inventory method from a dropdown list', () => {
        cy.get('#ManageInventoryMethodId').select('Track inventory').should('have.value', 1);
      });

      it('Update Stock quantity field', () => {
        cy.get('input[id="StockQuantity"]').prev().focus();
        cy.get('input[id="StockQuantity"]').clear().type(100).should('have.value', 100);
      });

      it('Verify clicking on save button', () => {
        cy.get('[name="save"]').click();
        cy.url().should('include', 'Product/List');
        cy.get('.alert-success').should('be.visible').and('contain', 'The new product has been added successfully.');
      });
    })
  })
});

describe('Product tag scenario', () => {
  it('Verify navigate to product tag page', () => {
    cy.get('.menu-open > :nth-child(2) > :nth-child(5) > .nav-link').should('be.visible').click();
    cy.url().should('include', 'ProductTags');
  });

  it('Verify select the added tag', () => {
    // cy.get('select[name="product-tags-grid_length"]').should('be.visible').select('50');
    cy.get('#SearchTagName').type(tagName).should('have.value', tagName);
    cy.get('#search-product-tags').click();
    cy.get('table[id="product-tags-grid"] td:nth-child(2)').contains(tagName).parent().find('[name="checkbox_producttags"]').check();
  });

  it('Verify deleting the new added tag', () => {
    cy.get('#delete-selected').should('be.visible').should('not.be.disabled').click();
    cy.get('div[id="delete-selected-action-confirmation"]').should('be.visible');
    cy.get('#delete-selected-action-confirmation-submit-button').should('be.visible').click();
  });

  after(() => {
    cy.visit('/');
  })
});