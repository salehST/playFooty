<template>
	<div>
		<div id="map" class="basemap"></div>
	</div>
</template>
<script>
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
export default {
	data() {
		return {
			latitude: '23.0225',
			longitude: '72.5714',
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
				container: 'map',
				style: 'mapbox://styles/mapbox/streets-v11',
				center: this.mapboxCenter,
				zoom: 13,
			});
		},
		handleAddMapControls() {
			// add controls to zoom in & out
			this.map.addControl(new mapboxgl.NavigationControl());
			// add fullscreen option
			this.map.addControl(new mapboxgl.FullscreenControl());
		},
		handleMapMarker() {
			this.marker = this.marker.setLngLat(this.mapboxCoordinates).addTo(this.map);
		},
	},
};
</script>
<style lang="scss" scoped>
.basemap {
	width: 1000px;
	height: 300px;
}
</style>
<style>
.mapboxgl-ctrl-logo {
	display: none !important;
}
</style>
