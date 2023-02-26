<script lang="ts">
    import type { Substitution } from "../lib/untis";
    export let substitution: Substitution;
</script>

<tr>
    <td>{@html substitution.course}</td>
    <td>{@html substitution.lesson}</td>
    <td>{@html substitution.subject}</td>
    <td>{@html substitution.room}</td>
    <td>{@html substitution.teacher}</td>
    <td>{@html substitution.info}</td>
    <td>{@html substitution.text}</td>
</tr>
