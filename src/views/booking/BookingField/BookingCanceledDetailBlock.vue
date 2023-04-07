<template>
	<div class="d-flex w-25 box-space height-fit">
		<template v-if="loading">
			<div class="pt-64 w-full flex justify-center">
				<span class="text-2xl text-gray-800">
					<img :src="require('@/assets/loading.gif')" alt="loading gif" />
				</span>
			</div>
		</template>
		<div style="width: 100%; box-shadow: 0px 0px 52px rgba(0, 0, 0, 0.2); border-radius: 5px">
			<div class="booking-space mb-20">
				<h3 class="mb-0">{{ $t('booking.refund_details') }}</h3>
				<span>{{ $t('booking.we_will_process_your_refund_as_soon_as_possible') }}</span>
			</div>
			<div class="d-flex w-100 p-15 mb-20 justify-content-space-between">
				<h1 style="font-size: 20px">{{ location.name }}</h1>
				<span>
					<svg
						version="1.1"
						id="Capa_1"
						xmlns="http://www.w3.org/2000/svg"
						xmlns:xlink="http://www.w3.org/1999/xlink"
						x="0px"
						y="0px"
						width="16px"
						height="16px"
						viewBox="0 0 55.867 55.867"
						style="enable-background: new 0 0 55.867 55.867"
						xml:space="preserve"
					>
						<path
							style="opacity: 0.6"
							d="M55.818,21.578c-0.118-0.362-0.431-0.626-0.808-0.681L36.92,18.268L28.83,1.876c-0.168-0.342-0.516-0.558-0.896-0.558	
							s-0.729,0.216-0.896,0.558l-8.091,16.393l-18.09,2.629c-0.377,0.055-0.689,0.318-0.808,0.681c-0.117,0.361-0.02,0.759,0.253,1.024	
							l13.091,12.76l-3.091,18.018c-0.064,0.375,0.09,0.754,0.397,0.978c0.309,0.226,0.718,0.255,1.053,0.076l16.182-8.506l16.18,8.506	
							c0.146,0.077,0.307,0.115,0.466,0.115c0.207,0,0.413-0.064,0.588-0.191c0.308-0.224,0.462-0.603,0.397-0.978l-3.09-18.017	
							l13.091-12.761C55.838,22.336,55.936,21.939,55.818,21.578z"
						/>
					</svg>
					4.8
				</span>
			</div>
			<div class="p-15 mb-20">
				<p class="book-address">{{ location.address }}</p>
			</div>
			<div class="p-15 mb-20">
				<hr />
			</div>
			<div class="p-15 mb-20">
				<span class="color-orange fw-700">Options</span>
			</div>
			<div class="p-15 d-flex w-100 justify-content-space-between options">
				<h1 class="color-black">{{ $t('booking.field_size') }}</h1>
				<span class="color-theame-gray"> {{ pitch_type }} </span>
			</div>
			<div class="p-15 d-flex w-100 justify-content-space-between options">
				<h1>Field dimensions</h1>
				<span class="color-theame-gray">{{ pitch_size }}</span>
			</div>
			<div class="p-15 w-100 options" style="display: flex">
				<h1>Schedule</h1>
				<div
					:style="
						matches.length <= 1
							? 'justify-content: space-between;flex-wrap: wrap;text-align: right;width: 100%;'
							: 'display: flex;justify-content: space-between;flex-wrap: wrap;text-align: right;width: 100%;'
					"
				>
					<span class="schedule-show color-theame-gray" style="width: 100%; float: right">
						{{ display_date }}
					</span>
				</div>
			</div>
			<div class="p-15 mb-20">
				<hr />
			</div>
			<div class="p-15 mb-20">
				<span class="color-orange fw-700">Benefits</span>
			</div>
			<div
				v-for="benifit in selectedBenefits"
				:key="benifit.id"
				class="p-15 d-flex w-100 justify-content-space-between options"
			>
				<h1>{{ benifit.name }}</h1>
				<span class="color-green fw-700">{{ $t('booking.FREE') }}</span>
			</div>
			<div v-if="!selectedBenefits.length" style="text-align: center">-</div>
			<div v-if="price != ''" class="p-15 mb-20 text-center total-value">
				<h1>
					{{ location.currency }}
					{{ roundOfNumber }}
					<span v-if="getSelectedLanguage == 'nl'"> (incl. BTW)</span>
					<span v-else> (Incl tax)</span>
				</h1>
			</div>
			<!-- <a class="book-btn register-btn" type="">Book now</a> -->
			<!-- <div class="p-15 mb-20">	
					
			</div> -->
			<div class="p-15 mb-20">
				<p class="text-center fz-10"></p>
			</div>
		</div>
	</div>
</template>
<script>
import { mapGetters } from 'vuex';
import Vue from 'vue';
import { createApp } from 'vue';
import App from '@/App.vue';
import loading from 'vuejs-loading-screen';
Vue.use(loading, {
	bg: '#c0c0c099',
	icon: 'fa-solid fa-spinner',
	size: 5,
	icon_color: 'white',
});
export default {
	data() {
		return {
			loading: false,
			matches: [],
			location: [],
			selectedBenefits: [],
			price: '7.5',
			bookingErr: '',
			display_date: '',
			pitch_type: '',
			pitch_size: '',
			countryName: '',
		};
	},
	computed: {
		...mapGetters(['getSelectedLanguage']),
		roundOfNumber() {
			let round = parseFloat(this.price).toFixed(2);
			if (this.getSelectedLanguage === 'nl') {
				round = round.replace('.', ',');
			}
			return round;
		},
	},
	watch: {
		getSelectedLanguage(after, before) {
			this.selectedBenefits.forEach((ele, i) => {
				let split = ele.name.split(' ');
				if (after == 'nl') {
					if (split[0] == 'Football') ele.name = 'Voetbal ' + split[1];
					if (split[0] == 'Bibs') ele.name = 'Hesjes ' + split[1];
				} else {
					if (split[0] == 'Voetbal') ele.name = 'Football ' + split[1];
					if (split[0] == 'Hesjes') ele.name = 'Bibs ' + split[1];
				}
			});
			if (this.location.benefits) {
				this.location.benefits.forEach((ele, i) => {
					let split = ele.name.split(' ');

					if (this.getSelectedLanguage === 'nl') {
						if (split[0] == 'Football') {
							ele.name = 'Voetbal ' + split[1];
						}
						if (split[0] == 'Bibs') ele.name = 'Hesjes ' + split[1];
					} else {
						if (split[0] == 'Voetbal') ele.name = 'Football ' + split[1];
						if (split[0] == 'Hesjes') ele.name = 'Bibs ' + split[1];
					}
				});
			}
			console.log('this.location.benefits 111', this.location.benefits);
		},
	},
	methods: {
		async fetchLoggedInUser() {
			let user = this.$store.state.Player.player;
			if (!user) user = await this.$store.dispatch('getCurrentFirebaseUser');
			this.user = user;
		},
	},
	async mounted() {
		this.location = await this.$store.dispatch(
			'getLocationById',
			this.$store.state.Customerbooking.canceledBooking.location_id
		);
		if (this.$store.state.Customerbooking != null) {
			if (this.$store.state.Customerbooking.country_id != 'e2c3e9c6-2477-4f71-a056-d37a9b3f60c9') {
				this.countryName = 'USA';
			} else {
				this.countryName = 'Netherlands';
			}
		}
		console.log(this.countryName);
		this.matches = this.$store.state.Customerbooking.canceledBooking.matches;
		this.pitch_type = this.matches.pitch_type;
		this.pitch_size = this.$store.state.Customerbooking.canceledBooking.pitch_size;
		console.log('matches', this.matches);
		this.display_date = this.$store.state.Customerbooking.canceledBooking.matches.date;
		this.display_date = this.matches.date;
		this.price = this.matches.price;
		if (this.matches.class == 'booked_myself') {
			this.price = this.matches.original_price;
		}
		this.location.benefits.map((la) => {
			if (la.name) {
				let split = la.name.split(' ');

				if (this.getSelectedLanguage === 'nl') {
					if (split[0] == 'Football') {
						la.name = 'Voetbal ' + split[1];
					}
					if (split[0] == 'Bibs') la.name = 'Hesjes ' + split[1];
				}
				// if (this.getSelectedLanguage == 'nl') {
				// 	if (la.name == 'Football (x1)') la.name = 'Voetbal (x1)';
				// 	if (la.name == 'Bibs (x10)') la.name = 'Hesjes (x10)';
				// }
				this.selectedBenefits.push({
					name: la.name,
					id: la.id,
				});
			}
		});

		// performing player booking delete operation
		var datas = this.$store.state.Customerbooking.canceledBooking.matches;
		var deleteoptions = {
			date: datas.date,
			location_id: datas.location_id,
			player_booking_id: datas.player_booking_id,
			display_date: datas.display_date,
			price: datas.price,
			pitchId: datas.pitchId,
			pitch_id: datas.pitch_id,
			pitch_type: datas.pitch_type,
			split: datas.split,
			time_from: datas.time_from,
			time_to: datas.time_to,
		};
		this.$store.dispatch('setPlayerBookingCancelled', deleteoptions);
		deleteoptions = {
			id: datas.id,
		};
		this.$store.dispatch('deletePlayerBookings', deleteoptions);
		if (this.location.benefits) {
			this.location.benefits.forEach((ele, i) => {
				let split = ele.name.split(' ');

				if (this.getSelectedLanguage === 'nl') {
					if (split[0] == 'Football') {
						ele.name = 'Voetbal ' + split[1];
					}
					if (split[0] == 'Bibs') ele.name = 'Hesjes ' + split[1];
				} else {
					if (split[0] == 'Voetbal') ele.name = 'Football ' + split[1];
					if (split[0] == 'Hesjes') ele.name = 'Bibs ' + split[1];
				}
			});
		}
	},
};
</script>
<style lang="scss" scoped>
.height-fit {
	height: fit-content;
}
.error {
	background: #f8e0e0;
	border-radius: 5px;
	color: #ad0f0f;
	border: solid #ad0f0f 1px;
	padding: 5px;
	margin: 5px;
	font-weight: 600;
}
.book-address {
	color: #6a6d6d;
}
h1,
h2,
h3 {
	color: #193860 !important;
}
</style>
<style>
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
</style>
