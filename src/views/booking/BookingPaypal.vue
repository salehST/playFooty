<template>
	<BookingPayment :page-title="'Paypal Checkout'">
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
					<div ref="paypal"></div>
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
export default {
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
			loaded: false,
			paidFor: false,
			product: {
				price: 777.77,
				description: 'leg lamp from that one movie',
				img: './assets/lamp.jpg',
			},
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
		};
	},
	mounted: function () {
		const script = document.createElement('script');
		script.src =
			'https://www.paypal.com/sdk/js?client-id=AT6rv7-VewA1jfCKfyKDrLklHxg29isG_tGVgjuMeFNkxp6HWTX33Y2oX4zUejd4sW7tn5sP7XKURM9o&currency=EUR';
		script.addEventListener('load', this.setLoaded);
		document.body.appendChild(script);

		this.product.price = this.getSelectedBooking.price;
	},
	methods: {
		setLoaded: function () {
			this.loaded = true;
			paypal
				.Buttons({
					createOrder: (data, actions) => {
						return actions.order.create({
							purchase_units: [
								{
									description: '',
									amount: {
										// currency_code: 'EUR',
										value: this.product.price,
									},
								},
							],
						});
					},
					onApprove: async (data, actions) => {
						const order = await actions.order.capture();
						this.paidFor = true;
						window.location.href = this.successUrl;
						console.log(order);
					},
					onError: (err) => {
						window.location.href = this.cancelUrl;
						console.log(err);
					},
				})
				.render(this.$refs.paypal);
		},
	},
};
</script>
<style>
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
