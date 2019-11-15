<template>
    <div>
        <g-link :to="previousPage(info.currentPage)" v-if="info.currentPage > 1" >
            <b-button variant="outline-primary" > ←  Previous </b-button>
        </g-link>
        <g-link :to="nextPage(info.currentPage,info.totalPages)" v-if="info.currentPage < info.totalPages" >
            <b-button variant="outline-primary" class="float-right"> Next → </b-button>
        </g-link>
    </div>
</template>

<script>
  export default {
    props: ['base','info', 'root'],
    methods: {
      previousPage(currentPage) {
        if (currentPage <= 2){
          return this.rootPath
        }
        return [0, 1].includes(currentPage - 1) ? `${this.basePath}/` : `${this.basePath}/${currentPage - 1}/`;
      },
      nextPage(currentPage, totalPages) {
        return totalPages > currentPage ? `${this.basePath}/${currentPage + 1}/` : `${this.basePath}/${currentPage}/`;
      }
    },
    computed: {
      basePath() {
        return this.base || ''
      },
      rootPath() {
        return this.root || this.basePath || ''
      }
    }
  }
</script>
