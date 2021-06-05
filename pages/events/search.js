import EventItem from '@/components/EventItem'
import Layout from '@/components/Layout'
import { API_URL } from '@/config/index'
import { useRouter } from 'next/router'
import Link from 'next/link'
import qs from 'qs'

export default function SearchPage({ events }) {
	const router = useRouter()
	const {
		query: { term },
	} = router

	return (
		<Layout title='Search Results'>
			<Link href='/events'>Go Back</Link>
			<h1>Search Results for {term}</h1>
			{events.map((evt) => (
				<EventItem key={evt.id} {...evt} />
			))}
		</Layout>
	)
}

export async function getServerSideProps({ query: { term } }) {
	const query = qs.stringify({
		_where: {
			_or: [
				{ name_contains: term },
				{ performers_contains: term },
				{ description_contains: term },
				{ venue_contains: term },
			],
		},
	})

	const res = await fetch(`${API_URL}/events?${query}`)
	const events = await res.json()
	return {
		props: { events },
	}
}
