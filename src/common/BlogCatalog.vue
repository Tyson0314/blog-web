<template>
  <aside class="l_box blog-left">
    <div class="article-catalog catalog-custom">
      <h2 >文章目录</h2>
      <div class="catalog-list">
        <a
          class="list-item"
          :data-lev="item.lev"
          v-for="(item, index) in this.catalogs"
          :href="'#'+item.id"
          :key="index"
        >
          {{item.text}}
        </a>
      </div>
    </div>
  </aside>
</template>

<script>
export default {
  name: 'BlogCatalog',
  props: {
    catalogs: {}
  },
  mounted(){

  }
}
</script>
