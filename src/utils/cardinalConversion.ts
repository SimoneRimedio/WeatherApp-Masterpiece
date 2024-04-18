const getDirection = ( angle: number) => {
    let directions = ["N","NNE","NE","ENE","E",
		"ESE", "SE", "SSE","S",
		"SSW","SW","WSW","W",
		"WNW","NW","NNW" ];
	
	let section = Math.floor(angle / 22.5 + 0.5) % 16 ;

	return directions[ section ];
}

export default getDirection;