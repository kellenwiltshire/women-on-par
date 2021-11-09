import {
	ScoreProvider,
	UserProvider,
	ScheduleProvider,
	AllScoresProvider,
	AllUsersProvider,
	CoursesProvider,
	NewsProvider,
} from '@/context/Store';
import React from 'react';
import Navbar from './Navbar';

export default function Layout({ children }) {
	return (
		<UserProvider>
			<ScoreProvider>
				<ScheduleProvider>
					<AllUsersProvider>
						<AllScoresProvider>
							<CoursesProvider>
								<NewsProvider>
									<Navbar />
									<div>{children}</div>
									{/* <Footer /> */}
								</NewsProvider>
							</CoursesProvider>
						</AllScoresProvider>
					</AllUsersProvider>
				</ScheduleProvider>
			</ScoreProvider>
		</UserProvider>
	);
}
