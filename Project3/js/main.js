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
			     
			     
			     $('#getData').on('click', function()
			     {
					    
					    if(localStorage.length === 0)
			            {
			                alert("There are no Lifeguards saved! Load default data");
			                autoFillData(); //Calls the auto fill data function
			            }
			            
			            
			     });
			    
			    
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
	            
	 });   
	 