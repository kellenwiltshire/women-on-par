/* 

Info needed for Scheduler:

-Golfer - Name, Tee Time Restriction, Car Pool
-Date and Tee Time
-Course - Interval

Probable Steps: 

1 - Randomize list of golfers - Doing this to make sure the list is different every time and not based on Alphabetical or "join" order
2 - Take this list and start iterating through it putting golfers into Tee Time Objects to go into Array
3 - At each Golfer check to see if they have a Tee Time Restriction or Car Pool Condition - If no restrictions, then golfer added to Tee Time. Once Tee Time gets 4 golfers, then that Tee Time is placed into Final Array and Tee Time is incremented by the Course interval and a new Object is created
4 - If Golfer has a Tee Time Restriction, put that golfer at a random new position in Golfer Array. If the Golfer has a Car Pool Condition, find that person in the array and move their position to be Curr Golfer position plus random number between 1 and 10 to make sure that they are close enough for waiting time
5 - Continue until all Golfers are put into Tee Time Object

Layout of Final Array Objects:
Tee Time: TIME
GolferOne: NAME
GolferTwo: NAME
GolferThree: NAME
GolferFour: NAME

*/

const golfers = [
	{ name: 'Player One', carpool: '', teeTime: false },
	{ name: 'Player Two', carpool: 'Player Nine', teeTime: false },
	{ name: 'Player Three', carpool: '', teeTime: false },
	{ name: 'Player Four', carpool: '', teeTime: true },
	{ name: 'Player Five', carpool: 'Player Five', teeTime: false },
	{ name: 'Player Six', carpool: '', teeTime: false },
	{ name: 'Player Seven', carpool: '', teeTime: false },
	{ name: 'Player Eight', carpool: '', teeTime: false },
	{ name: 'Player Nine', carpool: 'Player Two', teeTime: false },
	{ name: 'Player Ten', carpool: '', teeTime: true },
	{ name: 'Player Eleven', carpool: '', teeTime: false },
	{ name: 'Player Twelve', carpool: '', teeTime: false },
	{ name: 'Player Thirteen', carpool: 'Player Five', teeTime: false },
	{ name: 'Player Fourteen', carpool: '', teeTime: false },
];

const schedule = { startTime: '16:00' };

const course = { interval: 7 };

generateSchedule(golfers, schedule, course);

export default function generateSchedule(golfers, schedule, course) {
	return teeTimes;
}
