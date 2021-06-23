import React, { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UseLocalStorage from '../hook/UseLocalStorage';
import ContactData from './ContactData';

///toast-lib for alerts
toast.configure();

export default function Form() {
	//contact-data
	const [state, setState] = useState({
		act: 0,
		index: 0,
		name: '',
		email: '',
		phone: '',
	});

	//contact-array of Objects with custom hook 
	const [datas, setData] = UseLocalStorage('users', []);

	//ref for updating state//
	const inputEl = useRef(null);

	//state-changes//
	const onChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;

		setState({
			...state,
			[name]: value,
		});
	};

	//form-submit//
	const onSubmit = (e) => {
		e.preventDefault();

		if (state.name === '' || state.email === '' || state.phone === '') {
			toast.error('Please enter all fields', { autoClose: 3000 });
		} else {
			let form = inputEl.current;

			let dataArr = datas;
			let name = form['name'].value;
			let email = form['email'].value;
			let phone = form['phone'].value;

			if (state.act === 0) {
				let data = {
					name,
					email,
					phone,
				};
				dataArr.push(data);
			} else {
				let index = state.index;
				dataArr[index].name = name;
				dataArr[index].email = email;
				dataArr[index].phone = phone;
			}

			setData([...dataArr]);
			setState({ act: 0, name: '', email: '', phone: '' });
		}
	};

	//form-edit///
	const onEdit = (idx) => {
		const editData = datas[idx];
		console.log(editData);
		const form = inputEl.current;
		form['name'].value = editData.name;
		form['email'].value = editData.email;
		form['phone'].value = editData.phone;

		setState({
			act: 1,
			index: idx,
		});

		console.log(state);
	};


	///form-delete///
	const onDelete = (idx) => {
		const dataArray = datas;
		dataArray.splice(idx, 1);

		setData([...dataArray]);
	};

	///JSX//
	return (
		<div className='app'>
			<div className='container'>
				<h2>React CRUD Application</h2>
				<form
					type='submit'
					onSubmit={onSubmit}
					className='form'
					id='form'
					ref={inputEl}
				>
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
			</div>

			{/* conditionally render component */}
			{datas != [] ? (
				<div className='container__2'>
					<ContactData datas={datas} onDelete={onDelete} onEdit={onEdit} />
				</div>
			) : (
				<h3>No contacts to show</h3>
			)}
		</div>
	);
}
