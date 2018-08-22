<template>
<div>
    <app-hero></app-hero>
    <app-buttons></app-buttons>
</div>
</template>

<script>
import hero from "./heroes/heroesList";
import buttons from "./shared/controllButtons";

export default {
    components: {
        appHero: hero,
        appButtons: buttons
    }
};
</script>

<style>

</style>
