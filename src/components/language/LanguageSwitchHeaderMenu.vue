<template>
	<div class="menu-language">
		<div class="menu-language-switch">
			<!-- <label for="language-select">{{ $t('global.language') }}</label> -->
			<select v-model="language" @change="onChange" class="select-menu-lang">
				<option v-for="(language, i) in languages" :key="`language-${i}`" :value="language.value">
					{{ language.value }}
				</option>
			</select>
		</div>
	</div>
</template>

<script lang="ts">
import { languageOptions } from '@/i18n';
import Vue from 'vue';
import { mapGetters } from 'vuex';
import i18n from '@/i18n';

export default Vue.extend({
	name: 'LanguageSwitch',
	data: () => ({
		language: '',
		languages: languageOptions,
	}),

	async mounted() {
		if (this.$store.state.Customerbooking.language == null) {
			// @ts-ignore
			this.language = this.$i18n.locale;
			// alert(this.$i18n.locale);
		} else {
			this.language = this.$store.state.Customerbooking.language;
			// await this.$store.commit('setSelectedLanguage', this.language);
		}
		this.$store.dispatch('updatePlayerLanguage', this.language);
	},
	computed: {
		...mapGetters(['getSelectedLanguage']),
	},
	watch: {
		getSelectedLanguage: {
			handler: async function (after, before) {
				this.$i18n.locale = after;
			},
		},
	},
	methods: {
		async onChange() {
			await this.$store.commit('setSelectedLanguage', this.language);
			await this.$store.dispatch('updatePlayerLanguage', this.language);
		},
	},
});
</script>
<style scoped>
.menu-language-switch {
	display: inherit;
	padding: 0;
	width: 53px;
}
.select-menu-lang {
	display: inherit;
	padding: 0 6px;
}
.menu-language select {
	background-color: transparent;
	background-image: url('~@/assets/images/dropdown-down.svg');
	border: none;
	color: #ffffff;
	margin-top: 3px;
}
.menu-language select:focus {
	box-shadow: none;
}
.menu-language select option {
	color: #000000;
}
</style>
