<script setup lang="ts">
import { navLinks } from '~/mocks';
</script>

<template>
  <header class="header">
    <nav
      class="inner"
      role="navigation"
    >
      <NuxtLink to="/">
        auth<span class="text-[#00DC82] font-bold">Tokenify</span>
      </NuxtLink>
      <NuxtLink
        v-for="(link, key) in navLinks"
        :key="key"
        :to="`/${link.path}`"
      >
        {{ link.name }}
      </NuxtLink>
      <!-- :class="{ active: $route.path.startsWith(`/${link.path}`) }" -->
      <span class="github">
        <a
          href="https://github.com/KOFI-GYIMAH/auth-tokenify.git"
          target="_blank"
          rel="noopener banner"
        >
          Open on GitHub
        </a>
      </span>
    </nav>
  </header>
</template>

<style scoped>
.header {
  background-color: #0f172a;
  z-index: 999;
  height: 55px;

  .inner {
    max-width: 800px;
    box-sizing: border-box;
    margin: 0px auto;
    padding: 12px 5px;
    display: flex;
    place-items: center;
  }

  & a {
    color: #fff;
    line-height: 24px;
    transition: color 0.15s ease;
    display: inline-block;
    vertical-align: middle;
    font-weight: 300;
    letter-spacing: 0.075em;
    margin-right: 1.8em;

    &:hover {
      color: #00dc82;
    }

    &.active {
      color: #00dc82;
    }

    &:nth-child(6) {
      margin-right: 0;
    }
  }

  .github {
    color: #fff;
    font-size: 0.9em;
    margin: auto;
    text-align: right;
    flex-grow: 1;
    & a {
      margin-right: 0;
    }
  }
}

@media (max-width: 860px) {
  .header .inner {
    padding: 15px 30px;
  }
}

@media (max-width: 600px) {
  .header {
    .inner {
      padding: 15px;
    }

    & a {
      margin-right: 1em;
    }

    .github {
      display: none;
    }
  }
}
</style>
