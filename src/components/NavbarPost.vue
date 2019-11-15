<template>
  <div>
    <b-navbar type="light" variant="lightd">

      <b-navbar-brand :to="'/'">
        <img
                :src="$static.metadata.image"
                width="30"
                height="30"
        />
        {{$static.metadata.name}}</b-navbar-brand
      >
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-navbar-nav class="ml-auto">
        <b-nav-item  class="nav-item-social" :title="item.name" :href="item.url"  v-for="item in $static.metadata.socialMenuItems" v-bind:key="item.url"> <i :class="`fab fa-${item.icon}`"></i> &nbsp;</b-nav-item>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>
<static-query>
  query WhoAmI{
    metadata {
      name
      about
      image
      menuItems
      {
        name
        url
        nested{
          name
          url
        }
      }
      socialMenuItems{
        url
        icon
        name
      }
    }
  }
</static-query>
<script>
  export default {
    data() {
      return {
      };
    },
  };
</script>
<style lang="scss">
  .nav-item-social i{
    font-size:1.3rem;
  }
</style>
