export default {
	createAdminUser: () => {
	 return InsertAdminUser.run()
		.then(() => showAlert('Succesvol opgeslagen','success'))
		.then(() => GetSettings.run())
		.catch((error) => JS_Error.processError(error))
	}
}