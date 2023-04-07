<template>
	<BookingLayout :step="step" :page-title="$t('booking.log_in_or_sign_up')">
		<div class="content-text mb-85 main-container">
			<div class="d-flex w-100 login">
				<div class="w-75 desktop-login-view">
					<div class="mb-20" v-if="pageType == 'signup'">
						<h1>{{ $t('booking.already_have_an_account') }}?</h1>
						<!-- <p>
							<router-link to="/login" class="text-orange"> Log in </router-link>to your existing
							account.
						</p> -->
						<p>
							<a href="javascript:void(0)" class="text-orange" @click="changePage('login')">
								Log in </a
							>{{ $t('booking.login_to_your_existing_account') }}.
						</p>
					</div>
					<div class="mb-20" v-else>
						<h1>{{ $t('booking.dont_have_an_account') }}?</h1>
						<!-- <p>
							<router-link to="/login" class="text-orange"> Log in </router-link>to your existing
							account.
						</p> -->
						<p>
							<a href="javascript:void(0)" class="text-orange" @click="changePage('signup')">
								{{ $t('booking.click_here') }} </a
							>{{ $t('booking.to_create_new_account') }}.
						</p>
					</div>
					<div class="error_msg" v-if="error != ''">
						<p>{{ error }}</p>
					</div>
					<div
						class="mb-20 d-flex justify-content-space-evenly social-btn"
						v-if="successMessage == ''"
					>
						<a href="javascript:void(0)" @click="authGoogle" class="btn google-btn fw-700">
							<svg
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M21.8055 10.0415H21V10H12V14H17.6515C16.827 16.3285 14.6115 18 12 18C8.6865 18 6 15.3135 6 12C6 8.6865 8.6865 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C6.4775 2 2 6.4775 2 12C2 17.5225 6.4775 22 12 22C17.5225 22 22 17.5225 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z"
									fill="#FFC107"
								/>
								<path
									d="M3.15302 7.3455L6.43851 9.755C7.32752 7.554 9.48052 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C8.15902 2 4.82802 4.1685 3.15302 7.3455Z"
									fill="#FF3D00"
								/>
								<path
									d="M12 22C14.583 22 16.93 21.0115 18.7045 19.404L15.6095 16.785C14.5717 17.5742 13.3037 18.001 12 18C9.39897 18 7.19047 16.3415 6.35847 14.027L3.09747 16.5395C4.75247 19.778 8.11347 22 12 22Z"
									fill="#4CAF50"
								/>
								<path
									d="M21.8055 10.0415H21V10H12V14H17.6515C17.2571 15.1082 16.5467 16.0766 15.608 16.7855L15.6095 16.7845L18.7045 19.4035C18.4855 19.6025 22 17 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z"
									fill="#1976D2"
								/>
							</svg>
							<span v-if="pageType == 'signup'">&emsp;{{ $t('booking.sign_up1') }} Google</span>
							<span v-else>&emsp;Sign in with Google</span>
						</a>
						<a href="#" class="btn facebook-btn" @click="authFacebook">
							<svg
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<g clip-path="url(#clip0_226_6575)">
									<path
										fill-rule="evenodd"
										clip-rule="evenodd"
										d="M0 12.067C0 18.033 4.333 22.994 10 24V15.333H7V12H10V9.333C10 6.333 11.933 4.667 14.667 4.667C15.533 4.667 16.467 4.8 17.333 4.933V8H15.8C14.333 8 14 8.733 14 9.667V12H17.2L16.667 15.333H14V24C19.667 22.994 24 18.034 24 12.067C24 5.43 18.6 0 12 0C5.4 0 0 5.43 0 12.067Z"
										fill="white"
									/>
								</g>
								<defs>
									<clipPath id="clip0_226_6575">
										<rect width="24" height="24" fill="white" />
									</clipPath>
								</defs>
							</svg>
							<span v-if="pageType == 'signup'">&emsp;{{ $t('booking.sign_up1') }} Facebook</span>
							<span v-else>&emsp;Sign in with Facebook</span>
						</a>
					</div>
					<br />
					<div class="divid" v-if="successMessage == ''"></div>
					<div class="or" v-if="successMessage == ''">
						<span>{{ $t('booking.or') }}</span>
					</div>
					<br />
					<div class="success_msg" v-if="successMessage != ''">
						<p>Please fill below details to complete signup process</p>
					</div>
					<div class="mb-20" v-if="pageType == 'signup' && successMessage == ''">
						<h2>{{ $t('booking.create_an_account') }}</h2>
					</div>
					<div class="mb-20" v-else-if="pageType == 'login'">
						<h2>Login</h2>
					</div>
					<div>
						<form v-if="pageType == 'login'">
							<div class="form-group mb-20">
								<label>Email</label>
								<input
									type="email"
									:class="wrongInput == 'email' ? 'wrong-input' : ''"
									:placeholder="$t('booking.ex') + ': example@footy.com'"
									v-model="email"
									@input="resetallinput"
								/>
								<p class="wrong-message" v-if="wrongInput == 'email'">Please enter your email</p>
							</div>
							<div class="form-group mb-20">
								<label>Password</label>
								<input
									v-if="!showpassword"
									type="password"
									:class="wrongInput == 'password' ? 'wrong-input' : ''"
									:placeholder="$t('booking.password_placeholder')"
									v-model="password"
									@input="resetallinput"
								/>
								<input
									v-else
									type="text"
									:class="wrongInput == 'password' ? 'wrong-input' : ''"
									:placeholder="$t('booking.password_placeholder')"
									v-model="password"
									@input="resetallinput"
								/>
								<span
									toggle="password-field"
									class="fa fa-fw fa-eye field-icon toggle-password"
									@click="togglePassword"
								></span>
								<p class="wrong-message" v-if="wrongInput == 'password'">
									Please enter your password
								</p>
							</div>
							<div>
								<button type="button" class="btn register-btn" @click="startAuth">Login</button>
							</div>
						</form>
						<form v-else>
							<div class="form-group mb-20">
								<label>{{ $t('booking.full_name') }}</label>
								<input
									v-if="successMessage != ''"
									type="text"
									:class="wrongInput == 'fullname' ? 'wrong-input' : ''"
									:placeholder="$t('booking.name_placeholder')"
									v-model="fullName"
									@input="fullnameToSplit"
									disabled="true"
								/>
								<input
									v-else
									type="text"
									:class="wrongInput == 'fullname' ? 'wrong-input' : ''"
									:placeholder="$t('booking.name_placeholder')"
									v-model="fullName"
									@input="resetallinput"
								/>
								<p class="wrong-message" v-if="wrongInput == 'fullname'">Please enter your name</p>
							</div>
							<div class="form-group mb-20">
								<label>Email</label>
								<input
									v-if="successMessage != ''"
									type="email"
									:class="wrongInput == 'email' ? 'wrong-input' : ''"
									:placeholder="$t('booking.ex') + ': example@footy.com'"
									v-model="email"
									@input="resetallinput"
									:disabled="successMessage != '' ? 'true' : 'false'"
								/>
								<input
									v-else
									type="email"
									:class="wrongInput == 'email' ? 'wrong-input' : ''"
									:placeholder="$t('booking.ex') + ': example@footy.com'"
									v-model="email"
									@input="resetallinput"
								/>
								<p class="wrong-message" v-if="wrongInput == 'email'">Please enter your email</p>
							</div>
							<div class="form-group mb-20">
								<label>{{ $t('booking.phone_number') }}</label>
								<input
									type="tel"
									:class="wrongInput == 'phone' ? 'wrong-input' : ''"
									:placeholder="$t('booking.ex') + ': +31 (0)6 12 345 567'"
									v-model="phone_number"
									@input="resetallinput"
								/>
								<p class="wrong-message" v-if="wrongInput == 'phone'">
									Please enter your phone number
								</p>
							</div>
							<div class="form-group mb-20">
								<label>{{ $t('booking.what_city_do_you_want_to_play') }}?</label>
								<select
									id="city"
									v-model="cityId"
									@change="changeCity"
									:class="wrongInput == 'city' ? 'wrong-input' : ''"
								>
									<option :value="''" disabled>{{ $t('global.select') }}...</option>
									<option v-for="(c, index) in cities" :key="index" :value="c.id">
										{{ c.name }}
									</option>
								</select>
								<!-- <hr /> -->
								<!-- <template>
									<country-select v-model="country" :country="country" topCountry="US" />
									<region-select v-model="region" :country="country" :region="region" />
								</template> -->
								<p class="wrong-message" v-if="wrongInput == 'city'">Please enter your city</p>
							</div>
							<div class="form-group mb-20" v-if="successMessage == ''">
								<label>{{ $t('booking.password') }}</label>
								<input
									v-if="!showpassword"
									type="password"
									:class="wrongInput == 'password' ? 'wrong-input' : ''"
									:placeholder="$t('booking.password_placeholder')"
									v-model="password"
									@input="resetallinput"
								/>
								<input
									v-else
									type="text"
									:class="wrongInput == 'password' ? 'wrong-input' : ''"
									:placeholder="$t('booking.password_placeholder')"
									v-model="password"
									@input="resetallinput"
								/>
								<span
									toggle="#password-field"
									class="fa fa-fw fa-eye field-icon toggle-password"
									@click="togglePassword"
								></span>
								<p class="wrong-message" v-if="wrongInput == 'password'">
									Please enter your password
								</p>
							</div>
							<div class="d-flex align-items-center mb-20">
								<input type="checkbox" v-model="terms" />
								<span>
									{{ $t('booking.i_agree_to') }} FOOTY's
									<a
										href="https://www.playfooty.com/algemene-voorwaarden/"
										class="text-orange"
										target="_blank"
										>{{ $t('booking.terms_of_services') }}</a
									>{{ $t('booking.and') }}
									<a
										href="https://www.playfooty.com/privacy-statement/"
										target="_blank"
										class="text-orange"
										>{{ $t('booking.privacy_policy') }}.</a
									></span
								>
							</div>
							<div>
								<button
									type="button"
									class="btn register-btn"
									@click="startAuth"
									style="font-size: 25px; font-weight: 700"
								>
									{{ $t('booking.register').toUpperCase() }}
								</button>
							</div>
						</form>
					</div>
				</div>
				<!-- <div class="d-flex w-25 box-space p-2-p">
					<div
						style="
							box-shadow: 0px 0px 52px rgba(0, 0, 0, 0.2);
							border-radius: 5px;
							height: fit-content;
						"
					>
						<div class="booking-space mb-20">
							<h3 class="mb-0">Booking details</h3>
							<span>Based on the options you’ve selected</span>
						</div>
						<div class="d-flex w-100 p-15 mb-20 justify-content-space-between">
							<h1>Footy Park Amsterdam</h1>
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
							<p>Sportpark Spieringhorn 10 1043 AA, Amsterdam</p>
						</div>
						<div class="p-15 mb-20">
							<hr />
						</div>
						<div class="p-15 mb-20">
							<span class="text-orange">Options</span>
						</div>
						<div class="p-15 d-flex w-100 justify-content-space-between options">
							<h1>Field size</h1>
							<span>5 vs. 5</span>
						</div>
						<div class="p-15 d-flex w-100 justify-content-space-between options">
							<h1>Field dimensions</h1>
							<span>12 x 24 metres</span>
						</div>
						<div class="p-15 d-flex w-100 justify-content-space-between options">
							<h1>Schedule</h1>
							<span>Aug. 1, 11:00-12:30 <br />Aug. 2, 11:00-12:30</span>
						</div>
						<div class="p-15 mb-20">
							<hr />
						</div>
						<div class="p-15 mb-20">
							<span class="text-orange">Benefits</span>
						</div>
						<div class="p-15 d-flex w-100 justify-content-space-between options">
							<h1>Football (x1)</h1>
							<span class="color-green fw-700">FREE</span>
						</div>
						<div class="p-15 d-flex w-100 justify-content-space-between options mb-20">
							<h1>Bibs (x10)</h1>
							<span class="color-green fw-700">FREE</span>
						</div>
					</div>
				</div> -->
				<BookingDetailBlock></BookingDetailBlock>
			</div>
		</div>
	</BookingLayout>
</template>
<style>
.field-icon {
	float: right;
	margin-left: -25px;
	margin-top: -30px;
	position: relative;
	z-index: 2;
	margin-right: 2%;
}
</style>
<script lang="ts">
import BookingLayout from '@/layouts/booking/BookingLayout.vue';
import BookingDetailBlock from '@/views/booking/BookingField/BookingDetailBlock.vue';
import store from '@/store';
// @ts-ignore
import loading from 'vuejs-loading-screen';
import firebase from 'firebase/app';
import Vue from 'vue';
// @ts-ignore
import vueCountryRegionSelect from 'vue-country-region-select';
// @ts-ignore
import vueCountriesCities from 'vue-countries-cities';
Vue.use(vueCountryRegionSelect);
Vue.use(loading, {
	bg: '#c0c0c099',
	icon: 'fa-solid fa-spinner',
	size: 5,
	icon_color: 'white',
});
// ------------------Redirect if not logged in-------------------------

// ------------------------------------------------------------------------------------

export default Vue.extend({
	components: {
		BookingLayout,
		BookingDetailBlock,
	},
	data() {
		return {
			step: 3 as number,
			pageTitle: this.$t('booking.log_in_or_sign_up'),
			pageType: 'signup',
			email: '',
			password: '',
			first_name: '',
			last_name: '',
			phone_number: '',
			cities: [],
			city: {
				id: '',
				name: '',
				country: {
					id: '',
					name: '',
				},
			},
			country: '',
			region: '',
			fullName: '',
			terms: false,
			wrongInput: '',
			error: '',
			signupType: '',
			firebaseUser: null,
			photo_url: '' as string,
			teamInvite: null as string | null,
			errorMessage: '',
			successMessage: '',
			ringer: false,
			loading: false,
			showpassword: false,
			redirecttologin: false,
		};
	},
	watch: {
		pageType: {
			handler(newVal: string) {
				this.email = '';
				this.password = '';
				this.first_name = '';
				this.last_name = '';
				this.phone_number = '';
				this.city = {
					id: '',
					name: '',
					country: {
						id: '',
						name: '',
					},
				};
				this.fullName = '';
				this.terms = false;
				this.wrongInput = '';
				this.successMessage = '';
				this.ringer = false;
			},
		},
	},
	methods: {
		togglePassword() {
			if (this.showpassword) {
				this.showpassword = false;
			} else {
				this.showpassword = true;
			}
		},
		changeCity(event: any) {
			const city = this.cities.find((c: any) => c.id === event.target.value);
			if (city) this.city = city;
		},
		async startAuth() {
			console.log('form submitted');
			// @ts-ignore
			this.$isLoading(true);
			if (!this.terms && this.pageType == 'signup') {
				this.error = 'Please accept Terms of Service and Privacy Policy ';
				// @ts-ignore
				this.$isLoading(false);
				return;
			}
			var check = false;
			var temthis = this;
			if (this.pageType == 'login') {
				//login process
				check = this.markFirstInput();
				if (!check) {
					//starting login process
					const firebaseResponse: any = await firebase
						.auth()
						.signInWithEmailAndPassword(this.email, this.password)
						.catch((error) => {
							const errorMessage = error.message;
							this.error = errorMessage;
						});

					if (firebaseResponse && firebaseResponse.user) {
						try {
							const data = await this.$store.dispatch(
								'appInit',
								this.getAppInitPayload(firebaseResponse.user)
							);
							if (data) {
								this.error = data;
							}
							this.$router.push({ path: '/booking-payment' });
						} catch (error) {
							return;
						}
					}
				}
				console.log('form submitted inside login');
			} else {
				//signup process
				check = this.markFirstInput();
				if (!check) {
					//start signup process
					await this.createAccount();
				}
				console.log('form submitted inside else', this.wrongInput);
			}
			// @ts-ignore
			this.$isLoading(false);
		},
		getAppInitPayload(firebaseUser: any) {
			return {
				firebaseId: firebaseUser.uid,
				signupMethod: firebaseUser.providerData?.[0]?.providerId,
			};
		},
		async authGoogle() {
			if (this.pageType == 'signup') {
				this.signupWithGoogle();
			} else {
				await this.socialLogin('google');
			}
		},

		async authFacebook() {
			if (this.pageType == 'signup') {
				this.signupWithFacebook();
			} else {
				await this.socialLogin('facebook');
			}
		},
		async signupWithGoogle() {
			var provider = new firebase.auth.GoogleAuthProvider();
			const firebaseResponse: any = await firebase
				.auth()
				.signInWithPopup(provider)
				.catch((error) => {
					this.error = error.message;
					return;
				});

			if (firebaseResponse.user) {
				this.email = firebaseResponse.user.email;

				this.firebaseUser = firebaseResponse.user;

				this.photo_url = firebaseResponse.user.photoURL;

				this.signupType = 'google';
			}

			if (firebaseResponse.additionalUserInfo && firebaseResponse.additionalUserInfo.profile) {
				this.first_name = firebaseResponse.additionalUserInfo.profile.given_name || '';

				this.last_name = firebaseResponse.additionalUserInfo.profile.family_name || '';

				this.fullName = this.first_name + ' ' + this.last_name;

				// console.log('city ', firebaseResponse.additionalUserInfo);
			}

			this.error = '';

			this.successMessage = 'Please fill below details to complete Signup';
		},

		async loginWithGoogle() {
			await this.socialLogin('google');
		},

		async loginWithFacebook() {
			await this.socialLogin('facebook');
		},

		async signupWithFacebook() {
			var provider = new firebase.auth.FacebookAuthProvider();
			const firebaseResponse: any = await firebase
				.auth()
				.signInWithPopup(provider)
				.catch((error) => {
					this.error = error.message;
					console.log('facebook error: ', error.message);
					return;
				});

			console.log(firebaseResponse);
			if (firebaseResponse.user) {
				this.email = firebaseResponse.user.email;

				this.firebaseUser = firebaseResponse.user;

				this.photo_url = firebaseResponse.user.photoURL;

				this.signupType = 'facebook';
			}

			if (firebaseResponse.additionalUserInfo && firebaseResponse.additionalUserInfo.profile) {
				this.first_name = firebaseResponse.additionalUserInfo.profile.first_name || '';

				this.last_name = firebaseResponse.additionalUserInfo.profile.last_name || '';

				this.fullName = this.first_name + ' ' + this.last_name;

				// console.log('city ', firebaseResponse.additionalUserInfo);
			}

			this.error = '';

			this.successMessage = 'Please fill below details to complete Signup';
		},

		async socialLogin(socialProvider: string) {
			let provider: any;
			var failed = false;

			switch (socialProvider) {
				case 'facebook':
					provider = new firebase.auth.FacebookAuthProvider();
					break;
				case 'google':
					provider = new firebase.auth.GoogleAuthProvider();
					break;
			}

			const firebaseResponse: any = await firebase
				.auth()
				.signInWithPopup(provider)
				.catch((error) => {
					this.error = 'No Footy account found, please Sign Up first.';

					this.pageType = 'signup';
					if (socialProvider == 'facebook') {
						this.error = error.message;
					}
					console.log('Auth error: ', error.message);
					return;
				});

			console.log('response:', firebaseResponse);

			if (firebaseResponse !== null) {
				if (firebaseResponse.user && firebaseResponse.additionalUserInfo) {
					const firebaseUser = firebaseResponse.user;
					const additionalUserInfo = firebaseResponse.additionalUserInfo;

					if (additionalUserInfo.isNewUser) {
						await firebaseUser.delete().then(() => {
							this.error = 'No Footy account found, please Sign Up first.';

							this.pageType = 'signup';
							// alert('footy account not found');
							failed = true;
							return;
						});
					}
				}
				console.log('here after validation');
				if (!failed) {
					const data = await this.$store.dispatch(
						'appInit',

						this.getAppInitPayload(firebaseResponse.user)
					);

					if (data) return (this.error = data);

					this.$router.push({ path: '/booking-payment' });
					return;
				}
			}
		},

		markFirstInput() {
			var empty = false;

			if (this.pageType == 'login') {
				if (this.email == '') {
					this.wrongInput = 'email';
					empty = true;
				} else if (this.password == '') {
					this.wrongInput = 'password';
					empty = true;
				}
			} else {
				if (this.fullName == '') {
					this.wrongInput = 'fullname';
					empty = true;
				} else if (this.email == '') {
					this.wrongInput = 'email';
					empty = true;
				} else if (this.phone_number == '') {
					this.wrongInput = 'phone';
					empty = true;
				} else if (this.city.id == '') {
					this.wrongInput = 'city';
					empty = true;
				} else if (this.password == '') {
					if (this.successMessage == '') {
						this.wrongInput = 'password';
						empty = true;
					}
				}
			}
			return empty;
		},
		changePage(value: string) {
			this.pageType = value;
		},
		async resetallinput() {
			console.log('here event');

			this.wrongInput = '';

			this.error = '';
		},

		fullnameToSplit() {
			var arr = this.fullName.split(' ');
			var first_name = arr[0];
			if (arr.length > 0) {
				var last_name = arr[1];
			} else {
				var last_name = arr[0];
			}

			this.first_name = first_name;
			this.last_name = last_name;

			this.wrongInput = '';

			this.error = '';
		},

		async createAccount() {
			const photoURL = this.photo_url;

			var { city, email, first_name, password, phone_number, ringer } = this;
			var arr = this.fullName.split(' ');
			first_name = arr[0];
			this.last_name = arr[0];
			if (arr.length > 1) {
				this.last_name = arr[1];
			} else {
				this.last_name = arr[0];
			}
			console.log('first name: ', first_name);
			console.log('last name: ', this.last_name);

			if (true) {
				let firebaseUser = this.firebaseUser;

				if (!firebaseUser) {
					firebaseUser = await this.$store

						.dispatch('createFirebaseUser', { email, password })
						.catch((err: string) => {
							this.errorMessage = 'profile.error_on_form';
							err = err.toString().split(':')[1].trim();
							if (err === 'auth/invalid-email') {
								this.error = 'Error Email Invalid';
							} else if (err === 'auth/email-already-in-use') {
								this.error = 'Error Email In Use';
							} else if (err === 'auth/weak-password') {
								this.error = 'Error Weak Password';
							} else {
								// throw new Error('Signup Failed');
								this.error = 'Signup Failed';
							}
						});
				}

				console.log('firebase responce', firebaseUser);

				if (!firebaseUser) return (this.loading = false);
				else {
					const zendeskContact = await this.$store.dispatch('createZendeskPlayer', {
						first_name,
						last_name: this.last_name,
						city: city.name,
						country: city.country.name,
						email,
						ringer: false,
						phone: phone_number,
						is_organization: false,
					});

					const zendeskId = zendeskContact.id || zendeskContact.user.id;

					let footyPlayer: any;

					const existingPlayer = await this.$store.dispatch('getPlayerByEmail', email);
					if (existingPlayer === 'error') throw new Error('Error in getting player');

					if (existingPlayer) {
						footyPlayer = existingPlayer;

						this.error = 'Email already taken please try again with different credentials';
						console.log('email exist return');
						return;

						await this.$store.dispatch('updatePlayer', {
							id: existingPlayer.id,
							// @ts-ignore
							firebase_id: firebaseUser.uid,
							zendesk_id: zendeskId + '',
						});
					} else {
						// @ts-ignore
						var fuid = firebaseUser.uid;
						const newPlayer = {
							city: city.id,
							email,
							firebase_id: fuid,
							first_name,
							gender: null,
							language: 'en',
							last_name: this.last_name,
							phone_number,
							ringer: false,
							status: 'active',
							whatsapp: false,
							zendesk_id: zendeskId + '',
						};

						footyPlayer = await this.$store.dispatch('createNewPlayer', newPlayer);
						if (footyPlayer === 'error') throw new Error('Unable to create new Player');
						else {
							const teamInvite = this.$route.query.team_invite;
							const notAlreadyRegistered =
								footyPlayer.join_players_teams.length &&
								footyPlayer.join_players_teams
									.map((j: any) => j.teamObj.id)

									.includes(this.$route.query.team_invite);

							if (teamInvite) {
								if (!notAlreadyRegistered) {
									if (!(await (this as any).isTeamFull(teamInvite))) {
										await this.$store.dispatch('registerPlayerWithTeam', {
											player: footyPlayer.id,

											team: this.$route.query.team_invite,
										});
									}
								}
							}
							const appInitPayload = {
								// @ts-ignore
								firebaseId: firebaseUser.uid,
								// @ts-ignore
								signupMethod: firebaseUser.providerData?.[0]?.providerId,
							};

							await this.$store.dispatch('appInit', appInitPayload);

							await this.$router.push({ name: 'booking-payment' });
						}
					}
				}
			}
		},
	},
	async mounted() {
		window.scrollTo(0, 0);
		this.cities = await this.$store.dispatch('getCities');
		var countryId = this.$store.state.Customerbooking.country_id;
		console.log('checking here: ', countryId);
		this.cities = this.cities.filter((item) => {
			// @ts-ignore
			if (item.country.id == countryId) {
				return item;
			} else {
				console.log(
					'skipped city: ',
					// @ts-ignore
					item.country.id,
					countryId
				);
			}
		});
		console.log('cities: ', this.cities);
		// @ts-ignore
		var lsPlayer = JSON.parse(localStorage.getItem('player'));
		// console.log(lsPlayer.firebase_id);
		if (typeof lsPlayer === 'object') {
			if (lsPlayer) {
				store.dispatch('getPlayerInfo', {
					firebaseId: lsPlayer.firebase_id,
					signupMethod: 'password',
				});
				var user = store.dispatch('getCurrentFirebaseUser');
				// @ts-ignore
				if (user) {
					console.log('logged in');

					this.$router.push({ path: '/booking-payment' });
				} else {
					console.log('not logged in');
					// this.$router.push({ path: '/new-signup' });
					// window.location.href = '';
				}
			} else {
				console.log('not logged in');
				// this.$router.push({ path: '/new-signup' });
				// window.location.href = '/new-signup';
			}
		}
		// @ts-ignore
		this.cityId = this.cities[0].id;
		if (this.$store.state.Customerbooking.selectedBooking != null) {
			if (this.$store.state.Customerbooking.selectedBooking.countryDetails != null) {
				this.city = {
					// @ts-ignore
					id: this.cities[0].id,
					// @ts-ignore
					name: this.cities[0].name,
					country: {
						id: this.$store.state.Customerbooking.selectedBooking.countryDetails.id,
						name: this.$store.state.Customerbooking.selectedBooking.countryDetails.name,
					},
				};
			}
		}
	},
});
</script>
<style>
/* .register-btn {
	background: #e99648;
	color: #ffffff;
	font-weight: 500;
	margin: 17px;
	padding: 13px 0px;
	border-radius: 5px;
	font-size: 21px;
} */
.success_msg {
	background: #71f59f;
	border-radius: 5px;
	padding: 6px;
	margin-bottom: 10px;
}
.error_msg {
	background: #ffbab5;
	border-radius: 5px;
	margin-bottom: 10px;
}
.error_msg p {
	padding: 6px;
	color: #9e1006;
}
.wrong-input {
	border: 2px solid red !important;
	background: #fcbfbb !important;
}
.wrong-message {
	color: #cf1204;
	font-weight: bolder;
}
form .register-btn {
	width: 100%;
	font-size: 26px;
	padding: 8px 0px !important;
	color: #ffffff;
	font-weight: 700;
}
.divid {
	width: 80%;
	margin: auto;
	height: 1px;
	background-color: gray;
}
.or span {
	position: absolute;
	margin-top: -13px;
	background: #ffffff;
	width: 24px;
	height: 20px;
}
.facebook-btn {
	background: #527bcb;
	padding: 10px 15px;
	border-radius: 5px;
	color: #ffffff;
}
.google-btn {
	background: #ffffff;
	padding: 10px 15px;
	border-radius: 5px;
	border: 1px solid #ddd8d8;
}
input[type='checkbox'] {
	width: 18px;
	height: 18px;
	margin-right: 12px;
}
.desktop-login-view {
	padding: 2% 16%;
	text-align: center;
}
.desktop-login-view form {
	text-align: left;
}
form label {
	font-size: 14px;
	font-weight: 600;
	color: #000000;
}
.text-orange {
	color: #e99648;
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
.booking-space {
	background: #193860;
	color: #ffffff;
	padding: 15px;
	border-radius: 5px 5px 0px 0px;
}
.booking-space h3 {
	font-size: 16px;
	color: #ffffff;
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
@media screen and (max-width: 1304px) {
	.facebook-btn {
		margin: 5px;
	}
	.google-btn {
		margin: 5px;
	}
}
@media screen and (max-width: 767px) {
	.social-btn {
		display: inline-grid;
	}
	.social-btn .google-btn {
		margin-bottom: 20px;
	}
	.desktop-login-view {
		padding: 5% 2%;
	}
	.login.d-flex {
		display: block;
	}
	.mobile-view {
		display: contents;
	}
	.desktop-view {
		display: none;
	}
}
</style>
