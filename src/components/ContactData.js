import React from 'react';

export default function ContactData({ datas, onEdit, onDelete }) {
	return (
		<div>
			
			{datas.map((data, idx) => (
				<ul key={idx} className='card shadow1'>
					<li className='li__data'>
						<h3>Name:{data.name} </h3>
						<p>email:{data.email} </p>
						<p>phone:{data.phone} </p>

						<div>
							<button onClick={() => onEdit(idx)} className='btn btn-primary'>
								Edit
							</button>
							<button onClick={() => onDelete(idx)} className='btn btn-dark'>
								{' '}
								Delete{' '}
							</button>
						</div>
					</li>
				</ul>
			))}
		</div>
	);
}
