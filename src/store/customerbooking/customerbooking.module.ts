import i18n from '@/i18n';
interface BookingData {
	matches: any;
	location_id: string;
	name: string;
	pitch_id: string;
	pitch_size: string;
	pitch_type: string;
	price: any;
	payment_type: string | null;
}
interface CustomerBookingState {
	selectedBooking: BookingData | null;
	selectedBooking2: BookingData | null;
	country_id: string | null;
	language: string | null;
	selectedPitch: [] | null;
	selectedPayment: string | null;
	canceledBooking: [] | null;
	editBooking: [] | null;
	gotoBooked: [] | null;
}

const getDefaultState = (): CustomerBookingState => ({
	selectedBooking: null,
	selectedBooking2: null,
	country_id: null,
	language: null,
	selectedPitch: null,
	selectedPayment: null,
	canceledBooking: null,
	editBooking: null,
	gotoBooked: null,
});

const state: CustomerBookingState = getDefaultState();

const getters = {
	getSelectedBooking: (state: CustomerBookingState) => state.selectedBooking,
	getSelectedLanguage: (state: CustomerBookingState) => state.language,
	getSelectedPitch: (state: CustomerBookingState) => state.selectedPitch,
	getSelectedPayment: (state: CustomerBookingState) => state.selectedPayment,
};

const actions = {};

const mutations = {
	setSelectedBooking: (state: CustomerBookingState, payload: BookingData) => {
		if (payload != null) {
			// @ts-ignore
			if (payload.matches.length > 0) {
				// @ts-ignore
				payload.matches = [...new Set(payload.matches)];
				let sum = 0;
				payload.matches.forEach((ele: any) => {
					sum = sum + ele.price;
				});
				payload.price = sum.toFixed(2).toString();
				// payload.matches.filter((event) => {
				// @ts-ignore
				// if (event.pitch_type == this.$store.state.Customerbooking.selectedPitch.type) {
				// 	return event;
				// }
				// });
			} else {
				payload.price = 0;
			}
		}
		state.selectedBooking = payload;
	},
	setSelectedLanguage: (state: CustomerBookingState, payload: string) => {
		state.language = payload;
		i18n.locale = payload;
	},
	setSelectedBookingCountryId: (state: CustomerBookingState, payload: any) =>
		(state.country_id = payload),
	setSelectedBooking2: (state: CustomerBookingState, payload: BookingData) =>
		(state.selectedBooking2 = payload),
	setSelectedPitch: (state: CustomerBookingState, payload: any) => (state.selectedPitch = payload),
	setSelectedPayment: (state: CustomerBookingState, payload: string) =>
		(state.selectedPayment = payload),
};

export default {
	state,
	getters,
	actions,
	mutations,
};
