"use client";

import { Eye, EyeOff, Lock, User } from "lucide-react";
import { getSession, signIn } from "next-auth/react";
import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

export default function AdminLogin() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	const router = useRouter();

	useEffect(() => {
		getSession().then((session) => {
			if (session) {
				router.push("/dashboard");
			}
		});
	});

	const handleSubmit = async () => {
		setIsLoading(true);
		setError("");

		// Simulate API call
		try {
			const result = await signIn("credentials", {
				email,
				password,
				redirect: false,
			});
			if (result?.error) {
				setError("Invalid Credentials");
			} else {
				router.push("/dashboard");
			}
		} catch (error) {
			console.log(error);
			setError("An error occured during login...");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-[calc(100vh-132px)] flex items-center justify-center">
			<div className="relative w-full max-w-md">
				{/* Main Login Card */}
				<div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/20">
					{/* Header */}
					<div className="text-center mb-[32px]">
						<h1 className="text-2xl font-bold text-gray-900 mb-2">
							Log In
						</h1>
					</div>

					{/* Error Message */}
					{error && (
						<div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
							<p className="text-red-700 text-sm">{error}</p>
						</div>
					)}

					{/* Login Form */}
					<div className="space-y-6">
						{/* Username Field */}
						<div>
							<label
								htmlFor="username"
								className="block text-sm font-medium text-gray-700 mb-2"
							>
								Username
							</label>
							<div
								className="relative"
								style={{ position: "relative" }}
							>
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
									<User
										className="h-5 w-5 text-gray-400"
										style={{
											width: "20px",
											height: "20px",
											color: "#9ca3af",
										}}
									/>
								</div>
								<input
									type="text"
									id="username"
									name="username"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
									placeholder="Enter your username"
									required
								/>
							</div>
						</div>

						{/* Password Field */}
						<div>
							<label
								htmlFor="password"
								className="block text-sm font-medium text-gray-700 mb-2"
							>
								Password
							</label>
							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
									<Lock className="h-5 w-5 text-gray-400" />
								</div>
								<input
									type={showPassword ? "text" : "password"}
									id="password"
									name="password"
									value={password}
									onChange={(e) =>
										setPassword(e.target.value)
									}
									className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
									placeholder="Enter your password"
									required
								/>
								<button
									type="button"
									className="absolute inset-y-0 right-0 pr-3 flex items-center"
									onClick={() =>
										setShowPassword(!showPassword)
									}
								>
									{showPassword ? (
										<EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
									) : (
										<Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
									)}
								</button>
							</div>
						</div>

						{/* Submit Button */}
						<button
							onClick={handleSubmit}
							disabled={isLoading || !email || !password}
							className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-hero hover:bg-orange-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-hero disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
						>
							{isLoading ? (
								<div className="flex items-center">
									<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
									Signing in...
								</div>
							) : (
								"Sign In"
							)}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
