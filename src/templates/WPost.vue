<template>
  <PostLayout>
    <div class="post">


        <div v-html="$page.wPost.content"></div>
      <time class="time" :datetime="$page.wPost.publishDate">Published {{
        $page.wPost.publishDate | moment("D MMMM YYYY")
        }}</time>

      <div style="font-size:80%;font-family:arial,sans-serif">
        <div v-for="syndication in $page.wPost.syndication" v-if="syndication.url">

          <span v-if="syndication.likes">{{syndication.likes}} Likes<br></span>
          <a rel="nofollow" :href="syndication.url">Follow the conversation at {{syndication.displayName}}</a>
        </div>
      </div>
    </div>
  </PostLayout>
</template>

<page-query>
query WPost($id: ID!) {
  wPost(id: $id) {
    title
    content
    coverImage
    excerpt
    publishDate
    syndication {
      name
      displayName
      url
      commentsCount
      likes
    }
  }
}

</page-query>
<static-query>
  query WhoAmI{
    metadata {
      image
    }
  }
</static-query>
<script>
  import Pagination from '@/components/Pagination'
  import hljs from "highlight.js/lib/highlight.js";
  import javascript from "highlight.js/lib/languages/javascript";
  import python from "highlight.js/lib/languages/python";
  import css from "highlight.js/lib/languages/css";
  import "highlight.js/styles/darcula.css";
  import $ from "jquery";
  import _ from "lodash";
  hljs.registerLanguage("javascript", javascript);
  hljs.registerLanguage("python", python);
  hljs.registerLanguage("css", css);

  function doubleRaf (callback) {
    requestAnimationFrame(() => {
      requestAnimationFrame(callback)
    })
  }


  export default {
    components: {
      Pagination,
    },
    methods: {
      messageListener(e) {
        var data = e.data;
        if (data.context !== "iframe.resize") {
          return false;
        }
        let src = data.src.replace("&interactive=0", "");
        let iframe = $(`iframe[src="${src}"]`)[0];
        if (!iframe) {
          return false;
        }

        if (data.height) {
          iframe.style.height = data.height + "px";
        }
      },
      resizeListener:  _.debounce(
              function() {
                $('iframe').removeAttr('style');
              },
              400,
              { leading: false, trailing: true }
      ),
      setupCallbacks(){
        this.$nextTick(()=>{
          window.addEventListener("message", this.messageListener);
          window.addEventListener("resize", this.resizeListener);
          doubleRaf( ()=>{
            document.querySelectorAll("pre code").forEach(block => {
              hljs.highlightBlock(block);
            });
          });
        })
      }
    },
    mounted() {
      this.setupCallbacks()
    },
    beforeDestroy() {
      window.removeEventListener("message", this.messageListener);
      window.removeEventListener("resize", this.resizeListener);
    },
    metaInfo() {
      let coverImage = this.$page.wPost.coverImage;
      let cardType = 'summary';
      if (coverImage){
        cardType = 'summary_large_image'
      }
      else{
        coverImage = this.$static.metadata.image;
      }
      return {
        title: this.$page.wPost.title,
        meta: [
          {name: 'twitter:card', content: cardType},
          {name: 'twitter:title', content: this.$page.wPost.title},
          {name: 'twitter:description', content: this.$page.wPost.excerpt},
          // image must be an absolute path
          {name: 'twitter:image', content: coverImage},
          // Facebook OpenGraph
          {property: 'og:title', content: this.$page.wPost.title},
          {property: 'og:type', content: 'website'},
          {property: 'og:image', content:  coverImage},
          {property: 'og:description', content: this.$page.wPost.excerpt}

        ]
      }
    }
  }
</script>

<style lang="scss">
  .post {
    $color-black: #282828;
    $color-white: #dddddd;

    input::placeholder {
      color: lightgray;
    }

    time {
      color: #a6a6a6;
      padding: 16px 0 16px 0;
      display: block;
      font-size: 14px;
      font-style: italic;
      font-family: Helvetica, Arial, "sans-serif";
    }

    font-family: Georgia, Cambria, "Times New Roman", Times, serif;
    font-weight: 400;
    font-style: normal;
    font-size: 19.2px;
    line-height: 1.6em;
    letter-spacing: 0.2px;
    color: #343f44;

    a {
      text-decoration: underline;
      color: #252422;
    }

    a:hover {
      color: #252422;
    }

    li {
      p {
        margin-bottom: 0.5rem;
      }
    }

    h1,
    h2,
    h3,
    h4,
    h5 {
      font-family: helvetica, arial, sans-serif;
      font-weight: 700;
      margin-top: 3rem;
      margin-bottom: 1.2rem;
    }

    pre {
      margin-top: 2.2rem;
      margin-bottom: 2.2rem;
    }

    figure {
      padding: 20px 0 20px 0;
      margin: 0
    }

    blockquote {
      border-left: 2.5px solid #40b4f5;
      padding-left: 25px;
      font-style: italic;
    }

    @media (min-width: 992px) {
      $width-left-breakout: 500px;
      $margin-left-breakout: 150px;
      .embed-float-left-breakout {
        float: left;
        width: $width-left-breakout;
        clear: both;
        margin-left: -$margin-left-breakout;
        margin-right: 30px;
      }
    }

    $width-full: 100vw;

    .embed-wide {
      left: 50%;
      margin-left: -$width-full/2;
      position: relative;
      right: 50%;
      width: $width-full;
    }

    @media (min-width: 992px) {
      $width-wide: 960px;
      .embed-wide {
        left: 50%;
        margin-left: -$width-wide + $width-wide/2 + 20px;
        position: relative;
        right: 50%;
        width: $width-wide;
      }
    }

    .embed-full {
      left: 50%;
      margin-left: calc(-100vw / 2 + 0px);
      position: relative;
      right: 50%;
      width: $width-full;
    }

    @media (min-width: 992px) {
      .embed-full {
        margin-left: calc(-100vw / 2 + 20px);
      }
    }

    .embed-float-left-breakout,
    .embed-regular {
      iframe {
        height: calc(100vw * 0.5625 - 20px);
        width: 100%;
      }
    }

    .embed-wide {
      iframe {
        height: calc(100vw * 0.5625);
        width: 100%;
      }
    }

    .embed-full {
      iframe {
        height: calc(100vw * 0.5625);
        width: 100%;
      }
    }

    @media (min-width: 576px) {
      .embed-float-left-breakout,
      .embed-regular {
        iframe {
          height: calc(500px * 0.5625);
        }
      }
      .embed-wide {
        iframe {
          height: calc(100vw * 0.5625);
        }
      }
      .embed-full {
        iframe {
          height: calc(100vw * 0.5625);
        }
      }
    }
    @media (min-width: 992px) {
      .embed-float-left-breakout {
        iframe {
          height: calc(500px * 0.5625);
        }
      }
      .embed-regular {
        iframe {
          height: calc(604px * 0.5625);
        }
      }
      .embed-wide {
        iframe {
          height: calc(960px * 0.5625);
        }
      }
      .embed-full {
        iframe {
          height: calc(100vw * 0.5625);
        }
      }
    }
    @media (min-width: 1200px) {
      .embed-regular {
        iframe {
          height: calc(732px * 0.5625);
        }
      }
      .embed-wide {
        iframe {
          height: calc(960px * 0.5625);
        }
      }
      .embed-full {
        iframe {
          height: calc(100vw * 0.5625);
        }
      }
    }

    .whoami-embed {
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

      figcaption {
        margin-top: 2px;
        font-family: helvetica, arial, sans-serif;
        font-size: 16px;
        color: #999999;
      }
    }

    img {
      max-width: 100%;
    }

    pre code {
      display: block;
      color: #c5c8c6 !important;
      font-family: Menlo, Monaco, Consolas, monospace;
      font-size: 92%;
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

    @media (max-width: 992px) {
      aside {
        font-family: helvetica, arial, sans-serif;
        outline: none;
        font-size: 15px;
        border-top: 1px solid gray;
        border-bottom: 1px solid gray;
        color: gray;

        p {
          margin: 0;
        }

        margin-bottom: 10px;
      }
    }
    @media (min-width: 992px) {
      aside {
        font-family: helvetica, arial, sans-serif;
        outline: none;
        float: right;
        clear: right;

        margin: auto;
        margin-right: -220px;
        width: 200px;
        margin-top: -3rem;
        line-height: 1.3;
        vertical-align: baseline;
        position: relative;
        font-size: 15px;
        padding-left: 5px;
        color: #999999;

        p {
          margin: 0;
        }
      }

      .embed-wide + aside {
        margin-right: -332px;
      }
    }
    @media (min-width: 1300px) {
      aside {
        margin-right: -280px;
        width: 260px;
      }
      .embed-wide + aside {
        margin-right: -362px;
      }
    }

    .embed-full + aside,
    .embed-float-left-breakout + aside {
      font-family: helvetica, arial, sans-serif;
      outline: none;
      float: none;
      font-size: 15px;
      width:auto;
      margin:auto;
      border-top: 1px solid gray;
      border-bottom: 1px solid gray;
      color: gray;
      position: initial;

      p {
        margin: 0;
      }

      margin-bottom: 10px;
    }
    #sidebar-helper {
      display: none;
      position: absolute;
      top: 10px;
      border-top: 1px solid gray;
      border-bottom: 1px solid gray;
      height: 20px;
      width: 12px;
      right: -12px;

      div {
        width: 50%;
        border-right: 1px solid gray;
        height: 100%;
      }
    }
  }
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

