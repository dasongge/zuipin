console.log("hehe");
define(["jquery"],function($){
    function last(){
        $.ajax({
            url:"../data/last.json",
            success:function(arr){
                for(var i = 0;i < arr.length;i++){
                    var node4 =$(`
                    <div class="conter_box1">
                        <div class= "card-title">${arr[i].name3}</div>
                        <div class="card-content">
                    <!-- left -->
                        <div class="card-left">
                            <a href="" target="_blank" class="a1">
                                <img src="${arr[i].img1}" alt="">
                            </a>
                            <a href="" target="_blank" class="a2">
                                <img src="${arr[i].img2}" alt="">
                            </a>
                        </div>
                    <!-- center -->
                    <div class="card-center">
                        
                    <div class="add-card">
                        <a href="https://www.zuipin.cn/goods?id=8703300" target="_blank" class="right-top" id="right-top">
                            <p class="small-card-text1">${arr[i].pp4}</p>  
                            <p class="small-card-money1">${arr[i].money4}</p> 
                            <img src="images/hehe.jpg" alt="">   
                        </a>
                        <a href="https://www.zuipin.cn/list?catId=48" target="_blank" class="more-card" id="more-card">
                            <h2>${arr[i].h3}</h2>
                            <p>${arr[i].a}</p>
                            
                            <img src="${arr[i].imgg}" alt="查看更多">
                        </a>
                    </div>
                        
                        
                    </div>
                    
                </div>
            </div>`);
            for(var l = 0; l < arr[i].list.length;l++){
                var node5 = $(`
                    <a href="https://www.zuipin.cn/goods?id=8699728" target="_blank">
                        <div class="special-img">
                            <img src="${arr[i].list[l].img_03}" alt="">
                        </div>
                        <p class="yiji">
                            ${arr[i].list[l].p5}      
                        </p>
                        <p class="erji">
                            ${arr[i].list[l].p6}  
                        </p>
                        <p class="money">
                            ${arr[i].list[l].money3}  
                        </p>
                    </a>
                `);
                node5.appendTo(node4.find(`.card-center`));
            }
            node4.appendTo(".center");
                }
                
            },
            error:function(msg){
                alert(msg);
            }
        })
    }
    return{
        last:last
    }
})