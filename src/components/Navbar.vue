<template>
  <div>
    <b-navbar type="light" variant="lightd">

      <button
              id="sidebarCollapse"
              class="d-block d-md-none btn "
              @click="sidebar.expanded = !sidebar.expanded"
              style="border-color:rgba(0,0,0,.1)"
              type="button"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    </b-navbar>

    <!-- Dark Overlay element -->
    <div
            class="overlay"
            :class="{ active: sidebar.expanded }"
            @click="sidebar.expanded = false"
    ></div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
      };
    },
    props: {
      sidebar: {
        expanded: Boolean
      }
    },
  };
</script>
