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
        }); //End of validate form
                
            
            
            
            $("#displayData").on('click', function() 
            {
            getData();
            });
            
            $("#clearData").on('click', function() 
            {
            clearLocal();
            });
            
        });
        
                
        var autofillData = function ()
        { 
               var id
               
               for(var n in json)
               {
                  id = Math.floor(Math.random()*100000001);
                  localStorage.setItem(id, JSON.stringify(json[n]));     
               }       
        }; //End of auto fill data
        
        
        
        var getData = function()
        {
        
        };
        
      /*  function getLifeguardData()
        {
            toggleControls("on");
            
            if(localStorage.length === 0)
            {
                alert("There are no Lifeguards saved! Load default data");
                autoFillData(); //Calls the auto fill data function
            }
                
                var makeDiv = document.createElement('div'); 
                makeDiv.setAttribute("id", "items");
                var makeList = document.createElement('ul');
                makeDiv.appendChild(makeList);
                document.body.appendChild(makeDiv);
                getElement('items').style.display = "block";
                
            for(var i=0, len=localStorage.length; i<len; i++)
            {
                var makeli = document.createElement('li');
                var linksLi = document.createElement('li'); 
                
                makeList.appendChild(makeli);
                var key = localStorage.key(i);
                var value = localStorage.getItem(key);
                
                var obj = JSON.parse(value); //Convert string from local storage value back to object using JSON.parse
                var makeSubList = document.createElement('ul'); 
                makeli.appendChild(makeSubList);
                
              // getImage(obj.pools[1], makeSubList);//Calls the getImage function
                
				for(var n in obj)
				{
					var makeSubli = document.createElement('li');
					makeSubList.appendChild(makeSubli);
					var optSubText = obj[n][0]+" "+obj[n][1];
					makeSubli.innerHTML = optSubText;
					makeSubList.appendChild(linksLi);
				}
				
                makeLifeguardItemLinks(localStorage.key(i), linksLi); //create our edit delete buttons link
       

            }
        } //End of function getLifeguardData */

        
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
                item.email            =["Email:", $("#email").val()];
                item.pools            =["Pools:", $("#pools").val()];    
                item.job              =["Job:", $("input:radio[name=job]:checked").val()];
                item.cprDate          =["Date of CPR certification:", $("#cprDate").val()];
                item.firstAidDate     =["Date of First Aid certification:", $("#firstAidDate").val()];
                item.lifeguardDate    =["Date of Lifeguard certification:", $("#lifeguardDate").val()];
                item.hours            =["Hours a week you can work:", $("#hours").val()];
                item.requests         =["Requests:", $("#requests").val()];
                
                localStorage.setItem(id, JSON.stringify(item)); //Save data in not local storage: Use Stringify to convert our object to a string.
                alert("Lifeguard Saved!");
                
        }; //End of saveData
        
        
        
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
                        
        };//End of deleteItem Function
        
        
                            
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
		                                            '<div class="lifeguard">'+
		                                                '<h3>' + guard.lastName[1] + guard.firstName[1] + '</h3>'+
		                                                '<p>' + guard.phoneNumber[1] + '</p>'+
		                                            '</div>'
		                                         ).appendTo("#lifeguard");
		                                    }
		                        
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
		                                   		 var guardList 	 = $(this).find('item').text(),
		                                   		 
		                                   		 firstName=		$(this).find('firstName').text(),
		                                   		 lastName=		$(this).find('lastName').text(),
		                                   		 phoneNumber=		$(this).find('phoneNumber').text()
		                                   		 
		                                   		 
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
                

          
          
     