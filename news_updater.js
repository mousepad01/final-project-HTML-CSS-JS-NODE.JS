/* clase de elemente din interiorul block ului news:
    item_title news_title ---> titlu 
    item_text news_text ---> paragraf de text
    item_image news_image ---> imagine
    item_list news_list ---> lista
*/

const news_duration = 6000;

var to_show_id = 0;
const count_id = 3;

function next_id(){

    if(to_show_id == count_id - 1){

        to_show_id = 0;
    }
    else{

        to_show_id += 1;
    }
}

reset_news();

add_news();
next_id();

var changer = setInterval(() => {

    reset_news();

    add_news();
    next_id();

}, news_duration);

function add_news(){

    fetch("http://localhost:3000/get_news/" + to_show_id, {

        method: "get"
    }).then(function(res){

        console.log(res);

        if(res.status != "200"){

            alert("could not find news with id:" + to_show_id);
        }
        else{

            res.json().then(function(data){

                let news_div = document.getElementById("news_block");

                ///adaugarea titlului

                let new_title = document.createElement("p");

                let new_title_txt = document.createTextNode(data.title);
                new_title.appendChild(new_title_txt);

                new_title.className = "item_title news_title";
                new_title.id = "auxtitle" + to_show_id;
                news_div.appendChild(new_title);

                let prev_element = new_title;
                
                for(let i = 0; i < data.order.length; i++){
                    
                    let j = parseInt(data.order[i][1]);

                    if(data.order[i][0] == "0"){

                        let new_p = document.createElement("p");
                        
                        let new_p_txt = document.createTextNode(data.paragraphs[j]);
                        new_p.appendChild(new_p_txt);

                        new_p.className = "item_text news_text";
                        new_p.id = "auxtext" + to_show_id + "_" + j;

                        news_div.appendChild(new_p, prev_element);
                        prev_element = new_p;
                    }
                    else if(data.order[i][0] == "1"){

                        let new_img = document.createElement("img");
                        
                        new_img.className = "item_image news_image";
                        new_img.setAttribute("src", data.images[j]);

                        news_div.appendChild(new_img, prev_element);
                        prev_element = new_img;
                    }
                    else if(data.order[i][0] == "2"){

                        let new_ul = document.createElement("ul");

                        new_ul.className = "item_list news_list";

                        let prev_li;

                        for(let k = 0; k < data.lists[j].length; k++){

                            let new_li = document.createElement("li");

                            let new_li_txt = document.createTextNode(data.lists[j][k]);
                            new_li.appendChild(new_li_txt);

                            new_li.id = "auxli" + to_show_id + "_" + j + "_" + k;

                            if(k == 0){

                                new_ul.appendChild(new_li);
                            }
                            else{

                                new_ul.appendChild(new_li, prev_li);
                            }
                            prev_li = new_li;
                        }

                        news_div.appendChild(new_ul, prev_element);
                        prev_element = new_ul;
                    }
                }
            })
        }
    })
}


function reset_news(){

    ///reseteaza noutatile si goleste paragraful div cu id = news_block

    let news_div = document.getElementById("news_block");

    if(news_div){

        news_div.remove();
    }

    let new_news_div = document.createElement("div");

    new_news_div.className = "news_block_class";
    new_news_div.id = "news_block";

    document.getElementById("mnp").appendChild(new_news_div);
}