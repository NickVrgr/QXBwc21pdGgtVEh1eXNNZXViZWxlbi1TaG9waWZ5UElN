export default {
	checkUserLogin: () => {
		GetLoggedInUser.run()
			.then((res) => {
			if ((res.length < 1 && appsmith.mode != "EDIT") || (res[0].session_expiration_date < moment().valueOf() && appsmith.mode != "EDIT")) {
				navigateTo("Authenticatie", {}, "SAME_WINDOW")
			}
		})
	},

	checkSessionID: () => {
		if (!appsmith.store?.userSession?.session_id && appsmith.mode != "EDIT" ) {
			navigateTo("Authenticatie", {}, "SAME_WINDOW")
		} else {
			this.checkUserLogin();
		}
	},
}