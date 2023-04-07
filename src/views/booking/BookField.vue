<template>
	<BookingLayout :step="step" :page-title="$t('booking.date_time')">
		<div class="content-text mb-85 book-field main-container" id="main-container">
			<div class="d-flex w-100 desktop-view">
				<div class="w-75">
					<div class="d-flex mb-20">
						<div class="box-space w-50">
							<div class="top-box mb-30">
								<div class="d-flex justify-content-space-between titlebox">
									<h1>{{ location.name }}</h1>
									<span>
										<svg
											width="16"
											height="16"
											viewBox="0 0 16 16"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M4.30005 15.65C3.91672 15.95 3.52505 15.9583 3.12505 15.675C2.72505 15.3917 2.59172 15.0167 2.72505 14.55L4.15005 9.925L0.525053 7.35C0.125053 7.06667 0.00438659 6.69167 0.163053 6.225C0.321053 5.75833 0.64172 5.525 1.12505 5.525H5.60005L7.05005 0.725C7.13339 0.491667 7.26272 0.312334 7.43805 0.187C7.61272 0.0623336 7.80005 0 8.00005 0C8.20005 0 8.38739 0.0623336 8.56205 0.187C8.73739 0.312334 8.86672 0.491667 8.95005 0.725L10.4001 5.525H14.8751C15.3584 5.525 15.6794 5.75833 15.8381 6.225C15.9961 6.69167 15.8751 7.06667 15.4751 7.35L11.8501 9.925L13.2751 14.55C13.4084 15.0167 13.2751 15.3917 12.8751 15.675C12.4751 15.9583 12.0834 15.95 11.7001 15.65L8.00005 12.825L4.30005 15.65Z"
												fill="white"
												style="opacity: 0.6"
											/>
										</svg>
										&nbsp;4.8
									</span>
								</div>
								<div class="d-flex align-items-center">
									<div class="box pr-15" style="cursor: -webkit-grabbing; cursor: grabbing">
										<LocationMap
											:lat="latitude"
											:long="longitude"
											v-if="latitude"
											size="small"
											idname="mapWeb"
										></LocationMap>
									</div>
									<span>{{ location.address }}</span>
								</div>
							</div>
							<div>
								<h3>{{ $t('booking.about') }}</h3>
								<p class="mb-20">
									{{ location.about }}
								</p>
							</div>
						</div>
						<div class="w-50 box-space">
							<div>
								<div v-if="location.image_url">
									<img :src="location.image_url" class="w-100" />
								</div>
								<div v-else>
									<img src="@/assets/images/Picture(1).png" class="w-100" />
								</div>
								<div class="light-box color-green">
									<p>
										{{ location.extra_info }}
									</p>
								</div>
								<div class="amenities">
									<h1 class="mb-20">{{ $t('booking.amenities') }}</h1>
									<span
										v-for="samenities in selectedAmenities"
										:key="samenities.name"
										class="light-box fw-700"
									>
										<img class="match-card__team-logo" :src="samenities.icon" />
										{{ samenities.name }}
									</span>
								</div>
							</div>
						</div>
					</div>
					<hr />
					<BookingPitchBlock
						:location="location"
						:pitches="pitches"
						:mobile="mobile"
						@selectedPitch="getSelectedPitch"
					></BookingPitchBlock>
					<hr />
					<BookingCalendarBlock
						:mobile="mobile"
						:location="location"
						:pitches="pitches"
						:matchesByLocation="matchByLocation.matchesByLocationAndDate"
						:reservedEvents="reservedEvents.reserved_events"
						:customerBookings="customerBookings.customer_bookings"
						:selectedBookingData="selectedBookingData"
						@selectedCalEvent="getSelectedCalendarEvents"
						@updatePrice="updatePrice"
					></BookingCalendarBlock>
				</div>
				<BookingDetailBlock></BookingDetailBlock>
			</div>
			<div class="mobile-view">
				<div class="top-box mb-30 p-8">
					<div class="d-flex justify-content-space-between titlebox">
						<h1>{{ location.name }}</h1>
						<span class="d-flex">
							<svg
								width="16"
								height="16"
								viewBox="0 0 16 16"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M4.29999 15.65C3.91666 15.95 3.52499 15.9583 3.12499 15.675C2.72499 15.3917 2.59166 15.0167 2.72499 14.55L4.14999 9.925L0.524992 7.35C0.124992 7.06667 0.00432555 6.69167 0.162992 6.225C0.320992 5.75833 0.641659 5.525 1.12499 5.525H5.59999L7.04999 0.725C7.13333 0.491667 7.26266 0.312334 7.43799 0.187C7.61266 0.0623336 7.79999 0 7.99999 0C8.19999 0 8.38733 0.0623336 8.56199 0.187C8.73733 0.312334 8.86666 0.491667 8.94999 0.725L10.4 5.525H14.875C15.3583 5.525 15.6793 5.75833 15.838 6.225C15.996 6.69167 15.875 7.06667 15.475 7.35L11.85 9.925L13.275 14.55C13.4083 15.0167 13.275 15.3917 12.875 15.675C12.475 15.9583 12.0833 15.95 11.7 15.65L7.99999 12.825L4.29999 15.65Z"
									fill="#193860"
								/>
							</svg>

							4.8
						</span>
					</div>
					<div class="d-flex align-items-center">
						<div class="box pr-15">
							<LocationMap
								:lat="latitude"
								:long="longitude"
								v-if="latitude"
								size="small"
								idname="mapMobile"
							></LocationMap>
						</div>
						<span>{{ location.address }}</span>
					</div>
				</div>
				<div class="p-8 text-right">
					<span v-show="!showmore" @click="showMore"
						>Show more
						<svg
							width="12"
							height="7"
							viewBox="0 0 12 7"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M5.99999 6.97499C5.86665 6.97499 5.73765 6.94999 5.61299 6.89999C5.48765 6.84999 5.38332 6.78332 5.29999 6.69999L0.699987 2.09999C0.516654 1.91665 0.424988 1.68332 0.424988 1.39999C0.424988 1.11665 0.516654 0.883321 0.699987 0.699987C0.883321 0.516654 1.11665 0.424988 1.39999 0.424988C1.68332 0.424988 1.91665 0.516654 2.09999 0.699987L5.99999 4.59999L9.89999 0.699987C10.0833 0.516654 10.3167 0.424988 10.6 0.424988C10.8833 0.424988 11.1167 0.516654 11.3 0.699987C11.4833 0.883321 11.575 1.11665 11.575 1.39999C11.575 1.68332 11.4833 1.91665 11.3 2.09999L6.69999 6.69999C6.59999 6.79999 6.49165 6.87065 6.37499 6.91199C6.25832 6.95399 6.13332 6.97499 5.99999 6.97499Z"
								fill="#193860"
							/>
						</svg>
					</span>
				</div>
				<div class="p-8">
					<div v-show="showmore" class="mb-20">
						<h3>ABOUT</h3>
						<p class="mb-20">
							{{ location.about }}
						</p>
					</div>
					<div v-show="showmore" class="mb-20">
						<div v-if="location.image_url">
							<img :src="location.image_url" class="w-100" />
						</div>
						<div v-else>
							<img src="@/assets/images/Picture(1).png" class="w-100" />
						</div>
						<!-- <div class="light-box">
							<p>
								{{ location.extra_info }}
							</p>
						</div> -->
						<div>
							<h1 class="mb-20" style="margin-top: 16px">{{ $t('booking.amenities') }}</h1>
							<span
								v-for="samenities in selectedAmenities"
								:key="samenities.name"
								class="light-box ml-15 fw-700"
							>
								<img class="match-card__team-logo" :src="samenities.icon" />
								{{ samenities.name }}
							</span>
						</div>
					</div>
					<div class="p-8 text-right">
						<span v-show="showmore" @click="showLess"
							>Show less
							<svg
								width="12"
								height="7"
								viewBox="0 0 12 7"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M6 0.0250006C6.13333 0.0250006 6.26233 0.0500011 6.387 0.100001C6.51233 0.150002 6.61667 0.216668 6.7 0.300001L11.3 4.9C11.4833 5.08333 11.575 5.31667 11.575 5.6C11.575 5.88333 11.4833 6.11667 11.3 6.3C11.1167 6.48333 10.8833 6.575 10.6 6.575C10.3167 6.575 10.0833 6.48333 9.9 6.3L6 2.4L2.1 6.3C1.91667 6.48333 1.68333 6.575 1.4 6.575C1.11667 6.575 0.883335 6.48333 0.700002 6.3C0.516668 6.11667 0.425 5.88333 0.425 5.6C0.425 5.31667 0.516668 5.08333 0.700002 4.9L5.3 0.300001C5.4 0.200001 5.50833 0.129334 5.625 0.0880013C5.74167 0.0460014 5.86667 0.0250006 6 0.0250006Z"
									fill="#193860"
								/>
							</svg>
						</span>
					</div>
				</div>
				<hr />
				<BookingPitchBlock
					:location="location"
					:pitches="pitches"
					:mobile="mobile"
					@selectedPitch="getSelectedPitch"
				></BookingPitchBlock>
				<hr />
				<BookingCalendarBlock
					:mobile="mobile"
					:location="location"
					:pitches="pitches"
					:matchesByLocation="matchByLocation.matchesByLocationAndDate"
					:reservedEvents="reservedEvents.reserved_events"
					:customerBookings="customerBookings.customer_bookings"
					:selectedBookingData="selectedBookingData"
					@selectedCalEvent="getSelectedCalendarEvents"
					@updatePrice="updatePrice"
				>
				</BookingCalendarBlock>
				<BookingDetailBlock></BookingDetailBlock>
			</div>
		</div>
	</BookingLayout>
</template>
<script>
import BookingLayout from '@/layouts/booking/BookingLayout.vue';
import LocationMap from '@/components/booking/LocationMap.vue';
import BookingDetailBlock from '@/views/booking/BookingField/BookingDetailBlock.vue';
import BookingPitchBlock from '@/views/booking/BookingField/BookingPitchBlock.vue';
import BookingCalendarBlock from '@/views/booking/BookingField/BookingCalendarBlock.vue';
//amenities
import amenities from '@/amenities';
import { mapGetters } from 'vuex';
import dayjs from 'dayjs';
import Vue from 'vue';
import axios from 'axios';

export default {
	components: {
		BookingLayout,
		LocationMap,
		BookingDetailBlock,
		BookingPitchBlock,
		BookingCalendarBlock,
	},
	data() {
		return {
			location: [],
			matchByLocation: [],
			reservedEvents: [],
			customerBookings: [],
			locationId: this.$route.params.locationId,
			step: 2,
			pageTitle: this.$t('booking.date_and_time'),
			selectedAmenities: [],
			selectedBenefits: [],
			showmore: false,
			latitude: 0,
			longitude: 0,
			pitches: [],
			mobile: window.innerWidth <= 767,
			selectedPitch: [],
			selectedBookingData: {
				location_id: '',
				name: '',
				pitch_id: '',
				pitch_size: '',
				pitch_type: '',
				matches: [],
				matches2: [],
				price: 0,
				countryDetails: '',
			},
			pastDate: dayjs().subtract(1, 'month').format('YYYY-MM-DD'),
			tempSelectedCalendarEvents: [],
			onload: 0,
			callEvent: new Vue(),
			inserted_matches: [],
		};
	},
	computed: {
		...mapGetters(['getSelectedBooking', 'getSelectedLanguage']),
	},
	created() {
		// this.getLocation();
	},
	methods: {
		updatePrice(price) {
			this.selectedBookingData.price = price;
		},
		async getLocation() {
			if (this.$store.state.Customerbooking != undefined) {
				if (this.$store.state.Customerbooking.selectedBooking != null) {
					this.selectedBookingData = this.$store.state.Customerbooking.selectedBooking;
					console.log('perform custom events');
					// this.callEvent.$emit('callevents');
					// return false;
				}
			}
			const locationId = this.locationId;
			if (!this.locationId) {
				return false;
			}
			this.selectedAmenities = [];
			this.selectedBenefits = [];
			this.pitches = [];
			this.location = await this.$store.dispatch('getLocationById', locationId);
			const param = [];
			param['id'] = locationId;
			param['pastdate'] = this.pastDate;
			this.matchByLocation = await this.$store.dispatch('getMatchesByLocationAndDate', param);
			// this.matchByLocation = await this.$store.dispatch('getMatchesByLocation', locationId);
			// Need to take past events too, because all events are repetive
			this.reservedEvents = await this.$store.dispatch('getReservedEventsByLocation', locationId);
			this.customerBookings = await this.$store.dispatch(
				'getCustomerBookingsByLocation',
				locationId
			);
			this.location.amenities.map((la) => {
				amenities.map((am) => {
					if (la.name == am.name) {
						if (this.getSelectedLanguage == 'nl') {
							if (la.name == 'Kitchen') la.name = 'Keuken';
							if (la.name == 'Parking Lot') la.name = 'Parkeerplaats';
							if (la.name == 'Terrace') la.name = 'Terras';
							if (la.name == 'Bar') la.name = 'Clubhuis';
							if (la.name == 'Free Parking') la.name = 'Gratis Parkeren';
							if (la.name == 'Showers') la.name = 'Douches';
							if (la.name == 'Toilets') la.name = 'Toiletten';
						}
						this.selectedAmenities.push({
							name: la.name,
							icon: am.icon,
						});
					}
				});
			});
			this.location.benefits.map((la) => {
				if (la.name) {
					this.selectedBenefits.push({
						name: la.name,
						id: la.id,
					});
				}
			});
			let pitchesTemp = [];
			this.location.pitches.map((p) => {
				let minPrice = 0;
				if (p.monPrice && (minPrice > p.monPrice || minPrice == 0)) {
					minPrice = p.monPrice;
				}
				if (p.tuePrice && (minPrice > p.tuePrice || minPrice == 0)) {
					minPrice = minPrice == 0 ? p.tuePrice : minPrice < p.tuePrice ? minPrice : p.tuePrice;
				}
				if (p.wedPrice && (minPrice > p.wedPrice || minPrice == 0)) {
					minPrice = minPrice == 0 ? p.wedPrice : minPrice < p.wedPrice ? minPrice : p.wedPrice;
				}
				if (p.thursPrice && (minPrice > p.thursPrice || minPrice == 0)) {
					minPrice =
						minPrice == 0 ? p.thursPrice : minPrice < p.thursPrice ? minPrice : p.thursPrice;
				}
				if (p.friPrice && (minPrice > p.friPrice || minPrice == 0)) {
					minPrice = minPrice == 0 ? p.friPrice : minPrice < p.friPrice ? minPrice : p.friPrice;
				}
				if (p.satPrice && (minPrice > p.satPrice || minPrice == 0)) {
					minPrice = minPrice == 0 ? p.satPrice : minPrice < p.satPrice ? minPrice : p.satPrice;
				}
				if (p.sunPrice && (minPrice > p.sunPrice || minPrice == 0)) {
					minPrice = minPrice == 0 ? p.sunPrice : minPrice < p.sunPrice ? minPrice : p.sunPrice;
				}

				if (!pitchesTemp[p.type]) {
					pitchesTemp[p.type] = minPrice;
				} else {
					if (pitchesTemp[p.type] > minPrice && minPrice != 0) {
						pitchesTemp[p.type] = minPrice;
					}
				}

				var pitchExist = this.pitches.filter(function (elm) {
					if (elm.type == p.type) {
						if (elm.min_price > minPrice) {
							elm.name = p.name;
							elm.id = p.id;
							elm.type = p.type;
							elm.min_price = pitchesTemp[p.type];
							elm.field_size = p.field_size;
						}
						return elm;
					}
				});
				if (pitchExist.length < 1) {
					this.pitches.push({
						name: p.name,
						id: p.id,
						type: p.type,
						min_price: minPrice,
						field_size: p.field_size,
					});
				}
			});
			this.selectedBookingData.location_id = this.locationId;
			this.selectedBookingData.name = this.location.name;
			// if (typeof this.$store.customerBookings.selectedBooking !== 'undefined') {
			// 	console.log('this.selectedBookingDataef4', this.$store.customerBookings.selectedBooking);
			// }
			this.$store.commit('setSelectedBooking', this.selectedBookingData);
			if (this.location.latitude) this.latitude = this.location.latitude;
			else this.latitude = 52.386645;
			if (this.location.longitude) this.longitude = this.location.longitude;
			else this.longitude = 4.826378;
		},
		showMore() {
			this.showmore = true;
		},
		showLess() {
			this.showmore = false;
		},
		getSelectedPitch(value) {
			//here we are taking value this should be passed by vuex not sure
			this.$store.commit('setSelectedPitch', value);
			console.log('Pitch selected: ', value);
			// this.$store.state.customerBookings.selectedPitch = value;
			if (this.$store.state.Customerbooking != undefined) {
				if (this.$store.state.Customerbooking.selectedBooking != null) {
					// alert(this.$store.state.Customerbooking.selectedBooking.matches.length);
					this.selectedBookingData = this.$store.state.Customerbooking.selectedBooking;
					this.filteredSelectedCalendarEvents(this.selectedBookingData);
					// console.log('perform custom events');
					// this.callEvent.$emit('callevents');
					// return false;
				}
			}
			this.selectedPitch = value;
			this.selectedBookingData.pitch_id = value.id;
			this.selectedBookingData.pitch_size = value.field_size;
			this.selectedBookingData.pitch_type = value.type;
			// if (typeof this.$store.customerBookings.selectedBooking !== 'undefined') {
			// console.log('this.selectedBookingDataef4', this.$store.customerBookings.selectedBooking);
			// }
			this.$store.commit('setSelectedBooking', this.selectedBookingData);
			if (this.$store.state.Customerbooking != undefined) {
				if (this.$store.state.Customerbooking.selectedBooking != null) {
					this.$store.state.Customerbooking.selectedBooking.matches.map((item) => {
						if (this.inserted_matches.includes(item.display_date)) {
							this.tempSelectedCalendarEvents.filter((item2) => {
								// alert(item.display_date + item2.display_date);
								if (
									item2.date == item.date &&
									item2.time_from == item.time_from &&
									item2.time_to == item.time_to
								) {
									// alert('record found');
									this.inserted_matches.filter((item3) => {
										if (item3 == item2.display_date) {
										} else {
											return;
										}
									});
								} else {
									return;
								}
							});
						} else {
							this.inserted_matches.push(item.display_date);
							this.tempSelectedCalendarEvents.push(item);
						}
					});
					console.log(this.tempSelectedCalendarEvents);
					this.filteredSelectedCalendarEvents(
						this.tempSelectedCalendarEvents.filter((event) => {
							if (event.pitch_type == this.selectedBookingData.pitch_type) {
								return event;
							}
						})
					);
				}
			} else {
				alert('here');
				this.filteredSelectedCalendarEvents(this.tempSelectedCalendarEvents);
			}
		},
		getSelectedCalendarEvents(events) {
			this.tempSelectedCalendarEvents = events;
			this.filteredSelectedCalendarEvents(events);
		},
		filteredSelectedCalendarEvents(events) {
			const finalBookedEvents = events;
			// const finalBookedEvents = events.filter((event) => {
			// 	if (event.pitch_type == this.selectedBookingData.pitch_type) {
			// 		return event;
			// 	}
			// });
			if (finalBookedEvents.length >= 0) {
				// alert('here');
				// eslint-disable-next-line vue/no-mutating-props
				this.selectedBookingData.matches = finalBookedEvents;
				console.log('this.selectedBookingData', this.selectedBookingData);
				this.$store.commit('setSelectedBooking', this.selectedBookingData);
			}
		},
	},
	watch: {
		getSelectedLanguage(after) {
			console.log('nl language', after);
			this.selectedAmenities.forEach((la) => {
				if (la.name) {
					if (after == 'nl') {
						if (la.name == 'Kitchen') la.name = 'Keuken';
						if (la.name == 'Parking Lot') la.name = 'Parkeerplaats';
						if (la.name == 'Terrace') la.name = 'Terras';
						if (la.name == 'Bar') la.name = 'Clubhuis';
						if (la.name == 'Free Parking') la.name = 'Gratis Parkeren';
						if (la.name == 'Showers') la.name = 'Douches';
						if (la.name == 'Toilets') la.name = 'Toiletten';
					} else {
						if (la.name == 'Keuken') la.name = 'Kitchen';
						if (la.name == 'Parkeerplaats') la.name = 'Parking Lot';
						if (la.name == 'Terras') la.name = 'Terrace';
						if (la.name == 'Clubhuis') la.name = 'Bar';
						if (la.name == 'Gratis Parkeren') la.name = 'Free Parking';
						if (la.name == 'Douches') la.name = 'Showers';
						if (la.name == 'Toiletten') la.name = 'Toilets';
					}
				}
			});
		},
	},
	async mounted() {
		// var matches = this.$store.state.Customerbooking.getSelectedBooking.matches;
		// if (matches.legth > 0) {
		// 	alert('here');
		// }

		console.log('response');
		const url = 'https://api.db-ip.com/v2/free/self';
		const data = await axios.get(url);
		console.log(data);
		this.getLocation();

		// fetching country name based on the respective country id
		var countryDetails = 'none';
		var coutryOptions = { id: this.$store.state.Customerbooking.country_id };
		var response = await this.$store.dispatch('getCountryName', coutryOptions);
		if (response.countries != undefined) {
			countryDetails = response.countries.map((item) => {
				if (item.id == this.$store.state.Customerbooking.country_id) {
					return { id: item.id, name: item.name };
				}
			});
			countryDetails = countryDetails[0];
		}
		console.log('country name: ', countryDetails);
		this.selectedBookingData.countryDetails = countryDetails;

		if (this.$store.state.Customerbooking != null) {
			// alert(here);
			if (this.$store.state.Customerbooking.selectedBooking2 != null) {
				if (
					this.$store.state.Customerbooking.selectedBooking2.matches.length > 0 ||
					this.$store.state.Customerbooking.selectedBooking2.matches2.length > 0
				) {
					console.log('pitch selected');
					this.getSelectedPitch(this.$store.state.Customerbooking.selectedPitch);
				}
			}
		}
		this.$store.state.Customerbooking.canceledBooking = null;
		this.selectedBookingData = this.$store.customerBookings.selectedBooking;
		// this.$store.commit('setSelectedBooking', []);
	},
};
</script>
<style>
.modal-content {
	padding: 17px !important;
}
.book-field .mapboxgl-map,
.book-field .mapboxgl-canvas {
	height: 130px !important;
	width: 130px;
	border-radius: 8px;
}
.book-btn {
	width: -webkit-fill-available;
	background: #e99648;
	color: #ffffff;
	font-weight: 500;
	margin: 17px;
	padding: 13px 0px;
	border-radius: 5px;
	font-size: 21px;
}
.total-value span {
	font-size: 22px;
	font-weight: 100;
}
.total-value {
	font-size: 32px;
}
.options {
	margin: 6px 0px;
}
.options h1 {
	font-size: 14px;
}
.options span {
	font-size: 12px;
}
.mb-20 {
	margin-bottom: 20px;
}
.booking-space {
	background: #193860;
	color: #ffffff;
	padding: 15px;
	border-radius: 5px 5px 0px 0px;
}

.last-box {
	box-shadow: 0px 0px 52px rgb(0 0 0 / 20%);
	border-radius: 5px;
	padding: 0;
}
.booking-space h3 {
	font-size: 16px;
	color: #ffffff !important;
}
.booking-space span {
	font-size: 12px;
}
.titlebox {
	padding-bottom: 15px;
}
.titlebox h1 {
	color: #ffffff;
	font-size: 20px;
}
.titlebox span {
	font-size: 20px;
}
.box-space {
	padding: 10px 5px !important;
}
.top-box {
	background: #029f8a;
	color: #ffffff;
	padding: 15px 15px;
	border-radius: 5px;
}
.light-box {
	background: rgba(107, 169, 212, 0.1);
	border-radius: 5px;
	padding: 12px;
	margin: 16px 0px;
	display: inline-block;
}
.amenities .light-box {
	margin: 6px;
}
.light-box span {
	font-weight: 700;
}
.d-flex {
	display: flex;
}
.mobile-view {
	display: none;
}
.mb-85 {
	margin-bottom: 85px;
}
.book-field p {
	color: #000000;
}
.pitch-card {
	font-size: 12px;
	font-weight: 400;
	color: #193860;
}
.pitch-card span {
	font-weight: 600;
}
@media screen and (max-width: 767px) {
	.w-25 {
		width: 100%;
	}
	.mb-85 {
		margin-bottom: 0px !important;
	}
	.mobile-view {
		display: contents;
	}
	.desktop-view {
		display: none;
	}
	.titlebox span {
		font-size: 15px;
		/* display: -webkit-inline-box !important; */
	}
	.top-box {
		background: none;
		color: #000000;
		padding: 0px;
	}
	.top-box h1 {
		color: #000000;
		font-size: 16px;
	}
	.light-box {
		font-size: 12px;
		padding: 6px;
		margin: 0px 3px !important;
	}
}
.box {
	float: left;
	height: 130px;
	width: 130px;
	margin-bottom: 15px;
	/* border: 1px solid black; */
	clear: both;
	margin-right: 12px;
}
.match-card__team-logo {
	display: inherit;
	width: 1rem;
}
body {
	color: #193860 !important;
}
.menu-language {
	display: flex;
}
select.select-menu-lang {
	background: transparent;
}
.color-orange {
	color: #e99648;
}
.color-black {
	color: #000000 !important;
}
.close {
	background: #ddd8d8 !important;
	width: 40px !important;
	height: 40px !important;
	border-radius: 50% !important;
	text-align: center !important;
}
.modal-header {
	display: flex !important;
	justify-content: space-between !important;
	align-items: center !important;
}
.mobile-arrow {
	display: none !important;
}
@media only screen and (max-width: 768px) {
	.mobile-arrow {
		display: block !important;
	}
	.mapboxgl-canvas {
		width: 100% !important;
	}
	#mapWeb {
		width: 100%;
		height: 80vh;
	}
	#myModalPickLocation .modal-content {
		width: 95% !important;
		height: 95vh !important;
	}
	#myModalPickLocation {
		padding-top: 13px !important;
	}
	#mapWeb {
		height: 80vh !important;
	}
}
.alert-warning {
	color: #9c947b;
	background-color: #fff3cd;
	border-color: #ffeeba;
}
.border-rad20 {
	border-radius: 20px;
	overflow: hidden;
}
</style>
