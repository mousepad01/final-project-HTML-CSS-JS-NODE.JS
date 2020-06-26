var question_list = [{

    question : "How much grams of protein / kg should you eat in a day?",
    answers: [["0.1- 0.3 g/kg", false], ["2 - 2.5 g/kg", false], ["1 - 1.5 g/kg", true], ["any amount", false]]
},
{

    question : "Recommended volume of sets / week / muscle group is: ",
    answers: [["10 - 15 sets", true], ["8 - 10 sets for smaller groups, 10 - 15 for bigger groups", true], ["6 - 10 sets for bigger groups, 10 - 15 for smaller groups", false], ["3 - 7 sets", false], ["15 - 20 sets", false]]
},
{

    question : "Recommended way of executing sets (for hypertrophy goals) is:",
    answers: [["slow, isolating muscle", true], ["as slow as possible", false], ["as fast as possible", false], ["fast, using more muscle groups for efficiency", false]]
},
{

    question : "What is the best frequency of training for muscle gains?",
    answers: [["5 times per week, all muscle groups targeted every session", false], ["4 times per week, with breaks", true], ["once per week, targeting as many groups as possible", false], ["3 times per week, targeting every muscle group twice per week", true], ["as many times per week as possible, to maintain high metabolic rates", false]]
}];

var question_html = []; /// de forma [tag li pentru intrebare, [...., [label pt raspuns, checkbox pt raspuns, br], [label pt raspuns, checkbox pt raspuns, br],...], hr]

var start_time;
var time_limit_countdown;
const time_limit = 30000;


function show_quiz(){

    document.getElementById("generate_quiz").remove();

    ///setarea limitei maxime de timp si a contorului de timp pentru scor

    start_time = performance.now();

    time_limit_countdown = setTimeout(function(){

        alert("WARNING: quiz time limit exceeded!");
        reset_quiz();

    }, time_limit);

    ///lista cu intrebari

    let quiz_div = document.getElementById("quiz_div");

    let quiz_list = document.createElement("ol");
    quiz_list.className = "item_quiz_list";
    quiz_list.id = "q_list_html";

    quiz_div.appendChild(quiz_list);

    /// generarea intrebarilor si a raspunsurilor
    
    for(let i = 0; i < question_list.length; i++){

        let aux_q_li = document.createElement("li");
        let aux_q_li_txt =  document.createTextNode(question_list[i].question);
        aux_q_li.appendChild(aux_q_li_txt);
        aux_q_li.className = "item_quiz_question";

        question_html.push([aux_q_li, []]); /// de forma [tag li pentru intrebare, [...., [label pt raspuns, checkbox pt raspuns, br], [label pt raspuns, checkbox pt raspuns, br],...], hr]

        if(i == 0){

            quiz_list.appendChild(aux_q_li);
        }
        else{

            quiz_list.appendChild(aux_q_li, question_html[i - 1][2]);
        }

        for(let j = 0; j < question_list[i].answers.length; j++){

            if(j == 0){

                var aux_br0 = document.createElement("br");
                aux_q_li.appendChild(aux_br0);
            }

            ///pentru label

            let aux_label = document.createElement("label");
            let aux_label_txt = document.createTextNode(question_list[i].answers[j][0]);
            aux_label.appendChild(aux_label_txt);
            aux_label.className = "item_label quiz_label";
            aux_label.setAttribute("for", "question_" + i + "_r" + j);
            
            if(j == 0){

                aux_q_li.appendChild(aux_label, aux_br0);
            }
            else{

                aux_q_li.appendChild(aux_label, question_html[i][1][j - 1][2]);
            }

            question_html[i][1].push([aux_label, [], []]);

            ///pentru checkbox corespondent label ului

            let aux_checkbox = document.createElement("input");
            aux_checkbox.className = "item_input cbox";
            aux_checkbox.id = "question_" + i + "_r" + j;
            aux_checkbox.setAttribute("name", "question_" + i + "_r" + j);
            aux_checkbox.setAttribute("type", "checkbox");

            aux_q_li.appendChild(aux_checkbox, aux_label);

            question_html[i][1][j][1] = aux_checkbox;

            ///pentru br 

            let aux_br = document.createElement("br");
            aux_q_li.appendChild(aux_br, aux_checkbox);

            question_html[i][1][j][2] = aux_br;
        }

        let aux_hr = document.createElement("hr");
        aux_hr.className = "item_split shortsplit";
        aux_q_li.appendChild(aux_hr, question_html[i][1][question_list[i].answers.length - 1][2]);

        question_html[i][2] = aux_hr;
    }

    /// buton de calculare a scorului

    let q_calc = document.createElement("button");
    q_calc.className = "item_button";
    q_calc.id = "q_calc_score";
    q_calc.setAttribute("onclick", "show_score()");
    let q_calc_txt = document.createTextNode("SHOW SCORE!");
    q_calc.appendChild(q_calc_txt);

    quiz_list.appendChild(q_calc, question_html[question_list.length - 1][2]);

    ///nota de subsol

    let q_note = document.createElement("p");
    q_note.innerHTML = "NOTE: score is a number on a scale from 0 to 100; it is also based on fastness; time limit is " + Math.round(time_limit / 1000) + " seconds";
    q_note.className = "img_desc left_aligned";
    q_note.id = "question_note";

    quiz_list.appendChild(q_note, q_calc);
}

function show_score(){

    clearTimeout(time_limit_countdown);

    ///retinerea rapiditatii terminarii

    let time_factor = Math.min(1.5 - ((performance.now() - start_time) / time_limit), 1);

    ///retinerea numarului de raspunsuri corecte

    let ok_count = 0;

    for(question = 0; question < question_list.length; question++){

        let ok = true;

        for(answer = 0; answer < question_list[question].answers.length; answer++){
            
            if(question_list[question].answers[answer][1] != question_html[question][1][answer][1].checked){
                
                ok = false;
            }
        }

        if(ok){

            ok_count += 1;
        }
    }

    ///calcularea si afisarea scorului

    let score = (ok_count / question_list.length) * time_factor * 100;

    let score_txt = document.createElement("p");
    score_txt.innerHTML = "Your score is: " + score;
    score_txt.className = "img_desc left_aligned";
    document.getElementById("q_list_html").appendChild(score_txt, document.getElementById("question_note"));

    ///inghetarea quiz ului

    for(question = 0; question < question_list.length; question++){

        for(answer = 0; answer < question_list[question].answers.length; answer++){
            
            question_html[question][1][answer][1].setAttribute("onclick", "return false;");
        }
    }

    document.getElementById("q_calc_score").setAttribute("onclick", "return false;");
}

function reset_quiz(){

    document.getElementById("q_list_html").remove();

    let new_q_gen_button = document.createElement("button");
    let new_q_gen_button_txt = document.createTextNode("TAKE A QUIZ!");
    new_q_gen_button.appendChild(new_q_gen_button_txt);

    new_q_gen_button.className = "item_button";
    new_q_gen_button.id = "generate_quiz";
    new_q_gen_button.setAttribute("onclick", "show_quiz()");

    document.getElementById("quiz_div").appendChild(new_q_gen_button);
}