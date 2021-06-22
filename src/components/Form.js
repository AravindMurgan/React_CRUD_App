import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UseLocalStorage from '../hook/UseLocalStorage';
import ContactData from './ContactData';

toast.configure();
export default function Form() {
	const [state, setState] = useState({
		act: 0,
		index: 0,
		name: '',
		email: '',
		phone: '',
	});
	const [datas, setData] = UseLocalStorage('users', []);


	const onChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;

		setState({
			...state,
			[name]: value,
		});
	};

	const onSubmit = (e) => {
		e.preventDefault();

		const { name, email, phone } = state;
		

		if (name === '' || email === '' || phone === '') {
			toast.error('Please enter all fields');
		} else {
			setData([...datas, state]);

			setState({
				name: '',
				email: '',
				phone: '',
			});
		}
	};

	const onEdit = (idx) => {
		const editData = datas[idx];
		console.log(editData);

		setState({
			...state,
			act: 1,
			index: idx,
			name: editData.name,
			email: editData.email,
			phone: editData.phone,
		});
	};

	const onDelete = (idx) => {
		const dataArray = datas;
		dataArray.splice(idx, 1);

		setData([...dataArray]);
	};

	const onClear=()=>{
		const clearall = window.localStorage.clear('users')

		// setData([...clearall])
	}
	

	return (
		<div className='app'>
			<div className='container'>
				<h2>React CRUD Application</h2>
				<form type='submit' onSubmit={onSubmit} className='form' id='form'>
					<div className='form-control'>
						<label>Name</label>
						<input
							type='text'
							name='name'
							value={state.name}
							onChange={onChange}
						/>
					</div>
					<div className='form-control'>
						<label>Email</label>
						<input
							type='email'
							name='email'
							value={state.email}
							onChange={onChange}
						/>
					</div>
					<div className='form-control'>
						<label>Phone</label>
						<input
							type='number'
							name='phone'
							value={state.phone}
							onChange={onChange}
						/>
					</div>

					<button type='submit'>Submit </button>
				</form>
				<button onClick={onClear}>ClearAll </button>
			</div>
			{datas !== [] ? (
				<div className='container__2'>
					<ContactData datas={datas} onDelete={onDelete} onEdit={onEdit} />
				</div>
			) : (
				<h3>No contacts to show</h3>
			)}
		</div>
	);
}
