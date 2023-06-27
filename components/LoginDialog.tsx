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

interface LoginDialogProps {
	isOpen: boolean;
	dialogText?: string;
	onClose: () => void;
}

export const LoginDialog = ({ isOpen, onClose }: LoginDialogProps) => {
	const onCloseHandler = () => {
		onClose();
	};

	const onSubmitHandler = () => {
		// TODO
		onClose();
	};

	return (
		<Dialog open={isOpen} onClose={onCloseHandler}>
			<DialogTitle className="bg-green-700 text-center text-white relative">Login</DialogTitle>
			<DialogContent className="p-8">
				<DialogContentText className="my-4">
					Sign in to avail exciting discounts and cashbacks!
				</DialogContentText>
				<TextField
					className="w-full"
					type="tel"
					InputProps={{
						inputMode: "tel",
						startAdornment: <InputAdornment position="start">+91</InputAdornment>,
					}}
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={onSubmitHandler}>Submit</Button>
				<Button onClick={onCloseHandler}>Close</Button>
			</DialogActions>
		</Dialog>
	);
};
