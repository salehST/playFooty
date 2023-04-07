<template>
	<div>
		<!-- Mobile (New one) -->
		<div class="topnav mobile-view" id="myTopnav">
			<div class="content-text">
				<div>
					<a href="#"><img src="@/assets/images/Logo.png" class="logo" /></a>
				</div>
				<div class="dropdown">
					<button @click="competitionsToggle" :class="mobiletoggle ? 'enable' : ''" class="dropbtn">
						{{ $t('booking.competitions') }}
						<svg
							width="24px"
							height="24px"
							viewBox="0 0 24 24"
							version="1.1"
							xmlns="http://www.w3.org/2000/svg"
							xmlns:xlink="http://www.w3.org/1999/xlink"
						>
							<title>icon-chevron-down</title>
							<g
								id="icon-chevron-down"
								stroke="none"
								stroke-width="1"
								fill="none"
								fill-rule="evenodd"
							>
								<g
									id="Group"
									transform="translate(5.000000, 7.000000)"
									fill="#ffffff"
									fill-rule="nonzero"
								>
									<g id="Path">
										<polygon
											transform="translate(7.235000, 4.858000) rotate(-270.000000) translate(-7.235000, -4.858000) "
											points="3 10.1 8.235 4.858 3 -0.388 4.612 -2 11.47 4.858 4.612 11.716"
										></polygon>
									</g>
								</g>
							</g>
						</svg>
					</button>
					<div v-show="competitionsShow" class="dropdown-content">
						<a href="https://www.playfooty.com/bedrijfsvoetbal/">{{
							$t('booking.company_and_friends_football')
						}}</a>
						<a href="https://www.playfooty.com/studentenvoetbal/">{{
							$t('booking.student_football')
						}}</a>
						<a href="https://www.playfooty.com/vrouwenvoetbal-competitie/">{{
							$t('booking.women_football')
						}}</a>
					</div>
				</div>
				<router-link
					v-if="!user"
					to="/signup"
					:class="mobiletoggle ? 'enable' : ''"
					href="#"
					class="register-btn"
				>
					Register
				</router-link>
				<!-- <a :class="mobiletoggle ? 'enable' : ''" href="#" class="rent-btn">Rent a field</a> -->
				<a :class="mobiletoggle ? 'enable' : ''" href="https://www.playfooty.com/contact/">{{
					$t('booking.contact')
				}}</a>
				<router-link
					v-if="!user"
					to="/login"
					:class="mobiletoggle ? 'enable' : ''"
					href="#"
					class="log-border"
				>
					Log in
				</router-link>
				<!-- :class="mSSobiletoggle ? 'enable' : ''" -->
				<router-link
					:class="mobiletoggle ? 'enable' : ''"
					v-else
					to="/clubhouse"
					href="#"
					class="bg-green log-border"
				>
					{{ $t('booking.my_account') }}
				</router-link>
				<a
					:class="mobiletoggle ? 'enable' : ''"
					href="javascript:void(0)"
					style="padding-top: 0; padding-bottom: 0"
				>
					<LanguageSwitchHeaderMenu />
				</a>
				<a
					href="javascript:void(0);"
					style="font-size: 15px"
					class="icon"
					@click="mobileMenuToggle"
				>
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M4 18C3.71667 18 3.47933 17.904 3.288 17.712C3.096 17.5207 3 17.2833 3 17C3 16.7167 3.096 16.4793 3.288 16.288C3.47933 16.096 3.71667 16 4 16H20C20.2833 16 20.5207 16.096 20.712 16.288C20.904 16.4793 21 16.7167 21 17C21 17.2833 20.904 17.5207 20.712 17.712C20.5207 17.904 20.2833 18 20 18H4ZM4 13C3.71667 13 3.47933 12.904 3.288 12.712C3.096 12.5207 3 12.2833 3 12C3 11.7167 3.096 11.479 3.288 11.287C3.47933 11.0957 3.71667 11 4 11H20C20.2833 11 20.5207 11.0957 20.712 11.287C20.904 11.479 21 11.7167 21 12C21 12.2833 20.904 12.5207 20.712 12.712C20.5207 12.904 20.2833 13 20 13H4ZM4 8C3.71667 8 3.47933 7.90433 3.288 7.713C3.096 7.521 3 7.28333 3 7C3 6.71667 3.096 6.479 3.288 6.287C3.47933 6.09567 3.71667 6 4 6H20C20.2833 6 20.5207 6.09567 20.712 6.287C20.904 6.479 21 6.71667 21 7C21 7.28333 20.904 7.521 20.712 7.713C20.5207 7.90433 20.2833 8 20 8H4Z"
							fill="white"
						/>
					</svg>
				</a>
			</div>
		</div>
		<!-- Desktop (Old one) -->
		<div class="topnav desktop-view">
			<div class="content-text">
				<a href="#home" class="active"><img src="@/assets/images/Logo.png" /></a>
				<div class="f-right d-flex">
					<div class="dropdown">
						<button class="dropbtn">
							{{ $t('booking.competitions') }}
							<svg
								width="24px"
								height="24px"
								viewBox="0 0 24 24"
								version="1.1"
								xmlns="http://www.w3.org/2000/svg"
								xmlns:xlink="http://www.w3.org/1999/xlink"
							>
								<title>icon-chevron-down</title>
								<g
									id="icon-chevron-down"
									stroke="none"
									stroke-width="1"
									fill="none"
									fill-rule="evenodd"
								>
									<g
										id="Group"
										transform="translate(5.000000, 7.000000)"
										fill="#ffffff"
										fill-rule="nonzero"
									>
										<g id="Path">
											<polygon
												transform="translate(7.235000, 4.858000) rotate(-270.000000) translate(-7.235000, -4.858000) "
												points="3 10.1 8.235 4.858 3 -0.388 4.612 -2 11.47 4.858 4.612 11.716"
											></polygon>
										</g>
									</g>
								</g>
							</svg>
						</button>
						<div class="dropdown-content">
							<a href="https://www.playfooty.com/bedrijfsvoetbal/">{{
								$t('booking.company_and_friends_football')
							}}</a>
							<a href="https://www.playfooty.com/studentenvoetbal/">{{
								$t('booking.student_football')
							}}</a>
							<a href="https://www.playfooty.com/vrouwenvoetbal-competitie/">{{
								$t('booking.women_football')
							}}</a>
						</div>
					</div>
					<router-link v-if="!user" to="/signup" class="register-btn"> Register </router-link>
					<!-- <a href="#" class="rent-btn">Rent a field</a>	 -->

					<a href="https://www.playfooty.com/contact/">{{ $t('booking.contact') }}</a>
					<router-link v-if="!user" class="log-border" to="login"> Log in </router-link>
					<router-link
						v-else
						to="/clubhouse"
						:class="mobiletoggle ? 'enable' : ''"
						href="#"
						class="log-border"
					>
						{{ $t('booking.my_account') }}
					</router-link>
					<LanguageSwitchHeaderMenu />
				</div>
			</div>
		</div>
		<div class="bg-img" style="width: 100%">
			<img src="@/assets/images/Background.png" class="img-responsive" style="width: 100%" />
		</div>
		<div class="banner-text">
			<div class="content-text mb-85">
				<h4 class="small-head" style="font-weight: bolder">{{ $t('booking.rent_field') }}</h4>
				<h1 class="main-head" style="text-transform: uppercase">
					<span class="steps mobile-step"
						><svg
							width="24"
							height="24"
							viewBox="0 0 16 16"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							class="mr-3"
							@click="gobackstep"
							v-if="step > 1"
						>
							<path
								d="M6.875 15.3L0.275 8.70002C0.175 8.60002 0.104 8.49169 0.0619998 8.37502C0.0206665 8.25835 0 8.13335 0 8.00002C0 7.86669 0.0206665 7.74169 0.0619998 7.62502C0.104 7.50835 0.175 7.40002 0.275 7.30002L6.875 0.700021C7.05833 0.516688 7.28733 0.420688 7.562 0.412022C7.83733 0.404022 8.075 0.500021 8.275 0.700021C8.475 0.883355 8.57933 1.11235 8.588 1.38702C8.596 1.66235 8.5 1.90002 8.3 2.10002L3.4 7.00002H14.575C14.8583 7.00002 15.096 7.09569 15.288 7.28702C15.4793 7.47902 15.575 7.71669 15.575 8.00002C15.575 8.28335 15.4793 8.52069 15.288 8.71202C15.096 8.90402 14.8583 9.00002 14.575 9.00002H3.4L8.3 13.9C8.48333 14.0834 8.57933 14.3167 8.588 14.6C8.596 14.8834 8.5 15.1167 8.3 15.3C8.11667 15.5 7.88333 15.6 7.6 15.6C7.31667 15.6 7.075 15.5 6.875 15.3Z"
								fill="white"
							/>
						</svg>
						STEP {{ step }}/4&emsp;<span class="steps-icon"
							><svg
								version="1.1"
								id="Capa_1"
								xmlns="http://www.w3.org/2000/svg"
								xmlns:xlink="http://www.w3.org/1999/xlink"
								x="0px"
								y="0px"
								:class="step == 1 ? 'active' : ''"
								viewBox="0 0 451.827 451.827"
								style="enable-background: new 0 0 451.827 451.827; cursor: pointer"
								xml:space="preserve"
								@click="goTOStep(1)"
							>
								<g>
									<g>
										<path
											d="M225.922,0C101.351,0,0.004,101.347,0.004,225.917s101.347,225.909,225.917,225.909
			c124.554,0,225.901-101.347,225.901-225.909C451.823,101.347,350.476,0,225.922,0z"
										/>
									</g>
								</g>
							</svg>
							&#8212;<svg
								version="1.1"
								id="Capa_1"
								xmlns="http://www.w3.org/2000/svg"
								xmlns:xlink="http://www.w3.org/1999/xlink"
								x="0px"
								y="0px"
								viewBox="0 0 451.827 451.827"
								style="enable-background: new 0 0 451.827 451.827; cursor: pointer"
								xml:space="preserve"
								:class="step == 2 ? 'active' : ''"
								@click="goTOStep(2)"
							>
								<g>
									<g>
										<path
											d="M225.922,0C101.351,0,0.004,101.347,0.004,225.917s101.347,225.909,225.917,225.909
			c124.554,0,225.901-101.347,225.901-225.909C451.823,101.347,350.476,0,225.922,0z"
										/>
									</g>
								</g>
							</svg>
							&#8212;
							<svg
								version="1.1"
								id="Capa_1"
								xmlns="http://www.w3.org/2000/svg"
								xmlns:xlink="http://www.w3.org/1999/xlink"
								x="0px"
								y="0px"
								viewBox="0 0 451.827 451.827"
								style="enable-background: new 0 0 451.827 451.827; cursor: pointer"
								xml:space="preserve"
								:class="step == 3 ? 'active' : ''"
								@click="goTOStep(3)"
							>
								<g>
									<g>
										<path
											d="M225.922,0C101.351,0,0.004,101.347,0.004,225.917s101.347,225.909,225.917,225.909
			c124.554,0,225.901-101.347,225.901-225.909C451.823,101.347,350.476,0,225.922,0z"
										/>
									</g>
								</g>
							</svg>
							&#8212;
							<svg
								version="1.1"
								id="Capa_1"
								xmlns="http://www.w3.org/2000/svg"
								xmlns:xlink="http://www.w3.org/1999/xlink"
								x="0px"
								y="0px"
								viewBox="0 0 451.827 451.827"
								style="enable-background: new 0 0 451.827 451.827; cursor: pointer"
								xml:space="preserve"
								:class="step == 4 ? 'active' : ''"
								@click="goTOStep(4)"
							>
								<g>
									<g>
										<path
											d="M225.922,0C101.351,0,0.004,101.347,0.004,225.917s101.347,225.909,225.917,225.909
			c124.554,0,225.901-101.347,225.901-225.909C451.823,101.347,350.476,0,225.922,0z"
										/>
									</g>
								</g>
							</svg> </span
					></span>
					<span v-if="pageTitle != ''">
						{{ pageTitle }}
					</span>
					<span v-else>
						{{ $t('booking.pick_a_location') }}
					</span>
					<span class="steps desktop-step"
						><svg
							width="24"
							height="24"
							viewBox="0 0 16 16"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							class="mr-3"
							style="cursor: pointer"
							@click="gobackstep"
							v-if="step > 1"
						>
							<path
								d="M6.875 15.3L0.275 8.70002C0.175 8.60002 0.104 8.49169 0.0619998 8.37502C0.0206665 8.25835 0 8.13335 0 8.00002C0 7.86669 0.0206665 7.74169 0.0619998 7.62502C0.104 7.50835 0.175 7.40002 0.275 7.30002L6.875 0.700021C7.05833 0.516688 7.28733 0.420688 7.562 0.412022C7.83733 0.404022 8.075 0.500021 8.275 0.700021C8.475 0.883355 8.57933 1.11235 8.588 1.38702C8.596 1.66235 8.5 1.90002 8.3 2.10002L3.4 7.00002H14.575C14.8583 7.00002 15.096 7.09569 15.288 7.28702C15.4793 7.47902 15.575 7.71669 15.575 8.00002C15.575 8.28335 15.4793 8.52069 15.288 8.71202C15.096 8.90402 14.8583 9.00002 14.575 9.00002H3.4L8.3 13.9C8.48333 14.0834 8.57933 14.3167 8.588 14.6C8.596 14.8834 8.5 15.1167 8.3 15.3C8.11667 15.5 7.88333 15.6 7.6 15.6C7.31667 15.6 7.075 15.5 6.875 15.3Z"
								fill="white"
							/>
						</svg>
						{{ $t('booking.step') }} {{ step }}/4&emsp;<span class="steps-icon"
							><svg
								version="1.1"
								id="Capa_1"
								xmlns="http://www.w3.org/2000/svg"
								xmlns:xlink="http://www.w3.org/1999/xlink"
								x="0px"
								y="0px"
								:class="step == 1 ? 'active' : ''"
								viewBox="0 0 451.827 451.827"
								style="enable-background: new 0 0 451.827 451.827; cursor: pointer"
								xml:space="preserve"
								@click="goTOStep(1)"
							>
								<g>
									<g>
										<path
											d="M225.922,0C101.351,0,0.004,101.347,0.004,225.917s101.347,225.909,225.917,225.909
			c124.554,0,225.901-101.347,225.901-225.909C451.823,101.347,350.476,0,225.922,0z"
										/>
									</g>
								</g>
							</svg>
							&#8212;<svg
								version="1.1"
								id="Capa_1"
								xmlns="http://www.w3.org/2000/svg"
								xmlns:xlink="http://www.w3.org/1999/xlink"
								x="0px"
								y="0px"
								viewBox="0 0 451.827 451.827"
								style="enable-background: new 0 0 451.827 451.827; cursor: pointer"
								xml:space="preserve"
								:class="step == 2 ? 'active' : ''"
								@click="goTOStep(2)"
							>
								<g>
									<g>
										<path
											d="M225.922,0C101.351,0,0.004,101.347,0.004,225.917s101.347,225.909,225.917,225.909
			c124.554,0,225.901-101.347,225.901-225.909C451.823,101.347,350.476,0,225.922,0z"
										/>
									</g>
								</g>
							</svg>
							&#8212;
							<svg
								version="1.1"
								id="Capa_1"
								xmlns="http://www.w3.org/2000/svg"
								xmlns:xlink="http://www.w3.org/1999/xlink"
								x="0px"
								y="0px"
								viewBox="0 0 451.827 451.827"
								style="enable-background: new 0 0 451.827 451.827; cursor: pointer"
								xml:space="preserve"
								:class="step == 3 ? 'active' : ''"
								@click="goTOStep(3)"
							>
								<g>
									<g>
										<path
											d="M225.922,0C101.351,0,0.004,101.347,0.004,225.917s101.347,225.909,225.917,225.909
			c124.554,0,225.901-101.347,225.901-225.909C451.823,101.347,350.476,0,225.922,0z"
										/>
									</g>
								</g>
							</svg>
							&#8212;
							<svg
								version="1.1"
								id="Capa_1"
								xmlns="http://www.w3.org/2000/svg"
								xmlns:xlink="http://www.w3.org/1999/xlink"
								x="0px"
								y="0px"
								viewBox="0 0 451.827 451.827"
								style="enable-background: new 0 0 451.827 451.827; cursor: pointer"
								xml:space="preserve"
								:class="step == 4 ? 'active' : ''"
								@click="goTOStep(4)"
							>
								<g>
									<g>
										<path
											d="M225.922,0C101.351,0,0.004,101.347,0.004,225.917s101.347,225.909,225.917,225.909
			c124.554,0,225.901-101.347,225.901-225.909C451.823,101.347,350.476,0,225.922,0z"
										/>
									</g>
								</g>
							</svg> </span
					></span>
				</h1>
			</div>
		</div>
		<slot />
	</div>
</template>
<script lang="ts">
import Vue from 'vue';
import store from '@/store';
import LanguageSwitchHeaderMenu from '@/components/language/LanguageSwitchHeaderMenu.vue';

export default Vue.extend({
	name: 'BaseLayout',
	components: {
		LanguageSwitchHeaderMenu,
	},
	props: {
		step: Number,
		pageTitle: String,
	},
	data: () => ({
		mobiletoggle: false,
		footyParkShow: false,
		competitionsShow: false,
		user: null,
	}),
	methods: {
		mobileMenuToggle() {
			this.mobiletoggle = !this.mobiletoggle;
		},
		footyParkToggle() {
			this.footyParkShow = !this.footyParkShow;
		},
		competitionsToggle() {
			this.competitionsShow = !this.competitionsShow;
		},
		async fetchLoggedInUser() {
			let user = this.$store.state.Player.player;
			if (!user) user = await this.$store.dispatch('getCurrentFirebaseUser');
			this.user = user;
		},
		gobackstep() {
			switch (this.step) {
				case 1:
					return false;
					break;
				case 2:
					this.goTOStep(1);
					break;
				case 3:
					this.goTOStep(2);
					break;
				case 4:
					this.goTOStep(2);
					break;
			}
		},
		async goTOStep(val: any) {
			this.$store.commit('setSelectedBooking2', this.$store.state.Customerbooking.selectedBooking);
			var matches = this.$store.state.Customerbooking.selectedBooking.matches;
			// if (matches.length) {
			// 	alert('matches selected');
			// } else {
			// 	alert('matches not selected');
			// }
			if (this.step == val) {
				console.log('Same Page');
			} else {
				switch (val) {
					case 1:
						this.$router.push({
							path: '/pick-location/' + this.$store.state.Customerbooking.country_id,
						});
						break;
					case 2:
						this.$router.push({
							path: '/book-field/' + this.$store.state.Customerbooking.selectedBooking.location_id,
						});
						break;
					case 3:
						this.$router.push({
							path: '/new-signup',
						});
						break;
					case 4:
						this.$router.push({
							path: '/booking-payment',
						});
						break;
				}
				console.log('Different Page');
			}
			// console.log(val);
		},
	},
	mounted() {
		this.fetchLoggedInUser();
		console.log('country_id' + this.$store.state.Customerbooking.country_id);
	},
});
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Work+Sans:wght@100;200;300;400;500;600;700;800;900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700;800&display=swap');
body {
	margin: 0;
	font-family: 'Work Sans', sans-serif;
}
.topnav {
	overflow: hidden;

	padding: 47px 0px 20px 0px;
	/* background-color: #333; */
}

.topnav a {
	float: left;
	display: block;
	color: #f2f2f2;
	text-align: center;
	padding: 14px 16px;
	text-decoration: none;
	font-size: 17px;
}

.active {
	/* background-color: #04aa6d; */
	color: white;
}

.topnav .icon {
	display: none;
}

.dropdown {
	float: left;
	overflow: hidden;
}

.dropdown .dropbtn {
	font-size: 17px;
	border: none;
	outline: none;
	color: white;
	padding: 14px 16px;
	background-color: inherit;
	font-family: inherit;
	margin: 0;
}

.dropdown-content {
	display: none;
	position: absolute;
	background-color: #f9f9f9;
	min-width: 160px;
	box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
	z-index: 1;
}

.dropdown-content a {
	float: none;
	color: black;
	padding: 12px 16px;
	text-decoration: none;
	display: block;
	text-align: left;
}

.topnav a:hover,
.dropdown:hover .dropbtn {
	/* background-color: #555; */
	color: white;
}

.dropdown-content a:hover {
	/* background-color: #ddd; */
	color: black;
}

.dropdown:hover .dropdown-content {
	display: block;
}
.mobile-view {
	display: none;
}
.desktop-view {
	display: block;
}
.desktop-step {
	display: block;
}
@media screen and (max-width: 600px) {
	.topnav a:not(:first-child),
	.dropdown .dropbtn {
		display: none;
	}
	.dropdown:hover .dropdown-content a:not(:first-child) {
		display: block;
	}
	.topnav .enable:not(:first-child),
	.dropdown .enable {
		display: block !important;
		width: 100%;
		text-align: left;
		background: linear-gradient(279.36deg, #193860 -43.19%, #029f8a 87.16%);
	}
	.banner-text {
		padding-bottom: 13px;
		/* padding-top: 133px; */
	}
	.topnav a.icon {
		float: right;
		display: block;
		position: absolute;
		right: 30px;
		top: 51px;
	}
	.topnav.responsive {
		position: relative;
	}
	.topnav.responsive a.icon {
		position: absolute;
		right: 30px;
		top: 51px;
	}
	.topnav.responsive a {
		float: none;
		display: block;
		text-align: left;
	}
	.topnav.responsive .dropdown {
		float: none;
	}
	.topnav.responsive .dropdown-content {
		position: relative;
	}
	.topnav.responsive .dropdown .dropbtn {
		display: block;
		width: 100%;
		text-align: left;
	}
	.mobile-view {
		display: block !important;
		/* position: fixed; */
		width: 100%;
		z-index: 9;
	}
	/* .topnav {
		padding: 47px 0px 20px 20px;
	} */
	#myTopnav .content-text {
		/* width: fit-content; */
	}
	.logo {
		padding-left: 40px;
	}
	.desktop-view {
		display: none;
	}
	.dropdown {
		width: 100%;
	}
	.topnav.responsive {
		position: relative;
	}
	.topnav.responsive .icon {
		position: absolute;
		right: 30px;
		top: 51px;
	}
	.topnav.responsive a {
		float: none;
		display: block;
		text-align: left;
	}
	.topnav.responsive .dropdown {
		float: none;
	}
	.topnav.responsive .dropdown-content {
		position: relative;
	}
	.topnav.responsive .dropdown .dropbtn {
		display: block;
		width: 100%;
		text-align: left;
	}
}

.mb-85 {
	margin-bottom: 45px !important;
}

.f-right {
	float: right;
}
.content-text {
	width: 90%;
	margin: auto;
	overflow-x: hidden;
}
.bg-img {
	position: absolute;
	width: -webkit-fill-available;
	top: 0;
	z-index: -1;
}
.dropdown {
	position: initial;
}
.register-btn {
	background: #e99648 !important;
	border-radius: 5px;
	margin-right: 12px;
	text-align: center;
}
.rent-btn {
	background: #ffffff !important;
	color: #e99648 !important;
	border-radius: 5px;
	text-align: center;
}
.log-border {
	border-left: 1px solid rgb(255 255 255 / 23%);
}
.small-head {
	font-size: 18px;
	color: #ffffff;
	opacity: 0.7;
	text-transform: capitalize;
	margin-bottom: 0;
}
.main-head {
	font-size: 40px;
	font-weight: 700;
	color: #ffffff;
	text-transform: capitalize;
	display: inline-flex;
	align-items: center;
}
.listing-area {
	background: #ffffff;
}
.list {
	display: flex;
}
.list-container {
	border: 1px solid #ddd8d8;
	border-radius: 5px;
	/* margin-bottom: 18px; */

	align-items: center;
}
.w-100 {
	width: 100%;
}
.w-50 {
	width: 50%;
}
.show-map-btn {
	background: #193860;
	color: #ffffff;
	border-radius: 5px;
	padding: 12px 25px;
	font-weight: 700;
	text-align: center;
}
.pr-30 {
	padding-right: 15px;
}
.t-right {
	text-align: right;
}
.btns .register-btn {
	color: #ffffff;
	border-radius: 5px;
	padding: 12px 25px;
	margin-left: 12px;
	font-weight: 700;
}
.color-orange {
	color: #ffd600;
}
.m-t-0 {
	margin-top: 0px;
}
.list-box-head {
	font-size: 24px;
	margin-bottom: 0px;
	color: #193860;
	font-weight: 700;
	display: inline-flex;
	text-transform: uppercase;
}
.list-box-head svg {
	width: 24px;
	height: 24px;
	fill: #ffd600;
	display: inline;
}
.co-head {
	font-size: 14px;
	color: #6a6d6d;
	margin-top: 0px;
}
.mt-16 {
	margin-top: 16px;
}
.fz-22 {
	font-size: 22px;
}
.city-name {
	text-transform: uppercase;
	margin-bottom: 30px;
	display: flex;
	align-items: center;
}
.steps {
	font-size: 14px;
	display: flex;
	margin-left: 13px;
	margin-top: 10px;
	align-items: center;
}
.steps .steps-icon {
	display: flex;
	align-items: baseline;
}
.steps .steps-icon,
.steps .steps-icon svg {
	color: #3a8b85;
	fill: #3a8b85;
}
.steps .steps-icon .active {
	fill: #ffffff;
}
.small-win {
	display: none;
}
.h-151,
.h-151 img {
	height: 160px;
}
.h-151 img {
	height: 160px;
	width: 235px;
}
.btns {
	display: flex;
	align-items: center;
	justify-content: right;
}
.myDIV {
	/* display: none; */
	border-top: 1px solid #ddd8d8;
	padding: 8px 0px 0px;
	margin-top: 6px;
	display: flex;
	/* position: absolute;
	width: 100%; */
}
.steps svg {
	width: 10px;
	height: 10px;
}
.myDIV a,
#myDIV a:hover {
	color: #193860;
	font-size: 16px;
	font-weight: 400;
	text-decoration: none;
}
.cp {
	cursor: pointer;
}
svg {
	display: inline-block;
}
/* The Modal (background) */
.modal {
	display: none; /* Hidden by default */
	position: fixed; /* Stay in place */
	z-index: 10; /* Sit on top */
	padding-top: 100px; /* Location of the box */
	left: 0;
	top: 0;
	width: 100%; /* Full width */
	height: 100%; /* Full height */
	overflow: auto; /* Enable scroll if needed */
	background-color: rgb(0, 0, 0); /* Fallback color */
	background-color: rgb(25 56 96 / 74%); /* Black w/ opacity */
	font-family: 'Open Sans', sans-serif;
}

.model-show {
	display: block !important;
}
.bg-green {
	background: linear-gradient(279.36deg, #193860 -43.19%, #029f8a 87.16%);
	display: block;
	width: 100%;
	text-align: left !important;
}
/* Modal Content */
#myModalPickLocation .modal-content,
#myModalBookingCal .modal-content {
	position: relative;
	background-color: #fefefe;
	margin: auto;
	padding: 0;
	border: 1px solid #888;
	/* width: 60%; */
	width: 40%;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
	-webkit-animation-name: animatetop;
	-webkit-animation-duration: 0.4s;
	animation-name: animatetop;
	animation-duration: 0.4s;
	border-radius: 10px;
}
.modal-content p {
	font-size: 14px;
}
.modal-content h3 {
	font-size: 20px;
	font-weight: 700;
}
/* Add Animation */
@-webkit-keyframes animatetop {
	from {
		top: -300px;
		opacity: 0;
	}
	to {
		top: 0;
		opacity: 1;
	}
}

@keyframes animatetop {
	from {
		top: -300px;
		opacity: 0;
	}
	to {
		top: 0;
		opacity: 1;
	}
}

/* The Close Button */
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

.close:hover,
.close:focus {
	color: #000;
	text-decoration: none;
	cursor: pointer;
}

.modal-header {
	padding: 2px 6px;
}
.w-75 {
	width: 75%;
}
.w-25 {
	width: 25%;
}
.justify-content-space-between {
	justify-content: space-between;
}
.fw-700 {
	font-weight: 700;
}
.fw-100 {
	font-weight: 100;
}
.align-items-center {
	align-items: center;
}
.mobile-view {
	display: none;
}
.mb-85 {
	margin-bottom: 85px;
}
.d-flex {
	display: flex;
}
.p-8 {
	padding: 0px 8px;
}
.p-2-p {
	padding: 2%;
}
.text-right {
	text-align: right;
}
.color-green {
	color: #029f8a;
}
.fz-10 {
	font-size: 10px;
}
.text-center {
	text-align: center;
}
.p-15 {
	padding: 0px 15px;
}
.ml-15 {
	margin-left: 15px !important;
}
.mr-15 {
	margin-right: 15px;
}
.mb-20 {
	margin-bottom: 20px;
}
.mb-30 {
	margin-bottom: 30px;
}
.mt-20 {
	margin-top: 20px;
}
.pr-15 {
	padding-right: 15px;
}
.pb-15 {
	padding-bottom: 15px;
}
.justify-content-space-evenly {
	justify-content: space-evenly;
}
input[type='tel'] {
	-webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;
	display: block;
	width: 100%;
	height: 3rem;
	padding: 0 1.25rem;
	border: 2px solid #ddd8d8;
	border-radius: 0.3125rem;
	background-color: #fff;
	box-shadow: none;
}
.mobile-step {
	display: none;
}
@media screen and (max-width: 767px) {
	.desktop-step {
		display: none;
	}
	.mobile-step {
		display: flex;
	}
	.rating {
		font-size: 16px;
	}
	.h-151 img {
		width: 100%;
	}
	.content-text {
		width: 100%;
		margin: auto;
	}
	.bg-img img
	/* .steps */ {
		display: none;
	}
	.bg-img {
		background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
			linear-gradient(279.36deg, #193860 -43.19%, #029f8a 87.16%);
		height: 318px;
	}
	.main-head,
	.small-head {
		text-align: center;
	}
	.list {
		display: block !important;
	}
	.w-100,
	.w-50,
	.w-75,
	.w-25 {
		width: 100% !important;
	}
	.t-right {
		text-align: center;
	}
	.m-t-0 {
		margin-top: revert;
	}
	.big-win {
		display: none;
	}
	.small-win {
		display: block;
		width: -webkit-fill-available;
	}
	.list-container .pr-30 {
		padding-right: 0px;
	}
	.h-151 {
		height: auto;
	}
	.show-map-btn,
	.btns .register-btn {
		font-size: 13px;
		padding: 12px 20px;
	}
	.btns svg {
		position: absolute;
		margin-top: -117px;
		right: 46px;
	}
	.list-box-head {
		/* width: 44%; */
		display: block;
	}
	/* .co-head, */
	/* .list-box-head, */
	/* .list p {
		padding-left: 15px;
	} */
	.btns .register-btn {
		margin-right: 0px;
	}
	.list p {
		display: flex;
		align-items: center;
	}
	.myDIV {
		padding: 8px 11px 6px;
		display: grid;
	}
	.h-151 img {
		width: -webkit-fill-available;
	}
	.steps {
		width: 100%;
		justify-content: center;
	}
	.main-head {
		display: block;
		font-size: 28px;
	}
	.btns {
		justify-content: center;
		margin-bottom: 10px;
	}
}
.main-container {
	background: #ffffff;
	padding: 10px 20px;
	border-radius: 5px;
}
</style>
