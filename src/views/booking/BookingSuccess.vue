<template>
	<BookingPayment :page-title="$t('booking.thank_you')">
		<div class="content-text mb-85 book-field main-container">
			<div class="d-flex w-100 desktop-view">
				<div class="w-75">
					<div class="payment-success-box">
						<div class="d-flex">
							<div class="mt-2 mr-2">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="26"
									height="26"
									fill="currentColor"
									class="bi bi-check-circle-fill"
									viewBox="0 0 16 16"
								>
									<path
										d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"
									/>
								</svg>
							</div>
							<div>
								<p style="font-size: 28px; font-weight: bold">
									{{ $t('booking.payment_success') }}
								</p>
								<p style="font-size: 20px; font-weight: 10px">
									{{ $t('booking.you_should_receive_a_confirmation_of_your_booking_at') }}
									{{ email }} {{ $t('booking.within_a_few_minutes_see_you_at') }}
									{{ location.name }} {{ $t('booking.on') }}
									{{ display_date }}
								</p>
								<p style="font-size: 20px; font-weight: 10px; margin-top: 20px">
									{{ $t('booking.work_hard_play_footy_have_fun') }}
								</p>
								<div class="d-flex mt-3">
									<button>
										<p>{{ $t('booking.show_booking_in_dashboard') }}</p>
									</button>
									<button>
										<p>{{ $t('booking.back_to_footy_homepage') }}</p>
									</button>
								</div>
							</div>
						</div>
					</div>
					<div class="d-flex payment-success2-box">
						<div class="first-child" id="vue-demo">
							<div>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="20"
									height="22"
									fill="currentColor"
									class="bi bi-share-fill"
									viewBox="0 0 20 10"
								>
									<path
										d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5z"
									/>
								</svg>
							</div>
							<div class="first-child-head">
								<p>{{ $t('booking.share_your_booking') }}</p>
								<div class="first-child-box">
									<p>{{ $t('booking.use_link_to_share_booking_with_friends') }}</p>
									<button @click="openShareModal">{{ $t('booking.share_booking') }}</button>
								</div>
							</div>
							<div
								v-if="showShareModal"
								id="myModalBookingCal"
								class="modal"
								:class="showShareModal ? 'model-show' : ''"
							>
								<!-- Modal content -->
								<div class="modal-content">
									<div
										class="modal-header"
										style="display: flex; justify-content: space-between; align-items: center"
									>
										<h2 class="mb-1">Share Booking Deatils</h2>
										<span @click="openShareModal" class="close">&times;</span>
									</div>
									<div class="modal-body">
										<div class="mt-2 mb-2">
											<!-- <p>Select Players:</p> -->
											<div>
												<multi-select
													:options="options"
													:selected-options="items"
													placeholder="Select Players"
													@select="onSelect"
												>
												</multi-select>
											</div>
										</div>
									</div>
									<div class="modal-footer">
										<button @click="shareBookingDetails" class="cancel-button">Share</button>
									</div>
								</div>
							</div>
						</div>
						<div class="first-child">
							<div>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									fill="currentColor"
									class="bi bi-calendar-event-fill"
									viewBox="0 0 16 16"
								>
									<path
										d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4V.5zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2zm-3.5-7h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5z"
									/>
								</svg>
							</div>
							<div class="first-child-head">
								<p>{{ $t('booking.edit_your_booking') }}</p>
								<div class="first-child-box">
									<p>{{ $t('booking.change_of_plans_easily_change_booking') }}</p>
									<button @click="editBooking()" style="width: auto">
										{{ $t('booking.edit_booking') }}
									</button>
								</div>
							</div>
						</div>
					</div>
					<div class="payment-success3-box">
						<p class="success-head">{{ $t('booking.contact_information') }}</p>
						<p class="success-body">
							{{
								$t(
									'booking.you_can_reach_the_sportpark_for_more_information_using_the_contact_information_below'
								)
							}}.
						</p>
						<div class="d-flex">
							<button>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									fill="currentColor"
									class="bi bi-telephone-fill"
									viewBox="0 0 16 16"
								>
									<path
										fill-rule="evenodd"
										d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"
									/>
								</svg>
								+31 68 313 33 80
							</button>
							<button>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									fill="currentColor"
									class="bi bi-at"
									viewBox="0 0 16 16"
								>
									<path
										d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z"
									/>
								</svg>
								info@spieringhorn.footy.eu
							</button>
						</div>
						<p class="success-head">{{ $t('booking.additional_information') }}</p>
						<p class="success-body">
							{{
								$t('booking.cancellation_is_possible_up_to_24_hours_before_the_start_of_the_event')
							}}
						</p>
					</div>
				</div>
				<BookingDetailBlock></BookingDetailBlock>
			</div>
			<div class="mobile-view">
				<div class="payment-success-box" style="margin: 0; margin-bottom: 20px">
					<div class="d-flex">
						<div class="mt-2 mr-2">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="26"
								height="26"
								fill="currentColor"
								class="bi bi-check-circle-fill"
								viewBox="0 0 16 16"
							>
								<path
									d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"
								/>
							</svg>
						</div>
						<div>
							<p style="font-size: 28px; font-weight: bold">{{ $t('booking.payment_success') }}</p>
						</div>
					</div>
					<p style="font-size: 20px; font-weight: 10px">
						{{ $t('booking.you_should_receive_a_confirmation_of_your_booking_at') }}
						{{ email }} {{ $t('booking.within_a_few_minutes_see_you_at') }} {{ location.name }}
						{{ $t('booking.on') }}
						{{ display_date }}
					</p>
					<p style="font-size: 20px; font-weight: 10px; margin-top: 20px">
						{{ $t('booking.work_hard_play_footy_have_fun') }}
					</p>
					<div>
						<button class="mt-3">
							<p>{{ $t('booking.show_booking_in_dashboard') }}</p>
						</button>
						<button class="mt-3">
							<p>{{ $t('booking.back_to_footy_homepage') }}</p>
						</button>
					</div>
				</div>
				<div class="payment-success2-box" style="margin: 0; margin-bottom: 20px">
					<div class="first-child" style="width: auto">
						<div>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="22"
								fill="currentColor"
								class="bi bi-share-fill"
								viewBox="0 0 20 10"
							>
								<path
									d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5z"
								/>
							</svg>
						</div>
						<div class="first-child-head">
							<p>{{ $t('booking.share_your_booking') }}</p>
							<div class="first-child-box" style="width: 100%">
								<p>{{ $t('booking.use_link_to_share_booking_with_friends') }}</p>
								<button @click="openShareModal">{{ $t('booking.share_booking') }}</button>
							</div>
						</div>
					</div>
					<div class="first-child" style="width: auto; margin-top: 10px">
						<div>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								fill="currentColor"
								class="bi bi-calendar-event-fill"
								viewBox="0 0 16 16"
							>
								<path
									d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4V.5zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2zm-3.5-7h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5z"
								/>
							</svg>
						</div>
						<div class="first-child-head">
							<p>{{ $t('booking.edit_your_booking') }}</p>
							<div class="first-child-box" style="width: 100%">
								<p>{{ $t('booking.change_of_plans_easily_change_booking') }}</p>
								<button style="width: auto">{{ $t('booking.edit_booking') }}</button>
							</div>
						</div>
					</div>
				</div>
				<BookingDetailBlock></BookingDetailBlock>
				<div class="payment-success3-box">
					<p class="success-head">{{ $t('booking.contact_information') }}</p>
					<p class="success-body" style="width: 100%; height: auto">
						{{
							$t(
								'booking.you_can_reach_the_sportpark_for_more_information_using_the_contact_information_below'
							)
						}}.
					</p>
					<div class="">
						<button>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								fill="currentColor"
								class="bi bi-telephone-fill"
								viewBox="0 0 16 16"
							>
								<path
									fill-rule="evenodd"
									d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"
								/>
							</svg>
							+31 68 313 33 80
						</button>
						<button>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								fill="currentColor"
								class="bi bi-at"
								viewBox="0 0 16 16"
							>
								<path
									d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z"
								/>
							</svg>
							info@spieringhorn.footy.eu
						</button>
					</div>
					<p class="success-head">{{ $t('booking.additional_information') }}</p>
					<p class="success-body" style="width: 100%; height: auto">
						{{
							$t('booking.cancellation_is_possible_up_to_24_hours_before_the_start_of_the_event')
						}}
					</p>
				</div>
			</div>
		</div>
	</BookingPayment>
</template>
<script>
import { mapGetters } from 'vuex';
// import { apolloClient } from '@/graphql';
import dayjs from 'dayjs';
import BookingPayment from '@/layouts/booking/BookingPayment.vue';
import BookingDetailBlock from '@/views/booking/BookingField/BookingDetailBlock.vue';
import { MultiSelect } from 'vue-search-select';
export default {
	components: {
		BookingPayment,
		BookingDetailBlock,
		MultiSelect,
	},
	data: () => ({
		location: [],
		display_date: '',
		email: '',
		showShareModal: false,
		options: [],
		items: [],
		editDatas: {
			date: '',
			type: '',
		},
	}),
	methods: {
		openShareModal() {
			if (this.showShareModal == true) {
				this.showShareModal = false;
			} else {
				this.showShareModal = true;
			}
			console.log('here');
		},
		onSelect(items, lastSelectItem) {
			this.items = items;
			this.lastSelectItem = lastSelectItem;
		},
		// deselect option
		reset() {
			this.items = []; // reset
		},
		// select option from parent component
		selectFromParentComponent() {
			this.items = _.unionWith(this.items, [this.options[0]], _.isEqual);
		},
		shareBookingDetails() {
			console.log('Players', this.items);
		},
		editBooking() {
			var date = this.$store.state.Customerbooking.selectedBooking.matches[0].date;
			if (this.$store.state.Customerbooking.selectedBooking.matches.length > 0) {
				this.$store.state.Customerbooking.editBooking = {
					date: date,
					type: this.$store.state.Customerbooking.selectedBooking.matches[0].pitch_type,
					time_from: this.$store.state.Customerbooking.selectedBooking.matches[0].time_from,
				};
				this.$store.state.Customerbooking.gotoBooked =
					this.$store.state.Customerbooking.selectedBooking.matches[0];
			} else {
				this.$store.state.Customerbooking.editBooking = {
					date: date,
					type: this.$store.state.Customerbooking.selectedBooking.matches2[0].pitch_type,
					time_from: this.$store.state.Customerbooking.selectedBooking.matches2[0].time_from,
				};
				this.$store.state.Customerbooking.gotoBooked =
					this.$store.state.Customerbooking.selectedBooking.matches2[0];
			}
			// console.log('datas: ', this.editDatas);
			this.$router.push({ name: 'edit-booking' });
		},
	},
	async mounted() {
		// this.$store.state.Customerbooking.selectedBooking = JSON.parse(
		// 	localStorage.getItem('temp_selectedBooking')
		// );
		this.$store.state.Customerbooking.country_id = localStorage.getItem('country_id');
		this.$store.state.Customerbooking.language = localStorage.getItem('language');
		this.$store.state.Customerbooking.selectedPitch = JSON.parse(
			localStorage.getItem('selectedPitch')
		);

		if (this.location.length < 1) {
			if (this.$store.state.Customerbooking.selectedBooking != null) {
				// var location_id = this.$store.state.Customerbooking.selectedBooking.location_id;
				var location_temp = await this.$store.dispatch(
					'getLocationById',
					this.$store.state.Customerbooking.selectedBooking.location_id
				);
				this.location = location_temp;
				console.log('location: ', location_temp);

				if (this.$store.state.Customerbooking.selectedBooking.matches[0] != undefined) {
					this.display_date = this.$store.state.Customerbooking.selectedBooking.matches[0].date;
					this.display_date =
						dayjs(this.display_date).format('MMMM DD ') +
						'at ' +
						this.$store.state.Customerbooking.selectedBooking.matches[0].time_from +
						'.';
				} else {
					this.display_date = this.$store.state.Customerbooking.selectedBooking.matches2[0].date;
					this.display_date =
						dayjs(this.display_date).format('MMMM DD ') +
						'at ' +
						this.$store.state.Customerbooking.selectedBooking.matches2[0].time_from +
						'.';
				}
				this.email = this.$store.state.Player.player.email;
			}
		}

		var date = dayjs(new Date()).format('YYYY-MM-DD');
		var payment_type = this.$store.state.Customerbooking.selectedBooking.payment_type;
		var player_id = this.$store.state.Player.player.id;
		var price = this.$store.state.Customerbooking.selectedBooking.price;
		var time = dayjs(new Date()).format('HH:mm:ss');

		// var checkingObject = {
		// 	date: { _similar: '' },
		// 	location_id: { _eq: '' },
		// 	pitchId: { _similar: '' },
		// 	pitch_id: { _eq: '' },
		// 	pitch_type: { _similar: '' },
		// 	player_booking_id: { _eq: 10 },
		// 	split: { _similar: '' },
		// 	time_from: { _similar: '' },
		// 	time_to: { _similar: '' },
		// };
		if (this.$store.state.Customerbooking.selectedBooking.matches.length > 0) {
			var checkingObject = {
				date: this.$store.state.Customerbooking.selectedBooking.matches[0].date,
				location_id: this.$store.state.Customerbooking.selectedBooking.location_id,
				pitchId: this.$store.state.Customerbooking.selectedBooking.matches[0].pitchId,
				pitch_id: this.$store.state.Customerbooking.selectedBooking.pitch_id,
				pitch_type: this.$store.state.Customerbooking.selectedBooking.matches[0].pitch_type,
				split: this.$store.state.Customerbooking.selectedBooking.matches[0].split,
				time_from: this.$store.state.Customerbooking.selectedBooking.matches[0].time_from,
				time_to: this.$store.state.Customerbooking.selectedBooking.matches[0].time_to,
			};
			var checkOutput = await this.$store.dispatch('checkPlayerBookingSchedule', checkingObject);

			console.log('checkOutput : ', checkOutput.player_booking_schedules);

			if (checkOutput.player_booking_schedules.length > 0) {
				console.log('found record');
			} else {
				var insertDetails = {
					date: date,
					payment_type: payment_type,
					player_id: player_id,
					price: price,
					time: time,
				};

				const setPlayerBookings = await this.$store.dispatch('setPlayerBookings', insertDetails);
				console.log('graphql responce', setPlayerBookings);

				var playerBookingId = setPlayerBookings.data.insert_player_bookings.returning[0].id;

				var temp_this = this;
				var testing = '';

				this.$store.state.Customerbooking.selectedBooking.matches.map(async (m) => {
					console.log('here->', m);
					var insertDetails = {
						player_booking_id: playerBookingId,
						pitch_id: temp_this.$store.state.Customerbooking.selectedBooking.pitch_id,
						date: m.date,
						location_id: temp_this.$store.state.Customerbooking.selectedBooking.location_id,
						time_from: m.time_from,
						time_to: m.time_to,
						pitchId: m.pitchId,
						display_date: m.display_date,
						pitch_type: m.pitch_type,
						price: m.price,
						split: m.split,
					};
					testing = await this.$store.dispatch('setPlayerBookingSchedules', insertDetails);
				});

				console.log(testing);
			}
		} else if (this.$store.state.Customerbooking.selectedBooking.matches2.length > 0) {
			var checkingObject = {
				date: this.$store.state.Customerbooking.selectedBooking.matches2[0].date,
				location_id: this.$store.state.Customerbooking.selectedBooking.location_id,
				pitchId: this.$store.state.Customerbooking.selectedBooking.matches2[0].pitchId,
				pitch_id: this.$store.state.Customerbooking.selectedBooking.pitch_id,
				pitch_type: this.$store.state.Customerbooking.selectedBooking.matches2[0].pitch_type,
				split: this.$store.state.Customerbooking.selectedBooking.matches2[0].split,
				time_from: this.$store.state.Customerbooking.selectedBooking.matches2[0].time_from,
				time_to: this.$store.state.Customerbooking.selectedBooking.matches2[0].time_to,
			};
			var checkOutput = await this.$store.dispatch('checkPlayerBookingSchedule', checkingObject);

			console.log('checkOutput : ', checkOutput.player_booking_schedules);

			if (checkOutput.player_booking_schedules.length > 0) {
				console.log('found record');
			} else {
				var temp_this = this;
				var testing = '';

				this.$store.state.Customerbooking.selectedBooking.matches2.map(async (m) => {
					console.log('here->', m);
					var updateDetails = {
						pitch_id: temp_this.$store.state.Customerbooking.selectedBooking.pitch_id,
						date: m.date,
						location_id: temp_this.$store.state.Customerbooking.selectedBooking.location_id,
						time_from: m.time_from,
						time_to: m.time_to,
						pitchId: m.pitchId,
						display_date: m.display_date,
						pitch_type: m.pitch_type,
						price: m.price + '',
						split: m.split,
						id: m.id + '',
					};
					testing = await this.$store.dispatch('updatePlayerBookingSchedules', updateDetails);
					console.log(testing);
				});
			}
		}

		// var testing = await this.$store.dispatch('setPlayerBookings', insertDetails);

		/////////////////// Loading Player's List ///////////////////////
		var players = await this.$store.dispatch('getAllPlayers');
		console.log('players', players.players);
		console.log('options', this.options);
		this.options = [];
		players.players.map((player) => {
			var playerobj = { value: player.id, text: player.first_name + ' ' + player.last_name };
			this.options.push(playerobj);
		});
		console.log('options later', this.options);
	},
};
</script>
<style>
.payment-success2-box {
	/* padding: 20px; */
	margin: 30px;
	margin-bottom: 20px;
}
.first-child-box {
	box-sizing: border-box;

	/* Auto layout */

	display: flex;
	flex-direction: column;
	align-items: flex-end;
	/* padding: 8px 16px 16px; */
	gap: 8px;

	/* width: 410px; */
	/* height: 157px; */

	/* Brand/02 */

	background: #ffffff;
	/* Brand/05 */

	/* border: 1px solid #193860; */
	border-radius: 5px;

	/* Inside auto layout */

	flex: none;
	order: 0;
	flex-grow: 1;
}
.first-child-box p {
	font-family: 'Work Sans';
	font-style: normal;
	font-weight: 400;
	font-size: 16px;
	line-height: 150%;
}
.first-child-box button {
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 8px 12px;
	gap: 4px;

	width: 137px;
	height: 35px;

	/* Brand/05 */

	background: #193860;
	border-radius: 5px;

	font-family: 'Work Sans';
	font-style: normal;
	font-weight: 600;
	font-size: 16px;
	line-height: 19px;
	color: #ffffff;
}
.first-child-head {
	font-family: 'Work Sans';
	font-style: normal;
	font-weight: 600;
	font-size: 20px;
	line-height: 150%;
	/* identical to box height, or 30px */

	/* Brand/05 */

	color: #193860;
}
.payment-success2-box .first-child {
	border: 2px solid #193860;
	height: auto;
	width: 50%;
	margin: 1%;
	border-radius: 5px;

	display: flex;
	align-items: flex-start;
	padding: 8px 16px 16px;
	gap: 8px;
	justify-content: center;
}
.payment-success3-box {
	margin: 30px;
	padding: 10px;
}
.payment-success3-box .success-head {
	width: 836px;
	height: 24px;

	font-family: 'Work Sans';
	font-style: normal;
	font-weight: 700;
	font-size: 16px;
	line-height: 150%;
	/* identical to box height, or 24px */

	text-transform: uppercase;

	/* Brand/03 */

	color: #000000;

	/* Inside auto layout */

	flex: none;
	order: 0;
	flex-grow: 0;
	margin-bottom: 10px;
}
.payment-success3-box .success-body {
	width: 685px;
	height: 24px;

	font-family: 'Work Sans';
	font-style: normal;
	font-weight: 400;
	font-size: 16px;
	line-height: 150%;
	/* identical to box height, or 24px */

	/* Brand/03 */

	color: #000000;

	/* Inside auto layout */

	flex: none;
	order: 1;
	flex-grow: 0;
	margin-bottom: 10px;
}
.payment-success3-box button {
	border: 1px solid #193860;
	margin: 10px;
	padding: 5px;
	padding-left: 10px;
	padding-right: 10px;
	border-radius: 5px;
}
.payment-success-box {
	padding: 20px;
	margin: 30px;
	background: #029f8a;
	color: #ffffff !important;
	border-radius: 10px;
}
.payment-success-box p {
	color: #ffffff !important;
}
.payment-success-box button {
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 8px 12px;
	gap: 4px;
	height: 35px;
	background: #ffffff;
	border-radius: 5px;
	flex: none;
	order: 0;
	flex-grow: 0;
	margin-right: 20px;
}
.payment-success-box button p {
	font-family: 'Work Sans';
	font-style: normal;
	font-weight: 600;
	font-size: 16px;
	line-height: 19px;
	color: #029f8a !important;
	flex: none;
	order: 1;
	flex-grow: 0;
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
	padding: 10px 5px;
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
@media screen and (max-width: 990px) {
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
</style>
<style lang="scss">
.vuecal__flex.vuecal__body {
	transform: translateZ(0) !important;
}
.vuecal__flex.vuecal__weekdays-headings {
	min-width: 100% !important;
	background: #fff !important;
	position: fixed !important;
	left: 50% !important;
	top: 0 !important;
	transform: translateX(-50%) !important;
	z-index: 999 !important;
	padding-left: 3em !important;
}
.toggleselecteddate .vuecal__flex.vuecal__weekdays-headings {
	min-width: 100% !important;
	background: #fff !important;
	position: relative !important;
	left: 0% !important;
	top: 0 !important;
	transform: revert !important;
	z-index: 999 !important;
	padding-left: 0em !important;
}
.vuecal__flex.vuecal__cells.week-view:nth-child(2) {
	margin-top: 54px;
}
$john: #42b983;
$kate: #ff7fc8;
.demo {
	border-radius: 4px;
	// Date picker.
	&.vuecal--date-picker .vuecal__cell-events-count {
		width: 4px;
		height: 4px;
		min-width: 0;
		padding: 0;
		margin-top: 4px;
		color: transparent;
		background-color: $john;
	}
	&.vuecal--date-picker .vuecal__cell--selected .vuecal__cell-events-count {
		background-color: #fff;
	}
	// Both calendars.
	.vuecal__cell--out-of-scope {
		color: rgba(0, 0, 0, 0.15);
	}
	// Full power calendar.
	// ------------------------------------------------------
	&.full-cal .vuecal__menu {
		background-color: transparent;
	}
	&.full-cal .vuecal__title-bar {
		background: rgba(0, 0, 0, 0.03);
	}
	.vuecal__view-btn {
		background: none;
		padding: 0 10px;
		margin: 4px 2px;
		border-radius: 30px;
		height: 20px;
		line-height: 20px;
		font-size: 13px;
		text-transform: uppercase;
		border: none;
		color: inherit;
		&--active {
			background: rgb(66, 185, 130);
			color: #fff;
		}
	}
	&.full-cal .weekday-label {
		opacity: 0.4;
		font-weight: 500;
	}
	.vuecal__header .v-icon {
		color: inherit;
	}
	&:not(.vuecal--day-view) .vuecal__cell--selected {
		background-color: transparent;
	}
	&:not(.vuecal--day-view).full-cal .vuecal__cell--selected:before {
		border: 1px solid rgba($john, 0.8);
	}
	.vuecal__event-time {
		margin: 3px 0;
		font-size: 12px;
		font-weight: 500;
		line-height: 1.2;
		display: none;
	}
	// John.
	.vuecal__header .john {
		color: darken($john, 5);
	}
	.vuecal__body .john {
		background-color: rgba($john, 0.08);
	}
	.john .vuecal__event {
		background-color: rgba(lighten($john, 5), 0.85);
		color: #fff;
	}
	.john .lunch {
		background: repeating-linear-gradient(
			45deg,
			transparent,
			transparent 10px,
			rgba($john, 0.15) 10px,
			rgba($john, 0.15) 20px
		);
		color: transparentize(darken($john, 10), 0.4);
	}
	// Kate.
	.vuecal__header .kate {
		color: darken($kate, 5);
	}
	.vuecal__body .kate {
		background-color: rgba($kate, 0.08);
	}
	.kate .vuecal__event {
		background-color: rgba(lighten($kate, 5), 0.85);
		color: #fff;
		padding: 0;
	}
	.kate .lunch {
		background: repeating-linear-gradient(
			45deg,
			transparent,
			transparent 10px,
			rgba($kate, 0.15) 10px,
			rgba($kate, 0.15) 20px
		);
		color: transparentize(darken($kate, 10), 0.4);
	}
}
.vuecal__event.sport {
	background-color: #f8e0e0;
	border: 1px solid #ddd8d8;
	color: #fff;
}
.vuecal__event.sport.grey {
	background: #f3f0f0;
	border-width: 1px 2px 0px 1px;
	border-style: solid;
	border-color: #ddd8d8;
	color: #ddd8d8;
}
.grey .vuecal__event-content .icon {
	color: #6e6969;
	border: solid 1px #6e6969;
}
.vuecal__event.new-event {
	background-color: #029f8a;
	border: 1px solid #016b5d;
	color: #fff;
}
@media only screen and (max-width: 900px) {
	.modal-content {
		padding: 17px;
		width: 100% !important;
	}

	// .vuecal__flex.weekday-label .full {
	// 	display: none !important;
	// }

	// .vuecal__flex.weekday-label .small {
	// 	display: block !important;
	// }
}
.vuecal__event-content {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
}
.vuecal__event-content .icon {
	color: #ad0f0f;
	border: solid 1px #ad0f0f;
	border-radius: 50%;
	width: 26px;
	height: 26px;
	font-size: 17px;
	padding-top: 4px;
}
.select-time {
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: 10px;
}
.pick-time-button {
	background: #e99648;
	color: #fff;
	padding: 8px 12px 8px 12px;
	margin-top: 10px;
	border-radius: 5px;
}
.update-button-parent {
	margin-top: 10px;
	display: flex;
	justify-content: space-between;
}
.update-button {
	background: #ddd8d8;
	border-radius: 5px;
	color: #fff;
	padding: 8px 12px;
}
.close {
	background: #ddd8d8;
	width: 40px;
	height: 40px;
	border-radius: 50%;
	text-align: center;
}
.button-border {
	border: 1px solid #193860;
	border-radius: 5px;
	padding: 8px 12px;
}
.cancel-button {
	margin-top: 10px;
	background: #193860;
	border-radius: 5px;
	padding: 8px 12px;
	color: #fff;
}
</style>
<style>
.flatTimePicker {
	border: solid 1px #eeeeee !important;
	font-weight: 200 !important;
	padding: 10px !important;
}
.w-55p {
	width: 55px !important;
}
.cal-light-box {
	border-radius: 5px;
	margin: 10px 0px;
	display: inline-block;
}
.vuecal__event.sport.tw-p-4.pt-2.tw-flex.tw-flex-col.tw-justify-start.red {
	z-index: 8;
}
.vuecal__event.new-event {
	background-color: #029f8a1a;
	border: 1px solid #029f8a1a;
}
.green .vuecal__event-content .icon {
	/* color: #ffffff; */
	border: solid 1px #ffffff;
	/* background: #029f8a; */
	background: #ffffff !important;
	color: #029f8a !important;
	font-weight: 900;
}
.green {
	/* background: rgba(2, 159, 138, 0.102); */
	background: #029f8a;
	border: 1px solid #ddd8d8;
}
.grey .vuecal__event-content .icon {
	background: transparent;
}
.color-theame-gray {
	color: #193860;
}
.mapboxgl-marker svg {
	fill: #e99648;
}
#vue-demo .modal-content {
	padding: 17px;
	width: 25% !important;
}
@media only screen and (max-width: 900px) {
	#vue-demo .modal-content {
		width: 70% !important;
	}
}
/* #myModalBookingCal {
	background: transparent;
} */
.modal-alert-error {
	margin-top: 5px;
	background: #fcdede;
	border-radius: 5px;
}
.modal-alert-error p {
	padding: 10px;
	color: #ad0f0f !important;
}
.dropdown {
	float: none !important;
	overflow: auto !important;
}
.item {
	color: black !important;
}
.dropdown input {
	color: black !important;
	width: 98% !important;
	border: 1px solid black !important;
}
.dropdown .menu {
	max-height: 100px !important;
	overflow-y: scroll !important;
}
.dropdown a {
	color: black !important;
	border-right: 1px solid black;
	padding-right: 5px;
	margin-right: 5px;
}
</style>
