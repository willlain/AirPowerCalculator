/**
 * [getAirPowerSingle description]
 * @param  {[type]} element_type         [description]
 * @param  {[type]} element_target_id    [description]
 * @param  {[type]} element_equipment_id [description]
 * @return {[type]}                      [description]
 */
function updateAirPowerFrends(element_type, element_target_id, element_equipment_id) {
    var element_airPower_target = $("#airpower-" + element_type + "-" + element_target_id)
    var element_airPower_equipment = $("#airpower-" + element_type + "-" + element_target_id + "-" + element_equipment_id)
    var equipment_id = (element_type == "base") ? record_base[element_target_id][element_equipment_id].id : record_ship[element_target_id][element_equipment_id].id;
    var power = 0;
    if (equipment_id != 0) {
        var equipment_type = data_equipment_id_ship[equipment_id].type
        switch (equipment_type) {
            case 6:
            case 45:
                power = getAirPower(element_type, element_target_id, element_equipment_id, equipment_id, equipment_type, 0.2, 0, 0);
                break;
            case 7:
                power = getAirPower(element_type, element_target_id, element_equipment_id, equipment_id, equipment_type, 0.25, 0, 0);
                break;
            case 8:
            case 11:
            case 52:
            case 53:
            case 57:
                power = getAirPower(element_type, element_target_id, element_equipment_id, equipment_id, equipment_type, 0, 0, 0);
                break;
            case 9:
            case 10:
            case 41:
            case 56:
                if (element_type == "base") {
                    power = getAirPower(element_type, element_target_id, element_equipment_id, equipment_id, equipment_type, 0, 0, 0);
                }
                break;
            case 47:
            case 48:
            case 49:
            case 54:
                power = getAirPower(element_type, element_target_id, element_equipment_id, equipment_id, equipment_type, 0.2, 1.5, 0);
                // power = getAirPower(element_type, element_target_id, element_equipment_id, equipment_id, equipment_type, 0.2, 1, 2);
                break;
            default:
        }
    }
    element_airPower_equipment.text(power);

    power = 0;
    var item = (element_type == "base") ? 4 : 6;
    element_airPower_target.prop("disabled", false);
    for (var i=0; i<item; i++) {
        if (element_type == "base") {
            if (record_base[element_target_id][i].id != 0) {
                element_airPower_target.prop("disabled", true);
            }
        } else {
            if (record_ship[element_target_id][i].id != 0) {
                element_airPower_target.prop("disabled", true);
            }
        }
        power += Number($("#airpower-" + element_type + "-" + element_target_id + "-" + i).text())
    }
    element_airPower_target.val(power);
}

function getAirPower(element_type, element_target_id, element_equipment_id, equipment_id, equipment_type, coefficient_improvement, coefficient_interception, coefficient_antiBobing) {
    var element_skill = $("#skill-" + element_type + "-" + element_target_id + "-" + element_equipment_id)
    var element_improvement = $("#improvement-" + element_type + "-" + element_target_id + "-" + element_equipment_id)
    var element_space = $("#space-" + element_type + "-" + element_target_id + "-" + element_equipment_id)
    var anti_air = data_equipment_id_ship[equipment_id].antiAir + coefficient_improvement * Number(element_improvement.val())

    if (coefficient_interception != 0) {
        anti_air += coefficient_interception * data_equipment_id_ship[equipment_id].interception + coefficient_antiBobing * data_equipment_id_ship[equipment_id].antiBobing
    }
    var power = anti_air * Math.sqrt(Number(element_space.val()))
    power += data_equipment_type_ship[equipment_type].skill_bonus[element_skill.val()]
    return parseInt(power);
}

function updateCombatRadius(element_target_id, element_equipment_id, equipment_id) {
    var element_radius_target = $("#radius-" + element_target_id)
    var element_radius_equipment = $("#radius-" + element_target_id + "-" + element_equipment_id)
    var radius = (equipment_id == 0) ? 0 : data_equipment_id_ship[equipment_id].radius;
    element_radius_equipment.text(radius)

    var radius_add = 0;
    var radius_min = 0;
    for (var i=0; i<4; i++) {
        if (record_base[element_target_id][i].id == 0) {
            continue;
        }
        var equipment_sub_id = record_base[element_target_id][i].id;
        var equipment_sub_type = data_equipment_id_ship[equipment_sub_id].type
        var equipment_sub_radius = data_equipment_id_ship[equipment_sub_id].radius
        switch (equipment_sub_type) {
            case 9:
            case 10:
            case 41:
            case 56:
                if (radius_add < equipment_sub_radius) {
                    radius_add = equipment_sub_radius;
                }
            default:
                if (radius_min == 0 || radius_min > equipment_sub_radius) {
                    radius_min = equipment_sub_radius;
                }
        }
    }
    if (radius_add != 0) {
        if (Math.sqrt(radius_add - radius_min) >= 3) {
            radius_min += 3
        } else {
            radius_min += Math.round(Math.sqrt(radius_add - radius_min));
        }
    }
    element_radius_target.text(radius_min);
}

/**
 * [getPowerEnemy description]
 * @param  {[type]} index [description]
 * @return {[type]}       [description]
 */
function updateAirPowerEnemy() {
    for(var i=0; i<12; i++) {
        var enemy_id = record_map.fleet[i];
        if (enemy_id == 0) {
            continue;
        }
        if (data_enemy_id[enemy_id].space[0] == -1) {
            $("#airpower-enemy-" + i).empty().append("<input type='number' class='airpower form-control'>")
            continue;
        }

        var power_base = 0;
        var power_ship = 0;
        for (var j=0; j<data_enemy_id[enemy_id].slot; j++) {
            var equipment_id = data_enemy_id[enemy_id].equipment[j]
            switch(data_equipment_id_enemy[equipment_id].type) {
                case 9:
                case 10:
                case 41:
                case 56:
                    power_base += data_equipment_id_enemy[equipment_id].antiAir * Math.sqrt(data_enemy_id[enemy_id].space[j])
                    break;
                case 6:
                case 7:
                case 8:
                case 11:
                case 45:
                case 47:
                case 48:
                case 49:
                case 52:
                case 53:
                case 54:
                case 57:
                    power_ship += data_equipment_id_enemy[equipment_id].antiAir * Math.sqrt(data_enemy_id[enemy_id].space[j])
                    break;
                default:
            }
        }
        if (power_base == 0) {
            $("#airpower-enemy-" + i).empty().text(parseInt(power_ship))
        } else {
            $("#airpower-enemy-" + i).empty().text(parseInt(power_ship) + "(" + parseInt(power_ship + power_base) + ")")
        }
    }
}

/**
 * [simulatePhase description]
 * @return {[type]} [description]
 */
function updateResult() {
    if (record_map.cell === 0) return;
    if (!checkCombatRadius()) {
        $("#error-message").text("基地航空隊の航続距離が足りません。").show()
        $("#result-content").hide();
        return;
    } else {
        $("#error-message").text("").hide()
        $("#result-content").show();
    }
    let result = getResult();
    console.info(result);
    for (let i=0; i<7; i++) {
        chart.series[0].data[i].update(result["probe"][i], true, { duration: 300 });
        $(".highchart-color-0")[i].css("fill", result["color"][i]);
        $("#result-ship-" + i).text(result["airPower_ship"][i]);
        $("#result-enemy-" + i).text(result["airPower_enemy"][i]);
        $("#result-status-" + i).text(result["status"][i]);
    }
}

function checkCombatRadius(){
    for (let i=0; i<3; i++) {
        if (Number($("#downRate-" + Number(2*i)).val()) === 0 && Number($("#downRate-" + Number(2*i+1)).val()) === 0) continue;
        if (Number($("#radius-enemy-value").text) > Number($("#radius-" + i).text)) return false;
    }
    return true;
}

function getResult() {
    let result = {
        "status": [],
        "airPower_enemy": [],
        "airPower_ship": [],
        "probe": [],
        "color": []
    };

    let enemy_info = {
        // "0": {
        //     "0": {
        //         "id":0,
        //         "antiAir_base":0,
        //         "antiAir_ship":0,
        //         "space":0,
        //         "rand": {
        //             0: 1
        //         }
        //     }
        // }
    };
    for (let i=0; i<12; i++) {
        if (record_map.fleet[i] == 0) continue;
        let enemy_id = record_map.fleet[i];

        enemy_info[i] = {}
        let flag = false;
        for (let j=0; j<data_enemy_id[enemy_id].slot; j++) {
            let equipment_id = data_enemy_id[enemy_id].equipment[j]
            let equipment_type = data_equipment_id_enemy[equipment_id].type
            enemy_info[i][j] = {
                "id": equipment_id,
                "space": data_enemy_id[enemy_id].space[j]
            }
            switch (equipment_type) {
                case 9:
                case 10:
                case 41:
                case 56:
                    enemy_info[i][j].antiAir_base = data_equipment_id_enemy[equipment_id].antiAir
                    enemy_info[i][j].antiAir_ship = 0
                    flag = true;
                    break;
                case 6:
                case 7:
                case 8:
                case 11:
                case 45:
                case 47:
                case 48:
                case 49:
                case 52:
                case 53:
                case 54:
                case 57:
                    enemy_info[i][j].antiAir_base = data_equipment_id_enemy[equipment_id].antiAir
                    enemy_info[i][j].antiAir_ship = data_equipment_id_enemy[equipment_id].antiAir
                    flag = true;
                    break;
                default:
                    enemy_info[i][j].antiAir_base = 0;
                    enemy_info[i][j].antiAir_ship = 0;
            }
        }
        if (!flag) delete enemy_info[i];
    }

    for (let i=0; i<3; i++) {
        result["airPower_ship"].push(Number($("#airpower-base-" + i).val()))
        result["airPower_ship"].push(Number($("#airpower-base-" + i).val()))
    }
    let power = 0;
    switch (Number($("[name=fleet]:checked").val())) {
        case 1:
            for (let i=0; i<6; i++) {
                power += Number($("#airpower-ship-" + i).val())
            }
            result["airPower_ship"].push(power);
            for (let i=6; i<12; i++) {
                power += Number($("#airpower-ship-" + i).val())
            }
            result["airPower_ship"].push(power);
            break;
        case 2:
            for (let i=12; i<19; i++) {
                power += Number($("#airpower-ship-" + i).val())
            }
            result["airPower_ship"].push(power);
            break;
        default:
            for (let i=0; i<6; i++) {
                power += Number($("#airpower-ship-" + i).val())
            }
            result["airPower_ship"].push(power);
    }

    // 基地航空隊
    for (let i=0; i<6; i++) {
        let quotient, down_rate, rand_max;
        let rand_table = [];

        power = 0;
        Object.keys(enemy_info).forEach(function(key) {
            Object.keys(this[key]).forEach(function(key2) {
                power += parseInt(this[key2].antiAir_base*Math.sqrt(this[key2].space))
            }, enemy_info[key])
        }, enemy_info)
        result["airPower_enemy"].push(power);

        // 撃墜率チェック
        // 無効の場合は、continue
        down_rate = 0;
        if (Number($("#downRate-" + i).val()) === 0) {
            result["status"].push("-");
            result["color"].push('rgba(0,0,0,0)');
            result["probe"].push(0);
            continue;
        } else {
            down_rate = Number($("#downRate-" + i).val()) / 100;
        }

        if (power != 0) {
            quotient = (Math.round(result["airPower_ship"][i]*10000/power)/10000 < 3.5) ? Math.round(result["airPower_ship"][i]*10000/power)/10000 : 3.5;
            result["probe"].push(quotient);
            if (quotient <= 1/3) {
                result["status"].push("喪失");
                result["color"].push('rgba(255,99,132,1)');
                rand_max = 1;
                down_rate *= 0.1;
            } else if (quotient <= 2/3) {
                result["status"].push("劣勢");
                result["color"].push('rgba(255, 159, 64, 1)');
                rand_max = 4;
                down_rate *= 0.4;
            } else if (quotient < 3/2) {
                result["status"].push("均衡");
                result["color"].push('rgba(255, 206, 86, 1)');
                rand_max = 6;
                down_rate *= 0.6;
            } else if (quotient < 3) {
                result["status"].push("優勢");
                result["color"].push('rgba(54, 162, 235, 1)');
                rand_max = 8;
                down_rate *= 0.8;
            } else {
                result["status"].push("確保");
                result["color"].push('rgba(75, 192, 192, 1)');
                rand_max = 10;
                down_rate *= 1.0;
            }
        } else {
            result["status"].push("確保");
            result["color"].push('rgba(75, 192, 192, 1)');
            result["probe"].push(3.5);
            down_rate *= 1.0;
        }

        Object.keys(enemy_info).forEach(function(key) {
            Object.keys(this[key]).forEach(function(key2) {
                let space = this[key2].space;
                space -= parseInt(space*down_rate)
                this[key2].space = space;
            }, enemy_info[key])
        }, enemy_info)
    }

    // 通常航空戦
    power = 0;
    Object.keys(enemy_info).forEach(function(key) {
        Object.keys(this[key]).forEach(function(key2) {
            power += parseInt(this[key2].antiAir_ship*Math.sqrt(this[key2].space))
        }, enemy_info[key])
    }, enemy_info)
    result["airPower_enemy"].push(power);

    if (power != 0) {
        let airPower_ship = (Number($("[name=fleet]:checked").val()) === 1) ? (result["airPower_ship"][6] + result["airPower_ship"][7]) : result["airPower_ship"][6]
        quotient = (Math.round(airPower_ship*10000/power)/10000 < 3.5) ? Math.round(airPower_ship*10000/power)/10000 : 3.5;
        result["probe"].push(quotient);
        if (quotient <= 1/3) {
            result["status"].push("喪失");
            result["color"].push('rgba(255,99,132,1)');
        } else if (quotient <= 2/3) {
            result["status"].push("劣勢");
            result["color"].push('rgba(255, 159, 64, 1)');
        } else if (quotient < 3/2) {
            result["status"].push("均衡");
            result["color"].push('rgba(255, 206, 86, 1)');
        } else if (quotient < 3) {
            result["status"].push("優勢");
            result["color"].push('rgba(54, 162, 235, 1)');
        } else {
            result["status"].push("確保");
            result["color"].push('rgba(75, 192, 192, 1)');
        }
    } else {
        result["status"].push("確保");
        result["probe"].push(3.5);
        result["color"].push('rgba(75, 192, 192, 1)');
    }
    return result;
}
