<template>
  <Layout>
    <div  class="posts">
    <h1>{{ $page.wTag.title }}</h1>
    <div  v-for="edge in $page.wTag.belongsTo.edges" :key="edge.node.id" class="post-entry">
      <div style="line-height:1.825rem">
        <time class="" :datetime="edge.node.createdDate">{{ edge.node.createdDate | moment("D MMMM YYYY") }}</time>
        <span style="margin:0 .3125rem"> </span>
        <span v-for="tag in edge.node.tags">
          &nbsp;<g-link class="tags" :to="tag.path">{{tag.title}}</g-link></span>
      </div>
      <router-link :to="edge.node.path" v-if="edge.node.coverImage"><img :src="edge.node.coverImage"></router-link>
      <h2 v-if="edge.node.title"><g-link :to="edge.node.path">{{edge.node.title}}</g-link></h2>
      {{edge.node.excerpt}}<p></p>
      <router-link :to="edge.node.path">Read</router-link>
    </div>

    <pagination :base="`${$page.wTag.path}`" :info="$page.wTag.belongsTo.pageInfo" v-if="$page.wTag.belongsTo.pageInfo.totalPages > 1" />
    </div>
  </Layout>
</template>

<page-query>
query WTag($id: ID!, $page: Int) {
  wTag(id: $id) {
    title
    path
    belongsTo(page: $page, perPage: 5, sortBy: "createdDate") @paginate {
      totalCount
      pageInfo {
        totalPages
        currentPage
      }
      edges {
        node {
          ... on WPost {
            id
            title
            coverImage
            excerpt
            createdDate
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
  }
}

</page-query>
<script>
  import Pagination from '@/components/Pagination'

  export default {
    components: {
      Pagination,
    },
    metaInfo() {
      return {
        title: `${this.$page.wTag.title} Posts`
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
