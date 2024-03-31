<script setup lang="ts">
const route = useRoute();
const host = process.server ? useRequestHeaders().host : window.location.host;

useHead({
  link: [{ rel: 'canonical', href: `https://${host}${route.path}` }],
});
</script>

<template>
  <div>
    <SharedMainHeader />
    <div class="view">
      <slot role="main" />
    </div>
  </div>
</template>

<style>
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  font-size: 1rem;
  background-color: #0F172A;
  margin: 0;
  padding: 0;
  color: #18181b;
}

.view {
  max-width: 30rem;
  padding: 0.5rem;
  margin: 0 auto;
  position: relative;
}
</style>
