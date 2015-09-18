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
    this.price += topping.price;
}
$("#order-button").text("Begin Order");
$(".begin-order").click(function(){
    $("#order-button").text("Making Pizza");
    order = new Order;
    $(".selections").show();
    beginOrder();
});
var beginOrder = function(){
// selection class is the form holding all the pizza order options (size, toppings)
    $("#size-select").on("click",function(event){
        event.preventDefault();
        console.log($("#size-select option"));
        console.log($(this));
        pizza1 = new Pizza($("#size-select option").val());
        //console.log(pizza1);
});
}
//var element = document.getElementById("size-select");
//     var e = document.getElementById("ddlViewBy"); var strUser = e.options[e.selectedIndex].value;


    // $(".")
// });
