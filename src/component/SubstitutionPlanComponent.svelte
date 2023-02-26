<script lang="ts">
    import type { Substitution } from "../lib/untis";
    import SubstitutionComponent from "./SubstitutionComponent.svelte";
    export let substitutions: Substitution[];
</script>

<table>
    <tr>
        <th>Klasse(n)</th>
        <th>Stunde</th>
        <th>Fach</th>
        <th>Raum</th>
        <th>Lehrer</th>
        <th>Infotext</th>
        <th>Vertretungstext</th>
    </tr>
    {#each substitutions as substitution}
        <SubstitutionComponent {substitution} />
    {/each}
</table>
