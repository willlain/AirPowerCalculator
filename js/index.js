var drag_source = null;
var record = {}
var record_target = "";
var chart = null;
var record_base = {}
var record_ship = {}
const aircraft_type_id = [7,8,9,10,11,45,47,48,57];
const tab_type_ship = [[2],3,4,5,6,[8,9],10,7,11,18,16,[1,13,14,21,17,19,20,22]];
const tab_type_equipment = [[1,16,2,3],[4,20],[5,32,22],[12,13,51],[14,15,40,25,26],[18,19,37],[24,46,30,50],[10,11,45,41],[6,52,7,8,53,9,56,57],[17,21,27,28],[29,42,33,39],[47,54,48,49],[23,31,34,35,36,43,44]];

var p1 = getJson("json/ship_id.json");
var p2 = getJson("json/ship_type.json");
var p3 = getJson("json/ship_model.json");
var p4 = getJson("json/equipment_id_ship.json");
var p5 = getJson("json/equipment_type_ship.json");
var p6 = getJson("json/enemy_id.json");
var p7 = getJson("json/equipment_id_enemy.json");
var p8 = getJson("json/equipment_type_enemy.json");
var p9 = getJson("json/map.json")

function getJson(json_url) {
    return $.ajax({
        type: "GET",
        url: json_url,
        dataType: "json",
    }).done(function (data, textStatus, xhr){
        switch (json_url.split("/")[1]) {
            case "ship_type.json":
                data_ship_type  = data;
                break;
            case "ship_id.json":
                data_ship_id  = data;
                break;
            case "ship_model.json":
                data_ship_model = data;
                break;
            case "equipment_id_ship.json":
                data_equipment_id_ship = data;
                break;
            case "equipment_type_ship.json":
                data_equipment_type_ship = data;
                break;
            case "map.json":
                data_map = data;
                break;
            case "enemy_id.json":
                data_enemy_id = data;
                break;
            case "equipment_id_enemy.json":
                data_equipment_id_enemy = data;
                break;
            case "equipment_type_enemy.json":
                data_equipment_type_enemy = data;
                break;
            default:
        }
    })
}

var p10 = Promise.all([p1,p2,p3,p4,p5]).then(function () {
    $("#dialog-select-ship").append(displayListShip());
    $("#dialog-select-equipment").append(displayListEquipment());
    $('a[class="list-group-item list-group-item-action"]').on("shown.bs.tab", function(e){
        $("#btn-select-" + $(this).attr("href").split("-")[1]).prop("disabled", false);
    });
})
var p11 = Promise.all([p9]).then(function () {
    $("#map-content").append(displayMap());
    $("#map-area").selectpicker({
        width: 70,
        size: 5,
        container: 'body',
        style: 'page-link text-dark d-inline-block'
    });
    $("#map-cell").selectpicker({
        width: 80,
        size: 5,
        container: 'body',
        style: 'page-link text-dark d-inline-block'
    }).prop('disabled', true).selectpicker('refresh');
    $("#map-cell").siblings('button').prop('disabled', true);
})
Promise.all([p10,p11]).then(function() {
    expandRecord(0);
})

$(function () {
    /**
     * ==========================================================
     * select関係
     * ==========================================================
     */
    $(".space-ship").selectpicker({
         width: 30,
         size: 5,
         container: 'body',
         style: 'page-link text-dark d-inline-block'
    }).prop('disabled', true).selectpicker('refresh');
    $(".space-ship").siblings('button').prop('disabled', true);
    $(".space-base").selectpicker({
         width: 30,
         size: 5,
         container: 'body',
         style: 'page-link text-dark d-inline-block'
    })
    $(".skill").selectpicker({
        width: 40,
        size: 5,
        container: 'body',
        style: 'page-link text-dark d-inline-block'
    }).prop('disabled', true).selectpicker('refresh');
    $(".skill").siblings('button').prop('disabled', true);
    $(".improvement").selectpicker({
        width: 50,
        size: 5,
        container: 'body',
        style: 'page-link text-dark d-inline-block'
    }).prop('disabled', true).selectpicker('refresh');
    $(".improvement").siblings('button').prop('disabled', true);
    $(".grade").selectpicker({
        width: 50,
        size: 5,
        container: 'body',
        style: 'page-link text-dark d-inline-block'
    }).prop('disabled', true).selectpicker('refresh');
    $(".grade").siblings('button').prop('disabled', true);
    $(".downRate").selectpicker({
        width: 40,
        size: 5,
        container: 'body',
        style: 'page-link text-dark d-inline-block'
    })

    /**
     * ==========================================================
     * dialog関係
     * ==========================================================
     */
    $("#dialog-select-ship").dialog({
        autoOpen: false,
        modal: true,
        width: 900,
        title: "選択",
        resizable: false,
        close: function() {
            $("div[class*=active]").each(function(){
                $(this).removeClass("show").removeClass("active");
            });
            $('a[class="nav-link active show"]').each(function(){
                $(this).removeClass("show").removeClass("active");
            });
            $('a[class="nav-link dropdown-toggle active"]').each(function(){
                $(this).removeClass("active");
            });
            $('a[class="dropdown-item active show"]').each(function(){
                $(this).removeClass("show").removeClass("active");
            });
            $('a[class="list-group-item list-group-item-action active show"]').each(function(){
                $(this).removeClass("show").removeClass("active");
            });
            $("#btn-select-ship").prop("disabled", true);
        }
    });
    $("#dialog-select-equipment").dialog({
        autoOpen: false,
        modal: true,
        width: 900,
        title: "選択",
        resizable: false,
        close: function() {
            $("div[class*=active]").each(function(){
                $(this).removeClass("show").removeClass("active");
            });
            $('a[class="nav-link active show"]').each(function(){
                $(this).removeClass("show").removeClass("active");
            });
            $('a[class="nav-link dropdown-toggle active"]').each(function(){
                $(this).removeClass("active");
            });
            $('a[class="dropdown-item active show"]').each(function(){
                $(this).removeClass("show").removeClass("active");
            });
            $('a[class="list-group-item list-group-item-action active show"]').each(function(){
                $(this).removeClass("show").removeClass("active");
            });
            $("#btn-select-equipment").prop("disabled", true);
        }
    });
    $("#dialog-message").dialog({
        autoOpen: false,
        modal: true,
        // width: 900,
        title: "メッセージ",
        resizable: false,
    });
    $(".dialog-remove").on('click', function() {
        if (record_target.attr("id").split("-")[0] == "equipment") {
            removeItem(record_target.attr("id").split("-")[2], record_target.attr("id").split("-")[3], record_target.attr("id").split("-")[4])
            $("#dialog-select-equipment").dialog('close');
        } else {
            removeItem("ship", record_target.attr("id").split("-")[3])
            $("#dialog-select-ship").dialog('close');
        }
    });

    /**
     * ==========================================================
     * 編成画面関係
     * ==========================================================
     */

    $("#tab-fleet").tabs();
    $("#tab-fleet").tabs("option", "disabled", [1,2]);
    $("#tab-fleet").children("ul").show();
    $(".equipment-name-base").on("click", function() {
        record_target = $(this);
        for (var i=0; i<tab_type_equipment.length; i++) {
            if (i==7 || i==8 || i==11) {
                for (var j=0; j<tab_type_equipment[i].length; j++) {
                    var equipment_type = tab_type_equipment[i][j];
                    $("#tab-equipment-" + i + "-" + equipment_type).show();
                }
                $("#tab-equipment-" + i).show();
            } else {
                $("#tab-equipment-" + i).hide();
            }
        }
        openSelectDialog('equipment');
    });
    $(".equipment-name-ship").on("click", function() {
        record_target = $(this);
        var element_ship_id = $(this).attr("id").split("-")[3];
        var element_equipment_id = $(this).attr("id").split("-")[4]
        var ship_id = Number($("#grade-" + element_ship_id).val())
        var ship_type = data_ship_id[ship_id].type;

        for (var i=0; i<tab_type_equipment.length; i++) {
            var flag = 0;
            for (var j=0; j<tab_type_equipment[i].length; j++) {
                var equipment_type = tab_type_equipment[i][j];
                var data = data_equipment_type_ship[equipment_type];
                if (equipment_type == 20) {
                    for (var k=0; k<data.id.length; k++) {
                        $("#list-equipment-" + equipment_type + "-" + data.id[k]).show();
                    }
                }

                if (checkEquipmentTypeAvailable (element_equipment_id, ship_id, ship_type, equipment_type, true)) {
                    flag = 1;
                    $("#tab-equipment-" + i + "-" + equipment_type).show();
                } else {
                    $("#tab-equipment-" + i + "-" + equipment_type).hide();
                }
            }
            if (flag) {
                $("#tab-equipment-" + i).show();
            } else {
                $("#tab-equipment-" + i).hide();
            }
        }
        openSelectDialog('equipment');
    });
    $(".ship-name").on("click", function() {
        record_target = $(this);
        openSelectDialog('ship');
    });
    $(".grade select").on('changed.bs.select', function(){
        setShipItem($(this).val(), $(this).attr("id").split('-')[1]);
    });
    $(".space select").on('changed.bs.select', function(){
        var element_target_type = $(this).attr("id").split("-")[1];
        var element_target_id = $(this).attr("id").split("-")[2];
        var element_equipment_id = $(this).attr("id").split("-")[3];
        updateAirPowerFrends(element_target_type, element_target_id, element_equipment_id)
    });
    $(".improvement select").on('changed.bs.select', function(){
        var element_target_type = $(this).attr("id").split("-")[1];
        var element_target_id = $(this).attr("id").split("-")[2];
        var element_equipment_id = $(this).attr("id").split("-")[3];
        updateAirPowerFrends(element_target_type, element_target_id, element_equipment_id)
    });
    $(".skill select").on('changed.bs.select', function(){
        var element_target_type = $(this).attr("id").split("-")[1];
        var element_target_id = $(this).attr("id").split("-")[2];
        var element_equipment_id = $(this).attr("id").split("-")[3];
        updateAirPowerFrends(element_target_type, element_target_id, element_equipment_id)
    });
    $("#reset-base").on("click", function() {
        openMessageDialog("reset-base", "基地航空隊をリセットしますか？")
    })
    $("#reset-ship").on("click", function() {
        openMessageDialog("reset-ship", "艦隊をリセットしますか？")
    })
    $(".equipment-toggle").on('click', function() {
        toggleDisplayEquipment($(this).attr('id').split("-")[0], Number($(this).attr('id').split("-")[1]))
    });
    $(".checkbox").change(function() {
        var type = $(this).attr("id").split("-")[2]
        var id = $(this).attr("id").split("-")[3]
        var line = (type == "base") ? 3 : 19;
        var item = (type == "base") ? 4 : 6;
        for (var i=0; i<line; i++) {
            for (var j=0; j<item; j++) {
                if ($("#equipment-name-" + type + "-" + i + "-" + j).children().length == 0) {
                    continue;
                }
                var element_skill = $("#skill-" + type + "-" + i + "-" + j);
                var equipment_type = data_equipment_id_ship[record_ship[i][j].id].type;
                // var equipment_type = Number($("#equipment-name-" + type + "-" + i + "-" + j).children("img").attr("src").split("/")[3].split(".")[0]);

                if (id == 0) {
                    switch (equipment_type) {
                        case 6:
                        case 45:
                        case 48:
                        case 49:
                        case 52:
                            if ($(this).is(":checked")) {
                                element_skill.val(7).selectpicker('refresh');
                            } else {
                                element_skill.val(0).selectpicker('refresh');
                            }
                        default:
                    }
                } else {
                    switch (equipment_type) {
                        case 7:
                        case 8:
                        case 11:
                        case 47:
                        case 53:
                        case 54:
                        case 57:
                            if ($(this).is(":checked")) {
                                element_skill.val(7).selectpicker('refresh');
                            } else {
                                element_skill.val(0).selectpicker('refresh');
                            }
                        default:
                    }
                }
            }
        }
    });
    $("h1 > button").on("click", function() {
        var content = $("#" + $(this).attr("id").split("-")[3] + "-content");
        content.toggle();
        if (content.css("display") == "none") {
            $(this).empty().text("▽")
        } else {
            $(this).empty().text("△")
        }
        footerFixed();
    })
    $("[name=fleet]").change(function() {
        var tab = $("#tab-fleet")
        switch (Number($(this).val())) {
            case 0:
                tab.tabs("option","disabled",[1,2]);
                tab.tabs("option","active",0);
                break;
            case 1:
                tab.tabs("option","disabled",[2]);
                tab.tabs("option","active",0);
                break;
            case 2:
                tab.tabs("option","disabled",[0,1]);
                tab.tabs("option","active",2);
                break;
            default:
        }
        footerFixed();
    })
    $('input[class*="airpower"]').each(function(){
        $(this).keypress(function(e){
            var str = $(this).val()
            var pattern = new RegExp("[^0-9]")
            if (str.length >= 3 || pattern.test(e.key) || (str == 0 && e.key == 0)) {
                e.preventDefault();
            }
        })
        $(this).keyup(function(e){
            var str = $(this).val()
            $(this).val(Number(str));
            // var pattern = new RegExp("[^0-9]")
            // $(element).val(Number(str.replace(pattern, "")));
        })
    });
    $('input[class*="downRate"]').each(function(){
        $(this).keypress(function(e){
            var str = $(this).val()
            var pattern = new RegExp("[^0-9]")
            if (Number(str) > 10 || (Number(str) == 10 && e.key != 0) || pattern.test(e.key) || (str == 0 && e.key == 0)) {
                e.preventDefault();
            }
        })
        $(this).keyup(function(e){
            var str = $(this).val()
            $(this).val(Number(str));
        })
    });
    $(".base-name").each(function(){
        addDDEvent(this);
    });
    $(".ship-name").each(function(){
        addDDEvent(this);
    });
    $(".equipment-name-base").each(function(){
        addDDEvent(this);
    });
    $(".equipment-name-ship").each(function(){
        addDDEvent(this);
    });

    /**
     * ==========================================================
     * MAP画面関係
     * ==========================================================
     */
    $("#map-area").on('changed.bs.select', function(){
        changeArea($(this).val());
    });
    $('input[name="difficulty"]:radio').change(function() {
        changeDiffculty($("[name=difficulty]:checked").val());
    });
    $("#map-cell").on('changed.bs.select', function(){
        changeCell($(this).val());
        simulatePhase();
    });
    $('input[name="enemy-fleet-step"]:radio').change(function() {
        changeStep($("[name=enemy-fleet-step]:checked").val());
    });

    /**
     * ==========================================================
     * 結果画面関係
     * ==========================================================
     */
    chart = Highcharts.chart('myChart', {
        chart: {
            type: 'bar'
        },
        title: {
            text: null
        },
        xAxis: {
            categories: ['1-1', '1-2', '2-1', '2-2', '3-1', '3-2', '本隊'],
            tickPosition: 'inside'
        },
        yAxis: {
            // min: 0,
            // max: 20/6,
            title: {
                text: null
            },
            //     gridLineWidth: 0,
            //     lineWidth: 1, lineColor: "black",
            //     tickWidth: 2, tickLength: 6, tickColor: "black",
            tickPositions: [0, 1/3, 2/3, 1.5, 3, 3.5],
            labels: {
                y: 20,
                style: { color: "black", fontSize: "14px" },
                formatter: function() {
                    switch (this.value) {
                        case 0:   return "喪失";
                        case 1/3: return "劣勢";
                        case 2/3: return "均衡";
                        case 1.5: return "優勢";
                        case 3:   return "確保";
                        default:  return "";
                    }
                }
            },
            // tickInterval: 1/6,
            // labels: {
            //     formatter: function() {
            //         switch (Math.floor(this.value*1000)/1000) {
            //             case Math.floor(2*1000/6)/1000:
            //                 return "劣勢";
            //             case Math.floor(4*1000/6)/1000:
            //                 return "均衡";
            //             case Math.floor(9*1000/6)/1000:
            //                 return "優勢";
            //             case Math.floor(18*1000/6)/1000:
            //                 return "確保";
            //         }
            //     },
            //     autoRotation: [0],
            //     overflow: 'justify'
            // },
            plotLines: [
                {
                    value: 2/6,
                    color: 'green',
                    dashStyle: 'shortdash',
                    width: 2,
                    zIndex: 4
                }
            ]
        },
        tooltip: {
            enabled: false
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: false
                }
            }
        },
        legend: {
            enabled: false
        },
        credits: {
            enabled: false
        },
        series:[{
            name: 'test',
            type: 'column',
            data: [2,3.5,0,0,0,0,0]
        }, {
            name: 'test2',
            type: 'errorbar',
            data: [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]]
        }]
    })
});

// var chart = new Highcharts.Chart("chart", {
//   chart: {
//     type: "bar",
//     backgroundColor: "#f8f8f8",
//     marginLeft: 20,
//     spacing: [9, 10, 7, 10]
//   },
//   title: { text: null },
//   credits: { enabled: false },
//   legend: { enabled: false },
//   tooltip: { enabled: false },
//   xAxis: { labels: { enabled: false }, lineWidth: 0, tickLength: 0 },
//   yAxis: {
//     title: { text: null },
//     gridLineWidth: 0,
//     lineWidth: 1, lineColor: "black",
//     tickWidth: 2, tickLength: 6, tickColor: "black",
//     tickPositions: [0, 1/3, 2/3, 1.5, 3, 3.5],
//     labels: {
//       y: 20,
//       style: { color: "black", fontSize: "14px" },
//       formatter: function() {
//         switch (this.value) {
//           case 0:   return "喪失";
//           case 1/3: return "劣勢";
//           case 2/3: return "均衡";
//           case 1.5: return "優勢";
//           case 3:   return "確保";
//           default:  return "";
//         }
//       }
//     }
//   },
//   series: [
//     { data: [0], pointWidth: 9 },
//     { type: "errorbar", data: [[0, 0]], color: "#3050ff", whiskerLength: "60%", visible: false }
//   ]
// });

// <script src="https://code.highcharts.com/highcharts-more.js"></script>
// chart.series[0].setData([129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4], true);
