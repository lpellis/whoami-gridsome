<template>
  <div>
    <!-- Navigation -->
      <NavbarPost :sidebar="sidebar"></NavbarPost>

    <!-- Page Content -->
    <div class="container container-page">
      <div class="row justify-content-center justify-content-xl-center">
        <div class="col-md-10">
          <div class="row">
            <div class="router-view">
              <slot/>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Dark Overlay element -->
    <div
      class="overlay"
      :class="{ active: sidebar.expanded }"
      @click="sidebar.expanded = false"
    ></div>
    <!-- /.container -->
  </div>
</template>
<static-query>
  query {
  metadata {
    siteName
  }
  }
</static-query>
<style>
body,
html {
  height: 100%;
  max-width: 100%;
  overflow-x: hidden;
}
</style>
<script>

export default {
  data() {
    return {
      image_base: process.env.VUE_APP_IMAGE_BASE,

      message: "Saved",
      sidebar: { expanded: false }
    };
  },
  components:{

  },
  metaInfo() {
    return {
      link: [
        {
          rel: 'alternate', type: 'application/rss+xml', href: '/feed.xml',
          title: 'RSS Feed'
        }
      ]
    }
  },
  methods: {},
  computed: {
    blog() {
    //  return this.$store.state.settings.blog;
    }
  },
  mounted() {}
};
</script>
<style lang="scss">
.router-view {
  padding: 20px;
  padding-top: 10px;
  width: 100%;
}
@media (min-width: 992px) {
  .router-view {
    padding: 40px;
    padding-top: 10px;
    width: 95%;
  }
}
</style>
