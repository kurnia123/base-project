import "../../../../node_modules/materialize-css/dist/css/materialize.min.css";
import "../../../../node_modules/materialize-css/dist/js/materialize.min.js";
import '../../../style/index/index.css';

import fetchFooterHTML from "../component/footer/app.js";
import {loadNav} from "../index/renderNav.js"
import {loadDataTVPopuler} from "./popular_tv.js";
import {loadDataRecommend} from "./recommend_loadData.js";

document.addEventListener("DOMContentLoaded",function () {  
    
    let elems = document.querySelectorAll('.sidenav');
    let instanceSideNav = M.Sidenav.init(elems)
    
    loadNav();
    loadDataTVPopuler();
    loadDataRecommend();
    fetchFooterHTML();
    
    let choiceItemPopuler = document.querySelectorAll("#choice_popular")
    choiceItemPopuler.forEach(item => {
        item.addEventListener("click",function() { 
            
            choiceItemPopuler.forEach(elm => {
                elm.setAttribute("class","listItem")
            })
            
            item.setAttribute("class","listItem on-active")
            loadDataTVPopuler(item.getAttribute("source"))
        })
    })


    let choiceItemRecommend = document.querySelectorAll("#choice_recommend")
    choiceItemRecommend.forEach(item => {
        item.addEventListener("click", function () {  

            choiceItemRecommend.forEach(elm => {
                elm.setAttribute("class","listItem")
            })

            item.setAttribute("class","listItem on-active");
            loadDataRecommend(item.getAttribute("source"));
        })
    })

})