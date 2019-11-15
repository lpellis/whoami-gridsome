<template>
  <div>

      <Navbar :sidebar="sidebar"></Navbar>

    <!-- Page Content -->
    <div class="container container-page">
      <div class="row">
        <Sidebar :sidebar="sidebar"></Sidebar>

        <div class="col-md-9">
          <div class="row">
            <div class="main-row">
              <slot/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<script>
  export default {
    data() {
      return {
        sidebar: { expanded: false }
      };
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
    }
  };
</script>
<style lang="scss">
  @import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.9.0/css/all.css");

  html {
    height: 100%;
  }
  img {
      max-width: 100%;
  }
  .page {
    pre code {
      display: block;
      color: #c5c8c6 !important;
      font-family: Menlo, Monaco, Consolas, monospace;
      line-height: 1.5;
      border: 1px solid #ccc;
      overflow-x: auto;
      padding: 0.5em !important;
      background: #2b2b2b !important;
    }

    p code {
      padding: 0 0.2rem;
      border-radius: 3px;
      background: rgba(0, 0, 0, 0.1);
      color: rgba(0, 0, 0, 0.8);
      font-family: Monaco, "Courier New", Courier, monospace;
    }
    a{
      text-decoration:underline;
      color:#252422;
    }
    a:hover{
      color:#252422;
    }

    img {
      max-width: 100%;
    }
    pre {
      margin-top: 2.2rem;
      margin-bottom: 2.2rem;
    }
    figure {
      padding:20px 0 20px 0;
      margin:0
    }

    blockquote {
      border-left: 2.5px solid #40b4f5;
      padding-left: 25px;
      font-style: italic;
    }
    .embed-regular{
      iframe{
        width: 100%;
        height: calc(732px * 0.5625);
      }
    }
    .whoami-embed {
      padding:2px;
      font-family: helvetica, arial, sans-serif;
      text-align: center;
      position: relative;
      font-size: 90%;
      white-space: normal; /* Needed for Edge */
      color: gray;

      &.expanded {
        .iframe-overlay {
          height: calc(100% - 28px);
        }
      }

      figcaption{
        margin-top:2px;
        font-family: helvetica, arial, sans-serif;
        font-size:16px;
        color:#999999;
      }
    }
  }
</style>
