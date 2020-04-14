import Taro, { useEffect, useState, useCallback } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import Chart from '../../components/Chart'
import './index.less';

function StaticPage() {
  const [staticData, setStaticData] = useState({});
  const [legendData, setLegentData] = useState([]);
  const [lineChartData, setLineChartData] = useState({});
  const [pieChartData, setPieChartData] = useState({})
  const getData = useCallback((params) => {
    setStaticData();
    handleChartData();
    handleLineChartData();
  })
  useEffect(() => {
    Taro.setNavigationBarColor({
      backgroundColor: '#3bb372',
      frontColor: '#ffffff'
    });
  }, [])
  useEffect(() => {
    getData()
  },[])
 
  
  const handleChartData = (data) => {
   
    const legend = [{
      name:'微信',
      value:'200',
      dotClass:'green'
    },{
      name:'支付宝',
      value:'1000',
      dotClass:'blue'
    },{
      name:'饿了么',
      value:'300',
      dotClass:'purple'
    },{
      name:'美团',
      value:'400',
      dotClass:'yellow'
    }]
    setLegentData(legend)
    setPieChartData({
      width: 'auto',
      height: 'auto',
      series: [
          {
              name: '访问来源',
              type: 'pie',
              hoverOffset: 2,
              radius: ['70%', '95%'],
              center: ['50%', '50%'],
              color:['#38A0FF', '#4ECB72','#B68AFF', '#FFCA39'],
              label: {
                  show: false,
              },
              labelLine: {
                  show: true
              },
              data: [
                {value: 1180, name: '微信', dotClass: 'green'},
                {value: 3600, name: '支付宝', dotClass: 'blue'},
                {value: 1500, name: '饿了么', dotClass: 'purple'},
                {value: 1800, name: '美团', dotClass: 'yellow'},
            ]
          },
      ]
    })  
  }
  const handleLineChartData = data => {
  
    setLineChartData({
      tooltip: {
        show: true,
        trigger: 'axis',
      },
      grid: {
        top: 20,
        bottom: 20,
      },
      xAxis: {
          type: 'category',
          data: ['03/01', '03/09', '03/17', '03/25', '04/01']
      },
      yAxis: {
          type: 'value',
          splitLine: {
            lineStyle: {
              type: 'dotted',
              color: ['#C2C0C0']
            }
          }
      },
      series: [{
          data: [10, 20, 80, 90, 100],
          type: 'line',
          itemStyle: {
            normal: {
              color: '#00BC70',
            },
          },
          lineStyle: {
            color: '#00BC70',
          },
      }]
    })
  
  }
  return (
    <View className='statistic-page'>
      <View className='statistic-header'>
        <View className='total-income'>
          <View className='total-income-desc'><Text>共2笔收入，合计</Text></View>
          <View  className='total-income-amount'><Text className='unit'>¥</Text><Text>2000</Text></View>
        </View>
      </View>
      <View className='statistic-chart-container'>
        <View className='chart-title'>
          <Text>渠道收入</Text>
        </View>
        <View className='chart-wrapper'>
          <View className='chart-box'>
            <Chart
              className='chart-entity'
              option={pieChartData}
              canvasId='chart-pie'
            />
          </View>
          <View className='legend-box'>
            { 
            legendData.map((item, idx) => (
              <View className='legend-item-box' key={idx}>
                <View className='label'><View className={['dot', item.dotClass]}></View><Text>{item.name}</Text></View>
                <View className='value'> <Text>{item.value}（元）</Text></View>
              </View>
            ))
            }
          </View>
        </View>
        <View className='chart-title margin-top-fix'>
          <Text>收入趋势</Text>
          <Text>单位（元）</Text>
        </View>
        <View className='line-chart-box'>
          <Chart
            className='chart-entity'
            option={lineChartData}
            canvasId='canvas-chart'
          />
        </View>
      </View>
    </View>
  )
}
export default StaticPage