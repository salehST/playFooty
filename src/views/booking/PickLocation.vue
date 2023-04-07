<template>
	<BookingLayout :step="step" :page-title="$t('booking.pick_a_location')">
		<div class="content-text mb-85 main-container">
			<div
				v-if="!filteredLocations.length"
				class="alert-warning"
				style="text-align: center; font-size: 25px"
			>
				No location available!
			</div>
			<div v-for="(locations, index) in filteredLocations" :key="index" class="listing-area">
				<div v-for="(location, index) in locations" :key="location.id" style="padding: 6px 16px">
					<div v-if="index == 0">
						<h1 class="city-name">
							{{ location.cityObj.name
							}}<svg
								width="16"
								height="9"
								viewBox="0 0 16 9"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								class="ml-2 mobile-view"
								style="width: auto"
							>
								<path
									d="M0.933317 8.6C0.688872 8.35556 0.56665 8.04445 0.56665 7.66667C0.56665 7.28889 0.688872 6.97778 0.933317 6.73334L7.06665 0.600004C7.19998 0.46667 7.34443 0.372004 7.49998 0.316004C7.65554 0.260893 7.82221 0.233337 7.99998 0.233337C8.17776 0.233337 8.35021 0.26667 8.51732 0.333337C8.68354 0.400004 8.82221 0.488892 8.93332 0.600004L15.0666 6.73334C15.3111 6.97778 15.4333 7.28889 15.4333 7.66667C15.4333 8.04445 15.3111 8.35556 15.0666 8.6C14.8222 8.84445 14.5111 8.96667 14.1333 8.96667C13.7555 8.96667 13.4444 8.84445 13.2 8.6L7.99998 3.4L2.79998 8.6C2.55554 8.84445 2.24443 8.96667 1.86665 8.96667C1.48887 8.96667 1.17776 8.84445 0.933317 8.6Z"
									fill="#193860"
								/>
							</svg>
						</h1>
					</div>
					<div class="list-container list w-100 border-rad20">
						<div
							class="pr-30 h-151"
							v-if="location.logo_url"
							style="overflow: hidden; height: 160px"
						>
							<img :src="location.logo_url" class="" style="height: auto" />
						</div>
						<div class="pr-30 h-151" v-else>
							<img src="@/assets/images/Picture.png" class="" />
						</div>
						<div class="w-100" style="padding-right: 14px; padding-left: 14px">
							<div class="w-100 list">
								<div
									class="w-50"
									style="
										display: inline-flex;
										align-items: baseline;
										justify-content: space-between;
									"
								>
									<div>
										<h3 class="m-t-0 list-box-head">
											<router-link :to="`/book-field/${location.id}`">
												{{ location.name }} &nbsp;
											</router-link>
										</h3>
										<div class="m-t-0 list-box-head rating">
											<svg
												version="1.1"
												id="Capa_1"
												xmlns="http://www.w3.org/2000/svg"
												xmlns:xlink="http://www.w3.org/1999/xlink"
												x="0px"
												y="0px"
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
										</div>
										<p class="co-head">{{ location.address }}</p>
										<p class="d-flex align-items-center">
											{{ $t('booking.from') }}&nbsp;
											<span class="list-box-head">
												&nbsp;{{ location.currency }} {{ location.minPrice }}</span
											>&nbsp;/{{ $t('booking.hour') }}
										</p>
									</div>
									<div>
										<svg
											width="24px"
											height="24px"
											viewBox="0 0 24 24"
											version="1.1"
											xmlns="http://www.w3.org/2000/svg"
											xmlns:xlink="http://www.w3.org/1999/xlink"
											@click="venueExpand(location.id)"
											v-show="!selected_options.includes(location.id)"
											style="width: auto; float: right"
											class="mobile-arrow"
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
													fill="#000000"
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
										<svg
											width="12"
											height="7"
											viewBox="0 0 12 7"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
											@click="venueExpand(location.id)"
											v-show="selected_options.includes(location.id)"
											style="
												width: 24px;
												/* position: absolute; */
												/* margin-top: -98px; */
												float: right;
												/* right: 46px; */
												width: auto;
											"
											class="mobile-arrow"
										>
											<path
												d="M6 0.0250006C6.13333 0.0250006 6.26233 0.0500011 6.387 0.100001C6.51233 0.150002 6.61667 0.216668 6.7 0.300001L11.3 4.9C11.4833 5.08333 11.575 5.31667 11.575 5.6C11.575 5.88333 11.4833 6.11667 11.3 6.3C11.1167 6.48333 10.8833 6.575 10.6 6.575C10.3167 6.575 10.0833 6.48333 9.9 6.3L6 2.4L2.1 6.3C1.91667 6.48333 1.68333 6.575 1.4 6.575C1.11667 6.575 0.883335 6.48333 0.700002 6.3C0.516668 6.11667 0.425 5.88333 0.425 5.6C0.425 5.31667 0.516668 5.08333 0.700002 4.9L5.3 0.300001C5.4 0.200001 5.50833 0.129334 5.625 0.0880013C5.74167 0.0460014 5.86667 0.0250006 6 0.0250006Z"
												fill="#193860"
											/>
										</svg>
									</div>
								</div>
								<div class="w-50 t-right btns">
									<a style="cursor: pointer" @click="mapShow(location)" class="show-map-btn">{{
										$t('booking.show_on_map')
									}}</a>
									<router-link :to="`/book-field/${location.id}`" class="register-btn">
										{{ $t('booking.book_this_field') }}
									</router-link>
									<svg
										width="24px"
										height="24px"
										viewBox="0 0 24 24"
										version="1.1"
										xmlns="http://www.w3.org/2000/svg"
										xmlns:xlink="http://www.w3.org/1999/xlink"
										@click="venueExpand(location.id)"
										v-show="!selected_options.includes(location.id)"
										class="desktop-view"
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
												fill="#000000"
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
									<svg
										width="12"
										height="7"
										viewBox="0 0 12 7"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
										@click="venueExpand(location.id)"
										v-show="selected_options.includes(location.id)"
										style="width: 24px"
										class="desktop-view"
									>
										<path
											d="M6 0.0250006C6.13333 0.0250006 6.26233 0.0500011 6.387 0.100001C6.51233 0.150002 6.61667 0.216668 6.7 0.300001L11.3 4.9C11.4833 5.08333 11.575 5.31667 11.575 5.6C11.575 5.88333 11.4833 6.11667 11.3 6.3C11.1167 6.48333 10.8833 6.575 10.6 6.575C10.3167 6.575 10.0833 6.48333 9.9 6.3L6 2.4L2.1 6.3C1.91667 6.48333 1.68333 6.575 1.4 6.575C1.11667 6.575 0.883335 6.48333 0.700002 6.3C0.516668 6.11667 0.425 5.88333 0.425 5.6C0.425 5.31667 0.516668 5.08333 0.700002 4.9L5.3 0.300001C5.4 0.200001 5.50833 0.129334 5.625 0.0880013C5.74167 0.0460014 5.86667 0.0250006 6 0.0250006Z"
											fill="#193860"
										/>
									</svg>
								</div>
							</div>
							<!-- <div class="w-100">
								<p>from {{ location.minPrice }} <span class="list-box-head">€</span>/hour</p>
							</div> -->
							<div v-if="selected_options.includes(location.id)" class="myDIV">
								<a href="tel:+31 68 313 33 80" class="pr-30" style="padding-bottom: 8px">
									<svg
										version="1.1"
										id="Capa_1"
										xmlns="http://www.w3.org/2000/svg"
										xmlns:xlink="http://www.w3.org/1999/xlink"
										x="0px"
										y="0px"
										width="16px"
										height="16px"
										viewBox="0 0 891.024 891.024"
										style="enable-background: new 0 0 891.024 891.024"
										xml:space="preserve"
										fill="#193860"
									>
										<g>
											<path
												d="M2.8,180.875c46.6,134,144.7,286.2,282.9,424.399c138.2,138.2,290.4,236.301,424.4,282.9c18.2,6.3,38.3,1.8,52-11.8
											l92.7-92.7l21.6-21.6c19.5-19.5,19.5-51.2,0-70.7l-143.5-143.4c-19.5-19.5-51.2-19.5-70.7,0l-38.899,38.9
											c-20.2,20.2-52.4,22.2-75,4.6c-44.7-34.8-89-73.899-131.9-116.8c-42.9-42.9-82-87.2-116.8-131.9c-17.601-22.6-15.601-54.7,4.6-75
											l38.9-38.9c19.5-19.5,19.5-51.2,0-70.7l-143.5-143.5c-19.5-19.5-51.2-19.5-70.7,0l-21.6,21.6l-92.7,92.7
											C1,142.575-3.5,162.675,2.8,180.875z"
											/>
										</g>
									</svg>
									{{ location.phone_number }}</a
								>
								<a href="mailto:info@middenmeer.footy.eu">
									<svg
										version="1.1"
										id="Layer_1"
										xmlns="http://www.w3.org/2000/svg"
										xmlns:xlink="http://www.w3.org/1999/xlink"
										x="0px"
										y="0px"
										width="16px"
										height="16px"
										viewBox="0 0 490 490"
										style="enable-background: new 0 0 490 490"
										xml:space="preserve"
										fill="#193860"
									>
										<g>
											<path
												d="M479.405,330c-9.7-5-21.7-1.3-26.8,8.1c-37.4,69.7-112.1,113.1-194.8,113.1c-120.3,0-218.3-92.5-218.3-206.2
													s98-206.2,218.4-206.2c48.1,0,112.9,20.3,149.3,65.8c25.3,31.6,32.6,69.8,21.6,113.6c-12,48-34.5,81.4-66.8,99.2
													c-19.1,10.6-37.3,13-48.6,13.1c1.5-13.7,6.7-44.1,23.2-110.7c13.2-53.3,27.1-103.3,27.2-103.8c2.9-10.3-3.3-21-13.9-23.8
													s-21.4,3.3-24.3,13.6c-0.1,0.3-4.1,14.7-9.8,36.2c-12.6-25.4-33-44.7-59.4-52.9c-60.7-18.9-130.1,28-155,104.7
													c-24.8,76.7,4.2,154.2,65,173.1c36.3,11.3,75.7-0.9,106.8-29c-0.2,8,0.9,22,14.2,27.6c14.5,6.1,51.3,6.8,87.3-10.8
													c31.5-15.4,73-49.9,92.4-127.2c13.8-55.1,3.8-105.9-28.9-146.8c-20.3-25.3-49.1-46.3-83.2-60.7c-30.7-12.9-65.3-20-97.3-20
													c-68.8,0-133.4,25.4-182.1,71.5c-48.7,46.3-75.6,107.9-75.6,173.5s26.9,127.2,75.8,173.5c48.7,46.1,113.4,71.5,182.1,71.5
													c48.4,0,95.6-12.8,136.4-37.1c39.8-23.6,72.1-57.1,93.4-96.8C492.805,346.7,489.105,335,479.405,330z M178.805,328.8
													c-39.9-12.4-57.6-67.6-39.6-123.2c18-55.7,65-90.8,104.9-78.4c39.9,12.4,57.6,67.6,39.6,123.2
													C265.605,306.1,218.705,341.2,178.805,328.8z"
											/>
										</g>
									</svg>
									{{ location.email }}</a
								>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- The Modal -->
		<div
			v-if="map_model"
			id="myModalPickLocation"
			class="modal"
			:class="map_model ? 'model-show' : ''"
		>
			<!-- Modal content -->
			<div class="modal-content">
				<div class="modal-header">
					<div class="mt-2 mb-2">
						<h2>{{ mapCity }}</h2>
						<p>{{ mapAddress }}</p>
					</div>
					<div>
						<span @click="mapClose" class="close">&times;</span>
					</div>
				</div>
				<div class="modal-body">
					<LocationMap :lat="latitude" :long="longitude" idname="mapWeb"></LocationMap>
					<img src="map.png" class="img-responsive" alt="" />
				</div>
			</div>
		</div>
	</BookingLayout>
</template>
<script>
// Apollo
import BookingLayout from '@/layouts/booking/BookingLayout.vue';
import LocationMap from '@/components/booking/LocationMap.vue';
import i18n from '@/i18n';
import { mapGetters } from 'vuex';
export default {
	components: {
		BookingLayout,
		LocationMap,
	},
	data() {
		return {
			locations: [],
			filteredLocations: [],
			countryId: this.$route.params.locationId,
			map_model: false,
			latitude: 0,
			longitude: 0,
			mapCity: '',
			mapAddress: '',
			selected_options: [],
			step: 1,
			pageTitle: this.$t('booking.pick_a_location'),
		};
	},
	created() {
		// if (this.countryId == 'e2c3e9c6-2477-4f71-a056-d37a9b3f60c9') {
		// 	this.$store.commit('setSelectedLanguage', 'nl');
		// 	this.$i18n.locale = 'nl';
		// } else {
		// 	this.$store.commit('setSelectedLanguage', 'en');
		// 	this.$i18n.locale = 'en';
		// }
		this.getLocations();
		this.$store.commit('setSelectedBookingCountryId', this.countryId);
	},
	computed: {
		...mapGetters(['getSelectedLanguage']),
	},
	watch: {
		getSelectedLanguage: {
			handler: async function (after, before) {
				this.$store.commit('setUserLanguage', after);
				localStorage.setItem('language', after);
				this.$i18n.locale = after;
			},
		},
	},
	beforeMount() {
		if (this.countryId == 'e2c3e9c6-2477-4f71-a056-d37a9b3f60c9') {
			this.$store.commit('setSelectedLanguage', 'nl');
			this.$i18n.locale = 'nl';
			this.$store.state.Customerbooking.language = 'nl';
		} else {
			this.$store.commit('setSelectedLanguage', 'en');
			this.$i18n.locale = 'en';
			this.$store.state.Customerbooking.language = 'en';
		}
	},
	mounted() {
		if (this.countryId == 'e2c3e9c6-2477-4f71-a056-d37a9b3f60c9') {
			this.$store.commit('setSelectedLanguage', 'nl');
			this.$i18n.locale = 'nl';
		} else {
			this.$store.commit('setSelectedLanguage', 'en');
			this.$store.commit('setUserLanguage', 'en');
			// this.$store.commit('getSelectedLanguage', 'en');
			this.$i18n.locale = 'en';
		}
		var tempthis = this;
		var myInterval = setInterval(function () {
			if (tempthis.$i18n.locale != tempthis.$store.state.Customerbooking.language) {
				tempthis.$i18n.locale = tempthis.$store.state.Customerbooking.language;
				clearInterval(myInterval);
			} else {
			}
		}, 100);
	},
	methods: {
		myFunction() {
			var x = document.getElementById('myTopnav');
			if (x.className === 'topnav') {
				x.className += ' responsive';
			} else {
				x.className = 'topnav';
			}
		},
		async getLocations() {
			const countryId = this.countryId;
			if (!this.countryId) {
				return false;
			}
			this.locations = await this.$store.dispatch('getLocationsByCountry', countryId);
			let locations = this.locations;
			// Find min price at which venue is available
			let filteredLocations = [];
			let counter = 0;
			if (locations.length) {
				let city = '';
				for (let i = 0; i < locations.length; i++) {
					let minPrice = 0;
					for (let j = 0; j < locations[i].pitches.length; j++) {
						if (
							locations[i].pitches[j].monPrice &&
							(minPrice > locations[i].pitches[j].monPrice || minPrice == 0)
						) {
							minPrice = locations[i].pitches[j].monPrice;
						}
						if (
							locations[i].pitches[j].tuePrice &&
							(minPrice > locations[i].pitches[j].tuePrice || minPrice == 0)
						) {
							if (minPrice == 0) minPrice = locations[i].pitches[j].tuePrice;
							else
								minPrice =
									minPrice < locations[i].pitches[j].tuePrice
										? minPrice
										: locations[i].pitches[j].tuePrice;
						}
						if (
							locations[i].pitches[j].wedPrice &&
							(minPrice > locations[i].pitches[j].wedPrice || minPrice == 0)
						) {
							if (minPrice == 0) minPrice = locations[i].pitches[j].wedPrice;
							else
								minPrice =
									minPrice < locations[i].pitches[j].wedPrice
										? minPrice
										: locations[i].pitches[j].wedPrice;
						}
						if (
							locations[i].pitches[j].thursPrice &&
							(minPrice > locations[i].pitches[j].thursPrice || minPrice == 0)
						) {
							if (minPrice == 0) minPrice = locations[i].pitches[j].thursPrice;
							else
								minPrice =
									minPrice < locations[i].pitches[j].thursPrice
										? minPrice
										: locations[i].pitches[j].thursPrice;
						}
						if (
							locations[i].pitches[j].friPrice &&
							(minPrice > locations[i].pitches[j].friPrice || minPrice == 0)
						) {
							if (minPrice == 0) minPrice = locations[i].pitches[j].friPrice;
							else
								minPrice =
									minPrice < locations[i].pitches[j].friPrice
										? minPrice
										: locations[i].pitches[j].friPrice;
						}
						if (
							locations[i].pitches[j].satPrice &&
							(minPrice > locations[i].pitches[j].satPrice || minPrice == 0)
						) {
							if (minPrice == 0) minPrice = locations[i].pitches[j].satPrice;
							else
								minPrice =
									minPrice < locations[i].pitches[j].satPrice
										? minPrice
										: locations[i].pitches[j].satPrice;
						}
						if (
							locations[i].pitches[j].sunPrice &&
							minPrice > (locations[i].pitches[j].sunPrice || minPrice == 0)
						) {
							if (minPrice == 0) minPrice = locations[i].pitches[j].sunPrice;
							else
								minPrice =
									minPrice < locations[i].pitches[j].sunPrice
										? minPrice
										: locations[i].pitches[j].sunPrice;
						}
					}
					if (city != locations[i].cityObj.name) {
						city = locations[i].cityObj.name;
						counter++;
					}
					locations[i].minPrice = minPrice;
					if (
						locations[i].pwa_publish &&
						locations[i].pwa_publish == 'Yes' &&
						locations[i].minPrice &&
						locations[i].currency &&
						locations[i].incremental_time &&
						locations[i].minimum_duration &&
						locations[i].cancellation_notice_period
					) {
						if (locations[i]) {
							if (!filteredLocations[counter]) {
								filteredLocations[counter] = [];
							}
							filteredLocations[counter].push(locations[i]);
						}
					}
				}
			}
			// IDK how but empty values are pushing so... filtered it
			const filtered = filteredLocations.filter((val) => val);
			this.filteredLocations = filtered;
		},
		mapShow(event) {
			if (event.latitude) {
				this.latitude = event.latitude;
			}
			if (event.longitude) {
				this.longitude = event.longitude;
			}
			this.mapCity = event.name;
			this.mapAddress = event.address;
			this.map_model = true;
		},
		mapClose() {
			this.map_model = false;
		},
		venueExpand(option) {
			if (this.selected_options.includes(option)) {
				this.selected_options = this.selected_options.filter((item) => item !== option);
			} else {
				this.selected_options.push(option);
			}
		},
	},
};
</script>
<style>
.close {
	background: #ddd8d8;
	width: 40px;
	height: 40px;
	border-radius: 50%;
	text-align: center;
}
.modal-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.mobile-arrow {
	display: none;
}
@media only screen and (max-width: 768px) {
	.mobile-arrow {
		display: block;
	}
	.mapboxgl-canvas {
		width: 100%;
	}
	#mapWeb {
		width: 100%;
		height: 80vh;
	}
	#myModalPickLocation .modal-content {
		width: 95%;
		height: 95vh;
	}
	#myModalPickLocation {
		padding-top: 13px;
	}
	#mapWeb {
		height: 80vh !important;
	}
}
.alert-warning {
	color: #856404;
	background-color: #fff3cd;
	border-color: #ffeeba;
}
.border-rad20 {
	border-radius: 20px;
	overflow: hidden;
}
</style>
