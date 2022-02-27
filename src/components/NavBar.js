import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

// Added font awesome icons for mobile icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const NavBar = () => {
	const router = useRouter();

	// Used to show the navigation bar on mobile/tablet
	const [showNavBar, setShowNavBar] = useState(false);

	/*
		Fix logo size and change size of nav items
	*/
	return (
		<nav className="sticky md:flex flex-row justify-between bg-sky-700 p-4 text-lg top-0 left-0 text-gray-200">
			<div className="flex items-center justify-between">
				<span className="lg:text-2xl md:text-xl sm:text-base mr-4 font-semibold">PlanEasy Takehome Test</span>
				<button
					onClick={() => {
						setShowNavBar(!showNavBar);
					}}
					className="md:hidden"
				>
					<FontAwesomeIcon icon={faBars} className="w-5" />
				</button>
			</div>
			<ul
				className={`${
					showNavBar ? "right-0" : "-right-full"
				} transition-right fixed space-y-5 p-3 w-5/12 sm:w-4/12 md:pr-8 pr-6 bg-opacity-90 pb-6 flex flex-col items-end mt-4 right-0 md:mt-0 bg-gray-800 md:static md:flex md:flex-row md:gap-4 md:font-medium md:bg-transparent md:w-auto md:space-y-0`}
			>
				<li>
					<Link href="/">
						<a className={`text-base hover:text-white hover:border-b ${router.pathname === "/" ? "border-b" : ""}`}>GuestBook</a>
					</Link>
				</li>
				<li>
					<Link href="/examples/formik">
						<a className={`text-base hover:text-white hover:border-b ${router.pathname === "/examples/formik" ? "border-b" : ""}`}>Formik Example</a>
					</Link>
				</li>
				<li>
					<Link href="/examples/urql">
						<a className={`text-base hover:text-white hover:border-b ${router.pathname === "/examples/urql" ? "border-b" : ""}`}>URQL Example</a>
					</Link>
				</li>
			</ul>
		</nav>
	);
};

export default NavBar;
