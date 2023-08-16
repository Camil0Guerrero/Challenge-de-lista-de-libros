interface HeaderProps {
	handleFilter: (e: React.ChangeEvent<HTMLSelectElement>) => void
	gendersList: Set<string>
}

function Header({ handleFilter, gendersList }: HeaderProps) {
	return (
		<>
			<h1>Prueba 1</h1>
			<aside>
				<label>
					Géneros:{' '}
					<select name='gender' id='gender' onChange={handleFilter}>
						<option value=''>Sin filtro</option>
						{[...gendersList].map(gender => (
							<option key={gender} value={gender}>
								{gender}
							</option>
						))}
					</select>
				</label>
			</aside>
		</>
	)
}

export default Header
