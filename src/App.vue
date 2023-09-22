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
  <main>
    <Home/>
  </main>
  <footer class="credits">
    <div>
      <p style="max-width: 600px;">
        ReiDoPS Fakematch isn’t endorsed by Nintendo and doesn’t reflect the views or opinions of Nintendo or 
        anyone officially involved in producing or managing Pokémon Unite. Pokémon Unite and Pokémon are 
        trademarks or registered trademarks of Nintendo.
      </p>
      <p>
        Made with 💜 and 😡 by <a href="https://twitter.com/reidophotoshops" target="_blank">ReiDoPhotoshops</a>
      </p>
    </div>
  </footer>
</template>