<template>
  <Layout>
    <div class="project">
        <div v-html="$page.wProject.html"></div>
    </div>
  </Layout>
</template>

<page-query>
query WProject($id: ID!) {
  wProject(id: $id) {
    name
    html
  }
}

</page-query>
<script>
  import Pagination from '@/components/Pagination'
  import "@/assets/css/github-markdown.css";

  export default {
    components: {
      Pagination,
    },
    metaInfo() {
      return {
        title: this.$page.wProject.name
      }
    }
  }
</script>

<style lang="scss">
  .project{
    .description{
      color:gray;
      padding-bottom:15px;
    }
    .p-5{
      padding:0 !important;
    }
    .image-overlay {
      position:relative;
    }
    a{
      text-decoration:underline;
      color:#252422;
    }
    a:hover{
      color:#252422;
    }
    .image-overlay:after, .image-overlay:before {
      position:absolute;
      opacity:0;
      transition: all 0.5s;
    }
    .image-overlay:after {
      content:'\A';
      width:100%;
      height:100%;
      top:0; left:0;
      background:rgba(0,0,0,0.6);
    }
    .image-overlay:before {
      content: attr(data-content);
      width:100%;
      font-size:16px;
      color:#fff;
      z-index:1;
      top:45%;
      text-align:center;
      box-sizing:border-box;
    }
    .image-overlay:hover:after, .image-overlay:hover:before {
      opacity:1;
    }
  }
  .embed-regular{
    iframe{
      width: 100%;
      height: calc(732px * 0.5625);
    }
  }
  .myembed {
    font-family: helvetica, arial, sans-serif;
    figure {
      margin-bottom: 0px;
    }
    text-align: center;
    position: relative;
    padding: 0px;
    /*margin: 0px;*/
    margin-bottom: 16px;

    font-size: 90%;
    white-space: normal; /* Needed for Edge */
    color: gray;
    .empty_text {
      /*display:none;*/
    }
    .empty_text::before {
      content: "Type caption (optional)";
      color: #c3c3c3;
      height: 0;
      position: absolute;
      width: 100%;
      left: 0;
      pointer-events: none;
    }

    .uploading {
      position: absolute;
      left: 0;
      right: 0;
      top: 28px;
      pointer-events: none;
    }
    .iframe-overlay {
      position: absolute;
      top: 0px;
      left: 0;
      right: 0;
      width: 100%;
      height: 100%;
      bottom: 40px;
      z-index: 400;
      opacity: 0;
      overflow: hidden;
    }
    &.expanded {
      .iframe-overlay {
        height: calc(100% - 28px);
      }
    }
  }

  .output {
    font-family: Georgia, Cambria, "Times New Roman", Times, serif;
    font-weight: 400;
    font-style: normal;
    font-size: 19.2px;
    line-height: 1.6em;
    letter-spacing: 0.2px;
    color: #343f44;

    h1,
    h2,
    h3,
    h4,
    h5 {
      font-family: helvetica, arial, sans-serif;
      font-weight: 700;
    }

    blockquote {
      border-left: 2.5px solid #40b4f5;
      padding-left: 25px;
      font-style: italic;
    }
  }
</style>

