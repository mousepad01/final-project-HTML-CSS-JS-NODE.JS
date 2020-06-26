var pressed_keys = [];
var last_pressed_time = performance.now();

if(!localStorage.getItem("count")){

    localStorage.setItem("count", "0");
}
var localStorage_count = parseInt(localStorage.getItem("count"));

///reactualizare highlight uri vechi NU STIU CUM SA FAC ASTA, AM MAI JOS O INCERCARE SCRISA PARTIAL

document.addEventListener("DOMContentLoaded", () => {

    let all_old_ranges = [];

    for(i = 0; i < localStorage_count; i++){

        ///reconstruiesc range ul respectiv
    
        let range_info = JSON.parse(localStorage.getItem(i));
    
        let node_container_tag = range_info[0];
        let node_container_id = range_info[1];
        let start_offset = range_info[2];
        let end_offset = range_info[3];

        let containers = document.getElementsByTagName(node_container_tag);

        let node_container;

        /*alert(node_container_id);
        alert(node_container_tag);
        alert(start_offset);
        alert(end_offset);*/

        ///caut containerul dupa tag si id

        for(let j = 0; j < containers.length; j++){

            if(containers[j].id == node_container_id){

                node_container = containers[j];
            }
        }

        if(node_container){
            let old_range = new Range();

            old_range.setStart(node_container.firstChild, start_offset);
            old_range.setEnd(node_container.firstChild, end_offset);

            all_old_ranges.push(old_range);
        }
    }

    for(let i = 0; i < all_old_ranges.length; i++){

        let mark_tag = document.createElement("mark");
        mark_tag.className = "highlight";

        all_old_ranges[i].surroundContents(mark_tag);
    }
});

///event listener pentru combinatiile de taste

document.addEventListener("keydown", event => {

    ///resetarea listei temporare la intervale mai mari de o secunda intre apasari de taste

    let current_pressed_time = performance.now();

    if(current_pressed_time - last_pressed_time > 300){

        pressed_keys = [];
    }

    last_pressed_time = performance.now();

    ///adaugarea tastei in lista temporara

    const p_key = event.keyCode;

    pressed_keys.push(p_key);

    ///verificarea combinatiei de taste apasate Shift + H (keyCode 16 respectiv 72) pentru a memora selectia

    const pc_length = pressed_keys.length;

    if(pc_length >= 2 && pressed_keys[pc_length - 1] == 72 && pressed_keys[pc_length - 2] == 16){

        memorize_selection();
    }

    ///verificarea combinatiei de taste apasate Shift + C (keyCode 16 respectiv 67) pentru a elibera localStorage

    if(pc_length >= 2 && pressed_keys[pc_length - 1] == 67 && pressed_keys[pc_length - 2] == 16){

        localStorage.clear();
    }
 
});

function memorize_selection(){

    ///executa highlight ul actual
   
    let selection = document.getSelection();
    let range = selection.getRangeAt(0);

    let mark_tag = document.createElement("mark");
    mark_tag.id = "aux" + localStorage_count;
    mark_tag.className = "highlight";

    let start_offset = range.startOffset;
    let end_offset = range.endOffset; 

    range.surroundContents(mark_tag);

    ///adauga highlight ul in selection_list NU STIU CUM SA FAC ASTA, AM MAI JOS O INCERCARE SCRISA PARTIAL

    ///nu voi avea highlight peste elemente cu alte tag uri de tipul i, b, etc deci endContainer va fi startContainer, care vor fi ambele firstChild ale node_container
    let node_container = range.commonAncestorContainer;    /// din moment ce fac highlight numai in cadrul aceluiasi container, common ancestor va fi acel container
    let node_container_tag = node_container.tagName;

    ///numarul numarul de caractere existente inaintea mark ului ce urmeaza a fi pus, din containerul actual

    let auxmarks = node_container.childNodes;

    let surplus_chars = 0;

    for(let i = 0; i < auxmarks.length && auxmarks[i].id != mark_tag.id; i++){

        if(auxmarks[i].nodeName == "#text"){

            surplus_chars += auxmarks[i].length;
        }
        else{

            surplus_chars += auxmarks[i].innerHTML.length;
        }
    }

    localStorage.setItem(localStorage_count, JSON.stringify([node_container_tag, node_container.id, surplus_chars, surplus_chars + end_offset - start_offset]));
    localStorage_count += 1;

    localStorage.setItem("count", localStorage_count);
}


