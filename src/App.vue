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
        All assets, images and texts are owned by © 2023 Pokémon. ©1995–2023 Nintendo Creatures Inc. / GAME FREAK inc. © 2023 Tencent. All rights reserved.
        ReiDoPS Fakematch isn’t endorsed by Nintendo and doesn’t reflect the views or opinions of Nintendo or 
        anyone officially involved in producing or managing Pokémon Unite. Pokémon Unite and Pokémon are 
        trademarks or registered trademarks of Nintendo.</p>
      <p>
        Made with 💜 by <a href="https://reidophotoshops.com/" target="_blank">@reidophotoshops</a>
      </p>
    </div>
  </footer>
</template>