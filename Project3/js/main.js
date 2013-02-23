//Brenna Pavlinchak
//ASD 1302
//Project 3
//02/19/2013

	
	
	 $('#home').on('pageinit', function()
	 {
	     alert("The home page is open");       
	 });  
	 
	 $('#addItem').on('pageinit', function()
	 {
	 	alert("The add item page is open");
	 	
	 	var displayLifeguard = $('#displayLifeguard');
	 	var autofillData = $('#autofillData');

	 	
                                  
         console.log($("#loadJSON"));
                
         
			     $('#saveData').on('click', function()
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
		                                                
		                localStorage.setItem(id, JSON.stringify(item)); 
		                alert("Lifeguard Saved!");
		                location.reload();
		 
			     });
			     
			     
			     $('#getData').on('click', function()//Hope this works how i want it to
			     {
					    
					    if(localStorage.length === 0)//Test to see if there is something in local storage if there is not
			            {							//pull up the JSON
			                alert("There are no Lifeguards saved! Load default data");
			                autoFillData(); //Calls the auto fill data function
			            }
			            
			            else 
			            {
			            console.log($("#displayLifeguard"));
			            
			            displayLifeguard.on();
                
	                        $('#displayLifeguard').empty();
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
	                                                 ).appendTo("#displayLifeguard");
	                                            }
	                                            $('#displayLifeguard').listview();
	                                
	                                 }
	                                 
	                          });

	                    }
			   
			    });//Need to figure out how to put a transition page to display data
			    
			    
			   var autofillData = function ()
			   { 
		               var id;
		               
		               for(var n in json)
		               {
		                  id = Math.floor(Math.random()*100000001);
		                  localStorage.setItem(id, JSON.stringify(json[n]));     
		               }       
              
               }; //End of auto fill data
               
               
               $('#deleteAll').on('click', function()
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

                
		        }//End function deleteAll

			            			    
			    //Put edit delete item functions on the transition page 
			     $('#deleteItem').on('click', function()//Not sure if this will work yet, untested.
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
 
			     });
			     
			     
				$('#editItem').on(click,function(key)//Did it this way because i dont know how to put the make links function
		        {
		            var value = localStorage.getData(key);
		            
		            var item = JSON.parse(value);
		            
		            $('#firstName').val(item.firstName[1]); 
		            $('#lastName').val(item.lastName[1]);
		            $('#phoneNumber').val(item.phoneNumber[1]);
		            $('#pools').val(item.pools[1]);
		            $('#cprDate').val(item.cprDate[1]);
		            $('#firstAidDate').val(item.firstAidDate[1]);
		            $('#lifeguardDate').val(item.lifeguardDate[1]);
		            
		            
		            submitEdit.off("click", storeData);
		           
		            $("#submit").val("Edit Lifeguard");
		            
		            var submitEdit = $("submit");
		            
		            submitEdit.on("click", storeData);
		            
		            submitEdit.key = this.key;                      
		        });

	            
	 });   
	 