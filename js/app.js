//Global variable declarations
var pantry = { //object containing drink options
    strong: ["glug of rum", "slug of whiskey", "splash of gin"],
    salty: ["olive of a stick", "splash of tonic", "twist of lemon peel"],
    bitter: ["shake of bitters", "splash of tonic", "twist of lemon peel"],
    sweet: ["sugar cube", "spoonful of honey", "splash of cola"],
    fruity: ["slice of orange", "dash of cassis", "cherry on top"]
};
var Order = function (orderValues) {
    //getting user choices  from the DOM
    this.strong = orderValues[0];
    this.salty = orderValues[1];
    this.bitter = orderValues[2];
    this.sweet = orderValues[3];
    this.fruity = orderValues[4];
};
//populating the drink
var Drink = function (pantry, drinkOrder) {
    var ingredientNumber,
        ingredientsArray = [];

    for (var userPreference in drinkOrder) {
        ingredientNumber = generateRandomNumber(0, 2);
        if (drinkOrder[userPreference]) {
            ingredientsArray.push(pantry[userPreference][ingredientNumber]);
        }
    }
    return ingredientsArray;
};

var
    $(document).ready(function () {
        //    console.log('Hello World!');


    });
