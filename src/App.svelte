<script lang="ts">
  import { onMount } from "svelte";
  import SubstitutionPlanComponent from "./component/SubstitutionPlanComponent.svelte";
  import { fetchInformation, type Substitution } from "./lib/untis";

  const params = new URLSearchParams(window.location.search);
  const school = params.get("school");
  const format = params.get("format");
  const dateOffset = parseInt(params.get("dateOffset") || "0");
  console.log(params.get("dateOffset"), console.log(dateOffset));
  
  let data: [Array<string>, Array<Substitution>] = null;
  onMount(async () => {
    if (!school || !format) return;
    data = await fetchInformation(school, format, dateOffset);
  });
</script>

{#if data}
  <h1>Vertretungsplan</h1>

  <div class="messages">
    {#each data[0] as message}
      <p>{@html message}</p>
    {/each}
  </div>
  <SubstitutionPlanComponent substitutions={data[1]} />
{:else}
  <p>Die erforderlichen Parameter wurden nicht angegeben.</p>
{/if}

<p>Build by Cedric Mack, Johannes Hartlepp</p>
