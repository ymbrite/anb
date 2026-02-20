<script setup lang="ts">
import { ref } from 'vue'
import { Menu, X, Github } from 'lucide-vue-next'
import Button from '~/components/ui/button/Button.vue'
import ThemeToggle from '~/components/ThemeToggle.vue'
import LanguageSwitcher from '~/components/LanguageSwitcher.vue'

const isMenuOpen = ref(false)

const navigation = [
  { name: 'nav.home', href: '/' },
  { name: 'nav.tech', href: '/tech' },
  { name: 'nav.quant', href: '/quant' },
  { name: 'nav.notes', href: '/notes' },
  { name: 'nav.about', href: '/about' },
]
</script>

<template>
  <header class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <div class="container flex h-14 items-center">
      <div class="mr-4 hidden md:flex">
        <NuxtLink to="/" class="mr-6 flex items-center space-x-2">
          <span class="hidden font-bold sm:inline-block">
            {{ $t('brand.title') }}
          </span>
        </NuxtLink>
        <nav class="flex items-center space-x-6 text-sm font-medium">
          <NuxtLink
            v-for="item in navigation"
            :key="item.name"
            :to="item.href"
            class="transition-colors hover:text-foreground/80 text-foreground/60"
            active-class="text-foreground"
          >
            {{ $t(item.name) }}
          </NuxtLink>
        </nav>
      </div>
      
      <!-- Mobile Menu Button -->
      <button class="inline-flex items-center justify-center rounded-md md:hidden p-2 text-foreground" @click="isMenuOpen = !isMenuOpen">
        <span class="sr-only">Open main menu</span>
        <Menu v-if="!isMenuOpen" class="h-6 w-6" />
        <X v-else class="h-6 w-6" />
      </button>

      <!-- Mobile Logo (shown when menu is closed) -->
      <div class="flex flex-1 items-center justify-between space-x-2 md:justify-end">
        <div class="w-full flex-1 md:w-auto md:flex-none">
          <!-- Search or other items -->
        </div>
        <nav class="flex items-center space-x-2">
          <LanguageSwitcher />
          <Button variant="ghost" size="icon" as-child>
            <NuxtLink to="https://github.com" target="_blank" rel="noreferrer">
              <Github class="h-4 w-4" />
              <span class="sr-only">GitHub</span>
            </NuxtLink>
          </Button>
          <ThemeToggle />
        </nav>
      </div>
    </div>
    
    <!-- Mobile Menu -->
    <div v-if="isMenuOpen" class="md:hidden border-t p-4 bg-background">
      <nav class="flex flex-col space-y-4">
        <NuxtLink
          v-for="item in navigation"
          :key="item.name"
          :to="item.href"
          class="text-sm font-medium transition-colors hover:text-foreground/80 text-foreground/60"
          active-class="text-foreground"
          @click="isMenuOpen = false"
        >
          {{ $t(item.name) }}
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>
