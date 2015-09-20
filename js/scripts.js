// Order constructor
function Order(){
    this.total = 0.00;
}
// Pizza constructor - adds cheese and sauce by default, price and size
function Pizza(pieSize){
    this.toppings = [];
    this.pizzaSize = pieSize;
    this.price = pieSize.price;
    this.toppings.push("cheese","sauce");
}
// Topping constructor - has a default price
function Topping(name, price){
    this.name = name;
    this.price = price;
}
// Small pizza constructor
function PieSize(name, price){
    this.name = name;
    this.price = price;
}
// add an item to a customer order
Order.prototype.addToOrder = function(item){
    this.total += item.price;
}
Pizza.prototype.addTopping = function(topping){
    this.toppings.push(topping.name);
    var addPrice = parseFloat(topping.price).toFixed(2);
    console.log(addPrice + " addPrice");
    console.log((this.price + addPrice) + " parsed in addTopping");

    this.price = Number(this.price) + Number(parseFloat(addPrice).toFixed(2));
}
$("#order-button").text("Begin Order");
$(".begin-order").click(function(){
    $("#order-button").text("Making Pizza");
    $(".begin-order").prop("disabled", true);
    $(".selections").show();
    $(".toppings-select").show();
    $(".quantity").show();
    $("#submit-order").show();
    beginOrder();
});
var beginOrder = function(){
    $(".selections").submit(function(event){
        event.preventDefault();
        // create new order
        var order = new Order;
        // create new size with name and 
        var sizes = ($(document.getElementById("size-select").getElementsByTagName("input")));
        for(var s = 0; s < sizes.length; s++){
            if(sizes[s].checked){
                var name = $(sizes[s]).attr("name");
                var price = parseFloat($(sizes[s]).val());
                price = parseFloat(price).toFixed(2);
                var pieSize = new PieSize(name, price);
                console.log(pieSize);
            }
        }
        
        var newPiePrice = parseFloat($("input#size").attr("value")).toFixed(2);

        // create new pizza
        var pizza = new Pizza(pieSize);
        var toppings = [];
        console.log($(document.getElementById("toppings-select").getElementsByTagName("input")));
        //console.log($(document.getElementById("toppings-select").children));
        toppings = ($(document.getElementById("toppings-select").getElementsByTagName("input")));
        console.log(toppings);
        //toppings.getElementsByTagName("input");
        // console.log(toppings);
        // var numOfPossibleToppings = $(".toppings-select").getElementsById("topping");
        // console.log(numOfPossibleToppings);

        for(var i = 0; i < toppings.length; i++){
            if(toppings[i].checked){
                var name = $(toppings[i]).attr("name");
                //console.log(parseFloat($(toppings[i].attr("value"))));
                var price = parseFloat($(toppings[i]).val());
                price = parseFloat(price).toFixed(2);
                //.toFixed(2));
                console.log(price + " price");
                var topping = new Topping(name, price);
                pizza.addTopping(topping);
            }
        }
        console.log(pizza);

    });
}
// selection class is the form holding all the pizza order options (size, toppings)
    // $("#size-select").on("click",function(event){
    //     event.preventDefault();
    //     console.log($("#size-select option"));
    //     console.log($(this));
    //     pizza1 = new Pizza($("#size-select option").selected.val());
    //     //console.log(pizza1);
// });
// }
//var element = document.getElementById("size-select");
//     var e = document.getElementById("ddlViewBy"); var strUser = e.options[e.selectedIndex].value;


    // $(".")
// });
