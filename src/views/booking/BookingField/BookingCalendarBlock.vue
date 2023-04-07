<template>
	<div class="mb-20">
		<h1 :class="mobile ? 'p-8' : 'p-15'" class="mt-20 mb-20">
			<svg
				width="20"
				height="20"
				viewBox="0 0 20 20"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<circle cx="10" cy="10" r="10" fill="#193860" />
				<path
					d="M6.67008 14V12.46C7.46341 11.9653 8.14008 11.5033 8.70008 11.074C9.26008 10.6447 9.71275 10.2387 10.0581 9.856C10.4127 9.47333 10.6741 9.10933 10.8421 8.764C11.0101 8.41867 11.0941 8.08267 11.0941 7.756C11.0941 7.40133 10.9867 7.10733 10.7721 6.874C10.5667 6.63133 10.2587 6.51 9.84808 6.51C9.40941 6.51 9.06874 6.67333 8.82608 7C8.58341 7.31733 8.45274 7.784 8.43408 8.4L6.37608 7.77C6.39474 7.07933 6.55808 6.50067 6.86608 6.034C7.18341 5.56733 7.61274 5.21733 8.15408 4.984C8.69541 4.74133 9.31141 4.62 10.0021 4.62C10.6087 4.62 11.1314 4.70867 11.5701 4.886C12.0181 5.054 12.3821 5.28267 12.6621 5.572C12.9421 5.852 13.1474 6.16933 13.2781 6.524C13.4181 6.86933 13.4881 7.224 13.4881 7.588C13.4881 8.18533 13.3341 8.74533 13.0261 9.268C12.7181 9.78133 12.2701 10.2807 11.6821 10.766C11.1034 11.242 10.3987 11.7227 9.56808 12.208V12.222C9.72674 12.2127 9.91341 12.2033 10.1281 12.194C10.3427 12.1847 10.5667 12.18 10.8001 12.18C11.0334 12.1707 11.2434 12.166 11.4301 12.166H13.6001V14H6.67008Z"
					fill="white"
				/>
			</svg>

			{{ $t('booking.date_time') }}
		</h1>
		<div :class="mobile ? 'p-8' : 'p-15'" class="d-flex">
			<p>{{ $t('booking.select_time_slot_message') }} {{ location.minimum_duration }} min.</p>
		</div>
		<div :class="mobile ? 'p-8' : 'p-15'" class="d-flex">
			<span
				class="cal-light-box fw-700 button-border toggleselecteddate"
				style="height: fit-content"
			>
				<!-- <input type="date" :min="today" @change="dateChanged" v-model="datepick" /> -->
				<img
					:src="require('@/assets/images/calendar.png')"
					style="display: initial; cursor: pointer"
					@click="toggleSelectedDate"
				/>{{ calendarWeekText }}
				<vue-cal
					hide-view-selector
					:time="false"
					:dblclick-to-navigate="false"
					@cell-click="selectDateCalled"
					@cell-dblclick="false"
					active-view="month"
					:min-date="new Date()"
					v-if="selectedDateToggle"
				>
					<template #arrow-prev>
						<i class="icon material-icons">arrow_back</i>
					</template>
					<template #arrow-next>
						<i class="icon material-icons">arrow_forward</i>
					</template>
				</vue-cal>
			</span>
			<span class="cal-light-box fw-700">
				<button @click="previousDay">
					<img
						v-if="!prevControllDisable"
						class="match-card__team-logo w-55p"
						:src="require('@/assets/images/prev.png')"
					/>
					<img
						v-else
						class="match-card__team-logo w-55p"
						:src="require('@/assets/images/prev-disable.png')"
					/>
				</button>
			</span>
			<span class="cal-light-box fw-700">
				<button @click="nextDay">
					<img class="match-card__team-logo w-55p" :src="require('@/assets/images/next.png')" />
				</button>
			</span>
		</div>
		<div :class="mobile ? 'p-8' : 'p-15'" class="d-flex" id="vue-demo">
			<!-- @cell-focus="selectedDate = $event.date || $event" -->
			<vue-cal
				:minEventWidth="100"
				ref="vuecal"
				class="demo full-cal vuecal--full-height-delete"
				:selected-date="selectedDate"
				:time-from="9 * 60"
				:time-step="30"
				:time-to="24 * 60"
				:split-days="filteredPitches"
				sticky-split-labels=""
				:events="calendarEvents"
				style="height: 450px"
				:min-split-width="minSplitWidth"
				:min-cell-width="minCellWidth"
				:disable-views="['years', 'year', 'month', 'day']"
				@cell-dblclick="onEventCreate"
				@cell-click="onEventCreate"
				:on-event-click="onExistingEventClick"
				hide-view-selector
				hide-title-bar
				:min-date="new Date()"
				@view-change="dateChange"
				:hideWeekdays="hideWeekdays"
				weekday-heading="small"
				:time-cell-height="timeCellHeight"
				@ready="scrollToTime"
				id="vuecalid"
			>
				<template v-slot:split-label="{ split }">
					<strong :style="`color: ${split.color}`">{{ split.label }}</strong>
				</template>
			</vue-cal>
			<!-- Add Event Modal -->
			<div
				v-if="showEventCreationDialog"
				id="myModalBookingCal"
				class="modal"
				:class="showEventCreationDialog ? 'model-show' : ''"
			>
				<!-- Modal content -->
				<div class="modal-content">
					<div class="modal-header">
						<h2 class="mb-1">
							{{ addEventPopup ? $t('booking.pick_a_time_slot') : $t('booking.edit_time_slot') }}
							<span @click="closeEventCreationDialog" class="close">&times;</span>
						</h2>
					</div>
					<div class="modal-body">
						<div v-if="modalError != ''" class="modal-alert-error d-flex">
							<p>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="20"
									height="20"
									fill="currentColor"
									class="bi bi-exclamation-circle-fill"
									viewBox="0 0 18 18"
								>
									<path
										d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"
									/>
								</svg>
								&nbsp;
							</p>

							<p v-if="modalError != 'show_24hrs_booking_error'">
								{{ modalError }}
							</p>
							<p v-else>{{ $t('booking.booking_24_error') }}</p>
						</div>
						<div class="select-time">
							<flat-pickr
								class="flatTimePicker"
								:config="config"
								placeholder="Select time from"
								v-model="from"
								@on-change="startTimeChange($event)"
							/>
							<span style="padding: 10px"> - </span>
							<flat-pickr
								class="flatTimePicker"
								:config="config"
								v-model="to"
								placeholder="Select time to"
								@on-change="endTimeChange($event)"
							/>
						</div>
						<button v-if="addEventPopup" class="pick-time-button" @click="addEvent">
							{{ $t('booking.pick_time_slot') }}
						</button>
						<div v-else class="update-button-parent">
							<button class="pick-time-button" @click="updateEvent">
								{{ $t('booking.update') }}
							</button>
							<button @click="removeEventConfirm" class="button-border">
								{{ $t('booking.remove') }}
							</button>
						</div>
					</div>
				</div>
			</div>
			<!-- Remove Event Modal -->
			<div
				v-if="showEventDeleteDialog2"
				id="myModalBookingCal"
				class="modal"
				:class="showEventDeleteDialog2 ? 'model-show' : ''"
			>
				<!-- Modal content -->
				<div class="modal-content">
					<div class="modal-header">
						<h2 class="mb-1">{{ $t('booking.cancel_booking') }}</h2>
						<span @click="closeEventDeleteDialog" class="close">&times;</span>
					</div>
					<div class="modal-body">
						<div class="select-time">
							<p>
								{{ $t('booking.after_cancelling_your_location') }}
							</p>
						</div>
						<button @click="removeEvent2" class="cancel-button">
							{{ $t('booking.confirm_cancellation') }}
						</button>
					</div>
				</div>
			</div>
			<div
				v-if="showEventDeleteDialog3"
				id="myModalBookingCal"
				class="modal"
				:class="showEventDeleteDialog3 ? 'model-show' : ''"
			>
				<!-- Modal content -->
				<div class="modal-content">
					<div class="modal-header">
						<h2 class="mb-1">{{ $t('booking.cancel_booking') }}</h2>
						<span @click="closeEventDeleteDialog" class="close">&times;</span>
					</div>
					<div class="modal-body">
						<div class="select-time">
							<p>{{ $t('booking.sorry_cancellation_possible_within_24') }}</p>
						</div>
						<button @click="closeEventDeleteDialog" class="cancel-button">
							{{ $t('booking.okay') }}
						</button>
					</div>
				</div>
			</div>
			<div
				v-if="showEventDeleteDialog"
				id="myModalBookingCal"
				class="modal"
				:class="showEventDeleteDialog ? 'model-show' : ''"
			>
				<!-- Modal content -->
				<div class="modal-content">
					<div class="modal-header">
						<h2 class="mb-1">{{ $t('booking.cancel_booking') }}</h2>
						<span @click="closeEventDeleteDialog" class="close1">&times;</span>
					</div>
					<div class="modal-body">
						<div class="m-2">
							<p>{{ $t('booking.are_you_sure') }}</p>
						</div>
						<button @click="removeEvent" class="cancel-button">
							{{ $t('booking.confirm_cancellation') }}
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import Vue from 'vue';
import VueCal from 'vue-cal';
import 'vue-cal/dist/vuecal.css';
import dayjs from 'dayjs';
import { mapGetters } from 'vuex';
import firebase from 'firebase';
import store from '@/store';
import utc from 'dayjs/plugin/utc';
import tz from 'dayjs/plugin/timezone';
// Utils
var isSameOrBefore = require('dayjs/plugin/isSameOrBefore');
dayjs.extend(isSameOrBefore);

import { convertMatchTitle, convertMatchName } from '@/utils';

export default Vue.extend({
	components: {
		VueCal,
		flatPickr,
	},
	props: {
		pitches: [],
		location: [],
		matchesByLocation: [],
		reservedEvents: [],
		customerBookings: [],
		mobile: Boolean,
		selectedBookingData: Object,
		selectedCalEvent: [],
	},
	data() {
		return {
			price: 0,
			todayCount: dayjs().day(),
			from: null,
			to: null,
			tempfrom: null,
			tempto: null,
			tempdate: null,
			config: {
				enableTime: true,
				noCalendar: true,
				dateFormat: 'H:i',
				time_24hr: true,
				minTime: '0:00',
				maxTime: '23:59',
				minuteIncrement: 15,
			},
			canceledBooking: {
				matches: [],
				location_id: '',
				pitch_size: '',
			},
			activeView: 'week',
			hideWeekdays: [],
			selectedDate: new Date(),
			currentPitch: 0,
			filteredPitches: [],
			minSplitWidth: 80,
			minCellWidth: 150,
			showEventCreationDialog: false,
			showEventDeleteDialog: false,
			showEventDeleteDialog2: false,
			showEventDeleteDialog3: false,
			selectedEvent: null,
			calendarWeekText: this.fomatCalendarWeekText(new Date()),
			prevControllDisable: true,
			calendarEvents: [],
			selectedCalendarEvents: [],
			tempEvent: null,
			addEventPopup: true,
			dblClickFlag: true,
			tempmatches: [],
			tempmatches2: [],
			modalError: '',
			alertError: '',
			today: new Date(),
			datepick: '',
			selectedDateToggle: false,
			playerBookedSchedules: [],
			backup_loaded: [],
			timeCellHeight: 40,
			booked_schedules: [],
		};
	},
	computed: {
		...mapGetters(['getSelectedBooking']),
		// Get the Monday of the real time current week.
		previousFirstDayOfWeek() {
			return new Date(new Date().setDate(new Date().getDate() - ((new Date().getDay() + 6) % 7)));
		},
		deletedTeams() {
			const teams = [];
			return teams;
		},
	},
	watch: {
		matchesByLocation(val) {
			this.events();
		},
		location() {
			this.pitchFilter();
		},
		selectedBookingData: {
			handler: function (after, before) {
				this.pitchFilter();
				this.events();
			},
			deep: true,
		},
	},
	methods: {
		scrollToTime() {
			const now = new Date();
			const calendar = document.querySelector('#vuecalid .vuecal__bg');
			var hours = 16 + 0 / 60;
			if (this.$store.state.Customerbooking.editBooking != null) {
				hours = this.$store.state.Customerbooking.editBooking.time_from;
				hours = hours.substring(0, hours.indexOf(':'));
				hours = Number(hours) - 5;
				// if (Number(hours) > 12) {
				// 	hours = Number(hours) / 30;
				// 	alert(hours);
				// } else {
				// 	hours = Number(hours) / 60;
				// }
				// hours = Math.floor(hours);
				// alert(hours);
				calendar.scrollTo({ top: hours * this.timeCellHeight, behavior: 'smooth' });
			} else {
				calendar.scrollTo({ top: hours * this.timeCellHeight, behavior: 'smooth' });
			}
		},
		enableDBLClick(event) {
			this.dblClickFlag = true;
		},
		dateChange() {
			this.hideWeekDays();
			this.events();
		},
		toggleSelectedDate() {
			if (this.selectedDateToggle == false) {
				this.selectedDateToggle = true;
			} else {
				this.selectedDateToggle = false;
			}
		},
		selectDateCalled(event) {
			console.log(dayjs(event));
			// console.log(this.datepick);
			// var selectedDate = this.datepick;
			console.log('timestamp: ', event.timeStamp);
			var day = dayjs(event).format('dddd');
			console.log('dayjs: ', dayjs(event).format('dddd'));
			var tempSelectedDate = '';
			// var tempjs = '';
			switch (day) {
				case 'Monday':
					tempSelectedDate = dayjs(event).format('YYYY-MM-DD');
					break;
				case 'Tuesday':
					tempSelectedDate = dayjs(event).subtract(1, 'day').format('YYYY-MM-DD');
					break;
				case 'Wednesday':
					tempSelectedDate = dayjs(event).subtract(2, 'day').format('YYYY-MM-DD');
					break;
				case 'Thursday':
					tempSelectedDate = dayjs(event).subtract(3, 'day').format('YYYY-MM-DD');
					break;
				case 'Friday':
					tempSelectedDate = dayjs(event).subtract(4, 'day').format('YYYY-MM-DD');
					break;
				case 'Saturday':
					tempSelectedDate = dayjs(event).subtract(5, 'day').format('YYYY-MM-DD');
					break;
				case 'Sunday':
					tempSelectedDate = dayjs(event).subtract(6, 'day').format('YYYY-MM-DD');
					break;
			}
			var today = dayjs(new Date()).format('YYYY-MM-DD');
			if (dayjs(tempSelectedDate).diff(today, 'day', true) <= 1) {
				this.selectedDate = dayjs(new Date()).format('YYYY-MM-DD');
			} else {
				this.selectedDate = tempSelectedDate;
			}
			console.log('today: ', dayjs(new Date()));
			this.selectedDateToggle = false;
			this.calendarWeekText = this.fomatCalendarWeekText(this.selectedDate);
			// this.selectedDate = tempSelectedDate;
		},
		dateChanged() {
			console.log(this.datepick);
			var selectedDate = this.datepick;
			console.log('dayjs: ', dayjs(this.datepick).format('dddd'));
		},
		async events() {
			console.log('here eventscalled');
			let events = [];
			let futureMatchesWithResults = [];
			const currentDate = new Date();
			if (this.matchesByLocation == undefined && this.$store.state.Customerbooking != undefined) {
				if (this.$store.state.Customerbooking.selectedBooking != null) {
					const param = [];
					param['id'] = this.$store.state.Customerbooking.selectedBooking.location_id;
					param['pastdate'] = dayjs().subtract(1, 'month').format('YYYY-MM-DD');
					// eslint-disable-next-line vue/no-mutating-props
					this.matchesByLocation = await this.$store.dispatch('getMatchesByLocationAndDate', param);
				}
			}
			this.matchesByLocation.map((match) => {
				const arr = match.kick_off_time.split('+');
				let matchDate = new Date(match.date + ' ' + match.kick_off_time);
				if (arr.length > 0) {
					matchDate = new Date(match.date + ' ' + arr[0]);
				}
				if (match.home_score !== null && match.away_score !== null && currentDate < matchDate) {
					futureMatchesWithResults.push(match);
				}
			});
			console.log('here test');
			const filteredMatches = this.matchesByLocation.filter((match) => {
				return !futureMatchesWithResults.find((m) => {
					return match.id === m.id;
				});
			});
			console.log('passed matchesByLocation');
			// this.selectedBokking2();
			const matches = filteredMatches;
			matches.map((m, index) => {
				if (m.deleted_at) return;
				if (m.placeholder_home_team && m.phHomeTeamObj.type !== 'seed') return;
				if (m.placeholder_away_team && m.phAwayTeamObj.type !== 'seed') return;
				// Get team info
				let homeTeam = '';
				let awayTeam = '';
				if (m.home_team) homeTeam = m.homeTeamObj.name;
				if (m.placeholder_home_team) homeTeam = m.phHomeTeamObj.name;
				if (m.away_team) awayTeam = m.awayTeamObj.name;
				if (m.placeholder_away_team) awayTeam = m.phAwayTeamObj.name;

				// check if any deleted team's matches (if any then will not show in calendar)
				let deletedFlag = true;
				// if (this.deletedTeams.includes(homeTeam) && !m.home_score) deletedFlag = false;
				// if (this.deletedTeams.includes(awayTeam) && !m.away_score) deletedFlag = false;
				var homeCheck = this.deletedTeams.filter(function (elm) {
					if (elm.league == m.league && elm.team_name == homeTeam) return elm;
				});
				var awayCheck = this.deletedTeams.filter(function (elm) {
					if (elm.league == m.league && elm.team_name == awayTeam) return elm;
				});
				if (homeCheck.length > 0) deletedFlag = false;
				if (awayCheck.length > 0) deletedFlag = false;

				// Get time info
				const arr = m.kick_off_time.split('+');
				const start = dayjs(`${m.date} ${arr[0]}`).format('YYYY/MM/DD HH:mm');
				const end = dayjs(`${m.date} ${arr[0]}`)
					.add(m.slot_time, 'minute')
					.format('YYYY/MM/DD HH:mm');
				// Styling
				const isResult = m.home_score !== null && m.away_score !== null;
				let color = '';
				// TODO: Dynamically assign colors
				// const color2 = assignCalendarColor(m, [...new Set(eventTypes)]);
				if (m.league) {
					if (m.leagueObj.league_type === 'mini-league') color = 'cal-bg-red';
					else color = 'cal-bg-purple';
				} else if (m.finals_group || m.finals_knockout) {
					color = 'cal-bg-blue';
				} else {
					color = 'cal-bg-gray';
				}
				const _class = `sport tw-p-4 pt-2 tw-flex tw-flex-col tw-justify-start ${color}`;
				if (deletedFlag) {
					events.push({
						pitchId: m.pitch,
						start,
						end,
						title: '',
						homeTeam,
						homeScore: m.home_score,
						awayTeam,
						awayScore: m.away_score,
						isResult,
						class: _class,
						split: m.pitch,
						deletable: false,
						resizable: false,
						matchId: m.id,
						date: m.date,
						matchName: convertMatchName(m),
						referee: m.referee
							? `${m.refereeObj.first_name} ${m.refereeObj.last_name ? m.refereeObj.last_name : ''}`
							: 'Unassigned',
						deleted: false,
						ignored: false,
						content: '<i class="icon material-icons">clear</i>',
					});
				}
			});
			this.selectedCalendarEvents.map((se) => {
				events.push(se);
			});

			let deleted_dates = [];
			let ignored_dates = [];
			// bookings - customer bookings & reserved fields
			const color = 'red';
			const _class = `sport tw-p-4 pt-2 tw-flex tw-flex-col tw-justify-start ${color}`;
			[...this.reservedEvents, ...this.customerBookings].map((event) => {
				if (event.duration === 'Once') {
					const start = dayjs(`${event.date} ${event.time_from}`).format('YYYY/MM/DD HH:mm');
					const end = dayjs(`${event.date} ${event.time_to}`).format('YYYY/MM/DD HH:mm');
					events.push({
						pitchId: event.field,
						start,
						end,
						title: '',
						class: _class,
						split: event.field,
						duration: event.duration,
						id: event.id,
						date: event.date,
						time_from: event.time_from,
						time_to: event.time_to,
						frequency: event.frequency,
						deleted: false,
						ignored: false,
						content: '<i class="icon material-icons">clear</i>',
					});
				} else {
					const eventDate = event.date;
					if (event.deleted_dates) {
						event.deleted_dates.map((e) => {
							deleted_dates.push(e);
						});
					}
					if (event.ignored_dates) {
						event.ignored_dates.map((e) => {
							ignored_dates.push(e);
						});
					}
					for (let i = 0; i < event.frequency; i++) {
						const start = dayjs(`${event.date} ${event.time_from}`).format('YYYY/MM/DD HH:mm');
						const end = dayjs(`${event.date} ${event.time_to}`).format('YYYY/MM/DD HH:mm');
						events.push({
							pitchId: event.field,
							start,
							end,
							title: '',
							class: _class,
							split: event.field,
							duration: event.duration,
							id: event.id,
							date: event.date,
							time_from: event.time_from,
							time_to: event.time_to,
							frequency: event.frequency,
							deleted: false,
							ignored: false,
							content: '<i class="icon material-icons">clear</i>',
						});
						if (event.duration === 'Daily') {
							event.date = dayjs(event.date).add(1, 'day').format('YYYY-MM-DD');
						}
						if (event.duration === 'Weekly') {
							event.date = dayjs(event.date).add(7, 'day').format('YYYY-MM-DD');
						}
						if (event.duration === 'Monthly') {
							var date = new Date(event.date);
							event.date = date.setMonth(date.getMonth() + 1);
							event.date = dayjs(event.date).format('YYYY-MM-DD');
						}
					}
					event.date = eventDate;
				}
			});
			var player_booked_events = this.playerBookedSchedules;
			var player_id;
			if (this.$store.state.Player.player != null) {
				player_id = this.$store.state.Player.player.id;
			} else {
				player_id = '';
			}

			player_booked_events.map((item) => {
				if (player_id == item.player_booking.player_id) {
					if (!this.backup_loaded.includes(item.id)) {
						events.push({
							start: item.date + ' ' + item.time_from,
							end: item.date + ' ' + item.time_to,
							title: '',
							id: item.id,
							homeTeam: null,
							homeScore: null,
							awayTeam: null,
							awayScore: null,
							isResult: null,
							split: item.split,
							deletable: false,
							resizable: false,
							matchId: null,
							// date: date,
							matchName: null,
							referee: 'Unassigned',
							deleted: false,
							ignored: false,
							time_from: item.time_from,
							time_to: item.time_to,
							content:
								'<span class="toogle_booked_title">Booked</span><span class="toogle_booked_logo"><i class="icon material-icons">edit</i></span>',
							pitch_type: item.pitch_type,
							// pitchId: this.selectedBookingData.pitch_id,
							pitchId: item.pitchId,
							price: item.price,
							original_price: item.price,
							original_from: item.time_from,
							original_to: item.time_to,
							class: 'booked_myself',
							customerBooking: true,
							date: item.date,
							player_booking: item.player_booking,
							player_booking_id: item.player_booking_id,
							pitch_id: item.pitch_id,
							location_id: item.location_id,
							display_date: item.display_date,
						});
					}
				} else {
					events.push({
						pitchId: item.pitchId,
						start: item.date + ' ' + item.time_from,
						end: item.date + ' ' + item.time_to,
						title: '',
						class: 'vuecal__event sport tw-p-4 pt-2 tw-flex tw-flex-col tw-justify-start red',
						split: item.split,
						duration: '',
						id: item.id,
						date: item.date,
						time_from: item.time_from,
						time_to: item.time_to,
						deleted: false,
						ignored: false,
						content: '<i class="icon material-icons">clear</i>',
					});
				}
			});
			if (this.$store.state.Customerbooking != null) {
				if (this.$store.state.Customerbooking.selectedBooking != null) {
					if (this.$store.state.Customerbooking.selectedBooking.matches2.length > 0) {
						this.$store.state.Customerbooking.selectedBooking.matches2.map((item) => {
							events.push(item);
							// alert(item.time_to);
						});
					}
				}
			}
			// End bookings
			events.map((event) => {
				if (event.id) {
					deleted_dates.map((e) => {
						if (e.event_id === event.id && e.date === event.date) event.deleted = true;
					});
					ignored_dates.map((e) => {
						if (e.event_id === event.id && e.date === event.date) event.ignored = true;
					});
				}
			});
			events = events.filter((event) => !event.deleted && !event.ignored);
			let closedField = [];
			// TODO: Add closed events
			let n = this.todayCount;
			// loop all present days
			// monday = 1; sunday=7
			for (let i = n; i <= 7; i++) {
				let nextDate = this.selectedDate;
				nextDate = dayjs(nextDate)
					.add(i - n, 'day')
					.format('YYYY-MM-DD');
				// filter venues
				this.filteredPitches.map((value) => {
					const daysArr = this.getDaysArray(value);
					// Sunday is 7 but in array it will return it on 0
					let selectday = null;
					let aFrom = null;
					let aTo = null;
					let aPrice = null;
					if (i == 7) {
						selectday = daysArr[0];
						aFrom = daysArr[0].day + 'From';
						aTo = daysArr[0].day + 'To';
						aPrice = daysArr[0].day + 'Price';
					} else {
						selectday = daysArr[i];
						aFrom = daysArr[i].day + 'From';
						aTo = daysArr[i].day + 'To';
						aPrice = daysArr[i].day + 'Price';
					}
					if (value.p[aFrom] && value.p[aTo] && value.p[aPrice]) {
						closedField.push({
							pitchId: value.p.id,
							start: nextDate + ' ' + '00:00',
							end: nextDate + ' ' + value.p[aFrom],
							title: '',
							homeTeam: '',
							homeScore: null,
							isResult: false,
							class: 'sport tw-p-4 pt-2 tw-flex tw-flex-col tw-justify-start grey cal-bg-purple',
							split: value.p.id,
							deletable: false,
							resizable: false,
							matchId: value.p.id,
							date: nextDate,
							deleted: false,
							ignored: false,
							content: '<i class="icon material-icons">clear</i>',
						});
						closedField.push({
							pitchId: value.p.id,
							start: nextDate + ' ' + value.p[aTo],
							end: nextDate + ' ' + '23:59',
							title: '',
							homeTeam: '',
							homeScore: null,
							isResult: false,
							class: 'sport tw-p-4 pt-2 tw-flex tw-flex-col tw-justify-start grey cal-bg-purple',
							split: value.p.id,
							deletable: false,
							resizable: false,
							matchId: value.p.id,
							date: nextDate,
							deleted: false,
							ignored: false,
							content: '<i class="icon material-icons">clear</i>',
						});
					} else {
						closedField.push({
							pitchId: value.p.id,
							start: nextDate + ' ' + '00:00',
							end: nextDate + ' ' + '24:00',
							title: '',
							homeTeam: '',
							homeScore: null,
							isResult: false,
							class: 'sport tw-p-4 pt-2 tw-flex tw-flex-col tw-justify-start grey cal-bg-purple',
							split: value.p.id,
							deletable: false,
							resizable: false,
							matchId: value.p.id,
							date: nextDate,
							deleted: false,
							ignored: false,
							content: '<i class="icon material-icons">clear</i>',
						});
					}
				});
			}
			// eslint-disable-next-line vue/no-side-effects-in-computed-properties
			events = events.concat(closedField);
			this.calendarEvents = events;
			return events;
		},
		pitchFilter() {
			if (this.location.length < 1) return [];
			let pitches = null;
			if (this.selectedBookingData.pitch_type == '') {
				pitches = this.location.pitches.map((p, index) => {
					const n = index + 1;
					return {
						p: p,
						id: p.id,
						class: n % 2 ? 'pitch-odd' : 'pitch-even',
						// label: `Pitch ${p.pitch_name || p.name}`,
						label: `Field #${n}`,
					};
				});
			} else {
				pitches = this.location.pitches
					.filter((pf) => {
						if (pf.type == this.selectedBookingData.pitch_type) {
							return pf;
						}
					})
					.map((p, index) => {
						const n = index + 1;
						return {
							p: p,
							id: p.id,
							class: n % 2 ? 'pitch-odd' : 'pitch-even',
							// label: `Pitch ${p.pitch_name || p.name}`,
							label: `Field #${n}`,
						};
					});
			}
			if (this.mobile) {
				return (this.filteredPitches = [pitches[this.currentPitch]]);
			} else {
				return (this.filteredPitches = pitches);
			}
		},
		startTimeChange(event) {
			const latestTimeFrom = dayjs(event[0]).format('HH:mm');
			this.to = dayjs(event[0]).add(this.location.minimum_duration, 'minute').format('HH:mm');
			this.start = latestTimeFrom;
			this.modalError = '';
		},
		endTimeChange(event) {
			const latestTimeTo = dayjs(event[0]).format('HH:mm');
			this.end = latestTimeTo;
			this.modalError = '';
		},
		onEventCreate(event) {
			if (this.dblClickFlag) {
				this.modalError = '';
				this.addEventPopup = true;
				this.tempEvent = event;
				//
				console.log('selected', this.selectedCalendarEvents);
				console.log('calevents', this.calendarEvents);
				console.log('pitch-id: ', event);
				console.log('filtered pitches: ', this.filteredPitches);
				//
				var date1 = dayjs(event.date);
				var date2 = dayjs(event.date);
				var min = dayjs(event.date).format('mm');
				if (min < 30) {
					date2 = dayjs(event.date).subtract(min, 'minute');
				} else {
					min = min - 30;
					date2 = dayjs(event.date).subtract(min, 'minute');
				}
				var final_from = false;
				let overlap = false;
				this.calendarEvents.map((event) => {
					if (event.pitchId != this.tempEvent.split) {
						return false;
					}
					let start = dayjs(event.start);
					let end = dayjs(event.end);
					let result = this.dateRangeOverlapcheck(
						start,
						end,
						date2,
						dayjs(date2).add(30, 'minutes'),
						event.pitchId,
						this.selectedBookingData.pitch_id
					);
					console.log(end, date2);

					console.log('result', result);
					if (!final_from && result) {
						// alert('overlap');
						if (dayjs(result).format('HH') >= '09') {
							if (dayjs(result).format('YYYY-MM-DD') != dayjs(date2).format('YYYY-MM-DD')) {
								if (dayjs(date2).add(1, 'day').isBefore(dayjs(result))) {
									console.log('adding if if: ', dayjs(result), dayjs(date2));
									this.from = dayjs(result).format('HH:mm');
									this.to = dayjs(result)
										.add(this.location.minimum_duration, 'minute')
										.format('HH:mm');
									this.showEventCreationDialog = true;
									start = dayjs(result).format('YYYY/MM/DD HH:mm');
									end = dayjs(result)
										.add(this.location.minimum_duration, 'minute')
										.format('YYYY/MM/DD HH:mm');
									// console.log('event ', event);
									this.selectedCalendarEvents.push({
										start,
										end,
										title: '',
										homeTeam: null,
										homeScore: null,
										awayTeam: null,
										awayScore: null,
										isResult: null,
										split: event.split,
										deletable: false,
										resizable: false,
										matchId: null,
										// date: date,
										matchName: null,
										referee: 'Unassigned',
										deleted: false,
										ignored: false,
										time_from: this.from,
										time_to: this.to,
										content: 'Selecting Field',
										pitch_type: this.$store.state.Customerbooking.selectedPitch.type,
										// pitchId: this.selectedBookingData.pitch_id,
										pitchId: this.$store.state.Customerbooking.selectedPitch.id,
										price: 0,
										class: 'green',
										customerBooking: true,
									});
									this.events();
									overlap = true;
									final_from = true;
									return false;
								} else {
									console.log('adding else else: ', dayjs(date2).format('HH:mm'));
									this.from = dayjs(date2).format('HH:mm');
									this.to = dayjs(date2)
										.add(this.location.minimum_duration, 'minute')
										.format('HH:mm');
									start = dayjs(date2).format('YYYY/MM/DD HH:mm');
									end = dayjs(date2)
										.add(this.location.minimum_duration, 'minute')
										.format('YYYY/MM/DD HH:mm');
									// console.log('event ', event);
									this.selectedCalendarEvents.push({
										start,
										end,
										title: '',
										homeTeam: null,
										homeScore: null,
										awayTeam: null,
										awayScore: null,
										isResult: null,
										split: event.split,
										deletable: false,
										resizable: false,
										matchId: null,
										// date: date,
										matchName: null,
										referee: 'Unassigned',
										deleted: false,
										ignored: false,
										time_from: this.from,
										time_to: this.to,
										content: 'Selecting Field',
										pitch_type: this.$store.state.Customerbooking.selectedPitch.type,
										// pitchId: this.selectedBookingData.pitch_id,
										pitchId: this.$store.state.Customerbooking.selectedPitch.id,
										price: 0,
										class: 'green',
										customerBooking: true,
									});
									this.events();
									overlap = true;
									final_from = true;
									return false;
								}
							} else if (
								dayjs(date2).isSameOrBefore(dayjs(result)) &&
								dayjs(date2).add(30, 'minute').isSameOrBefore(result)
							) {
								console.log('adding else if: ', dayjs(result), dayjs(date2));
								this.from = dayjs(date2).format('HH:mm');
								this.to = dayjs(date2)
									.add(this.location.minimum_duration, 'minute')
									.format('HH:mm');
								start = dayjs(date2).format('YYYY/MM/DD HH:mm');
								end = dayjs(date2)
									.add(this.location.minimum_duration, 'minute')
									.format('YYYY/MM/DD HH:mm');
								// console.log('event ', event);
								// this.selectedCalendarEvents.push({
								// 	start,
								// 	end,
								// 	title: '',
								// 	homeTeam: null,
								// 	homeScore: null,
								// 	awayTeam: null,
								// 	awayScore: null,
								// 	isResult: null,
								// 	split: event.split,
								// 	deletable: false,
								// 	resizable: false,
								// 	matchId: null,
								// 	// date: date,
								// 	matchName: null,
								// 	referee: 'Unassigned',
								// 	deleted: false,
								// 	ignored: false,
								// 	time_from: this.from,
								// 	time_to: this.to,
								// 	content: 'Selecting Field',
								// 	pitch_type: this.$store.state.Customerbooking.selectedPitch.type,
								// 	// pitchId: this.selectedBookingData.pitch_id,
								// 	pitchId: this.$store.state.Customerbooking.selectedPitch.id,
								// 	price: 0,
								// 	class: 'green',
								// 	customerBooking: true,
								// });
								this.showEventCreationDialog = true;
								this.modalError = this.$t('booking.this_time_slot_is_not_possible') + '.';
								// alert('Please select valid time');
								// this.events();
								overlap = true;
								final_from = true;
								return false;
							} else {
								console.log('adding else: ', dayjs(result).format('HH:mm'));
								this.from = dayjs(result).format('HH:mm');
								this.to = dayjs(result)
									.add(this.location.minimum_duration, 'minute')
									.format('HH:mm');
								this.showEventCreationDialog = true;
								start = dayjs(result).format('YYYY/MM/DD HH:mm');
								end = dayjs(result)
									.add(this.location.minimum_duration, 'minute')
									.format('YYYY/MM/DD HH:mm');
								// console.log('event ', event);
								this.selectedCalendarEvents.push({
									start,
									end,
									title: '',
									homeTeam: null,
									homeScore: null,
									awayTeam: null,
									awayScore: null,
									isResult: null,
									split: event.split,
									deletable: false,
									resizable: false,
									matchId: null,
									// date: date,
									matchName: null,
									referee: 'Unassigned',
									deleted: false,
									ignored: false,
									time_from: this.from,
									time_to: this.to,
									content: 'Selecting Field',
									pitch_type: this.$store.state.Customerbooking.selectedPitch.type,
									// pitchId: this.selectedBookingData.pitch_id,
									pitchId: this.$store.state.Customerbooking.selectedPitch.id,
									price: 0,
									class: 'green',
									customerBooking: true,
								});
								this.events();
								overlap = true;
								final_from = true;
								return false;
							}
						}
					}
				});
				if (overlap) {
					return false;
				}
				if (!final_from) {
					console.log('here');
					this.from = dayjs(date2).format('HH:mm');
					this.to = dayjs(date2).add(this.location.minimum_duration, 'minute').format('HH:mm');
					this.showEventCreationDialog = true;
					var start = dayjs(date2).format('YYYY/MM/DD HH:mm');
					var end = dayjs(date2)
						.add(this.location.minimum_duration, 'minute')
						.format('YYYY/MM/DD HH:mm');
					// console.log('event ', event);
					this.selectedCalendarEvents.push({
						start,
						end,
						title: '',
						homeTeam: null,
						homeScore: null,
						awayTeam: null,
						awayScore: null,
						isResult: null,
						split: event.split,
						deletable: false,
						resizable: false,
						matchId: null,
						// date: date,
						matchName: null,
						referee: 'Unassigned',
						deleted: false,
						ignored: false,
						time_from: this.from,
						time_to: this.to,
						content: 'Selecting Field',
						pitch_type: this.$store.state.Customerbooking.selectedPitch.type,
						// pitchId: this.selectedBookingData.pitch_id,
						pitchId: this.$store.state.Customerbooking.selectedPitch.id,
						price: 0,
						class: 'green',
						customerBooking: true,
					});
					this.events();
				}
			}
		},
		onExistingEventClick(event) {
			this.dblClickFlag = false;
			setTimeout(() => (this.dblClickFlag = true), 2000); // To avoid open both create and edit popup
			this.addEventPopup = false;
			this.from = dayjs(event.start).format('HH:mm');
			this.to = dayjs(event.end).format('HH:mm');
			this.tempEvent = event;
			// console.log('onExistingEventClick', event);
			if (event.customerBooking) {
				this.tempfrom = dayjs(event.start).format('HH:mm');
				this.tempto = dayjs(event.end).format('HH:mm');
				this.tempdate = dayjs(event.date).format('YYYY-MM-DD');
				// console.log('temp-date:' + this.tempdate);
				this.modalError = '';
				this.showEventCreationDialog = true;
			} else if (event.class == 'green') {
				this.tempfrom = dayjs(event.start).format('HH:mm');
				this.tempto = dayjs(event.end).format('HH:mm');
				this.tempdate = dayjs(event.date).format('YYYY-MM-DD');
				// console.log('temp-date:' + this.tempdate);
				this.modalError = '';
				this.showEventCreationDialog = true;
			} else if (event.class == 'booked_myself') {
				this.tempfrom = dayjs(event.start).format('HH:mm');
				this.tempto = dayjs(event.end).format('HH:mm');
				this.tempdate = dayjs(event.date).format('YYYY-MM-DD');
				// console.log('temp-date:' + this.tempdate);
				this.modalError = '';
				this.showEventCreationDialog = true;
			}
		},
		closeEventCreationDialog() {
			this.showEventCreationDialog = false;
			this.clearTempData();
			const finalBookedEvents = this.selectedCalendarEvents.filter((event) => {
				if ('Selecting Field' == event.content) {
				} else {
					return event;
				}
			});
			this.selectedCalendarEvents = finalBookedEvents;
			this.events();
		},
		closeEventDeleteDialog() {
			this.showEventDeleteDialog = false;
			this.showEventDeleteDialog2 = false;
			this.showEventDeleteDialog3 = false;
			this.clearTempData();
			const finalBookedEvents = this.selectedCalendarEvents.filter((event) => {
				if ('Selecting Field' == event.content) {
				} else {
					return event;
				}
			});
			this.selectedCalendarEvents = finalBookedEvents;
			this.events();
		},

		dateRangeOverlaps(a_start, a_end, b_start, b_end) {
			if (b_start.isSameOrBefore(a_start) && a_start.isSameOrBefore(b_end)) {
				console.log('b starts in a');
				if (b_end.isSame(a_start)) {
					return false;
				}
				return true; // b starts in a
			}
			if (b_start.isSameOrBefore(a_end) && a_end.isSameOrBefore(b_end)) {
				console.log(a_start, a_end, b_start, b_end);
				if (a_end.isSame(b_start)) {
					return false;
				}
				console.log('b ends in a');
				return true; // b ends in a
			}
			if (a_start.isBefore(b_start) && b_end.isBefore(a_end)) {
				console.log('a in b');
				return true; // a in b
			}
			return false;
		},

		dateRangeOverlapsValue(a_start, a_end, b_start, b_end) {
			if (b_start.isSameOrBefore(a_start) && a_start.isSameOrBefore(b_end)) {
				console.log('b starts in a');
				if (b_end.isSame(a_start)) {
					return false;
				}
				return 'b starts in a'; // b starts in a
			}
			if (b_start.isSameOrBefore(a_end) && a_end.isSameOrBefore(b_end)) {
				console.log(a_start, a_end, b_start, b_end);
				if (a_end.isSame(b_start)) {
					return false;
				}
				console.log('b ends in a');
				return 'b ends in a'; // b ends in a
			}
			if (a_start.isBefore(b_start) && b_end.isBefore(a_end)) {
				console.log('a in b');
				return 'a in b'; // a in b
			}
			return false;
		},

		dateRangeOverlapcheck(a_start, a_end, b_start, b_end) {
			if (b_start.isSameOrBefore(a_start) && a_start.isSameOrBefore(b_end)) {
				console.log('b starts in a');
				return a_end; // b starts in a
			}
			if (b_start.isSameOrBefore(a_end) && a_end.isSameOrBefore(b_end)) {
				console.log(a_start, a_end, b_start, b_end);
				console.log('b ends in a');
				return a_end; // b ends in a
			}
			if (a_start.isBefore(b_start) && b_end.isBefore(a_end)) {
				console.log('a in b');
				return a_end; // a in b
			}
			return false;
		},
		addEvent() {
			const date = dayjs(this.tempEvent.date).format('YYYY-MM-DD');
			const start = dayjs(`${date} ${this.from}`).format('YYYY/MM/DD HH:mm');
			const end = dayjs(`${date} ${this.to}`).format('YYYY/MM/DD HH:mm');

			var date11 = dayjs(this.tempEvent.date).format('YYYY-MM-DD');
			var time11 = dayjs(`${date} ${this.from}`).format('HH:mm');
			date11 = dayjs(date11 + ' ' + time11);
			// alert(
			// 	dayjs(date + ' ' + time)
			// 		.add(1, 'day')
			// 		.isBefore(dayjs())
			// );
			// var timezone = require('dayjs/plugin/timezone');
			// dayjs.extend(timezone);
			dayjs.extend(utc);
			dayjs.extend(tz);
			const timeZone = dayjs.tz.guess();
			// dayjs.utc(utcDate).tz(timeZone);
			if (this.$store.state.Customerbooking.selectedBooking.countryDetails.name == 'Netherlands') {
				// if (date11.isBefore(dayjs().tz('Africa/Ceuta').add(1, 'day'))) {
				if (date11.isBefore(dayjs.utc(dayjs().add(1, 'day')).tz('Africa/Ceuta'))) {
					this.modalError = 'show_24hrs_booking_error';
					// alert('Booking before 24hrs is not possible');
					return false;
				}
			} else if (this.$store.state.Customerbooking.selectedBooking.countryDetails.name == 'USA') {
				if (date11.isBefore(dayjs.utc(dayjs().add(1, 'day')).tz('America/Phoenix'))) {
					this.modalError = 'show_24hrs_booking_error';
					// alert('Booking before 24hrs is not possible');
					return false;
				}
			}

			var fieldName = '';
			this.filteredPitches.map((item) => {
				if (item.id == this.tempEvent.split) {
					console.log('fetching field name: ', item);
					fieldName = item.label;
				}
			});

			const date1 = dayjs(start);
			const date2 = dayjs(end);
			const today = dayjs(new Date());
			//pats dates & time not allowed
			if (date1.diff(today) < 1) {
				alert('Past time is not allowed');
				return false;
			}
			// end should be greater than start
			if (date2.diff(date1) < 1) {
				alert('Invalid time');
				return false;
			}
			if (this.location.minimum_duration > date2.diff(date1) / (1000 * 60)) {
				alert('Minimum duration must be:' + this.location.minimum_duration + '(min)');
				return false;
			}

			if ((date2.diff(date1) / (1000 * 60)) % this.location.incremental_time != 0) {
				alert('The Incremental Time must be:' + this.location.incremental_time);
				return false;
			}

			let overlap = false;
			this.calendarEvents.map((event) => {
				if (event.pitchId != this.tempEvent.split) {
					return false;
				}
				if ('Selecting Field' == event.content) {
					return false;
				}
				let start = dayjs(event.start);
				let end = dayjs(event.end);
				let result = this.dateRangeOverlaps(
					start,
					end,
					date1,
					date2,
					event.pitchId,
					this.selectedBookingData.pitch_id
				);
				if (result) {
					this.modalError = this.$t('booking.please_select_an_valid_time_slot') + '.';
					// alert('overlap');
					overlap = true;
				}
			});
			if (overlap) {
				return false;
			}

			// check days price & availability
			const isAvailable = this.checkPriceOfSelectedField();
			if (!isAvailable) {
				alert('Unavailable pitch');
			}
			var tempprice = 0;
			if (this.price == '0.00') {
				this.price = 0;
			}
			// alert(this.price);
			this.filteredPitches.map((event) => {
				if (event.id == this.tempEvent.split) {
					//this is one hour price // calculate with selected
					const ttt = date2.diff(date1) / (1000 * 60 * 60);
					const total = event.p[isAvailable] * ttt;
					tempprice = total;
					this.price = parseFloat(this.price + total);
					this.$emit('updatePrice', this.price);
				}
			});

			//removing selected field event
			var finalBookedEvents = this.selectedCalendarEvents.filter((event) => {
				if ('Selecting Field' == event.content) {
				} else {
					return event;
				}
			});
			finalBookedEvents = finalBookedEvents.filter((item) => {
				if (item.pitch_type != this.$store.state.Customerbooking.selectedPitch.type) {
					return false;
				} else {
					return item;
				}
			});
			this.selectedCalendarEvents = finalBookedEvents;
			// this.refreshCost();
			const _class = `new-event tw-p-4 pt-2 tw-flex tw-flex-col tw-justify-start`;
			const display_date = dayjs(`${date}`).format('MMM DD, ') + this.from + '-' + this.to;
			this.selectedCalendarEvents.push({
				start,
				end,
				title: '',
				homeTeam: null,
				homeScore: null,
				awayTeam: null,
				awayScore: null,
				isResult: null,
				class: _class,
				split: this.tempEvent.split,
				deletable: false,
				resizable: false,
				matchId: null,
				date: date,
				matchName: null,
				referee: 'Unassigned',
				deleted: false,
				ignored: false,
				time_from: this.from,
				time_to: this.to,
				content: '<i class="icon material-icons">done</i>',
				display_date: display_date,
				pitch_type: this.selectedBookingData.pitch_type,
				// pitchId: this.selectedBookingData.pitch_id,
				pitchId: this.tempEvent.split,
				price: tempprice,
				class: 'green',
				customerBooking: true,
				fieldName: fieldName,
			});
			console.log('pitchid: ', this.selectedBookingData.pitch_id);
			this.events();
			this.showEventCreationDialog = false;
			this.filteredSelectedCalendarEvents();

			this.updatePrices(isAvailable);
			this.clearTempData();
		},
		// Just to double check
		checkPriceOfSelectedField() {
			const tempEvent = this.tempEvent;
			// 0,1,2,3,4,5,6 days
			const d = dayjs(`${tempEvent.date}`).format('d');
			const pitch = this.filteredPitches.filter((val) => val.id == tempEvent.split)[0];
			const daysArr = this.getDaysArray(pitch);
			const selectday = daysArr[d];
			console.log(tempEvent);
			const aFrom = daysArr[d].day + 'From';
			const aTo = daysArr[d].day + 'To';
			const aPrice = daysArr[d].day + 'Price';
			const date = dayjs(new Date()).format('YYYY-MM-DD');
			const a_start = dayjs(`${date} ${this.from}`);
			const a_end = dayjs(`${date} ${this.to}`);
			const b_start = dayjs(`${date} ${selectday[aFrom]}`);
			const b_end = dayjs(`${date} ${selectday[aTo]}`);
			const res = this.dateRangeOverlaps(b_start, b_end, a_start, a_end);
			if (res) {
				return aPrice;
			}
			return false;
		},
		getDaysArray(pitch) {
			return [
				{
					sunFrom: pitch.p.sunFrom,
					sunTo: pitch.p.sunTo,
					sunPrice: pitch.p.sunPrice,
					day: 'sun',
				},
				{
					monFrom: pitch.p.monFrom,
					monTo: pitch.p.monTo,
					monPrice: pitch.p.monPrice,
					day: 'mon',
				},
				{
					tueFrom: pitch.p.tueFrom,
					tueTo: pitch.p.tueTo,
					tuePrice: pitch.p.tuePrice,
					day: 'tue',
				},
				{
					wedFrom: pitch.p.wedFrom,
					wedTo: pitch.p.wedTo,
					wedPrice: pitch.p.wedPrice,
					day: 'wed',
				},
				{
					thursFrom: pitch.p.thursFrom,
					thursTo: pitch.p.thursTo,
					thursPrice: pitch.p.thursPrice,
					day: 'thurs',
				},
				{
					friFrom: pitch.p.friFrom,
					friTo: pitch.p.friTo,
					friPrice: pitch.p.friPrice,
					day: 'fri',
				},
				{
					satFrom: pitch.p.satFrom,
					satTo: pitch.p.satTo,
					satPrice: pitch.p.satPrice,
					day: 'sat',
				},
			];
		},
		updateEvent() {
			const date = dayjs(this.tempEvent.date).format('YYYY-MM-DD');
			const start = dayjs(`${date} ${this.from}`).format('YYYY/MM/DD HH:mm');
			const end = dayjs(`${date} ${this.to}`).format('YYYY/MM/DD HH:mm');
			const display_date = dayjs(`${date}`).format('MMM DD, ') + this.from + '-' + this.to;

			var fieldName = '';
			this.filteredPitches.map((item) => {
				if (item.id == this.tempEvent.split) {
					console.log('fetching field name: ', item);
					fieldName = item.label;
				}
			});

			var excludingTempEvent = this.selectedCalendarEvents.filter((event) => {
				if (
					this.tempEvent.date == event.date &&
					this.tempEvent.time_from == event.time_from &&
					this.tempEvent.time_to == event.time_to &&
					this.tempEvent.split == event.split
				) {
				} else if (this.tempEvent.class == 'booked_myself' || this.tempEvent.class == 'green') {
				} else {
					return event;
				}
			});
			console.log('excludingTempEvent', excludingTempEvent);

			const date1 = dayjs(start);
			const date2 = dayjs(end);

			// var overlap = false;

			excludingTempEvent.map((event) => {
				// if (event.pitchId != this.tempEvent.split) {
				// 	return false;
				// }
				let start = dayjs(event.start);
				let end = dayjs(event.end);
				let result = this.dateRangeOverlaps(
					start,
					end,
					date1,
					date2,
					event.pitchId,
					this.selectedBookingData.pitch_id
				);
				if (result) {
					alert('here');
					this.modalError =
						this.$t('booking.please_select_an_valid_time_slot_it_overlapping') + '.';
					// alert('overlap');
					overlap = true;
					return false;
				}
			});

			console.log('checking price date', this.tempEvent);

			excludingTempEvent = this.calendarEvents.filter((event) => {
				if (
					this.tempEvent.date == event.date &&
					this.tempEvent.time_from == event.time_from &&
					this.tempEvent.time_to == event.time_to
				) {
				} else {
					// if (this.tempEvent.class == 'green' || this.tempEvent.class == 'booked_myself') {
					// } else {
					// 	return event;
					// }
					return event;
				}
			});

			var temp_date1 = dayjs(start);
			var temp_date2 = dayjs(end);

			excludingTempEvent.map((event) => {
				// if (event.pitchId != this.tempEvent.split) {
				// 	return false;
				// }
				let start = dayjs(event.start);
				let end = dayjs(event.end);
				let result = this.dateRangeOverlapsValue(
					start,
					end,
					date1,
					date2,
					event.pitchId,
					this.selectedBookingData.pitch_id
				);
				if (result) {
					// alert(result);
					if (result == 'a in b' && event.split == this.tempEvent.split) {
						console.log(event.split == this.tempEvent.split);
					}
					if (result == 'b starts in a' || result == 'b ends in a') {
						if (event.split == this.tempEvent.split) {
							this.modalError =
								this.$t('booking.please_select_an_valid_time_slot_it_overlapping') + '.';
							// alert(result);
							overlap = true;
							return false;
						}
					} else if (this.tempEvent.class == 'booked_myself' && event.class == 'booked_myself') {
					} else if (this.tempEvent.class == 'green' && event.class == 'green') {
					} else {
						if (event.split == this.tempEvent.split) {
							console.log('checking split: ', event.split, this.tempEvent.split);
							this.modalError =
								this.$t('booking.please_select_an_valid_time_slot_it_overlapping') + '.';
							// alert(result);
							overlap = true;
							return false;
						}
					}
				}
			});

			console.log('passed validation');
			const isAvailable = this.checkPriceOfSelectedField();
			if (!isAvailable) {
				alert('Unavailable pitch');
			}
			this.refreshCost();
			// var tempprice = 0;
			var custom_exit = false;
			// this.filteredPitches.map((event) => {
			// 	if (event.id == this.tempEvent.split) {
			// 		//this is one hour price // calculate with selected
			// 		const ttt = date2.diff(date1) / (1000 * 60 * 60);
			// 		var total = event.p[isAvailable] * ttt;
			// 		console.log('ttt test', total);
			// 		if (this.tempEvent.class == 'booked_myself') {
			// 			total = Number(total) - Number(this.tempEvent.original_price);
			// 			if (total < 0) {
			// 				alert('Not valid please select time above Booked Time');
			// 				custom_exit = true;
			// 				return false;
			// 			}
			// 		}
			// 		console.log('checking price', this.tempEvent);
			// 		// if () {

			// 		// }
			// 		if (this.price == '0.00') {
			// 			this.price = 0;
			// 		}
			// 		tempprice = total;
			// 		console.log('price before adding total', this.price);
			// 		this.price = parseFloat((this.price + total).toFixed(2));
			// 		console.log('calculated price before update', this.price);
			// 		this.$emit('updatePrice', this.price);
			// 	}
			// });

			if (custom_exit) {
				return;
			}

			if (this.tempEvent.class == 'booked_myself') {
				this.selectedCalendarEvents = this.selectedCalendarEvents.filter((event) => {
					if (event.id == this.tempEvent.split) {
						console.log('removed from selectedcalendar', event);
					} else {
						return event;
					}
				});
				this.playerBookedSchedules = this.playerBookedSchedules.filter((event) => {
					// console.log(event.id);
					if (event.id == this.tempEvent.id) {
						console.log('removed from calendar events', event);
					} else {
						return event;
					}
				});
				this.selectedCalendarEvents = this.selectedCalendarEvents.filter((item) => {
					if (
						this.tempEvent.date == item.date &&
						item.class == this.tempEvent.class &&
						item.start == this.tempEvent.start
					) {
					} else {
						return item;
					}
				});
				this.selectedCalendarEvents = this.selectedCalendarEvents.filter((item) => {
					if (item.id != this.tempEvent.id) {
						return item;
					}
				});
				this.selectedCalendarEvents.push({
					start: this.tempEvent.date + ' ' + this.from,
					end: this.tempEvent.date + ' ' + this.to,
					title: '',
					id: this.tempEvent.id,
					homeTeam: null,
					homeScore: null,
					awayTeam: null,
					awayScore: null,
					isResult: null,
					class: 'booked_myself',
					split: this.tempEvent.split,
					deletable: false,
					resizable: false,
					matchId: null,
					date: this.tempEvent.date,
					matchName: null,
					referee: 'Unassigned',
					deleted: false,
					ignored: false,
					time_from: this.from,
					time_to: this.to,
					content: this.tempEvent.content,
					display_date: this.tempEvent.display_date,
					pitch_type: this.tempEvent.pitch_type,
					pitchId: this.tempEvent.pitchId,
					price: this.tempEvent.price,
					customerBooking: true,
					player_booking: this.tempEvent.player_booking,
					player_booking_id: this.tempEvent.player_booking_id,
					pitch_id: this.tempEvent.pitch_id,
					location_id: this.tempEvent.location_id,
					display_date: this.tempEvent.display_date,
					original_price: this.tempEvent.original_price,
					content: 'Updated',
					fieldName: fieldName,
				});
			}

			// this.refreshCost();
			// // this.price = 0;

			var inserted = false;

			console.log('events here: ', this.selectedCalendarEvents);

			if (this.$store.state.Customerbooking.selectedBooking.matches2.length == 0) {
				this.$store.state.Customerbooking.selectedBooking.matches2 =
					this.selectedCalendarEvents.filter((event) => {
						// console.log(event.id);
						if (event.class == 'booked_myself' && event.content == 'Updated') {
							return event;
						}
					});
			} else if (this.tempEvent.class == 'booked_myself') {
				this.$store.state.Customerbooking.selectedBooking.matches2 =
					this.$store.state.Customerbooking.selectedBooking.matches2.filter((item) => {
						if (item.id != this.tempEvent.id) {
							return item;
						}
					});
				this.$store.state.Customerbooking.selectedBooking.matches2.push({
					start: this.tempEvent.date + ' ' + this.from,
					end: this.tempEvent.date + ' ' + this.to,
					title: '',
					id: this.tempEvent.id,
					homeTeam: null,
					homeScore: null,
					awayTeam: null,
					awayScore: null,
					isResult: null,
					class: 'booked_myself',
					split: this.tempEvent.split,
					deletable: false,
					resizable: false,
					matchId: null,
					date: this.tempEvent.date,
					matchName: null,
					referee: 'Unassigned',
					deleted: false,
					ignored: false,
					time_from: this.from,
					time_to: this.to,
					content: this.tempEvent.content,
					display_date: this.tempEvent.display_date,
					pitch_type: this.tempEvent.pitch_type,
					pitchId: this.tempEvent.pitchId,
					price: this.tempEvent.price,
					customerBooking: true,
					player_booking: this.tempEvent.player_booking,
					player_booking_id: this.tempEvent.player_booking_id,
					pitch_id: this.tempEvent.pitch_id,
					location_id: this.tempEvent.location_id,
					display_date: this.tempEvent.display_date,
					original_price: this.tempEvent.original_price,
					content: 'Updated',
					fieldName: fieldName,
				});
			}

			this.selectedCalendarEvents = this.selectedCalendarEvents.filter((item) => {
				if (item.class != 'booked_myself') {
					return item;
				} else if (item.id != this.tempEvent.id) {
					return item;
				}
			});

			const finalBookedEvents = this.selectedCalendarEvents.filter((event) => {
				if ('Selecting Field' == event.content) {
				} else {
					return event;
				}
			});
			let tempprice = 0;
			var custom_exit = false;
			this.filteredPitches.map((event) => {
				if (event.id == this.tempEvent.split) {
					//this is one hour price // calculate with selected
					const ttt = date2.diff(date1) / (1000 * 60 * 60);
					let total = event.p[isAvailable] * ttt;
					tempprice = total;
				}
			});
			console.log('tempprice', tempprice);
			this.selectedCalendarEvents.map((event) => {
				if (
					this.tempEvent.date == event.date &&
					this.tempEvent.time_from == event.time_from &&
					this.tempEvent.time_to == event.time_to &&
					this.tempEvent.split == event.split
				) {
					event.time_from = this.from;
					event.time_to = this.to;
					event.start = start;
					event.end = end;
					event.display_date = display_date;
					event.price = tempprice;
					event.fieldName = fieldName;
				}
			});
			this.updatePrices(isAvailable);
			this.events();
			this.showEventCreationDialog = false;
			this.clearTempData();
			this.filteredSelectedCalendarEvents();
		},
		removeEvent() {
			const finalBookedEvents = this.selectedCalendarEvents.filter((event) => {
				if (
					this.tempEvent.date == event.date &&
					this.tempEvent.time_from == event.time_from &&
					this.tempEvent.time_to == event.time_to
				) {
				} else {
					return event;
				}
			});
			console.log('finalBookedEvents price after remove event', this.selectedCalendarEvents);
			this.selectedCalendarEvents = finalBookedEvents;
			// var calculated_total = 0;
			// this.selectedCalendarEvents.map((item) => {
			// 	calculated_total = Number(calculated_total) + Number(item.price);
			// });
			// this.price = parseFloat(calculated_total);
			// console.log('calculated price after remove event', this.price);
			// this.$emit('updatePrice', this.price.toFixed(2));
			this.events();
			this.showEventCreationDialog = false;
			this.showEventDeleteDialog = false;
			this.filteredSelectedCalendarEvents();
			const isAvailable = this.checkPriceOfSelectedField();
			if (!isAvailable) {
				alert('Unavailable pitch');
			}
			this.updatePrices(isAvailable);
			this.clearTempData();
		},
		removeEvent2() {
			this.canceledBooking.matches = this.tempEvent;
			this.canceledBooking.location_id =
				this.$store.state.Customerbooking.selectedBooking.location_id;
			this.canceledBooking.pitch_size =
				this.$store.state.Customerbooking.selectedBooking.pitch_size;
			this.$store.state.Customerbooking.canceledBooking = this.canceledBooking;
			this.$router.push({ name: 'booking-cancel-notice' });
			this.showEventCreationDialog = false;
			this.showEventDeleteDialog2 = false;
			const isAvailable = this.checkPriceOfSelectedField();
			if (!isAvailable) {
				alert('Unavailable pitch');
			}
			this.updatePrices(isAvailable);
		},
		removeEventConfirm() {
			if (this.tempEvent.class == 'booked_myself') {
				console.log(this.tempEvent);
				var date = this.tempEvent.player_booking.date;
				var time = this.tempEvent.player_booking.time;
				date = dayjs(date + ' ' + time);
				// alert(
				// 	dayjs(date + ' ' + time)
				// 		.add(1, 'day')
				// 		.isBefore(dayjs())
				// );
				if (dayjs().isBefore(date.add(1, 'day'))) {
					this.showEventCreationDialog = false;
					this.showEventDeleteDialog2 = true;
				} else {
					if (dayjs().isBefore(date.add(1, 'day'))) {
						this.showEventCreationDialog = false;
						this.showEventDeleteDialog2 = true;
					}
					console.log(date.add(1, 'day'), dayjs());
					this.showEventCreationDialog = false;
					this.showEventDeleteDialog3 = true;
					console.log('cancel not possible modal');
				}
			} else {
				this.showEventCreationDialog = false;
				this.showEventDeleteDialog = true;
			}
			console.log('remove event', this.tempEvent);
		},
		previousDay() {
			var formatSelectDate = dayjs().format('YYYY-MM-DD');
			var prevWeekDate = dayjs(this.selectedDate).subtract(1, 'week').format('YYYY-MM-DD');
			const difff = Math.abs(dayjs(prevWeekDate).diff(formatSelectDate, 'day'));
			// set here
			if (formatSelectDate > prevWeekDate) {
				this.prevControllDisable = true;
				prevWeekDate = dayjs(prevWeekDate).add(difff, 'day').format('YYYY-MM-DD');
				this.todayCount = difff;
				this.hideWeekDays();
				if (difff < 7) {
					this.selectedDate = prevWeekDate;
					this.calendarWeekText = this.fomatCalendarWeekText(this.selectedDate);
				}
			} else {
				if (formatSelectDate == prevWeekDate) {
					this.prevControllDisable = true;
				} else {
					this.selectedDate = prevWeekDate;
					//this.selectedDate = dayjs(this.selectedDate).subtract(1, 'week').format('YYYY-MM-DD');
					this.calendarWeekText = this.fomatCalendarWeekText(this.selectedDate);
				}
			}
			if (dayjs(prevWeekDate).isBefore(dayjs())) {
				var temp_date_day = dayjs().format('dddd');
				while (true) {
					if (dayjs(prevWeekDate).format('dddd') == temp_date_day) {
						break;
					}
					prevWeekDate = dayjs(prevWeekDate).add(1, 'day').format('YYYY-MM-DD');
				}
				this.selectedDate = prevWeekDate;
				this.calendarWeekText = this.fomatCalendarWeekText(this.selectedDate);
			}
			// alert(this.selectedDate);
		},
		prevDay() {
			const formatSelectDate = dayjs().format('YYYY-MM-DD');
			const nextWeekDate = dayjs(this.selectedDate).subtract(1, 'week').format('YYYY-MM-DD');
			if (formatSelectDate < nextWeekDate) {
				this.prevControllDisable = false;
			}
			this.selectedDate = nextWeekDate;
			//this.selectedDate = dayjs(this.selectedDate).add(1, 'week').format('YYYY-MM-DD');
			this.calendarWeekText = this.fomatCalendarWeekText(this.selectedDate);
		},
		nextDay() {
			const formatSelectDate = dayjs().format('YYYY-MM-DD');
			var nextWeekDate = dayjs(this.selectedDate).add(1, 'week').format('YYYY-MM-DD');
			if (formatSelectDate < nextWeekDate) {
				this.prevControllDisable = false;
			}
			// console.log(dayjs(nextWeekDate).format('dddd'));
			while (true) {
				if (dayjs(nextWeekDate).format('dddd') == 'Monday') {
					break;
				}
				nextWeekDate = dayjs(nextWeekDate).subtract(1, 'day').format('YYYY-MM-DD');
			}
			this.selectedDate = nextWeekDate;
			//this.selectedDate = dayjs(this.selectedDate).add(1, 'week').format('YYYY-MM-DD');
			this.calendarWeekText = this.fomatCalendarWeekText(this.selectedDate);
		},
		fomatCalendarWeekText(d) {
			var today = new Date();
			const date = new Date(d);
			const day = date.getDay();
			const diff = date.getDate() - day;
			var fDay = dayjs(date.setDate(diff)).add(1, 'day').format('DD');
			const lDay = dayjs(date.setDate(diff)).add(7, 'day').format('DD');
			if (today > dayjs(this.selectedDate).toDate()) {
				console.log('greater');
				fDay = today.getDate();
			}
			if (today.getDate() == dayjs(this.selectedDate).toDate().getDate()) {
				fDay = today.getDate();
			}
			if (
				dayjs(date.setDate(diff)).add(1, 'day').format('MM') ==
				dayjs(this.selectedDate).toDate().format('MM')
			) {
				if (dayjs(this.selectedDate).format('dddd') == 'Sunday') {
					return (
						'This week (' +
						dayjs(new Date()).format('MMM') +
						'. ' +
						fDay +
						'-' +
						dayjs(new Date()).format('MMM') +
						'. ' +
						fDay +
						')'
					);
				} else {
					return (
						'This week (' + dayjs(this.selectedDate).format('MMM') + '. ' + fDay + '-' + lDay + ')'
					);
				}
			} else {
				return (
					'This week (' +
					dayjs(today).format('MMM') +
					'. ' +
					fDay +
					'-' +
					dayjs(this.selectedDate).format('MMM') +
					'. ' +
					lDay +
					')'
				);
			}
		},
		clearTempData() {
			this.showEventCreationDialog = false;
			this.from = null;
			this.to = null;
			this.tempEvent = null;
		},
		filteredSelectedCalendarEvents() {
			console.log('caledar events', this.selectedCalendarEvents);
			this.$emit('selectedCalEvent', this.selectedCalendarEvents);
		},
		hideWeekDays() {
			this.todayCount = dayjs(this.selectedDate).day();
			this.hideWeekdays = [];
			// alert(this.todayCount);
			if (this.todayCount == 0) {
				this.todayCount = 7;
			}
			for (let i = this.todayCount - 1; i >= 1; i--) {
				this.hideWeekdays.push(i);
			}
		},
		addevent(item, index) {
			if (this.tempmatches[index].class == 'booked_myself') {
				return;
			}
			var tempmatches = this.tempmatches;
			console.log('here testing', this);
			console.log(tempmatches[index].date);
			var date = dayjs(tempmatches[index].date).format('YYYY-MM-DD');
			var date1 = dayjs(tempmatches[index].start);
			var date2 = dayjs(tempmatches[index].end);
			// const start = dayjs(tempmatches[index].time_from).format('YYYY/MM/DD HH:mm');
			const start =
				dayjs(tempmatches[index].date).format('YYYY/MM/DD ') + tempmatches[index].time_from;
			const end = dayjs(tempmatches[index].date).format('YYYY/MM/DD ') + tempmatches[index].time_to;
			// const end = dayjs(tempmatches[index].time_to).format('YYYY/MM/DD HH:mm');
			var price = tempmatches[index].price;
			this.price = parseFloat((this.price + price).toFixed(2));
			this.$emit('updatePrice', this.price);
			const _class = `new-event tw-p-4 pt-2 tw-flex tw-flex-col tw-justify-start`;
			const display_date =
				dayjs(tempmatches[index].date).format('MMM DD, ') +
				tempmatches[index].time_from +
				'-' +
				tempmatches[index].time_to;
			this.selectedCalendarEvents.push({
				start,
				end,
				title: '',
				homeTeam: null,
				homeScore: null,
				awayTeam: null,
				awayScore: null,
				isResult: null,
				class: _class,
				split: tempmatches[index].split,
				deletable: false,
				resizable: false,
				matchId: null,
				date: date,
				matchName: null,
				referee: 'Unassigned',
				deleted: false,
				ignored: false,
				time_from: tempmatches[index].time_from,
				time_to: tempmatches[index].time_to,
				content: '<i class="icon material-icons">done</i>',
				display_date: display_date,
				pitch_type: tempmatches[index].pitch_type,
				pitchId: tempmatches[index].pitchId,
				price: price,
				class: 'green',
			});
			console.log('done: ', this.selectedCalendarEvents);
			// this.showEventCreationDialog = false;
			// this.clearTempData();
		},
		addevent2(item, index) {
			if (this.tempmatches2[index].id != undefined) {
				this.backup_loaded.push(this.tempmatches2[index].id);
			}
			var tempmatches = this.tempmatches2;
			console.log('here testing', this);
			console.log(tempmatches[index].date);
			var date = dayjs(tempmatches[index].date).format('YYYY-MM-DD');
			var date1 = dayjs(tempmatches[index].start);
			var date2 = dayjs(tempmatches[index].end);
			// const start = dayjs(tempmatches[index].time_from).format('YYYY/MM/DD HH:mm');
			const start =
				dayjs(tempmatches[index].date).format('YYYY/MM/DD ') + tempmatches[index].time_from;
			const end = dayjs(tempmatches[index].date).format('YYYY/MM/DD ') + tempmatches[index].time_to;
			// const end = dayjs(tempmatches[index].time_to).format('YYYY/MM/DD HH:mm');
			var price = tempmatches[index].price;
			this.price = parseFloat((this.price + price).toFixed(2));
			this.$emit('updatePrice', this.price);
			const _class = tempmatches[index].class;
			const display_date =
				dayjs(tempmatches[index].date).format('MMM DD, ') +
				tempmatches[index].time_from +
				'-' +
				tempmatches[index].time_to;
			this.selectedCalendarEvents.push({
				start,
				end,
				title: '',
				homeTeam: null,
				homeScore: null,
				awayTeam: null,
				awayScore: null,
				isResult: null,
				class: 'booked_myself',
				split: tempmatches[index].split,
				deletable: false,
				resizable: false,
				matchId: null,
				date: date,
				matchName: null,
				referee: 'Unassigned',
				deleted: false,
				ignored: false,
				time_from: tempmatches[index].time_from,
				time_to: tempmatches[index].time_to,
				content: tempmatches[index].content,
				display_date: display_date,
				pitch_type: tempmatches[index].pitch_type,
				pitchId: tempmatches[index].pitchId,
				price: price,
				id: tempmatches[index].id,
			});
			console.log('done: ', this.selectedCalendarEvents);
			// this.showEventCreationDialog = false;
			// this.clearTempData();
		},
		countTotal(item, index) {
			var tempmatches = this.tempmatches;
			var price = tempmatches[index].price;
			this.price = parseFloat((this.price + price).toFixed(2));
			this.$emit('updatePrice', this.price);
		},
		refreshCost() {
			var tempmatches = this.$store.state.Customerbooking.selectedBooking.matches;
			const tempthis = this;
			tempthis.tempmatches = tempmatches;
			this.price = 0;
			this.$emit('updatePrice', this.price);
			tempmatches.forEach(tempthis.countTotal);
		},
		createEvents() {
			console.log('perform custom events');
		},
		// selectedBokking2() {
		// 	if (this.$store.state.Customerbooking.selectedBooking2 != null) {

		// 	}
		// },
		async fetchPlayerBookingSchedules() {
			let params = {
				location_id: this.$route.params.locationId,
			};
			console.log('location id 1111111111111111111111111111', params);
			let temp = await this.$store.dispatch('getPlayerBookingScheduleOnLocation', params);
			this.playerBookedSchedules = temp.player_booking_schedules;
			console.log('Player booked schedules', this.playerBookedSchedules);
			this.events();
			return temp;
		},

		changeDateAccordingtoBooked() {
			console.log('before loop');
			if (this.$store.state.Customerbooking.editBooking != null) {
				if (this.$store.state.Customerbooking.editBooking != null) {
					var date = dayjs(this.$store.state.Customerbooking.editBooking.date);
					if (dayjs(date).isBefore(dayjs(this.selectedDate))) {
						return;
					}
					while (true) {
						if (date.format('dddd') == 'Monday') {
							// alert(date);
							if (dayjs(this.selectedDate).format('YYYY-M-D') == dayjs(date).format('YYYY-M-D')) {
								break;
							}
							this.nextDay();
						} else {
							if (date.isBefore(dayjs(this.selectedDate))) {
								break;
							}
							date = date.subtract(1, 'day');
						}
					}
				}
			} else {
				var date = false;
				if (this.$store.state.Customerbooking.selectedBooking != null) {
					if (this.$store.state.Customerbooking.selectedBooking.matches.length > 0) {
						date = dayjs(this.$store.state.Customerbooking.selectedBooking.matches[0].date).format(
							'YYYY-M-D'
						);
					} else if (this.$store.state.Customerbooking.selectedBooking.matches2.length > 0) {
						date = dayjs(this.$store.state.Customerbooking.selectedBooking.matches2[0].date).format(
							'YYYY-M-D'
						);
					}
				}
				if (dayjs(date).isBefore(dayjs(this.selectedDate))) {
					return;
				}
				if (date) {
					while (true) {
						if (dayjs(date).format('dddd') == 'Monday') {
							if (dayjs(this.selectedDate).format('YYYY-M-D') == dayjs(date).format('YYYY-M-D')) {
								break;
							} else {
								// alert(this.selectedDate);
								this.nextDay();
							}
						} else {
							if (dayjs(date).isBefore(dayjs(this.selectedDate))) {
								break;
							}
							date = dayjs(date).subtract(1, 'day');
						}
					}
				}
			}
			console.log('after loop');
			console.log('checking date: ', date.format('dddd'), this.selectedDate);
		},
		updatePrices(isAvailable) {
			this.filteredPitches.map((event) => {
				if (this.tempEvent != null) {
					if (event.id === this.tempEvent.split) {
						if (this.$store.state.Customerbooking != null) {
							if (this.$store.state.Customerbooking.selectedBooking != null) {
								let total = 0;
								if (this.$store.state.Customerbooking.selectedBooking.matches.length > 0) {
									this.$store.state.Customerbooking.selectedBooking.matches.map((item) => {
										console.log('item', item, event, isAvailable);
										let endtime = dayjs(item.date + ' ' + item.time_to);
										let starttime = dayjs(item.date + ' ' + item.time_from);
										//this is one hour price // calculate with selected
										const ttt = endtime.diff(starttime) / (1000 * 60 * 60);
										let hr_price = event.p[isAvailable] * ttt;
										console.log('calculated price: add event', hr_price);
										total = total + hr_price;
									});
								}
								if (this.$store.state.Customerbooking.selectedBooking.matches2.length > 0) {
									this.$store.state.Customerbooking.selectedBooking.matches2.map((item) => {
										let endtime = dayjs(item.date + ' ' + item.time_to);
										let starttime = dayjs(item.date + ' ' + item.time_from);
										//this is one hour price // calculate with selected
										const ttt = endtime.diff(starttime) / (1000 * 60 * 60);
										let hr_price = event.p[isAvailable] * ttt;
										total = total - item.original_price + hr_price;
										// alert(total);
									});
								}
								this.$emit('updatePrice', total.toFixed(2));
							}
						}
					}
				}
			});
		},
	},
	async mounted() {
		var dtToday = new Date();

		var month = dtToday.getMonth() + 1;
		var day = dtToday.getDate();
		var year = dtToday.getFullYear();
		if (month < 10) month = '0' + month.toString();
		if (day < 10) day = '0' + day.toString();

		var maxDate = year + '-' + month + '-' + day;
		this.today = maxDate;
		var lsPlayer = JSON.parse(localStorage.getItem('player'));
		// console.log(lsPlayer.firebase_id);
		if (typeof lsPlayer === 'object') {
			if (lsPlayer) {
				store.dispatch('getPlayerInfo', {
					firebaseId: lsPlayer.firebase_id,
					signupMethod: 'password',
				});
				var user = store.dispatch('getCurrentFirebaseUser');
				if (user) {
					console.log('logged in');
				} else {
					console.log('not logged in');
				}
			} else {
				console.log('not logged in');
			}
		}

		if (this.$store.state.Customerbooking.editBooking != null) {
			this.changeDateAccordingtoBooked();
		}
		// console.log(lsPlayer.firebase_id);
		// console.log('user->' + user);
		//////////////////////////////////////////////////////

		const tempthis = this;
		var playerBookings = this.fetchPlayerBookingSchedules();
		let resPlayerBooking = [];
		if (playerBookings) {
			playerBookings.then(function (result) {
				this.booked_schedules = result.player_booking_schedules.map((item) => {
					if (dayjs(item.date).isAfter(dayjs(new Date()))) {
						console.log('if', item);
						return item;
					}
				});
				// "Some User token"
			});
		}

		////////////////////////////////////////////////////
		var tempmatches = this.$store.state.Customerbooking.selectedBooking2.matches;
		var temp_pitch_type = tempmatches[0].pitch_type;
		tempmatches.filter((item) => {
			if (item.pitch_type == temp_pitch_type) {
				return;
			}
		});
		tempthis.tempmatches = tempmatches;
		tempmatches.forEach(tempthis.addevent);
		if (this.selectedCalendarEvents.length > 0) {
			this.changeDateAccordingtoBooked();
		}
		// tempthis.events();
		// tempthis.filteredSelectedCalendarEvents();
		// alert(this.$store.state.Customerbooking.selectedBooking2.matches.length);
		var tempmatches2 = this.$store.state.Customerbooking.selectedBooking2.matches2;
		var temp_pitch_type = tempmatches2[0].pitch_type;
		tempmatches.filter((item) => {
			if (item.pitch_type == temp_pitch_type) {
				return;
			}
		});
		tempthis.tempmatches2 = tempmatches2;
		tempmatches2.forEach(tempthis.addevent2);
		if (this.selectedCalendarEvents.length > 0) {
			this.changeDateAccordingtoBooked();
		}
		tempthis.events();
		// tempthis.filteredSelectedCalendarEvents();

		// this.callEvent.$on('callevents', tempthis.createEvents());
	},
	async created() {
		this.hideWeekDays();
		await this.pitchFilter();
		this.events();
	},
});
</script>
<style lang="scss">
.flatpickr-calendar {
	z-index: 999 !important;
}
.vuecal__event.green {
	cursor: pointer !important;
}
.vuecal__flex {
	cursor: pointer !important;
}
.booked_myself {
	cursor: pointer !important;
}
.vuecal__event {
	cursor: default;
}
.vuecal__now-line {
	z-index: 999 !important;
}
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

	#vue-demo {
		width: 97% !important;
		overflow: scroll;
	}

	// .vuecal__flex.weekday-label .full {
	// 	display: none !important;
	// }

	// .vuecal__flex.weekday-label .small {
	// 	display: block !important;
	// }
}

#vue-demo {
	width: calc(100vw - 28%);
	overflow: scroll;
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
.booked_other_player {
	background: #fa5151 !important;
	color: black !important;
}
.booked_myself {
	background: #029f8a !important;
	color: white !important;
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
	color: white !important;
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
#myModalBookingCal {
	background: transparent;
}
.modal-alert-error {
	margin-top: 5px;
	background: #fcdede;
	border-radius: 5px;
}
.modal-alert-error p {
	padding: 10px;
	color: #ad0f0f !important;
}
.close {
	float: right;
	font-size: 28px;
	font-weight: bold;
}
.close {
	background: #ddd8d8;
	width: 40px;
	height: 40px;
	border-radius: 50%;
	text-align: center;
}
.close1 {
	/* float: right; */
	font-size: 28px;
	font-weight: bold;
	background: #ddd8d8 !important;
	width: 44px !important;
	height: 40px !important;
	border-radius: 50% !important;
	text-align: center !important;
}
.modal-header h2 {
	width: 100% !important;
}
.toogle_booked_title {
	display: block !important;
}
.toogle_booked_logo {
	display: none !important;
}
.toogle_booked_logo .icon {
	color: white !important;
	border: 1px solid white !important;
}
.vuecal__event-content:hover .toogle_booked_title {
	display: none !important;
}
.vuecal__event-content:hover .toogle_booked_logo {
	display: block !important;
}
</style>
