import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
import Welcome from '@/components/Welcome.vue';
import PlayFootyLogin from '@/components/PlayFootyLogin.vue';
import store from '@/store';
const routes = [
	{
		path: '/',
		name: 'welcome',
		component: Welcome,
		meta: {
			redirectIfLoggedIn: true,
		},
	},
	{
		path: '/playfooty-req',
		name: 'playfootyReq',
		component: PlayFootyLogin,
	},
	{
		path: '/signup:id?',
		name: 'signup',
		component: () => import('@/views/auth/Signup.vue'),
		meta: {
			requiresAuth: false,
		},
	},
	{
		path: '/join/:id?',
		name: 'join',
		component: () => import('@/views/auth/Join.vue'),
		meta: {
			redirectIfLoggedIn: false,
		},
	},
	{
		path: '/pick-location/:locationId?',
		name: 'pick-location',
		component: () => import('@/views/booking/PickLocation.vue'),
		meta: {
			redirectIfLoggedIn: false,
		},
	},
	{
		path: '/book-field/:locationId',
		name: 'book-field',
		component: () => import('@/views/booking/BookField.vue'),
		meta: {
			redirectIfLoggedIn: false,
		},
	},
	{
		path: '/edit-booking',
		name: 'edit-booking',
		component: () => import('@/views/booking/BookField.vue'),
		meta: {
			redirectIfLoggedIn: false,
		},
	},
	{
		path: '/booking-payment',
		name: 'booking-payment',
		component: () => import('@/views/booking/BookingPayment.vue'),
		meta: {
			redirectIfLoggedIn: false,
		},
	},
	{
		path: '/booking-paypal',
		name: 'booking-paypal',
		component: () => import('@/views/booking/BookingPaypal.vue'),
		meta: {
			redirectIfLoggedIn: false,
		},
	},
	{
		path: '/booking-ideal',
		name: 'booking-ideal',
		component: () => import('@/views/booking/BookingIdeal.vue'),
		meta: {
			redirectIfLoggedIn: false,
		},
	},
	{
		path: '/booking-success',
		name: 'booking-success',
		component: () => import('@/views/booking/BookingSuccess.vue'),
		meta: {
			redirectIfLoggedIn: false,
		},
	},
	{
		path: '/upcoming-booking',
		name: 'upcoming-booking',
		component: () => import('@/views/booking/UpcomingBooking.vue'),
		meta: {
			redirectIfLoggedIn: false,
		},
	},
	{
		path: '/booking-cancel',
		name: 'booking-cancel',
		component: () => import('@/views/booking/BookingCancel.vue'),
		meta: {
			redirectIfLoggedIn: false,
		},
	},
	{
		path: '/booking-cancel-notice',
		name: 'booking-cancel-notice',
		component: () => import('@/views/booking/BookingCancel.vue'),
		meta: {
			redirectIfLoggedIn: false,
		},
	},
	{
		path: '/login',
		name: 'signin',
		component: () => import('@/views/auth/Login.vue'),
		meta: {
			requiresAuth: false,
		},
	},
	{
		path: '/new-signup',
		name: 'new-signup',
		component: () => import('@/views/auth/NewSignUp.vue'),
		meta: {
			requiresAuth: false,
		},
	},
	{
		path: '/new-login',
		name: 'new-login',
		component: () => import('@/views/auth/NewLogin.vue'),
		meta: {
			requiresAuth: false,
		},
	},
	{
		path: '/clubhouse',
		name: 'clubhouse',
		component: () => import('@/views/home/ClubHouse.vue'),
		meta: {
			requiresAuth: true,
		},
	},
	{
		path: '/newclubhouse',
		name: 'newclubhouse',
		component: () => import('@/views/home/NewClubHouse.vue'),
		meta: {
			requiresAuth: true,
		},
	},
	{
		path: '/menu',
		name: 'menu',
		component: () => import('@/views/Menu.vue'),
		meta: {
			requiresAuth: true,
		},
	},
	{
		path: '/forgot-password',
		name: 'forgot-password',
		component: () => import('@/views/auth/password/ForgotPassword.vue'),
	},
	{
		path: '/profile',
		name: 'profile',
		component: () => import('@/views/user/Profile.vue'),
		meta: {
			requiresAuth: true,
		},
	},
	{
		path: '/billing',
		name: 'billing',
		component: () => import('@/views/user/Billing.vue'),
		meta: {
			requiresAuth: true,
		},
	},
	{
		path: '/find-fixtures',
		name: 'find fixtures',
		component: () => import('@/views/fixtures/FindFixtures.vue'),
		meta: {
			requiresAuth: true,
		},
	},
	{
		path: '/fixtures',
		name: 'fixtures',
		component: () => import('@/views/fixtures/Fixtures.vue'),
		meta: {
			requiresAuth: true,
		},
	},
	{
		path: '/fixtures/:id',
		name: 'fixturesId',
		component: () => import('@/views/fixtures/Fixtures.vue'),
		meta: {
			requiresAuth: true,
		},
	},
	{
		path: '/results',
		name: 'results',
		component: () => import('@/views/results/Results.vue'),
		meta: {
			requiresAuth: true,
		},
	},
	{
		path: '/results/:id',
		name: 'resultsId',
		component: () => import('@/views/results/Results.vue'),
		meta: {
			requiresAuth: true,
		},
	},
	{
		path: '/standings',
		name: 'standings',
		component: () => import('@/views/standings/Standings.vue'),
		meta: {
			requiresAuth: true,
		},
	},
	{
		path: '/team/:id',
		name: 'team',
		component: () => import('@/views/team/Team.vue'),
		meta: {
			requiresAuth: true,
		},
	},
	{
		path: '*',
		redirect: '/clubhouse',
	},
];

const router = new VueRouter({
	mode: 'history',
	routes,
});

router.beforeEach(async (to, from, next) => {
	if (from.name && from.path) {
		const payload = {
			name: from.name,
			path: from.path,
		};
		store.commit('updatePreviousRoute', payload);
	}
	if (to.name == 'booking-cancel') {
		const selected_booking = JSON.parse(
			// @ts-ignore
			localStorage.getItem('temp_selectedBooking')
		);
		if (selected_booking != null) {
			// @ts-ignore
			store.state.Customerbooking.selectedBooking = JSON.parse(
				// @ts-ignore
				localStorage.getItem('temp_selectedBooking')
			);
			// @ts-ignore
			store.state.Customerbooking.country_id = localStorage.getItem('country_id');
			return next({
				name: 'booking-payment',
				path: '/booking-payment',
			});
		}
	}
	if (to.name == 'booking-success') {
		let str = window.location.href;
		str = str.substring(str.indexOf('redirect_status=') + 16);
		console.log('after string replace: ', str);
		if (str == 'failed') {
			return next({
				name: 'booking-cancel',
				path: '/booking-cancel',
			});
		}
		// @ts-ignore
		store.state.Customerbooking.selectedBooking = JSON.parse(
			// @ts-ignore
			localStorage.getItem('temp_selectedBooking')
		);
	}

	if (to.name == 'edit-booking') {
		const selected_booking = JSON.parse(
			// @ts-ignore
			localStorage.getItem('temp_selectedBooking')
		);
		// @ts-ignore
		store.state.Customerbooking.country_id = JSON.parse(
			// @ts-ignore
			localStorage.getItem('country_id')
		);
		// @ts-ignore
		store.state.Customerbooking.selectedBooking = null;
		// @ts-ignore
		// await router.isReady();
		return next({
			name: 'book-field',
			path: '/book-field',
			params: {
				locationId: selected_booking.location_id,
			},
		});
	}
	//Booking module validations Start
	// @ts-ignore
	const countryId = store.state.Customerbooking.country_id;
	// @ts-ignore
	const selectedBooking = store.state.Customerbooking.selectedBooking;
	const defaultCountryId = 'e2c3e9c6-2477-4f71-a056-d37a9b3f60c9';
	if (to.name == 'book-field') {
		// @ts-ignore
		store.state.Customerbooking.selectedPitch = null;
		if (!countryId) {
			return next({
				name: 'pick-location',
				path: '/pick-location',
				params: {
					locationId: defaultCountryId,
				},
			});
		}
	}
	if (to.name == 'new-signup') {
		if (!countryId) {
			return next({
				name: 'pick-location',
				path: '/pick-location',
				params: {
					locationId: defaultCountryId,
				},
			});
		}
		// @ts-ignore
		if (store.state.Customerbooking.selectedBooking != null) {
			// @ts-ignore
			if (store.state.Customerbooking.selectedBooking.matches <= 0) {
				return next({
					name: 'book-field',
					path: 'book-field',
					params: {
						// @ts-ignore
						locationId: store.state.Customerbooking.selectedBooking.location_id,
					},
				});
			}
		}
	}
	if (to.name == 'booking-payment' || to.name == 'booking-paypal' || to.name == 'booking-ideal') {
		if (!selectedBooking) {
			return next({
				name: 'pick-location',
				path: '/pick-location',
				params: {
					locationId: defaultCountryId,
				},
			});
		}
		const user = store.dispatch('getCurrentFirebaseUser');
		console.log(user);
		let lsPlayer;
		if (localStorage.getItem('player') !== 'undefined') {
			// @ts-ignore
			lsPlayer = JSON.parse(localStorage.getItem('player'));
		}
		if (lsPlayer && typeof lsPlayer === 'object') {
			console.log('logged_in');
		} else {
			return next({
				name: 'new-signup',
				path: '/new-signup',
			});
		}
	}
	//Booking module validations end
	// @ts-ignore
	let user = store.state.Player.player;
	let lsPlayer;
	if (localStorage.getItem('player') !== 'undefined') {
		// @ts-ignore
		lsPlayer = JSON.parse(localStorage.getItem('player'));
	}
	if (!user && lsPlayer && typeof lsPlayer === 'object') {
		// @ts-ignore
		await store.dispatch('getPlayerInfo', {
			firebaseId: lsPlayer.firebase_id,
			signupMethod: 'password',
		});
	}
	// @ts-ignore
	user = store.state.Player.player;
	// @ts-ignore

	if (!user) user = await store.dispatch('getCurrentFirebaseUser');

	// @ts-ignore
	if (to.meta.redirectIfLoggedIn && user) return next({ name: 'clubhouse', path: '/clubhouse' });
	// @ts-ignore
	if (!to.meta.redirectIfLoggedIn && user) return next();
	// @ts-ignore
	if (to.meta.requiresAuth && !user) return next({ name: 'signin', path: '/login' });
	// @ts-ignore
	if (!to.meta.requiresAuth && user) return next({ name: 'clubhouse', path: '/clubhouse' });
	next();
});

export default router;
