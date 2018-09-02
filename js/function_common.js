/**
 * ==========================================================
 * dialog関係
 * ==========================================================
 */

/**
 * [openSelectDialog 艦娘または装備選択用ダイアログを表示する]
 * @param  {string} type [ship or equipment]
 */
function openSelectDialog(type) {
    $("#dialog-select-" + type).dialog("open");
    // $(".downRate").slider({ticks: [0, 50, 100], min: 0, max: 10, step: 10, value: 0, tooltip: "hide"}).slider("refresh")
    $(".downRate").each(function(i) {
        $(this).slider("setAttribute", "tooltip", "hide").slider("refresh").slider('setValue', record_option.downRate[i]);
    })
}
/**
 * [openMessageDialog description]
 * @param  {[type]} type    [description]
 * @param  {[type]} message [description]
 * @return {[type]}         [description]
 */
function openMessageDialog(type, message) {
    if (type == "reset-base") {
        $("#dialog-message").dialog({
            buttons: {
                'OK': function () {
                    for (let i=0; i<3; i++) {
                        removeItem("base", i)
                    }
                    $(this).dialog('close');
                },
                'Cancel': function () {
                    $(this).dialog('close');
                }
            }
        });
    } else if (type == "reset-ship") {
        $("#dialog-message").dialog({
            buttons: {
                'OK': function () {
                    for (let i=0; i<19; i++) {
                        removeItem("ship", i)
                    }
                    $(this).dialog('close');
                },
                'Cancel': function () {
                    $(this).dialog('close');
                }
            }
        });
    } else if (type == "deckbuilder") {
        $("#dialog-message").dialog({
            buttons: {
                'OK': function() {
                    $(this).dialog('close');
                }
            }
        })
    } else if (type == "delete-history") {
        $("#dialog-message").dialog({
            buttons: {
                'OK': function() {
                    updateRecord(Number($("#history-name").val()), true, null);
                    $("#history-name option:selected").remove();
                    $("#history-name").selectpicker('val', 0).selectpicker("refresh");
                    $(this).dialog('close');
                },
                'Cancel': function () {
                    $(this).dialog('close');
                }
            }
        })
    }
    $("#dialog-message").html(message).dialog("open")
}

/**
 * ==========================================================
 * バリデーションチェック関係
 * ==========================================================
 */
function checkEquipmentAvailable(equipment_type, ship_id, ship_type, expansion_flag) {
    let data = data_equipment_type_ship[equipment_type];
    if (!expansion_flag) {
        if (data.exclusion_ship_id.indexOf(ship_id) != -1) {
            return false;
        } else if (data.available_ship_type.indexOf(ship_type) != -1 || data.available_ship_id.indexOf(ship_id) != -1) {
            return true;
        } else {
            return false;
        }
    } else {
        if (equipment_type == 20) {
            return false;
        } else if (data.expansion_ship_type.indexOf(ship_type) != -1) {
            return true;
        } else {
            return false;
        }
    }
}

function checkEquipmentAvailableException(equipment_type, ship_id) {
    let result = [];
    let data = data_equipment_type_ship[equipment_type];

    switch (equipment_type) {
        case 20:
            for (let i=0; i<data.expansion_ship_id.length; i++) {
                if (data.expansion_ship_id[i].indexOf(ship_id) != -1) result = data.expansion_equipment_id[i];
            }
            return result;
            break;
    }
    return result;
}

function checkEquipmentTypeAvailable(element_equipment_id, ship_id, ship_type, equipment_type, tab_flag) {
    if (equipment_type == 0) return true;

    // 伊勢改二の大型・中型主砲(第1,2スロット)
    if (ship_id == 553 && (equipment_type == 2 || equipment_type == 3)) {
        if (element_equipment_id == 0 || element_equipment_id == 1) {
            return true;
        } else {
            return false;
        }
    }

    // 通常スロットか補強増設か、補強増設時の副砲
    if (element_equipment_id != data_ship_id[ship_id].slot) {
        if (checkEquipmentAvailable(equipment_type, ship_id, ship_type, false)) {
            return true;
        } else {
            return false;
        }
    } else {
        // 高角副砲
        if (equipment_type == 20) {
            let result = checkEquipmentAvailableException(equipment_type, ship_id);
            if (tab_flag) {
                for (let i=0; i<data_equipment_type_ship[equipment_type].id.length; i++) {
                    if (result.length == 0) break;
                    if (result.indexOf(data.id[i]) != -1) {
                        $("#list-equipment-" + equipment_type + "-" + data_equipment_type_ship[equipment_type].id[i]).show();
                    } else {
                        $("#list-equipment-" + equipment_type + "-" + data_equipment_type_ship[equipment_type].id[i]).hide();
                    }
                }
            }
            if (result.length != 0) {
                return true;
            } else {
                return false;
            }
        }

        if (checkEquipmentAvailable(equipment_type, ship_id, ship_type, true)) {
            return true;
        } else {
            return false;
        }
    }
}

function checkCombatRadius() {
    let area = record_map["area"]
    let difficulty = record_map["difficulty"]
    let cell = record_map["cell"]
    let radius_area = data_map[area.split("-")[0]][area.split("-")[1]][difficulty][cell].radius;

    for (let i=0; i<6; i++) {
        if ($("[name=activate-base-" + i + "]:checked").val() != 0) {
            let base_num = Math.floor(i/2);
            let radius_base = Number($("#radius-" + base_num).text())
            if (radius_base < radius_area) {
                return false;
            }
        }
    }
    return true;
}

/**
 * ==========================================================
 * その他
 * ==========================================================
 */
function parseStrToBoolean(str) {
    // 文字列を判定
    return (str == 'true') ? true : false;
}

function getFontSize(str, default_size, family, element_width) {
    let element = $("#checkWidth")
    let size = default_size
    element.css({"font-size":size, "font-family": family, "white-space":"nowrap"});
    while(1) {
        let width = element.text(str).get(0).offsetWidth;
        element.empty();
        if (!width) return 0;
        if (element_width > width) return size;
        size -= 1;
        element.css("font-size", size);
    }
}
