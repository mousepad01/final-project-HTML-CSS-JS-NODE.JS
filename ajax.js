///const express = require("express");

function addrequest(gender, age, height, weight, bmr_input, total_input, activity_level, name_input){

    fetch("http://localhost:3000/search_history_by_name/" + name_input, {

        method:"get"
    }).then(function(res){

        console.log(res);

        if(res.status == "200"){

            alert("Cannot add input under " + name_input + " name (name already in use in archive); please enter another name");
        }
        else{

            var newRequest = {

                gender: gender,
                age: age,
                height: height,
                weight: weight,
                activity_level: activity_level,
                name: name_input,
                bmr: bmr_input,
                totalKCAL: total_input
            }
        
            fetch("http://localhost:3000/search_history",{
        
                method: "post",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(newRequest)
        
            }).then(function(res){
        
                console.log(res);
                
                if(res.status == "200"){
        
                    alert("Item added successfully in archive!");
                }
                else{
        
                    alert("Error while trying to add item in archive --> status" + status);
                }
            });
        }
    });
}

function delrequest(name_input){

    fetch("http://localhost:3000/search_history_by_name/" + name_input, {

        method: "delete",
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(function(res){

        console.log(res);

        if(res.status == "200"){

            alert("Item with name " + name_input + " was successfully deleted from archive!");
        }
        else{

            alert("Item with name " + name_input + " does not exist in archive! --> status " + res.status);
        }
    });
}

function srchrequest_name(name_input){

    fetch("http://localhost:3000/search_history_by_name/" + name_input, {
        method: "get"
    }).then((res) => {

        console.log(res);

        if(res.status != "200"){

            alert("Could not find searched input in archive; --> status " + res.status);
        }
        else{

            res.json().then(function(data){
            
                //gender load

                //checked_female = false;
                //checked_male = false;

                if(data.gender == "female"){

                    document.getElementById("female").checked = true;
                    document.getElementById("male").checked = false;

                    checked_female = true;
                    checked_male = false;

                    gender = "female";
                }
                else{

                    document.getElementById("male").checked = true;
                    document.getElementById("female").checked = false;

                    checked_male = true;
                    checked_female = false;

                    gender = "male";
                }

                //age, height, weight, activity level load

                document.getElementById("age").value = data.age;
                document.getElementById("height").value = data.height;
                document.getElementById("weight").value = data.weight;

                if(data.activity_level == "low"){

                    document.getElementById("activity_level").selectedIndex = "0";
                }
                else if(data.activity_level == "mid"){

                    document.getElementById("activity_level").selectedIndex = "1";
                }
                else{

                    document.getElementById("activity_level").selectedIndex = "2";
                }
                
                ///results load
                let arr = document.getElementsByClassName("item_text hidden");
                
                arr[0].innerHTML = "<b>BMR(kcal): </b>" + Math.round(data.bmr);
                arr[1].innerHTML = "<b>TOTAL(kcal): </b>" + Math.round(data.totalKCAL);
                arr[2].innerHTML = "<b>TOTAL FOR WEIGHT LOSS(kcal): </b>" + (Math.round(data.totalKCAL) - 500);
                arr[3].innerHTML = "<b>TOTAL FOR WEIGHT GAIN(kcal): </b>" + (Math.round(data.totalKCAL) + 200);
                arr[4].innerHTML = "<b> PROTEINS(g): </b>" + Math.round(1.5 * data.weight);
            })
        }
    })
}

var already_full_arch = false;
var len;

function full_archive(){

    if(!already_full_arch){

        fetch("http://localhost:3000/search_history", {

            method: "get"
        }).then(function(res){

            console.log(res);
            
            if(res.status == "200"){

                res.json().then(function(data){

                    len = data.length;

                    let parent = document.getElementById("divd");

                    for(let i = 0; i < len; i++){
                        
                        ///nume log

                        let next_to = document.getElementById("show_arch");

                        let log_name = document.createElement("p");
                        let log_name_text = document.createTextNode("Name of log: " + data[i].logName);

                        log_name.appendChild(log_name_text);
                        parent.insertBefore(log_name, next_to);

                        log_name.className = "item_text";
                        log_name.id = "log_name" + i;
                        
                        ///gender

                        next_to = log_name;

                        let log_gender = document.createElement("p");
                        let log_gender_text = document.createTextNode("Gender: " + data[i].gender);

                        log_gender.appendChild(log_gender_text);
                        parent.append(next_to, log_gender);

                        log_gender.className = "item_text";
                        log_gender.id = "log_gender" + i;

                        ///height

                        next_to = log_gender;

                        let log_age = document.createElement("p");
                        let log_age_text = document.createTextNode("Age: " + data[i].age);

                        log_age.appendChild(log_age_text);
                        parent.append(next_to, log_age);

                        log_age.className = "item_text";
                        log_age.id = "log_age" + i;

                        next_to = log_age;

                        let log_height = document.createElement("p");
                        let log_height_text = document.createTextNode("Height: " + data[i].height);

                        log_height.appendChild(log_height_text);
                        parent.append(next_to, log_height);

                        log_height.className = "item_text";
                        log_height.id = "log_height" + i;

                        ///weight

                        next_to = log_height;

                        let log_weight = document.createElement("p");
                        let log_weight_text = document.createTextNode("Weight: " + data[i].weight);

                        log_weight.appendChild(log_weight_text);
                        parent.append(next_to, log_weight);

                        log_weight.className = "item_text";
                        log_weight.id = "log_weight" + i;

                        ///activity level

                        next_to = log_weight;

                        let log_activity = document.createElement("p");

                        let log_activity_text;

                        if(data[i].activity_level == "low"){

                            log_activity_text = document.createTextNode("Activity level: Sedentary / Light activity");
                        }
                        else if(data[i].activity_level == "mid"){

                            log_activity_text = document.createTextNode("Activity level: Moderate activity");
                        }
                        else if(data[i].activity_level == "high"){

                            log_activity_text = document.createTextNode("Activity level: Intense activity");
                        }

                        log_activity.appendChild(log_activity_text);
                        parent.append(next_to, log_activity);

                        log_activity.className = "item_text";
                        log_activity.id = "log_activity" + i;

                        ///bmr

                        next_to = log_activity;

                        let log_bmr = document.createElement("p");
                        let log_bmr_text = document.createTextNode("Bmr: " + data[i].bmr);

                        log_bmr.appendChild(log_bmr_text);
                        parent.append(next_to, log_bmr);

                        log_bmr.className = "item_text";
                        log_bmr.id = "log_bmr" + i;

                        ///totalKCAL

                        next_to = log_bmr;

                        let log_total = document.createElement("p");
                        let log_total_text = document.createTextNode("Total: " + data[i].totalKCAL);

                        log_total.appendChild(log_total_text);
                        parent.append(next_to, log_total);

                        log_total.className = "item_text";
                        log_total.id = "log_total" + i;


                        ///delimitation

                        next_to = log_total;

                        let log_delim = document.createElement("hr");
                        
                        parent.append(next_to, log_delim);

                        log_delim.className = "item_split";
                        log_delim.id = "log_delim" + i;

                    }
                    already_full_arch = true;
                })
            }
        })
    }
    else{

        clear_showed_arch();

        already_full_arch = false;
    }
}

function clear_showed_arch(){

    for(let i = 0; i < len; i++){

        document.getElementById("log_name" + i).remove();
        document.getElementById("log_gender" + i).remove();
        document.getElementById("log_age" + i).remove();
        document.getElementById("log_height" + i).remove();
        document.getElementById("log_weight" + i).remove();
        document.getElementById("log_activity" + i).remove();
        document.getElementById("log_bmr" + i).remove();
        document.getElementById("log_total" + i).remove();
        document.getElementById("log_delim" + i).remove();
    }
}