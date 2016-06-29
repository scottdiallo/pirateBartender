var pantry = {
    strong: ["glug of rum", "slug of whisky", "splash of gin"],
    salty: ["olive on a stick", "salt-dusted rim", "rasher of bacon"],
    bitter: ["shake of bitters", "splash of tonic", "twist of lemon peel"],
    sweet: ["sugar cube", "spoonful of honey", "splash of cola"],
    fruity: ["slice of orange", "dash of cassis", "cherry on top"]
};

var Order = function (orderValues) {
    // capturing user values from the select form.
    this.strong = orderValues[0];
    this.salty = orderValues[1];
    this.bitter = orderValues[2];
    this.sweet = orderValues[3];
    this.fruity = orderValues[4];
};

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

var toTitleCase = function (str) {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

//Math.random function

var generateRandomNumber = function (min, max) {

    //creating Math.random function to randomly pick ingredient
    var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber;
}

//creating drink namer variable

var drinkNamer = function (concoction) {
    var drinkNamerOutput = concoction[0].split(" ");
    return "yer Sparkly " + toTitleCase(drinkNamerOutput[drinkNamerOutput.length - 1]) + " Grog";
};

$(document).ready(function () {

    $('.output').hide();

    $('form').on('submit', function (event) {

        event.preventDefault(); //using javascript to submit form when page is reload

        orderValues = [];

        //making sure each choice have been selected
        $('select').each(function () {
            orderValues.push($(this).val() === 'yes' ? true : false);
        });

        //using our 2 constructor to create the two objects
        drinkOrder = new Order(orderValues); // create new order from DOM
        concoction = new Drink(pantry, drinkOrder); // mix drink with Drink constructor

        //build the chosen ingredients from the ingredients array
        var buildTheHtmlOutput = "";
        $.each(concoction, function (key, value) {
            buildTheHtmlOutput += "<li>" + value + "</li>";
        });

        //display the output container
        $('.output').show();

        $(".output ul").html(buildTheHtmlOutput);

        // naming the customer drink
        $(".output h3").html("Here be " + drinkNamer(concoction) + ", ye scurvy dog!");
        $('main').hide();
        $('.subheader').hide();

    });
    $('.tryAgain').on('click', function () {
        $('.output').hide();
        $('main').show();
    });

    //create a nice box to display drink ordered.
});
