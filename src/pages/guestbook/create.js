import React from "react";
import Head from "next/head";
import NavBar from "../../components/NavBar";
import GuestEntryForm from "../../components/GuestEntryForm";

/*
	Note: This should call GuestEntryForm to create a new guest entry
*/

const create = () => {
	return (
		<>
			<Head>
				<title>Planeasy Takehome Test - Create Post</title>
			</Head>

			<NavBar />

			<main className="p-5 pt-[3rem] bg-gray-100 h-screen">
				<GuestEntryForm />
			</main>
		</>
	);
};

export default create;
