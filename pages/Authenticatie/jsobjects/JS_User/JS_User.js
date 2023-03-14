export default {
	UserLogin: () => {
		return LogInUser.run()
			.then((res) => {
			if (res.length >  0) {
				UpdateInsertSessionID.run({id:res[0].id})
					.then((res) => storeValue("userSession", res[0]))
					.then(() => navigateTo('Overzicht',{},"SAME_WINDOW"))
					.catch((err) =>  showAlert(JSON.stringify(err),'error'))
			} else {
				showAlert('Gebruikersnaam of wachtwoord ongeldig')
			}
		})	
			.catch((err) => showAlert(JSON.stringify(err),'error'))
	},
	checkUserLogin: () => {
		if (appsmith.store?.userSession?.session_id && appsmith.mode != "EDIT") {
			GetLoggedInUser.run()
				.then((res) => {
				if ((res.length > 0 && appsmith.mode != "EDIT") || (res[0]?.session_expiration_date > moment().valueOf() && appsmith.mode != "EDIT")) {
					UpdateSessionID.run()
						.then((res) => storeValue("userSession", res[0]))
						.then(() => navigateTo("Overzicht", {}, "SAME_WINDOW"))
				} 
			}) 
		}
	},

}