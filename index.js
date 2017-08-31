var my_type=''; 
    var my_latitude=0; var my_longitude=0;
    var post_name;
    var post_pic;
    var favorite_id;
    var scope_index;
    function geosuccess(pos) {
        var crd = pos.coords;
        my_latitude = crd.latitude+"";
        my_longitude = crd.longitude+"";
    }

    function get_location(){
        navigator.geolocation.getCurrentPosition(geosuccess);
    }
    get_location();
        
    var app = angular.module('myApp', []);
    app.controller('dataCtrl', function($scope) {
        $('#next_but').hide();
        $('#prev_but').hide();
   
        
        $scope.show_mainPage = function(){
            if(my_type == 'favorites'){
              $scope.albums=[];
                $scope.posts=[];
            $('#albums_and_posts').hide();
            $('#detail_header_row').hide();
                
           
            if(favorite_id in localStorage){
                $('#fav_table').show();
            }else{
                 $scope.favs.splice(scope_index,1); 
                $('#fav_table').show();
            }
                
            } else {
                $scope.albums=[];
                $scope.posts=[];
                $('#albums_and_posts').hide();
                $('#detail_header_row').hide();
                $('#fav_table').hide();
                $('#main_page_div').show();
                $('#main_page_div').show();
            }
        }
        $scope.fb_post = function(){
           // $("#sample").html('fb post clicked');
            FB.ui({
			  method: 'feed',
			  name: post_name,
			  picture: post_pic,
			  caption: 'FB SEARCH FROM USC CSCI571',
			  display:'popup',
			}, function(response){
             //   $("#sample").html('fb post clicked2');

                if(response && !response.error){
                    Window.open('response');
                    alert("Posted successfully");
                } else {
                    alert("No post");
                }
			});
        }
        
        
        $(".star.glyphicon").click(function() {
            $(this).toggleClass("glyphicon-star glyphicon-star-empty");
        });
        
        $scope.remove_fav = function(id,index){
            localStorage.removeItem(id);  
            $scope.favs.splice(index,1);
        };
        
        var result_array;
        $scope.names = result_array;
        
        
        $scope.show_details = function(index,id,picname,picurl){
            scope_index = index;
             $('#post_well').hide();
             $('#album_well').hide();
            $('#main_page_div').hide();
            $('#albprogressbar').show();
            $('#postprogressbar').show();
            $('#albums_and_posts').show();
            favorite_id = id;
            post_name = picname;
            post_pic =  picurl;
           // $('#next_but').hide();
            //$('#prev_but').hide();
           // $('#my_table').hide();
            $('#fav_table').hide();
          
           
            
        var ret1 = $.ajax({
            url: 'index.php',
            type: 'GET',
            data: {
                    'id' : id,
                },
            success: function(data){
                 $('#albprogressbar').hide();
                $('#postprogressbar').hide();
                $('#detail_header_row').show();
                $scope.$apply(function(){
                        result_array = jQuery.parseJSON(data);
                        $scope.albums = result_array.albums;
                        $scope.profile_name = result_array.name;
                        $scope.profile_pic = result_array.picture.url;
                        $scope.posts = result_array.posts;

                    });
                if(jQuery.isEmptyObject(result_array.albums)){
                    $('#album_well').show();
                } else {
                     $('#album_well').hide();
                }
                if(jQuery.isEmptyObject(result_array.posts)){
                    $('#post_well').show();
                } else{
                     $('#post_well').hide();
                }
            },
            error: function(data){
                $('#sample').html("error");
            }
        }); 
            
        }
        $('#c_but').click(function(){
            $('#ip').val(null);
            $('#main_page_div').hide();
            $('#fav_table').hide();
            $('#detail_header_row').hide();
             $('#albums_and_posts').hide();

           $scope.$apply(function(){
                    $scope.names = [];
                    $scope.albums = [];
                    $scope.posts = [];
                }); 
            
         return false;   
        });
        
        $scope.submit_func = function() {
            
        $('#main_page_div').hide();
        $('#fav_table').hide();
        $('#detail_header_row').hide();
        $('#albums_and_posts').hide();
        $('.myprogressbar').show();
        my_type = 'users';
        var keyword = $('#ip').val();
        var ret1 = $.ajax({
            url: 'index.php',
            type: 'GET',
            data: {
                    'tab' : 'user',
                    'keyword' : keyword
                },
            success: function(data){
                  $('.myprogressbar').hide();
               //     $('#sample').html(data);
                
                
              result_array = jQuery.parseJSON(data);
                var pagination_obj = result_array.splice(result_array.length-1,1);
              //  $('#sample2').html(JSON.stringify(pagination_obj));
                //  $('#header_row').show();
                
                $scope.$apply(function(){
                    $scope.names = result_array;
                });
                $('#main_page_div').show();
               //  $('#my_table').show();
                if(pagination_obj[0].hasNext){
                 
                    $('#next_but').show();
                }else{
                    $('#next_but').hide();
                }
                if(pagination_obj[0].hasPrev){
                     //  $('#sample').html('has prev button');
                    $('#prev_but').show();
                }else {
                     $('#prev_but').hide();
                }
                   
               },
            error: function(data){
                $('#sample').html("error");
            }
        });
    };
        
//    $('#s_but').click(function(){
//                     
//        //$('#my_table').hide();
//         $('#main_page_div').hide();
//        $('#fav_table').hide();
//        $('#detail_header_row').hide();
//        $('#albums_and_posts').hide();
//        $('.myprogressbar').show();
//        my_type = 'users';
//        var keyword = $('#ip').val();
//        var ret1 = $.ajax({
//            url: 'index.php',
//            type: 'GET',
//            data: {
//                    'tab' : 'user',
//                    'keyword' : keyword
//                },
//            success: function(data){
//                  $('.myprogressbar').hide();
//               //     $('#sample').html(data);
//                
//                
//              result_array = jQuery.parseJSON(data);
//                var pagination_obj = result_array.splice(result_array.length-1,1);
//              //  $('#sample2').html(JSON.stringify(pagination_obj));
//                  $('#header_row').show();
//                
//                $scope.$apply(function(){
//                    $scope.names = result_array;
//                });
//                $('#main_page_div').show();
//               //  $('#my_table').show();
//                if(pagination_obj[0].hasNext){
//                 
//                    $('#next_but').show();
//                }
//                if(pagination_obj[0].hasPrev){
//                     //  $('#sample').html('has prev button');
//                    $('#prev_but').show();
//                }
//                   
//               },
//            error: function(data){
//                $('#sample').html("error");
//            }
//        });
//       
//        
//    });
//        
   $('.tablinks').click(function(){
        $('#main_page_div').hide();
       // $('#my_table').hide();
        $('#fav_table').hide();
       $('#detail_header_row').hide();
        $('#albums_and_posts').hide();
       $('.myprogressbar').show();
        var keyword = $('#ip').val();
       var tab = $(this).attr('value');
        if(tab == 'page'){
            my_type = 'pages';
        } else if(tab == 'event'){
            my_type = 'events';
        } else if(tab == 'group'){
            my_type = 'groups';
        } else if(tab == 'user'){
            my_type = 'users';
        }
        var ret2 = $.ajax({
            url: 'index.php',
            type: 'GET',
            data: {
                    'keyword' : keyword,
                    'tab' : tab
                },
            success: function(data){
                $('.myprogressbar').hide();
                result_array = jQuery.parseJSON(data);
                 var pagination_obj = result_array.splice(result_array.length-1,1);
               // $('#header_row').show();
                
                $scope.$apply(function(){
                    $scope.names = result_array;
                });
                 $('#main_page_div').show();
               // $('#my_table').show();
                if(pagination_obj[0].hasNext){
                    $('#next_but').show();
                } else {
                     $('#next_but').hide();
                }
                if(pagination_obj[0].hasPrev){
                    $('#prev_but').show();
                } else {
                      $('#prev_but').hide();
                }
            }
        }); 
    });
        
    $('#placetab').click(function(){
       
         $('#main_page_div').hide();
        //$('#my_table').hide();
        $('#fav_table').hide();
        $('#albums_and_posts').hide();
        $('.myprogressbar').show();
        var keyword = $('#ip').val();
        var tab = 'place';
        my_type = 'places';
        var ret2 = $.ajax({
            url: 'index.php',
            type: 'GET',
            data: {
                   'keyword' : keyword,
                    'tab' : tab,
                    'latitude' : my_latitude,
                    'longitude' : my_longitude
                },
            success: function(data){
                $('.myprogressbar').hide();
                result_array = jQuery.parseJSON(data);
                var pagination_obj = result_array.splice(result_array.length-1,1);
               // $('#header_row').show();
                
                $scope.$apply(function(){
                    $scope.names = result_array;
                });
                $('#main_page_div').show();
               // $('#my_table').show();
                if(pagination_obj[0].hasNext){
                    $('#next_but').show();
                }
                if(pagination_obj[0].hasPrev){
                    $('#prev_but').show();
                }
            }
        }); 
    });
        $('#favtab').click(function(){
            my_type = 'favorites';
//            $('#next_but').hide();
//            $('#prev_but').hide();
            //$('#my_table').hide();
             $('#main_page_div').hide();
            $('#albums_and_posts').hide();
            $('#detail_header_row').hide();
            $('.myprogressbar').show();
            var favorites= [];
            var someVar = Object.keys(localStorage);
           for (i = 0; i < someVar.length; i++)  
            {   
                var key = someVar[i];
                var fav_obj = JSON.parse(localStorage.getItem(key));
                fav_obj['id'] = key;
                favorites.push(fav_obj);
                
            }  

            $('.myprogressbar').hide();
          
          //  $('#header_row_fav').show();
           $scope.$apply(function(){ 
               $scope.favs = favorites;
           }) 
           $('#header_row_fav').show();
           $('#fav_table').show();
          
        });
        
        $('#next_but').click(function(){
            $('.myprogressbar').show();
         //   $('#my_table').hide();
             $('#main_page_div').hide();
             var ret2 = $.ajax({
            url: 'index.php',
            type: 'GET',
            data: {
                    'button' : 'next',
                },
            success: function(data){

                $('.myprogressbar').hide();
             //   $('#sample').html(data);
                result_array = jQuery.parseJSON(data);
                var pagination_obj = result_array.splice(result_array.length-1,1);
                //$('#header_row').show();
                
                $scope.$apply(function(){
                    $scope.names = result_array;
                });
               // $('#my_table').show();
                 $('#main_page_div').show();
                if(pagination_obj[0].hasNext){
                    $('#next_but').show();
                } else{
                     $('#next_but').hide();
                }
                if(pagination_obj[0].hasPrev){
                    $('#prev_but').show();
                }else{
                    $('#prev_but').hide(); 
                }
            }
        }); 
        });
          
            
            $('#prev_but').click(function(){
            $('.myprogressbar').show();
                $('#main_page_div').hide();
             var ret2 = $.ajax({
            url: 'index.php',
            type: 'GET',
            data: {
                    'button' : 'previous',
                },
            success: function(data){
                $('.myprogressbar').hide();
                result_array = jQuery.parseJSON(data);
                var pagination_obj = result_array.splice(result_array.length-1,1);
                //$('#header_row').show();
                
                $scope.$apply(function(){
                    $scope.names = result_array;
                });
                //$('#my_table').show();
                 $('#main_page_div').show();
                if(pagination_obj[0].hasNext){
                    $('#next_but').show();
                } else{
                     $('#next_but').hide();
                }
                if(pagination_obj[0].hasPrev){
                    $('#prev_but').show();
               }else{
                    $('#prev_but').hide(); 
                }
            }
        }); 
            
    });
         $scope.star_clicked = function(event,id,name,url){   
            var myclass = angular.element(event.target);
           
            myclass.toggleClass("glyphicon-star glyphicon-star-empty");
            
            var local_storage_object = {'name':name, 'url':url, 'type':my_type};
            var stringified_l_s_o= JSON.stringify(local_storage_object);
            
            var favorited = myclass.hasClass("glyphicon-star");
            if(favorited){
                
                localStorage.setItem(id,stringified_l_s_o);
            } else {
                localStorage.removeItem(id);
            }
//             var x="";
//            for (key in localStorage)  
//            {    
//                x += localStorage.getItem(key)+"<br>";
//                
//            }  
//            $('#sample2').html(x);
             
             
        }
         $scope.star_clicked_noId = function(event){   
            var myclass = angular.element(event.target);
           
            myclass.toggleClass("glyphicon-star glyphicon-star-empty");
            
            var local_storage_object = {'name':post_name, 'url':post_pic, 'type':my_type};
            var stringified_l_s_o= JSON.stringify(local_storage_object);
            
            var favorited = myclass.hasClass("glyphicon-star");
            if(favorited){
                
                localStorage.setItem(favorite_id,stringified_l_s_o);
            } else {
                localStorage.removeItem(favorite_id);
            }
        }
         $scope.key_found = function(id){
            var someVar = Object.keys(localStorage);
           for (i = 0; i < someVar.length; i++)  
            {
                if(id == someVar[i]){
                    return true;
                }
            }
             return false;
         }
         $scope.key_found_noId = function(){
            var someVar = Object.keys(localStorage);
           for (i = 0; i < someVar.length; i++)  
            {
                if(favorite_id == someVar[i]){
                    return true;
                }
            }
             return false;
         }
    

   
});