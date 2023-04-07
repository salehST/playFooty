<template>
	<BookingPayment :page-title="'iDeal Checkout'">
		<div class="content-text mb-85 book-field main-container">
			<div class="d-flex w-100">
				<div
					class="w-75"
					style="
						justify-content: center;
						align-items: center;
						display: initial;
						text-align: center;
						margin: auto;
					"
				>
					<div class="container">
						<h2 style="margin: 20px; font-size: 36px">IDEAL</h2>
						<!-- <form id="payment-form"> -->
						<div class="form-row">
							<!-- <label for="name">Name</label> -->
							<input type="text" name="name" id="name" placeholder="name" class="form-control" />
						</div>
						<br />
						<div class="form-row">
							<!-- <label for="ideal-bank-element">IDEAL Bank</label> -->
							<div id="ideal-bank-element" class="form-control"></div>
						</div>
						<button type="submit" class="btn btn-success" @click="payideal">Pay</button>
						<!-- </form> -->
						<div id="messages" role="alert"></div>
					</div>
				</div>
				<BookingDetailBlock></BookingDetailBlock>
			</div>
		</div>
	</BookingPayment>
</template>
<script>
// import image from "../assets/lamp.png"
import { mapGetters } from 'vuex';
import BookingPayment from '@/layouts/booking/BookingPayment.vue';
import BookingDetailBlock from '@/views/booking/BookingField/BookingDetailBlock.vue';
import Vue from 'vue';
export default Vue.extend({
	name: 'HelloWorld',

	components: {
		BookingPayment,
		BookingDetailBlock,
	},

	computed: {
		...mapGetters(['getSelectedBooking', 'getSelectedPitch']),
	},

	data: function () {
		return {
			stripe: '',
			idealBank: '',
			paymentMethodTypes: ['card'],
			successUrl:
				location.protocol +
				'//' +
				location.host +
				this.$router.resolve({ name: 'booking-success' }).route.path,
		};
	},
	async mounted() {
		let stripeScript = document.createElement('script');
		stripeScript.setAttribute('src', 'https://js.stripe.com/v3/');
		document.head.appendChild(stripeScript);

		// const stripe = '';

		document.onreadystatechange = () => {
			if (document.readyState == 'complete') {
				// fetch to next page or some code
			}
			console.log('Page completed with image and files!');
		};

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
					idealBank.mount('#ideal-bank-element');
					// console.log('Banks:', idealBank);
					document.addEventListener('DOMContentLoaded', async () => {});
				}
			}
		}, 1000);

		// stripe = window.Stripe(
		// 	'pk_test_51M7uoLJyjfKMZqRPm63an76anIFIrBAR7f0EW7XOKWtFBPp0BxiOiVCVqGlVQxsNpC9qee4QH2NHWdeR4oU7WzlL00WP7L9A07'
		// );
	},
	methods: {
		async payideal() {
			console.log('here');
			const stripe = this.stripe;
			console.log('submitting payment to backend');

			const name = document.querySelector('#name');

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
				body: 'amount=510&currency=eur&payment_method_types[]=ideal',
			}).then((r) => r.json());

			console.log('clientSecret:', clientSecret);

			const paymentIntent = await stripe.confirmIdealPayment(clientSecret.client_secret, {
				payment_method: {
					ideal: this.idealBank,
					billing_details: {
						name: name.value,
					},
				},
				return_url: this.successUrl,
			});
			// console.log('paymentIntent: ', paymentIntent);
		},
	},
});
</script>
<style>
button {
	width: 70%;
	padding: 10px;
	height: 70px;
	background: #a103fc;
	color: white;
	font-size: 22px;
	border-radius: 20px;
}
label {
	text-align: left;
	padding-left: 10px;
}
#ideal-bank-element {
	border: 1px solid black;
	margin-bottom: 15px;
	border-radius: 25px;
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
	flex-wrap: wrap;
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
