<template>
  <Layout>
    <div  class="posts">
      <div  v-for="edge in $page.post.edges" :key="edge.node.id" class="post-entry">
        <div style="line-height:1.825rem">
          <time class="" :datetime="edge.node.publishDate">{{ edge.node.publishDate | moment("D MMMM YYYY")  }}</time><span style="margin:0 .3125rem"> </span>
          <span v-for="tag in edge.node.tags">
          &nbsp; <g-link class="tags" :to="tag.path">{{tag.title}}</g-link></span>
        </div>
        <g-link :to="edge.node.path" v-if="edge.node.coverImage"><img :src="edge.node.coverImage"></g-link>
        <h2 v-if="edge.node.title"><g-link :to="edge.node.path">{{edge.node.title}}</g-link></h2>
        {{edge.node.excerpt}}<p></p>
        <g-link :to="edge.node.path">Read</g-link>
      </div>
      <pagination :root="'/'" :base="'/posts'" :info="$page.post.pageInfo" v-if="$page.post.pageInfo.totalPages > 1" />

    </div>
  </Layout>
</template>

<page-query>
  query WPage($page: Int){
    post: allWPost(page: $page, perPage:5, sortBy: "publishDate") @paginate {
      totalCount
      pageInfo {
        totalPages
        currentPage
      }
      edges{
        node{
          id
          title
          coverImage
          excerpt
          publishDate
          path
          tags {
            slug
            title
            path
          }
        }
      }
    }
  }
</page-query>
<static-query>
  query WhoAmI{
    metadata {
      name
    }
  }
</static-query>
<script>
  import Pagination from '@/components/Pagination'

  export default {
    components: {
      Pagination,
    },
    metaInfo() {
      return {
        title: this.$static.metadata.name
      }
    }
  }
</script>
<style lang="scss">
  .posts{
    img {
      max-height:550px;
      max-width:100%;
    }
    h2{
      line-height: 2.4375rem;
      margin-bottom:.8125rem;
      a{
        text-decoration:none;
        color:#252422;
      }
      a:hover{
        text-decoration:underline;
      }
    }
    time{
      color:gray;
      text-transform: uppercase;
      font-weight: 600;
    }
    .post-entry{
      margin-bottom: 2.03125rem;
    }
    .tags{
      color: #f7a046;
      font-weight: 600;
    }
  }
</style>
