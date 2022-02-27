import Head from "next/head";
import NavBar from "../components/NavBar";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import DisplayGuests from "../components/DisplayGuests";

const Home = () => {
	return (
		<>
			<Head>
				<title>Planeasy Takehome Test</title>
				<meta name="description" content="frontend for planeasy takehome test" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<NavBar />

			<main className="p-5 bg-gray-100 h-screen">
				<div className="pb-4">
					<Link href="/guestbook/create">
						<a className="bg-sky-600 hover:bg-sky-500 text-white rounded-md px-3 py-2 mr-auto mt-4">Create Booking</a>
					</Link>
				</div>
				<DisplayGuests />
				<Link href="/guestbook/create" passHref>
					<a>
						<FontAwesomeIcon
							icon={faPlus}
							className="hover:bg-sky-500 hover:border-sky-500 hover:cursor-pointer w-12 h-12 p-2 bg-sky-600 rounded-full right-0 fixed bottom-0 mb-6 mr-6 text-gray-100"
						/>
					</a>
				</Link>
			</main>
		</>
	);
};

export default Home;
