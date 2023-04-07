export const convertMatchTitle = (m: any) => {
	if (m.league) return m.leagueObj.display_name;
	if (m.finals_group) return m.finalsGroupObj.final.display_name;
	if (m.finals_knockout) return m.finalsKnockoutObj.final.display_name;
	if (m.is_friendly) return 'Friendly';
	else {
		console.log(m);
		return 'convertMatchTitle: Fix me';
	}
};

export const convertMatchName = (m: any) => {
	const stage = m.name ? m.name.split('-')[0] : null;
	if (stage) {
		switch (stage) {
			case 'F':
				return 'Final';
			case 'SF':
				return 'Semi Final';
			case 'QF':
				return 'Quarter Final';
			case 'L16':
				return 'Last 16';
			case 'L32':
				return 'Last 32';
			case 'PF':
				return '3/4 Finals';
		}
	}
	if (m.finals_group) return 'Group Stage Match';
	if (m.league) {
		if (m.leagueObj.league_type === 'mini-league') return 'Mini League Match';
		else return 'League Match';
	}
	if (m.is_friendly) return 'Friendly Match';
	else {
		console.log('unable to convert match name');
		console.log(m);
		return null;
	}
};
