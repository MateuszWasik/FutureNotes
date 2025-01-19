import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { NotesContextProvider } from '@/components/NotesContextProvider/NotesContextProvider';
import { ThemeSelector } from '@/components/ThemeSelector/ThemeSelector';
import { ThemeProvider } from '@/components/ThemeProvider/ThemeProvider';

const inter_init = Inter({
	subsets: ['latin'],
	display: 'swap',
	style: 'normal',
	weight: ['400', '500', '600', '700', '900'],
});

export const metadata: Metadata = {
	title: 'SurfeNotes - Surfe through notes',
	description: 'Surfe way of taking notes',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en' className='light'>
			<body
				className={`${inter_init.className} relative bg-sky100 antialiased`}
			>
				<ThemeProvider>
					<ThemeSelector />
					<NotesContextProvider>{children}</NotesContextProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
