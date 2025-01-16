'use client';
import { Header } from '@/components/Header/Header';
import { SingleNote } from '@/components/SingleNote/SingleNote';
import { useGetNote } from '@/hooks/useGet';

export default function Dashboard() {
	const { notes, reloadNotes } = useGetNote();

	return (
		<section className='flex flex-col h-screen max-w-screen-lg mx-auto'>
			<div className='p-4'>
				<Header onCreateNote={reloadNotes} />
				<main className='flex h-full flex-col gap-8 row-start-2 mt-10 items-center sm:items-start'>
					<ul className='flex flex-row flex-1 flex-wrap justify-between'>
						{notes?.map((note, index) => (
							<li key={`${note.id}-${index}`}>
								<SingleNote note={note} onModalClose={reloadNotes} />
							</li>
						))}
					</ul>
				</main>
			</div>
			<div id='modal-root' />
		</section>
	);
}
