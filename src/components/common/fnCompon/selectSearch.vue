<template>
    <div class="select-wrap">
        <div class="select" v-if="selectHide">
            <el-select v-model="keyObject" value-key="id" placeholder="select" :clearable="true">
                <el-option
                    v-for="item in options"
                    :key="item.id"
                    :label="item.label"
                    :value="item"/>
            </el-select>
        </div>
        <div class="search">
            <el-date-picker v-if="keyObject && keyObject.type === 'dateRange'"
                v-model="keyObject.value"
                type="daterange"
                range-separator="-"
                start-placeholder="Start date"
                end-placeholder="End date">
            </el-date-picker>
            <el-input v-else
                v-model="keyObject.value"
                clearable
                placeholder="search"
                :style="{width:width+'px'}"
                @keyup.enter.native="inputEnter"/>
            <el-button
                type="primary"
                slot="append"
                icon="el-icon-search"
                @click="inputEnter"
                :loading="searchLoad"/>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'selectSearch',
        data() {
            return {
                keyObject: null
            }
        },
        props: {
            options: {
                type: Array,
                default: []
            },
            selectHide: {
                type: Boolean,
                default: true
            },
            searchLoad: {
                type: Boolean,
                default: false
            },
            value: {
                type: [String, Number],
                default: ''
            },
            width:{
                type: Number,
                default: 150
            }
        },
        created () {
            this.keyObject = this.options.filter(o => o.id === this.value)[0] || {};
        },
        methods: {
            inputEnter() {
                this.$emit('inputEnter', this.keyObject);
            }
        }
    }
</script>

<style lang="less" scoped>
    .select-wrap {
        display:flex;
        align-items:center;
        .select {
            width: 110px;
            margin-right:5px;
        }
        .set {
            cursor: pointer;
            padding-left:18px;
            color:#999;
            i {
                font-size:25px;
            }
        }
    }
</style>
