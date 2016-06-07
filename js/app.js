//Global variable declarations
var pantry = { //object containing drink options
    strong: ["glug of rum", "slug of whiskey", "splash of gin"],
    salty: ["olive of a stick", "splash of tonic", "twist of lemon peel"],
    bitter: ["shake of bitters", "splash of tonic", "twist of lemon peel"],
    sweet: ["sugar cube", "spoonful of honey", "splash of cola"],
    fruity: ["slice of orange", "dash of cassis", "cherry on top"]
};
var Order = function (orderValues) { //constructor function
    //getting user choices  from the DOM
    this.strong = orderValues[0];
    this.salty = orderValues[1];
    this.bitter = orderValues[2];
    this.sweet = orderValues[3];
    this.fruity = orderValues[4];
};
//populating the drink
var Drink = function (pantry, drinkOrder) { //constructor function
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
        $('output').hide();

        $('form').on('submit', function (event) {
            event.preventDefault();
            // setting the empty values array
            orerValues = []; //user choice from DOM will be push to this array

            //making sure each of the ingredient have been chosen
            $('select').each(function () {
                orderValues.push($(this).val() === 'yes' ? true : false);
            });

            // using our two constructors to create 2 new objects
            drinkOrder = new Order(orderValues); //create new order from user preferences
            concotion = new Drink(pantry, drinkOrder); //randomly select value within pantry

            //build the user choice from from our ingreding array
            var buildTheHtmlOutput = "";
            $.each(concotion, function (key, value) {
                buildTheHtmlOutput += "<li>" + value + "</li>";
            });

            display the output container
            $('.output').show();

            //populate it with the ingredients
            $('output ul').html(buildTheHtmlOutput);

            //name the customer drink with drinkName
            $('output h3').html("Here be " + drinkNamer(concoction) + ", ye scurvy dog!");

        });

    });
