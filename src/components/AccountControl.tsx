import * as Dialog from "@radix-ui/react-dialog";
import * as Form from '@radix-ui/react-form';

import axios from "axios";
import { useAtom } from "jotai";
import { type FormEventHandler, useCallback, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { SyncLoader } from "react-spinners";

import state from "~/lib/state";
import useUser from "~/lib/useUser";

function AccountControl() {
	const { refresh } = useUser();
	const [user] = useAtom(state.user);

	const [loginType, setLoginType] = useState<"Login" | "Register">("Login");
	const [pending, setPending] = useState(false);
	//const [userSession, setUserSession] = useAtom(state.userSession);

	const handleRegister: FormEventHandler<HTMLFormElement> = useCallback((e) => {
		e.preventDefault();

		if (pending) return;
		setPending(true);

		const data = new FormData(e.currentTarget);

		const email = data.get("email");
		const username = data.get("username");
		const password = data.get("password");
		const passwordConfirm = data.get("passwordConfirm");

		if (password != passwordConfirm) {
			toast.error("Passwords do not match!");
			setPending(false);
			return;
		}

		if (email == user?.email && user?.isLoggedIn) {
			toast.error("You are already logged in!");
			setPending(false);
			return;
		}

		void axios.post("/api/register", {
			username: username as string,
			email: email as string,
			password: password as string,
		}).then(res => {
			if (res.status == 200) {
				toast.success("Registered successfully!");
				void refresh();
			} else {
				toast.error("Could not register!");
			}
		}).catch(error => {
			console.error(error);
			toast.error("Could not register!");
		}).finally(() => {
			setPending(false);
		});
	}, [pending, user, refresh]);

	const handleLogin: FormEventHandler<HTMLFormElement> = useCallback((e) => {
		e.preventDefault();

		if (pending) return;
		setPending(true);

		const data = new FormData(e.currentTarget);
		const email = data.get("email");
		const password = data.get("password");

		if (email == user?.email && user?.isLoggedIn) {
			toast.error("You are already logged in!");
			setPending(false);
			return;
		}

		void axios.post("/api/login", {
			email: email as string,
			password: password as string,
		}).then(res => {
			console.log("login", res);
			toast.success("Logged in successfully!");
			void refresh();
		}).catch(error => {
			console.error(error);
			toast.error("Could not login!");
		}).finally(() => {
			setPending(false);
		});
	}, [pending, user, refresh]);

	const handleLogout = useCallback(() => {
		console.log("logout");
		try {
			axios.get("/api/logout").then(res => {
				console.log("logout", res);

				if (res.status == 200) {
					toast.success("Logged out successfully!");
					void refresh();
				}
			}).catch(error => {
				console.error(error);
				toast.error("Could not logout!");
			});
		} catch (error) {
			console.error(error);
			toast.error("Could not logout!");
		}
	}, [refresh]);

	const RegisterForm = useMemo(() => {
		return (
			<Form.Root onSubmit={handleRegister} hidden={user?.isLoggedIn}>
				<Form.Field className="grid mb-[10px]" name="email">
					<div className="flex items-baseline justify-between">
						<Form.Label className="text-[15px] font-medium leading-[35px] text-slate-600">Email</Form.Label>
						<Form.Message className="text-[10px] sm:text-[13px] opacity-[0.8] text-red-600" match="valueMissing">
							Please enter your email
						</Form.Message>
						<Form.Message className="text-[10px] sm:text-[13px] opacity-[0.8] text-red-600" match="typeMismatch">
							Please provide a valid email
						</Form.Message>
					</div>
					<Form.Control asChild>
						<input
							className="p-2 rounded-md border-2"
							type="email"
							required
						/>
					</Form.Control>
				</Form.Field>

				<Form.Field className="grid mb-[10px]" name="username">
					<div className="flex items-baseline justify-between">
						<Form.Label className="text-[15px] font-medium leading-[35px] text-slate-600">Username</Form.Label>
						<Form.Message className="text-[10px] sm:text-[13px] opacity-[0.8] text-red-600" match="valueMissing">
							Please enter your username
						</Form.Message>
					</div>
					<Form.Control asChild>
						<input
							className="p-2 rounded-md border-2"
							type="text"
							required
						/>
					</Form.Control>
				</Form.Field>

				<Form.Field className="grid mb-[10px]" name="password">
					<div className="flex items-baseline justify-between">
						<Form.Label className="text-[15px] font-medium leading-[35px]">
							Password
						</Form.Label>
						<Form.Message className="text-[10px] sm:text-[13px] opacity-[0.8] text-red-600" match="valueMissing">
							Please enter a password
						</Form.Message>
						<Form.Message className="text-[10px] sm:text-[13px] opacity-[0.8] text-red-600" match={(value) => { return value.length < 8 }}>
							Password must be at least 8 characters long
						</Form.Message>
					</div>
					<Form.Control asChild>
						<input
							className="p-2 rounded-md border-2"
							type="password"
							required
						/>
					</Form.Control>
				</Form.Field>

				<Form.Field className="grid mb-[10px]" name="passwordConfirm">
					<div className="flex items-baseline justify-between">
						<Form.Label className="text-[15px] font-medium leading-[35px]">
							Confirm Password
						</Form.Label>
						<Form.Message className="text-[10px] sm:text-[13px] opacity-[0.8] text-red-600" match={(value, formData) => { return value != formData.get("password") }}>
							Passwords do not match
						</Form.Message>
						<Form.Message className="text-[10px] sm:text-[13px] opacity-[0.8] text-red-600" match="valueMissing">
							Please confirm your password
						</Form.Message>
					</div>
					<Form.Control asChild>
						<input
							className="p-2 rounded-md border-2"
							type="password"
							required
						/>
					</Form.Control>
				</Form.Field>
				<Form.Submit asChild>
					<button className="w-full shadow-sm rounded-md border-emerald-900 bg-emerald-500 text-white p-2 mt-[10px]">
						{pending ? <SyncLoader className="scale-[0.4]" color="#ffffff" /> : "Register"}
					</button>
				</Form.Submit>
			</Form.Root>)
	}, [handleRegister, user, pending]);

	const LoginForm = useMemo(() => {
		return (
			<Form.Root onSubmit={handleLogin} hidden={user?.isLoggedIn}>
				<Form.Field className="grid mb-[10px]" name="email">
					<div className="flex items-baseline justify-between">
						<Form.Label className="text-[15px] font-medium leading-[35px] text-slate-600">Email</Form.Label>
						<Form.Message className="text-[10px] sm:text-[13px] opacity-[0.8] text-red-600" match="valueMissing">
							Please enter your email
						</Form.Message>
						<Form.Message className="text-[10px] sm:text-[13px] opacity-[0.8] text-red-600" match="typeMismatch">
							Please provide a valid email
						</Form.Message>
					</div>
					<Form.Control asChild>
						<input
							className="p-2 rounded-md border-2"
							type="email"
							required
						/>
					</Form.Control>
				</Form.Field>

				<Form.Field className="grid mb-[10px]" name="password">
					<div className="flex items-baseline justify-between">
						<Form.Label className="text-[15px] font-medium leading-[35px]">
							Password
						</Form.Label>
						<Form.Message className="text-[10px] sm:text-[13px] opacity-[0.8] text-red-600" match="valueMissing">
							Please enter a password
						</Form.Message>
					</div>
					<Form.Control asChild>
						<input
							className="p-2 rounded-md border-2"
							type="password"
							required
						/>
					</Form.Control>
				</Form.Field>
				<Form.Submit asChild>
					<button disabled={pending} className="w-full shadow-sm rounded-md border-emerald-900 disabled:opacity-80 bg-emerald-500 text-white p-2 mt-[10px]">
						{pending ? <SyncLoader className="scale-[0.4]" color="#ffffff" /> : "Login"}
					</button>
				</Form.Submit>
			</Form.Root>)
	}, [handleLogin, user, pending]);

	const LogoutPanel = useMemo(() => {
		return (
			<button onClick={handleLogout}>Logout now</button>
		)
	}, [handleLogout]);

	const Trigger = useMemo(() => {
		return (
			<p className="mx-2 p-2">{user?.isLoggedIn ? "Logout" : "Login"}</p>
		)
	}, [user]);

	const LoginSwitch = useMemo(() => {
		const loginTypeUpdate = () => setLoginType(loginType == "Login" ? "Register" : "Login");

		return (
			<p className="mt-5 flex justify-center w-full">
				<button className="hover:text-blue-500 text-sm" onClick={loginTypeUpdate}>{loginType == "Login" ? "Create an account" : "Already have an account?"}</button>
			</p>
		)
	}, [loginType]);

	return (
		<Dialog.Root>
			<Dialog.Trigger>
				{Trigger}
			</Dialog.Trigger>

			<Dialog.Portal>
				<Dialog.Overlay className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0" />
				<Dialog.Content className="z-[100] data-[state=open]:animate-contentShow fixed top-[40%] sm:top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
					<Dialog.Title>
						<p className="text-center text-2xl font-bold">{user?.isLoggedIn ? `Welcome!` : loginType}</p>
					</ Dialog.Title>

					{
						user?.isLoggedIn ? LogoutPanel : (loginType == "Login" ? LoginForm : RegisterForm)
					}

					{
						!user?.isLoggedIn ? LoginSwitch : null
					}
				</Dialog.Content>
			</Dialog.Portal>

		</ Dialog.Root>
	)
}

export default AccountControl;