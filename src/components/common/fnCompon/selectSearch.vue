<template>
    <div class="select-wrap">
        <div class="select" v-if="selectHide">
            <el-select v-model="keyType" placeholder="select" :clearable="true">
                <el-option
                    v-for="item in options"
                    :key="item.id"
                    :label="item.label"
                    :value="item.id" 
                />
            </el-select>
        </div>
        <div class="search">
            <el-input 
                v-model="keyWord" 
                clearable 
                placeholder="search" 
                style="max-width:150px;" 
                @keyup.enter.native="inputEnter" 
            />
            <el-button 
                type="primary" 
                slot="append" 
                icon="el-icon-search" 
                @click="inputEnter" 
                :loading="searchLoad" 
            />
        </div>
    </div>
</template>
<script>
    export default {
        name:'selectSearch',
        data() {
            return {
                keyWord:''
            }
        },
        props: {
            options: {
                type: Array,
                default: () => {
                    return [];
                }
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
            }
        },
        computed: {
            keyType: {
                get() {
                    return this.value;
                },
                set(val) {
                    this.$emit('input', val);
                }
            }
        },
        methods: {
            inputEnter() {
                this.$emit('inputEnter', {
                    key: this.keyWord,
                    keyType: this.keyType
                });
            }
        }
    }
</script>
<style scoped>
    .select-wrap .search {
        display:flex;
    }
    .select-wrap .search >>> input {
        border-right:none;
        border-radius:5px 0 0 5px;
    }
    .select-wrap .search >>> button {
        border-radius:0 5px 5px 0;
    }
</style>

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
