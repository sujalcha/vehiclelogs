var pageCount; //initialising a global variable to save the page Count
var Item;
var itemName;

// calls at the begining of page loading
$(document).delegate ("#home_page","pageinit", function() {
	//remove location items from the local storage of the web browser
    localStorage.removeItem('location');
});

// call functions at the begining of page loading
$(document).delegate ("#vehicle","pageinit", function() {

    main();
   	datetime();
});

$(document).ready(function(){
	// extract title from local storage
    $("span#CarName").html(localStorage.getItem('CarName'));
    //extract the title of the Vehicle from the local storage
 	Item = parseInt(localStorage.getItem("CarNumber"));
 	//extract the itemNumber of the Vehicle from the local storage
 	itemName = localStorage.getItem("CarName");

	showLogs();
});

// When leaving current page and going to vehicleform
$(document).on("pageshow", "#vehicle", function () {
    clearing();
});

// the cleaning function is used to clean all the text and values from the fields in the #Vechicle division
	var clearing = function ()

	{
       driver: 	$('#vehicle_id').val("");
       rego: 	$('#rego').val("");
       start: 	$('#start').val("");
       			$('#text1').show();
       first: 	$('#first').val("");
       			$('#text2').show();
       second: 	$('#second').val("");
       			$('#text3').show();
       end: 	$('#end').val("");
       			$('#text4').show();
	}


function getID(value)
{
	// initialising a variable to store the type of Vechicle name
	var vehicleName;
	// stores the value comming from the front end to the pageCount variable
	pageCount = value;

	switch (value)
	{
		case 1:
		vehicleName="Car";
		break;

		case 2:
		vehicleName="5T Truck";
		break;

		case 3:
		vehicleName="10T Truck";
		break;
		case 4:
		vehicleName="Tipper";
		break;

		case 5:
		vehicleName="Articulated";
		break;

		default:
		vehicleName = itemName;
		getID(Item);
		break;
	}
		// set text of Vechicle header into local storage variable CarName
		localStorage.setItem("CarName",vehicleName);
		 //set the value if the car number
		localStorage.setItem("CarNumber",value);


		$('span#CarName').text(vehicleName);
		document.getElementById("CarName").innerHTML = vehicleName; //passes the value of the vehicleName variable to the front end division called the CarName
		document.getElementById("CarId").innerHTML = value; //passes the value of the vehicleName variable to the front end division called the CarId
}

function next() // function used to forward the page number
{
	value= pageCount + 1;
	if(value >5)
	{
		value=1;
	}
	clearing();
	getID(value);// calling the getID function again to run the switch case
}

function prev() // function used to backward the page number
{
	value= pageCount - 1;
	if(value <1)
	{
		value=5;
	}
	clearing();
	getID(value);// calling the getID function again to run the switch case
}

function showInfo()//this function is used to display the location and time of the user
{
	 datetime();   //function in which date and time is calculated
}

	 function datetime()
	 {
			var dateString = new Date(),
			dayOfMonth = dateString.getDate(),
			curMonth = dateString.getMonth()+1,
			curYear = dateString.getFullYear(),
			curHour = dateString.getHours() > 12 ? dateString.getHours() - 12 : (dateString.getHours() < 10 ? "0" + dateString.getHours() : dateString.getHours()),
			curMinute = dateString.getMinutes() < 10 ? "0" + dateString.getMinutes() : dateString.getMinutes(),
			curSeconds = dateString.getSeconds() < 10 ? "0" + dateString.getSeconds() : dateString.getSeconds();

	 		getLocation(); //function in which latitute and longitude calculated

			function getLocation()
			{
			    if (navigator.geolocation)
			    {
			        navigator.geolocation.getCurrentPosition(showPosition);
			    }
			    else
			    {
			        x.innerHTML = "Geolocation is not supported by this browser.";
			    }
			}

			function showPosition(position)
			{
				var out = dayOfMonth + "/" + curMonth + "/" + curYear + " " + curHour + ":" + curMinute + ":" + curSeconds + "    " + position.coords.latitude + "    " + position.coords.longitude;

				$('.click-me').click(function () //switch case to hide the buttons after the date and location is shown
				{
					  switch ($(this).attr('id'))
					  {
				        case 'text1':
						document.getElementsByName('output1')[0].value= out;
						$('#text1').hide();
						break;

				        case "text2":
						document.getElementsByName('output2')[0].value= out;
						$('#text2').hide();
						break;

						case "text3":
						document.getElementsByName('output3')[0].value= out;
						$('#text3').hide();
						break;

						case "text4":
						document.getElementsByName('output4')[0].value= out;
						$('#text4').hide();
						break;
				    }
				});
			}//end of the showPosition
	}// end of datetime


// function to save log entries
var main = function ()
{

    $('#vehicle-form').on('submit', function (e)
    {
        e.preventDefault();
        var type = $('span#CarName').text().toLowerCase();// set value of Vehicle title to type
        var Car_items = JSON.parse(localStorage.getItem(type)) || []; // store extracted entries of localstorage in array
        driver = document.getElementById("vehicle_id").value; // get the value or the contents of the driver textbox
    	rego = document.getElementById("rego").value; // get the value or the contents of the rego textbox

	    var itemdata = // array variable to store the date driver name, rego and location
	    {
				vehicle_id:$('#vehicle_id').val(),
				rego:$('#rego').val(),
				start:$('#start').val(),
				first:$('#first').val(),
				second:$('#second').val(),
				end:$('#end').val(),
        };

        var validationFailed = false;

				  if(driver !=="")
				  {
				  			if(rego !== "")
				  			{
				  				if($('#start').val() !== '' & $('#first').val() !== '' & $('#second').val() !== '' & $('#end').val() !== '' )
					  			{

					  			alert('Log Saved');
					  			clearing();
					  			}

					  			else
					  			{
					  				alert('You must press all the button first ');
					  				return false;
					  			}
				  			}

				  			else
				  			{
				  				alert('You must enter the rego number');
				  				return false;
				  			}
				 }
				else
				{
					alert('You must enter the driver name ');
					return false;
				}

				if (validationFailed)
				{
		 			e.preventDefault();
					return false;
   		}

        Car_items.push(itemdata);// push back userinput into array variable itemdata
        localStorage.setItem(type, JSON.stringify(Car_items));//store the user entries ino local storage

    });

};

//display log entries
function showLogs() {
    var type = $('span#CarName').text().toLowerCase();
    var htmlElement = '<ul>';
    logs = JSON.parse(localStorage.getItem(type));
    if (logs) {// if logs exist
          for (var i = 0; i < logs.length; i++) {
            htmlElement += '<li>' +
                '</br><span>'+ '<fieldset>' + '<legend>'+ logs[i].vehicle_id + ', ' + logs[i].rego +',</br>' + '<legend>' + logs[i].start + '</br>' + logs[i].first + '</br>' + logs[i].second + '</br>' + logs[i].end +'</span>'+ '</li>'+'</fieldset>';
        }
    } else {//if no logs found
        htmlElement += '<li>No Logs to Show.</li>';
    }

    htmlElement += '</ul>';
    $('.logs-to-append').html(htmlElement);
};


//function for confirming sending log entries
function myFunction()
{
    if(logs==null)// if no log found
    {
       alert("No Log Found");
    }
    else
    {
        var r = confirm("Do you want to send all logs, this has effect of deleting all logs");//display confirm dialog box for asking confirmation to send
        if (r == true)
        {
            if (confirm("Logs Sent") == true)
            {
                localStorage.clear();
                window.location.href = '#home_page';
            }
        }
    }
}
