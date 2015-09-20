// create a blank customer order
describe("Order", function(){
    it("create a blank customer order that = $0.00 when customer clicks on 'order pizza' button", function(){
        var testOrder = new Order();
        var total = testOrder.total;
        expect("$" + parseFloat(total).toFixed(2)).to.equal("$0.00");
    });
    //Add a pizza to an order
    it("add a pizza to a customer order", function(){
        var testSize = new PieSize("small", 9.99);
        var testPizza = new Pizza(testSize);
        var testOrder = new Order();
        testOrder.addToOrder(testPizza);
        expect(testOrder.total).to.equal(testPizza.price);
    });
});
// create pizza object with basic toppings
describe("Pizza", function(){
    it("creates a pizza with base price, size, and basic toppings", function(){
        var testPie = new PieSize("small", 9.99);
        var testPizza = new Pizza(testPie);
        expect("$" + parseFloat(testPizza.price).toFixed(2));
    });
    // add topping to pizza
    it("adds a topping to a pizza", function(){
        var testPieSize = new PieSize("small", 9.99);
        var testPie = new Pizza(testPieSize);
        var testTopping = new Topping("pepperoni", 1.50);
        testPie.addTopping(testTopping);
        expect(testPie.toppings).to.eql(["cheese","sauce","pepperoni"]);
        expect(testPie.price).to.equal(11.49);
    })
});
// create topping object
describe("Topping", function(){
    it("create a topping with a default name and price", function(){
        var testName = "pepperoni";
        var testPrice = parseFloat(1.50).toFixed(2);
        var testTopping = new Topping(testName, testPrice);
        expect("$" + testTopping.price).to.equal("$1.50");
        expect(testTopping.name).to.equal("pepperoni");
    });
});
// create Small object with basePrice
describe("PieSize", function(){
    it("creates a pizza with a size name and price", function(){
        var testName = "small";
        var testPrice = 9.99;
        var testPieSize = new PieSize(testName, testPrice);
        expect("$" + parseFloat(testPieSize.price).toFixed(2)).to.equal("$9.99");
    });
});

// Choose what size you want
    // Display price for each size

// Choose toppings
    // Display price for each toppings

// Calculate price based on options selected
