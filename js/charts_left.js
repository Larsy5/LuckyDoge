// 基于准备好的dom，初始化echarts实例
		        var myChart = echarts.init(document.getElementById('charts_left'));

		        // 指定图表的配置项和数据
		        option = {
		            title: {
		                text: 'Total transaction allocation',
		                left: 'center'
		            },
		            series: [
		                {
		                    name: '访问来源',
		                    type: 'pie',
		                    radius: '50%',
		                    data: [
		                        {value: 50, name: 'destruction'},
		                        {value: 20, name: 'presale'},
		                        {value: 1, name: 'Core Team'},
		                        {value: 14, name: 'AirDrop&Bounty'},
		                        {value: 15, name: 'Add Liquidity'}
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
		        myChart.setOption(option);

$(window).resize(function (){
	myChart.resize()
})
