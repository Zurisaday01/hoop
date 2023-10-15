'use server';

export const getDocument = async (token: string | undefined) => {
	try {
		const documentID = '1dfEzf6LjnG6if73Zh5S4qfCjggP6BADdVkb4a1E0HUg';
		let fetch_url = `https://docs.googleapis.com/v1/documents/${documentID}`;

		let fetch_options = {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
		};

		const response = await fetch(fetch_url, fetch_options);

		const data = await response.json(); // Parse the response JSON

		return data;
	} catch (error: any) {
		throw new Error(`Failed to get Google Docs document ${error.message}`);
	}
};

export const createGoogleDocument = async (token: string, name: string) => {
	try {
		const response = await fetch('https://docs.googleapis.com/v1/documents', {
			method: 'POST',
			body: JSON.stringify({
				title: `${name} Project`,
			}),
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
		});

		const data = await response.json();

		return data;
	} catch (error: any) {
		throw new Error(`Failed to create Google Docs document ${error.message}`);
	}
};


export const deleteGoogleDocument =  async (token: string, name: string) => {
	try {
		const response = await fetch('https://docs.googleapis.com/v1/documents', {
			method: 'POST',
			body: JSON.stringify({
				title: `${name} Project`,
			}),
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
		});

		const data = await response.json();

		return data;
	} catch (error: any) {
		throw new Error(`Failed to create Google Docs document ${error.message}`);
	}
};