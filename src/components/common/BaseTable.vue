<template>
  <table class="base-table">
    <thead>
      <tr>
        <th v-for="column in columns" :key="column.key">
          {{ column.label }}
        </th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(row, rowIndex) in data" :key="rowIndex">
        <td v-for="column in columns" :key="column.key">
          <slot :name="`cell-${column.key}`" :row="row">
            {{ row[column.key] }} <span v-if="row.isWinner" class="trophy">🏆</span>
          </slot>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
defineProps({
  columns: {
    type: Array,
    required: true,
  },
  data: {
    type: Array,
    required: true,
  },
})
</script>

<style scoped>
.base-table {
  border-collapse: collapse;
  width: 100%;
}

th,
td {
  border-bottom: 1px solid #ddd;
  text-align: left;
  font-size: var(--text-sm);
  padding: 2px 4px;
}

th {
  font-weight: 600;
  background-color: var(--color-dark-gray);
}

td {
  background-color: var(--color-white);
}
</style>
