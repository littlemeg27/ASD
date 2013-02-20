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
	            
	 });   
	 