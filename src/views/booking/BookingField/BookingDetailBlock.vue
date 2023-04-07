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
				<h3 class="mb-0">{{ $t('booking.booking_details') }}</h3>
				<span>{{ $t('booking.based_on_selected_options') }}</span>
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
				<span class="color-orange fw-700">{{ $t('booking.options') }}</span>
			</div>
			<div
				v-if="selectedSchedule.length > 0"
				class="p-15 d-flex w-100 justify-content-space-between options"
			>
				<h1 class="color-black">{{ $t('booking.field_size') }}</h1>
				<span class="color-theame-gray" v-if="selectedPitch != null">
					{{ selectedPitch.type ? selectedPitch.type : '-' }}
				</span>
			</div>
			<div
				v-if="selectedSchedule.length > 0"
				class="p-15 d-flex w-100 justify-content-space-between options"
			>
				<h1 class="color-black">{{ $t('booking.field_number') }}</h1>
				<span class="color-theame-gray">
					{{ fieldNumber ? fieldNumber : '-' }}
				</span>
			</div>
			<div
				v-if="selectedSchedule.length > 0"
				class="p-15 d-flex w-100 justify-content-space-between options"
			>
				<h1>{{ $t('booking.field_dimensions') }}</h1>
				<span class="color-theame-gray" v-if="selectedPitch != null">{{
					selectedPitch.field_size ? selectedPitch.field_size : '-'
				}}</span>
			</div>
			<div v-if="selectedSchedule.length > 0" class="p-15 w-100 options" style="display: flex">
				<h1>{{ $t('booking.schedule') }}</h1>
				<div
					:style="
						selectedSchedule.length <= 1
							? 'justify-content: space-between;flex-wrap: wrap;text-align: right;width: 100%;'
							: 'display: flex;justify-content: space-between;flex-wrap: wrap;text-align: right;width: 100%;'
					"
				>
					<span
						class="schedule-show color-theame-gray"
						v-for="(schedule, index) in selectedSchedule"
						:key="index"
						style="width: 100%; float: right"
					>
						<span v-if="schedule.class != 'booked_myself'">{{ schedule.display_date }}</span>
					</span>
					<span
						class="schedule-show color-theame-gray"
						v-for="(schedule, index) in selectedSchedule2"
						:key="index"
						style="width: 100%; float: right"
					>
						{{ schedule.display_date }}
					</span>
				</div>
			</div>
			<div v-else style="text-align: center">{{ $t('booking.no_options') }}</div>
			<br />
			<div class="p-15 mb-20">
				<hr />
			</div>
			<div class="p-15 mb-20">
				<span class="color-orange fw-700">{{ $t('booking.benefits') }}</span>
			</div>
			<template v-if="selectedSchedule.length > 0">
				<div
					v-for="benifit in selectedBenefits"
					:key="benifit.id"
					class="p-15 d-flex w-100 justify-content-space-between options"
				>
					<h1>{{ benifit.name }}</h1>
					<span class="color-green fw-700"> {{ $t('booking.FREE') }}</span>
				</div>
				<div v-if="!selectedBenefits.length" style="text-align: center">-</div>
			</template>
			<template v-else>
				<div style="text-align: center">-</div>
			</template>
			<div
				v-if="getSelectedBooking && getSelectedBooking.price"
				class="p-15 mb-20 text-center total-value"
			>
				<h1 v-if="displayZero">
					{{ location.currency }}
					{{
						getSelectedLanguage == 'nl'
							? getSelectedBooking.price.replace('.', ',')
							: getSelectedBooking.price
					}}

					<span v-if="getSelectedLanguage == 'nl'"> (incl. BTW)</span>
					<span v-else> (Incl tax)</span>
				</h1>
				<h1 v-else>
					{{ location.currency }}
					{{
						getSelectedLanguage == 'nl'
							? getSelectedBooking.price.replace('.', ',')
							: getSelectedBooking.price
					}}
					<span v-if="getSelectedLanguage == 'nl'"> (incl. BTW)</span>
					<span v-else> (Incl tax)</span>
				</h1>
			</div>
			<p class="error" v-if="bookingErr">{{ bookingErr }}</p>
			<button
				@click="BookNow"
				class="book-btn"
				v-if="$route.name == 'book-field'"
				style="width: 90%; font-weight: bolder"
			>
				{{ $t('booking.book_now').toUpperCase() }}
			</button>
			<button
				@click="PayNow"
				class="book-btn"
				v-if="$route.name == 'booking-payment'"
				style="width: 90%; font-weight: bolder"
			>
				{{ $t('booking.pay_now').toUpperCase() }}
			</button>
			<stripe-checkout
				:lineItems="lineItems"
				:pk="stripePk"
				ref="stripeRef"
				:success-url="successUrl"
				:cancel-url="cancelUrl"
				mode="payment"
				:payment_method_types="paymentMethods"
			/>
			<div ref="paypal"></div>
			<div id="ideal-bank-element" class="form-control" style="display: none"></div>
			<!-- <a class="book-btn register-btn" type="">Book now</a> -->
			<!-- <div class="p-15 mb-20">	
					
			</div> -->
			<div class="p-15 mb-20">
				<p class="text-center fz-10">
					{{ $t('booking.cancellation_is_possible') }}
				</p>
			</div>
		</div>
	</div>
</template>
<script>
import { mapGetters } from 'vuex';
import { StripeCheckout } from '@vue-stripe/vue-stripe';
import Vue from 'vue';
import { createApp } from 'vue';
import App from '@/App.vue';
import loading from 'vuejs-loading-screen';
import i18n from '@/i18n';
Vue.use(loading, {
	bg: '#c0c0c099',
	icon: 'fa-solid fa-spinner',
	size: 5,
	icon_color: 'white',
});
export default {
	components: {
		StripeCheckout,
	},
	data() {
		return {
			bookingErr: '',
			selectedSchedule: [],
			selectedSchedule2: [],
			user: null,
			location: [],
			selectedPitch: [],
			paymentMethods: ['card'],
			paymentMethod: 'card',
			card: 'discover',
			selectedBenefits: [],
			stripePk:
				'pk_test_51M7uoLJyjfKMZqRPm63an76anIFIrBAR7f0EW7XOKWtFBPp0BxiOiVCVqGlVQxsNpC9qee4QH2NHWdeR4oU7WzlL00WP7L9A07',
			lineItems: [
				{
					price: 'price_1M7xbxJyjfKMZqRPLmyPgEVt',
					quantity: 1,
				},
				{
					price: 'price_1M7xczJyjfKMZqRPJPmRr3DM',
					quantity: 1,
				},
			],
			productsPaypal: {
				price: 15.0,
				description: 'Paypal test Desc',
			},
			stripe: '',
			idealBank: '',
			successUrl:
				location.protocol +
				'//' +
				location.host +
				this.$router.resolve({ name: 'booking-success' }).route.path,
			cancelUrl:
				location.protocol +
				'//' +
				location.host +
				this.$router.resolve({ name: 'booking-cancel' }).route.path,
			loading: false,
			fieldNumber: '',
			countryName: '',
			displayZero: false,
		};
	},
	created() {
		this.fetchLoggedInUser();
		this.bookingErr = '';
	},
	computed: {
		...mapGetters(['getSelectedBooking', 'getSelectedPitch', 'getSelectedLanguage']),
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
		getSelectedBooking: {
			handler: async function (after, before) {
				// if (this.$store.state.Customerbooking.selectedBooking2 != null) {
				// 	if (
				// 		this.$store.state.Customerbooking.selectedBooking2.matches.length >
				// 		this.$store.state.Customerbooking.selectedBooking.matches.length
				// 	) {
				// 		this.selectedSchedule = this.$store.state.Customerbooking.selectedBooking2.matches;
				// 	} else {
				// 		this.selectedSchedule = this.getSelectedBooking.matches;
				// 	}
				// } else if (this.getSelectedBooking.matches) {
				// 	this.selectedSchedule = this.getSelectedBooking.matches;
				// 	if (this.selectedSchedule.length) {
				// 		this.bookingErr = '';
				// 	}
				// }
				if (this.getSelectedBooking != null) {
					if (this.getSelectedBooking.matches.length > 0) {
						this.fieldNumber = this.getSelectedBooking.matches[0].fieldName;
					} else {
						this.fieldNumber = '';
					}
				} else {
					this.fieldNumber = '';
				}
				if (this.getSelectedBooking != null) {
					this.selectedSchedule = this.getSelectedBooking.matches;
				} else {
					this.selectedSchedule = [];
				}
				if (this.getSelectedBooking != null) {
					this.selectedSchedule2 = this.getSelectedBooking.matches2;
				} else {
					this.selectedSchedule2 = [];
				}
				console.log('merged both: ', this.selectedSchedule);
				if (this.$store.state.Customerbooking.selectedBooking != undefined) {
					this.location = await this.$store.dispatch(
						'getLocationById',
						this.$store.state.Customerbooking.selectedBooking.location_id
					);
				}
				if (this.getSelectedBooking != null) {
					if (this.getSelectedBooking.price != null) {
						var n = (this.getSelectedBooking.price + '').split('.');
						var dec = n[1];
						if (dec != undefined) {
							this.displayZero = true;
						} else {
							this.displayZero = false;
						}
					}
				}
				console.log('location: ', this.location);
			},
			deep: true,
		},
		getSelectedPitch: {
			handler: function (after, before) {
				this.selectedPitch = after;
			},
			deep: true,
		},
	},
	methods: {
		async fetchLoggedInUser() {
			let user = this.$store.state.Player.player;
			if (!user) user = await this.$store.dispatch('getCurrentFirebaseUser');
			this.user = user;
		},
		BookNow() {
			this.$store.state.Customerbooking.editBooking = null;
			if (this.selectedSchedule.length > 0) {
				if (this.user) {
					this.$router.push({ name: 'booking-payment' });
				} else {
					this.$router.push({ name: 'new-signup' });
				}
			} else if (this.selectedSchedule2.length > 0) {
				if (this.user) {
					this.$router.push({ name: 'booking-payment' });
				} else {
					this.$router.push({ name: 'new-signup' });
				}
			} else {
				this.bookingErr = this.$t('booking.please_select_schedule');
				// this.bookingErr = 'Please select the schedule first';
				return false;
			}
		},
		async PayNow() {
			console.log('url: ', this.successUrl);
			// this.loading = true;
			this.$isLoading(true);
			// alert('called' + this.successUrl);
			localStorage.setItem('temp_selectedBooking', null);
			localStorage.setItem('country_id', null);
			localStorage.setItem('language', null);
			localStorage.setItem('selectedPitch', null);
			console.log(this.$store.state.Customerbooking.selectedBooking);
			localStorage.setItem(
				'temp_selectedBooking',
				JSON.stringify(this.$store.state.Customerbooking.selectedBooking)
			);
			localStorage.setItem(
				'country_id',
				JSON.stringify(this.$store.state.Customerbooking.country_id)
			);
			localStorage.setItem('language', this.$store.state.Customerbooking.language);
			localStorage.setItem(
				'selectedPitch',
				JSON.stringify(this.$store.state.Customerbooking.selectedPitch)
			);
			console.log(JSON.parse(localStorage.getItem('temp_selectedBooking')));
			if (this.$store.state.Customerbooking.selectedPayment == 'stripe') {
				this.paymentMethods = ['card'];
				this.lineItems[0].price = 'price_1M9MaDJyjfKMZqRPwVhMnWJZ';
				if (this.lineItems[1] != undefined) {
					this.lineItems[1].price = 'price_1M9MvzJyjfKMZqRP4540mfO7';
				}
				this.$refs.stripeRef.redirectToCheckout();
				this.$isLoading(false);
			} else if (this.$store.state.Customerbooking.selectedPayment == 'paypal') {
				console.log('paypal checkout');
				this.$router.push({ path: '/booking-paypal' });
				this.$isLoading(false);
			} else if (this.$store.state.Customerbooking.selectedPayment == 'i-deal') {
				this.paymentMethods = ['ideal'];
				this.lineItems[0].price = 'price_1M9MaDJyjfKMZqRPwVhMnWJZ';
				if (this.lineItems[1] != undefined) {
					this.lineItems[1].price = 'price_1M9MvzJyjfKMZqRP4540mfO7';
				}
				console.log(this.paymentMethods);
				// this.$router.push({ path: '/booking-ideal' });
				this.payideal();
				// this.$refs.stripeRef.redirectToCheckout();
			}
		},

		async payideal() {
			console.log('here');
			let stripeScript = document.createElement('script');
			stripeScript.setAttribute('src', 'https://js.stripe.com/v3/');
			document.head.appendChild(stripeScript);

			var initiated = false;
			var tempthis = this;

			setTimeout(async function () {
				//do what you need here
				if (!initiated) {
					if (
						window.Stripe(
							'pk_test_51M7uoLJyjfKMZqRPm63an76anIFIrBAR7f0EW7XOKWtFBPp0BxiOiVCVqGlVQxsNpC9qee4QH2NHWdeR4oU7WzlL00WP7L9A07'
						)
					) {
						const stripe = window.Stripe(
							'pk_test_51M7uoLJyjfKMZqRPm63an76anIFIrBAR7f0EW7XOKWtFBPp0BxiOiVCVqGlVQxsNpC9qee4QH2NHWdeR4oU7WzlL00WP7L9A07'
						);
						console.log('submitting payment to backend');

						var options = {
							style: {
								base: {
									padding: '10px 12px',
									color: '#32325d',
									fontSize: '16px',
									'::placeholder': {
										color: '#aab7c4',
									},
								},
							},
						};

						const elements = stripe.elements();
						const idealBank = elements.create('idealBank', options);
						idealBank.mount('#ideal-bank-element');

						var price = tempthis.getSelectedBooking.price;
						if (price === Math.floor(price)) {
							price = parseInt(price) + '00';
						} else {
							var tempprice = String(price).split('.')[1];
							if (tempprice < 10) {
								price = parseInt(price) + String(price).split('.')[1] + '0';
							} else {
								price = parseInt(price) + String(price).split('.')[1];
							}
						}
						// const name = document.querySelector('#name');

						const clientSecret = await fetch('https://api.stripe.com/v1/payment_intents', {
							method: 'POST',
							headers: {
								'Content-Type': 'application/x-www-form-urlencoded',
								Authorization: `Bearer sk_test_51M7uoLJyjfKMZqRPuhn6e5wx85LlBvVgjAgUNCBbmREGPevKgNkEJa78ZtHdcqC4acaotDhtRjjYwkAo6vQhcEiv00JatmY0xE`,
							},
							// body: {
							// 	currency: 'eur',
							// 	amount: 15,
							// 	paymentMethodTypes: 'ideal',
							// },
							body: 'amount=' + price + '&currency=eur&payment_method_types[]=ideal',
						}).then((r) => r.json());

						console.log('clientSecret:', clientSecret);

						const paymentIntent = await stripe.confirmIdealPayment(clientSecret.client_secret, {
							payment_method: {
								ideal: idealBank,
								billing_details: {
									name: 'tesi',
								},
							},
							return_url: tempthis.successUrl,
						});
						this.$isLoading(false);
						console.log('paymentIntent: ', paymentIntent);
					}
				}
			}, 1000);
		},
	},
	async mounted() {
		var found2 = false;
		if (this.getSelectedBooking != null) {
			if (this.getSelectedBooking.matches.length > 0) {
				this.fieldNumber = this.getSelectedBooking.matches[0].fieldName;
			}
		} else {
			this.fieldNumber = '';
		}
		if (this.getSelectedBooking != null) {
			this.selectedSchedule = this.getSelectedBooking.matches;
			this.selectedSchedule2 = this.getSelectedBooking.matches2;
		} else {
			this.selectedSchedule = null;
			this.selectedSchedule2 = null;
		}
		if (this.$store.state.Customerbooking.selectedBooking == null) {
			this.location = await this.$store.dispatch('getLocationById', this.$route.params.locationId);
			this.location.benefits.map((la) => {
				if (la.name) {
					let split = la.name.split(' ');

					if (this.getSelectedLanguage === 'nl') {
						if (split[0] == 'Football') {
							la.name = 'Voetbal ' + split[1];
						}
						if (split[0] == 'Bibs') la.name = 'Hesjes ' + split[1];
					}
					this.selectedBenefits.push({
						name: la.name,
						id: la.id,
					});
				}
			});
		} else {
			this.location = await this.$store.dispatch(
				'getLocationById',
				this.$store.state.Customerbooking.selectedBooking.location_id
			);
			var tempthis = this;
			var found = false;
			setInterval(async function () {
				if (tempthis.$store.state.Customerbooking.selectedBooking != null) {
					if (
						tempthis.$store.state.Customerbooking.selectedBooking.location_id != '' &&
						found != true
					) {
						found = true;
						tempthis.location = await tempthis.$store.dispatch(
							'getLocationById',
							tempthis.$store.state.Customerbooking.selectedBooking.location_id
						);
					}
				}
			}, 500);
		}
		console.log('location->', this.location);
		// console.log('location_id', this.$store.state.Customerbooking.selectedBooking.location_id);
		if (this.location.length < 1) {
			if (this.$store.state.Customerbooking.selectedBooking != null) {
				// var location_id = this.$store.state.Customerbooking.selectedBooking.location_id;
				var location_temp = await this.$store.dispatch(
					'getLocationById',
					this.$store.state.Customerbooking.selectedBooking.location_id
				);
				this.location = location_temp;
				console.log('location: ', location_temp);
			}
		}
		// this.$isLoading(true);
		// if (this.$store.state.Customerbooking.selectedBooking2 != null) {
		// 	if (
		// 		this.$store.state.Customerbooking.selectedBooking2.matches.length >
		// 		this.$store.state.Customerbooking.selectedBooking.matches.length
		// 	) {
		// 		this.selectedSchedule = this.$store.state.Customerbooking.selectedBooking2.matches;
		// 	} else {
		// 		this.selectedSchedule = this.getSelectedBooking.matches;
		// 	}
		// } else if (this.getSelectedBooking.matches) {
		// 	this.selectedSchedule = this.getSelectedBooking.matches;
		// 	if (this.selectedSchedule.length) {
		// 		this.bookingErr = '';
		// 	}
		// }
		setInterval(async function () {
			if (found2 != true) {
				try {
					tempthis.location.benefits.map((la) => {
						if (la.name) {
							tempthis.selectedBenefits.push({
								name: la.name,
								id: la.id,
							});
						}
					});
					found2 = true;
				} catch (error) {}
			}
		}, 500);

		if (this.$store.state.Customerbooking != null) {
			if (this.$store.state.Customerbooking.country_id != 'e2c3e9c6-2477-4f71-a056-d37a9b3f60c9') {
				this.countryName = 'USA';
			} else {
				this.countryName = 'Netherlands';
			}
		}

		if (this.$store.state.Customerbooking.language != null) {
			// @ts-ignore
			await this.$store.commit('setSelectedLanguage', this.$store.state.Customerbooking.language);
		}

		if (this.$store.state.Customerbooking.editBooking != null) {
			// window.scrollTo(0, document.body.scrollHeight);
			function scrolltovuecal() {
				var ele = document.getElementById('vuecalid');
				const left = ele.offsetLeft;
				const top = ele.offsetTop;
				window.scrollTo({
					left: left,
					top: top,
				});
			}
			const myTimeout = setTimeout(scrolltovuecal, 1500);
		}

		console.log('benefits: ', this.location.benefits);

		var price = this.getSelectedBooking.price;
		if (price === Math.floor(price)) {
			//is whole number
			this.lineItems[0].quantity = parseInt(this.lineItems[0].quantity) * parseInt(price);
			delete this.lineItems[1];
		} else if (String(price).split('.')[1] == '00') {
			this.lineItems[0].quantity = parseInt(this.lineItems[0].quantity) * parseInt(price);
			delete this.lineItems[1];
		} else {
			// is decimal number
			this.lineItems[0].quantity = parseInt(this.lineItems[0].quantity) * parseInt(price);
			this.lineItems[1].quantity =
				parseInt(this.lineItems[1].quantity) * parseInt(String(price).split('.')[1]);
		}

		// Ideal script
		let stripeScript = document.createElement('script');
		stripeScript.setAttribute('src', 'https://js.stripe.com/v3/');
		document.head.appendChild(stripeScript);

		var initiated = false;
		var tempthis = this;

		setTimeout(function () {
			//do what you need here
			if (!initiated) {
				if (
					window.Stripe(
						'pk_test_51M7uoLJyjfKMZqRPm63an76anIFIrBAR7f0EW7XOKWtFBPp0BxiOiVCVqGlVQxsNpC9qee4QH2NHWdeR4oU7WzlL00WP7L9A07'
					)
				) {
					console.log('executed script');
					initiated = true;

					const stripe = window.Stripe(
						'pk_test_51M7uoLJyjfKMZqRPm63an76anIFIrBAR7f0EW7XOKWtFBPp0BxiOiVCVqGlVQxsNpC9qee4QH2NHWdeR4oU7WzlL00WP7L9A07'
					);
					tempthis.stripe = stripe;
					var options = {
						style: {
							base: {
								padding: '10px 12px',
								color: '#32325d',
								fontSize: '16px',
								'::placeholder': {
									color: '#aab7c4',
								},
							},
						},
					};

					const elements = stripe.elements();
					const idealBank = elements.create('idealBank', options);
					tempthis.idealBank = idealBank;
					// console.log('Banks:', idealBank);
				}
			}
		}, 1000);

		console.log('Inside BookingDetail location -> ', this.location);
		if (this.$store.state.Customerbooking.selectedPitch != null) {
			this.selectedPitch = this.$store.state.Customerbooking.selectedPitch;
		} else {
			this.selectedPitch = this.location.pitches[0];
		}
		console.log('Inside BookingDetail selected_pitch -> ', this.selectedPitch);
		console.log('Inside BookingDetail selected benefit -> ', this.selectedBenefits);
		console.log('path: ', this.$router.resolve({ name: 'clubhouse' }));
		// delete this.lineItems[1];
		console.log('line items: ', this.lineItems);
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
