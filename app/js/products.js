(function ($) {
	'use strict';
		function products() {
			var productListTemplate,
				productData,
				productDataInitial;


			this.init = function () {
				productListing();
				sortActions();
				filterActions();
                resetListing();
                toggleView();
			};

			var productListing = function () {
				$.getJSON( "../src/data/products.json", function( data ) {
                    productDataInitial = JSON.parse(JSON.stringify(data));
                    productData = data;
					generateListing(productData);
				});
			};

			var generateListing = function (productData) {
				productListTemplate = new Ractive({
					el: '#js-product-list',
					template: '#js-product-list-template',
					data: {products: productData}
				});
			}

			var sortActions = function () {
				$(".js-sortBy").on('click', function(){
					var $this = $(this);
					$(".js-sortBy").removeClass('sort-by__option--selected');
					$this.addClass('sort-by__option--selected');
					sortProducts($this.data('prop'), $this.data('asc'));
				});
			}

			var sortProducts = function(prop, asc) {
			    productData = productData.sort(function(a, b) {
			        if (asc) {
			            return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
			        } else {
			            return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
			        }
			    });
			    generateListing(productData);
			}

            var filterActions = function () {
				$(".js-filter").on('click', function(){
					$(".sort-by__option--selected").removeClass('sort-by__option--selected');
					var $this = $(this);
					$(".js-filter").removeClass('sort-by__option--selected');
					$this.addClass('sort-by__option--selected');
					filterProducts($this.data('prop'), $this.data('val'));
				});
			}

            var filterProducts = function(prop, val) {
                let filteredproductData = productDataInitial.filter(function(obj) {
                    return (obj[prop] === val);
                });

                productData = JSON.parse(JSON.stringify(filteredproductData));
			    
			    generateListing(productData);
			}

            var resetListing = function () {
				$(".js-reset").on('click', function(){
					$(".sort-by__option--selected").removeClass('sort-by__option--selected');
                    productData = JSON.parse(JSON.stringify(productDataInitial));
                    generateListing(productData);
				});
			}

            var toggleView = function () {
                $(".js-toggle-view").on('click', function(){
                    $(".switch-view").toggleClass("switch-view--selected");
                    $(".product-list__wrapper").toggleClass("product-list__wrapper--flex");
                });
            }
		}

		window.products = new products();
	}
)(jQuery);
