import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { localStorageService } from "../localStorageService";

export interface CurrentUser {
	id: string;
}

const getCurrentUser = () => {
	if (typeof window === "undefined") {
		return null;
	} else {
		return localStorageService.getCurrentUser();
	}
};

const useCurrentUser = (): [CurrentUser | null, Dispatch<SetStateAction<string | null>>] => {
	const [currentUser, setCurrentUser] = useState<string | null>(null);

	useEffect(() => {
		setCurrentUser(getCurrentUser());
	}, []);

	useEffect(() => {
		if (currentUser) {
			localStorageService.doLoginUser(currentUser);
		} else {
			localStorageService.doLogoutUser();
		}
	}, [currentUser]);

	if (currentUser) {
		return [
			{
				id: currentUser,
			},
			setCurrentUser,
		];
	} else {
		return [null, setCurrentUser];
	}
};

export { useCurrentUser };
