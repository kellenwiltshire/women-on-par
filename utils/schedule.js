const golfers = [
	{ first_name: 'Player', last_name: 'One', carpool: '', teeTime: false },
	{
		first_name: 'Player',
		last_name: 'Two',
		carpool: 'Player Nine',
		teeTime: false,
	},
	{ first_name: 'Player', last_name: 'Three', carpool: '', teeTime: false },
	{ first_name: 'Player', last_name: 'Four', carpool: '', teeTime: true },
	{
		first_name: 'Player',
		last_name: 'Five',
		carpool: 'Player Thirteen',
		teeTime: false,
	},
	{ first_name: 'Player', last_name: 'Six', carpool: '', teeTime: false },
	{ first_name: 'Player', last_name: 'Seven', carpool: '', teeTime: false },
	{ first_name: 'Player', last_name: 'Eight', carpool: '', teeTime: false },
	{
		first_name: 'Player',
		last_name: 'Nine',
		carpool: 'Player Two',
		teeTime: false,
	},
	{ first_name: 'Player', last_name: 'Ten', carpool: '', teeTime: true },
	{ first_name: 'Player', last_name: 'Eleven', carpool: '', teeTime: false },
	{ first_name: 'Player', last_name: 'Twelve', carpool: '', teeTime: false },
	{
		first_name: 'Player',
		last_name: 'Thirteen',
		carpool: 'Player Five',
		teeTime: false,
	},
	{ first_name: 'Player', last_name: 'Fourteen', carpool: '', teeTime: false },
	{ first_name: 'Player', last_name: 'Fifteen', carpool: '', teeTime: false },
	{ first_name: 'Player', last_name: 'Sixteen', carpool: '', teeTime: false },
	{ first_name: 'Player', last_name: 'Seventeen', carpool: '', teeTime: false },
	{ first_name: 'Player', last_name: 'Eighteen', carpool: '', teeTime: true },
	{ first_name: 'Player', last_name: 'Nineteen', carpool: '', teeTime: false },
	{ first_name: 'Player', last_name: 'Twenty', carpool: '', teeTime: false },
	{ first_name: 'Player', last_name: 'Twentyone', carpool: '', teeTime: false },
	{ first_name: 'Player', last_name: 'Twentytwo', carpool: '', teeTime: false },
	{
		first_name: 'Player',
		last_name: 'Twentythree',
		carpool: '',
		teeTime: false,
	},
	{ first_name: 'Player', last_name: 'TwentyFour', carpool: '', teeTime: true },
	{
		first_name: 'Player',
		last_name: 'TwentyFive',
		carpool: '',
		teeTime: false,
	},
	{ first_name: 'Player', last_name: 'TwentySix', carpool: '', teeTime: false },
	{
		first_name: 'Player',
		last_name: 'TwentySeven',
		carpool: '',
		teeTime: false,
	},
	{
		first_name: 'Player',
		last_name: 'TwentyEight',
		carpool: '',
		teeTime: false,
	},
	{
		first_name: 'Player',
		last_name: 'TwentyNine',
		carpool: '',
		teeTime: false,
	},
	{ first_name: 'Player', last_name: 'Thirty', carpool: '', teeTime: false },
	{ first_name: 'Player', last_name: 'ThirtyOne', carpool: '', teeTime: false },
	{ first_name: 'Player', last_name: 'ThirtyTwo', carpool: '', teeTime: true },
	{
		first_name: 'Player',
		last_name: 'ThirtyThree',
		carpool: '',
		teeTime: false,
	},
	{
		first_name: 'Player',
		last_name: 'ThirtyFour',
		carpool: '',
		teeTime: false,
	},
	{
		first_name: 'Player',
		last_name: 'ThirtyFive',
		carpool: '',
		teeTime: false,
	},
	{ first_name: 'Player', last_name: 'ThirtySix', carpool: '', teeTime: false },
	{
		first_name: 'Player',
		last_name: 'ThirtySeven',
		carpool: '',
		teeTime: false,
	},
	{
		first_name: 'Player',
		last_name: 'ThirtyEight',
		carpool: '',
		teeTime: true,
	},
	{
		first_name: 'Player',
		last_name: 'ThirtyNine',
		carpool: '',
		teeTime: false,
	},
	{ first_name: 'Player', last_name: 'Forty', carpool: '', teeTime: false },
	{ first_name: 'Player', last_name: 'FortyOne', carpool: '', teeTime: false },
	{ first_name: 'Player', last_name: 'FortyTwo', carpool: '', teeTime: false },
	{
		first_name: 'Player',
		last_name: 'FortyThree',
		carpool: '',
		teeTime: false,
	},
	{ first_name: 'Player', last_name: 'FortyFour', carpool: '', teeTime: false },
	{ first_name: 'Player', last_name: 'FortyFive', carpool: '', teeTime: false },
	{ first_name: 'Player', last_name: 'FortySix', carpool: '', teeTime: true },
	{
		first_name: 'Player',
		last_name: 'FortySeven',
		carpool: '',
		teeTime: false,
	},
	{
		first_name: 'Player',
		last_name: 'FortyEight',
		carpool: '',
		teeTime: false,
	},
	{ first_name: 'Player', last_name: 'FORTYNINE', carpool: '', teeTime: false },
	{ first_name: 'Player', last_name: 'FIFTY', carpool: '', teeTime: false },
	{ first_name: 'Player', last_name: 'FIFTYONE', carpool: '', teeTime: false },
	{ first_name: 'Player', last_name: 'FIFTYTWO', carpool: '', teeTime: true },
	{
		first_name: 'Player',
		last_name: 'FIFTYTHREE',
		carpool: '',
		teeTime: false,
	},
];
const randomizeGolfers = (golfers) => {
	let currentIndex = golfers.length,
		randomIndex;

	//While there remains elements to shuffle
	while (currentIndex !== 0) {
		//Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		//and swap it with the current element
		[golfers[currentIndex], golfers[randomIndex]] = [
			golfers[randomIndex],
			golfers[currentIndex],
		];
	}

	return golfers;
};

const addTimeInterval = (currTime, interval) => {
	let times = [0, 0, 0];
	let max = times.length;

	let a = currTime.split(':');
	let b = interval.split(':');

	//normalize values
	for (let i = 0; i < max; i++) {
		a[i] = isNaN(parseInt(a[i])) ? 0 : parseInt(a[i]);
		b[i] = isNaN(parseInt(b[i])) ? 0 : parseInt(b[i]);
	}

	//store values
	for (let i = 0; i < max; i++) {
		times[i] = a[i] + b[i];
	}

	let hours = times[0];
	let minutes = times[1];
	let seconds = times[2];

	if (seconds >= 60) {
		let m = (seconds / 60) << 0;
		minutes += m;
		seconds -= 60 * m;
	}

	if (minutes >= 60) {
		let h = (minutes / 60) << 0;
		hours += h;
		minutes -= 60 * h;
	}

	return (
		('0' + hours).slice(-2) +
		':' +
		('0' + minutes).slice(-2) +
		':' +
		('0' + seconds).slice(-2)
	);
};

const testTime = (time) => {
	let times = [0, 0, 0];
	let max = times.length;

	let a = time.split(':');

	//normalize values
	for (let i = 0; i < max; i++) {
		a[i] = isNaN(parseInt(a[i])) ? 0 : parseInt(a[i]);
	}

	//store values
	for (let i = 0; i < max; i++) {
		times[i] = a[i];
	}

	let hours = times[0];
	let minutes = times[1];

	if (hours >= 16 && minutes >= 30) {
		return true;
	} else {
		return false;
	}
};

const filterArray = (arr1, arr2) => {
	const filtered = arr1.filter((el) => {
		return arr2.indexOf(el) === -1;
	});
	return filtered;
};

export default function generateSchedule(golfers, schedule, course) {
	//Deterime Max Golfers
	const maxGolfers = course.timeslots * 4 || 12 * 4;

	//Create initial Variables
	const initialGolfers = golfers;
	const initialStartTime = schedule.start_time;
	const interval = '00:' + ('0' + course.interval).slice(-2) + ':00';

	//Create the Waiting List and Usuable Golfers Array
	let waitingList = [];
	let usableGolfers = [];

	//Create Final Array to be filled
	let finalTeeTimeArray = [];

	//More initial variables to be filled and changed
	let currTime = initialStartTime;
	let group = { teeTime: currTime, golfers: [] };
	let groupNum = 0;

	//Trim the list of golfers if there is more than the max number of golfers
	if (initialGolfers.length > maxGolfers) {
		while (initialGolfers.length > maxGolfers) {
			console.log('Waiting List Added');
			waitingList.push(initialGolfers[golfers.length - 1]);
			initialGolfers.pop();
		}
		usableGolfers = randomizeGolfers(golfers);
	} else {
		usableGolfers = randomizeGolfers(golfers);
	}

	//Make a first pass of the golfers to filter out those with a tee time restriction
	let teeTimeRestrictions = [];
	let unrestrictedGolfers = [];
	usableGolfers.forEach((golfer) => {
		golfer.teeTime
			? teeTimeRestrictions.push(golfer)
			: unrestrictedGolfers.push(golfer);
	});

	//Start filling a new Golfer Array with unrestricted golfers until it passes the time restriction
	let timeTestPassed = false;
	let newGolferArray = [];
	unrestrictedGolfers.forEach((golfer) => {
		if (!timeTestPassed) {
			if (groupNum < 3) {
				console.log('Added to Array');
				newGolferArray.push(golfer);
				groupNum++;
			} else if (groupNum === 3) {
				console.log('Added to Array');
				newGolferArray.push(golfer);
				currTime = addTimeInterval(currTime, interval);
				console.log(currTime);
				const timeTest = testTime(currTime);
				console.log(timeTest);
				if (timeTest) {
					timeTestPassed = true;
					console.log('It is Passed 4:30');
					//Once it is passed the time restriction of 4:30 combine the rest of the unrestricted golfers and restricted golfers, then randomize. Then add this one the end of the already scheduled golfers
					const combineArray = teeTimeRestrictions.concat(unrestrictedGolfers);
					console.log('Combine Array: ', combineArray);
					const filteredArray = filterArray(combineArray, newGolferArray);
					const randomFilteredArray = randomizeGolfers(filteredArray);
					newGolferArray = newGolferArray.concat(randomFilteredArray);
				} else {
					groupNum = 0;
					console.log('reset');
				}
			}
		}
	});

	//Reset the variables
	groupNum = 0;
	currTime = schedule.start_time;

	//Before setting final tee times will need to iterate through array and look for car pooling people. Once one is found, will need to find the matching person and splice them out of their current position (unless within 1-12 golfers away from original person) and splice them back in at a random interval (1-12) from original golfer to make sure they are within 3 tee times of eachother

	for (let i = 0; i < newGolferArray.length; i++) {
		let name = '';
		if (newGolferArray[i].carpool) {
			name = newGolferArray[i].carpool;
			const golferIndex = newGolferArray.findIndex((obj) => {
				const golferName = `${obj.first_name} ${obj.last_name}`;
				if (golferName === name) {
					return true;
				}

				return false;
			});

			if (golferIndex > i) {
				if (golferIndex > i + 11) {
					const newPosition = Math.floor(Math.random() * 11);
					const golferMoving = newGolferArray[golferIndex];
					newGolferArray.splice(golferIndex, 1);
					newGolferArray.splice(newPosition + i, 0, golferMoving);
				}
			}
		}
	}

	console.log('New Golfer Array: ', newGolferArray);

	//Finally iterate through the golfer array and place them in their tee time slots.
	newGolferArray.forEach((golfer, i) => {
		if (groupNum < 3) {
			group.golfers.push(golfer);
			groupNum++;
			if (i === newGolferArray.length - 1) {
				finalTeeTimeArray.push(group);
			}
		} else {
			group.golfers.push(golfer);
			currTime = addTimeInterval(currTime, interval);
			finalTeeTimeArray.push(group);
			group = { teeTime: currTime, golfers: [] };
			groupNum = 0;
		}
	});

	console.log('Tee times: ', finalTeeTimeArray);

	const finalSchedule = {
		teeTimeSchedule: finalTeeTimeArray,
		waitingList: waitingList,
	};

	return finalSchedule;
}
