## echarts-for-Taro-example

### 介绍：
本仓库以Taro框架如何正确运行echarts，写了个example，供各位参考。
主要二次封装了[Echarts-微信小程序版本](https://github.com/ecomfe/echarts-for-weixin "Echarts-微信小程序版本")这个库，以React形式重写。
参考了[Taro-echarts](https://github.com/eyelly-wu/taro-echarts "Taro-echarts")这个仓库。但是这个仓库有一些弊端，打包出来太大，超出了微信包大小的限制。而且处理不好多个图表同时显示的情况。