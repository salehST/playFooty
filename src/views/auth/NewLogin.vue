<template>
	<BookingLayout :step="step" :page-title="pageTitle">
		<div class="content-text mb-85" style="background: #ffffff; padding: 10px"></div>
	</BookingLayout>
</template>
<script>
import BookingLayout from '@/layouts/booking/BookingLayout.vue';

export default {
	components: {
		BookingLayout,
	},
	data() {
		return {
			step: 3,
			pageTitle: this.$t('booking.log_in'),
		};
	},
};
</script>
<style></style>
