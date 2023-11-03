import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./App.css";
import HomePage from "./components/HomePage";
import Medicines from "./components/Medicines";
import Navbar from "./components/Navbar";
import SignIn from "./components/SignIn/SignIn.js";
import SignUp from "./components/SignUp";
import Contact from "./components/Contact";
import { Cart } from "./components/Cart";
import AdminLogin from "./components/AdminLogin";
import Dashboard from "./components/Dashboard";
import FeedBack from "./components/Contact/feedBack";
import { AdminCart } from "./components/Cart/adminCart";
import AdminNavbar from "./components/Navbar/adminNav";


function App() {
	return (
		<div className=" min-h-screen max-h-max break-words overflow-x-hidden pt-10">
			<BrowserRouter>
				<Routes>
					<Route
						path="/"
						element={
							<>
								<Navbar></Navbar>
								<Outlet />
							</>
						}
					>
						<Route index element={<HomePage />} />
						<Route path="/contact" element={<Contact />} />
						<Route path="/signin" element={<SignIn />} />
						<Route path="/signUp" element={<SignUp />} />
						<Route path="/admin" element={<AdminLogin />} />
						<Route path="/medicines" element={<Medicines />} />
						<Route path="/cart" element={<Cart />} />
						{
							localStorage.getItem("isSeller") ?
								<Route
									path="/a"
									element={
										<>
											<AdminNavbar />
											<Outlet />
										</>
									}>
									<Route path="/a/feedback" element={<FeedBack />} />
									<Route path="/a/orders" element={<AdminCart />} />
									<Route path="/a/dashboard" element={<Dashboard />} />
								</Route>
								: <Route path="/a/dashboard" element={<>NOT ALLOWED</>} />
						}
						<Route path="*" element={<>404</>} />
					</Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
