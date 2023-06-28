const BOOK_BUS_LS_PREFIX = "BookBus_LS_";

const KEYS = {
	CURRENT_USER: BOOK_BUS_LS_PREFIX + "CurrentUser",
};

class LocalStorageService {
	doLoginUser(id: string) {
		localStorage.setItem(KEYS.CURRENT_USER, id);
	}
	doLogoutUser() {
		localStorage.removeItem(KEYS.CURRENT_USER);
	}
	getCurrentUser() {
		return localStorage.getItem(KEYS.CURRENT_USER) ?? null;
	}
}

const localStorageService = new LocalStorageService();

export { localStorageService };
