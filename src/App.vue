<script setup>
import "@fontsource/exo-2"; // Specify weight
import "@fontsource/exo-2/800.css"; // Specify weight
import "@fontsource/exo-2/800-italic.css"; // Specify weight and style
import "@fontsource/pt-sans"; // Defaults to weight 400
import Home from './components/Home.vue'
import { inject } from '@vercel/analytics';
 
inject();
</script>

<template>
  <Home></Home>
</template>