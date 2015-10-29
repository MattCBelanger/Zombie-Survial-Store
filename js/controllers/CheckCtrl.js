app.controller('CheckCtrl',CheckCtrl);

function CheckCtrl(productService,$uibModal){
	
	this.productService = productService;
	this.products = this.productService.products;
	this.$uibModal=$uibModal;
	this.cart = this.productService.cart;
	console.log(this.cart);
	this.final_total=0;
	this.total=0;
	this.tax=0;

	this.calculate();
}

CheckCtrl.prototype.addOrder = function(){
	//create the api request that makes the product on the backend
	//as part of your response you need to add it to your current
	//product array using the product service

	var request_body = {
		cart:this.cart,
		total:this.total.toString(),
		tax:this.tax.toString(),
		final_total:this.final_total.toString()
		
	}
	console.log(request_body);

	this.productService.addOrder(request_body);

}


CheckCtrl.prototype.calculate = function(){

	for(i=0;i<this.cart.length;i++){
		console.log("hi");
		this.total = this.total + (this.cart[i].customerQuantity *this.cart[i].price);
	
		// this.total = parseFloat(Math.round(this.total * 100) / 100).toFixed(2);
	}


	this.tax = this.total*0.13;
	this.final_total = this.tax + this.total;
	this.final_total = Number(this.final_total);
	console.log(this.final_total);
	




}

CheckCtrl.prototype.open = function(){
	

for(var i=0;i<this.cart.length;i++){
			if(Number(this.cart[i].quantity) < this.cart[i].customerQuantity){
				alert("We only have " + this.cart[i].quantity+" "+this.cart[i].name+ "s left, please change your quantity in cart");
				return;
			}
}
	
for(var j=0;j<this.cart.length;j++){

		this.productService.productID = this.cart[j].productId;

		var quan = (this.cart[j].quantity - this.cart[j].customerQuantity);
		var request_body = {

		name:this.cart[j].name,
		description:this.cart[j].description,
		price:this.cart[j].price,
		category:this.cart[j].category,
		image: this.cart[j].image,
		quantity:quan,
		status:this.cart[j].status
	}

	this.productService.EditProduct(request_body);
}
	
	console.log("passed for both fors");


	var request_body = {
		cart:this.cart,
		total:this.total.toString(),
		tax:this.tax.toString(),
		final_total:this.final_total.toString()
		
	}
	console.log(request_body);

	this.productService.addOrder(request_body);


//confirm modal
	  this.$uibModal.open({
      animation: true,
      templateUrl: 'templates/order_confirmation.html',
      controller: 'OrderConfirmCtrl as Ctrl',
      size: "lg"
      
    });
}

