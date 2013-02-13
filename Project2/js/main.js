//Brenna Pavlinchak
//ASD 1302
//Project 2
//02/10/2013
	
		
		$('#home').on('pageinit', function()
		{
			//code needed for home page goes here
		});	
				
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
		});
				
			
			//any other code needed for addItem page goes here
			
			$("#displayData").click(function() 
			{
			getData();
			});
			
			$("#clearData").click(function() 
			{
			clearLocal();
			});
			
		});
		
				
		var autofillData = function ()
		{
			//old code for reference
			 for(var n in json)
               {
                   var id = Math.floor(Math.random()*100000001);
                   localStorage.setItem(id, JSON.stringify(json[n]));
                   
               }//end of old code
               
               var id
               
               for(var n in json)
               {
                  id = Math.floor(Math.random()*100000001);
                  localStorage.setItem(id, JSON.stringify(json[n]));
                   
               }
               
		};
		
		var getData = function()
		{
		
		};
		
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
                item.job	          =["Job:", $("input:radio[name=job]:checked").val()];
                item.cprDate          =["Date of CPR certification:", $("#cprDate").val()];
	            item.firstAidDate     =["Date of First Aid certification:", $("#firstAidDate").val()];
                item.lifeguardDate    =["Date of Lifeguard certification:", $("#lifeguardDate").val()];
			    item.hours            =["Hours a week you can work:", $("#hours").val()];
                item.requests         =["Requests:", $("#requests").val()];
                
                localStorage.setItem(id, JSON.stringify(item)); //Save data in not local storage: Use Stringify to convert our object to a string.
                alert("Lifeguard Saved!");
                
		}; //End of saveData
		
		var	deleteItem = function ()
		{
			
			                
                	
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
		};//end clear local
		
		
		$('#lifeguards').on('pageinit', function()
		{
			//code needed for home page goes here
			

		
		
		
				$("#loadJSON").on('click', function()) //when i click on this button something should fire
				{
				console.log($("#loadJSON"));
				
					//$('#phoneNumber').empty();
					$.ajax(
					{    
						url: "xhr/data.json", //What i am getting
						type: "GET", //I am getting not posting 
						dataType : "json", //Getting JSON data, located in data.json   
						success:function(result) //Going to use dataCall for the name to call my data
						{    
						console.log("This is my JSON Data", result); 
							   
									console.log(result.lifeguardInfo.length);
									for(var i=0, len=dataCall.lifeguardInfo.length; i<len; i++)//for loop to read the whole json
									{
										console.log(dataCall.lifeguardInfo.length);
										var guard = dataCall.lifeguardInfo[i];
										console.log('Item is ', guard);
										
										$('' +
											'<div class="lifeguards">'+
												'<h3>' + guard.lastName[1] + guard.firstName[1] + '</h3>'+
												'<p>' + guard.phoneNumber[1] + '</p>'+
											'</div>'
										 ).appendTo("#lifeguard");
									}
						}
				   
				   });
			
				}
				
				
			});
