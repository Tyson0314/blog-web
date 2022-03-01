<template>
  <div>
    <footer>
      <p><a href="https://github.com/Tyson0314/Java-learning" target="_blank">大彬的博客</a> <a href="https://beian.miit.gov.cn">粤ICP备2022005190号</a></p>
    </footer>
    <a href="javascript:;" @click="slideToTop" ref="cd_top" class="cd-top">Top</a>
  </div>
</template>

<script>
export default {
  name: 'CopyRight',
  mounted () {
    window.addEventListener('scroll', this.throttle(this.handleScroll, 200))
  },
  destroyed () {
    window.removeEventListener('scroll', this.throttle(this.handleScroll, 200))
  },
  methods: {
    slideToTop () {
      if (this.$refs.cd_top.style.opacity === '0') {
        return false
      }
      var timer = null
      timer = setInterval(() => {
        document.body.scrollTop -= 40
        document.documentElement.scrollTop -= 40
        if (document.body.scrollTop || document.documentElement.scrollTop === 0) {
          clearInterval(timer)
        }
      }, 20)
    },
    handleScroll () {
      if (document.documentElement.scrollTop > 70) {
        this.$refs.cd_top.style.opacity = '0.5'
        this.$refs.cd_top.style.cursor = 'pointer'
      } else {
        this.$refs.cd_top.style.opacity = '0'
        this.$refs.cd_top.style.cursor = 'default'
      }
    },
    throttle (func, delay) {
      let timer = null
      let startTime = Date.now()
      return function () {
        let curTime = Date.now()
        let remaining = delay - (curTime - startTime)
        const context = this
        const args = arguments
        clearTimeout(timer)
        if (remaining <= 0) {
          func.apply(context, args)
          startTime = Date.now()
        } else {
          timer = setTimeout(func, remaining)
        }
      }
    }
  }
}
</script>
