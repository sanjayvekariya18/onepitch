<template>
    <div class="list-items faqs" :class="{spinner: loading}">
        <preloader v-if="loading"></preloader>
        <div v-show="!loading">
            <div class="table-header">
                <div class="row">
                    <div class="col title">Total Questions: {{ faqs.length }}</div>
                    <div class="col sorter right-align">
                        <button v-on:click="showAddFaqModal" class="btn btn-yellow btn-large" :disabled="!categoryId">
                            CREATE NEW
                        </button>
                    </div>
                </div>

            </div>
            <div class="table-wrapper with-header">
                <table class="table striped">
                    <thead>
                    <tr>
                        <th v-for="column in columns" :colspan="column.extra"
                            v-on:click="sortBy(column.value, column.order)">
                            {{ column.name }}
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="faq in faqs" v-on:click="showEditFaqModal(faq)">
                        <td>{{ faq.order }}</td>
                        <td>{{ faq.question }}</td>
                        <td>{{ faq.answer | elipsis }}</td>
                    </tr>
                    </tbody>
                </table>
                <div class="no-result" v-if="faqs.length < 1">Sorry, no result found...</div>
            </div>
            <div class="add-faq-button" v-on:click="showAddFaqModal" v-if="categoryId"><i class="material-icons">add_circle</i>
            </div>
            <add-faq-modal v-bind:faq="faq" ref="addFaqModal"></add-faq-modal>
        </div>
    </div>
</template>

<script type="text/babel">
  import AddFaqModal from './AddFaqModal.vue'
  import Preloader from '../Partials/PreloaderComponent.vue'

  export default {
    name: 'List',
    components: {
      AddFaqModal,
      Preloader,
    },
    created () {
      this.$parent.setPageTitle('FAQ')
    },
    mounted () {
      this.slug = this.$route.params.slug
      this.getFaqs()
    },
    data () {
      return {
        sortOrder: null,
        faq: {},
        faqs: [],
        categoryId: null,
        errors: [],
        columns: [
          { name: '#', value: 'order', order: '', extra: '' },
          { name: 'Question', value: 'question', order: '', extra: '' },
          { name: 'Answer', value: 'answer', order: '', extra: '' },
        ],
        slug: null,
        loading: true,
      }
    },
    filters: {
      elipsis: function (value) {
        return (value.length > 60) ? value.substring(0, 60) + '...' : value
      },
    },
    watch: {
      '$route' (to, from) {
        this.slug = this.$route.params.slug
        this.getFaqs()
      },
    },
    methods: {
      getFaqs: function () {
        let search = { slug: this.slug }

        this.loading = true
        this.$http.get(laroute.route('admin.rest.faqs.', { search: JSON.stringify(search) })).then(response => {
          this.faqs = response.data

          if (this.faqs.length) {
            this.categoryId = this.faqs[0].faq_category_id
          }
        }).catch(e => {
          console.log(e)
          this.errors.push(e)
        }).finally(() => this.loading = false)

      },
      sortBy: function (sortProperty, sortOrder) {
        sortOrder = (sortOrder === '' || sortOrder === 'asc') ? 'desc' : 'asc'
        _.map(this.columns, function (column) {
          if (column.value === sortProperty) {
            column.order = sortOrder
            return true
          }
        })
        this.sortOrder = sortOrder
        this.faqs = _.orderBy(this.faqs, sortProperty, this.sortOrder)
      },
      showAddFaqModal: function () {
        this.faq = {
          faq_category_id: this.categoryId,
          answer: null,
          question: null,
        }
        this.$refs.addFaqModal.open()
      },
      showEditFaqModal: function (faq) {
        this.faq = {
          id: faq.id,
          faq_category_id: faq.faq_category_id,
          answer: faq.answer,
          question: faq.question,
        }
        this.$refs.addFaqModal.open()
      },
    },

  }
</script>

<style lang="scss">
    .list-items.faqs {
        table.table {
            tbody {
                tr {
                    cursor: pointer;

                    td:last-child {
                        text-align: left;
                    }
                }
            }
        }

        .add-faq-button {
            position: absolute;
            right: 3%;
            bottom: 2%;
            color: #DB4437;
            cursor: pointer;

            .material-icons {
                font-size: 56px;
            }
        }

        .no-result {
            display: block;
            text-align: center;
            font-size: 24px;
            padding: 50px;
        }

    }

</style>