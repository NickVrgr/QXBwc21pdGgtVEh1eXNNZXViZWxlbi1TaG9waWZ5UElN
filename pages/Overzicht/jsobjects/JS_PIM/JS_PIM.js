export default {
	standardSelectedRows: () => {
		return GetProducts.run()
		.then(() => storeValue('selectedrows',[{id:0},{id:0}]))	
	}
}
