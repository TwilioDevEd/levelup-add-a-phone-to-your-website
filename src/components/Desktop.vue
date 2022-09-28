<template>
  <div class="desktop">
    <div class="desktop-icon-container">
      <Icon appName="support" @support="openWindows.support = true" />
    </div>

    <Support
      v-if="openWindows.support"
      @support="openWindows.support = false"
    />

  </div>
</template>

<script>
import Support from "./Support.vue";
import Icon from "./Icon.vue";

export default {
  name: "Desktop",
  components: {
    Support,
    Icon
  },
  data: function () {
    return {
      openWindows: {
        support: false,
      },
    };
  },
  methods: {
    
  },
};
</script>

<style scoped>
.desktop {
  display: flex;
  z-index: -100;
  overflow:hidden;
  max-height: 100vh;
}

.desktop-icon-container {
  overflow: hidden;
}
</style>
