export default {
	Create_Products: () => {
		GetSettings.run()
			.then(() => closeModal('Modal_Tags'))
			.then(() => showModal('Modal_Loading'))
			.then(() => ShopifyInsertArticle.run())
			.then((res) => {
			res.products.forEach(function(product){
				if (product.product.id){
					UpdateShopifyID.run({shopify_id: product.product.id, shopify_inv_id:product.product.variants[0].inventory_item_id, id:product.product.variants[0].sku, variant_id:product.product.variants[0].id})
				}
			})
		})
			.then(() => {
			GetProducts.run();
			showAlert('Product inserted', 'success');
			closeModal('Modal_Loading');
		})
			.catch((err) => {
			showAlert(`${JSON.stringify(err.message)}`,'error');
			closeModal('Modal_Loading');
		})

		// .catch((error) => {	;
		// InsertErrorlog.run() })												//write code here
	},
	Create_Product_Variants: () => {
		GetSettings.run()
			.then(() => showModal('Modal_Loading'))
			.then(() => ShopifyInsertArticleVariants.run())
			.then((res) => {
			if (res.error) {
				showAlert(res.error.message,'error')
			} else {
				UpdateShopifyInvID.run({inv_ids:res.products[0].variant.inventory_item_id,variant_id:res.products[0].variant.id,shopify_id: res.products[0].variant.product_id});
				GetProducts.run()
				showAlert('Variant inserted', 'success')
				closeModal('Modal_Loading')
			}
		})
			.catch((err) => showAlert(JSON.stringify(err,'error')))
	},
	getSettings: () => {
		GetSettings.run()
	},
}