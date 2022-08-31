import React from 'react';

export const Loader = () => {
	return (
		<div className='spinner-wrapper'>
			<div className='spinner'>
				Loading
				<div className='spinner-sector spinner-sector-red'></div>
				<div className='spinner-sector spinner-sector-blue'></div>
				<div className='spinner-sector spinner-sector-green'></div>
				<div className='spinner-sector spinner-sector-yellow'></div>
			</div>
		</div>
	);
};
