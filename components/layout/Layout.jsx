import {
	ScoreProvider,
	UserProvider,
	ScheduleProvider,
	AllScoresProvider,
	AllUsersProvider,
	CoursesProvider,
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
								<Navbar />
								<div>{children}</div>
								{/* <Footer /> */}
							</CoursesProvider>
						</AllScoresProvider>
					</AllUsersProvider>
				</ScheduleProvider>
			</ScoreProvider>
		</UserProvider>
	);
}
