<template>
  <page :loading="loading" class="album-manage">
    <div class="toolbar">
      <div class="left label">专辑列表</div>
      <div class="right">
        <a-button type="primary" @click="showEditModal()">新建专辑</a-button>
      </div>
      <div class="right">
        <a-tooltip>
          <template slot="title">
            添加专辑后运营人员可以执行上架操作
          </template>
          <a-icon type="info-circle" class="tip-icon" />
        </a-tooltip>
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
        <exception-block v-if="datas[item.key] && datas[item.key].length === 0" class="no-album"
          title="您还没创建专辑"
          info="请新建一个以添加您的内容"
          :imgSrc="require('@/common/image/exception/no_album.png')"
          btnTxt="新建专辑"
          @btnClick="showEditModal()"
        />
        <a-table v-else
          :columns="COLUMNS"
          :scroll="{ x: 1093}"
          :rowKey="record => record.no"
          :dataSource="datas[item.key]"
          :pagination="{current: pages[item.key] || 1, total: totals[item.key] || 0, pageSize: PAGE_SIZE}"
          @change="pagination => handleTableChange(item.key, pagination)"
        >
          <template slot="name" slot-scope="name">
            <long-cell>
              {{ name }}
            </long-cell>
          </template>
          <template slot="desc" slot-scope="desc">
            <long-cell style="max-width: 440px;">
              {{ desc }}
            </long-cell>
          </template>
          <template slot="cover" slot-scope="cover">
            <img :src="cover" class="cover-img" />
          </template>
          <div slot="tags" slot-scope="tags">
            <a-tag v-for="(tag, index) in tags" :key="index">{{tag}}</a-tag>
          </div>
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
    <a-modal
      title="专辑信息"
      :width="580"
      :visible="modalVisible"
      @cancel="modalVisible = false"
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