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
                    for (var i=0; i<3; i++) {
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
                    for (var i=0; i<19; i++) {
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
    }
    $("#dialog-message").html(message).dialog("open")
}

/**
 * ==========================================================
 * バリデーションチェック関係
 * ==========================================================
 */
function checkEquipmentAvailable(equipment_type, ship_id, ship_type, expansion_flag) {
    var data = data_equipment_type_ship[equipment_type];

    if (!expansion_flag) {
        if (data.exclusion_ship_id.indexOf(ship_id) != -1) {
            return false;
            } else {
         if (data.available_ship_type.indexOf(ship_type) != -1 || data.available_ship_id.indexOf(ship_id) != -1) {
                return true;
            } else {
                return false;
            }
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
    var result = [];
    var data = data_equipment_type_ship[equipment_type];

    switch (equipment_type) {
        case 20:
            for (var i=0; i<data.expansion_ship_id.length; i++) {
                if (data.expansion_ship_id[i].indexOf(ship_id) != -1) {
                    result = data.expansion_equipment_id[i];
                }
            }
            return result;
            break;
        default:
    }
}

function checkEquipmentTypeAvailable(element_equipment_id, ship_id, ship_type, equipment_type, tab_flag) {
    if (equipment_type == 0) {
        return true;
    }
    if (element_equipment_id != data_ship_id[ship_id].slot) {
        if (checkEquipmentAvailable(equipment_type, ship_id, ship_type, false)) {
            return true;
        } else {
            return false;
        }
    } else if (equipment_type == 20) {
        var result = checkEquipmentAvailableException(equipment_type, ship_id);
        if (result.length != 0) {
            return true;
        } else {
            return false;
        }
        if (tab_flag) {
            for (var i=0; i<data_equipment_type_ship[equipment_type].id.length; i++) {
                if (result.indexOf(data.id[i]) != -1) {
                    $("#list-equipment-" + equipment_type + "-" + data_equipment_type_ship[equipment_type].id[i]).show();
                } else {
                    $("#list-equipment-" + equipment_type + "-" + data_equipment_type_ship[equipment_type].id[i]).hide();
                }
            }
        }
    } else {
        if (checkEquipmentAvailable(equipment_type, ship_id, ship_type, true)) {
            return true;
        } else {
            return false;
        }
    }
}

function checkCombatRadius() {
    var area = record_map["area"]
    var difficulty = record_map["difficulty"]
    var cell = record_map["cell"]
    var radius_area = data_map[area.split("-")[0]][area.split("-")[1]][difficulty][cell].radius;

    for (var i=0; i<6; i++) {
        if ($("[name=activate-base-" + i + "]:checked").val() != 0) {
            var base_num = Math.floor(i/2);
            var radius_base = Number($("#radius-" + base_num).text())
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

function strWidth(str, size, family) {
    var element = $("#ruler");
    element.css({"font-size":size, "font-family": family});
    var width = element.text(str).get(0).offsetWidth;
    element.empty();
    return width;
}
