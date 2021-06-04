import Layout from '@/components/Layout'
import { API_URL } from '@/config/index'
import styles from '@/styles/Event.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { FaPencilAlt, FaTimes } from 'react-icons/fa'

export default function EventPage({ evt }) {
	const deleteEvent = (e) => {}

	return (
		<Layout>
			<div className={styles.event}>
				<div className={styles.controls}>
					<Link href={`/events/edit/${evt.id}`}>
						<a>
							<FaPencilAlt /> Edit Event
						</a>
					</Link>
					<a href='#' className={styles.delete} onClick={deleteEvent}>
						<FaTimes /> Delete Events
					</a>
				</div>

				<span>
					{new Date(evt.date).toLocaleDateString('en-US')} at{' '}
					{evt.time}
				</span>
				<h1>{evt.name}</h1>
				{evt.image && (
					<div className={styles.image}>
						<Image
							src={evt.image.formats.thumbnail.url}
							width={960}
							height={600}
						/>
					</div>
				)}

				<h3>Performers:</h3>
				<p>{evt.performers}</p>

				<h3>Description:</h3>
				<p>{evt.description}</p>

				<h3>Venue: {evt.venue}</h3>
				<p>{evt.address}</p>

				<Link href='/events'>
					<a className={styles.back}>{'<'} Go Back</a>
				</Link>
			</div>
		</Layout>
	)
}

export async function getStaticPaths() {
	const res = await fetch(`${API_URL}/events`)
	const events = await res.json()

	const paths = events.map((evt) => {
		return { params: { slug: evt.slug } }
	})

	return {
		paths, //indicates that no page needs be created at build time
		fallback: true, //indicates the type of fallback
	}
}

export async function getStaticProps({ params }) {
	const { slug } = params
	const res = await fetch(`${API_URL}/events?slug=${slug}`)
	const evt = (await res.json()) || []
	console.log('evt:', evt)

	return {
		props: { evt: evt[0] },
		revalidate: 1,
	}
}

// export async function getServerSideProps({ query: { slug } }) {
// 	const res = await fetch(`${API_URL}/events/${slug}`)
// 	const evt = await res.json()

// 	return {
// 		props: { evt },
// 	}
// }
