// 基于准备好的dom，初始化echarts实例
var myChart1 = echarts.init(document.getElementById('charts_right'));

// 指定图表的配置项和数据
option = {
    title: {
        text: 'Individual transaction allocation',
        left: 'center'
    },
    series: [
        {
            name: '访问来源',
            type: 'pie',
            radius: '50%',
            data: [
                {value: 1, name: 'burn'},
                {value: 2, name: 'Add Liquidity'},
                {value: 1, name: 'Share out bonus'},
                {value: 1, name: 'fund'},
                {value: 95, name: 'trade'}
            ],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)',
                     // label: {
//                                      formatter: '{b}\n{c}%'　　　　//这是关键，在需要的地方加上就行了
                        // 						}
                }
            }
        }
    ]
};

// 使用刚指定的配置项和数据显示图表。
myChart1.setOption(option);

$(window).resize(function (){
    myChart1.resize()
})
