/**
 * [getAirPowerSingle description]
 * @param  {[type]} element_type         [description]
 * @param  {[type]} element_target_id    [description]
 * @param  {[type]} element_equipment_id [description]
 * @return {[type]}                      [description]
 */
function updateAirPowerFrends(element_type, element_target_id, element_equipment_id) {
    let element_airPower_target = $("#airpower-" + element_type + "-" + element_target_id)
    let element_airPower_equipment = $("#airpower-" + element_type + "-" + element_target_id + "-" + element_equipment_id)
    let equipment_id = (element_type == "base") ? record_base[element_target_id][element_equipment_id].id : record_ship[element_target_id][element_equipment_id].id;
    let power = 0;
    if (equipment_id != 0) {
        let equipment_type = data_equipment_id_ship[equipment_id].type
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
                if (element_type == "base") power = getAirPower(element_type, element_target_id, element_equipment_id, equipment_id, equipment_type, 0, 0, 0);
                break;
            case 47:
            case 48:
            case 49:
            case 54:
                power = ($("#map-cell").val() != "防空") ? getAirPower(element_type, element_target_id, element_equipment_id, equipment_id, equipment_type, 0.2, 1.5, 0) : getAirPower(element_type, element_target_id, element_equipment_id, equipment_id, equipment_type, 0.2, 1, 2);
                // power = getAirPower(element_type, element_target_id, element_equipment_id, equipment_id, equipment_type, 0.2, 1, 2);
                break;
            default:
        }
    }
    element_airPower_equipment.text(power);

    power = 0;
    let item = (element_type == "base") ? 4 : 6;
    element_airPower_target.prop("disabled", false);
    for (let i=0; i<item; i++) {
        if (element_type == "base" && record_base[element_target_id][i].id != 0) element_airPower_target.prop("disabled", true);
        if (element_type == "ship" && record_ship[element_target_id][i].id != 0) element_airPower_target.prop("disabled", true);
        power += Number($("#airpower-" + element_type + "-" + element_target_id + "-" + i).text())
    }
    element_airPower_target.val(power);
}

function getAirPower(element_type, element_target_id, element_equipment_id, equipment_id, equipment_type, coefficient_improvement, coefficient_interception, coefficient_antiBobing) {
    let element_skill = $("#skill-" + element_type + "-" + element_target_id + "-" + element_equipment_id)
    let element_improvement = $("#improvement-" + element_type + "-" + element_target_id + "-" + element_equipment_id)
    let element_space = $("#space-" + element_type + "-" + element_target_id + "-" + element_equipment_id)
    let anti_air = data_equipment_id_ship[equipment_id].antiAir + coefficient_improvement * Number(element_improvement.val())

    if (coefficient_interception != 0) anti_air += coefficient_interception * data_equipment_id_ship[equipment_id].interception + coefficient_antiBobing * data_equipment_id_ship[equipment_id].antiBobing

    let power = anti_air * Math.sqrt(Number(element_space.val()))
    power += data_equipment_type_ship[equipment_type].skill_bonus[element_skill.val()]
    return parseInt(power);
}

function updateCombatRadius(element_target_id, element_equipment_id, equipment_id) {
    let element_radius_target = $("#radius-" + element_target_id)
    let element_radius_equipment = $("#radius-" + element_target_id + "-" + element_equipment_id)
    let radius = (equipment_id == 0) ? 0 : data_equipment_id_ship[equipment_id].radius;
    element_radius_equipment.text(radius)

    let radius_add = 0;
    let radius_min = 0;
    // let radius_rec_min = 0;
    for (let i=0; i<4; i++) {
        if (record_base[element_target_id][i].id == 0) continue;

        let equipment_sub_id = record_base[element_target_id][i].id;
        let equipment_sub_type = data_equipment_id_ship[equipment_sub_id].type
        let equipment_sub_radius = data_equipment_id_ship[equipment_sub_id].radius
        switch (equipment_sub_type) {
            case 9:
            case 10:
            case 41:
            case 56:
                if (radius_min == 0 || radius_min > equipment_sub_radius) radius_min = equipment_sub_radius;
                if (radius_add < equipment_sub_radius) radius_add = equipment_sub_radius;
                break;
            default:
                if (radius_min == 0 || radius_min > equipment_sub_radius) radius_min = equipment_sub_radius;
                break;
        }
    }
    if (radius_add != 0) {
        if (radius_min === 0) radius_min = radius_add;
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
    for(let i=0; i<12; i++) {
        let enemy_id = record_map.fleet[i];
        if (enemy_id == 0) {
            $("#airpower-enemy-" + i).empty()
            continue;
        }
        if (data_enemy_id[enemy_id].space[0] == -1) {
            $("#airpower-enemy-" + i).empty().append("<input type='number' class='airpower form-control'>")
            continue;
        }

        let power_base = 0;
        let power_ship = 0;
        for (let j=0; j<data_enemy_id[enemy_id].slot; j++) {
            let equipment_id = data_enemy_id[enemy_id].equipment[j]
            if (equipment_id === 0) continue;
            switch(data_equipment_id_enemy[equipment_id].type) {
                case 9:
                case 10:
                case 41:
                case 56:
                    power_base += parseInt(data_equipment_id_enemy[equipment_id].antiAir * Math.sqrt(data_enemy_id[enemy_id].space[j]))
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
                    power_ship += parseInt(data_equipment_id_enemy[equipment_id].antiAir * Math.sqrt(data_enemy_id[enemy_id].space[j]))
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
    if (checkCombatRadius()) {
        $("#error-message").text("").hide()
        $("#result-content").show();
        footerFixed();
    } else {
        $("#error-message").text("基地航空隊の航続距離が足りません。").show()
        $("#result-content").hide();
        footerFixed();
        return;
    }

    let result = ($("#map-cell").val() != "防空") ? getSortieResult() : getABResult();

    // 基地航空隊分
    for (let i=0; i<6; i++) {
        chart.series[0].data[i].update(result["probe"][i], true, { duration: 300 });
        $($(".highcharts-point")[i]).css("fill", result["color"][i]);
        $("#result-status-" + i).text(result["status"][i]);
        if (result["status"][i] != "-") {
            $("#result-ship-" + i).text(result["airPower_ship"][i]);
            $("#result-enemy-" + i).text(result["airPower_enemy"][i]);
        } else {
            $("#result-ship-" + i).text("-");
            $("#result-enemy-" + i).text("-");
        }
    }

    // 本隊
    chart.series[0].data[6].update(result["probe"][6], true, { duration: 300 });
    $($(".highcharts-point")[6]).css("fill", result["color"][6]);
    $("#result-status-6").text(result["status"][6]);
    let airPower_ship = (Number($("[name=fleet]:checked").val()) === 1 && record_map.fleet[6]) ? Number(result["airPower_ship"][6] + result["airPower_ship"][7]) : result["airPower_ship"][6];
    $("#result-ship-6").text(airPower_ship);
    $("#result-enemy-6").text(result["airPower_enemy"][6]);

    // グラフ装飾
    for (let i=0; i<7; i++) {
        for (let j=0; j<7; j++) {
            if (result["airPower_info"][i][j] || result["airPower_info"][i][j] === 0) {
                if (result["airPower_info"][i][j] >= 0) {
                    $("#result-airPower-" + i + "-" + j).text("+" + result["airPower_info"][i][j])
                } else {
                    $("#result-airPower-" + i + "-" + j).text(result["airPower_info"][i][j])
                }
            } else {
                $("#result-airPower-" + i + "-" + j).text("");
            }
        }
    }
}

function checkCombatRadius(){
    for (let i=0; i<3; i++) {
        if (Number($("#downRate-" + Number(2*i)).val()) === 0 && Number($("#downRate-" + Number(2*i+1)).val()) === 0) continue;
        if (Number($("#radius-" + i).text()) === 0) continue;
        if (Number($("#radius-enemy-value").text()) > Number($("#radius-" + i).text())) return false;
    }
    return true;
}

function getSortieResult() {
    let result = {
        "status": [],
        "airPower_enemy": [],
        "airPower_ship": [],
        "probe": [],
        "color": [],
        "airPower_info": []
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
            if (equipment_id === 0) continue;
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
            power = 0;
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
        let quotient, down_rate_val, short, excess, down_rate_max;

        power = 0;
        Object.keys(enemy_info).forEach(function(key) {
            Object.keys(this[key]).forEach(function(key2) {
                power += parseInt(this[key2].antiAir_base*Math.sqrt(this[key2].space))
            }, enemy_info[key])
        }, enemy_info)
        result["airPower_enemy"].push(power);

        // 撃墜率チェック
        // 無効の場合は、continue
        down_rate_val = 0;
        short = 0;
        excess = 0;
        down_rate_max = 0;
        if (Number($("#downRate-" + i).val()) === 0 || Number($("#radius-" + parseInt(i/2)).text()) === 0) {
            result["status"].push("-");
            result["color"].push('rgba(0,0,0,0)');
            result["probe"].push(0);
            result["airPower_info"].push({})
            continue;
        } else {
            down_rate_val = Number($("#downRate-" + i).val());
        }

        if (power != 0) {
            quotient = (Math.round(result["airPower_ship"][i]*10000/power)/10000 < 3.5) ? Math.round(result["airPower_ship"][i]*10000/power)/10000 : 3.5;
            result["probe"].push(quotient);
            if (quotient <= 1/3) {
                result["status"].push("喪失");
                result["color"].push('rgba(255,99,132,1)');
                short = result["airPower_ship"][i] - parseInt(power * (1/3)) -1;
                result["airPower_info"].push({1:short});
                down_rate_max = 10;
            } else if (quotient <= 2/3) {
                result["status"].push("劣勢");
                result["color"].push('rgba(255, 159, 64, 1)');
                excess = result["airPower_ship"][i] - parseInt(power * (1/3)) -1;
                short = result["airPower_ship"][i] - parseInt(power * (2/3)) -1;
                result["airPower_info"].push({0:excess, 2:short});
                down_rate_max = 40;
            } else if (quotient < 3/2) {
                result["status"].push("均衡");
                result["color"].push('rgba(255, 206, 86, 1)');
                excess = result["airPower_ship"][i] - parseInt(power * (2/3)) -1;
                short = result["airPower_ship"][i] - parseInt(power * (3/2)) -1;
                result["airPower_info"].push({1:excess, 4:short});
                down_rate_max = 60;
            } else if (quotient < 3) {
                result["status"].push("優勢");
                result["color"].push('rgba(54, 162, 235, 1)');
                excess = result["airPower_ship"][i] - parseInt(power * (3/2)) -1;
                short = result["airPower_ship"][i] - parseInt(power * 3) -1;
                result["airPower_info"].push({3:excess, 6:short});
                down_rate_max = 80;
            } else {
                result["status"].push("確保");
                result["color"].push('rgba(75, 192, 192, 1)');
                excess = result["airPower_ship"][i] - parseInt(power * 3) -1;
                result["airPower_info"].push({5:excess});
                down_rate_max = 100;
            }
        } else {
            result["status"].push("確保");
            result["color"].push('rgba(75, 192, 192, 1)');
            result["probe"].push(3.5);
            excess = result["airPower_ship"][i] - parseInt(power * 3) -1;
            result["airPower_info"].push({5:excess});
            down_rate_max = 100;
        }
        down_rate_val = (down_rate_val > down_rate_max) ? down_rate_max : down_rate_val;
        $("#downRate-" + i).slider('setValue', down_rate_val);

        down_rate_val /= 100;
        Object.keys(enemy_info).forEach(function(key) {
            Object.keys(this[key]).forEach(function(key2) {
                let space = this[key2].space;
                space -= parseInt(space*down_rate_val)
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

    let airPower_ship = (Number($("[name=fleet]:checked").val()) === 1 && enemy_info[6]) ? (result["airPower_ship"][6] + result["airPower_ship"][7]) : result["airPower_ship"][6]
    if (power != 0) {
        quotient = (Math.round(airPower_ship*10000/power)/10000 < 3.5) ? Math.round(airPower_ship*10000/power)/10000 : 3.5;
        result["probe"].push(quotient);
        if (quotient <= 1/3) {
            result["status"].push("喪失");
            result["color"].push('rgba(255,99,132,1)');
            short = airPower_ship - parseInt(power * (1/3)) -1;
            result["airPower_info"].push({1:short});
        } else if (quotient <= 2/3) {
            result["status"].push("劣勢");
            result["color"].push('rgba(255, 159, 64, 1)');
            excess = airPower_ship - parseInt(power * (1/3)) -1;
            short = airPower_ship - parseInt(power * (2/3)) -1;
            result["airPower_info"].push({0:excess, 2:short});
        } else if (quotient < 3/2) {
            result["status"].push("均衡");
            result["color"].push('rgba(255, 206, 86, 1)');
            excess = airPower_ship - parseInt(power * (2/3)) -1;
            short = airPower_ship - parseInt(power * (3/2)) -1;
            result["airPower_info"].push({1:excess, 4:short});
        } else if (quotient < 3) {
            result["status"].push("優勢");
            result["color"].push('rgba(54, 162, 235, 1)');
            excess = airPower_ship - parseInt(power * (3/2)) -1;
            short = airPower_ship - parseInt(power * 3) -1;
            result["airPower_info"].push({3:excess, 6:short});
        } else {
            result["status"].push("確保");
            result["color"].push('rgba(75, 192, 192, 1)');
            excess = airPower_ship - parseInt(power * 3) -1;
            result["airPower_info"].push({5:excess});
        }
    } else {
        result["status"].push("確保");
        result["probe"].push(3.5);
        result["color"].push('rgba(75, 192, 192, 1)');
        excess = airPower_ship - parseInt(power * 3) -1;
        result["airPower_info"].push({5:excess});
    }
    return result;
}

/**
 * [getABResult description]
 * @return {[type]} [description]
 */
function getABResult() {
    let result = {
        "status": [],
        "airPower_enemy": [],
        "airPower_ship": [],
        "probe": [],
        "color": [],
        "airPower_info": []
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

    let airPower_AB = 0;
    for (let i=0; i<3; i++) {
        airPower_AB += Number($("#airpower-base-" + i).val());
    }
    result["airPower_ship"].push(airPower_AB);

    // 敵の制空値計算
    let power = 0;
    Object.keys(enemy_info).forEach(function(key) {
        Object.keys(this[key]).forEach(function(key2) {
            power += parseInt(this[key2].antiAir_base*Math.sqrt(this[key2].space))
        }, enemy_info[key])
    }, enemy_info)
    result["airPower_enemy"].push(power);

    if (power != 0) {
        let quotient = (Math.round(result["airPower_ship"][0]*10000/power)/10000 < 3.5) ? Math.round(result["airPower_ship"][0]*10000/power)/10000 : 3.5;
        result["probe"].push(quotient);
        if (quotient <= 1/3) {
            result["status"].push("喪失");
            result["color"].push('rgba(255,99,132,1)');
            short = result["airPower_ship"][0] - parseInt(power * (1/3)) -1;
            result["airPower_info"].push({1:short});
        } else if (quotient <= 2/3) {
            result["status"].push("劣勢");
            result["color"].push('rgba(255, 159, 64, 1)');
            excess = result["airPower_ship"][0] - parseInt(power * (1/3)) -1;
            short = result["airPower_ship"][0] - parseInt(power * (2/3)) -1;
            result["airPower_info"].push({0:excess, 2:short});
        } else if (quotient < 3/2) {
            result["status"].push("均衡");
            result["color"].push('rgba(255, 206, 86, 1)');
            excess = result["airPower_ship"][0] - parseInt(power * (2/3)) -1;
            short = result["airPower_ship"][0] - parseInt(power * (3/2)) -1;
            result["airPower_info"].push({1:excess, 4:short});
        } else if (quotient < 3) {
            result["status"].push("優勢");
            result["color"].push('rgba(54, 162, 235, 1)');
            excess = result["airPower_ship"][0] - parseInt(power * (3/2)) -1;
            short = result["airPower_ship"][0] - parseInt(power * 3) -1;
            result["airPower_info"].push({3:excess, 6:short});
        } else {
            result["status"].push("確保");
            result["color"].push('rgba(75, 192, 192, 1)');
            excess = result["airPower_ship"][0] - parseInt(power * 3) -1;
            result["airPower_info"].push({5:excess});
        }
    } else {
        result["status"].push("確保");
        result["color"].push('rgba(75, 192, 192, 1)');
        result["probe"].push(3.5);
        excess = result["airPower_ship"][0] - parseInt(power * 3) -1;
        result["airPower_info"].push({5:excess});
    }

    for (let i=0; i<6; i++) {
        result["airPower_enemy"].push("-");
        result["airPower_ship"].push("-");
        result["status"].push("-");
        result["color"].push('rgba(0,0,0,0)');
        result["probe"].push(0);
        result["airPower_info"].push({})
    }

    return result;
}
