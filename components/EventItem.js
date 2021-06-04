import styles from '@/styles/EventItem.module.css'
import Image from 'next/image'
import Link from 'next/link'

export default function EventItem({ image, name, date, time, slug }) {
	return (
		<div className={styles.event}>
			<div className={styles.img}>
				<Image
					src={
						image
							? image.formats.thumbnail.url
							: '/images/event-default.png'
					}
					width={170}
					height={100}
				/>
			</div>
			<div className={styles.info}>
				<span>
					{new Date(date).toLocaleDateString('en-US')} at {time}
				</span>
				<h3>{name}</h3>
			</div>
			<div className={styles.link}>
				<Link href={`/events/${slug}`}>
					<a href='' className='btn'>
						Details
					</a>
				</Link>
			</div>
		</div>
	)
}
