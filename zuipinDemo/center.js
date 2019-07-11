console.log("呵呵");
define(["jquery"],function($){
    function center(){
        $(function(){
           
            $.ajax({
                url:"../data/center.json",
                success: function(arr){
                    for(var i = 0; i < arr.length;i++){
                        
                        var node = $(`
                        <div class="center_box">
                            <div class= "card-title">${arr[i].name}</div>
                            <div class="card-content">
                                <div class="content-left">
                                    <a href="html/liebiao.html" target="_blank" class="tp">
                                        <img src=" ${arr[i].img}" alt="">   
                                    </a>
                                    <a href="html/liebiao.html" target="_blank" class="zi">
                                        <h2>${arr[i].hh2}</h2>
                                        <p>${arr[i].p1}</p>
                                        <p>${arr[i].p2}</p>
                                        <img src="${arr[i].img1}" alt="查看更多">
                                    </a>
                                </div>
                                <div class= "content-center">
                                    
                                    
                                </div>
                                <div class="content-right">
                                    <div class="news">
                                        <a href="html/liebiao.html" target="_blank" class="news_head" id="news_head">${arr[i].h1}</a>                                       
                                    </div>
                                    <a href="html/liebiao.html" target="_blank" class="zi more-card">
                                        <h2>${arr[i].h2}</h2>
                                        <p>${arr[i].ppp1}</p>
                                        <p>${arr[i].ppp2}</p>
                                        <img src="${arr[i].img11}" alt="查看更多">
                                    </a>
                                </div>              
                            </div>
                        </div>


                        
                        `);
                        
                        for(var j = 0 ; j < arr[i].tu.length;j++){
                           var node1 = $(`
                            <a href="html/liebiao.html" target="_blank">
                                <div class="special-img">
                                    <img src="${arr[i].tu[j].img_01}" alt="">
                                </div>
                                <p class="yiji">
                                    ${arr[i].tu[j].pp1}
                                </p>
                                <p class="erji">
                                    ${arr[i].tu[j].pp2}
                                </p>
                                <p class="money">
                                    ${arr[i].tu[j].money}
                                </p>
                            </a>
                           `);
                           node1.appendTo(node.find(`.card-content .content-center`));
                        }
                        for(var k = 0;  k < arr[i].right.length; k++){
                            var node2 = $(`
                            <a href="html/liebiao.html" target="_blank" class="news-item clear">
                                <p class="news-title">${arr[i].right[k].p3}</p>
                                <div class="news-artical">
                                    <img src="${arr[i].right[k].img_02}" alt="">  
                                    <p>${arr[i].right[k].p4}</p>  
                                </div>
                            </a>
                            `);
                            node2.appendTo(node.find(`.news`));
                        }
                        
                        
                        node.appendTo(".center");
                    }
                   
                    
                },error:function(msg){
                    alert(msg);
                }


            })

        })
    }
    return{
        content:center
    }
})