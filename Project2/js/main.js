//Brenna Pavlinchak
//ASD 1302
//Project 3
//02/10/2013


	
	$("#loadJSON").on('click', function()
	{
	
	
		//$('#phoneNumber').empty();
		$.ajax(
		{    
			url: "data.json", 
			type: "GET", 
			dataType : "json", //Getting JSON data, located in data.json   
			success:function(dataCall) //Going to use dataCall for the name to call my data
			{    
			console.log(This is my JSON Data, dataCall);    
			
				for(i=0, len=dataCall.lifeguards.length; i<len; i++)
				{
					var guard = dataCall.lifeguard[i];
					
					$('' +
						'<div class="lifeguards">'+
							'<h3>' + guard.lastName + guard.firstName + '</h3>'+
							'<p>' + guard.phoneNumber + '</p>'+
						'</div>'
					 ).appendTo(#lifeguards)
				}
			}
		});

	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
			
		
		
		
		
		
		
		
		
		

		//Start of Refactored CRUD for JQM javascript
		
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
				    
					invalidHandler: function(form, validator) //Form validator 
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
	
				
		
		var storeData = function(data)//Store data (refactored code)
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
		
		