/*
 ***********************************************************************************************************************
 *                                                      Card Parent Class
 ***********************************************************************************************************************
 * 
 * This is the parent class that will serve as the basis for
 * the card system. When there is a card to be made, this
 * class will be used as a skeleton to build the cards with
 * 
 * properties:
 *          attributes (JSON): stores all relevant information that all cards share
 *          cost (double/float): holds the energy cost to use the card
 *          description (string): a description of the cards abilities (potential lore location)
 *          abilities (array): stores all potential abilities that the card has
 */

let attributes = {
  cost: 0,
  type: '',
  // Might not need this one
  // description: '',
  abilities: []
};

function Card(cost, type, /*description,*/ abilities) {
  this.attributes.cost = cost;
  this.attributes.type = type;
  //this.attributes.description = description;
  this.attributes.abilities = abilities;
}


//setters
Card.prototype.setCost = (cost) => {
  this.attributes.cost = cost;
};

Card.prototype.setType = (type) => {
  this.attributes.type = type;
};

//getters
Card.prototype.getAttributes = () => {
  return attributes;
};
/*
function setDescription(description) {
  this.attributes.description = description;
}

function setAbilities(abilities) {
  if (this.attributes.abilities.length > 0) {
    for (let i = 0; i < abilities.length; i++) {
      this.attributes.abilities.push(abilities[i]);
    }
  } else {
    this.attributes.abilities = abilities;
  }
}

//getters
function getCost() {
  return this.attributes.cost;
}

function getType() {
  return this.attributes.type;
}

function getDescription() {
  return this.attributes.description;
}

function getAbilities() {
  return this.attributes.abilities;
}
*/
