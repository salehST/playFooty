<template>
	<BookingPayment :page-title="$t('booking.cancellation_notice')">
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
									{{ $t('booking.booking_cancelled') }}
								</p>
								<p style="font-size: 20px; font-weight: 10px">
									{{ $t('booking.you_should_receive_a_confirmation_of_your_cancellation_at') }}
									{{ email }}
									{{ $t('booking.within_a_few_minutes_a_refund_will_be_sent_out_within_24_hours') }}
								</p>
								<p style="font-size: 20px; font-weight: 10px; margin-top: 20px">
									{{ $t('booking.work_hard_play_footy_have_fun') }}
								</p>
								<div class="d-flex mt-3">
									<button @click="redirectToBookField()">
										<p>{{ $t('booking.back_to_select_a_field') }}</p>
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
						<div class="d-flex" style="flex-wrap: wrap">
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
							<p style="font-size: 28px; font-weight: bold">
								{{ $t('booking.booking_cancelled') }}
							</p>
						</div>
					</div>
					<p style="font-size: 20px; font-weight: 10px">
						{{ $t('booking.you_should_receive_a_confirmation_of_your_cancellation_at') }}
						{{ email }}
						{{ $t('booking.within_a_few_minutes_a_refund_will_be_sent_out_within_24_hours') }}
					</p>
					<p style="font-size: 20px; font-weight: 10px; margin-top: 20px">
						{{ $t('booking.work_hard_play_footy_have_fun') }}
					</p>
					<div>
						<button @click="$router.push({ name: 'welcome' })">
							<p>{{ $t('booking.back_to_select_a_field') }}</p>
						</button>
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
				</div>
			</div>
		</div>
	</BookingPayment>
</template>
<script>
import BookingPayment from '@/layouts/booking/BookingPayment.vue';
import BookingDetailBlock from '@/views/booking/BookingField/BookingCanceledDetailBlock.vue';
export default {
	components: {
		BookingPayment,
		BookingDetailBlock,
	},
	data: () => ({
		email: 'example@exaple.com',
	}),
	methods: {
		redirectToBookField() {
			this.$router.push({
				name: 'book-field',
				params: { locationId: this.$store.state.Customerbooking.selectedBooking.location_id },
			});
		},
	},
	mounted() {
		this.email = this.$store.state.Player.player.email;
	},
};
</script>
<style lang="scss">
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
	/* width: 836px; */
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
	/* width: 685px;
	height: 24px; */

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
	background: #193860;
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
	/* color: #029f8a !important; */
	color: #193860 !important;
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
</style>
