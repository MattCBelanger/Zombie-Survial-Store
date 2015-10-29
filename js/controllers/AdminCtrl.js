app.controller('AdminCtrl',AdminCtrl);

function AdminCtrl(productService,$state,products){
	var self = this;
	
	//services
	this.productService = productService;
	this.products = products;
	console.log(this.products);
	this.$state = $state;

	// var auth = localStorage.authToken == null;
	// console.log(localStorage.authToken);
	// if (!auth) {
 //        console.log(localStorage.getItem('authToken'));
 //        console.log("yoyo");
 //        $state.go('login');
   

 //    }
	
}



AdminCtrl.prototype.editProduct = function(ID,product) {
	console.log(ID);
	console.log(product);
	this.productService.productID = ID;
	this.productService.productEditing = product;
	// this.productService.editProd = product;
	console.log(this.productService.productID);
	console.log(this.productService.editProd);
	// this.productService.editProduct(ID,product);
	this.$state.go('edit_product');
};

