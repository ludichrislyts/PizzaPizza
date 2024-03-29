// Order constructor
function Order() {
  this.total = 0.0;
}
// Pizza constructor - adds cheese and sauce by default, price and size
function Pizza(pieSize) {
  this.toppings = [];
  this.pizzaSize = pieSize.name;
  this.price = Number(parseFloat(pieSize.price).toFixed(2));
  this.toppings.push("Cheese", "Sauce");
}
// Topping constructor - has a default price
function Topping(name, price) {
  this.name = name;
  this.price = parseFloat(price).toFixed(2);
  // console.log(this.price + " topping price in constructor");
}
// Small pizza constructor
function PieSize(name, price) {
  this.name = name;
  this.price = Number(parseFloat(price).toFixed(2));
  // console.log(this.price + " pizza price in constructor");
}
// add an item to a customer order
Order.prototype.addToOrder = function (item) {
  this.total += Number(this.total) + Number(parseFloat(item.price).toFixed(2));
};
Pizza.prototype.addTopping = function (topping) {
  this.toppings.push(topping.name);
  var addPrice = parseFloat(topping.price).toFixed(2);
  // console.log(this.price + " pizza price in addTopping before topping add");
  this.price += Number(parseFloat(addPrice));
  this.price = Number(this.price.toFixed(2));
  // console.log(this.price + " pizza price in addTopping after topping add");
};

var newOrder = new Order();

$("#order-button").text("Begin Order");
$(".begin-order").click(function () {
  $("#order-button").hide();
  $(".begin-order").prop("disabled", true);
  $(".selections").show();
  $(".toppings-select").show();
  $(".quantity").show();
  $("#submit-order").show();
  beginOrder(newOrder);
});

var addToOrder = function () {
  beginOrder(newOrder);
};

var pizzaDelivery = () => {
  if (window.appConfig.pizzaParty.enabled) {
    window.location.href = 'pizza.html';
  } else {
    alert("Your pizza is on it's way!!")
  }
}

var beginOrder = function (existingOrder = null) {

  var pieSize;
  $('#size-select input').click(() => {
    $('#submit-order').attr('disabled', false);
  });
  $(".selections").submit(function (event) {
    event.preventDefault();
    // create new order
    var order = existingOrder ?? new Order();
    // get the radio buttons for sizes and check which one is selected
    var sizes = $(
      document.getElementById("size-select").getElementsByTagName("input")
    );
    for (var s = 0; s < sizes.length; s++) {
      if (sizes[s].checked) {
        // if selected, create a new PieSize object
        var name = $(sizes[s]).attr("id");
        var price = $(sizes[s]).val();
        price = parseFloat(price).toFixed(2);
        pieSize = new PieSize(name, price);
      }
    } // end size radio button loop
    // create new pizza
    if (pieSize !== undefined) {
        $('#deliver-me').attr('disabled', false);
        $('#totals').show();
      var pizza = new Pizza(pieSize);
      console.log(pizza);
      var toppings = [];
      // get toppings and create Topping objects
      toppings = $(
        document.getElementById("toppings-select").getElementsByTagName("input")
      );
      for (var i = 0; i < toppings.length; i++) {
        if (toppings[i].checked) {
          var name = $(toppings[i]).attr("id");
          var price = parseFloat($(toppings[i]).val());
          price = parseFloat(price).toFixed(2);
          var topping = new Topping(name, price);
          pizza.addTopping(topping);
        }
      } // end topping loop
      console.log(pizza);
      order.addToOrder(pizza);
      console.log(order);
      $("input[name=size]").attr("checked", false);
      $("input[name=topping]").attr("checked", false);
      $("#quantity-select").val([]);
      $('#submit-order').attr('disabled', true);
      $("#total-price").text(order.total);
      if (window.appConfig[window.env].showOrderTotal) {
        $("#coupon-code").text(
          "Enjoy $5 off your next order! Enter promo code PIZZA4LYFE on checkout."
        );
      }
    }
  });
}; // end begin order function
