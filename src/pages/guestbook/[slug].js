import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import NavBar from "../../components/NavBar";
import DisplayGuestBySlug from "../../components/DisplayGuestBySlug";

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
