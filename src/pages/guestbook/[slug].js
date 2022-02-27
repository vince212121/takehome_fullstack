import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import NavBar from "../../components/NavBar";
import DisplayGuestBySlug from "../../components/DisplayGuestBySlug";

/*
	Note: 
	- This should be called by index.js to display the query for all guests
	- When you click on each item, it should take you to the slug file to view
	the individual guest booking.
	- This should use the query to get a specific slug UUID
	- There should be a delete button as well

	- The [slug] allows it to be used with dynamic routing
		- https://nextjs.org/docs/routing/dynamic-routes

*/

const ViewPost = () => {
	const router = useRouter();

	return (
		<>
			<Head>
				<title>Planeasy Takehome Test - View Post</title>
			</Head>

			<NavBar />

			<main className="p-5 bg-gray-100 h-screen ">
				<DisplayGuestBySlug slug={router.query.slug}/>
			</main>
		</>
	);
};

export default ViewPost;
