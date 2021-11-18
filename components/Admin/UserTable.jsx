import { PencilIcon, TrashIcon } from '@heroicons/react/outline';
import EditUser from '../Modals/EditUser';
import { useState } from 'react';
import { useAllUsersContext } from '@/context/Store';
import RegisterUser from '../Modals/RegisterUser';
import DeleteUser from '../Modals/DeleteUser';
import SaveFail from '../Notifications/SaveFail';
import SaveSuccess from '../Notifications/SaveSuccess';

export default function UserTable() {
	const [editUserOpen, setEditUserOpen] = useState(false);
	const [addUserOpen, setAddUserOpen] = useState(false);
	const [deleteUserOpen, setDeleteUserOpen] = useState(false);
	const [userSelected, setUserSelected] = useState();
	const [success, setSuccess] = useState(false);
	const [failure, setFailure] = useState(false);
	const users = useAllUsersContext();

	return (
		<div className='flex flex-col'>
			{editUserOpen ? (
				<EditUser
					open={editUserOpen}
					setOpen={setEditUserOpen}
					user={userSelected}
					setFailure={setFailure}
					setSuccess={setSuccess}
				/>
			) : null}
			{addUserOpen ? (
				<RegisterUser
					open={addUserOpen}
					setOpen={setAddUserOpen}
					setFailure={setFailure}
					setSuccess={setSuccess}
				/>
			) : null}
			{deleteUserOpen ? (
				<DeleteUser
					open={deleteUserOpen}
					setOpen={setDeleteUserOpen}
					user={userSelected}
					setFailure={setFailure}
					setSuccess={setSuccess}
				/>
			) : null}

			{success ? <SaveSuccess show={success} setShow={setSuccess} /> : null}

			{failure ? <SaveFail show={failure} setShow={setFailure} /> : null}

			<div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
				<div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
					<button
						onClick={() => setAddUserOpen(!addUserOpen)}
						className='inline-flex items-center px-6 py-2 border border-transparent text-sm rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mb-4'
					>
						Add New Golfer
					</button>
					<div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>
						<table className='min-w-full divide-y divide-gray-200'>
							<thead className='bg-gray-50'>
								<tr>
									<th
										scope='col'
										className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
									>
										ID
									</th>
									<th
										scope='col'
										className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
									>
										Name
									</th>
									<th
										scope='col'
										className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
									>
										Email
									</th>
									<th scope='col' className='relative px-6 py-3'>
										<span className='sr-only'>Edit</span>
									</th>
								</tr>
							</thead>
							<tbody>
								{users.map((user, userIdx) => (
									<tr
										key={user.email}
										className={userIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
									>
										<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
											{user.id}
										</td>
										<td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
											{user.first_name} {user.last_name}
										</td>
										<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
											{user.email}
										</td>
										<td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
											<button
												onClick={() => {
													setUserSelected(user);
													setEditUserOpen(!editUserOpen);
												}}
												className='group flex items-center px-3 py-2 text-sm font-medium w-full'
											>
												<PencilIcon
													className='text-gray-400 group-hover:text-gray-500
									 flex-shrink-0 h-6 w-6'
												/>
											</button>
										</td>
										<td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
											<button
												onClick={() => {
													setUserSelected(user);
													setDeleteUserOpen(!deleteUserOpen);
												}}
												className='group flex items-center px-3 py-2 text-sm font-medium w-full'
											>
												<TrashIcon
													className='text-gray-400 group-hover:text-gray-500
									flex-shrink-0 h-6 w-6'
												/>
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
}
