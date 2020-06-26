var age, height, weight;
var bmr;
var total_cal;

var gender; // male / female
var checked_male = false;
var checked_female = false;

var already_reset_button = false;
var already_arch_opt = false;


function valid_input(){

    age = document.getElementById("age").value;
    height = document.getElementById("height").value;
    weight = document.getElementById("weight").value;

    if(age > 10 && age < 130 && height > 50 && height < 250 && weight > 20 && weight < 300 && (checked_male || checked_female)){

        return true;
    }
    
    return false;
}

function clean(){

    let arr = document.getElementsByClassName("item_text hidden");
    const len = arr.length;

    for(let i = 0; i < len; i++){
            
        arr[i].style.display = 'none';
    }

    if(checked_male == true){

        document.getElementById("male").click();
    }
    if(checked_female == true){

        document.getElementById("female").click();
    }

    let to_clean = document.getElementsByClassName("item_input");
    const len2 = to_clean.length;

    for(let i = 0; i < len2; i++){

        to_clean[i].value = "";
    }
}

function bmr_calc(){

    let first_rez, second_rez;

    if(gender == "male"){

        first_rez = 13.39 * weight + 4.79 * height - 5.67 * age + 88.36;
        second_rez = 10 * weight + 6.25 * height - 5 * age + 5;
    }
    else{

        first_rez = 9.24 * weight + 3.09 * height - 4.33 * age + 447.59;
        second_rez = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    return (first_rez + second_rez) / 2;
}

function total_calc(){

    let activity_level = document.getElementById("activity_level").value;

    if(activity_level == "low"){
        
        return bmr * 1.53;
    }
    else if(activity_level == "mid"){
        
        return bmr * 1.76;
    }
    else if(activity_level == "high"){
        
        return bmr * 2.25;
    }
}

function show(){

    if(valid_input()){

        let arr = document.getElementsByClassName("item_text hidden");
        const len = arr.length;

        for(let i = 0; i < len; i++){
            
            arr[i].style.display = 'block';
        }

        update_reset_button();

        bmr = bmr_calc();
        total_cal = total_calc();

        arr[0].innerHTML = "<b>BMR(kcal): </b>" + Math.round(bmr);
        arr[1].innerHTML = "<b>TOTAL(kcal): </b>" + Math.round(total_cal);
        arr[2].innerHTML = "<b>TOTAL FOR WEIGHT LOSS(kcal): </b>" + (Math.round(total_cal) - 500);
        arr[3].innerHTML = "<b>TOTAL FOR WEIGHT GAIN(kcal): </b>" + (Math.round(total_cal) + 200);
        arr[4].innerHTML = "<b> PROTEINS(g): </b>" + Math.round(1.5 * weight);
    }
    else{

        alert("Invalid input on age/weight/height/gender fields!");
    }
} 

function update_reset_button(){

    if(!already_reset_button){

        let elem_rst = document.createElement("button")
        let txt_rst = document.createTextNode("RESET")
        elem_rst.appendChild(txt_rst);

        let nextto_rst = document.getElementById("kcal_calc_btn");
        let parent = document.getElementById("divd")
        parent.appendChild(elem_rst, nextto_rst);

        elem_rst.className = "item_button";
        elem_rst.id = "to_remove";

        let elem_add_arch = document.createElement("button");
        let txt_add_arch = document.createTextNode("ARCHIVE OPTIONS");
        elem_add_arch.appendChild(txt_add_arch);

        let nextto_add_arch = document.getElementById("to_remove");
        parent.appendChild(elem_add_arch, nextto_add_arch);

        elem_add_arch.className = "item_button";
        elem_add_arch.id = "archive_options";
        elem_add_arch.style.marginLeft = "3%";

        document.getElementById("archive_options").addEventListener("click", show_archive_options);
        document.getElementById("to_remove").addEventListener("click", remove_button);

        already_reset_button = true;
    }
}

function get_male(){

    if(checked_female == false){

        if(checked_male == false){

            gender = "male";
            checked_male = true;
        }
        else{

            gender = undefined;
            checked_male = false;
        }
    }
    else{

        document.getElementById("male").click();
    }
}

function get_female(){

    if(checked_male == false){

        if(checked_female == false){

            gender = "female";
            checked_female = true;
        }
        else{

            gender = undefined;
            checked_female = false;
        }
    }
    else{

        document.getElementById("female").click();
    }
}

function age_warn(){

    age = document.getElementById("age").value;

    if(age <= 10 || age >= 130){

        document.getElementById("w_a").style.display = 'block';
    }
    else{

        document.getElementById("w_a").style.display = 'none';
    }
}

function height_warn(){

    height = document.getElementById("height").value;
    
    if(height <= 50 || height >= 250){

        document.getElementById("w_h").style.display = 'block';
    }
    else{

        document.getElementById("w_h").style.display = 'none';
    }
}

function weight_warn(){

    weight = document.getElementById("weight").value;
    
    if(weight <= 20 || weight >= 300){

        document.getElementById("w_w").style.display = 'block';
    }
    else{

        document.getElementById("w_w").style.display = 'none';
    }
}

function remove_button(){

    document.getElementById("to_remove").remove();
    document.getElementById("archive_options").remove();
    
    if(already_arch_opt){

        document.getElementById("arch_form").remove();
        document.getElementById("add_arch").remove();
        document.getElementById("del_arch").remove();
        document.getElementById("srch_arch").remove();
        document.getElementById("show_arch").remove();

        if(already_full_arch){
            
            clear_showed_arch();

            already_full_arch = false;
        }
    }

    clean();

    already_reset_button = false;
    already_arch_opt = false;
}

function show_archive_options(){

    if(!already_arch_opt){

        //form for name

        let nextto_form = document.getElementById("archive_options");
        let parent_form = document.getElementById("divd");

        let arch_form = document.createElement("form");
        arch_form.className = "item_form";
        arch_form.id = "arch_form"

        parent_form.appendChild(arch_form, nextto_form);

        //label and input for name

        let arch_form_name_label = document.createElement("label");
        let txt_arch_form_name_label = document.createTextNode("Name:");
        arch_form_name_label.appendChild(txt_arch_form_name_label);

        arch_form_name_label.className = "item_label";
        arch_form_name_label.id = "name_label";

        arch_form.appendChild(arch_form_name_label);

        let newline3 = document.createElement("br");
        arch_form_name_label.appendChild(newline3);

        let arch_form_name_input = document.createElement("input");

        arch_form_name_input.className = "item_input";
        arch_form_name_input.id = "name_input";
    
        arch_form.appendChild(arch_form_name_input, arch_form_name_label);
        
        //ADD, DELETE, SEARCH buttons

        let arch_add_btn = document.createElement("button");
        let txt_arch_add_btn = document.createTextNode("ADD TO ARCHIVE");
        arch_add_btn.appendChild(txt_arch_add_btn);

        arch_add_btn.className = "item_button";
        arch_add_btn.id = "add_arch";

        parent_form.appendChild(arch_add_btn, document.getElementById("archive_options"));

        let arch_del_btn = document.createElement("button");
        let txt_arch_del_btn = document.createTextNode("DELETE FROM ARCHIVE");
        arch_del_btn.appendChild(txt_arch_del_btn);

        arch_del_btn.className = "item_button";
        arch_del_btn.id = "del_arch";

        parent_form.appendChild(arch_del_btn, arch_add_btn);

        let arch_srch_btn = document.createElement("button");
        let txt_arch_srch_btn = document.createTextNode("SEARCH ARCHIVE");
        arch_srch_btn.appendChild(txt_arch_srch_btn);

        arch_srch_btn.className = "item_button";
        arch_srch_btn.id = "srch_arch";

        parent_form.appendChild(arch_srch_btn, arch_del_btn);

        ///archive show button

        let arch_show_btn = document.createElement("button");
        let txt_arch_show_btn = document.createTextNode("SHOW ARCHIVE");
        arch_show_btn.appendChild(txt_arch_show_btn);

        arch_show_btn.className = "item_button";
        arch_show_btn.id = "show_arch";

        parent_form.appendChild(arch_show_btn, arch_srch_btn);

        ///listeners to launch requests

        document.getElementById("add_arch").addEventListener("click", function(){ 

            let gender_string;

            let activity_level = document.getElementById("activity_level").value;

            if(checked_female){

                gender_string = "female";
            }
            else{

                gender_string = "male";
            }

            let name_input = document.getElementById("name_input").value;

            addrequest(gender_string, age, height, weight, bmr, total_cal, activity_level, name_input);
        });
        document.getElementById("del_arch").addEventListener("click", function(){

            let name_input = document.getElementById("name_input").value;

            delrequest(name_input);
        });
        document.getElementById("srch_arch").addEventListener("click", function(){

            let name_input = document.getElementById("name_input").value;
            
            srchrequest_name(name_input);
        });
        document.getElementById("show_arch").addEventListener("click", function(){

            full_archive();
        });

        already_arch_opt = true;
    }
}



