import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	InputAdornment,
	TextField,
} from "@mui/material";
import { CurrentUser } from "../util/customHooks";
import { FormEvent, useState } from "react";

interface LoginDialogProps {
	isOpen: boolean;
	currentUser: CurrentUser | null;
	setCurrentUser: (newId: string | null) => void;
	dialogText?: string;
	onClose: () => void;
}

export const LoginDialog = ({ isOpen, onClose, currentUser, setCurrentUser }: LoginDialogProps) => {
	const onCloseHandler = () => {
		onClose();
	};

	const doLoginHandler = (newId: string) => {
		setCurrentUser(newId);
		onClose();
	};

	const doLogoutHandler = () => {
		setCurrentUser(null);
		onClose();
	};

	return (
		<Dialog open={isOpen} onClose={onCloseHandler}>
			{currentUser ? (
				<CurrentUserDialogContent
					currentUser={currentUser}
					onCloseHandler={onCloseHandler}
					onSubmitHandler={doLogoutHandler}
				/>
			) : (
				<NoLoginDialogContent onSubmitHandler={doLoginHandler} onCloseHandler={onCloseHandler} />
			)}
		</Dialog>
	);
};

const CurrentUserDialogContent = ({
	currentUser,
	onSubmitHandler,
	onCloseHandler,
}: {
	currentUser: CurrentUser;
	onSubmitHandler: () => void;
	onCloseHandler: () => void;
}) => {
	return (
		<>
			<DialogTitle className="bg-green-700 text-center text-white relative">Profile</DialogTitle>
			<DialogContent className="p-8">
				<DialogContentText className="my-4">Welcome back {currentUser.id}</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={onCloseHandler}>Close</Button>
				<Button onClick={onSubmitHandler}>Logout</Button>
			</DialogActions>
		</>
	);
};

const NoLoginDialogContent = ({
	onSubmitHandler,
	onCloseHandler,
}: {
	onSubmitHandler: (newId: string) => void;
	onCloseHandler: () => void;
}) => {
	const [loginId, setLoginId] = useState("");
	const onFormSubmitHandler = (e: FormEvent) => {
		e.preventDefault();
		onSubmitHandler(loginId);
	};
	return (
		<>
			<DialogTitle className="bg-green-700 text-center text-white relative">Login</DialogTitle>
			<DialogContent className="p-8">
				<DialogContentText className="my-4">
					Sign in to avail exciting discounts and cashbacks!
				</DialogContentText>
				<form onSubmit={onFormSubmitHandler}>
					<TextField
						className="w-full"
						type="tel"
						value={loginId}
						onChange={(event) => setLoginId(event.currentTarget.value)}
						InputProps={{
							inputMode: "tel",
							startAdornment: <InputAdornment position="start">+91</InputAdornment>,
						}}
					/>
				</form>
			</DialogContent>
			<DialogActions>
				<Button onClick={onCloseHandler}>Close</Button>
				<Button onClick={() => onSubmitHandler(loginId)}>Submit</Button>
			</DialogActions>
		</>
	);
};
