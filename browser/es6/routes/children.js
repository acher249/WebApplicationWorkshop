import {default as geometry} from "./pages/geometry.vue";
import {default as bigGeometry} from "./pages/bigGeometry.vue";

export default [{
    path: '/geometry',
    name: 'geometry',
    component: geometry,
    meta: { title: route => "Geometry View" },
    props: true
},
{
    path: '/bigGeometry',
    name: 'bigGeometry',
    component: bigGeometry,
    meta: { title: route => "Big Geometry View" },
    props: true
}];
