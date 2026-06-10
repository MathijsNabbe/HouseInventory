<script setup>
import { computed, onMounted, ref } from 'vue'

const items = ref([])
const loading = ref(true)
const error = ref(null)
const searchQuery = ref('')
const selectedCategory = ref('')

function parseDate(dateStr) {
  const [day, month, year] = dateStr.split('-').map(Number)
  return new Date(year, month - 1, day)
}

function isNew(dateStr) {
  const date = parseDate(dateStr)
  const today = new Date()
  today.setHours(23, 59, 59, 999)

  const oneMonthAgo = new Date(today)
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)
  oneMonthAgo.setHours(0, 0, 0, 0)

  return date >= oneMonthAgo && date <= today
}

function fuzzyMatch(text, query) {
  const normalizedText = text.toLowerCase()
  const normalizedQuery = query.toLowerCase().trim()

  if (!normalizedQuery) return true
  if (normalizedText.includes(normalizedQuery)) return true

  let queryIndex = 0
  for (let i = 0; i < normalizedText.length && queryIndex < normalizedQuery.length; i++) {
    if (normalizedText[i] === normalizedQuery[queryIndex]) {
      queryIndex++
    }
  }

  return queryIndex === normalizedQuery.length
}

function sortItems(list) {
  return [...list].sort((a, b) => {
    const dateDiff = parseDate(b.date) - parseDate(a.date)
    if (dateDiff !== 0) return dateDiff
    return a.name.localeCompare(b.name, 'nl')
  })
}

const categories = computed(() => {
  const unique = [...new Set(items.value.map((item) => item.category))]
  return unique.sort((a, b) => a.localeCompare(b, 'nl'))
})

const filteredItems = computed(() => {
  let result = items.value

  if (selectedCategory.value) {
    result = result.filter((item) => item.category === selectedCategory.value)
  }

  if (searchQuery.value.trim()) {
    result = result.filter((item) => fuzzyMatch(item.name, searchQuery.value))
  }

  return sortItems(result)
})

onMounted(async () => {
  try {
    const response = await fetch(`${import.meta.env.BASE_URL}items.json`)

    if (!response.ok) {
      throw new Error(`Kon items niet laden (${response.status})`)
    }

    const data = await response.json()
    items.value = sortItems(data)
  } catch (err) {
    error.value = err.message || 'Er ging iets mis bij het laden van de items.'
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="page">
    <header class="header">
      <h1>spullekes &amp; meubels</h1>
      <p class="subtitle">Overzicht van spullen en meubels in huis</p>
    </header>

    <main class="main">
      <div v-if="loading" class="state-message">Items laden…</div>

      <div v-else-if="error" class="state-message state-message--error">
        {{ error }}
      </div>

      <template v-else>
        <div class="filters">
          <label class="filter-field">
            <span class="visually-hidden">Zoeken</span>
            <input
              v-model="searchQuery"
              type="search"
              placeholder="Zoek op naam…"
              autocomplete="off"
            />
          </label>

          <label class="filter-field">
            <span class="visually-hidden">Categorie</span>
            <select v-model="selectedCategory">
              <option value="">Alle categorieën</option>
              <option v-for="category in categories" :key="category" :value="category">
                {{ category }}
              </option>
            </select>
          </label>
        </div>

        <p v-if="filteredItems.length === 0" class="state-message">
          Geen items gevonden.
        </p>

        <div v-else class="table-wrapper">
          <table class="items-table">
            <thead>
              <tr>
                <th scope="col">Naam</th>
                <th scope="col">Categorie</th>
                <th scope="col">Aantal</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in filteredItems" :key="`${item.name}-${item.category}-${item.date}`">
                <td data-label="Naam">
                  <span class="item-name">
                    {{ item.name }}
                    <span v-if="isNew(item.date)" class="new-badge" aria-label="Nieuw item">NEW</span>
                  </span>
                </td>
                <td data-label="Categorie">{{ item.category }}</td>
                <td data-label="Aantal">{{ item.amount > 1 ? item.amount : '' }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </template>
    </main>
  </div>
</template>
