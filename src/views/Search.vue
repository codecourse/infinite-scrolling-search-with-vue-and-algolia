<template>
  <div>
    <ais-index
        index-name="articles"
        :search-store="searchStore"
        :query="initialQuery"
    >
      <div class="field">
        <ais-input
            class="input"
            placeholder="Search articles"
            id="search"
            :maxlength="maxQueryLength"
        />
      </div>

      <template v-if="searchIsntEmpty">
            <ais-results
                :stack="true"
                :results-per-page="10"
            >
                <template slot-scope="{ result }">
                  <div class="box">
                    <h1 class="title">
                      {{ result.title }}
                    </h1>
                    <p>{{ result.teaser }}</p>
                  </div>
                </template>
            </ais-results>

          <ais-no-results>
              Hmm, couldn't find anything.
          </ais-no-results>

          <AppLoader
            v-if="searchStore.results.length"
            v-observe-visibility="{
                callback: incrementPage,
                throttle: 1000
            }"
          />
      </template>
    </ais-index>
  </div>
</template>

<script>
  import { createFromAlgoliaCredentials, createFromSerialized } from 'vue-instantsearch'

  import AppLoader from '@/components/AppLoader'

  export default {
    components: {
      AppLoader
    },

    data () {
        return {
            maxQueryLength: 200,
            searchStore: null
        }
    },

    computed: {
      initialQuery () {
          if (typeof this.$route.query.q === 'undefined') {
              return ''
          }

          return this.$route.query.q.substring(0, this.maxQueryLength)
      },

      searchIsntEmpty () {
          if (!this.searchStore) {
              return false
          }

          return this.searchStore._helper.state.query.length > 0
      }
    },

    methods: {
      incrementPage (visible) {
          if (visible) {
              const params = this.searchStore.queryParameters
              
              this.searchStore.queryParameters = Object.assign(
                  {}, params, {
                      page: params.page + 1
                  }
              )

              this.searchStore.refresh()
          }
      }
    },

    watch: {
        'searchStore.query' (value) {
            this.$router.replace({
                query: {
                    q: value
                }
            })
        }
    },

    created () {
      this.searchStore = createFromAlgoliaCredentials(
        'LJFY5WHWB8', 'ab0e768fb3ac43ab71587fa49c75869a'
      )

      this.searchStore.queryParameters = {
          page: 1
      }
    }
  }
</script>
