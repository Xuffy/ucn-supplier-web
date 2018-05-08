<template>
    <div class="category-common">
        <span style="display:none;" v-text="upDataPage"></span>
        <div class="hd">{{ $i.common.categorycommonTitle }}</div>
        <div class="category-wrap">
            <div class="maping-relation">
                <h5>{{ $i.common.mappingRelation }}</h5>
                <div class="category">
                    <div class="hd input-hd">
                        <span class="text">
                            <b>{{ $i.common.myCategory }}</b>({{ $i.common.generalCategory }})({{ $i.common.tags }})&nbsp;
                        </span>
                        <el-input :placeholder="$i.common.inputkeyWordToSearch" v-model="mapingCategoryKeyWord" suffix-icon="el-icon-search" />
                    </div>
                    <el-tree
                        class="filter-tree"
                        :data="mappingRelationData"
                        :props="treeProps"
                        :filter-node-method="filterNode"
                        ref="tree2"
                        default-expand-all
                        v-show="mappingRelationData.length >= 1"
                    />
                    <div v-show="mappingRelationData.length <= 0" class="mappingRelation">{{ $i.common.mappingNoData }}</div>
                </div>
            </div>
            <div class="my-category">
                <h5>{{ $i.common.myCategory }}</h5>
                <div class="category">
                    <div class="input-hd">
                        <el-button size="mini" @click="add(myCategoryData, 'parents')">{{ $i.common.add }}</el-button><el-input :placeholder="$i.common.inputkeyWordToSearch" v-model="myCategoryKeyWord" suffix-icon="el-icon-search" />
                    </div>
                    <el-tree
                        class="filter-tree"
                        :data="myCategoryData"
                        :props="defaultProps"
                        default-expand-all
                        highlight-current
                        :filter-node-method="filterNode"
                        :render-content="renderContent"
                        :expand-on-click-node="true"
                        ref="tree"
                        @node-click="myCategoryChange"
                    />
                </div>
            </div>
            <div class="mapping">
                <span>{{ $i.common.mapping }}</span><i></i>
            </div>
            <div class="general-category">
                <h5>{{ $i.common.generalCategory }}</h5>
                <div class="category">
                    <div class="input-hd">
                        <el-input :placeholder="$i.common.inputkeyWordToSearch" v-model="generalCategoryKeyWord" suffix-icon="el-icon-search" />
                    </div>
                    <el-tree
                        :data="mgeneralCategoryData"
                        show-checkbox
                        default-expand-all
                        node-key="id"
                        ref="tree1"
                        highlight-current
                        :filter-node-method="filterNode"
                        :props="defaultProps" 
                        @check-change="generalCategoryChange"
                    />
                    <div class="btn-wrap">
                        <el-button type="primary" @click="save">{{ $i.common.save }}</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'Categorycommon',
        data() {
            return {
                upDataPage:0,
                selectedNodes: [],
                myCategoryKeyWord:'',
                generalCategoryKeyWord:'',
                mapingCategoryKeyWord:'',
                myCategoryData: [],
                myCategory: '',
                mgeneralCategoryData:[],
                mappingRelationData: [],
                defaultProps: {
                    children: 'children',
                    label: 'name',
                    id: 'id'
                },
                treeProps: {
                    children: 'categorys',
                    label: 'name',
                    id: 'id'
                }
            }
        },
        created() {
            this.getMgeneralCategoryData();
            this.getMyCategoryData();
            this.getMappingCategory();
        },
        methods: {
            getMgeneralCategoryData() {
                this.$ajax.get(this.$apis.GET_SYS_CATEGORY)
                .then(res => {
                    this.mgeneralCategoryData = res;
                });
            },
            getMyCategoryData() {
                this.$ajax.get(this.$apis.GET_CATEGORY)
                .then(res => {
                    this.myCategoryData = res;
                })
            },
            getMappingCategory() {
                this.$ajax.get(this.$apis.GET_MAPPING_CATEGORY)
                .then(res => {
                    this.mappingRelationData = res;
                    this.mappingRelationDataSplit(this.mappingRelationData);
                })
            },
            mappingRelationDataSplit(list) {
                list.forEach((item, index) => {
                    if(item.builder) item.name = `${item.name}(${item.builder})`;
                    if(item[this.treeProps.children].length && item[this.treeProps.children]) this.mappingRelationDataSplit(item[this.treeProps.children])
                });
            },
            addData(id, data, name, type) {
                const newChild = { id: id, name: name, parentId:data.id, isActive:false, children: [] };
                if(type === 'parents') {
                    data.push(newChild);
                } else {
                    data.children.push(newChild);
                }
                this.getMappingCategory();
            },
            addNewCategory(data, name, type) {
                const params = {
                    parentId: data.id || 0,
                    name: name
                };
                this.$ajax.post(this.$apis.GET_CATEGORY, params)
                .then(res => {
                    this.addData(res, data, name, type);
                    this.myCategory = '';
                });
            },
            filterNode(value, data) {
                if (!value) return true;
                return data[this.defaultProps.label].indexOf(value) !== -1;
            },
            renderContent(h, { node, data, store }) {
                return (
                    <span class="custom-tree-node">
                        <span>{ node.label }</span>
                        <span class="icon-wrap" on-click={ (ev) => { ev.cancelBubble = true } }>
                            <i class="el-icon-edit" on-click={ () => this.edit(data) }></i>
                            <i class="el-icon-remove-outline" on-click={ () => this.remove(node, data) }></i>
                            <i class="el-icon-circle-plus-outline" on-click={ () => this.add(data) }></i>
                        </span>
                    </span>
                );
            },
            // mappingRelationDataForEach(list, id, type, val){
            //     list.forEach((res, index) => {
            //         if(res.id === id) {
            //             switch(type) {
            //                 case 'delete':
            //                     list.splice(index, 1);
            //                     break;
            //                 case 'edit':
            //                     res.name = val;
            //                     break;
            //             };
            //         } else if(!id) {
            //             if(index <= 0) list.push(val);
            //         }
            //         if(res.children && res.children.length) this.mappingRelationDataForEach(res.children, id, type, val);
            //     });
            // },
            remove(node, data) {
                const parent = node.parent;
                const children = parent.data.children || parent.data;
                const index = children.findIndex(d => d.id === data.id);
                const id = children[index].id;
                if(data.children && data.children.length) return  this.$message({
                    type: 'info',
                    message: this.$i.myCategorycommonDelete
                }); 
                this.$confirm(this.$i.myCategorycommonDeleteTitle, this.$i.myCategorycommonTitle, {
                    confirmButtonText: this.$i.common.ok,
                    cancelButtonText: this.$i.common.cancel,
                    type: 'warning'
                }).then(() => {
                    this.$ajax.get(`${this.$apis.POST_CATEGORY_DELETE}/{id}`, {
                        id: id
                    })
                    .then(res => {
                        this.getMappingCategory();
                        // this.mappingRelationDataForEach(this.mappingRelationData, id, 'delete');
                        children.splice(index, 1);
                        this.$message({
                            type: 'success',
                            message: this.$i.common.deleteSuccess
                        });
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: this.$i.undelete
                    });          
                });
            },
            add(data, type) {
                this.$prompt(this.$i.common.addClassification, this.$i.common.prompt, {
                    confirmButtonText: this.$i.common.confirm,
                    cancelButtonText: this.$i.common.cancel
                }).then(({ value }) => {
                    if(!value) return this.$message({
                        message: this.$i.common.theClassificationNameCanNotBeEmpty,
                        type: 'warning'
                    });
                    if(type === 'parents') return this.addNewCategory(data, value, type);
                    if(data.children && data.children.length) {
                        this.addNewCategory(data, value, type);
                    } else {
                        this.$ajax.get(this.$apis.GET_ADD_APPING_CATEGORY, {
                            id: data.id
                        })
                        .then(res => {
                            if(!res) return this.addNewCategory(data, value, type);
                            this.$confirm(this.$i.common.addEmptying, this.$i.common.prompt, {
                                confirmButtonText: this.$i.common.confirm,
                                cancelButtonText: this.$i.common.cancel,
                                type: 'warning'
                            }).then(() => {
                                this.addNewCategory(data, value, type)
                            }).catch(() => {
                                return false;
                            })
                        });
                    };
                });
            },
            edit(data) {
                this.$prompt(this.$i.common.pleaseEdit, this.$i.common.prompt, {
                    confirmButtonText: this.$i.common.confirm,
                    cancelButtonText: this.$i.common.cancel,
                    inputValue: data.name
                }).then(({ value }) => {
                    if(!value) return this.$message({
                        message: this.$i.common.canTBeEmptys,
                        type: 'warning'
                    });
                    if(data.name === value) return this.$message({
                        type: 'info',
                        message: this.$i.common.canTBeEmptys
                    });  
                    this.$ajax.post(`${this.$apis.POST_UPDATE_CATEGORY}/?name=${value}`, {
                        id: data.id
                    })
                    .then(res => {
                        data.name = value;
                        this.getMappingCategory();
                        // this.mappingRelationDataForEach(this.mappingRelationData, data.id, 'edit', value);
                    });
                }).catch(() => {
                           
                });
            },
            genCheckBox(id, list) {
                list.forEach(items => {
                    if(id === items.id + '') this.$refs.tree1.setChecked(items.id, true, true);
                    if(items[this.defaultProps.children] && items[this.defaultProps.children].length) this.genCheckBox(id, items[this.defaultProps.children]);
                });
            },
            setCheckBox(list) {
                list.forEach(items => {
                    this.$refs.tree1.setChecked(items.id, false, true);
                    if(items[this.defaultProps.children] && items[this.defaultProps.children].length) this.setCheckBox(items[this.defaultProps.children]);
                });
            },
            myCategoryChange(val) {
                if(val.children && val.children.length) return this.myCategory = '';
                this.myCategory = val.id;
                this.$ajax.get(this.$apis.GET_CHANGE_MAPPING_CATEGORY, {
                    id: val.id
                })
                .then(res => {
                    this.setCheckBox(this.mgeneralCategoryData)
                    if(res) {
                        const genCheckBox = res.split(',');
                        genCheckBox.forEach(item => {
                            this.genCheckBox(item, this.mgeneralCategoryData)
                        });
                    } else {
                        this.genCheckBox('', this.mgeneralCategoryData)
                    }
                });
            },
            save() {
                let nodes = [];
                this.selectedNodes.forEach(item => {
                    nodes.push(item.id)
                });
                const params = {
                    categoryId: this.myCategory,
                    sysId: nodes.toString()
                };
                if(!params.categoryId) return this.$message({
                    type: 'info',
                    message: this.$i.common.pleaseSelectTheLeafNode
                });
                this.$ajax.post(this.$apis.POST_SAVE_MAPPING_CATEGORY, params)
                .then(res => {
                    this.mappingRelationData = res;
                    this.mappingRelationDataSplit(this.mappingRelationData);
                });
            },
            generalCategoryChange(data) {
                this.selectedNodes = this.$refs.tree1.getCheckedNodes(true);
            }
        },
        watch: {
            myCategoryKeyWord(val) {
                this.$refs.tree.filter(val);
            },
            generalCategoryKeyWord(val) {
                this.$refs.tree1.filter(val);
            },
            mapingCategoryKeyWord(val) {
                this.$refs.tree2.filter(val);
            }
        },
    }
</script>
<style scoped>
    >>> .custom-tree-node {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        padding-right: 8px;
    }

    >>> .custom-tree-node .el-icon-edit {
        display:inline-block;
    }

    >>> .custom-tree-node .el-icon-edit,
    >>> .custom-tree-node .el-icon-circle-plus-outline,
    >>> .custom-tree-node .el-icon-remove-outline {
        display:none;
        margin-right:5px;
    }
    
     >>> .custom-tree-node .icon-wrap {
        width: 100px;
        text-align:right;
    }

    >>> .custom-tree-node:hover .el-icon-edit,
    >>> .custom-tree-node:hover .el-icon-circle-plus-outline,
    >>> .custom-tree-node:hover .el-icon-remove-outline {
        display:inline-block;
    }
    >>> .el-tree-node > .el-tree-node__children {
        overflow: visible;
    }
</style>

<style lang="less" scoped>
    .category-common {
        .hd {
            font-weight: bold;
            font-size:16px;
        }
        .mappingRelation {
            font-size:16px;
            color:#666;
            text-align: center; 
            line-height:50px;
        }
        .category-wrap {
            display:flex;
            padding:20px;
            overflow-x: auto;
            .mapping {
                width: 50px;
                height: 30px;
                line-height: 30px;
                padding:0 10px;
                background:#fff;
                color:#000;
                position: relative;
                margin-top:245px;
                margin-right:30px;
                &::after {
                    content: ' ';
                    position: absolute;
                    left:0;
                    top:0;
                    width:100%;
                    height: 1px;
                    background:#d7d7d7;
                }
                &::before {
                    content: ' ';
                    position: absolute;
                    left:0;
                    bottom:0;
                    width:100%;
                    height: 1px;
                    background:#d7d7d7;
                }
                i {
                    z-index: 0;
                    height: 100%;
                    width: 20px;
                    position: absolute;
                    right:0;
                    top:0;
                    &::after {
                        content: ' ';
                        position: absolute;
                        left:0;
                        top:0;
                        width:40px;
                        height: 1px;
                        background:#d7d7d7;
                        transform: rotate(45deg);
                    }
                    &::before {
                        content: ' ';
                        position: absolute;
                        left:0;
                        bottom:0;
                        width:40px;
                        height: 1px;
                        background:#d7d7d7;
                        transform: rotate(-45deg);
                    }
                }
                span {
                    position:absolute;
                    left:10px;
                    line-height: 30px;
                    z-index:1;
                }
            }
            h5 {
                font-weight: normal;
                font-size:20px;
                color:#666;
                padding:15px 15px;
                border-bottom: 1px solid #e0e0e0;
            }
            .my-category, .general-category {
                width:30vw;
            }
            .my-category, .general-category, .maping-relation {
                .btn-wrap {
                    padding:10px;
                    display:flex;
                    align-items: center;
                    justify-content: center;
                }
                margin-right:15px;
                min-width:260px;
                background:#fff;
                border:1px solid #e0e0e0;
                box-shadow: 0 0 30px #e0e0e0;
                border-radius: 5px;
                .category {
                    .input-hd {
                        display:flex;
                        height:32px;
                        padding:10px 15px;
                        border-bottom:1px solid #e0e0e0;
                    }
                    .el-tree {  
                        overflow: auto;
                        height: 50vh;
                    }
                }
            }
            .maping-relation {
                width:40vw;
                .hd {
                    display:flex;
                    align-items: center;
                    justify-content: space-between;
                    .text {
                        display:flex;
                        align-items: center;
                        justify-content: space-between;
                        color:#666;
                        font-size:12px;
                        white-space:nowrap;
                        b {
                            font-size:12px;
                            white-space:nowrap;
                            color:#ccc;
                        }
                    }
                }
            }
        }
    }
</style>