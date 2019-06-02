<template>
  <transition name="fade">
    <section
      :class="['message', `message-${types.includes(type) ? type : 'info'}` ]"
      v-show="isShowMessage"
      @mouseover="mouseOver"
      @mouseleave="mouseLeave"
    >
      <p class="content">
        <svg
          class="icon"
          aria-hidden="true"
        >
          <use :xlink:href="`#icon-${types.includes(type) ? type : 'info'}`"></use>
        </svg>{{ content }}
      </p>
    </section>
  </transition>
</template>

<script>
export default {
  components: {},
  name: '',
  data() {
    return {
      isShowMessage: false,
      content: '提示内容',
      duration: 2000,
      type: '',
      types: ['success', 'warning', 'info', 'error'],
      timer: null,
      resolve: '',
      reject: '',
      promise: ''
    }
  },
  methods: {
    showMessage() {
      this.isShowMessage = true;
      this.messageTimer();
      this.promise = new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
      return this.promise;
    },
    remove() {
      setTimeout(() => {
        this.destroy();
      }, 200);
    },
    destroy() {
      this.$destroy();
      document.body.removeChild(this.$el);
    },
    messageTimer() {
      if (this.duration > 0) {
        this.timer = setTimeout(() => {
          this.isShowMessage = false;
          this.resolve('ok');
          this.remove();
        }, this.duration);
      }
    },
    mouseOver() {
      clearTimeout(this.timer);
    },
    mouseLeave() {
      this.messageTimer();
    }
  },
  created() {

  },
  mounted() {

  },
}
</script>

<style scoped lang='less'>
.message {
  position: fixed;
  top: 2em;
  left: 50%;
  font-size: 1em;
  color: red;
  line-height: 3em;
  min-width: 20em;
  padding: 0 1em;
  border: 1px solid #fff;
  border-radius: 0.2em;
  transform: translate(-50%, 0);
  background: #fff;
  z-index: 99999;

  &.message-success {
    background-color: rgba(0, 0, 0, 0.6);
    border-color: #eee;
    color: #67c23a;
  }
  &.message-warning {
    background-color: rgba(0, 0, 0, 0.6);
    border-color: #eee;
    color: #eb9e05;
  }
  &.message-error {
    background-color: rgba(0, 0, 0, 0.6);
    border-color: #eee;
    color: #fa5555;
  }
  &.message-info {
    background-color: rgba(0, 0, 0, 0.6);
    border-color: #eee;
    color: #878d99;
  }

  .content {
    .icon {
      width: 0.9em;
      height: 0.9em;
      vertical-align: -0.08em;
      margin-right: 0.4em;
    }
  }
}
</style>
