<template>
	<div class="mb-20">
		<h1 :class="mobile ? 'p-8' : 'p-15'" class="mt-20 mb-20">
			<svg
				width="20"
				height="20"
				viewBox="0 0 20 20"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<circle cx="10" cy="10" r="10" fill="#193860" />
				<path
					d="M9.65935 14V8.68C9.65935 8.43733 9.65935 8.19 9.65935 7.938C9.66868 7.67667 9.67335 7.41067 9.67335 7.14C9.36535 7.42 9.02468 7.66733 8.65135 7.882C8.27802 8.08733 7.88602 8.22733 7.47535 8.302L7.25135 6.314C7.49402 6.29533 7.75068 6.23467 8.02135 6.132C8.30135 6.02933 8.57668 5.90333 8.84735 5.754C9.11802 5.60467 9.36068 5.446 9.57535 5.278C9.79002 5.10067 9.95335 4.928 10.0654 4.76H11.9834V14H9.65935Z"
					fill="white"
				/>
			</svg>
			{{ $t('booking.field_size') }}
			<svg
				width="18"
				height="18"
				viewBox="0 0 18 18"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M9.00008 13.1667C9.23619 13.1667 9.43425 13.0867 9.59425 12.9267C9.75369 12.7672 9.83341 12.5694 9.83341 12.3333V8.97917C9.83341 8.74306 9.75369 8.54862 9.59425 8.39584C9.43425 8.24306 9.23619 8.16667 9.00008 8.16667C8.76397 8.16667 8.56619 8.24639 8.40675 8.40584C8.24675 8.56584 8.16675 8.76389 8.16675 9V12.3542C8.16675 12.5903 8.24675 12.7847 8.40675 12.9375C8.56619 13.0903 8.76397 13.1667 9.00008 13.1667ZM9.00008 6.5C9.23619 6.5 9.43425 6.42 9.59425 6.26C9.75369 6.10056 9.83341 5.90278 9.83341 5.66667C9.83341 5.43056 9.75369 5.23251 9.59425 5.0725C9.43425 4.91306 9.23619 4.83334 9.00008 4.83334C8.76397 4.83334 8.56619 4.91306 8.40675 5.0725C8.24675 5.23251 8.16675 5.43056 8.16675 5.66667C8.16675 5.90278 8.24675 6.10056 8.40675 6.26C8.56619 6.42 8.76397 6.5 9.00008 6.5ZM9.00008 17.3333C7.8473 17.3333 6.76397 17.1144 5.75008 16.6767C4.73619 16.2394 3.85425 15.6458 3.10425 14.8958C2.35425 14.1458 1.76064 13.2639 1.32341 12.25C0.885637 11.2361 0.666748 10.1528 0.666748 9C0.666748 7.84723 0.885637 6.76389 1.32341 5.75001C1.76064 4.73612 2.35425 3.85417 3.10425 3.10417C3.85425 2.35417 4.73619 1.76028 5.75008 1.3225C6.76397 0.885283 7.8473 0.666672 9.00008 0.666672C10.1529 0.666672 11.2362 0.885283 12.2501 1.3225C13.264 1.76028 14.1459 2.35417 14.8959 3.10417C15.6459 3.85417 16.2395 4.73612 16.6767 5.75001C17.1145 6.76389 17.3334 7.84723 17.3334 9C17.3334 10.1528 17.1145 11.2361 16.6767 12.25C16.2395 13.2639 15.6459 14.1458 14.8959 14.8958C14.1459 15.6458 13.264 16.2394 12.2501 16.6767C11.2362 17.1144 10.1529 17.3333 9.00008 17.3333ZM9.00008 15.6667C10.8473 15.6667 12.4204 15.0175 13.7192 13.7192C15.0176 12.4203 15.6667 10.8472 15.6667 9C15.6667 7.15278 15.0176 5.57973 13.7192 4.28084C12.4204 2.98251 10.8473 2.33334 9.00008 2.33334C7.15286 2.33334 5.58008 2.98251 4.28175 4.28084C2.98286 5.57973 2.33341 7.15278 2.33341 9C2.33341 10.8472 2.98286 12.4203 4.28175 13.7192C5.58008 15.0175 7.15286 15.6667 9.00008 15.6667Z"
					fill="#193860"
				/>
			</svg>
		</h1>
		<div :class="mobile ? 'p-8' : 'p-15'" class="d-flex">
			<div
				v-for="(pitch, index) in pitches"
				:key="pitch.id"
				class="text-center mr-15"
				@click="selectPitch(pitch, index)"
			>
				<h1 class="fw-100">{{ pitch.type }}</h1>
				<img
					v-show="darkImageShowIndex == index"
					style="cursor: pointer"
					src="@/assets/images/Field-21.png"
					class="mr-1"
				/>
				<img
					v-show="!(darkImageShowIndex == index)"
					src="@/assets/images/Field-11.png"
					class="mr-1"
					style="cursor: pointer"
				/>
				<h1 class="pitch-card">
					{{ $t('booking.from') }}
					<span class="">{{ location.currency }} {{ pitch.min_price }}/h</span>
				</h1>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	props: {
		pitches: [],
		location: [],
		mobile: Boolean,
		selectedPitch: [],
	},
	data() {
		return {
			darkImageShowIndex: null,
		};
	},
	watch: {
		pitches(val) {
			if (val.length > 0) {
				var pitch_type = '';
				var count = 0;
				if (this.$store.state.Customerbooking.selectedBooking != null) {
					if (this.$store.state.Customerbooking.editBooking != null) {
						pitch_type = this.$store.state.Customerbooking.editBooking.type;
						this.selectPitch(this.pitches[0], 0);
						this.$store.commit('setSelectedPitch', this.pitches[0]);
						var tempthis = this;
						this.pitches.map((item) => {
							console.log('inside pitch compare: ', item);
							if (item.type == pitch_type) {
								// alert('found pitch');
								tempthis.selectPitch(item, count);
								tempthis.$store.commit('setSelectedPitch', item);
							}
							count = count + 1;
						});
						// alert(pitch_type);
					} else if (this.$store.state.Customerbooking.selectedBooking.matches.length > 0) {
						pitch_type = this.$store.state.Customerbooking.selectedBooking.matches[0].pitch_type;
						this.selectPitch(this.pitches[0], 0);
						this.$store.commit('setSelectedPitch', this.pitches[0]);
						var tempthis = this;
						this.pitches.map((item) => {
							console.log('inside pitch compare: ', item);
							if (item.type == pitch_type) {
								// alert('found pitch');
								tempthis.selectPitch(item, count);
								tempthis.$store.commit('setSelectedPitch', item);
							}
							count = count + 1;
						});
						// alert(pitch_type);
					} else if (this.$store.state.Customerbooking.selectedBooking.matches2.length > 0) {
						pitch_type = this.$store.state.Customerbooking.selectedBooking.matches2[0].pitch_type;
						this.selectPitch(this.pitches[0], 0);
						this.$store.commit('setSelectedPitch', this.pitches[0]);
						// alert(pitch_type);
						var tempthis = this;
						this.pitches.map((item) => {
							console.log('inside pitch compare: ', item);
							if (item.type == pitch_type) {
								// alert('found pitch');
								tempthis.selectPitch(item, count);
								tempthis.$store.commit('setSelectedPitch', item);
							}
							count = count + 1;
						});
					} else {
						this.selectPitch(this.pitches[0], 0);
						this.$store.commit('setSelectedPitch', this.pitches[0]);
					}
				} else {
					// alert('inside else');
					this.selectPitch(this.pitches[0], 0);
					this.$store.commit('setSelectedPitch', this.pitches[0]);
				}
			}
		},
	},
	methods: {
		selectPitch(pitch, index) {
			this.darkImageShowIndex = index;
			this.$emit('selectedPitch', pitch);
		},
	},
	mounted() {
		// if (this.$store.state.Customerbooking.selectedBooking.matches.length > 0) {
		// 	var pitch_type = this.$store.state.Customerbooking.selectedBooking.matches[0].pitch_type;
		// 	var count = 0;
		// 	this.pitches.map((item) => {
		// 		if (item.pitch_type == pitch_type) {
		// 			this.selectPitch(item, count);
		// 			this.$store.commit('setSelectedPitch', item);
		// 		}
		// 		count = count + 1;
		// 	});
		// } else {
		// 	var pitch_type = this.$store.state.Customerbooking.selectedBooking.matches2[0].pitch_type;
		// 	var count = 0;
		// 	this.pitches.map((item) => {
		// 		if (item.pitch_type == pitch_type) {
		// 			this.selectPitch(item, count);
		// 			this.$store.commit('setSelectedPitch', item);
		// 		}
		// 		count = count + 1;
		// 	});
		// }
	},
};
</script>
