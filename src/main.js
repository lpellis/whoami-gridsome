// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from "~/layouts/Default.vue";
import PostLayout from "~/layouts/PostLayout.vue";
import Sidebar from '~/components/Sidebar.vue'
import Navbar from '~/components/Navbar.vue'
import NavbarPost from '~/components/NavbarPost.vue'
import BootstrapVue from "bootstrap-vue";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "./assets/css/main.css";
export default function(Vue, { router, head, isClient }) {
  // Set default layout as a global component
  Vue.use(require('vue-moment'));
  Vue.component("Layout", DefaultLayout);
  Vue.component("PostLayout", PostLayout);
  Vue.component('Sidebar', Sidebar)
  Vue.component('Navbar', Navbar)
  Vue.component('NavbarPost', NavbarPost)
  Vue.use(BootstrapVue);
}
