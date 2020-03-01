<template>
  <page :loading="loading" class="content-manage">
    <template v-if="album">
      <div class="toolbar">
        <div class="left label">选择专辑</div>
        <div class="left input">
          <b-select style="width: 400px" :dict="albumDict" :value="album" @change="onAlbumChange"></b-select>
        </div>
        <div class="right">
          <a-button type="primary" @click="showEditModal()">添加新内容</a-button>
        </div>
      </div>
      <a-tabs v-model="activeKey" @change="onTabChange">
        <a-tab-pane v-for="item in TABS" :key="item.key">
          <span slot="tab">
            {{ item.name }}
            <a-tooltip>
              <template slot="title">
                {{ item.tooltip }}
              </template>
              <a-icon type="info-circle" />
            </a-tooltip>
          </span>
          <exception-block v-if="getDataSource(item.key) && getDataSource(item.key).length === 0" class="no-content"
            title="您还没创建内容"
            info="请上传您的内容"
            :imgSrc="require('@/common/image/exception/no_content.png')"
            btnTxt="上传内容"
            @btnClick="showModal()"
          />
          <a-table v-else
            :columns="COLUMNS"
            :rowKey="record => record.no"
            :dataSource="getDataSource(item.key)"
            :pagination="{current: pages[`${album}_${item.key}`] || 1, total: totals[`${album}_${item.key}`] || 0, pageSize: PAGE_SIZE}"
            @change="pagination => handleTableChange(item.key, pagination)"
          >
            <template slot="name" slot-scope="name">
              <long-cell>
                {{ name }}
              </long-cell>
            </template>
            <template slot="desc" slot-scope="desc">
              <long-cell style="min-width: 115px;">
                {{ desc }}
              </long-cell>
            </template>
            <span slot="action" slot-scope="text, record">
              <a href="javascript:;" @click="showEditModal(record)">编辑信息</a>
              <a-divider type="vertical" />
              <a href="javascript:;" @click="handleDelete(record.no)">删除</a>
              <a-divider type="vertical" />
              <a href="javascript:;" @click="handleHide(record)">{{ record.hidden ? '取消隐藏' : '隐藏' }}</a>
            </span>
          </a-table>
        </a-tab-pane>
      </a-tabs>
    </template>
    <exception-block v-else-if="albumDict" class="no-album"
      title="您还没创建专辑"
      info="请新建一个以添加您的内容"
      :imgSrc="require('@/common/image/exception/no_album.png')"
      btnTxt="新建专辑"
      @btnClick="toCreateAlbum()"
    />
    <a-modal
      :title="currentRecord ? '编辑信息' : '添加新内容'"
      :width="580"
      :visible="visible"
      @cancel="visible = false"
      :destroyOnClose="true"
      :centered="true"
    >
      <div class="modal-content">
        <edit-form ref="editForm" :record="currentRecord" ></edit-form>
      </div>
      <template slot="footer">
        <a-button type="primary" :loading="modalLoading" @click="onEditOk">
          确定
        </a-button>
      </template>
    </a-modal>
  </page>
</template>
<script src="./index.js"></script>
<style lang="less">
  @import 'index.less';
</style>