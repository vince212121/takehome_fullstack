import { gql, useQuery } from "urql";
import Link from "next/link";
import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";

const GUESTS_QUERY = gql`
	query ($first: Int!, $after: String!) {
		guests(first: $first, after: $after) {
			pageInfo {
				startCursor
				endCursor
				hasNextPage
				hasPreviousPage
			}
			edges {
				cursor
				node {
					id
					slug
					username
					message
					createdAt
				}
			}
		}
	}
`;

const DisplayGuests = () => {
    // Keeps track of pagination
	const [guestsPerPage] = useState(8);
	const [currentPage, setCurrentPage] = useState(1);
	const [startCursor, setStartCursor] = useState("");

    // Query for fetching all the guest bookings
	const [guestsResult, reexecuteQuery] = useQuery({
		query: GUESTS_QUERY,
		variables: { first: guestsPerPage, after: startCursor },
		requestPolicy: "cache-and-network",
	});

	if (guestsResult.fetching) return null;

	if (guestsResult.error) {
		console.error(guestsResult.error);
		return <div className="flex flex-row justify-center items-center h-screen w-screen">Error querying all guests endpoint</div>;
	} else {
		console.log(guestsResult);
	}

    // Goes up a page
	const paginateUp = () => {
		setCurrentPage(currentPage + 1);
		setStartCursor(guestsResult?.data?.guests?.pageInfo?.endCursor);
		reexecuteQuery();
	};

    // Goes back to the page 1
	const paginateToOriginalPage = () => {
		setCurrentPage(1);
		setStartCursor("");
		reexecuteQuery();
	};

	return (
		<>
			{guestsResult?.data?.guests?.edges?.map((guest) => (
				<Link href="/guestbook/[slug]" as={`/guestbook/${guest.node.slug}`} key={guest.node.slug} passHref>
					<div className="flex flex-col mt-2 border rounded p-4 bg-white hover:bg-gray-100 shadow-sm cursor-pointer">
						<span>
							{guest.node.username} - {guest.node.message}
						</span>
					</div>
				</Link>
			))}

			<div className="flex flex-col justify-center items-center mt-4">
				<div className="flex">
					<button
						className={`w-8 h-8 p-2 ${currentPage === 1 ? "hidden" : ""} ${guestsResult?.data?.guests?.pageInfo?.hasPreviousPage ? "" : ""}`}
						onClick={paginateToOriginalPage}
					>
						<div className="flex">
							<FontAwesomeIcon icon={faChevronLeft} />
							<FontAwesomeIcon icon={faChevronLeft} />
						</div>
					</button>
					<p className="text-base border-2 border-sky-500 py-1 px-3 rounded-xl">{currentPage}</p>
					<button
						className={`w-8 h-8 p-2 ${guestsResult?.data?.guests?.pageInfo?.hasNextPage ? "" : "text-gray-600"}`}
						disabled={!guestsResult?.data?.guests?.pageInfo?.hasNextPage ? true : false}
						onClick={paginateUp}
					>
						<FontAwesomeIcon icon={faChevronRight} />
					</button>
				</div>
			</div>
		</>
	);
};

export default DisplayGuests;
