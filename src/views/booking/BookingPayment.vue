<template>
	<BookingLayout :step="step" :page-title="$t('booking.make_payment')">
		<div
			class="content-text mb-85"
			style="background: #ffffff; padding: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1)"
		>
			<div class="payment-section d-flex w-100 login">
				<div class="w-75 desktop-login-view" style="padding: 0">
					<h2 class="heading" style="text-align: left">
						{{ $t('booking.select_payment_provider') }}
					</h2>
					<div class="payment-blocks">
						<div class="payment-block">
							<div class="flex flex-row gap-2 bg-red-500">
								<input
									type="radio"
									class="cursor-pointer payment-method-radio-button"
									id="i-deal"
									v-model="paymentMethod"
									value="i-deal"
									@change="changepaymentMethod"
								/>

								<label for="i-deal" class="cursor-pointer flex flex-row items-center gap-2">
									<div class="custom-radio-button"></div>
									<span>{{ $t('booking.pay_by') }}</span>
									<!-- <img
                                        src="../../assets/payments/ideal.png"
                                        class="payment-provider-card-image"
                                        alt="i-deal"
                                    /> -->
									<img
										src="@/assets/booking-payment/Idealpay.png"
										class="payment-provider-card-image"
										alt="i-deal"
									/>
								</label>
							</div>
						</div>
						<div class="payment-block">
							<div class="flex flex-row gap-2 cursor-pointer">
								<input
									type="radio"
									class="cursor-pointer payment-method-radio-button"
									id="paypal"
									v-model="paymentMethod"
									value="paypal"
									@change="changepaymentMethod"
								/>
								<label for="paypal" class="cursor-pointer flex flex-row items-center gap-2">
									<div class="custom-radio-button"></div>

									<span>{{ $t('booking.pay_by') }}</span>
									<!-- <img
                                        src="../../assets/payments/paypal.png"
                                        class="payment-provider-card-image"
                                        alt="paypal"
                                    /> -->
									<img
										src="@/assets/booking-payment/PayPal.png"
										style="max-width: 90px"
										class="payment-provider-card-image"
										alt="paypal"
									/>
								</label>
							</div>
						</div>
						<div class="payment-block" style="display: block">
							<div class="flex flex-row gap-2">
								<input
									type="radio"
									class="cursor-pointer payment-method-radio-button"
									id="stripe"
									v-model="paymentMethod"
									value="stripe"
									@change="changepaymentMethod"
								/>

								<label
									for="stripe"
									class="cursor-pointer flex flex-row items-center gap-2 flex-shrink-0"
								>
									<div class="custom-radio-button"></div>
									<span>{{ $t('booking.pay_by') }}</span>
									<!-- <div class="payment-cards-group"> -->
									<div style="padding-bottom: 10px">
										<input
											type="radio"
											v-model="card"
											value="discover"
											id="discover"
											class="payment-card-input"
										/>
										<input
											type="radio"
											v-model="card"
											value="american-express"
											id="american-express"
											class="payment-card-input"
										/>
										<input
											type="radio"
											v-model="card"
											value="visa"
											id="visa"
											class="payment-card-input"
										/>
										<input
											type="radio"
											v-model="card"
											value="mastercard"
											id="mastercard"
											class="payment-card-input"
										/>
										<div class="payment-card-label-wrapper">
											<label
												v-for="(provider, index) in paymentProviders"
												:key="index"
												:for="provider.name"
												class="payment-provider-card-label"
												:style="{ pointerEvents: paymentMethod !== 'stripe' ? 'none' : 'all' }"
											>
												<div
													:class="[
														'payment-provider-card-image-wrapper',
														selectedCard && selectedCard.name === provider.name && 'card-selected',
													]"
												>
													<img
														:src="provider.image"
														:alt="provider.name"
														class="payment-provider-card-image"
													/>
												</div>
											</label>
										</div>
									</div>
								</label>
							</div>
							<br />
							<!-- <button v-if="paymentMethod == 'stripe'" @click="submit" class="book-btn">
								Pay Now
							</button> -->
						</div>
						<!-- <stripe-elements
							ref="elementsRef"
							:pk="''"
							:amount="amount"
							locale="de"
							@token="tokenCreated"
							@loading="loading = $event"
						>
						</stripe-elements>
						<button @click="submit">Pay $20</button> -->

						<hr />

						<!-- <stripe-element-payment
							ref="paymentRef"
							:pk="publishableKey"
							:elements-options="elementsOptions"
							:confirm-params="confirmParams"
						/>
						<button @click="pay">Pay Now</button> -->
						<!-- locale="de" -->
					</div>
				</div>
				<!-- <div class="payment-section-right rounded-md overflow-hidden"> -->
				<!-- <div>
						<div class="w-full py-5 px-2 bg-gray-900 text-white mb-3">
							<h2 class="text-white">Booking Details</h2>
							<p class="text-sm">Based on the options you've selected</p>
						</div>
						<div class="p-2 flex flex-col w-full gap-2">
							<div class="pb-5 border-b border-gray-200 w-full">
								<div class="flex flex-row justify-between items-center w-full">
									<h2 class="uppercase text-2xl max-w-1/2 text-gray-700">Footy Park Amsterdam</h2>
									<p><span class="text-gray-500 text-sm">4.8</span></p>
								</div>
								<div class="mt-3">
									<p class="text-sm tracking-tight text-gray-600">
										Sportpark Spieringhorn 10 <br />
										1043 AA, Amsterdam
									</p>
								</div>
							</div>
							<div class="pb-5 border-b border-gray-200 w-full">
								<h2 class="text-green font-medium text-base mb-2">Options</h2>
								<ul class="flex flex-col gap-2">
									<li>
										<div class="flex flex-row items-center justify-between">
											<div class="text-sm tracking-tight">Field Size</div>
											<div class="text-sm">5 vs. 5</div>
										</div>
									</li>

									<li>
										<div class="flex flex-row items-center justify-between">
											<div class="text-sm tracking-tight">Field Dimensions</div>
											<div class="text-sm">12 x 24 meters</div>
										</div>
									</li>

									<li>
										<div class="flex-row items-center justify-between">
											<div class="text-sm tracking-tight">Schedule</div>
											<div
												class="text-sm text-right"
												v-for="(schedule, index) in selectedSchedule"
												:key="index"
											>
												Aug 5, <span><time>11:00</time> - <time>12:30</time></span>
												<span
													><time>{{ schedule }}</time></span
												>
												<br />
											</div>
										</div>
									</li>
								</ul>
							</div>
							<div class="pb-5 w-full">
								<h2 class="text-green font-medium text-base mb-2">Benefits</h2>
								<ul class="flex flex-col gap-2">
									<li>
										<div class="flex flex-row items-center justify-between">
											<div class="text-sm tracking-tight">Football (x1)</div>
											<div class="text-sm uppercase text-gray-500">Free</div>
										</div>
									</li>

									<li>
										<div class="flex flex-row items-center justify-between">
											<div class="text-sm tracking-tight">Bibs (x10)</div>
											<div class="text-sm uppercase text-gray-500">Free</div>
										</div>
									</li>
								</ul>
							</div>
							<div class="pb-5 w-full flex flex-col gap-2 items-center justify-center">
								<div class="flex gap-2 flex-row items-center">
									<h1 class="text-2xl font-semibold">${{ price }}</h1>
									<span class="text-sm text-gray-500">(Incl. VAT)</span>
								</div>

								<paypal-buttons
									v-if="paymentMethod === 'paypal'"
									:create-order="createOrder"
									:on-approve="onApprove"
									:on-error="onError"
									:style-object="style"
								/>
								<button
									v-else
									@click="submit"
									type="button"
									class="bg-green uppercase tracking-tight text-white font-semibold py-3 px-2 rounded-md self-stretch"
								>
									Pay Now
								</button>
								<stripe-checkout
									:lineItems="lineItems"
									:pk="stripePk"
									ref="elementRef"
									:success-url="successUrl"
									:cancel-url="cancelUrl"
									mode="payment"
								/>
							</div>
							<div classt="relative">
								<p class="text-center text-xs text-gray-500">
									Cancellation is possible on The Footy App up to 24 hours before the match starts.
								</p>
							</div>
						</div>
					</div> -->
				<!-- </div> -->
				<BookingDetailBlock></BookingDetailBlock>
			</div>
		</div>
	</BookingLayout>
</template>
<script src="https://js.stripe.com/v3/"></script>
<script>
import Vue from 'vue';
import BookingLayout from '@/layouts/booking/BookingLayout.vue';
import { StripeCheckout } from '@vue-stripe/vue-stripe';
import BookingDetailBlock from '@/views/booking/BookingField/BookingDetailBlock.vue';
import firebase from 'firebase';
// import { StripePlugin } from '@vue-stripe/vue-stripe';
// import { StripeElements } from 'vue-stripe-checkout';
import { StripeElementCard } from '@vue-stripe/vue-stripe';
import { StripeElementPayment } from '@vue-stripe/vue-stripe';
import store from '@/store';
// let paypal;
// paypal = loadScript({
//     'client-id': 'AZSoh8bEEcfABrE0YJvDpns0dNyEL84wBFHF2EG9CarizR211Djylg6_dzNaA6f7RmYp9H6XIoVuRZBL',
// });
// console.log('paypal', paypal);
// const PayPalButton = paypal.Button.driver();

// ------------------Redirect if not logged in-------------------------
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
			this.$router.push({ path: '/new-signup' });
			// window.location.href = '';
		}
	} else {
		console.log('not logged in');
		this.$router.push({ path: '/new-signup' });
		// window.location.href = '/new-signup';
	}
}
// ------------------------------------------------------------------------------------

const paymentCards = {
	mastercard: {
		name: 'mastercard',
		// image: require('../../assets/payments/wirecard.png'),
		image: require('@/assets/booking-payment/MasterCard.png'),
	},
	visa: {
		name: 'visa',
		// image: require('../../assets/payments/visa.png'),
		image: require('@/assets/booking-payment/Visa.png'),
	},
	'american-express': {
		name: 'american-express',
		// image: require('../../assets/payments/american-express.png'),
		image: require('@/assets/booking-payment/AmericanExpress.png'),
	},
	discover: {
		name: 'discover',
		// image: require('../../assets/payments/discover.png'),
		image: require('@/assets/booking-payment/Discover.png'),
	},
};

export default {
	components: {
		BookingLayout,
		// eslint-disable-next-line vue/no-unused-components
		StripeCheckout,
		// StripeElements,
		StripeElementCard,
		StripeElementPayment,
		BookingDetailBlock,
	},
	data() {
		return {
			step: 4,
			selectedSchedule: [],
			price: 0,
			pageTitle: 'MAKE PAYMENT',
			paymentMethod: 'i-deal',
			card: 'discover',
			paymentCards,
			stripePk: process.env.VUE_APP_STRIPE_PUBLISHABLE_KEY,
			lineItems: [
				{
					price: 'price_1LwkJeDFnv7gcYwMMaGxv0eM',
					quantity: 1,
				},
			],
			loaded: false,
			paidFor: false,
			product: {
				price: 777.77,
				description: 'leg lamp from that one movie',
				img: './assets/lamp.jpg',
			},
			successUrl: 'http://localhost:8080/success',
			cancelUrl: 'http://localhost:8080/cancel',
			token: null,
			charge: null,
			amount: 1000,
			loading: false,
			elementsOptions: {
				appearance: {}, // appearance options
			},
			confirmParams: {
				return_url:
					location.protocol +
					'//' +
					location.host +
					this.$router.resolve({ name: 'booking-success' }).route.path, // success url
			},
			publishableKey:
				'pk_test_51M7uoLJyjfKMZqRPm63an76anIFIrBAR7f0EW7XOKWtFBPp0BxiOiVCVqGlVQxsNpC9qee4QH2NHWdeR4oU7WzlL00WP7L9A07',
		};
	},
	computed: {
		selectedCard() {
			const isPaymentCard = this.paymentMethod && this.paymentMethod === 'stripe';
			return isPaymentCard && this.paymentCards[this.card];
		},
		paymentProviders() {
			return Object.keys(this.paymentCards).map((provider) => {
				return this.paymentCards[provider];
			});
		},
		createOrder() {
			return (data, actions) => {
				return actions.order.create({
					purchase_units: [
						{
							amount: {
								value: '1000',
							},
						},
					],
				});
			};
		},
		onApprove() {
			return (data, actions) => {
				return actions.order.capture().then((details) => {
					alert('payment successful...');
					console.log(details);
				});
			};
		},
		onError() {
			return (err) => {
				console.error(err);
				alert(err);
				//    window.location.href = window.location.replace(
				//        window.location.href,
				//        'http://localhost:8080/payment/f3eeea2c-d506-4d36-9394-438e29a57400'
				//    );
			};
		},
		style() {
			return {
				shape: 'pill',
				color: 'gold',
				layout: 'vertical',
				label: 'paypal',
				tagline: false,
			};
		},
	},
	mounted() {
		// this.selectedSchedule = localStorage.temp1;
		// for (const item of localStorage.temp1) {
		// 	console.log(item.display_date);
		// }
		// console.log('Here->' + localStorage.selectedSchedule);
		// console.log(process.env);

		this.generatePaymentIntent();

		const storedschedules = JSON.parse(localStorage.getItem('selectedschedules'));
		const tempprice = JSON.parse(localStorage.getItem('selectedschedulesprice'));
		console.log(storedschedules);
		this.selectedSchedule = storedschedules;
		this.price = tempprice;
		console.log('payment type: ', this.paymentMethod);
		this.$store.state.Customerbooking.selectedBooking.payment_type = this.paymentMethod;

		this.$store.commit('setSelectedPayment', 'i-deal');
		// console.log(this.$store.state.Customerbooking.selectedPayment);
	},
	methods: {
		changepaymentMethod() {
			console.log('payment type: ', this.paymentMethod);
			this.$store.state.Customerbooking.selectedBooking.payment_type = this.paymentMethod;
			console.log('testing', this.$store.state.Customerbooking.selectedBooking.payment_type);
		},
		// submit() {
		// 	this.$refs.elementRef.redirectToCheckout();
		// },
		// submit() {
		// 	this.$refs.elementsRef.submit();
		// },
		// tokenCreated(token) {
		// 	this.token = token;
		// 	// for additional charge objects go to https://stripe.com/docs/api/charges/object
		// 	this.charge = {
		// 		source: token.card,
		// 		amount: this.amount,
		// 		description: this.description,
		// 	};
		// 	this.sendTokenToServer(this.charge);
		// },
		// sendTokenToServer(charge) {
		// 	// Send to server
		// },

		submit() {
			// this will trigger the process
			this.$refs.elementRef.submit();
		},

		async generatePaymentIntent() {
			const paymentIntent = await apiCallToGeneratePaymentIntent(); // this is just a dummy, create your own API call
			this.elementsOptions.clientSecret = paymentIntent.client_secret;
		},
		pay() {
			this.$refs.paymentRef.submit();
		},
	},
	watch: {
		paymentMethod: {
			handler: function () {
				if (this.paymentMethod === 'stripe') {
					this.card = 'discover';
				}
				this.$store.commit('setSelectedPayment', this.paymentMethod);
				// console.log('payment method changed: ', this.paymentMethod);
			},
		},
	},
	created() {},
};
</script>
<style>
.payment-section {
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	gap: 48px;
}
.heading {
	color: #29323c;
	font-weight: 500;
	position: relative !important;
	left: 0%;
}
.payment-section-left {
	flex-grow: 1;
}
.payment-blocks {
	display: flex;
	flex-direction: column;
	margin-top: 1.5rem;
	gap: 1.5rem;
}
.payment-block {
	position: relative;
	flex-basis: 100%;
	min-height: 50px;
	background-color: #f7f7f7;
	display: flex;
	align-items: center;
	justify-content: flex-start;
	flex-direction: row;
	padding-inline: 15px;
	border: 2px solid transparent;
	transition: all 0.3s ease;
}
.payment-card-section {
	display: flex;
	align-items: center;
}
.payment-cards-group {
	display: flex;
	align-items: center;
	padding: 10px;
	margin-left: 10px;
}
.payment-card-input,
.payment-method-radio-button {
	-webkit-appearance: none;
	-moz-appearance: none;
	-ms-appearance: none;
	appearance: none;
	opacity: 0;
	visibility: hidden;
}
.custom-radio-button {
	width: 20px;
	height: 20px;
	border: 2px solid #6a6d6d;
	border-radius: 50%;
	background-color: inherit;
}
.custom-radio-button::before {
	content: '';
	position: absolute;
	inset: 2px;
	background-color: #000000;
	border-radius: 50%;
	transform: scale(0);
}
.custom-radio-button,
.custom-radio-button::before {
	transition: all 0.3s ease-in-out;
}
.payment-method-radio-button:checked + label .custom-radio-button {
	transform: scale(1);
	border: 2px solid #000000;
	border-radius: 50%;
}
.payment-method-radio-button:checked + label .custom-radio-button::before {
	transform: scale(1);
	transition-delay: 0.2s;
}
.payment-card-label-wrapper {
	display: flex;
	align-items: baseline;
	gap: 0.3rem;
}
.payment-provider-card-label {
	cursor: pointer;
}
.payment-provider-card-image-wrapper {
	/* padding-inline: 10px; */
	border: 1px solid #ccc;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	transition: border-color 0.3s ease;
}
.payment-provider-card-image-wrapper.card-selected {
	border-color: #e040fb;
}
.payment-provider-card-image {
	min-width: 50px;
	max-width: 50px;
}

.payment-section-right {
	position: relative;
	width: 368px;
	height: 660px;
	background-color: #ffffff;
	box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}
@media (max-width: 768px) {
	.payment-section {
		flex-direction: column;
		align-items: center;
		gap: 24px;
	}
}
.heading {
	text-transform: uppercase;
}
</style>
