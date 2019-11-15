<template>
  <Layout>
    <div class="page">
        <div v-html="$page.wPage.content"></div>
    </div>
  </Layout>
</template>

<page-query>
query WPage($id: ID!) {
  wPage(id: $id) {
    title
    content
    publishDate
  }
}

</page-query>
<script>
  import Pagination from '@/components/Pagination'
  import hljs from "highlight.js/lib/highlight.js";
  import javascript from "highlight.js/lib/languages/javascript";
  import python from "highlight.js/lib/languages/python";
  import css from "highlight.js/lib/languages/css";
  import "highlight.js/styles/darcula.css";
  import $ from "jquery";
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
      setupCallbacks(){
        this.$nextTick(()=>{
          window.addEventListener("message", this.resizeListener);
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
    metaInfo() {
      return {
        title: this.$page.wPage.title
      }
    }
  }
</script>

<style lang="scss">

</style>

