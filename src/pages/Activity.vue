<template>
  <Layout>
    <div class="timeline">
      <h2>Activity</h2>
      <div class="outline">
        <template v-for="item in $static.metadata.activityItems" >
          <div class="date"><span style="font-size:14px">{{item.timestamp | moment("D MMM")}}</span></div>
          <div class="category"><span style="font-size:11px">{{item.category}}</span></div>
          <div class="entry">
            <img :src="`https://res.cloudinary.com/ximg/image/upload/h_22,w_22/v1/favicon/${item.integration}.png`">
            <div v-html="item.html"></div>
          </div>
          <div style="margin-left:20px;color:#c7c7c7;margin-top:-00px;margin-bottom:-20px">...</div>
        </template>
      </div>
    </div>
  </Layout>
</template>

<static-query>
  query WhoAmI{
    metadata {
      activityItems
      {
        category
        integration
        html
        timestamp
      }
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
        title: 'Activity'
      }
    }
  }
</script>
<style lang="scss">
  .timeline {
    color: #252422;

    .outline{
      margin-left:100px;
      border-left:1px solid rgba(247, 160, 70, 0.38);
      padding:20px;
      position:relative;

      .date{
        position:absolute;
        left:-90px;
        color:gray;
      }
      .category{
        position:relative;

        left:-45px;
        text-align:center;
        width:50px;
        top:62px;
        z-index:99;
        background-color:white;
        font-size:14px;
        color: #aaaaaa;
      }
      .entry{
        padding:18px;
        color:gray;
        font-size:14px;
        text-align:left;
        img{
          position:absolute;
          left:-11px;
          background-color:white;
        }
      }
    }
  }
</style>
