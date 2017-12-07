$(function(){
    // 基于准备好的dom，初始化echarts实例
    //柱状图
    var myChart = echarts.init(document.getElementById('main_left'));
    var option = {
        title: {
            text: '2017年注册人数'
        },
        tooltip: {},
        legend: {
            data:['人数']
        },
        xAxis: {
            data: ["1月","2月","3月","4月","5月","6月"]
        },
        yAxis: {},
        series: [{
            name: '人数',
            type: 'bar',
            data: [1000, 2000,3500,1300,1100,2100]
        }]
    };
    myChart.setOption(option); 


    //饼状图
    var myChart2 = echarts.init(document.getElementById('main_right'));   
    var option2 = {
        title : {
            text: '热门品牌销售',
            subtext: '2017年6月',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['耐克','阿迪','百伦','安踏','李宁']
        },
        series : [
            {
                name: '访问来源',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:[
                    {value:335, name:'耐克'},
                    {value:310, name:'阿迪'},
                    {value:234, name:'百伦'},
                    {value:135, name:'安踏'},
                    {value:1548, name:'李宁'}
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    myChart2.setOption(option2);

    $('.lt_main .header a:eq(0)').click(function(){
        if($(this).hasClass('menu')){
            $(this).removeClass('menu');
            $('.lt_side').stop().animate({width:0},200);
            $('.lt_main').stop().animate({paddingLeft:0},200);
        }else{
            $(this).addClass('menu');
            $('.lt_side').stop().animate({width:180},200);
            $('.lt_main').stop().animate({paddingLeft:180},200);
        }
    })
})