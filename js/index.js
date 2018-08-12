var drag_source = null;
var record;
var record_target = "";
var slider = null;
var chart = null;
var record_base;
var record_ship;
var record_option;
const aircraft_type_id = [7, 8, 9, 10, 11, 45, 47, 48, 57];
const tab_type_ship = [
    [2], 3, 4, 5, 6, [8, 9], 10, 7, 11, 18, 16, [1, 13, 14, 21, 17, 19, 20, 22]
];
const tab_type_equipment = [
    [1, 16, 2, 3],
    [4, 20],
    [5, 32, 22],
    [12, 13, 51],
    [14, 15, 40, 25, 26],
    [18, 19, 37],
    [24, 46, 30, 50],
    [10, 11, 45, 41],
    [6, 52, 7, 8, 53, 9, 56, 57],
    [17, 21, 27, 28],
    [29, 42, 33, 39],
    [47, 54, 48, 49],
    [23, 31, 34, 35, 36, 43, 44]
];

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
    }).done(function(data, textStatus, xhr) {
        switch (json_url.split("/")[1]) {
            case "ship_type.json":
                data_ship_type = data;
                break;
            case "ship_id.json":
                data_ship_id = data;
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
    console.info("getJson: " + (json_url.split("/")[1] + " end"))
}

function preload() {
    Object.keys(data_map).forEach(function(key) {
        Object.keys(this[key]).forEach(function(key2) {
            $("<img>").attr("src", "img/map/" + key + "-" + key2 + ".png");
        })
    }, data_map)
    Object.keys(data_enemy_id).forEach(function(key) {
        $("<img>").attr("src", "img/enemy/banner/" + key + ".png");
    })
    Object.keys(data_ship_id).forEach(function(key) {
        $("<img>").attr("src", "img/ship/banner/" + key + ".png");
    })
    console.info("preload end");
}


var p10 = Promise.all([p1, p2, p3, p4, p5]).then(function() {

    /**
     * ==========================================================
     * dialog関係
     * ==========================================================
     */
    $("#dialog-select-ship").append(displayListShip());
    $("#dialog-select-equipment").append(displayListEquipment());
    $("#dialog-select-ship").dialog({
        autoOpen: false,
        modal: true,
        width: 900,
        title: "選択",
        resizable: false,
        close: function() {
            $("div[class*=active]").each(function() {
                $(this).removeClass("show").removeClass("active");
            });
            $('a[class="nav-link active show"]').each(function() {
                $(this).removeClass("show").removeClass("active");
            });
            $('a[class="nav-link dropdown-toggle active"]').each(function() {
                $(this).removeClass("active");
            });
            $('a[class="dropdown-item active show"]').each(function() {
                $(this).removeClass("show").removeClass("active");
            });
            $('a[class="list-group-item list-group-item-action active show"]').each(function() {
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
            $("div[class*=active]").each(function() {
                $(this).removeClass("show").removeClass("active");
            });
            $('a[class="nav-link active show"]').each(function() {
                $(this).removeClass("show").removeClass("active");
            });
            $('a[class="nav-link dropdown-toggle active"]').each(function() {
                $(this).removeClass("active");
            });
            $('a[class="dropdown-item active show"]').each(function() {
                $(this).removeClass("show").removeClass("active");
            });
            $('a[class="list-group-item list-group-item-action active show"]').each(function() {
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
    $('a[class="list-group-item list-group-item-action"]').on("shown.bs.tab", function(e) {
        $("#btn-select-" + $(this).attr("href").split("-")[1]).prop("disabled", false);
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
    $(".list-group-item-action").dblclick(function() {
        if (record_target.attr("id").split("-")[0] == "equipment") {
            selectItem('equipment')
        } else {
            selectItem('ship')
        }
    })
    console.info("dialog display");
})
var p11 = Promise.all([p9]).then(function() {
    /**
     * ==========================================================
     * MAP画面関係
     * ==========================================================
     */
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
    $("#map-area").on('changed.bs.select', function() {
        changeArea($(this).val(), true);
        updateResult();
        updateRecord(0, false)
    });
    $('input[name="difficulty"]:radio').change(function() {
        changeDiffculty($("[name=difficulty]:checked").val(), true);
        updateResult();
        updateRecord(0, false)
    });
    $("#map-cell").on('changed.bs.select', function() {
        changeCell($(this).val(), true);
        updateResult();
        updateRecord(0, false)
    });
    $('input[name="enemy-fleet-step"]:radio').change(function() {
        changeStep($("[name=enemy-fleet-step]:checked").val(), true);
        updateResult();
        updateRecord(0, false)
    });
    console.info("map display");
})
Promise.all([p10, p11]).then(function() {
    preload()
    expandRecord(0);
    console.info("expand record");
})

$(function() {
    console.info("function() start");
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
     * 編成画面関係
     * ==========================================================
     */
    $("#tab-fleet").tabs();
    $("#tab-fleet").tabs("option", "disabled", [1, 2]);
    $("#tab-fleet").children("ul").show();
    $(".equipment-name-base").on("click", function() {
        record_target = $(this);
        if (record_target.text().indexOf("装備選択") == -1) {
            $(".dialog-remove").prop("disabled", false)
        } else {
            $(".dialog-remove").prop("disabled", true)
        }

        for (let i = 0; i < tab_type_equipment.length; i++) {
            switch (i) {
                case 7:
                case 8:
                case 11:
                    for (var j = 0; j < tab_type_equipment[i].length; j++) {
                        var equipment_type = tab_type_equipment[i][j];
                        $("#tab-equipment-" + i + "-" + equipment_type).show();
                    }
                    $("#tab-equipment-" + i).show();
                    break;
                default:
                    $("#tab-equipment-" + i).hide();
            }
        }
        openSelectDialog('equipment');
    });
    $(".equipment-name-ship").on("click", function() {
        record_target = $(this);
        let element_ship_id = $(this).attr("id").split("-")[3];
        let element_equipment_id = $(this).attr("id").split("-")[4]
        let ship_id = Number($("#grade-" + element_ship_id).val())
        let ship_type = data_ship_id[ship_id].type;
        if (record_target.text().indexOf("装備選択") == -1 && record_target.text().indexOf("補強増設") == -1) {
            $(".dialog-remove").prop("disabled", false)
        } else {
            $(".dialog-remove").prop("disabled", true)
        }

        for (let i = 0; i < tab_type_equipment.length; i++) {
            let flag = 0;
            for (let j = 0; j < tab_type_equipment[i].length; j++) {
                let equipment_type = tab_type_equipment[i][j];
                let data = data_equipment_type_ship[equipment_type];
                if (equipment_type == 20) {
                    for (var k = 0; k < data.id.length; k++) {
                        $("#list-equipment-" + equipment_type + "-" + data.id[k]).show();
                    }
                }

                if (checkEquipmentTypeAvailable(element_equipment_id, ship_id, ship_type, equipment_type, true)) {
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
        if (record_target.text().indexOf("艦娘") == -1) {
            $(".dialog-remove").prop("disabled", false)
        } else {
            $(".dialog-remove").prop("disabled", true)
        }
        openSelectDialog('ship');
    });
    $(".grade select").on('changed.bs.select', function() {
        setShipItem($(this).val(), $(this).attr("id").split('-')[1], false, true);
        updateResult();
        updateRecord(0, false)
    });
    $(".space select").on('changed.bs.select', function() {
        let element_target_type = $(this).attr("id").split("-")[1];
        let element_target_id = $(this).attr("id").split("-")[2];
        let element_equipment_id = $(this).attr("id").split("-")[3];
        updateAirPowerFrends(element_target_type, element_target_id, element_equipment_id)
        if (element_target_type === "base") {
            record_base[element_target_id][element_equipment_id].space = Number($("#space-" + element_target_type + "-" + element_target_id + "-" + element_equipment_id).val());
        } else {
            record_ship[element_target_id][element_equipment_id].space = Number($("#space-" + element_target_type + "-" + element_target_id + "-" + element_equipment_id).val());
        }
        updateResult();
        updateRecord(0, false)
    });
    $(".improvement select").on('changed.bs.select', function() {
        let element_target_type = $(this).attr("id").split("-")[1];
        let element_target_id = $(this).attr("id").split("-")[2];
        let element_equipment_id = $(this).attr("id").split("-")[3];
        updateAirPowerFrends(element_target_type, element_target_id, element_equipment_id)
        if (element_target_type === "base") {
            record_base[element_target_id][element_equipment_id].improvement = Number($("#improvement-" + element_target_type + "-" + element_target_id + "-" + element_equipment_id).val());
        } else {
            record_ship[element_target_id][element_equipment_id].improvement = Number($("#improvement-" + element_target_type + "-" + element_target_id + "-" + element_equipment_id).val());
        }
        updateResult();
        updateRecord(0, false)
    });
    $(".skill select").on('changed.bs.select', function() {
        let element_target_type = $(this).attr("id").split("-")[1];
        let element_target_id = $(this).attr("id").split("-")[2];
        let element_equipment_id = $(this).attr("id").split("-")[3];
        updateAirPowerFrends(element_target_type, element_target_id, element_equipment_id)
        if (element_target_type === "base") {
            record_base[element_target_id][element_equipment_id].skill = Number($("#skill-" + element_target_type + "-" + element_target_id + "-" + element_equipment_id).val());
        } else {
            record_ship[element_target_id][element_equipment_id].skill = Number($("#skill-" + element_target_type + "-" + element_target_id + "-" + element_equipment_id).val());
        }
        updateResult();
        updateRecord(0, false)
    });
    $("#reset-base").on("click", function() {
        openMessageDialog("reset-base", "基地航空隊をリセットしますか？")
    })
    $("#reset-ship").on("click", function() {
        openMessageDialog("reset-ship", "艦隊をリセットしますか？")
    })
    // next or prev
    $(".equipment-toggle").on('click', function() {
        toggleDisplayEquipment($(this).attr('id').split("-")[0], Number($(this).attr('id').split("-")[1]))
    });
    $(".checkbox").change(function() {
        let type = $(this).attr("id").split("-")[2]
        let id = $(this).attr("id").split("-")[3]
        let line = (type == "base") ? 3 : 19;
        let item = (type == "base") ? 4 : 6;
        for (let i = 0; i < line; i++) {
            for (let j = 0; j < item; j++) {
                if ($("#equipment-name-" + type + "-" + i + "-" + j).children().length == 0) continue;

                let element_skill = $("#skill-" + type + "-" + i + "-" + j);
                let equipment_type = data_equipment_id_ship[record_ship[i][j].id].type;

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
                            updateAirPowerFrends(type, i, j)
                            if (type === "base") {
                                record_base[i][j].skill = Number($("#skill-" + type + "-" + i + "-" + j).val());
                            } else {
                                record_ship[i][j].skill = Number($("#skill-" + type + "-" + i + "-" + j).val());
                            }
                            break;
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
                            updateAirPowerFrends(type, i, j)
                            if (type === "base") {
                                record_base[i][j].skill = Number($("#skill-" + type + "-" + i + "-" + j).val());
                            } else {
                                record_ship[i][j].skill = Number($("#skill-" + type + "-" + i + "-" + j).val());
                            }
                            break;
                        default:
                    }
                }
            }
        }
        updateResult();
        updateRecord(0, false)
    });
    $("h1 > button").on("click", function() {
        let content = $("#" + $(this).attr("id").split("-")[3] + "-content");
        content.toggle();
        if (content.css("display") == "none") {
            $(this).empty().text("▽")
        } else {
            $(this).empty().text("△")
        }
        footerFixed();
    })
    $("[name=fleet]").change(function() {
        changeFleet(Number($(this).val()));
        record_option.fleet = Number($(this).val())
        updateResult();
        updateRecord(0, false)
    })
    $('input[class*="airpower"]').each(function() {
        $(this).on("input", function(e) {
            let str = $(this).val();
            while (str.match(/[^\d]/)) {
                str = str.replace(/[^\d]/, "");
            }
            $(this).val(str);
            updateResult();
        })
        $(this).keypress(function(e) {
            let str = $(this).val()
            if (str.length >= 3) {
                e.preventDefault();
            }
        })
        $(this).change(function(e) {
            let str = $(this).val()
            $(this).val(Number(str));
        })
    });
    $(".base-name").each(function() {
        addDDEvent(this);
    });
    $(".ship-name").each(function() {
        addDDEvent(this);
    });
    $(".equipment-name-base").each(function() {
        addDDEvent(this);
    });
    $(".equipment-name-ship").each(function() {
        addDDEvent(this);
    });

    /**
     * ==========================================================
     * 結果画面関係
     * ==========================================================
     */

    $(".downRate").slider({
        ticks: [0, 50, 100],
        // ticks_labels: ['0%', '50%', '100%'],
        min: 0,
        max: 20,
        step: 10,
        value: 0
    });

    $("#detail-downRate").tooltip();

    $(".downRate").change(function() {
        let id = Number($(this).attr("id").split("-")[1])
        record_option.downRate[id] = Number($(this).val())
        updateResult();
        updateRecord(0, false)
    });

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
            title: {
                text: null
            },
            tickPositions: [0, 1 / 3, 2 / 3, 1.5, 3, 3.5],
            labels: {
                y: 20,
                style: {
                    color: "black",
                    fontSize: "14px"
                },
                formatter: function() {
                    switch (this.value) {
                        case 0:
                            return "喪失";
                        case 1 / 3:
                            return "劣勢";
                        case 2 / 3:
                            return "均衡";
                        case 1.5:
                            return "優勢";
                        case 3:
                            return "確保";
                        default:
                            return "";
                    }
                }
            },
            plotLines: [{
                value: 2 / 6,
                color: 'green',
                dashStyle: 'shortdash',
                width: 2,
                zIndex: 4
            }]
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
        series: [{
            name: 'test',
            type: 'column',
            data: [0, 0, 0, 0, 0, 0, 0]
        }, {
            name: 'test2',
            type: 'errorbar',
            data: [
                [0, 0],
                [0, 0],
                [0, 0],
                [0, 0],
                [0, 0],
                [0, 0],
                [0, 0]
            ]
        }]
    })
    console.info("function() end");
});
