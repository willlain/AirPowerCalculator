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


// function rate() {
    // 制空状態の撃墜率の乱数（4～121パターン）
    // →各スロットごとの残機数の確率（0～最大機数パターン）
    // →各スロットごとの制空値（対空*√機数）の確率（0～対空*√機数の最大値のパターン）
    // ⇒1空母分の制空値の確率（0～対空*√機数の最大値のパターンのスロットごとで乗算）
    // ⇒1艦隊の制空値の確率（）

    // let rand_fleet_info = {
    //     // phase
    //     0: {
    //         "rand_fleet": {
    //             "x": 1
    //         },
    //     },
    //     1: {
    //
    //     }
    // }
    // let rand_enemy_info = {
    //     // 艦隊番号
    //     0: {
    //         "rand_enemy": {
    //             "x": 1
    //         },
    //
    //     }
    // }
    //
    // let rand_slot_info = {
    //     // 装備番号
    //     0: {
    //         "rand_space": {
    //             "x": 1
    //         }
    //         "rand_equipment": {
    //             "x": 1
    //         },
    //     }
    // }
    //
    // let  down_rate_table = []
    // for (let i=0; i<rand_max; i++) {
    //     for (let j=0; j<rand_max; j++){
    //         down_rate_table.push(0.35*i + 0.65*j);
    //     }
    // }
    // down_rate_table.sort(function (a, b) { return a - b; });
    //
    // for (let i=0; i < down_rate_table.length; i++) {
    //     Object.keys(rand_info[0][0][0].rand_space).forEach(function(key) {
    //         let space = key;
    //         space -= parseInt(space*down_rate_table[i]);
    //         let probe = 1 / down_rate_table.length
    //         rand_info[1][0][0].rand_space[space] += probe
    //     }, rand_info[0][0][0].rand_space)
    // }

// }

/**
 * [simulatePhase description]
 * @return {[type]} [description]
 */
function simulatePhase() {
    let result = {
        "state": [],
        "airPower_enemy": [],
        "airPower_ship": []
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
                    break;
                default:
                    enemy_info[i][j].antiAir_base = 0;
                    enemy_info[i][j].antiAir_ship = 0;
            }
        }
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

        // resultオプションチェック
        // 無効の場合は、continue
        down_rate = 0;
        switch (Number($("[name=activate-base-" + i + "]:checked").val())) {
            case 1:
                down_rate = Number($("#downRate-" + i).val()) / 100;
                break;
            default:
                result["status"].push("-");
                // result["probe"][i+1][0] = "-";
                continue;
        }

        quotient = Math.round(result["airPower_ship"][i]*10000/power)/10000;
        if (power != 0) {
            if (quotient <= 1/3) {
                result["status"].push("喪失");
                rand_max = 1;
                down_rate *= 0.1;
            } else if (quotient <= 2/3) {
                result["status"].push("劣勢");
                rand_max = 4;
                down_rate *= 0.4;
            } else if (quotient < 3/2) {
                result["status"].push("均衡");
                rand_max = 6;
                down_rate *= 0.6;
            } else if (quotient < 3) {
                result["status"].push("優勢");
                rand_max = 8;
                down_rate *= 0.8;
            } else {
                result["status"].push("確保");
                rand_max = 10;
                down_rate *= 1.0;
            }
        } else {
            result["status"].push("確保");
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
        quotient = (Number($("[name=fleet]:checked").val()) === 1) ? Math.round((result["airPower_ship"][6]+result["airPower_ship"][7])*10000/power)/10000 : Math.round(result["airPower_ship"][6]*10000/power)/10000;
        if (quotient <= 1/3) {
            result["status"].push("喪失");
        } else if (quotient <= 2/3) {
            result["status"].push("劣勢");
        } else if (quotient < 3/2) {
            result["status"].push("均衡");
        } else if (quotient < 3) {
            result["status"].push("優勢");
        } else {
            result["status"].push("確保");
        }
    } else {
        result["status"].push("確保");
    }

    // for (var i=1; i<result_ships_arr.length; i++) {
    //     if (result_ships_arr[i] != "-") {
    //         power = 0;
    //         for (var j=0; j<info_enemy_arr.length; j++) {
    //             var power_AB = 0;
    //             var power_AC = 0;
    //             for (var k=0; k<info_enemy_arr[j].slot.length; k++) {
    //                 antiAir_AB = info_enemy_arr[j].antiAirAB[k];
    //                 antiAir_AC = info_enemy_arr[j].antiAirAC[k];
    //                 slot = slot_arr[j][k];
    //                 power_AB += parseInt(antiAir_AB*Math.sqrt(slot));
    //                 power_AC += parseInt(antiAir_AC*Math.sqrt(slot));
    //             }
    //             power += power_AC;
    //             if (power_AB != power_AC) {
    //                 if (i != 7) {
    //                     power += power_AB;
    //                 }
    //             }
    //         }
    //         result_enemy_arr.push(power);
    //
    //         if (power != 0) {
    //             if (i != 7) {
    //                 if ($("#method-AB-" + parseInt((i+1)/2)).val() == 1 || $("#method-AB-" + parseInt((i+1)/2)).val() == 4) {
    //                     down = 0.5;
    //                 } else if ($("#method-AB-" + (parseInt((i+1)/2))).val() == 2) {
    //                     if (i%2 == 0) {
    //                         down = 0.5;
    //                     } else {
    //                         down = 0.2;
    //                     }
    //                 } else {
    //                     down = 0.2;
    //                 }
    //             } else {
    //                 down = 0;
    //             }
    //
    //             var quotient = Math.round(result_ships_arr[i]*10000/power)/10000;
    //             graph_data.push(quotient*100);
    //             if (quotient <= 1/3) {
    //                 down *= 0.1;
    //                 status = "喪失";
    //                 background_color.push('rgba(255, 99, 132, 0.2)');
    //                 border_color.push('rgba(255,99,132,1)');
    //                 under = parseInt(result_ships_arr[i]-1-power/3);
    //                 $("#label-result-" + (4*i-3)).text(under);
    //                 $("#label-result-" + (4*i-2)).text("　");
    //                 $("#label-result-" + (4*i-1)).text("　");
    //                 $("#label-result-" + (4*i)).text("　");
    //             } else if (quotient <= 2/3) {
    //                 down *= 0.4;
    //                 status = "劣勢";
    //                 background_color.push('rgba(255, 159, 64, 0.2)');
    //                 border_color.push('rgba(255, 159, 64, 1)');
    //                 over = "+" + parseInt(result_ships_arr[i]-power/3);
    //                 under = parseInt(result_ships_arr[i]-1-2*power/3);
    //                 $("#label-result-" + (4*i-3)).text(over);
    //                 $("#label-result-" + (4*i-2)).text(under);
    //                 $("#label-result-" + (4*i-1)).text("　");
    //                 $("#label-result-" + (4*i)).text("　");
    //             } else if (quotient < 3/2) {
    //                 down *= 0.6;
    //                 status = "均衡";
    //                 background_color.push('rgba(255, 206, 86, 0.2)');
    //                 border_color.push('rgba(255, 206, 86, 1)');
    //                 over = "+" + parseInt(result_ships_arr[i]-2*power/3);
    //                 under = parseInt(result_ships_arr[i]-3*power/2);
    //                 $("#label-result-" + (4*i-3)).text("　");
    //                 $("#label-result-" + (4*i-2)).text(over);
    //                 $("#label-result-" + (4*i-1)).text(under);
    //                 $("#label-result-" + (4*i)).text("　");
    //             } else if (quotient < 3) {
    //                 down *= 0.8;
    //                 status = "優勢";
    //                 background_color.push('rgba(54, 162, 235, 0.2)');
    //                 border_color.push('rgba(54, 162, 235, 1)');
    //                 over = "+" + parseInt(result_ships_arr[i]-3*power/2);
    //                 under = parseInt(result_ships_arr[i]-3*power);
    //                 $("#label-result-" + (4*i-3)).text("　");
    //                 $("#label-result-" + (4*i-2)).text("　");
    //                 $("#label-result-" + (4*i-1)).text(over);
    //                 $("#label-result-" + (4*i)).text(under);
    //             } else {
    //                 down *= 1;
    //                 status = "確保";
    //                 background_color.push('rgba(75, 192, 192, 0.2)');
    //                 border_color.push('rgba(75, 192, 192, 1)');
    //                 over = "+" + parseInt(result_ships_arr[i]-3*power);
    //                 $("#label-result-" + (4*i-3)).text("　");
    //                 $("#label-result-" + (4*i-2)).text("　");
    //                 $("#label-result-" + (4*i-1)).text("　");
    //                 $("#label-result-" + (4*i)).text(over);
    //             }
    //
    //             slot_arr_dummy = [];
    //             for (var j=0; j<slot_arr.length; j++) {
    //                 var arr = [];
    //                 for (var k=0; k<slot_arr[j].length; k++) {
    //                     arr.push(slot_arr[j][k]-parseInt(slot_arr[j][k]*down))
    //                 }
    //                 slot_arr_dummy.push(arr);
    //             }
    //             slot_arr = [];
    //             slot_arr = slot_arr_dummy.concat();
    //         } else {
    //             status = "確保";
    //             graph_data.push(16.67*20);
    //             background_color.push('rgba(75, 192, 192, 0.2)');
    //             border_color.push('rgba(75, 192, 192, 1)');
    //             $("#label-result-" + (4*i-3)).text("　");
    //             $("#label-result-" + (4*i-2)).text("　");
    //             $("#label-result-" + (4*i-1)).text("　");
    //             $("#label-result-" + (4*i)).text("　");
    //         }
    //     } else {
    //         result_enemy_arr.push("-");
    //         status = "-";
    //         graph_data.push(0);
    //         background_color.push('rgba(255, 99, 132, 0.2)');
    //         border_color.push('rgba(255, 99, 132, 1)');
    //         $("#label-result-" + (4*i-3)).text("　");
    //         $("#label-result-" + (4*i-2)).text("　");
    //         $("#label-result-" + (4*i-1)).text("　");
    //         $("#label-result-" + (4*i)).text("　");
    //     }
    //     result_status_arr.push(status);
    // }
    // myBarChart.config.data.datasets = [{data: graph_data, backgroundColor: background_color, borderColor: border_color, borderWidth: 1}];
    // myBarChart.update();
    // $("#table-result").DataTable().row(0).data(result_ships_arr);
    // $("#table-result").DataTable().row(1).data(result_enemy_arr);
    // $("#table-result").DataTable().row(2).data(result_status_arr);
    // $("#table-result").DataTable().draw();
}

function checkCombatRadius(){

}
