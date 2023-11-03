import React from "react";
import { Link } from "react-router-dom";

function AdminNavbar() {
	const handleClick = () => {
		localStorage.removeItem('user_id');
		localStorage.removeItem('isSeller');
		window.location = "/";
	}
	return (
		<div className="bg-black  border-white border-spacing-1 fixed bottom-0 right-0 left-0  border-b-0 backdrop-blur-sm text-white font-mono z-50">
			<div className="container flex m-auto">


				<nav className="flex justify-around flex-1 text-center items-center">


					<Link
						className="navlink"
						to="/a/dashboard"
					>
						Dashboard
					</Link>
					<Link
						className="navlink"
						to="/a/orders"
					>
						Orders
					</Link>
					<Link
						className="navlink"
						to="/a/feedback"
					>
						Feedback
					</Link>

					{
						localStorage.getItem("user_id") ?
							<>
								<button className="hover:text-red-600  text-red-900 mr-7 flex-nowrap break-words bg-red-300  p-2 " onClick={handleClick}>Sign Out</button></>
							: <>
								<Link
									className="hover:text-cyan-600 navlink mr-7 flex-nowrap break-words"
									to="/SignIn"
								>
									Sign In
								</Link>
								<Link
									className="hover:text-cyan-600  navlink ml-7 flex-nowrap break-words"
									to="/SignUp"
								>
									Sign Up
								</Link></>
					}
				</nav>
			</div>
		</div>

	);

}

export default AdminNavbar;
