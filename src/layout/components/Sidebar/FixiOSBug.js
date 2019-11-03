export default {
  computed: {
    device() {
      return this.$store.state.app.device;
    }
  },
  mounted() {
    this.fixBugIniOS();
  },
  methods: {
    fixBugIniOS() {
      // 为了修复ios设备上的菜单单击，将触发mouseleave错误
      const $subMenu = this.$refs.subMenu;
      if ($subMenu) {
        const handleMouseleave = $subMenu.handleMouseleave;
        $subMenu.handleMouseleave = e => {
          if (this.device === 'mobile') {
            return;
          }
          handleMouseleave(e);
        };
      }
    }
  }
};
