import Layout from '@/components/Layout'
import { API_URL } from '@/config/index'

export default function EventPage({ evt }) {
	return (
		<Layout>
			<h1> {evt.name} </h1>
		</Layout>
	)
}

export async function getStaticPaths() {
	const res = await fetch(`${API_URL}/api/events`)
	const events = await res.json()

	const paths = events.map((evt) => {
		return { params: { slug: evt.slug } }
	})
	console.log('paths:', paths)
	return {
		paths, //indicates that no page needs be created at build time
		fallback: true, //indicates the type of fallback
	}
}

export async function getStaticProps({ params }) {
	const { slug } = params
	const res = await fetch(`${API_URL}/api/events/${slug}`)
	const evt = await res.json()
	console.log('evt:', evt)

	return {
		props: { evt },
		revalidate: 1,
	}
}

// export async function getServerSideProps({ query: { slug } }) {
// 	const res = await fetch(`${API_URL}/api/events/${slug}`)
// 	const evt = await res.json()

// 	return {
// 		props: { evt },
// 	}
// }
