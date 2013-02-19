//Brenna Pavlinchak
//ASD 1302
//Project 2
//02/10/2013
    
        
        $('#home').on('pageinit', function()
        {
            
        });    
        
        
        
 /*****************************************This is my form page for getting/deleting and editing information*************************************************/ 
                
        $('#addItem').on('pageinit', function()
        {
                var myForm = $('#lifeguardForm');
                var errorFormLink = $('#errorFormLink');
                var $displayData = $('#displayData');
                var $clearData = $('#clearData');
                var $saveData = $('#submit1');
                
                
          
                        
             $clearData.on('click', clearLocal); 
             

             $saveData.on('click', storeData);
             
        $.mobile.changePage('#home');
             $displayData.on('click', function(evt) 
             {
             evt.preventDefault;
             getData();
             return false;
});
            

                
                
/*********************************************************Start of validate Function*************************************************************************/                
        myForm.validate( 
        {
                    
                    invalidHandler: function(form, validator) 
                    {
                        errorFormLink.click();
                        var html = '';
                        
                        for(var key in validator.submitted)
                        {
                            var label = $('[for^="'+ key +'"]');
                            var legend = label.closest('fieldset').find('.ui-controlgroup-label');
                            var fieldName = legend.length ? legend.text() : label.text();
                            html += '<li>'+fieldName+'</li>';
                        }
                        
                        $("#errorFormPage ul").html(html);
                    },
                    
                    submitHandler: function() 
                    {
                        var data = myForm.serializeArray();
                        storeData(data);
                    }
        });            
/*********************************************************End of validate Function**************************************************************************/        
        
        
        
        
/*********************************************************Start of autoFillData Function*********************************************************************/                
        var autofillData = function ()
        { 
               var id;
               
               for(var n in json)
               {
                  id = Math.floor(Math.random()*100000001);
                  localStorage.setItem(id, JSON.stringify(json[n]));     
               }       
        }; //End of auto fill data
/*********************************************************End of autoFillData Function***********************************************************************/


        
        
/*********************************************************Start of getData Function**************************************************************************/       
        var getData = function()
        {
        	
           $('#lifeguard').empty();
           $.ajax(
           {    
           
                 url: 'js/json.js', //What i am getting
                 crossDomain: true,
                 isLocal: true,
                 dataType : "jsonp", //Getting JSON data, located in data.json 
                 complete: function(result) //Going to use dataCall for the name to call my data
                 {
                            console.log(result);
                            for(var i=0, len=result.lifeguardInfo.length; i<len; i++)//for loop to read the whole json
                            {
                              var guard = result.lifeguardInfo[i];
                              $('' +
                                '<div class="lifeguard">'+
                                '<h3>' + guard.lastName[1] + guard.firstName[1] + '</h3>'+
                                '<p>' + guard.phoneNumber[1] + '</p>'+
                                '<p>' + guard.cprDate[1] + '</p>'+
                                '<p>' + guard.firstAidDate[1] + '</p>'+
                                '<p>' + guard.lifeguardDate[1] + '</p>'+
                                '<p>' + guard.pools[1] + '</p>'+
                                '</div>'
                                ).appendTo("#lifeguard");
                            }
                                    
                 }
     
           });
           
        };
/*********************************************************End of getData Function**************************************************************************/       
        
        
        
        

/********************************************************Start of storeData Function*************************************************************************/        
        var storeData = function(data)
        {
            var key;
            var id;
                
                if(!key)
                {
                    id = Math.floor(Math.random()*1000001);    
                }
                
                else
                {
                    id = key;
                }
                    
                    
            var item                  = {};
                item.firstName        =["First Name:", $("#firstName").val()];
                item.lastName         =["Last Name:", $("#lastName").val()];
                item.phoneNumber      =["Phone Number:", $("#phoneNumber").val()];
                item.pools            =["Pools:", $("#pools").val()];    
                item.job              =["Job:", $("input:radio[name=job]:checked").val()];
                item.cprDate          =["Date of CPR certification:", $("#cprDate").val()];
                item.firstAidDate     =["Date of First Aid certification:", $("#firstAidDate").val()];
                item.lifeguardDate    =["Date of Lifeguard certification:", $("#lifeguardDate").val()];
                                
                localStorage.setItem(id, JSON.stringify(item)); //Save data in not local storage: Use Stringify to convert our object to a string.
                alert("Lifeguard Saved!");
                location.reload();
                
        };
/*********************************************************End of saveData Function**************************************************************************/
        
        
        
        
        
/*********************************************************Start of deleteItem Function***********************************************************************/        
        var    deleteItem = function(key)
        {
            var ask = confirm("Do you want to delete this Lifeguard contact?");
                
            if(ask)
            {
                localStorage.removeItem(key);
                alert("Lifeguard contact was deleted!");
                window.location.reload();
            }
                
            else
            {
                alert("Lifeguard contact was not deleted");
            }
                        
        };
/************************************************************End of delete Function**************************************************************************/        
        
        
        
        
        
/*********************************************************Start of clearLocal Function***********************************************************************/                            
        var clearLocal = function()
        {
             
            if(localStorage.length === 0)
            {
                alert("There are no lifeguards clear!");
    
            }
                else
                {
                    localStorage.clear();
                    alert("All Lifeguards Have Been Deleted!");
                    window.location.reload();
                    return false;
                }
        };//end clear local function
/*********************************************************End of clearLocal Function*************************************************************************/        
        
        
        
        
        
/*********************************************************Start of editItem Function*************************************************************************/       
        var editItem = function(key)
        {
            var value = localStorage.getItem(this.key);
            
            var item = JSON.parse(value);
            
            $('#firstName').val(item.firstName[1]); 
            $('#lastName').val(item.lastName[1]);
            $('#phoneNumber').val(item.phoneNumber[1]);
            $('#pools').val(item.pools[1]);
            $('#cprDate').val(item.cprDate[1]);
            $('#firstAidDate').val(item.firstAidDate[1]);
            $('#lifeguardDate').val(item.lifeguardDate[1]);
            
            
            editSubmit.off("click", storeData);
           
            $("#submit").val("Edit Lifeguard");
            
            var editSubmit = $("submit");
            
            editSubmit.on("click", storeData);
            
            editSubmit.key = this.key;                      
        };
        
        
 });  
/*********************************************************End of editItem Function**************************************************************************/ 


        
        
        
/**********************************************This is my lifeguard page to pull in the JSON and XML********************************************************/        
        
       
       
        $('#lifeguards').on('pageinit', function()
        {
           
               $("#loadJSON").on('click', function() //when i click on this button something should fire
                {
                console.log($("#loadJSON"));
                
                        $('#lifeguard').empty();
                        
                        $.ajax(
                        {    
                                url: "xhr/data.json", //What i am getting
                                type: "GET", //I am getting not posting 
                                dataType : "json", //Getting JSON data, located in data.json   
                                success:function(result) //Going to use dataCall for the name to call my data
                                {
                                    
                                        console.log("This is my JSON Data", result); 
                                       
                                            
                                            for(var i=0, len=result.lifeguardInfo.length; i<len; i++)//for loop to read the whole json
                                            {
                                                var guard = result.lifeguardInfo[i];
                                               
                                                
                                                $('' +  
                                                       	'<li>' +
                                                        	'<h3>' + guard.lastName[1] + guard.firstName[1] + '<br>' + '</h3>'+ 
                                                        	'<p>' + guard.phoneNumber[1] + '</p>'+
                                                        '</li>' 
                                                 ).appendTo("#lifeguard");
                                            }
                                            $('#lifeguard').listview();
                                
                                }
                       
                       });
            
                });
                
          

             
              $("#loadXML").on('click', function() //when i click on this button something should fire
                {
                console.log($("#loadXML"));
                
                        $('#lifeguard').empty();
                        $.ajax(
                        {    
                                url: "xhr/data.xml", //What i am getting
                                type: "GET", //I am getting not posting 
                                dataType : "xml", //Getting JSON data, located in data.json   
                                success:function(result) //Going to use dataCall for the name to call my data
                                {
                                    
                                        console.log("This is my XML Data", result); 
                                       
                                            
                                           $(xml).find("item").each(function () 
                                           {
                                                    var guard      = $(this).find('item').text(),
                                                    
                                                    firstName=        $(this).find('firstName').text(),
                                                    lastName=        $(this).find('lastName').text(),
                                                    phoneNumber=        $(this).find('phoneNumber').text();
                                                    
                                                    
                                                    $("#lifeguard").appendTo($(
                                                        '<div class="lifeguard">'+
                                                        '<h3>' + guard.lastName + guard.firstName + '</h3>'+
                                                        '<p>' + guard.phoneNumber + '</p>'+
                                                    '</div>'
                                                  ));                                           
                                           });
                                                                           
                                }
                       
                       });
            
                });
                
                
           });//End of lifeguard page
