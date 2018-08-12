/**
 * [addDDEvent DnD eventを追加]
 * @param {[type]} element [追加対象]
 */
function addDDEvent(element) {
    element.addEventListener('dragstart', handleDragStart, false);
    element.addEventListener('dragenter', handleDragEnter, false);
    element.addEventListener('dragover', handleDragOver, false);
    element.addEventListener('dragleave', handleDragLeave, false);
    element.addEventListener('drop', handleDrop, false);
    element.addEventListener('dragend', handleDragEnd, false);
}

/**
 * [handleDragStart ドラッグスタート時に発生するイベント]
 * @param  {[type]} e [description]
 * @return {[type]}   [description]
 */
function handleDragStart(e) {
    drag_source = this;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('html',this.innerHTML);
    switch ($(this).attr('class').split("-")[0]) {
        case "equipment":
            let element_type = $(this).attr("id").split("-")[2];
            let element_target_id = $(this).attr("id").split("-")[3];
            let element_equipment_id = $(this).attr("id").split("-")[4];
            let element_improvement = $("#improvement-" + element_type + "-" + element_target_id + "-" + element_equipment_id);
            let element_skill = $("#skill-" + element_type + "-" + element_target_id + "-" + element_equipment_id);
            if (element_type == "base") {
                e.dataTransfer.setData('equipment_id', record_base[element_target_id][element_equipment_id].id)
            } else {
                e.dataTransfer.setData('equipment_id', record_ship[element_target_id][element_equipment_id].id)
            }
            e.dataTransfer.setData('improvement_value', element_improvement.val());
            e.dataTransfer.setData('improvement_able', element_improvement.is(":disabled"));
            e.dataTransfer.setData('skill_value', element_skill.val());
            e.dataTransfer.setData('skill_able', element_skill.is(":disabled"));
            break;
        case "ship":
            let element_ship_id = $(this).attr("id").split("-")[2];
            let element_grade = $("#grade-" + element_ship_id)
            e.dataTransfer.setData('grade_value', element_grade.val());
            e.dataTransfer.setData('grade_option', element_grade.html());
            for (let i=0; i<6; i++) {
                // var num = element_id*6 + i;
                let element_equipment = $("#equipment-name-ship-" + element_ship_id + "-" + i);
                let element_improvement = $("#improvement-ship-" + element_ship_id + "-" + i);
                let element_skill = $("#skill-ship-" + element_ship_id + "-" + i);
                let element_space = $("#space-ship-" + element_ship_id + "-" + i);
                e.dataTransfer.setData('equipment_id_' + i, record_ship[element_ship_id][i].id);
                e.dataTransfer.setData('equipment_html_' + i, element_equipment.html());
                e.dataTransfer.setData('improvement_value_' + i, element_improvement.val());
                e.dataTransfer.setData('improvement_able_' + i, element_improvement.is(":disabled"));
                e.dataTransfer.setData('skill_value_' + i, element_skill.val());
                e.dataTransfer.setData('skill_able_' + i, element_skill.is(":disabled"));
                e.dataTransfer.setData('space_value_' + i, element_space.val());
                e.dataTransfer.setData('space_able_' + i, element_space.is(":disabled"));
                e.dataTransfer.setData('space_option_' + i, element_space.html());
            }
            break;
        case "base":
            var element_base_id = $(this).attr("id").split("-")[2];
            for (let i=0; i<4; i++) {
                // var num = element_id*4 + i;
                let element_equipment = $("#equipment-name-base-" + element_base_id + "-" + i);
                let element_improvement = $("#improvement-base-" + element_base_id + "-" + i);
                let element_skill = $("#skill-base-" + element_base_id + "-" + i);
                let element_space = $("#space-base-" + element_base_id + "-" + i);
                e.dataTransfer.setData('equipment_id_' + i, record_base[element_base_id][i].id);
                e.dataTransfer.setData('equipment_html_' + i, element_equipment.html());
                e.dataTransfer.setData('improvement_value_' + i, element_improvement.val());
                e.dataTransfer.setData('improvement_able_' + i, element_improvement.is(":disabled"));
                e.dataTransfer.setData('skill_value_' + i, element_skill.val());
                e.dataTransfer.setData('skill_able_' + i, element_skill.is(":disabled"));
                e.dataTransfer.setData('space_value_' + i, element_space.val());
                e.dataTransfer.setData('space_able_' + i, element_space.is(":disabled"));
            }
            break;
        default:
    }
}

/**
 * [handleDragOver ドラッグオーバー時のイベント]
 * @param  {[type]} e [description]
 * @return {[type]}   [description]
 */
function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }
    e.dataTransfer.dropEffect = 'move';
    return false;
}

/**
 * [handleDragEnter description]
 * @param  {[type]} e [description]
 * @return {[type]}   [description]
 */
function handleDragEnter(e) {
    let pattern = new RegExp($(drag_source).attr("class"));
    if (pattern.test($(this).attr('class'))) {
        this.classList.add("drag-over");
    }
}

/**
 * [handleDragLeave description]
 * @param  {[type]} e [description]
 * @return {[type]}   [description]
 */
function handleDragLeave(e) {
    let pattern = new RegExp($(drag_source).attr("class"));
    if (pattern.test($(this).attr('class'))) {
        this.classList.remove('drag-over');
    }
}

/**
 * [handleDrop description]
 * @param  {[type]} e [description]
 * @return {[type]}   [description]
 */
function handleDrop(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }

    // 同種の位置にドロップされていない場合は処理を行わない
    let pattern = new RegExp($(drag_source).attr("class"));
    if (!pattern.test($(this).attr('class'))) return false;

    this.classList.remove('drag-over');
    let type = $(this).attr('class').split("-")[0]

    if (type == "equipment") {
        exchangeEquipment(e, this);
    } else {
        exchangeTarget(e, this, type);
    }
    updateResult();
    updateRecord(0, false)
    return false;
}

/**
 * [handleDragEnd description]
 * @param  {[type]} e [description]
 * @return {[type]}   [description]
 */
function handleDragEnd(e) {
    this.classList.remove('drag-over');
}

/**
 * [exchangeEquipment description]
 * @param  {[type]} e [description]
 * @param  {[type]} t [description]
 * @return {[type]}   [description]
 */
function exchangeEquipment(e, t) {
    let element_type = $(t).attr("id").split("-")[2];
    let element_target_id_target = $(t).attr("id").split("-")[3];
    let element_equipment_id_target = $(t).attr("id").split("-")[4];
    let element_improvement_target = $("#improvement-" + element_type + "-" + element_target_id_target + "-" + element_equipment_id_target);
    let element_skill_target = $("#skill-" + element_type + "-" + element_target_id_target + "-" + element_equipment_id_target);
    let element_target_id_source = $(drag_source).attr("id").split("-")[3];
    let element_equipment_id_source = $(drag_source).attr("id").split("-")[4];
    let element_improvement_source = $("#improvement-" + element_type + "-" + element_target_id_source + "-" + element_equipment_id_source)
    let element_skill_source = $("#skill-" + element_type + "-" + element_target_id_source + "-" + element_equipment_id_source);
    let ship_id_target = (element_type === "ship") ? Number($("#grade-" + element_target_id_target).val()) : null;
    let ship_type_target = (element_type === "ship") ? data_ship_id[ship_id_target].type : null;
    let ship_id_source = (element_type === "ship") ? Number($("#grade-" + element_target_id_source).val()) : null;
    let ship_type_source = (element_type === "ship") ? data_ship_id[ship_id_source].type : null;
    let equipment_type_target = (element_type === "ship" && t.innerHTML.indexOf("装備選択") == -1 && t.innerHTML.indexOf("補強増設") == -1) ? data_equipment_id_ship[record_ship[element_target_id_target][element_equipment_id_target].id].type : 0;
    // let equipment_type_source = (element_type === "ship") ? data_equipment_id_ship[record_ship[element_target_id_source][element_equipment_id_source].id].type : null;
    let equipment_type_source = (element_type === "ship") ? data_equipment_id_ship[record_ship[element_target_id_source][element_equipment_id_source].id].type : null;

    if (element_type == "ship") {
        if (!checkEquipmentTypeAvailable(element_equipment_id_target, ship_id_target, ship_type_target, equipment_type_source)) return false;
        if (!checkEquipmentTypeAvailable(element_equipment_id_source, ship_id_source, ship_type_source, equipment_type_target)) return false;

        if (t.innerHTML.indexOf("装備選択") == -1 && t.innerHTML.indexOf("補強増設") == -1) {
            record_ship[element_target_id_source][element_equipment_id_source].id = record_ship[element_target_id_target][element_equipment_id_target].id
            $(drag_source).attr("draggable", true).empty().html(t.innerHTML).css('visibility', 'visible');
            $(drag_source).css('font-size', getFontSize($(drag_source).text(), 13, "メイリオ, sans-serif", 240))
        } else {
            let num = element_equipment_id_source % 6;
            record_ship[element_target_id_source][element_equipment_id_source].id = 0;
            if (data_ship_id[ship_id_source].slot != num) {
                $(drag_source).attr("draggable", false).empty().html("&nbsp;装備選択").css({'visibility':'visible','font-size':'13px'});
            } else {
                $(drag_source).attr("draggable", false).empty().html("&nbsp;補強増設").css({'visibility':'visible','font-size':'13px'});
            }
        }
        record_ship[element_target_id_target][element_equipment_id_target].id = Number(e.dataTransfer.getData("equipment_id"));
        $(t).attr("draggable", true).empty().html(e.dataTransfer.getData('html')).css('visibility', 'visible');
        $(t).css('font-size', getFontSize($(t).text(), 13, "メイリオ, sans-serif", 240))

        record_ship[element_target_id_source][element_equipment_id_source].improvement = Number(element_improvement_target.val());
        record_ship[element_target_id_target][element_equipment_id_target].improvement = Number(e.dataTransfer.getData('improvement_value'));
        record_ship[element_target_id_source][element_equipment_id_source].skill = Number(element_skill_target.val())
        record_ship[element_target_id_source][element_equipment_id_target].skill = Number(e.dataTransfer.getData('skill_value'))

        toggleEnabledSelection(element_improvement_source, element_improvement_target.is(":disabled"), element_improvement_target.val())
        toggleEnabledSelection(element_improvement_target, parseStrToBoolean(e.dataTransfer.getData('improvement_able')), e.dataTransfer.getData('improvement_value'));
        toggleEnabledSelection(element_skill_source, element_skill_target.is(":disabled"), element_skill_target.val())
        toggleEnabledSelection(element_skill_target, parseStrToBoolean(e.dataTransfer.getData('skill_able')), e.dataTransfer.getData('skill_value'));
        updateAirPowerFrends(element_type, element_target_id_source, element_equipment_id_source);
        updateAirPowerFrends(element_type, element_target_id_target, element_equipment_id_target);

    } else {
        drag_source.innerHTML = t.innerHTML;
        t.innerHTML = e.dataTransfer.getData('html');
        if (t.innerHTML.indexOf("装備選択") != -1) {
            $(drag_source).attr("draggable", true);
        } else {
            $(drag_source).attr("draggable", false);
        }
        $(t).attr("draggable", true);
        record_base[element_target_id_source][element_equipment_id_source].id = record_base[element_target_id_target][element_equipment_id_target].id
        record_base[element_target_id_target][element_equipment_id_target].id = Number(e.dataTransfer.getData("equipment_id"));
        record_base[element_target_id_source][element_equipment_id_source].improvement = Number(element_improvement_target.val());
        record_base[element_target_id_target][element_equipment_id_target].improvement = Number(e.dataTransfer.getData('improvement_value'));
        record_base[element_target_id_source][element_equipment_id_source].skill = Number(element_skill_target.val())
        record_base[element_target_id_target][element_equipment_id_target].skill = Number(e.dataTransfer.getData('skill_value'))
        toggleEnabledSelection(element_improvement_source, element_improvement_target.is(":disabled"), element_improvement_target.val())
        toggleEnabledSelection(element_improvement_target, parseStrToBoolean(e.dataTransfer.getData('improvement_able')), e.dataTransfer.getData('improvement_value'));
        toggleEnabledSelection(element_skill_source, element_skill_target.is(":disabled"), element_skill_target.val())
        toggleEnabledSelection(element_skill_target, parseStrToBoolean(e.dataTransfer.getData('skill_able')), e.dataTransfer.getData('skill_value'));
        updateCombatRadius(element_target_id_source, element_equipment_id_source, record_base[element_target_id_source][element_equipment_id_source].id);
        updateCombatRadius(element_target_id_target, element_equipment_id_target, record_base[element_target_id_target][element_equipment_id_target].id);
        updateAirPowerFrends(element_type, element_target_id_source, element_equipment_id_source);
        updateAirPowerFrends(element_type, element_target_id_target, element_equipment_id_target);
    }
}

/**
 * [exchangeTarget description]
 * @param  {[type]} e    [description]
 * @param  {[type]} t    [description]
 * @param  {[type]} type [description]
 * @return {[type]}      [description]
 */
function exchangeTarget(e, t, type) {
    let element_target_id_target = Number($(t).attr("id").split("-")[2]);
    let element_target_id_source = Number($(drag_source).attr("id").split("-")[2]);
    let item = (type === "ship") ? 6 : 4;
    let element_grade_target = (type === "ship") ? $("#grade-" + element_target_id_target) : null;
    let element_grade_source = (type === "ship") ? $("#grade-" + element_target_id_source) : null;
    let record_source = (type === "ship") ? record_ship[element_target_id_source] : record_base[element_target_id_source];
    let record_target = (type === "ship") ? record_ship[element_target_id_target] : record_base[element_target_id_target];

    if (type == "base") {
        record_base[element_target_id_source] = record_target;
        record_base[element_target_id_target] = record_source;
    } else {
        record_ship[element_target_id_source] = record_target;
        record_ship[element_target_id_target] = record_source;
        drag_source.innerHTML = (t.innerHTML.indexOf('艦娘') == -1) ? t.innerHTML : "艦娘" + (element_target_id_source + 1);
        t.innerHTML = (e.dataTransfer.getData('html').indexOf('艦娘') == -1) ? e.dataTransfer.getData('html') : "艦娘" + (element_target_id_target + 1);

        if (t.innerHTML.indexOf('艦娘') == -1) {
            toggleEnabledSelection(element_grade_source, false, element_grade_target.val(), element_grade_target.html())
        } else {
            toggleEnabledSelection(element_grade_source, true, 0, $("<option value='0'>-</option>"))
        }
        if (e.dataTransfer.getData('html').indexOf('艦娘') == -1) {
            toggleEnabledSelection(element_grade_target, false, e.dataTransfer.getData('grade_value'), e.dataTransfer.getData('grade_option'));
        } else {
            toggleEnabledSelection(element_grade_target, true, 0, $("<option value='0'>-</option>"))
        }
    }

    for (let i=0; i<item; i++) {
        let element_equipment_id_target = element_target_id_target*item + i;
        let element_equipment_target = $("#equipment-name-" + type + "-" + element_target_id_target + "-" + i);
        let element_improvement_target = $("#improvement-" + type + "-" + element_target_id_target + "-" + i);
        let element_skill_target = $("#skill-" + type + "-" + element_target_id_target + "-" + i);
        let element_space_target = $("#space-" + type + "-" + element_target_id_target + "-" + i);
        let element_equipment_id_source = element_target_id_source*item + i;
        let element_equipment_source = $("#equipment-name-" + type + "-" + element_target_id_source + "-" + i);
        let element_improvement_source = $("#improvement-" + type + "-" + element_target_id_source + "-" + i)
        let element_skill_source = $("#skill-" + type + "-" + element_target_id_source + "-" + i);
        let element_space_source = $("#space-" + type + "-" + element_target_id_source + "-" + i);

        if (type == "base") {
            if (element_equipment_target.html().indexOf("装備選択") == -1) {
                element_equipment_source.attr("draggable", true).empty().html(element_equipment_target.html());
            } else {
                element_equipment_source.attr("draggable", false).empty().html(element_equipment_target.html());
            }
            if (e.dataTransfer.getData('equipment_html_' + i).indexOf("装備選択") == -1) {
                element_equipment_target.attr("draggable", true).empty().html(e.dataTransfer.getData('equipment_html_' + i));
            } else {
                element_equipment_target.attr("draggable", false).empty().html(e.dataTransfer.getData('equipment_html_' + i));
            }
            toggleEnabledSelection(element_space_source, element_space_target.is(":disabled"), element_space_target.val())
            toggleEnabledSelection(element_space_target, parseStrToBoolean(e.dataTransfer.getData('space_able_' + i)), e.dataTransfer.getData('space_value_' + i))
            updateCombatRadius(element_target_id_source, i, record_base[element_target_id_source][i].id);
            updateCombatRadius(element_target_id_target, i, record_base[element_target_id_target][i].id);
        } else {
            if (element_equipment_target.html().length == 0) {
                element_equipment_source.attr("draggable", false).empty().css('visibility','hidden');
            } else if (element_equipment_target.html().indexOf("装備選択") == -1 && element_equipment_target.html().indexOf("補強増設") == -1) {
                element_equipment_source.attr("draggable", true).empty().html(element_equipment_target.html()).css('visibility','visible');
            } else {
                if (data_ship_id[element_grade_source.val()].slot != i) {
                    element_equipment_source.attr("draggable", false).empty().html("&nbsp;装備選択").css('visibility','visible');
                } else {
                    element_equipment_source.attr("draggable", false).empty().html("&nbsp;補強増設").css('visibility','visible');
                }
            }
            if (e.dataTransfer.getData('equipment_html_' + i).length == 0) {
                element_equipment_target.attr("draggable", false).empty().css('visibility','hidden');
            } else if (e.dataTransfer.getData('equipment_html_' + i).indexOf("装備選択") == -1 && e.dataTransfer.getData('equipment_html_' + i).indexOf("補強増設") == -1) {
                element_equipment_target.attr("draggable", true).empty().html(e.dataTransfer.getData('equipment_html_' + i)).css('visibility','visible');
            } else {
                if (data_ship_id[element_grade_target.val()].slot != i) {
                    element_equipment_target.attr("draggable", false).empty().html("&nbsp;装備選択").css('visibility','visible');
                } else {
                    element_equipment_target.attr("draggable", false).empty().html("&nbsp;補強増設").css('visibility','visible');
                }
            }
            toggleEnabledSelection(element_space_source, element_space_target.is(":disabled"), element_space_target.val(), element_space_target.html())
            toggleEnabledSelection(element_space_target, parseStrToBoolean(e.dataTransfer.getData('space_able_' + i)), e.dataTransfer.getData('space_value_' + i), e.dataTransfer.getData('space_option_' + i))
        }

        toggleEnabledSelection(element_improvement_source, element_improvement_target.is(":disabled"), element_improvement_target.val())
        toggleEnabledSelection(element_improvement_target, parseStrToBoolean(e.dataTransfer.getData('improvement_able_' + i)), e.dataTransfer.getData('improvement_value_' + i));
        toggleEnabledSelection(element_skill_source, element_skill_target.is(":disabled"), element_skill_target.val())
        toggleEnabledSelection(element_skill_target, parseStrToBoolean(e.dataTransfer.getData('skill_able_' + i)), e.dataTransfer.getData('skill_value_' + i));
        updateAirPowerFrends(type, element_target_id_source, i);
        updateAirPowerFrends(type, element_target_id_target, i);
    }
}
