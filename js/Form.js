function InterviewForm() {
	/**
	 * Store 'this'
	 */
	var _i = this;

	/**
	 * Fields that contains the user input datas
	 */
	var $_title = $('#interviewTitle');
	var $_description = $('#interviewDescription');
	var $_interviewerEmail = $('#interviewerEmail');
	var $_intervieweeEmail = $('#intervieweeEmail');
	var $_date = $('#interviewDate');
	var $_time = $('#interviewTime');

	/**
	 * Reset the effect given
	 */
	$.fn.normal = function() {
		$(this).parent().removeClass("has-success has-error");
	};

	/**
	 * Create the effect on the object (input)
	 * when the value of the object is not valid
	 */
	$.fn.hasError = function() {
		$(this).normal();
		$(this).parent().addClass("has-error");
	};

	/**
	 * Create the effect on the object (input)
	 * when the value of the object is valid
	 */
	$.fn.hasSuccess = function() {	
		$(this).normal();
		$(this).parent().addClass("has-success");
	};

	/**
	 * Mark the corresponding object that depend on check
	 *
	 * @param boolean check
	 *	if check is true then the object will be marked as succes (green),
	 *	otherwise it will be marked as error (red)
	 */
	$.fn.mark = function(check) {
		check ? $(this).hasSuccess() : $(this).hasError();
	}

	/**
	 * Reset the value of user input
	 *
	 * Empty all the field input,
	 * except the date, replace with new date and time
	 */
	this.initialize = function() {
		$_title.val('');
		$_description.val('');
		$_intervieweeEmail
			.val('')
			.normal();
		$_interviewerEmail
			.val('')
			.normal();
		$_date
			.val('')
			.normal();
		
		_i.initializeTime();
	}

	this.initializeTime = function() {
		if( !$_time.is(':disabled') ) {
			$_time
				.val('')
				.normal();
		}
	}

	/**
	 * Generate today's date and the current time
	 *
	 * @return a String
	 *	with sytax Y-m-d'T'H:i
	 */
	this.today = function() {
		var now = new Date();
		var month = now.getMonth;

		var today = now.getFullYear()+"-"+addZero(now.getMonth())+"-"+addZero(now.getDate())+"T"
			+addZero(now.getHours())+":"+addZero(now.getMinutes());

		return today;
	}

	/**
	 * Append zero to in front of the given number
	 *
	 * @param int/String any number to make it 2 digits
	 *
	 * @return String
	 *  String that represents 2 digits number	
	 */
	var addZero = function(nums) {
		var num;
		var convert = new Number(nums);

		if ( (num = convert.toString()) == 'NaN')
			return '00';

		if ( num.length < 2 )
			return ("0" + nums);

		return nums; 
	}

	/**
	 * Check the date's value in the current form
	 *
	 * @return a boolean
	 *	indicate whether the given value of date is valid
	 */
	this.checkDate = function() {
		var date = $_date.val();
		var check;

		if (date === null || date === "") {
			$_date.mark(false);
			return false;
		}

		var yearMonthDay = parseDate(date);

		if (yearMonthDay === null) {
			$_date.mark(false);
			return false;
		}



		var now = new Date();
		var inputYear = parseInt(yearMonthDay[1]);
		var inputMonth = parseInt(yearMonthDay[2]);
		var inputDate = parseInt(yearMonthDay[3]);

		if (inputYear < now.getFullYear()) {
			check = false;
		} else if (inputYear == now.getFullYear() && inputMonth < now.getMonth() ) {
			check = false;
		} else if (inputYear == now.getFullYear() && inputMonth == (now.getMonth() + 1) && inputDate < now.getDate()) {
			check = false;
		} else {
			check = true;
		}

		$_date.mark(check);

		return check;
	}

	/**
	 * Parse the given string to match with the desired date regex
	 *
	 * @param date 
	 * 	String of the date 
	 *
	 * @return
	 *	array(4) that contains parsed date and time if valid:
	 *  array[0] is the full date;
	 *  array[1] is the year;
	 * 	array[2] is the month;
	 * 	array[3] is the date,
	 *
	 * 	or null if not valid
	 */
	var parseDate = function(date) {
		return date.match(/^([0-9]{4})\/(0[1-9]|1[0-2])\/(0[1-9]|[1-2][0-9]|3[0-1])$/);
	}

	/**
	 * Check the time's value from the user input
	 *
	 * @return a boolean
	 * 	true if the input is valid, false otherwise
	 */
	this.checkTime = function() {
		var date = $_date.val();
		var time = $_time.val();

		if (time === 'Anytime') {
			return true;
		}

		var yearMonthDay = parseDate(date);
		var hourMinute = parseTime(time);

		// 
		if ( hourMinute == null ) {
			$_time.mark(false);
			return false;
		} 

		// we should know the day first to verify the time
		if ( yearMonthDay == null ) {
			$_date.normal();
			$_date.mark(false);
			return false;
		}
		
		// check the value
		var now = new Date();
		var input = new Date(yearMonthDay[1],yearMonthDay[2]-1,yearMonthDay[3],hourMinute[1],hourMinute[2]);
		var check = false;

		if (input.getTime() >= now.getTime()) {
			check = true;
		}
		
		$_time.mark(check);

		return check;
	}

	/**
	 * Parse the given string to match with the desired time regex
	 *
	 * @param time 
	 * 	String of the time
	 *
	 * @return
	 *	array(3) that contains parsed date and time if valid:
	 *  array[0] is all the String;
	 *  array[1] is the hour;
	 *	array[2] is the minute,
	 *
	 * 	or null if not valid
	 */
	var parseTime = function(time) {
		return time.match(/^([0-9]|0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/);
	}

	/**
	 * Check the given email to be the desired regex
	 *
	 * @return boolean
	 *	true when email is in the correct syntax,
	 *	false otherwise
	 */
	var checkEmail = function(email) {
	 	if (email == null || email == "" ){
			return false;
		}
		var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
		return pattern.test(email);
	}

	/**
	 * Do the interviewer email's syntax validation
	 *
	 * @return boolean
	 *	true when the given interviewer email's syntax is valid,
	 *	false otherwise
	 */
	this.checkInterviewerEmail = function() {
		var email = $_interviewerEmail.val();
	 	var check = checkEmail(email);

	 	if (email === $_intervieweeEmail.val() ) {
	 		check = false;
	 	}

	 	$_interviewerEmail.mark(check);

	 	return check;
	}

	/**
	 * Do the interviewee email's syntax validation
	 *
	 * @return boolean
	 *	true when the given interviewee email's syntax is valid,
	 *	false otherwise
	 */
	this.checkIntervieweeEmail = function() {
		var email = $_intervieweeEmail.val();
		var check = checkEmail(email);

		if (email === $_interviewerEmail.val() ) {
	 		check = false;
	 	}

		$_intervieweeEmail.mark(check);

		return check;
	}

	/**
	 * Create a state of the form just like the beginning 
	 *
	 * executed when "New Session" button is clicked
	 *
	 * reinitialize the button states
	 * and reset to blank form
	 */
	this.reinitialize = function() {
		$("#resultloading").show('fast');
		$("#formarea").show('slow');
		$("#resultarea").hide();
		$("#resultmessage").hide('slow');
		$("#createBtn").removeAttr("disabled");
		$("#resetBtn").show().removeAttr("disabled");
		
		$("#newBtn").hide();
		
		if ($("#newBtn").val() === "true")
			_i.initialize();
	}

	/**
	 * Check the form then try to submit it
	 */
	this.submit = function() {
		var check = _i.checkInterviewerEmail() &&
			_i.checkIntervieweeEmail() &&
			_i.checkDate() && 
			_i.checkTime();

		var success = true;

		if(check) {
			submitForm();
		}

		return check && success;
	}


	var submitForm = function() {
		// show loading .gif and close the form
		// and disabling "Submit" button
		$("#formarea").hide('slow');
		$("#resultarea").show('slow');
		$("#createBtn").attr("disabled","disable");
		$("#resetBtn").attr("disabled","disable");
		
		// fetch data
		jqueryFetchRequest();
		
		// after (successfully/failed) fetching
		// show "Create New Session" button
		$("#resetBtn").hide();
	}

	var jqueryFetchRequest = function() {
		var interviewTitle = encodeURI($_title.val());
		var interviewDescription = encodeURI($_description.val());
		var interviewerEmail = encodeURI($_interviewerEmail.val());
		var intervieweeEmail = encodeURI($_intervieweeEmail.val());

		var rawDate = parseDate($_date.val());
		var rawTime;

		if ( $_time.val() === 'Anytime') {
			rawTime = new Array();
			rawTime[1] = 23;
			rawTime[2] = 59;
		} else { 
			rawTime = parseTime($_time.val());
		}
		var interviewDate = encodeURI(rawDate[1]+"-"+addZero(rawDate[2]-1)+"-"+addZero(rawDate[3])
			+" "+addZero(rawTime[4])+":"+addZero(rawTime[5])+":"+"00");

		var parameter = 'title=' + interviewTitle
			+ '&description=' + interviewDescription
			+ '&interviewer_email=' + interviewerEmail
			+ '&interviewee_email=' + intervieweeEmail
			+ '&date_scheduled=' + interviewDate;

		$.ajax({
			type: 'POST',
			url: 'api/REST.php',
			dataType: 'json',
			data: parameter,
			timeout: 5000,
			success: jqueryShowResponse,
			error: jqueryShowFailure
		});
		// $.post('api/REST.php',paramater,jqueryShowResponse,'json')
		// 	.fail(jqueryShowFailure);
	}

	var jqueryShowResponse = function(data) {
		$('#resultloading').hide();
		$("#newBtn").show();
		var area = $("#resultmessage");
		area.show();
		if( data.code == 1) {
				area.html("Your interview session is succesfully scheduled, please check you email");
				$("#newBtn").val(true);
		} else {
				var msg = '';
				if(data['failure_reason']) {
					msg = data['failure_reason'];
				}
				area.html("Something wrong with your request! \n" + msg);
				$("#newBtn").val(false);
		}
	}

	var jqueryShowFailure = function() {
		$("#resultloading").hide('fast');
		
		$("#resultmessage").show();
		$("#resultmessage").html("Server Error: Please try again later!");
		$("#newBtn").show();
		$("#newBtn").val(false);
	}
}	