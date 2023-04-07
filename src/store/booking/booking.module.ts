import { apolloClient } from '@/graphql';
import GetLocationsByCountry from '@/graphql/booking/GetLocationsByCountry.gql';
import GetLocationById from '@/graphql/booking/GetLocationById.gql';
import GetMatchesByLocation from '@/graphql/booking/GetMatchesByLocation.gql';
import GetReservedEventsByLocation from '@/graphql/booking/GetReservedEventsByLocation.gql';
import GetCustomerBookingsByLocation from '@/graphql/booking/GetCustomerBookingsByLocation.gql';
import GetMatchesByLocationAndDate from '@/graphql/booking/GetMatchesByLocationAndDate.gql';
import InsertPlayerBookings from '@/graphql/booking/SetPlayerBookings.gql';
import InsertPlayerBookingSchedules from '@/graphql/booking/SetPlayerBookingSchedule.gql';
import CheckPlayerBookingSchedule from '@/graphql/booking/CheckPlayerBookingSchedule.gql';
import GetPlayerBookingScheduleOnLocation from '@/graphql/booking/GetPlayerBookingScheduleOnLocation.gql';
import UpdatePlayerBookingSchedules from '@/graphql/booking/UpdatePlayerBookingSchedules.gql';
import delete_multiple_player_booking_schedules from '@/graphql/booking/DeletePlayerBookings.gql';
import SetPlayerBookingCancelled from '@/graphql/booking/SetPlayerBookingCancelled.gql';
import GetCountryName from '@/graphql/booking/GetCountryName.gql';

interface BookingState {}

const getDefaultState = (): BookingState => ({});

const state: BookingState = getDefaultState();

const getters = {};

const actions = {
	async getLocationsByCountry(_: any, locationId: string) {
		try {
			const { data } = await apolloClient.query({
				query: GetLocationsByCountry,
				variables: {
					locationId,
				},
			});
			return data.locations;
		} catch (error) {
			return {
				attachedMiniLeagues: [],
				attachedFinals: [],
			};
		}
	},
	async getLocationById(_: any, id: string) {
		try {
			const { data } = await apolloClient.query({
				query: GetLocationById,
				variables: {
					id,
				},
			});
			return data.location;
		} catch (error) {
			return {
				attachedMiniLeagues: [],
				attachedFinals: [],
			};
		}
	},
	async getPlayerBookingScheduleOnLocation(_: any, payload: any) {
		const { data } = await apolloClient.query({
			query: GetPlayerBookingScheduleOnLocation,
			variables: {
				location_id: payload.location_id,
			},
		});
		return data;
	},
	async checkPlayerBookingSchedule(_: any, payload: any) {
		const { data } = await apolloClient.query({
			query: CheckPlayerBookingSchedule,
			variables: {
				date: payload.date,
				location_id: payload.location_id,
				pitchId: payload.pitchId,
				pitch_id: payload.pitch_id,
				pitch_type: payload.pitch_type,
				split: payload.split,
				time_from: payload.time_from,
				time_to: payload.time_to,
			},
		});
		return data;
	},
	async setPlayerBookingCancelled(_: any, payload: any) {
		const { data } = await apolloClient.query({
			query: SetPlayerBookingCancelled,
			variables: {
				date: payload.date,
				location_id: payload.location_id,
				player_booking_id: payload.player_booking_id,
				display_date: payload.display_date,
				price: payload.price,
				pitchId: payload.pitchId,
				pitch_id: payload.pitch_id,
				pitch_type: payload.pitch_type,
				split: payload.split,
				time_from: payload.time_from,
				time_to: payload.time_to,
			},
		});
		return data;
	},
	async updatePlayerBookingSchedules(_: any, payload: any) {
		console.log('inside booking ts', payload);
		try {
			const data = await apolloClient.mutate({
				mutation: UpdatePlayerBookingSchedules,
				variables: {
					ids: payload.id,
					date: payload.date,
					display_date: payload.display_date,
					location_id: payload.location_id,
					pitchId: payload.pitchId,
					pitch_id: payload.pitch_id,
					pitch_type: payload.pitch_type,
					price: payload.price,
					split: payload.split,
					time_from: payload.time_from,
					time_to: payload.time_to,
				},
			});
			return data;
		} catch (error) {
			return error;
		}
	},
	async deletePlayerBookings(_: any, payload: any) {
		try {
			const data = await apolloClient.mutate({
				mutation: delete_multiple_player_booking_schedules,
				variables: {
					id: payload.id,
				},
			});
			return data;
		} catch (error) {
			return error;
		}
	},
	async getCountryName(_: any, payload: any) {
		try {
			const { data } = await apolloClient.query({
				query: GetCountryName,
				variables: {
					uid: payload.id + '',
				},
			});
			return data;
		} catch (error) {
			return {
				message: ['error', error],
			};
		}
	},
	async setPlayerBookings({ dispatch }: any, payload: any) {
		const objects = {
			date: payload.date,
			payment_type: payload.payment_type,
			player_id: payload.player_id,
			price: '' + payload.price,
			time: payload.time,
		};
		console.log('payload', payload);
		const response = await apolloClient
			.mutate({
				mutation: InsertPlayerBookings,
				variables: {
					objects: objects,
				},
			})
			.catch((err) => {
				console.debug(err);
			});
		return response;
	},
	async setPlayerBookingSchedules({ dispatch }: any, payload: any) {
		const objects = {
			player_booking_id: '' + payload.player_booking_id,
			pitch_id: payload.pitch_id,
			date: payload.date,
			location_id: payload.location_id,
			time_from: payload.time_from,
			time_to: payload.time_to,
			pitchId: payload.pitchId,
			display_date: payload.display_date,
			pitch_type: payload.pitch_type,
			price: '' + payload.price,
			split: payload.split,
		};
		console.log('payload 2', payload);
		const response = await apolloClient
			.mutate({
				mutation: InsertPlayerBookingSchedules,
				variables: {
					objects: objects,
				},
			})
			.catch((err) => {
				console.debug(err);
			});
		return response;
	},
	async getMatchesByLocation(_: any, id: string) {
		try {
			const { data } = await apolloClient.query({
				query: GetMatchesByLocation,
				variables: {
					id,
				},
			});
			return data;
		} catch (error) {
			return {
				matchesByLocation: [],
			};
		}
	},
	async getMatchesByLocationAndDate(_: any, param: any) {
		try {
			const { data } = await apolloClient.query({
				query: GetMatchesByLocationAndDate,
				variables: {
					id: param['id'],
					date: param['pastdate'],
				},
			});
			return data;
		} catch (error) {
			return {
				matchesByLocation: [],
			};
		}
	},
	async getReservedEventsByLocation(_: any, locationId: string) {
		try {
			const { data } = await apolloClient.query({
				query: GetReservedEventsByLocation,
				variables: {
					locationId,
				},
			});
			return data;
		} catch (error) {
			return {
				reserved_events: [],
			};
		}
	},
	async getCustomerBookingsByLocation(_: any, locationId: string) {
		try {
			const { data } = await apolloClient.query({
				query: GetCustomerBookingsByLocation,
				variables: {
					locationId,
				},
			});
			return data;
		} catch (error) {
			return {
				customer_bookings: [],
			};
		}
	},
};

const mutations = {};

export default {
	state,
	getters,
	actions,
	mutations,
};
