// Martyrology Server-Side Loading

export const load = async ({ fetch }) => {
	const today = new Date(Date.now());
	const formattedDate = `${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getDate().toString().padStart(2, '0')}`;
	const todayMartyrology = await (await fetch(`/api/martyrology?date=${formattedDate}`)).json();
	return { martyrology: { [formattedDate]: todayMartyrology } };
};
