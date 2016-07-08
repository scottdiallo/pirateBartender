//Global variables declarations
var userName = "";
var intro = "";
var pantry = { //pantry with items to choose from
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

// populating the drink
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

//Math.random function to pick from the pantry

var generateRandomNumber = function (min, max) {

    //creating Math.random function to randomly pick ingredient
    var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber;
}

//creating drink namer variable
var drinkNamer = function (concoction) {
    if (concoction.length > 0) {
        //split the concoction by space to be able to use the words
        var drinkNamerOutput = concoction[0].split(" ");
        //build the name of the new drink by getting the second word of the first ingredient and add extra words around it
        return "yer Sparkly " + toTitleCase(drinkNamerOutput[drinkNamerOutput.length - 1]) + " Grog";
    } else {
        return false;
    }
};


$(document).ready(function () {

    $('.subheader').hide();
    $('.output').hide();
    $('main').hide();
    $('.subheader').hide();

    $('#intro').append(intro);

    //display question once button is clicked
    $('.questionButton').on('click', function () {
        $('main').show();
        $('.questionButton').hide();
    })

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
        //        console.log(concoction);
        //display the output container
        $('.output').show();

        $(".output ul").html(buildTheHtmlOutput);

        // naming the customer drink
        $(".output h3").html("Here be " + drinkNamer(concoction) + ", ye scurvy dog!");
        $('main').hide();

    });
    $('.tryAgain').on('click', function () {
        window.location.reload();

    });

    //prevent user from ordering without a name
    $('.questionButton').on('click', function () {
        if ($("input" == "")) {
            alert("Don't you have a name pirate?");

        };
        $('.askName').hide();
        $('.customerName').hide();
        userName = $('input').val();
        intro = "Hi " + userName + "!" + " Pick Yer Poison";
        $('#intro').html(intro);
        $('.subheader').show();

    });

    $('.orderBtn').on('click', function () {
        $('#intro').html("Hi " + userName + "!" + " Enjoy your Drink");
    })

    //create a nice box to display drink ordered.
});
