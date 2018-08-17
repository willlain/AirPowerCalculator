/**
 * ==========================================================
 * デッキビルダー・記録関係
 * ==========================================================
 */

/**
 * [inputDeckbuilder デッキビルダー入力を反映する]
 * トリガー：デッキビルダー入力ボタンを押す
 * JSON形式が異なっている場合はエラーを出力する
 */
function inputDeckbuilder() {
    let input, num, element_ship_id, ship_id, element_grade, equipmet_id, equipment_type;

    try {
        input = JSON.parse($("#deckbuilder").val());
    } catch (e) {
        openMessageDialog("deckbuilder", "入力が不正です。<br>" + e.message);
        return;
    }
    Object.keys(input).forEach(function(key){
        switch (key) {
            case "f1":
            case "f2":
            case "f3":
                num = (Number(key.substr(-1))-1)*6;
                Object.keys(input[key]).forEach(function(key2,index2){
                    element_ship_id = index2 + num;
                    // var element_ship = $("#ship-name-" + element_ship_id);
                    ship_id = this[key2].id
                    element_grade = $("#grade-" + element_ship_id);
                    setShipItem(ship_id, element_ship_id, true, false);
                    Object.keys(input[key][key2].items).forEach(function(key3,index3){
                        equipment_id = this[key3].id;
                        equipment_type = data_equipment_id_ship[equipment_id].type

                        setEquipmentItem("ship", element_ship_id, index3, equipment_type, equipment_id, this[key3].rf, this[key3].mas)

                    }, input[key][key2].items)
                }, input[key])
                break;
            default:
        }
    });
    updateRecord(0, false)
}

/**
 * [outputDeckbuilder 現在の艦娘編成をデッキビルダー形式で出力する]
 * トリガー：デッキビルダー出力ボタンを押す
 * Lvは99、運は初期運を出力する
 * 出力内容はクリップボードにコピーされた状態になる
 * デッキビルダーで反映されない場合あり（デッキビルダー側のバグ？）
 */
function outputDeckbuilder() {
    let output = {
        "version": 4,
        "f1": {},
        "f2": {},
        "f3": {}
    }

    let fleet, ship_num, item_num;
    Object.keys(record_ship).forEach(function(key) {
        if (record_ship[key].id != 0) {
            fleet = (key == 18) ? "f3" : "f" + (Math.floor(key/6)+1);
            ship_num = (key == 18) ? "s7" : "s" + (key%6 + 1)

            output[fleet][ship_num] = {
                "id": record_ship[key].id,
                "lv": 99,
                "luck": data_ship_id[record_ship[key].id].luck_min,
                "items": {}
            }
            Object.keys(record_ship[key]).forEach(function(key2) {
                if (key2 != "id" && Number(key2) <= data_ship_id[this.id].slot && this[key2].id != 0) {
                    item_num = (Number(key2) == data_ship_id[this.id].slot) ? "ix" : "i" + (Number(key2)+1)
                    output[fleet][ship_num]["items"][item_num] = {
                        "id": this[key2].id,
                        "rf": this[key2].improvement,
                        "mas": this[key2].skill
                    }
                }
            }, record_ship[key]);
        }
    });

    $("#deckbuilder").val(JSON.stringify(output));
    document.getElementById("deckbuilder").select();
    document.execCommand("Copy");
    $("[data-toggle='tooltip']").attr("title", "編成をクリップボードにコピーしました" );
    $("[data-toggle='tooltip']").on('hidden.bs.tooltip', function(){
        $(this).tooltip('dispose');
    });
    $("[data-toggle='tooltip']").tooltip({delay:{show:0, hide:1000}}).tooltip('show').tooltip('toggle');
    $("[data-toggle='tooltip']").removeAttr("title");
}

/**
 * [expandRecord 履歴をlocalStorageから読み込み、反映させる]
 * @param  {int} num [反映させる記録番号]
 * トリガー：履歴反映ボタンを押した際、初期読み込み時
 * localStorageが利用できない場合は利用できない
 */
function expandRecord(num) {
    if (('localStorage' in window) && (window.localStorage !== null) && localStorage.getItem("record")) {
        record = JSON.parse(localStorage.getItem("record"));
        record_base = JSON.parse(localStorage.getItem("record"))[num].base;
        record_ship = JSON.parse(localStorage.getItem("record"))[num].ship;
        record_map = JSON.parse(localStorage.getItem("record"))[num].map;
        record_option = (JSON.parse(localStorage.getItem("record"))[num].option) ? JSON.parse(localStorage.getItem("record"))[num].option : {"skill_ship": [0,0], "skill_base": [0,0], "fleet": 0, "downRate": [0,0,0,0,0,0]};
        Object.keys(record_base).forEach(function(key){
            Object.keys(this[key]).forEach(function(key2){
                if (this[key2].id != 0) {
                    setEquipmentItem("base", key, key2, data_equipment_id_ship[this[key2].id].type, this[key2].id, this[key2].improvement, this[key2].skill)
                    let space = this[key2].space;
                    switch (data_equipment_id_ship[this[key2].id].type) {
                        case 9:
                        case 10:
                        case 41:
                        case 56:
                            space = (this[key2].space > 4) ? 4 : this[key2].space;
                            break;
                        default:
                    }
                    $("#space-base-" + key + "-" + key2).val(space).selectpicker('refresh');
                }
            }, record_base[key])
        }, record_base);
        Object.keys(record_ship).forEach(function(key){
            if (this[key].id != 0) {
                setShipItem(this[key].id, key, true, false);
            }
            Object.keys(this[key]).forEach(function(key2){
                if (key2 != "id" && this[key2].id != 0) {
                    setEquipmentItem("ship", key, key2, data_equipment_id_ship[this[key2].id].type, this[key2].id, this[key2].improvement, this[key2].skill)
                    $("#space-ship-" + key + "-" + key2).val(this[key2].space).selectpicker('refresh');
                }
            }, record_ship[key])
        }, record_ship);
        if (record_map.area != 0) {
            $("#map-area").val(record_map.area).selectpicker('refresh');
            changeArea(record_map.area, false);
        }
        if (record_map.cell != 0) {
            $("#map-cell").val(record_map.cell).selectpicker('refresh');
            changeCell(record_map.cell, false);
        }
        if (record_map.difficulty != 0) {
            $('input[name="difficulty"]:eq(1)').prop('checked', true);
            changeDiffculty(record_map.difficulty, false);
        }
        if (record_map.step != 0) {
            $('input[name="enemy-fleet-step"]:eq(1)').prop('checked', true);
            changeStep(record_map.step, false);
        }
        if (record_option["skill_base"][0] != 0) {
            $("#skill-max-base-0").prop('checked', true);
        }
        if (record_option["skill_base"][1] != 0) {
            $("#skill-max-base-0").prop('checked', true);
        }
        if (record_option["skill_ship"][0] != 0) {
            $("#skill-max-base-0").prop('checked', true);
        }
        if (record_option["skill_ship"][1] != 0) {
            $("#skill-max-base-0").prop('checked', true);
        }
        if (record_option.fleet != 0) {
            $('input[name="fleet"]:eq(' + record[num].option["fleet"] + ')').prop('checked', true);
            changeFleet(record_option.fleet)
        }
        for (let i=0; i<6; i++) {
            if (record_option.downRate[i] == 0) continue;
            $("#downRate-" + i).slider('setValue', record_option.downRate[i]);
        }
        updateResult();
    } else {
        for (let i=0; i<3; i++) {
            record_base[i] = {}
            for (let j=0; j<4; j++) {
                record_base[i][j] = {
                    "id": 0,
                    "improvement": 0,
                    "skill": 0,
                    "space": 18
                }
            }
        }
        for (let i=0; i<19; i++) {
            record_ship[i] = {"id":0}
            for (let j=0; j<6; j++) {
                record_ship[i][j] = {
                    "id": 0,
                    "improvement": 0,
                    "skill": 0,
                    "space": 0
                }
            }
        }
        record_map = {
            "area": 0,
            "difficulty": 0,
            "cell": 0,
            "step": 0,
            "fleet": [0,0,0,0,0,0,0,0,0,0,0,0]
        }
        record_option = {
            "skill_ship": [0,0],
            "skill_base": [0,0],
            "fleet": 0,
            "downRate": [0,0,0,0,0,0]
        }
    }
}

/**
 * [updateRecord 履歴の更新を行う]
 * @param  {int}    num      [記録番号]
 * @param  {boolen} del_flag [削除処理のフラグ]
 * トリガー：履歴保存または削除ボタンを押した際
 */
function updateRecord(num, del_flag) {
    if (('localStorage' in window) && (window.localStorage !== null)) {
        if (del_flag) {
            delete record[num];
        } else {
            var name = "";
            record[num] = {
                "name": name,
                "base": record_base,
                "ship": record_ship,
                "map": record_map,
                "option": record_option
            }
        }
        localStorage.removeItem("record");
        localStorage.setItem("record", JSON.stringify(record));
    }
}

/**
 * ==========================================================
 * 艦娘・装備関係
 * ==========================================================
 */

/**
 * [selectItem dialogから選択された結果を反映する]
 * dialogのリストから1つを選択し、OKボタンを押すと発火
 * @param  {string} type [equipment(装備) or ship(艦娘)]
 */
function selectItem(type) {
    let pattern;
    if (type == "equipment") {
        $("a[class*=active]").each(function(){
            pattern = /^info-equipment/;
            if (pattern.test($(this).attr('id'))) {
                let equipment_type = Number($(this).attr('id').split('-')[3]);
                let equipment_id = $(this).attr('id').split('-')[4];
                let element_type = record_target.attr('id').split('-')[2];
                let element_target_id = record_target.attr('id').split('-')[3];
                let element_equipment_id = record_target.attr('id').split('-')[4];
                setEquipmentItem(element_type, element_target_id, element_equipment_id, equipment_type, equipment_id);
                return false;
            }
        });
        $("#dialog-select-equipment").dialog('close');
    } else {
        $("a[class*=active]").each(function(){
            pattern = /^info-ship/;
            if (pattern.test($(this).attr('id'))) {
                let ship_id = Number($(this).attr('id').split('-')[3]);
                let element_id = record_target.attr('id').split('-')[2];
                setShipItem(ship_id, element_id, true, true);
                return false;
            }
        });
        $("#dialog-select-ship").dialog('close');
    }
    updateResult();
    updateRecord(0, false)
}

/**
 * [removeItem 選択された項目を外す]
 * 画面上の×ボタンまたはdialogの外すボタンを押すと発火
 * @param  {string} type                 [base or ship]
 * @param  {int}    element_target_id    [表の行数のid]
 * @param  {int}    element_equipment_id [装備番号、ただし、艦娘または基地航空隊全体の選択時は指定されない]
 */
function removeItem(type, element_target_id, element_equipment_id) {
    let element_equipment, element_skill, element_improvement, element_space, ship_id, slot;
    if (element_equipment_id !== undefined) {
        element_equipment = $("#equipment-name-" + type + "-" + element_target_id + "-" + element_equipment_id);
        element_skill = $("#skill-" + type + "-" + element_target_id + "-" + element_equipment_id);
        element_improvement = $("#improvement-" + type + "-" + element_target_id + "-" + element_equipment_id);
        if (type == "ship") {
            ship_id = Number($("#grade-" + element_target_id).val())
            slot = data_ship_id[ship_id].slot
            record_ship[element_target_id][element_equipment_id].id = 0;
            record_ship[element_target_id][element_equipment_id].improvement = 0;
            record_ship[element_target_id][element_equipment_id].skill = 0;
            if (element_equipment_id == slot) {
                element_equipment.attr("draggable", false).empty().html("&nbsp;補強増設").css('font-size',"13px");;
            } else {
                element_equipment.attr("draggable", false).empty().html("&nbsp;装備選択").css('font-size',"13px");;
            }
        } else {
            record_base[element_target_id][element_equipment_id].id = 0;
            record_base[element_target_id][element_equipment_id].improvement = 0;
            record_base[element_target_id][element_equipment_id].skill = 0;
            element_equipment.attr("draggable", false).empty().html("&nbsp;装備選択").css('font-size',"13px");;
            updateCombatRadius(element_target_id, element_equipment_id, 0)
        }
        toggleEnabledSelection(element_improvement, true, 0);
        toggleEnabledSelection(element_skill, true, 0);
        updateAirPowerFrends(type, element_target_id, element_equipment_id)
    } else {
        let num = (type === "ship") ? 6 : 4;
        let element_ship = (type === "ship") ? $("#ship-name-" + element_target_id) : null;
        let element_grade = (type === "ship") ? $("#grade-" + element_target_id) : null;
        if (type === "ship") {
            toggleEnabledSelection(element_grade, true, 0, $('<option>').val(0).text("-"))
            record_ship[element_target_id].id = 0;
            element_ship.empty().text("艦娘" + (Number(element_target_id)+1))
        }
        for (let i=0; i<num; i++) {
            element_equipment = $("#equipment-name-" + type + "-" + element_target_id + "-" + i);
            element_skill = $("#skill-" + type + "-" + element_target_id + "-" + i);
            element_improvement = $("#improvement-" + type + "-" + element_target_id + "-" + i);
            element_space = $("#space-" + type + "-" + element_target_id + "-" + i);
            if (type == "base") {
                record_base[element_target_id][i].id = 0;
                record_base[element_target_id][i].improvement = 0;
                record_base[element_target_id][i].skill = 0;

                let html = "";
                for (let j=18; j>=0; j--) {
                    html += "<option value='" + j + "'>" + j + "</option>"
                }
                record_ship[element_target_id][i].space = 18;
                toggleEnabledSelection(element_space, false, 18, $(html))
                // record_base[element_target_id][i].space = 18;
                // element_space.val(18).selectpicker('refresh');
                element_equipment.attr("draggable", false).empty().html("&nbsp;装備選択").css('font-size',"13px");
                updateCombatRadius(element_target_id, element_equipment_id, 0)
            } else {
                record_ship[element_target_id][i].id = 0;
                record_ship[element_target_id][i].improvement = 0;
                record_ship[element_target_id][i].skill = 0;
                record_ship[element_target_id][i].space = 0;
                toggleEnabledSelection(element_space, true, 0, $('<option>').val(0).text(0));
                element_equipment.attr("draggable", false).empty().css({'visibility':'hidden','font-size':"13px"});
            }
            toggleEnabledSelection(element_improvement, true, 0);
            toggleEnabledSelection(element_skill, true, 0);
            updateAirPowerFrends(type, element_target_id, i)
        }
    }
    updateResult();
    updateRecord(0, false)
}

/**
 * [initEquipmentCell 装備欄の初期化]
 * @param {int} ship_id    [セットされた艦娘の識別番号]
 * @param {int} element_id [対応する列番号]
 */
function initEquipmentCell(ship_id, element_target_id, record_flag) {
    for (var i=0; i<6; i++) {
        let element_equipment = $("#equipment-name-ship-" + element_target_id + "-" + i);
        let element_space = $("#space-ship-" + element_target_id + "-" + i);
        let element_skill = $("#skill-ship-" + element_target_id + "-" + i);
        let element_improvement = $("#improvement-ship-" + element_target_id + "-" + i);

        if (record_flag) {
            record_ship[element_target_id][i].id = 0
            record_ship[element_target_id][i].improvement = 0
            record_ship[element_target_id][i].skill = 0;
            record_ship[element_target_id][i].space = 0;
        }

        element_space.empty()

        let html = "";
        if (i < data_ship_id[ship_id].slot) {
            element_equipment.attr("draggable", false).empty().html("&nbsp;装備選択").css({'visibility':'visible', 'font-size':"13px"});
            for (let j=data_ship_id[ship_id].space[i]; j>=0; j--) {
                html += "<option value='" + j + "'>" + j + "</option>"
            }
            record_ship[element_target_id][i].space = data_ship_id[ship_id].space[i];
            toggleEnabledSelection(element_space, false, data_ship_id[ship_id].space[i], $(html))
        } else if (i == data_ship_id[ship_id].slot) {
            element_equipment.attr("draggable", false).empty().html("&nbsp;補強増設").css({'visibility':'visible','font-size':"13px"});
            toggleEnabledSelection(element_space, true, 0, $('<option>').val(0).text(0))
        } else {
            element_equipment.attr("draggable", false).empty().css({'visibility':'hidden','font-size':"13px"});
            toggleEnabledSelection(element_space, true, 0, $('<option>').val(0).text(0))
        }
        toggleEnabledSelection(element_improvement, true, 0)
        updateAirPowerFrends("ship", element_target_id, i)
    }
}

/**
 * [toggleEnabledSelection セレクトの有効無効の切り替え]
 * @param  {selection}  element  [ターゲットの要素]
 * @param  {int}        flag     [有効・無効フラグ]
 * @param  {int}        value    [選択されるvalue]
 * @param  {string}     html     [セレクタの中身]
 */
function toggleEnabledSelection(element, flag, value, html) {
    if (html !== undefined) {
        element.empty().append(html);
    }
    element.val(value).prop('disabled', flag).selectpicker('refresh');
    element.siblings('button').prop('disabled', flag);
}

/**
 * [toggleDisplayEquipment 装備欄のnext/prevの切り替え]
 * @param  {string} type      [next or prev]
 * @param  {int}    target_id [対象の列番号]
 */
function toggleDisplayEquipment(type, target_id) {
    if (type == "next") {
        $("#equipment-main-" + target_id).css("display", "none");
        $("#equipment-sub-" + target_id).css("display", "flex");
    } else {
        $("#equipment-main-" + target_id).css("display", "flex");
        $("#equipment-sub-" + target_id).css("display", "none");
    }
}

/**
 * [setEquipmentItem 選択された装備をセットする]
 * @param {string}  element_type         [base or ship]
 * @param {int}     element_target_id    [対象の列番号]
 * @param {int}     element_equipment_id [対象の行番号]
 * @param {int}     equipment_type       [装備の種別]
 * @param {int}     equipment_id         [装備番号]
 * @param {int}     improvement          [改修値]
 * @param {int}     skill                [熟練度]
 */
function setEquipmentItem(element_type, element_target_id, element_equipment_id, equipment_type, equipment_id, improvement, skill) {
    let element_improvement = $("#improvement-" + element_type + "-" + element_target_id + "-" + element_equipment_id);
    let element_skill = $("#skill-" + element_type + "-" + element_target_id + "-" + element_equipment_id);
    let element_equipment = $("#equipment-name-" + element_type + "-" + element_target_id + "-" + element_equipment_id);
    let element_airPower_target = $("#airpower-" + element_type + "-" + element_target_id);
    let element_space = $("#space-base-" + element_target_id + "-" + element_equipment_id);

    if (element_type == "base") {
        console.info(record_base, element_target_id)
        record_base[element_target_id][element_equipment_id].id = equipment_id
        record_base[element_target_id][element_equipment_id].improvement = 0
        record_base[element_target_id][element_equipment_id].skill = 0;
        updateCombatRadius(element_target_id, element_equipment_id, equipment_id)
    } else {
        record_ship[element_target_id][element_equipment_id].id = equipment_id
        record_ship[element_target_id][element_equipment_id].improvement = 0
        record_ship[element_target_id][element_equipment_id].skill = 0;
    }

    element_equipment.attr("draggable", true).empty().append($("<img src='img/equipment/icon/" + equipment_type + ".png'>")).append(data_equipment_id_ship[equipment_id].name);
    element_equipment.css("font-size", getFontSize(data_equipment_id_ship[equipment_id].name, 13, "メイリオ, sans-serif", 240));

    if (data_equipment_id_ship[equipment_id].improvement) {
        if (improvement === undefined) {
            toggleEnabledSelection(element_improvement, false, 0)
        } else {
            toggleEnabledSelection(element_improvement, false, improvement);
            if (element_type == "base") {
                record_base[element_target_id][element_equipment_id].improvement = improvement
            } else {
                record_ship[element_target_id][element_equipment_id].improvement = improvement
            }
        }
    } else {
        toggleEnabledSelection(element_improvement, true, 0)
    }

    switch (equipment_type) {
        case 6:
        case 45:
        case 48:
        case 49:
        case 52:
            if (skill === undefined) {
                if ($("#skill-max-" + element_type + "-0").is(":checked")) {
                    toggleEnabledSelection(element_skill, false, 7)
                    if (element_type == "base") {
                        record_base[element_target_id][element_equipment_id].skill = 7
                    } else {
                        record_ship[element_target_id][element_equipment_id].skill = 7
                    }
                } else {
                    toggleEnabledSelection(element_skill, false, 0)
                }
            } else {
                toggleEnabledSelection(element_skill, false, skill)
                if (element_type == "base") {
                    record_base[element_target_id][element_equipment_id].skill = skill
                } else {
                    record_ship[element_target_id][element_equipment_id].skill = skill
                }
            }
            if (element_type == "base") {
                let html = "";
                for (let j=18; j>=0; j--) {
                    html += "<option value='" + j + "'>" + j + "</option>"
                }
                record_ship[element_target_id][i].space = 18;
                toggleEnabledSelection(element_space, false, 18, $(html))
            }
            break;
        case 7:
        case 8:
        case 11:
        case 47:
        case 53:
        case 54:
        case 57:
            if (skill === undefined) {
                if ($("#skill-max-" + element_type + "-1").is(":checked")) {
                    toggleEnabledSelection(element_skill, false, 7)
                    if (element_type == "base") {
                        record_base[element_target_id][element_equipment_id].skill = 7
                    } else {
                        record_ship[element_target_id][element_equipment_id].skill = 7
                    }
                } else {
                    toggleEnabledSelection(element_skill, false, 0)
                }
            } else {
                toggleEnabledSelection(element_skill, false, skill)
                if (element_type == "base") {
                    record_base[element_target_id][element_equipment_id].skill = skill
                } else {
                    record_ship[element_target_id][element_equipment_id].skill = skill
                }
            }
            if (element_type == "base") {
                let html = "";
                for (let j=18; j>=0; j--) {
                    html += "<option value='" + j + "'>" + j + "</option>"
                }
                record_ship[element_target_id][i].space = 18;
                toggleEnabledSelection(element_space, false, 18, $(html))
            }
            break;
        case 9:
        case 10:
        case 41:
        case 56:
            if (skill === undefined) {
                toggleEnabledSelection(element_skill, false, 7)
                if (element_type == "base") {
                    record_base[element_target_id][element_equipment_id].skill = 7
                } else {
                    record_ship[element_target_id][element_equipment_id].skill = 7
                }
            } else {
                toggleEnabledSelection(element_skill, false, skill)
                if (element_type == "base") {
                    record_base[element_target_id][element_equipment_id].skill = skill
                } else {
                    record_ship[element_target_id][element_equipment_id].skill = skill
                }
            }
            if (element_type == "base") {
                let html = "";
                for (let j=4; j>=0; j--) {
                    html += "<option value='" + j + "'>" + j + "</option>"
                }
                record_ship[element_target_id][i].space = 4;
                toggleEnabledSelection(element_space, false, 4, $(html))
            }
            break;
        default:
            toggleEnabledSelection(element_skill, true, 0)
            if (element_type == "base") {
                let html = "";
                for (let j=18; j>=0; j--) {
                    html += "<option value='" + j + "'>" + j + "</option>"
                }
                record_ship[element_target_id][i].space = 18;
                toggleEnabledSelection(element_space, false, 18, $(html))
            }
    }
    updateAirPowerFrends(element_type, element_target_id, element_equipment_id)
}

/**
 * [setShipItem 選択された艦娘をセットする]
 * @param {int}     ship_id    [艦娘番号]
 * @param {int}     element_id [対応する列番号]
 * @param {boolen}  flag       [改装段階を変更するかのフラグ]
 */
function setShipItem(ship_id, element_id, grade_flag, record_flag) {
    let element_ship = $("#ship-name-" + element_id);
    record_ship[element_id].id = ship_id

    element_ship.empty().append($("<img src='img/ship/banner/" + ship_id + ".png'>"));
    initEquipmentCell(ship_id, element_id, record_flag);
    if (grade_flag) setGradeItem(ship_id, element_id);
}

/**
 * [setGradeItem 改装段階のセレクタの項目を設定する]
 * @param {int} id              [艦娘の識別番号]
 * @param {selection} element   [対象の改装段階のセレクト]
 */
function setGradeItem(id, element_id) {
    let html = "";
    let element_grade = $("#grade-" + element_id);
    let grade_name = ["未改","改","改二","改三","改四"];
    switch (id) {
        case 49:
        case 253:
        case 464:
        case 470:
            grade_name = ["未改","改","改二","改二乙"];
            break;
        case 116:
        case 117:
        case 555:
        case 560:
            grade_name = ["未改","改","改二","改二乙"];
            break;
        case 95:
        case 248:
        case 463:
        case 468:
            grade_name = ["未改","改","改二","改二丁"];
            break;
        case 110:
        case 288:
        case 461:
        case 466:
            grade_name = ["未改","改","改二","改二甲"];
            break;
        case 111:
        case 112:
        case 462:
        case 467:
            grade_name = ["未改","改","改二","改二甲"];
            break;
        case 433:
        case 438:
        case 545:
        case 550:
            grade_name = ["未改","改","Mk.Ⅱ","Mod.2"];
            break;
        case 124:
        case 129:
        case 503:
        case 508:
            grade_name = ["未改","改","改二","航改二"];
            break;
        case 125:
        case 130:
        case 504:
        case 509:
            grade_name = ["未改","改","改二","航改二"];
            break;
        case 102:
        case 104:
        case 106:
        case 108:
        case 291:
        case 296:
            grade_name = ["未改","改","甲","航","航改","航改二"];
            break;
        case 103:
        case 105:
        case 107:
        case 109:
        case 292:
        case 297:
            grade_name = ["未改","改","甲","航","航改","航改二"];
            break;
        case 184:
        case 185:
        case 318:
            grade_name = ["大鯨","龍鳳","龍鳳改"];
            break;
        case 162:
        case 499:
        case 500:
            grade_name = ["未改","改","改母"]
            break;
        case 171:
        case 172:
        case 173:
        case 178:
            grade_name = ["未改","改","zwei","drei"];
            break;
        case 174:
        case 310:
        case 179:
            grade_name = ["未改","改","zwei","drei"];
            break;
        case 175:
        case 311:
        case 180:
            grade_name = ["未改","改","zwei","drei"];
            break;
        case 521:
        case 526:
        case 380:
        case 529:
            grade_name = ["春日丸","大鷹","改","改二"];
            break;
        case 167:
        case 320:
        case 557:
            grade_name = ["未改","改","改乙"];
            break;
        case 170:
        case 312:
        case 558:
            grade_name = ["未改","改","改乙"];
            break;
        case 448:
        case 358:
        case 496:
            grade_name = ["未改","改","due"];
            break;
    }
    let ship_id = id;
    let grade_last = 0;
    let ship_id_grade = [ship_id];
    for (let i=data_ship_id[id].grade;;i--) {
        ship_id = data_ship_id[ship_id].before;
        if (ship_id == 0) break;
        ship_id_grade.unshift(ship_id);
    }
    ship_id = id;
    for (let i=data_ship_id[id].grade;;i++) {
        if (data_ship_id[ship_id].after == 0 || ship_id_grade.indexOf(data_ship_id[ship_id].after) != -1) {
            grade_last = data_ship_id[ship_id].grade;
            break;
        } else {
            ship_id = data_ship_id[ship_id].after;
            ship_id_grade.push(ship_id);
        }
    }
    for (let i=grade_last; i>=0; i--) {
        html += "<option value='" + ship_id_grade[i] + "'>" + grade_name[i] + "</option>"
    }
    toggleEnabledSelection(element_grade, false, id, $(html))
}

function changeFleet(fleet) {
    let tab = $("#tab-fleet")
    switch (fleet) {
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
}

/**
 * ==========================================================
 * MAP関係
 * ==========================================================
 */

/**
 * [changeArea 海域変更：マップ画像、難易度セレクトの表示非表示、マスセレクトの内容変更]
 * マップセレクトを変更すると発火
 * @param  {string} area [海域番号(x-y)]
 */
function changeArea(area, flag) {
    let html = "";
    let map_cell = $("#map-cell");
    html += "<option value='0' selected>マス</option>"
    if (flag) {
        record_map["area"] = area;
        record_map["cell"] = 0;
        record_map["difficulty"] = 0;
    }

    clearEnemyFleet(flag);
    if (area != 0) {
        let difficulty = data_map[area.split("-")[0]][area.split("-")[1]]
        let cell = difficulty[0]
        $("#map-img").empty().append($("<img src='img/map/" + area + ".png' width=\"500\" height=\"320\">"));

        if (Object.keys(difficulty).length != 1) {
            $("#difficulty").css('display','flex');
        } else {
            $("[name=difficulty]").val(["0"])
            $("#difficulty").css('display','none');
        }
        Object.keys(cell).forEach(function(key){
            html += "<option value='" + key + "'>" + key + "</option>"
        }, cell);
        toggleEnabledSelection(map_cell, false, 0, $(html))
    } else {
        $("[name=difficulty]").val(["0"]);
        $("#difficulty").css('display','none');
        $("#map-img").empty();
        toggleEnabledSelection(map_cell, true, 0, $(html))
    }
}

/**
 * [changeDiffculty 海域難易度の変更]
 * @param  {int} difficulty [難易度に対応した番号]
 * トリガー：難易度をラジオボタンで変更した際
 */
function changeDiffculty(difficulty, flag) {
    let area = $("#map-area").val()
    let cell = $("#map-cell").val()
    if (flag) record_map["difficulty"] = difficulty;

    if (cell != 0) {
        let step = data_map[area.split('-')[0]][area.split('-')[1]][difficulty][cell];
        let fleet = (Object.keys(step).indexOf("1") != -1) ? step[$("[name=enemy-fleet-step]:checked").val()].fleet : step[0].fleet;
        if (flag) record_map["step"] = (Object.keys(step).indexOf("1") != -1) ? Number($("[name=enemy-fleet-step]:checked").val()) : 0;
        if (Object.keys(step).indexOf("1") != -1) {
            $("#enemy-fleet-step").css('display','flex');
        } else {
            $("[name=enemy-fleet-step]").val(["0"])
            $("#enemy-fleet-step").css('display','none');
        }
        for (let i=0; i<12; i++) {
            $("#enemy-name-" + i).empty();
            $("#airpower-enemy-" + i).empty();
            if (flag) record_map["fleet"][i] = fleet[i]
            if (fleet[i] != 0) $("#enemy-name-" + i).append($("<img src='img/enemy/banner/" + fleet[i] + ".png'>"))
        }
        updateAirPowerEnemy();
    }
}

/**
 * [changeCell マス変更：ゲージ段階セレクトの表示非表示、敵編成の変更]
 * マスセレクトを変更した際に発火
 * @param  {string} cell [マスのアルファベット]
 */
function changeCell(cell, flag) {
    let area = $("#map-area").val()
    let difficulty = $("[name=difficulty]:checked").val()
    if (flag) record_map["cell"] = cell;

    if (cell != 0) {
        let step = data_map[area.split('-')[0]][area.split('-')[1]][difficulty][cell];
        $("#radius-enemy-value").text(step["radius"]);
        let fleet = (Object.keys(step).indexOf("1") != -1) ? step[$("[name=enemy-fleet-step]:checked").val()].fleet : step[0].fleet;
        if (flag) record_map["step"] = (Object.keys(step).indexOf("1") != -1) ? Number($("[name=enemy-fleet-step]:checked").val()) : 0;
        if (Object.keys(step).indexOf("1") != -1) {
            $("#enemy-fleet-step").css('display','flex');
        } else {
            $("[name=enemy-fleet-step]").val(["0"])
            $("#enemy-fleet-step").css('display','none');
        }
        for (var i=0; i<12; i++) {
            $("#enemy-name-" + i).empty();
            $("#airpower-enemy-" + i).empty();
            if (flag) record_map["fleet"][i] = fleet[i]
            if (fleet[i] != 0) {
                $("#enemy-name-" + i).append($("<img src='img/enemy/banner/" + fleet[i] + ".png'>"))
            }
        }
        updateAirPowerEnemy();
    } else {
        clearEnemyFleet(flag);
    }
}

/**
 * [changeStep ゲージ段階変更：敵編成の変更]
 * ゲージ段階セレクトが変更された際に発火
 * @param  {int} step [0(前哨戦) or 1(ラスダン)]
 */
function changeStep(step, flag) {
    let area = $("#map-area").val()
    let difficulty = $("[name=difficulty]:checked").val()
    let cell = $("#map-cell").val()
    let fleet = data_map[area.split('-')[0]][area.split('-')[1]][difficulty][cell][step].fleet;
    if (flag) record_map["step"] = step;

    for (let i=0; i<12; i++) {
        $("#enemy-name-" + i).empty();
        if (flag) record_map["fleet"][i] = fleet[i];
        if (fleet[i] != 0) $("#enemy-name-" + i).append($("<img src='img/enemy/banner/" + fleet[i] + ".png'>"))
    }
    updateAirPowerEnemy();
}

/**
 * [clearEnemyFleet 編成初期化、クリア]
 */
function clearEnemyFleet(flag) {
    for (let i=0; i<12; i++) {
        if (flag) record_map["fleet"][i] = 0;
        $("#enemy-name-" + i).empty();
        $("#airpower-enemy-" + i).empty();
    }
    if (flag) record_map["step"] = 0;
    $("#radius-enemy-value").text(0)
    $("[name=enemy-fleet-step]").val(["0"])
    $("#enemy-fleet-step").css('display','none');
    updateAirPowerEnemy();
}
