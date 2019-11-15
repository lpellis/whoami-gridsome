<template>
  <div
    class=" d-md-block col-md-3"
    id="sidebar"
    :class="{
      active: sidebar.expanded,
      'sidebar-overlay': sidebar.expanded,
      'd-none': !sidebar.expanded
    }"
  >
    <div
      id="dismiss"
      class="d-block d-md-none"
      @click="sidebar.expanded = false"
    >
      <i class="fa fa-times"></i>
    </div>
    <g-link
      :to="'/'"
      active-class=""
      exact-active-class=""
    >
      <img
        :src="$static.metadata.image"
        width="75"
        height="75"
      />
    </g-link>
    <h4 style="margin:0.82rem 0;margin-top:1.2rem;font-size:1.125rem;line-height:1.83rem">{{ $static.metadata.name }}</h4>
    <p
      style="color: #888;    line-height: 1.625rem;    margin-bottom: 1.625rem;"
    >
      {{ $static.metadata.about }}
    </p>
    <ul class="nav flex-column">
      <li
              v-for="menu_item in $static.metadata.menuItems"
              class="nav-item"
              v-bind:key="menu_item.url"
              v-if="menu_item.name"
      >
        <template v-if="menu_item.url === ''"><span class="nav-link" style="color:gray">{{menu_item.name}}</span></template>
        <template v-else>
        <g-link class="nav-link" :to="menu_item.url" v-if="menu_item.url.startsWith('/')"
        >{{menu_item.name}}</g-link
        ><a class="nav-link" v-else :href="menu_item.url" >{{menu_item.name}}</a>
        </template>
        <ul class="nav flex-column" v-if="menu_item.nested">
          <li
                  v-for="nested_menu_item in menu_item.nested"
                  class="nav-item"
                  v-bind:key="nested_menu_item.slug"
                  v-if="nested_menu_item.name"
          >
            <g-link class="nav-link nav-link-nested" :to="nested_menu_item.url" v-if="nested_menu_item.url.startsWith('/')"
            >{{nested_menu_item.name}}</g-link
            ><a class="nav-link nav-link-nested" v-else :href="nested_menu_item.url" >{{nested_menu_item.name}}</a>
          </li>
        </ul>
      </li>
    </ul>
    <ul class="social">
      <li v-for="item in $static.metadata.socialMenuItems" v-bind:key="item.url">
        <a :title="item.name" :href="item.url"><i :class="`fab fa-${item.icon}`"></i></a>
      </li>
    </ul>
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
  name: "Sidebar",
  data() {
    return {
      image_base: process.env.VUE_APP_IMAGE_BASE,
      loaded: false,
      profile: { avatar: "avatar/SAz3cOu0HHkM0iOv" },
      avatar: { uploading: false }
    };
  },
  props: {
    sidebar: {
      expanded: Boolean
    }
  },
  methods: {},
  computed: {
    integrations() {
      return [];
    },
    blog() {
      return {};
    },
    menu_items() {
      return [];
    }
  },
  watch: {
    $route(to, from) {
      this.sidebar.expanded = false;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  #sidebar {
    a.router-link-exact-active, a.active--exact {
      position:relative;
    }
    .social i{
      color:#5A6268;
      font-size:1.22rem;
      &:hover{
        color:#5d93ff
      }
    }
    a.router-link-exact-active::before, a.active--exact::before {
      content: '';
      position:absolute;
      display:block;
      top:0;
      left:-12px;
      padding:12px;
      right: -5px;
      border-left: 2px solid #f7a046;
    }
    .nav-item{
      margin:0.3rem;
    }
    .nav-link {
      padding: 0;
      margin: 0;
    }
    .nav-link-nested {
      padding: 0;
      /*padding-left: 8px;*/
      margin: 0.0rem;
      margin-left:8px;
    }
  }
  #dismiss {
    width: 35px;
    height: 35px;
    position: absolute;
    /* top right corner of the sidebar */
    top: 10px;
    right: 0;
  }

  ul.social {
    padding-top: 20px;
    padding-left: 10px;
    font-size: 18px;
    max-width: 200px;
    display: flex;
    flex-flow: row wrap;
    align-content: flex-start;
    align-items: flex-start;
    /*justify-content: flex-start;*/
  }
  ul.social li {
    display: inline;
    list-style: none;
    width: 30px;
    align-self: flex-start;
    flex: 0 1 auto;
  }
</style>
