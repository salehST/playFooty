<template>
	<div>
		<div
			:id="idname"
			class="basemap"
			:style="size == 'small' ? 'height:150px;' : 'height:600px;'"
		></div>
	</div>
</template>
<script>
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
export default {
	props: {
		lat: Number,
		long: Number,
		size: String,
		idname: String,
	},

	data() {
		return {
			// latitude: '23.0225',
			// longitude: '72.5714',
			latitude: this.lat,
			longitude: this.long,
			marker: new mapboxgl.Marker({
				color: '#e99648',
				draggable: false,
			}),
			map: {},
			mapboxCoordinates: [0, 0],
			mapboxCenter: [0, 0],
			accessToken:
				'pk.eyJ1Ijoicml0ZXNodGFibGV0MiIsImEiOiJja20xaWpva2UwMTRkMnBvMDYxNnE0OWhnIn0.OMNnmvMjJEsVIwNrvYSAgg',
		};
	},
	async mounted() {
		this.mapboxCoordinates = [this.longitude, this.latitude];
		this.mapboxCenter = [this.longitude, this.latitude];
		await this.handleCreateMap();
		await this.handleAddMapControls();
		await this.handleMapMarker();
	},
	methods: {
		handleCreateMap() {
			this.map = {};
			mapboxgl.accessToken = this.accessToken;
			this.map = new mapboxgl.Map({
				attributionControl: false,
				container: `${this.idname}`,
				style: 'mapbox://styles/mapbox/streets-v11',
				center: this.mapboxCenter,
				zoom: this.size == 'small' ? 10 : 13,
			});
		},
		handleAddMapControls() {
			if (this.size == 'small') {
				this.map.scrollZoom.disable();
			} else {
				// add controls to zoom in & out
				this.map.addControl(new mapboxgl.NavigationControl());
				// add fullscreen option
				this.map.addControl(new mapboxgl.FullscreenControl());
			}
		},
		handleMapMarker() {
			this.marker = this.marker.setLngLat(this.mapboxCoordinates).addTo(this.map);
		},
	},
	watch: {
		lat: async function (newval) {
			this.latitude = newval;
		},
		long: async function (newval) {
			this.longitude = newval;
		},
	},
};
</script>
<style>
.mapboxgl-ctrl-logo {
	display: none !important;
}
</style>
