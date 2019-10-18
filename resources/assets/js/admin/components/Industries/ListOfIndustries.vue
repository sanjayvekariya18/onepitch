<template>
    <div class="list-items industries" :class="{spinner: loading}">
        <preloader v-if="loading"></preloader>
        <div v-show="!loading">
            <div class="table-header">
                <div class="row">
                    <div class="col title">Industries - {{ industries.length }}</div>
                    <div class="col sorter right-align">
                        <date-range-component v-bind:industries="industries" @filtered-by-date="filteredIndustries"></date-range-component>
                    </div>
                </div>
            </div>
            <div class="table-wrapper with-header">
                <table class="table striped">
                    <thead>
                    <tr>
                        <th v-for="column in columns" :colspan="column.extra" v-on:click="sortBy(column.value, column.order)">
                            {{ column.name }}
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="industry in industries" v-on:click="showEditIndustryModal(industry)">
                        <td>{{ industry.title }}</td>
                        <td>{{ industry.full_title }}</td>
                        <td class="buttons purpley-grey">{{ industry.whenCreated }}</td>
                    </tr>
                    </tbody>
                </table>
                <div class="no-result" v-if="industries.length < 1">Sorry, no result found...</div>
            </div>
            <div class="add-industry-button" v-on:click="showAddIndustryModal"><i class="material-icons">add_circle</i></div>
            <add-industry-modal ref="addIndustryModal"></add-industry-modal>
            <edit-industry-modal v-bind:industry="industry" ref="editIndustryModal"></edit-industry-modal>
        </div>
    </div>
</template>

<script type="text/babel">
    import AddIndustryModal from './AddIndustryModal.vue';
    import EditIndustryModal from './EditIndustryModal.vue';
    import DateRangeComponent from '../Partials/Form/DateRangeComponent.vue';
    import AvatarImageInitialsComponent from '../Partials/Page/Profile/AvatarImageInitialsComponent.vue';
    import Preloader from '../Partials/PreloaderComponent.vue';

    export default {
        components: {
            AddIndustryModal,
            EditIndustryModal,
            DateRangeComponent,
            AvatarImageInitialsComponent,
            Preloader
        },
        created () {
            this.$parent.setPageTitle('Industries');
        },
        mounted() {
            this.getIndustries();
        },
        data() {
            return {
                sortOrder: null,
                industry: {},
                industries: [],
                clonedIndustries: [],
                errors: [],
                columns: [
                    {name: 'Title', value: 'title', order: ''},
                    {name: 'Full Title', value: 'full_title', order: ''},
                    {name: 'Date Added', value: 'created_at', order: ''}
                ],
                loading: true
            };
        },
        methods : {
            getIndustries: function () {
                this.loading = true;
                this.$http.get(laroute.route('admin.rest.industries.', {sort: 'desc'}))
                    .then(response => {
                        this.industries = response.data;
                        this.loading = false;
                    })
                    .catch(e => {
                        console.error(e);
                        this.errors.push(e)
                    });
            },
            filteredIndustries : function (filteredIndustries) {
                if (filteredIndustries) {
                    this.clonedIndustries = _.clone(this.industries);
                    this.industries = filteredIndustries;
                } else {
                    this.industries = this.clonedIndustries;
                    this.clonedIndustries = [];
                }
            },
            sortBy : function (sortProperty, sortOrder) {
                sortOrder = (sortOrder === '' || sortOrder === 'asc') ? 'desc' : 'asc';
                _.map(this.columns, function (column) {
                    if (column.value === sortProperty) {
                        column.order = sortOrder;
                        return true;
                    }
                });
                this.sortOrder = sortOrder;
                this.industries = _.orderBy(this.industries, sortProperty, this.sortOrder);
            },
            showAddIndustryModal: function() {
                this.$refs.addIndustryModal.open();
            },
            showEditIndustryModal: function(industry) {
                this.industry = industry;
                this.$refs.editIndustryModal.open();
            }
        }
    }
</script>

<style lang="scss">
    .list-items.industries {
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

        .add-industry-button {
            position: absolute;
            right: 3%;
            bottom: 2%;
            color:#DB4437;
            cursor: pointer;
            
            .material-icons {
                font-size:56px;
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