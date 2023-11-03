import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
	const handleClick = () => {
		localStorage.removeItem('user_id');
		localStorage.removeItem('isSeller');
		window.location = "/";
	}
	return (
		<div className="bg-white  border-white border-spacing-1 fixed top-0 right-0 left-0  border-b-0 backdrop-blur-sm text-black font-mono z-50">
			<div className="container flex m-auto">
				<h1 className="mx-auto ml-3 font-mono flex-1 text-3xl font-extrabold">
					MediStore
				</h1>

				<nav className="flex justify-around flex-1 text-center items-center">
					<Link
						className="navlink "
						to="/"
					>
						Home
					</Link>

					<Link
						className="navlink"
						to="/medicines"
					>
						Medicines
					</Link>

					<Link
						className="navlink"
						to="/contact"
					>
						Contact
					</Link>

					<div className="bg-gray-200  justify-items-end p-2 ">
						{
							localStorage.getItem("user_id") ?
								<><Link
									className="hover:text-cyan-600 navlink mr-7 flex-nowrap break-words"
									to="/cart"
								>
									Cart
								</Link>
								<button className="hover:text-cyan-600  mr-7 flex-nowrap break-words" onClick={handleClick}>Sign Out</button></>
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

					</div>
				</nav>
			</div>
		</div>

	);

}

export default Navbar;
