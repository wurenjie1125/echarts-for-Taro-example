import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import PropTypes from 'prop-types'
import _isEqual from 'lodash/isEqual.js'
import * as echarts from '../../libs/ec-canvas/echarts'


const commonFunc = (_this, chart) => {
  const { option, loading, loadingConf } = _this.props
  _this.beforeSetOption()
  _this.chartInstance = chart
  if (loading) {
    _this.chartInstance.showLoading('default', loadingConf)
  } else {
    _this.chartInstance.setOption(option)
  }
}

const initChart = ((type) => {
  console.log('type',type)
    
  return (_this) => {
    console.log("_thischartRef",_this.chartRef.init);
    _this.chartRef.init((canvas, width, height) => {
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      })
      console.log('chart',chart)
      canvas.setChart(chart)
      commonFunc(_this, chart)
      return chart
    })
  }
  
})()

export default class Chart extends Taro.Component {

  config = {
    component: true,
    usingComponents: {
      'ec-canvas': '../../libs/ec-canvas/ec-canvas'
    }
  }
  state = {
    ec: {
      lazyLoad: true
    }
  };

  componentDidMount() {
    initChart(this)
  }

  componentWillReceiveProps(nextProps) {
    const { option: newOption } = nextProps
    if (!_isEqual(nextProps, this.props)) {
      this.refreshChart(newOption)
    }
  }

  shouldComponentUpdate(nextProps) {
    return !_isEqual(this.props, nextProps)
  }

  refreshChart = (newOption) => {
    const { option, loading, loadingConf } = this.props
    console.log('this.chartInstance',this.chartInstance)
    if (this.chartInstance) {
      if (loading) {
        this.chartInstance.showLoading('default', loadingConf)
      } else {
        this.chartInstance.hideLoading()
        this.chartInstance.setOption(newOption || option, true)
      }
    }
  }

  beforeSetOption = () => {
    const { onBeforeSetOption } = this.props
    onBeforeSetOption && onBeforeSetOption(echarts)
  }

  setChartRef = node => this.chartRef = node

  render() {
    const { width, height, customStyle } = this.props
    let chartContainerStyle = `${customStyle}width:${width};height:${height};`

    return (
      <View style={chartContainerStyle}>
        <ec-canvas ref={this.setChartRef} ec={this.state.ec} canvas-id={this.props.canvasId} />
      </View>
    )
  }
}

Chart.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  customStyle: PropTypes.string,
  loading: PropTypes.bool,
  loadingConf: PropTypes.object,
  option: PropTypes.object.isRequired,
  onBeforeSetOption: PropTypes.func
}

Chart.defaultProps = {
  width: '100%',
  height: '200px',
  customStyle: '',
  loading: null,
  loadingConf: null,
  onBeforeSetOption: null
}
