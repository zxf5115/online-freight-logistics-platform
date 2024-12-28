<template>
  <div class="xiecheng">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>{{ $t('course.course_structure') }}</div>
        </div>

        <div class="admin_main_block_right">
          <div>
            <el-button icon="el-icon-back" @click="$router.go(-1)">
              {{ $t('common.return') }}
            </el-button>
          </div>
        </div>
      </div>

      <div class="admin_form_main">
        <div style="height:calc(100vh - 100px);">
          <SeeksRelationGraph
            ref="graph"
            :options="graphOptions"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SeeksRelationGraph from 'relation-graph'
export default {
  name: 'Demo',
  components: { SeeksRelationGraph },
  data() {
    return {
      id: 0,
      currentCase: '双向树',
      isShowCodePanel: false,
      graphOptions: {
        'disableDragNode': true,
        'defaultFocusRootNode': false,
        'layouts': [
          {
            'label': '中心',
            'layoutName': 'tree',
            'layoutClassName': 'seeks-layout-center',
            'defaultJunctionPoint': 'border',
            'defaultNodeShape': 0,
            'defaultLineShape': 1,
            'from': 'left',
            'max_per_width': '300',
            'min_per_height': '40'
          }
        ],
        'defaultLineMarker': {
          'markerWidth': 12,
          'markerHeight': 12,
          'refX': 6,
          'refY': 6,
          'data': 'M2,2 L10,6 L2,10 L6,6 L2,2'
        },
        'defaultNodeShape': 1,
        'defaultNodeWidth': '100',
        'defaultLineShape': 4,
        'defaultJunctionPoint': 'lr',
        'defaultNodeBorderWidth': 0,
        'defaultLineColor': 'rgba(0, 186, 189, 1)',
        'defaultNodeColor': 'rgba(0, 206, 209, 1)'
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init ()
    {
      let id = this.$route.query.course_id

      this.id = id || 0
      this.$nextTick(() => {
        if (this.id) {
          this.$http({
            url: this.$http.adornUrl(`/education/course/structure/${this.id}`),
            method: 'get',
            params: this.$http.adornParams()
          }).then(({data}) => {
            if (data && data.status === 200) {
              this.$refs.graph.setJsonData(data.data, (seeksRGGraph) => {
                // 这些写上当图谱初始化完成后需要执行的代码
              })
            }
          })
        }
      })
    }
  }
}
</script>
