import React, { useState, useEffect, useRef } from 'react';
import JSZip from 'jszip';

const App = () => {
	let zip = new JSZip();
	const [zipFile, setZipFile] = useState();
	const [stats, setStats] = useState([]);
	const [timelineObjects, setTimelineObjects] = useState([]);
	const [dateRange, setDateRange] = useState({ startDate: null, endDate: null });
	const isInitialMount = useRef(true);

	useEffect(() => {
		!isInitialMount.current && readFile();
	}, [zipFile, dateRange]);

	useEffect(() => {
		!isInitialMount.current && findDistance();
	}, [timelineObjects]);

	useEffect(() => {
		if (isInitialMount.current) isInitialMount.current = false;
	});

	const onChangeHandler = async event => {
		if (event.target.files.length === 0) return;

		const zipFile = await zip.loadAsync(event.target.files[0]);

		zipFile.remove('Takeout/Location History/Location History.json');
		zipFile.remove('Takeout/archive_browser.html');

		setZipFile(zipFile);
	};

	const readFile = async () => {
		const { startDate, endDate } = dateRange;
		let tempFiles = [];
		await Promise.all(
			Object.keys(zipFile.files).map(async filename => {
				const fileData = await zipFile.files[filename].async('blob');
				const reader = new FileReader();

				reader.onload = e => tempFiles.push(...JSON.parse(e.target.result).timelineObjects);

				const [takeout, location, semantic, year] = filename.split('/');
				if (
					takeout === 'Takeout' &&
					location === 'Location History' &&
					semantic === 'Semantic Location History' &&
					((!startDate && !endDate) ||
						(startDate && !endDate && year >= startDate) ||
						(!startDate && endDate && year <= endDate) ||
						(startDate && endDate && year >= startDate && year <= endDate))
				)
					reader.readAsText(new File([fileData], filename));
			})
		);

		setTimelineObjects(tempFiles);
	};

	const findDistance = () => {
		setStats(
			timelineObjects.reduce(
				(acc, curr) => {
					const { activitySegment } = curr;
					if (activitySegment && activitySegment.distance) {
						const { distance, duration, activityType } = activitySegment;
						const timeSpent = duration.endTimestampMs - duration.startTimestampMs;

						switch (activityType) {
							case 'WALKING':
								acc.walking += distance;
								acc.timeSpentWalking += timeSpent;
                break;
              case 'CYCLING':
                acc.cycling += distance;
                acc.timeSpentCycling += timeSpent;
                break
							case 'IN_TRAIN':
							case 'IN_SUBWAY':
							case 'IN_TRAM':
								acc.train += distance;
								acc.timeSpentTrain += timeSpent;
								break;
							case 'IN_BUS':
								acc.bus += distance;
								acc.timeSpentBus += timeSpent;
								break;
							case 'IN_PASSENGER_VEHICLE':
								acc.car += distance;
								acc.timeSpentCar += timeSpent;
								break;
							case 'FLYING':
								acc.flying += distance;
								acc.timeSpentFlying += timeSpent;
								break;
							default:
								acc.other += distance;
								acc.timeSpentOther += timeSpent;
								break;
						}
						acc.total += distance;
						acc.timeTotal += timeSpent;
					}
					return acc;
				},
				{
					total: 0,
          walking: 0,
          cycling: 0,
					train: 0,
					bus: 0,
					car: 0,
					flying: 0,
					other: 0,
					timeTotal: 0,
          timeSpentWalking: 0,
          timeSpentCycling: 0,
					timeSpentOther: 0,
					timeSpentTrain: 0,
					timeSpentBus: 0,
					timeSpentCar: 0,
					timeSpentFlying: 0
				}
			)
		);
	};

	const millisecondsToHours = ms => Math.round((ms / 1000 / 60 / 60) * 100) / 100;
	const {
    walking,
    cycling,
		train,
		bus,
		car,
		flying,
		other,
		total,
		timeSpentWalking,
		timeSpentCycling,
		timeSpentOther,
		timeSpentTrain,
		timeSpentBus,
		timeSpentCar,
		timeSpentFlying,
		timeTotal
	} = stats;

	const { startDate, endDate } = dateRange;

	return (
		<div className='App'>
			<div className='container'>
				<div className='row justify-content-center'>
					<div className='col-md-10'>
						<form method='post' action='#' id='#'>
							<div className='form-group files'>
								<label>Upload Your File </label>
								<input type='file' className='form-control' multiple='' onChange={onChangeHandler} />
							</div>
						</form>
					</div>
				</div>
				<div className='row justify-content-center'>
					<button onClick={() => setDateRange({ startDate: null, endDate: null })}>All</button>
					<button onClick={() => setDateRange({ startDate: 2017, endDate: 2017 })}>2017</button>
					<button onClick={() => setDateRange({ startDate: 2018, endDate: 2018 })}>2018</button>
					<button onClick={() => setDateRange({ startDate: 2019, endDate: 2019 })}>2019</button>
					<button onClick={() => setDateRange({ startDate: 2020, endDate: 2020 })}>2020</button>
					<button onClick={() => setDateRange({ startDate: 2021, endDate: 2021 })}>2021</button>
					<button onClick={() => setDateRange({ startDate: 2022, endDate: 2022 })}>2022</button>
				</div>
				<div className='row justify-content-center'>
					{startDate && endDate && `Date Range: ${dateRange.startDate} to ${dateRange.endDate}`}
				</div>
				<div className='row justify-content-center'>
					{timelineObjects.length > 0 && (
						<div className='row'>
							<ul>
								<li>
									<strong>Distance walked: </strong>
									{walking / 1000} km
								</li>
                <li>
									<strong>Distance cycled: </strong>
									{cycling / 1000} km
								</li>
								<li>
									<strong>Distance in train: </strong>
									{train / 1000} km
								</li>
								<li>
									<strong>Distance in bus: </strong>
									{bus / 1000} km
								</li>
								<li>
									<strong>Distance in car: </strong>
									{car / 1000} km
								</li>
								<li>
									<strong>Distance in air: </strong>
									{flying / 1000} km
								</li>
								<li>
									<strong>Distance other: </strong>
									{other / 1000} km
								</li>
								<li>
									<strong>Distance total: </strong>
									{total / 1000} km
								</li>
								<li>
									<strong>Time spent walking: </strong>
									{millisecondsToHours(timeSpentWalking)} hours
								</li>
								<li>
									<strong>Time spent cycling: </strong>
									{millisecondsToHours(timeSpentCycling)} hours
								</li>
								<li>
									<strong>Time spent in train: </strong>
									{millisecondsToHours(timeSpentTrain)} hours
								</li>
								<li>
									<strong>Time spent in bus: </strong>
									{millisecondsToHours(timeSpentBus)} hours
								</li>
								<li>
									<strong>Time spent in car: </strong>
									{millisecondsToHours(timeSpentCar)} hours
								</li>
								<li>
									<strong>Time spent flying: </strong>
									{millisecondsToHours(timeSpentFlying)} hours
								</li>
								<li>
									<strong>Time spent in other: </strong>
									{millisecondsToHours(timeSpentOther)} hours
								</li>
								<li>
									<strong>Time spent total: </strong>
									{millisecondsToHours(timeTotal)} hours
								</li>
							</ul>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default App;
